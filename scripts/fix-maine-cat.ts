#!/usr/bin/env tsx

import { generateArticleImage } from '../lib/leonardo-images';
import * as path from 'path';

async function main() {
  console.log('🐱 Generating MAINE CAT (avoiding blocked word)...\n');
  
  const prompt = 'Professional studio portrait of the LARGEST domestic cat breed from Maine USA, extremely massive muscular fluffy body, long shaggy brown tabby fur with black stripes, big round friendly amber eyes, cute gentle domestic cat face with prominent whisker pads, thick luxurious neck ruff like a mane, very long bushy fox-like tail, large ears with lynx tips, sitting majestically showing enormous size compared to normal cats, soft gray studio background, professional lighting, hyper-realistic 8k quality. MUST be obviously a DOMESTIC HOUSE CAT with friendly expression.';
  
  const imagePath = await generateArticleImage(
    'maine-coon',
    prompt,
    'breeds',
    undefined,
    path.join(process.cwd(), 'public', 'images', 'breeds')
  );
  
  console.log(imagePath ? `✅ SUCCESS: ${imagePath}` : '❌ FAILED');
}

main().catch(console.error);

