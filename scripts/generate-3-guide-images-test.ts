#!/usr/bin/env tsx

/**
 * Generate Images for First 3 Guides (TEST)
 */

import * as dotenv from 'dotenv';
import { allGuides } from '../lib/content-lists';
import { generateArticleImage } from '../lib/leonardo-images';

dotenv.config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
  yellow: '\x1b[33m',
};

// Generate appropriate prompts for each guide category
function getPromptForGuide(guide: any): string {
  const baseStyle = "professional photography, clean modern aesthetic, warm lighting, high quality, 8k";
  
  const prompts: Record<string, string> = {
    'pregatire-casa-pisica': `Modern home interior prepared for a new cat, with cozy cat bed, scratching post, food bowls, and toys neatly arranged, ${baseStyle}`,
    'alegere-litiera': `Various types of modern cat litter boxes displayed side by side, clean bathroom setting, comparison view, ${baseStyle}`,
    'amenajare-spatiu': `Beautiful cat-friendly apartment with cat trees, shelves, hiding spots, and play areas, modern interior design, ${baseStyle}`,
  };

  return prompts[guide.slug] || `Beautiful cat in a ${guide.category} setting, ${baseStyle}`;
}

async function generateTestImages() {
  console.log(`${colors.blue}🎨 Generating 3 test images for guides...${colors.reset}\n`);

  const testGuides = allGuides.slice(0, 3);
  let successCount = 0;

  for (const guide of testGuides) {
    try {
      console.log(`${colors.blue}📸 Processing: ${guide.title}${colors.reset}`);
      
      const prompt = getPromptForGuide(guide);
      console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

      const imagePath = await generateArticleImage(guide.slug, prompt, 'guides');
      
      if (imagePath) {
        console.log(`${colors.green}✅ Generated: ${imagePath}${colors.reset}\n`);
        successCount++;
      } else {
        console.log(`${colors.yellow}⏭️  Skipped (already exists)${colors.reset}\n`);
      }

      // Wait 2 seconds between generations
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error: any) {
      console.error(`${colors.yellow}❌ Error for ${guide.slug}: ${error.message}${colors.reset}\n`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.green}✅ Successfully generated: ${successCount}/3${colors.reset}`);
  console.log('='.repeat(60));
}

generateTestImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

