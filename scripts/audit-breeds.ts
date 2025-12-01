#!/usr/bin/env tsx

/**
 * Audit Script for Cat Breeds
 * Verifies all breeds have MDX files, images, and consistent data
 */

import * as fs from 'fs';
import * as path from 'path';
import { allBreeds } from '../lib/content-lists';
import { sampleBreeds } from '../lib/data';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface AuditResult {
  slug: string;
  name: string;
  hasMDX: boolean;
  hasImage: boolean;
  inDataFile: boolean;
  imagePath?: string;
  issues: string[];
}

function checkMDXExists(slug: string): boolean {
  const mdxPath = path.join(process.cwd(), 'content', 'breeds', `${slug}.mdx`);
  return fs.existsSync(mdxPath);
}

function checkImageExists(slug: string): string | null {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const imageDir = path.join(process.cwd(), 'public', 'images', 'breeds');

  for (const ext of imageExtensions) {
    const imagePath = path.join(imageDir, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `/images/breeds/${slug}${ext}`;
    }
  }

  return null;
}

function checkInDataFile(slug: string): boolean {
  return sampleBreeds.some(breed => breed.slug === slug);
}

async function auditBreeds() {
  console.log(`\n${colors.bright}${colors.cyan}🔍 BREED CONTENT AUDIT${colors.reset}`);
  console.log('='.repeat(80));

  const results: AuditResult[] = [];

  // Audit each breed from content-lists (source of truth)
  for (const breed of allBreeds) {
    const result: AuditResult = {
      slug: breed.slug,
      name: breed.name,
      hasMDX: false,
      hasImage: false,
      inDataFile: false,
      issues: [],
    };

    // Check MDX file
    result.hasMDX = checkMDXExists(breed.slug);
    if (!result.hasMDX) {
      result.issues.push('Missing MDX file');
    }

    // Check image
    const imagePath = checkImageExists(breed.slug);
    if (imagePath) {
      result.hasImage = true;
      result.imagePath = imagePath;
    } else {
      result.issues.push('Missing image');
    }

    // Check if in data.ts
    result.inDataFile = checkInDataFile(breed.slug);
    if (!result.inDataFile) {
      result.issues.push('Not in lib/data.ts');
    }

    results.push(result);
  }

  // Display results in a table format
  console.log(`\n${colors.bright}Breed Audit Results:${colors.reset}`);
  console.log('-'.repeat(80));
  console.log('Status | Breed Name                     | MDX | IMG | Data | Issues');
  console.log('-'.repeat(80));

  let totalOK = 0;
  let totalWarning = 0;
  let totalError = 0;

  for (const result of results) {
    const status = result.issues.length === 0
      ? `${colors.green}✅${colors.reset}`
      : result.issues.length === 1
        ? `${colors.yellow}⚠️${colors.reset}`
        : `${colors.red}❌${colors.reset}`;

    const mdx = result.hasMDX ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    const img = result.hasImage ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    const data = result.inDataFile ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

    const namePadded = result.name.padEnd(30);
    const issuesStr = result.issues.join(', ') || 'None';

    console.log(`${status}     | ${namePadded} | ${mdx}   | ${img}   | ${data}    | ${issuesStr}`);

    if (result.issues.length === 0) totalOK++;
    else if (result.issues.length === 1) totalWarning++;
    else totalError++;
  }

  console.log('-'.repeat(80));

  // Check for duplicate images
  console.log(`\n${colors.bright}${colors.cyan}🔍 CHECKING FOR DUPLICATE IMAGES${colors.reset}`);
  console.log('-'.repeat(80));

  const imageMap = new Map<string, string[]>();

  for (const result of results) {
    if (result.hasImage && result.imagePath) {
      const imagePath = result.imagePath;
      if (!imageMap.has(imagePath)) {
        imageMap.set(imagePath, []);
      }
      imageMap.get(imagePath)!.push(result.slug);
    }
  }

  const duplicateImages = Array.from(imageMap.entries())
    .filter(([_, slugs]) => slugs.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

  if (duplicateImages.length > 0) {
    console.log(`${colors.red}⚠️  Found ${duplicateImages.length} duplicate image(s):${colors.reset}\n`);

    for (const [imagePath, slugs] of duplicateImages) {
      console.log(`${colors.yellow}Image:${colors.reset} ${imagePath}`);
      console.log(`${colors.yellow}Used by ${slugs.length} breeds:${colors.reset}`);
      slugs.forEach(slug => {
        const breed = results.find(r => r.slug === slug);
        console.log(`   - ${slug} (${breed?.name})`);
      });
      console.log('');
    }
  } else {
    console.log(`${colors.green}✅ No duplicate images found${colors.reset}`);
  }

  console.log('-'.repeat(80));

  // Summary statistics
  console.log(`\n${colors.bright}📊 SUMMARY:${colors.reset}`);
  console.log(`Total breeds: ${allBreeds.length}`);
  console.log(`${colors.green}✅ Complete: ${totalOK}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Warnings: ${totalWarning}${colors.reset}`);
  console.log(`${colors.red}❌ Errors: ${totalError}${colors.reset}`);

  // Detailed issues
  const missingMDX = results.filter(r => !r.hasMDX);
  const missingImages = results.filter(r => !r.hasImage);
  const notInData = results.filter(r => !r.inDataFile);

  if (missingMDX.length > 0) {
    console.log(`\n${colors.yellow}📝 Missing MDX Files (${missingMDX.length}):${colors.reset}`);
    missingMDX.forEach(r => console.log(`   - ${r.slug} (${r.name})`));
  }

  if (missingImages.length > 0) {
    console.log(`\n${colors.yellow}🖼️  Missing Images (${missingImages.length}):${colors.reset}`);
    missingImages.forEach(r => console.log(`   - ${r.slug} (${r.name})`));
  }

  if (notInData.length > 0) {
    console.log(`\n${colors.yellow}📊 Not in lib/data.ts (${notInData.length}):${colors.reset}`);
    notInData.forEach(r => console.log(`   - ${r.slug} (${r.name})`));
  }

  // Recommendations
  if (missingMDX.length > 0) {
    console.log(`\n${colors.cyan}💡 To generate missing MDX files:${colors.reset}`);
    console.log('   npm run generate:breed');
  }

  if (missingImages.length > 0) {
    console.log(`\n${colors.cyan}💡 To generate missing images:${colors.reset}`);
    console.log('   npm run leonardo:breeds');
  }

  if (notInData.length > 0) {
    console.log(`\n${colors.cyan}💡 To update data.ts:${colors.reset}`);
    console.log('   tsx scripts/update-data-with-images.ts');
  }

  // Exit code
  const hasErrors = totalError > 0 || totalWarning > 0;
  if (hasErrors) {
    console.log(`\n${colors.red}❌ Audit found issues that need attention${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All breeds are complete!${colors.reset}`);
    process.exit(0);
  }
}

// Run the audit
auditBreeds().catch(error => {
  console.error('Error running breed audit:', error);
  process.exit(1);
});