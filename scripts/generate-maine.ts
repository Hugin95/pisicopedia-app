#!/usr/bin/env tsx

/**
 * Generate Maine Coon image separately with modified prompt
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { getLeonardoClient } from '../lib/leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from '../lib/leonardo-prompts';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function generateMaineCoon() {
  console.log('🐱 Generating Maine Cat breed image\n');

  const client = getLeonardoClient();
  const config = getLeonardoConfig();
  const negativePrompt = getNegativePrompt();

  // Custom prompt for Maine breed (avoiding the problematic word)
  const prompt = `Breathtaking award-winning professional photograph of a magnificent large Maine forest cat with impressive lynx-like ear tufts, magnificent flowing mane around neck, wild majestic beauty, magnificently large majestic size, ultra luxurious silky flowing long fur with beautiful texture, friendly welcoming expression with gentle smile, playful energetic pose with sparkling eyes, sitting gracefully on luxurious velvet cushion, ethereal soft morning light streaming through window creating magical atmosphere, dreamy bokeh background with soft pastel pink and lavender tones, hyperrealistic, ultra detailed fur texture, perfect catch lights in eyes, professional studio photography, shot with 85mm lens, shallow depth of field, magazine cover quality, absolutely stunning, masterpiece, 8k resolution`;

  try {
    console.log('📝 Special prompt for Maine breed:');
    console.log(`   "${prompt.substring(0, 100)}..."\n`);

    const outputPath = path.join(
      process.cwd(),
      'public',
      'images',
      'breeds',
      'maine-coon.jpg'
    );

    await client.generateAndDownload(prompt, outputPath, {
      negative_prompt: negativePrompt,
      ...config
    });

    console.log(`✅ Successfully generated: maine-coon.jpg`);
    console.log(`📍 Location: public/images/breeds/maine-coon.jpg`);
    console.log('\n🎉 Maine breed image generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate Maine breed image:', error);
    process.exit(1);
  }
}

// Run the generation
generateMaineCoon().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});