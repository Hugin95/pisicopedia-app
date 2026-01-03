#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Fix all shortDescription to be max 80 characters
const regex = /shortDescription: '([^']+)'/g;

content = content.replace(regex, (match, desc) => {
  if (desc.length > 80) {
    const short = desc.substring(0, 77) + '...';
    return `shortDescription: '${short}'`;
  }
  return match;
});

fs.writeFileSync(dataPath, content, 'utf-8');

console.log('✅ Fixed all shortDescription to max 80 chars!');

