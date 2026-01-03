#!/usr/bin/env tsx

import { generateArticleImage } from '../lib/leonardo-images';
import * as fs from 'fs';
import * as path from 'path';

const duplicates = [
  // Group 1 - Siamese-like (need unique images)
  { slug: 'abissiniana', prompt: 'Elegant Abyssinian cat with ticked agouti coat (warm reddish-brown with black ticking), large almond-shaped green eyes, alert expression, athletic muscular build, studio portrait on neutral gray background' },
  { slug: 'balineza', prompt: 'Graceful Balinese cat with long silky fur, color-point pattern (cream body with dark brown points on face ears legs tail), bright blue almond eyes, plumed tail, elegant posture, studio portrait on soft purple background' },
  { slug: 'devon-rex', prompt: 'Unique Devon Rex cat with curly wavy short coat, very large bat-like ears, elfin triangular face, slender body, playful pose, soft gray colored coat, studio portrait on dark background' },
  { slug: 'domestica-cu-par-scurt', prompt: 'Common domestic shorthair cat, classic brown tabby pattern, medium build, friendly alert expression, sitting pose, warm orange-brown coat with black stripes, studio portrait on neutral beige background' },
  { slug: 'oriental-shorthair', prompt: 'Sleek Oriental Shorthair cat with very large ears, wedge-shaped head, slender elegant body, solid chocolate brown coat, green almond eyes, sitting gracefully, studio portrait on gray background' },
  { slug: 'somali', prompt: 'Beautiful Somali cat with long fluffy ticked coat (fox-like), warm orange-red with black ticking, bushy tail, large tufted ears, green-gold eyes, regal sitting pose, studio portrait on soft brown background' },
  { slug: 'turceasca-angora', prompt: 'Elegant Turkish Angora cat with pure white long silky fur, blue eyes or odd eyes (one blue one gold), graceful slender build, plumed tail, sitting pose, studio portrait on soft gray background' },
  
  // Group 2 - Birman-like
  { slug: 'birmaneza', prompt: 'Sacred Birman cat with cream colored body, dark seal point markings on face ears legs tail, bright blue eyes, distinctive white "gloves" on all four paws, medium long fluffy coat, sitting elegantly, studio portrait on soft purple background' },
  { slug: 'ocicat', prompt: 'Spotted Ocicat with distinctive wild leopard-like spots on tawny golden coat, muscular athletic build, almond eyes, confident pose, studio portrait on neutral gray background' },
  { slug: 'savannah', prompt: 'Exotic Savannah cat with wild serval-like appearance, tall ears, golden coat with black spots, very long legs, sleek athletic body, alert standing pose, studio portrait on dark background' },
  
  // Group 3 - British/Siberian
  { slug: 'siberiana', prompt: 'Majestic Siberian cat with thick triple-layer long fur, brown tabby pattern, large rounded face, tufted ears, bushy tail, powerful muscular build, sitting pose, studio portrait on soft gray background' },
  
  // Group 4 - Gray/Blue cats
  { slug: 'chartreux', prompt: 'Chartreux cat with solid blue-gray dense woolly coat, copper or orange round eyes, round chubby cheeks, stocky muscular build, sitting pose, studio portrait on neutral background' },
  { slug: 'cornish-rex', prompt: 'Slender Cornish Rex cat with curly wavy short coat, very large ears, arched back, long legs, elegant greyhound-like build, orange-brown colored coat, standing pose, studio portrait on neutral background' },
  { slug: 'europeana', prompt: 'European Shorthair cat with classic brown tabby pattern, strong muscular build, round face, alert expression, sitting pose, warm brown coat with black stripes, studio portrait on neutral background' },
  { slug: 'russian-blue', prompt: 'Russian Blue cat with solid blue-gray short dense coat (silvery sheen), vivid green eyes, elegant slender build, gentle smile expression, sitting gracefully, studio portrait on soft gray background' },
  
  // Group 5 - Hairless/tailless
  { slug: 'manx', prompt: 'Tailless Manx cat with round body, no tail (rumpy), short dense coat in brown tabby pattern, strong muscular hind legs, round face, sitting pose showing missing tail, studio portrait on neutral background' },
  { slug: 'peterbald', prompt: 'Hairless Peterbald cat with completely bald skin (gray-pink color), very large ears, wedge-shaped oriental head, slender elegant body, long legs, standing pose, studio portrait on dark gray background' },
  { slug: 'turceasca-van', prompt: 'Turkish Van cat with distinctive van pattern (mostly white with colored markings only on head and tail), amber eyes, semi-long coat, athletic muscular build, sitting pose, studio portrait on light background' },
];

async function regenerateDuplicates() {
  console.log('🔧 REGENERATING 18 DUPLICATE BREED IMAGES\n');
  console.log('⏱️  Estimated time: ~20 minutes (with delays)\n');
  
  let success = 0;
  let failed = 0;
  
  for (const [index, breed] of duplicates.entries()) {
    console.log(`\n[${ index + 1}/18] 🎨 Generating: ${breed.slug}`);
    
    try {
      const imagePath = await generateArticleImage(
        breed.slug,
        breed.prompt,
        'breeds'
      );
      
      if (imagePath) {
        console.log(`✅ SUCCESS: ${breed.slug}`);
        success++;
      } else {
        console.log(`❌ FAILED: ${breed.slug}`);
        failed++;
      }
      
      // Delay between generations
      if (index < duplicates.length - 1) {
        console.log('⏳ Waiting 15s before next generation...');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
    } catch (error: any) {
      console.error(`❌ ERROR for ${breed.slug}:`, error.message);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(50));
}

regenerateDuplicates();

