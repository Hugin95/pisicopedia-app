#!/usr/bin/env tsx

/**
 * Generate images for ALL 30 cat breeds using Leonardo.ai API
 * This script processes the complete breed list from content-lists.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { getLeonardoClient } from '../lib/leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';
import { allBreeds } from '../lib/content-lists';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Custom breed prompt for consistency
function generateBreedPrompt(breedName: string): string {
  // Clean breed name for better results
  const cleanName = breedName
    .replace('Pisica', '')
    .replace('pisica', '')
    .trim();

  return `Professional illustration of a SINGLE healthy ${cleanName} domestic cat, full body, sitting on a simple surface, centered in frame, facing the camera, natural proportions, realistic anatomy, high detail, sharp focus, crisp edges, 4k resolution, soft pastel background in lavender and rose tones, studio lighting, medical and cozy style, no accessories, no other animals, no humans`;
}

async function generateAllBreedImages() {
  console.log('🐱 Starting COMPLETE breed image generation (30 breeds)\n');
  console.log('================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt() + ', two heads, extra heads, extra faces, extra eyes, multiple bodies, multiple cats, mutated, deformed, distorted anatomy, broken legs, twisted body, blurry, out of focus, low quality, sketch, cartoon, text, watermark, logo, cut off, cropped, extreme perspective, wide angle';

  // Ensure breeds directory exists
  const breedsDir = path.join(process.cwd(), 'public', 'images', 'breeds');
  if (!fs.existsSync(breedsDir)) {
    fs.mkdirSync(breedsDir, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Process each breed
  for (let i = 0; i < allBreeds.length; i++) {
    const breed = allBreeds[i];
    const outputPath = path.join(breedsDir, `${breed.slug}.jpg`);

    console.log(`\n[${i + 1}/${allBreeds.length}] Processing: ${breed.name}`);
    console.log('─'.repeat(50));

    // Check if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping - Image already exists: ${breed.slug}.jpg`);
      skipCount++;
      continue;
    }

    try {
      const prompt = generateBreedPrompt(breed.name);
      console.log('📝 Generating prompt...');
      console.log(`   "${prompt.substring(0, 100)}..."`);

      await client.generateAndDownload(prompt, outputPath, {
        negative_prompt: negativePrompt,
        ...config,
        width: 768,
        height: 768,
        num_images: 1
      });

      console.log(`✅ Successfully generated: ${breed.slug}.jpg`);
      console.log(`📍 Saved to: public/images/breeds/${breed.slug}.jpg`);
      successCount++;

      // Add delay between requests to respect rate limits
      if (i < allBreeds.length - 1) {
        console.log('\n⏳ Waiting 3 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error: any) {
      console.error(`❌ Failed to generate image for ${breed.name}:`, error.message || error);
      errorCount++;

      // If rate limited, wait longer
      if (error.message && error.message.includes('rate')) {
        console.log('⚠️  Rate limit detected, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 BREED IMAGE GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   ✅ Generated: ${successCount} images`);
  console.log(`   ⏭️  Skipped (existing): ${skipCount} images`);
  console.log(`   ❌ Failed: ${errorCount} images`);
  console.log(`   📁 Total breeds: ${allBreeds.length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Run: npm run validate:content');
  console.log('   2. Update lib/data.ts with all breeds');
  console.log('   3. Consider converting to WebP for optimization');
}

// Run the generation
generateAllBreedImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});