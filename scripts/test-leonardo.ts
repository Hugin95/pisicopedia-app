#!/usr/bin/env tsx

/**
 * Test Leonardo.ai API with a single breed image
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { getLeonardoClient } from '../lib/leonardo-client';
import { generateBreedPrompt, getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';
import { sampleBreeds } from '../lib/data';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testLeonardoGeneration() {
  console.log('🧪 Testing Leonardo.ai image generation\n');
  console.log('=====================================\n');

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    console.error('❌ Error: LEONARDO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  // Create breeds directory if it doesn't exist
  const breedsDir = path.join(process.cwd(), 'public', 'images', 'breeds');
  if (!fs.existsSync(breedsDir)) {
    fs.mkdirSync(breedsDir, { recursive: true });
    console.log('📁 Created breeds directory\n');
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt();

  // Test with the first breed (Persian cat)
  const testBreed = sampleBreeds[0];
  console.log(`🐱 Test breed: ${testBreed.title} (${testBreed.slug})`);
  console.log(`🌍 Origin: ${testBreed.origin}`);
  console.log(`🎭 Temperament: ${testBreed.temperament.join(', ')}\n`);

  try {
    const prompt = generateBreedPrompt(testBreed);
    console.log('📝 Generated prompt:');
    console.log(`   "${prompt}"\n`);

    console.log('🔧 Leonardo.ai Configuration:');
    console.log(`   Model: Leonardo Phoenix`);
    console.log(`   Size: ${config.width}x${config.height}`);
    console.log(`   Quality: High\n`);

    const outputPath = path.join(breedsDir, `${testBreed.slug}.jpg`);

    console.log('🎨 Starting generation...');
    await client.generateAndDownload(prompt, outputPath, {
      negative_prompt: negativePrompt,
      ...config
    });

    // Check if file was created
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`\n✅ Test successful!`);
      console.log(`📍 Image location: public/images/breeds/${testBreed.slug}.jpg`);
      console.log(`📊 File size: ${Math.round(stats.size / 1024)} KB`);
      console.log(`\n🎉 Leonardo.ai integration is working correctly!`);
      console.log(`\n💡 To generate all breed images, run:`);
      console.log(`   npx tsx scripts/generate-leonardo-breeds.ts`);
    } else {
      console.error('❌ File was not created');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (error instanceof Error && error.message.includes('401')) {
      console.error('\n⚠️  API Key might be invalid. Please check your LEONARDO_API_KEY.');
    }
    process.exit(1);
  }
}

// Run the test
testLeonardoGeneration().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});