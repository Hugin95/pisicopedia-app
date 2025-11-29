#!/usr/bin/env tsx

/**
 * Generate brand images for Pisicopedia.ro using Leonardo.ai API
 * Creates hero images and brand visuals for key pages
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { getLeonardoClient } from '../lib/leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Define brand images
const brandImages = [
  {
    filename: 'hero-main.jpg',
    prompt: 'Professional hero image with THREE different domestic cats (Persian, Siamese, British Shorthair) sitting together harmoniously, soft pastel background with lavender and rose gradient, high detail, sharp focus, medical and cozy style, wide banner format, centered composition, warm lighting, no text, no watermark',
    width: 1920,
    height: 600
  },
  {
    filename: 'hero-sanatate.jpg',
    prompt: 'Professional medical illustration of a SINGLE healthy domestic cat being gently examined, veterinary stethoscope visible, soft pastel background in lavender and rose tones, medical equipment softly blurred in background, high detail, sharp focus, medical and cozy style, wide banner format, no text, no watermark',
    width: 1920,
    height: 600
  },
  {
    filename: 'hero-despre.jpg',
    prompt: 'Professional illustration of a SINGLE domestic cat in a warm, welcoming home environment, sitting peacefully near a window with soft natural light, pastel lavender and rose tones, high detail, sharp focus, cozy and inviting atmosphere, centered composition, no text, no watermark',
    width: 1200,
    height: 800
  },
  {
    filename: 'cat-encyclopedia-icon.jpg',
    prompt: 'Professional icon-style illustration of a SINGLE domestic cat face, front view, symmetrical, surrounded by subtle medical and care symbols, soft pastel background in lavender and rose tones, high detail, sharp focus, medical and cozy style, square format, centered, no text, no watermark',
    width: 512,
    height: 512
  },
  {
    filename: 'welcome-cats.jpg',
    prompt: 'Professional illustration of TWO domestic cats (one adult, one kitten) in a welcoming pose, soft interaction between them, pastel lavender and rose background, high detail, sharp focus, medical and cozy style, warm and inviting, centered composition, no text, no watermark',
    width: 1024,
    height: 768
  }
];

async function generateBrandImages() {
  console.log('🎨 Starting brand image generation for Pisicopedia.ro\n');
  console.log('================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt() + ', text, watermark, logo, blurry, out of focus, cartoon, anime, deformed, mutated, extra limbs, bad anatomy';

  // Ensure brand directory exists
  const brandDir = path.join(process.cwd(), 'public', 'images', 'brand');
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;

  // Process each brand image
  for (let i = 0; i < brandImages.length; i++) {
    const image = brandImages[i];
    const outputPath = path.join(brandDir, image.filename);

    console.log(`\n[${i + 1}/${brandImages.length}] Processing: ${image.filename}`);
    console.log('─'.repeat(50));

    // Check if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping - Image already exists: ${image.filename}`);
      skipCount++;
      continue;
    }

    try {
      console.log('📝 Using prompt:');
      console.log(`   "${image.prompt.substring(0, 100)}..."`);
      console.log(`📐 Dimensions: ${image.width}x${image.height}`);

      await client.generateAndDownload(image.prompt, outputPath, {
        negative_prompt: negativePrompt,
        ...config,
        width: image.width,
        height: image.height,
        num_images: 1
      });

      console.log(`✅ Successfully generated: ${image.filename}`);
      console.log(`📍 Saved to: public/images/brand/${image.filename}`);
      successCount++;

      // Add delay between requests
      if (i < brandImages.length - 1) {
        console.log('\n⏳ Waiting 3 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error: any) {
      console.error(`❌ Failed to generate ${image.filename}:`, error.message || error);

      // If rate limited, wait longer
      if (error.message && error.message.includes('rate')) {
        console.log('⚠️  Rate limit detected, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 BRAND IMAGE GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   ✅ Generated: ${successCount} images`);
  console.log(`   ⏭️  Skipped (existing): ${skipCount} images`);
  console.log(`   📁 Total brand images: ${brandImages.length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update Hero components to use brand images');
  console.log('   2. Add images to About page');
  console.log('   3. Consider using hero-main.jpg for homepage');
}

// Run the generation
generateBrandImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});