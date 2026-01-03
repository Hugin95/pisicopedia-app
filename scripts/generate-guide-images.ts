#!/usr/bin/env tsx

/**
 * Generate Images for All Guides using Leonardo.ai
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
    // Îngrijire de bază
    'pregatire-casa-pisica': `Modern home interior prepared for a new cat, with cozy cat bed, scratching post, food bowls, and toys neatly arranged, ${baseStyle}`,
    'alegere-litiera': `Various types of modern cat litter boxes displayed side by side, clean bathroom setting, comparison view, ${baseStyle}`,
    'amenajare-spatiu': `Beautiful cat-friendly apartment with cat trees, shelves, hiding spots, and play areas, modern interior design, ${baseStyle}`,
    'igiena-zilnica': `Cute cat being groomed, brushing fur, nail trimming tools, grooming supplies arranged neatly, ${baseStyle}`,
    
    // Sănătate preventivă
    'calendar-vaccinare': `Gentle veterinarian preparing vaccine for a calm cat on examination table, medical office setting, caring atmosphere, ${baseStyle}`,
    'ghid-deparazitare': `Veterinarian showing deworming medication to cat owner, medical consultation, informative scene, ${baseStyle}`,
    'sterilizare-pro-contra': `Post-surgery recovery cat resting comfortably in protective cone, veterinary care, compassionate setting, ${baseStyle}`,
    'controale-veterinare': `Cat getting check-up at modern veterinary clinic, friendly vet examining healthy cat, ${baseStyle}`,
    
    // Nutriție
    'hrana-uscata-vs-umeda': `Split image of dry cat food in one bowl and wet food in another, comparison display, appetizing presentation, ${baseStyle}`,
    'calculare-portii': `Measuring cup with cat food, kitchen scale, portion control tools, healthy cat watching, ${baseStyle}`,
    'alimente-periculoase': `Display of dangerous foods for cats (chocolate, onions, grapes) with red X marks, warning visual, ${baseStyle}`,
    'diete-speciale': `Veterinary prescription diet cat food bags and bowls, medical nutrition concept, ${baseStyle}`,
    
    // Comportament
    'limbaj-pisica': `Cat displaying various body language positions - happy, scared, playful, curious, educational illustration style, ${baseStyle}`,
    'dresaj-pisica': `Cat being trained with clicker and treats, positive reinforcement training session, ${baseStyle}`,
    'probleme-comportament': `Cat scratching appropriate scratching post instead of furniture, behavioral training success, ${baseStyle}`,
    'jucarii-imbogatire': `Collection of interactive cat toys, puzzle feeders, cat trees, enrichment items displayed, ${baseStyle}`,
    
    // Creștere pui
    'pui-nou-nascuti': `Newborn kittens nursing with mother cat, cozy nest, tender moment, ${baseStyle}`,
    'intarcare-pui': `Tiny kitten eating from small bowl, weaning process, adorable feeding time, ${baseStyle}`,
    'socializare-pui': `Playful kittens interacting with toys and humans, socialization training, ${baseStyle}`,
    'prima-vizita-veterinar': `Kitten getting first check-up, gentle vet handling small cat, first visit experience, ${baseStyle}`,
    
    // Îngrijire senior
    'ingrijire-senior': `Elderly cat resting on comfortable orthopedic bed, senior care setup, peaceful scene, ${baseStyle}`,
    'probleme-senior': `Senior cat at veterinary exam, health check for older cat, compassionate care, ${baseStyle}`,
    'adaptare-casa-senior': `Home adapted for senior cat with ramps, low-entry litter box, easy-access food bowls, ${baseStyle}`,
    'nutritie-senior': `Senior cat food specially formulated for older cats, age-appropriate nutrition, ${baseStyle}`,
  };

  return prompts[guide.slug] || `Beautiful cat in a ${guide.category} setting, ${baseStyle}`;
}

async function generateAllGuideImages() {
  console.log(`${colors.blue}🎨 Starting guide image generation for ${allGuides.length} guides...${colors.reset}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const guide of allGuides) {
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
        skipCount++;
      }

      // Wait 2 seconds between generations to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error: any) {
      console.error(`${colors.yellow}❌ Error for ${guide.slug}: ${error.message}${colors.reset}\n`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.green}✅ Successfully generated: ${successCount}${colors.reset}`);
  console.log(`${colors.yellow}⏭️  Skipped (existed): ${skipCount}${colors.reset}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(60));
}

generateAllGuideImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

