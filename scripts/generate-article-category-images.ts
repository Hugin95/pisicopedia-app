#!/usr/bin/env tsx

/**
 * Generate category images for articles using Leonardo.ai API
 * Creates consistent images for each article category
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { getLeonardoClient } from '../lib/leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Define category images with specific prompts
const categoryImages = [
  {
    filename: 'simptome.jpg',
    prompt: 'Professional illustration of a SINGLE healthy domestic cat being examined by veterinary hands with stethoscope, medical context showing symptoms check, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'boli-cronice.jpg',
    prompt: 'Professional illustration of a SINGLE domestic cat resting peacefully on a soft cushion in a veterinary clinic, suggesting recovery and care, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'preventie.jpg',
    prompt: 'Professional illustration of a SINGLE healthy domestic cat with veterinary vaccination syringe in background (not touching cat), prevention and health context, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'proceduri.jpg',
    prompt: 'Professional illustration of a SINGLE calm domestic cat on veterinary examination table with medical equipment softly visible in background, clinical setting, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'nutritie.jpg',
    prompt: 'Professional illustration of a SINGLE healthy domestic cat near food bowls with healthy pet food, nutrition context, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'comportament.jpg',
    prompt: 'Professional illustration of a SINGLE relaxed domestic cat in a calm home environment, showing peaceful behavior, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'ingrijire.jpg',
    prompt: 'Professional illustration of a SINGLE domestic cat being groomed with a soft brush, grooming and care context, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  },
  {
    filename: 'ghiduri.jpg',
    prompt: 'Professional illustration of a SINGLE domestic cat in a carrier or travel context, guide and advice setting, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, centered composition, no text, no watermark'
  }
];

async function generateArticleCategoryImages() {
  console.log('📚 Starting article category image generation\n');
  console.log('================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt() + ', two cats, multiple cats, extra heads, extra faces, deformed, mutated, text, watermark, logo, blurry, out of focus, cartoon, anime';

  // Ensure articles directory exists
  const articlesDir = path.join(process.cwd(), 'public', 'images', 'articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;

  // Process each category image
  for (let i = 0; i < categoryImages.length; i++) {
    const category = categoryImages[i];
    const outputPath = path.join(articlesDir, category.filename);

    console.log(`\n[${i + 1}/${categoryImages.length}] Processing: ${category.filename}`);
    console.log('─'.repeat(50));

    // Check if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping - Image already exists: ${category.filename}`);
      skipCount++;
      continue;
    }

    try {
      console.log('📝 Using prompt:');
      console.log(`   "${category.prompt.substring(0, 100)}..."`);

      await client.generateAndDownload(category.prompt, outputPath, {
        negative_prompt: negativePrompt,
        ...config,
        width: 1024,
        height: 576, // 16:9 aspect ratio for article cards
        num_images: 1
      });

      console.log(`✅ Successfully generated: ${category.filename}`);
      console.log(`📍 Saved to: public/images/articles/${category.filename}`);
      successCount++;

      // Add delay between requests
      if (i < categoryImages.length - 1) {
        console.log('\n⏳ Waiting 3 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error: any) {
      console.error(`❌ Failed to generate ${category.filename}:`, error.message || error);

      // If rate limited, wait longer
      if (error.message && error.message.includes('rate')) {
        console.log('⚠️  Rate limit detected, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 ARTICLE CATEGORY IMAGE GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   ✅ Generated: ${successCount} images`);
  console.log(`   ⏭️  Skipped (existing): ${skipCount} images`);
  console.log(`   📁 Total categories: ${categoryImages.length}`);
  console.log('\n💡 Next step: Update article data in lib/data.ts with category-based images');
}

// Run the generation
generateArticleCategoryImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});