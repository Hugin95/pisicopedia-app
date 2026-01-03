#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { allBreeds } from '../lib/content-lists';

const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

console.log('🔧 Fixing ALL breed titles from content-lists...\n');

allBreeds.forEach(breed => {
  // Find and replace the title for this breed
  const regex = new RegExp(`(slug: '${breed.slug}',\\s+)title: '[^']+',`, 'g');
  const replacement = `$1title: '${breed.name}',`;
  
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log(`✓ Fixed: ${breed.slug} -> "${breed.name}"`);
  }
});

fs.writeFileSync(dataPath, content, 'utf-8');

console.log('\n✅ All titles fixed!');

