#!/usr/bin/env tsx

/**
 * Regenerate CORRECT breed images for breeds with issues
 */

import { generateArticleImage } from '../lib/leonardo-images';
import * as path from 'path';

const BREEDS_TO_FIX = [
  {
    slug: 'scottish-fold',
    prompt: 'Professional studio portrait of a Scottish Fold cat with FOLDED EARS bent forward and down, round face, large round orange eyes, plush gray coat, sitting position, looking directly at camera, gray studio background, soft professional lighting, hyper-realistic, 8k quality. CRITICAL: ears MUST be folded forward, not upright.',
    reason: 'CRITICAL: Missing folded ears (defining feature)'
  },
  {
    slug: 'persana',
    prompt: 'Professional studio portrait of a Persian cat with FLAT FACE (brachycephalic), extremely short flat nose, large prominent round eyes, long luxurious cream/white fur, fluffy body, sitting gracefully, looking at camera, gray studio background, soft lighting, hyper-realistic, 8k quality. CRITICAL: face MUST be completely flat with pushed-in nose.',
    reason: 'Missing flat face (brachycephalic feature)'
  },
  {
    slug: 'ragdoll',
    prompt: 'Professional studio portrait of a LARGE Ragdoll cat, massive heavy body, semi-long silky coat in seal point pattern, bright blue eyes, white mittens on paws, fluffy tail, sitting position, majestic and large appearance, gray studio background, soft lighting, hyper-realistic, 8k quality. CRITICAL: must look LARGE and heavy, not small.',
    reason: 'Image too small, should be massive breed'
  },
  {
    slug: 'norvegiana',
    prompt: 'Professional studio portrait of a Norwegian Forest Cat, large athletic muscular body, triple-layer waterproof coat, long bushy tail, lynx-like ear tufts, wild natural look, brown tabby pattern, sitting proudly, gray studio background, soft lighting, hyper-realistic, 8k quality. CRITICAL: must look wild, athletic, with triple-layer coat.',
    reason: 'Duplicate image with Ragdoll, needs unique appearance'
  },
  {
    slug: 'maine-coon',
    prompt: 'Professional studio portrait of a MASSIVE Maine Coon cat, the LARGEST domestic cat breed, extremely large muscular body, long shaggy brown tabby coat, prominent neck ruff, very long bushy tail, large tufted ears, sitting majestically showing size, gray studio background, soft lighting, hyper-realistic, 8k quality. CRITICAL: must look ENORMOUS and majestic.',
    reason: 'Appears too small, should be 5.5-11kg giant'
  },
  {
    slug: 'bengaleza',
    prompt: 'Professional studio portrait of a Bengal cat with CLEAR LEOPARD ROSETTE SPOTS, golden-brown coat with distinct spotted/marbled pattern like a wild leopard, athletic muscular body, sleek short glossy coat, alert green eyes, sitting position, gray studio background, soft lighting, hyper-realistic, 8k quality. CRITICAL: spots MUST be clear and leopard-like.',
    reason: 'Leopard spots not clear enough'
  }
];

async function main() {
  console.log('🖼️  Generating CORRECT breed images...\n');
  
  for (const breed of BREEDS_TO_FIX) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🐱 Fixing: ${breed.slug.toUpperCase()}`);
    console.log(`📝 Reason: ${breed.reason}`);
    console.log(`${'='.repeat(60)}\n`);
    
    try {
      const imagePath = await generateArticleImage(
        breed.slug,
        breed.prompt,
        'breeds', // Output folder
        undefined,
        path.join(process.cwd(), 'public', 'images', 'breeds')
      );
      
      if (imagePath) {
        console.log(`✅ Generated: ${imagePath}`);
      } else {
        console.log(`⚠️  Skipped or failed: ${breed.slug}`);
      }
      
      // Wait between generations
      console.log('\n⏳ Waiting 10 seconds before next generation...\n');
      await new Promise(resolve => setTimeout(resolve, 10000));
      
    } catch (error) {
      console.error(`❌ Error generating ${breed.slug}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ DONE! All breed images regenerated.');
  console.log('📁 Check: public/images/breeds/');
  console.log('='.repeat(60) + '\n');
}

main().catch(console.error);
