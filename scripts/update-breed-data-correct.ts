#!/usr/bin/env tsx

/**
 * Update breed data with CORRECT information
 */

import * as fs from 'fs';
import * as path from 'path';
import { correctedBreedsData } from '../lib/breeds-corrected-data';

const dataFilePath = path.join(process.cwd(), 'lib', 'data.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf-8');

console.log('🔄 Updating breed data with CORRECT information...\n');

// Replace each breed's data with corrected data
let updatedContent = dataContent;
let updatedCount = 0;

Object.entries(correctedBreedsData).forEach(([slug, data]) => {
  console.log(`✓ Updating: ${slug}`);
  
  // Find the breed object and update it
  const breedRegex = new RegExp(
    `\\{\\s*slug:\\s*'${slug}',[\\s\\S]*?\\},`,
    'g'
  );
  
  const newBreedData = `{
    slug: '${slug}',
    title: '${data.description.split(' este ')[0]}',
    description: '${data.description}',
    shortDescription: '${data.description.substring(0, 100)}...',
    image: '/images/breeds/${slug}.jpg',
    thumbnail: '/images/breeds/${slug}.jpg',
    origin: '${getOrigin(slug)}',
    weight: '${data.weight}',
    lifeSpan: '${data.lifeSpan}',
    temperament: ${JSON.stringify(data.temperament)},
    activityLevel: ${data.activityLevel},
    healthConcerns: ${JSON.stringify(data.healthConcerns)},
    shedding: '${data.shedding}',
    grooming: '${data.grooming}',
    category: '${data.category}',
    size: '${data.size}',
    tags: ${JSON.stringify(getTags(data))},
  },`;
  
  if (breedRegex.test(updatedContent)) {
    updatedContent = updatedContent.replace(breedRegex, newBreedData);
    updatedCount++;
  }
});

fs.writeFileSync(dataFilePath, updatedContent, 'utf-8');

console.log(`\n✅ Updated ${updatedCount}/30 breeds with CORRECT data!`);
console.log('📝 File saved: lib/data.ts\n');

function getOrigin(slug: string): string {
  const origins: Record<string, string> = {
    'persana': 'Iran',
    'british-shorthair': 'Marea Britanie',
    'maine-coon': 'SUA',
    'siameza': 'Thailanda',
    'ragdoll': 'SUA',
    'sfinx': 'Canada',
    'norvegiana': 'Norvegia',
    'bengaleza': 'SUA',
    'scottish-fold': 'Scoția',
    'europeana': 'Europa',
    'russian-blue': 'Rusia',
    'birmaneza': 'Myanmar',
    'abissiniana': 'Etiopia',
    'devon-rex': 'Anglia',
    'oriental-shorthair': 'Thailanda',
    'exotic-shorthair': 'SUA',
    'siberiana': 'Rusia',
    'turceasca-angora': 'Turcia',
    'turceasca-van': 'Turcia',
    'chartreux': 'Franța',
    'balineza': 'SUA',
    'cornish-rex': 'Anglia',
    'manx': 'Insula Man',
    'himalayan': 'SUA',
    'somali': 'Somalia',
    'ocicat': 'SUA',
    'peterbald': 'Rusia',
    'savannah': 'SUA',
    'korat': 'Thailanda',
    'domestica-cu-par-scurt': 'Global'
  };
  return origins[slug] || 'Unknown';
}

function getTags(data: any): string[] {
  const tags: string[] = [];
  
  if (data.activityLevel <= 2) tags.push('indoor');
  if (data.temperament.includes('Calm') || data.temperament.includes('Afectuos')) {
    tags.push('family-friendly');
  }
  if (data.shedding === 'low' || data.shedding === 'very-low' || data.shedding === 'none') {
    tags.push('low-shedding');
  }
  if (data.grooming === 'low') tags.push('low-maintenance');
  if (data.size === 'large' || data.size === 'large-xlarge') tags.push('large');
  
  return tags.length > 0 ? tags : ['indoor'];
}

