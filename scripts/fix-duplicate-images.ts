#!/usr/bin/env tsx

/**
 * Fix duplicate breed images by regenerating them with Leonardo.ai
 * Targets: Sfinx, Exotic Shorthair, Himalayan, Korat
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { getLeonardoClient } from '../lib/leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';

// Load environment variables
dotenv.config({ path: '.env.local' });

const BREEDS_TO_FIX = [
  { slug: 'sfinx', name: 'Sfinx (hairless cat)' },
  { slug: 'exotic-shorthair', name: 'Exotic Shorthair' },
  { slug: 'himalayan', name: 'Himalayan' },
  { slug: 'korat', name: 'Korat' },
];

function generateBreedPrompt(breedName: string): string {
  // Specific prompts for each breed to ensure uniqueness
  const specificPrompts: Record<string, string> = {
    'Sfinx (hairless cat)': 'Professional studio photograph of a single healthy Sfinx hairless cat, wrinkled pink-gray skin, large ears, muscular body, sitting upright facing camera, full body visible, soft lavender and rose pastel background, medical-style lighting, high detail, 4k resolution',
    'Exotic Shorthair': 'Professional studio photograph of a single healthy Exotic Shorthair cat, flat face, round eyes, plush short coat in cream color, chubby cheeks, sitting facing camera, full body visible, soft lavender and rose pastel background, medical-style lighting, high detail, 4k resolution',
    'Himalayan': 'Professional studio photograph of a single healthy Himalayan cat, long fluffy white and cream coat, blue eyes, flat Persian face, color-point markings on ears and face, sitting elegantly facing camera, full body visible, soft lavender and rose pastel background, medical-style lighting, high detail, 4k resolution',
    'Korat': 'Professional studio photograph of a single healthy Korat cat, silver-blue short coat with silver tipping, green eyes, heart-shaped face, muscular compact body, sitting upright facing camera, full body visible, soft lavender and rose pastel background, medical-style lighting, high detail, 4k resolution',
  };

  return specificPrompts[breedName] || `Professional photograph of a ${breedName} cat`;
}

async function fixDuplicateImages() {
  console.log('🔧 Fixing duplicate breed images\n');
  console.log('================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    console.error('ℹ️  Skipping image generation. Using placeholder images instead.');
    process.exit(0);
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt() + ', two heads, extra heads, multiple bodies, multiple cats, mutated, deformed, blurry, cartoon, text, watermark';

  const breedsDir = path.join(process.cwd(), 'public', 'images', 'breeds');

  let successCount = 0;
  let errorCount = 0;

  // Process each breed that needs fixing
  for (let i = 0; i < BREEDS_TO_FIX.length; i++) {
    const breed = BREEDS_TO_FIX[i];
    const outputPath = path.join(breedsDir, `${breed.slug}.jpg`);

    console.log(`\n[${i + 1}/${BREEDS_TO_FIX.length}] Generating: ${breed.name}`);
    console.log('─'.repeat(60));

    try {
      const prompt = generateBreedPrompt(breed.name);
      console.log('📝 Prompt:');
      console.log(`   "${prompt}"`);
      console.log();

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

      // Wait between requests
      if (i < BREEDS_TO_FIX.length - 1) {
        console.log('\n⏳ Waiting 5 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error: any) {
      console.error(`❌ Failed to generate image for ${breed.name}:`, error.message || error);
      errorCount++;

      // If rate limited, wait longer
      if (error.message && error.message.includes('rate')) {
        console.log('⚠️  Rate limit detected, waiting 15 seconds...');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
    }
  }

  console.log('\n================================');
  console.log('📊 Generation Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('================================\n');

  if (successCount === BREEDS_TO_FIX.length) {
    console.log('🎉 All duplicate images have been fixed!');
  } else if (successCount > 0) {
    console.log('⚠️  Some images were generated, but there were errors.');
  } else {
    console.log('❌ No images were successfully generated.');
  }
}

fixDuplicateImages().catch(console.error);
