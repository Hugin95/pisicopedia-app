#!/usr/bin/env tsx

import { generateArticleImage } from '../lib/leonardo-images';
import * as path from 'path';

async function main() {
  console.log('🐱 Regenerating Maine Coon - DOMESTIC CAT not lion!\n');
  
  const prompt = 'Professional studio portrait of a MASSIVE fluffy domestic house cat, Maine Coon breed, extremely large muscular body with long shaggy brown tabby fur, big round friendly eyes, cute domestic cat face (NOT lion face), prominent neck fur ruff, very bushy tail, large ears with tufts, sitting majestically, gray studio background, soft lighting, hyper-realistic 8k. CRITICAL: must look like a FRIENDLY DOMESTIC CAT with cute face, NOT a wild animal or lion.';
  
  const imagePath = await generateArticleImage(
    'maine-coon',
    prompt,
    'breeds',
    undefined,
    path.join(process.cwd(), 'public', 'images', 'breeds')
  );
  
  console.log(imagePath ? `✅ ${imagePath}` : '❌ Failed');
}

main().catch(console.error);

