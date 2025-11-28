#!/usr/bin/env tsx

/**
 * Generate cat breed images using Leonardo.ai API
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { getLeonardoClient } from '../lib/leonardo-client';
import { generateBreedPrompt, getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';
import { sampleBreeds } from '../lib/data';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function generateBreedImages() {
  console.log('🐱 Starting breed image generation with Leonardo.ai\n');
  console.log('================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt();

  // Process each breed
  for (let i = 0; i < sampleBreeds.length; i++) {
    const breed = sampleBreeds[i];
    console.log(`\n[${i + 1}/${sampleBreeds.length}] Processing: ${breed.title}`);
    console.log('─'.repeat(50));

    try {
      const prompt = generateBreedPrompt(breed);
      console.log('📝 Prompt generated');
      console.log(`   ${prompt.substring(0, 100)}...`);

      const outputPath = path.join(
        process.cwd(),
        'public',
        'images',
        'breeds',
        `${breed.slug}.jpg` // Leonardo returns JPEG
      );

      await client.generateAndDownload(prompt, outputPath, {
        negative_prompt: negativePrompt,
        ...config
      });

      console.log(`✅ Successfully generated: ${breed.slug}.jpg`);
      console.log(`📍 Location: public/images/breeds/${breed.slug}.jpg`);

      // Add delay between requests to respect rate limits
      if (i < sampleBreeds.length - 1) {
        console.log('\n⏳ Waiting 5 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Failed to generate image for ${breed.title}:`, error);
      console.log('⚠️  Continuing with next breed...');
    }
  }

  console.log('\n================================');
  console.log('🎉 Breed image generation complete!');
  console.log(`📊 Total breeds processed: ${sampleBreeds.length}`);
  console.log('\n💡 Note: Images are saved as JPEG format.');
  console.log('   You may want to convert them to WebP for better optimization.');
}

// Run the generation
generateBreedImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});