/**
 * Image Audit Script for Pisicopedia.ro
 *
 * Audits breed images to identify:
 * - Duplicates (same image used by multiple breeds)
 * - Missing images (breeds without image field or missing files)
 * - Broken paths
 *
 * Usage:
 *   npm run audit:images
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BreedImageInfo {
  slug: string;
  title: string;
  image: string | null;
  fileExists: boolean;
}

const BREEDS_DIR = path.join(process.cwd(), 'content', 'breeds');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllBreedFiles(): string[] {
  const files = fs.readdirSync(BREEDS_DIR);
  return files.filter(file => file.endsWith('.mdx'));
}

function parseBreedFile(filename: string): BreedImageInfo {
  const filePath = path.join(BREEDS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  const slug = data.slug || filename.replace('.mdx', '');
  const title = data.title || slug;
  const image = data.image || null;

  let fileExists = false;
  if (image) {
    // Convert /images/breeds/foo.jpg to public/images/breeds/foo.jpg
    const imagePath = path.join(PUBLIC_DIR, image.replace(/^\//, ''));
    fileExists = fs.existsSync(imagePath);
  }

  return {
    slug,
    title,
    image,
    fileExists,
  };
}

function auditImages() {
  console.log('🔍 Starting image audit...\n');

  const breedFiles = getAllBreedFiles();
  const breedImages: BreedImageInfo[] = breedFiles.map(parseBreedFile);

  // Track issues
  const duplicates = new Map<string, string[]>(); // image path -> [breed slugs]
  const missingImages: BreedImageInfo[] = [];
  const brokenPaths: BreedImageInfo[] = [];

  // Build duplicate map
  breedImages.forEach(breed => {
    if (breed.image) {
      if (!duplicates.has(breed.image)) {
        duplicates.set(breed.image, []);
      }
      duplicates.get(breed.image)!.push(breed.slug);
    }
  });

  // Identify issues
  breedImages.forEach(breed => {
    if (!breed.image) {
      missingImages.push(breed);
    } else if (!breed.fileExists) {
      brokenPaths.push(breed);
    }
  });

  // Filter to only actual duplicates (used by 2+ breeds)
  const actualDuplicates = Array.from(duplicates.entries())
    .filter(([_, breeds]) => breeds.length > 1);

  // Print results
  console.log(`📊 Total breeds analyzed: ${breedImages.length}\n`);

  // 1. Duplicates
  if (actualDuplicates.length > 0) {
    console.log(`⚠️  DUPLICATES FOUND: ${actualDuplicates.length} images used by multiple breeds\n`);
    actualDuplicates.forEach(([imagePath, breeds]) => {
      console.log(`  ${imagePath}`);
      console.log(`    Used by: ${breeds.join(', ')}`);
      console.log('');
    });
  } else {
    console.log('✅ No duplicate images found\n');
  }

  // 2. Missing images
  if (missingImages.length > 0) {
    console.log(`⚠️  MISSING IMAGES: ${missingImages.length} breeds without image field\n`);
    missingImages.forEach(breed => {
      console.log(`  - ${breed.slug} (${breed.title})`);
    });
    console.log('');
  } else {
    console.log('✅ No breeds with missing image fields\n');
  }

  // 3. Broken paths
  if (brokenPaths.length > 0) {
    console.log(`❌ BROKEN PATHS: ${brokenPaths.length} breeds with non-existent image files\n`);
    brokenPaths.forEach(breed => {
      console.log(`  - ${breed.slug}: ${breed.image}`);
    });
    console.log('');
  } else {
    console.log('✅ All image files exist\n');
  }

  // Summary
  const totalIssues = actualDuplicates.length + missingImages.length + brokenPaths.length;

  console.log('━'.repeat(60));
  if (totalIssues === 0) {
    console.log('✅ All breed images are unique and valid!');
  } else {
    console.log(`⚠️  Total issues found: ${totalIssues}`);
    console.log(`   - ${actualDuplicates.length} duplicate images`);
    console.log(`   - ${missingImages.length} missing image fields`);
    console.log(`   - ${brokenPaths.length} broken image paths`);
  }
  console.log('━'.repeat(60));

  // Return exit code
  process.exit(totalIssues > 0 ? 1 : 0);
}

// Run audit
auditImages();
