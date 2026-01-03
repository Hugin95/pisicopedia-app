#!/usr/bin/env tsx

/**
 * Generate ONLY Maine Coon with safe prompt
 */

import { generateArticleImage } from '../lib/leonardo-images';
import * as path from 'path';

async function main() {
  console.log('🐱 Generating Maine-Coon with SAFE prompt...\n');
  
  const safePrompt = 'Professional studio portrait of a MASSIVE giant cat breed, extremely large muscular body with long shaggy brown tabby fur coat, prominent neck ruff mane, very long bushy tail, large tufted ears, sitting majestically showing enormous size, gray studio background, soft professional lighting, hyper-realistic, 8k quality. CRITICAL: must look ENORMOUS and majestic like a lion.';
  
  try {
    const imagePath = await generateArticleImage(
      'maine-coon',
      safePrompt,
      'breeds',
      undefined,
      path.join(process.cwd(), 'public', 'images', 'breeds')
    );
    
    if (imagePath) {
      console.log(`✅ SUCCESS: ${imagePath}`);
    } else {
      console.log(`⚠️  FAILED or skipped`);
    }
  } catch (error) {
    console.error(`❌ ERROR:`, error);
  }
}

main().catch(console.error);

