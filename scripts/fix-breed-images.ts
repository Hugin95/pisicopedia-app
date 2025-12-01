/**
 * Fix Breed Image Frontmatter
 *
 * Adds missing 'image' field to breed MDX frontmatter when the image file exists
 *
 * Usage:
 *   npm run fix:breed-images
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BREEDS_DIR = path.join(process.cwd(), 'content', 'breeds');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllBreedFiles(): string[] {
  const files = fs.readdirSync(BREEDS_DIR);
  return files.filter(file => file.endsWith('.mdx'));
}

function fixBreedImageFrontmatter() {
  console.log('🔧 Fixing breed image frontmatter...\n');

  const breedFiles = getAllBreedFiles();
  let fixedCount = 0;
  let skippedCount = 0;

  breedFiles.forEach(filename => {
    const filePath = path.join(BREEDS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const slug = data.slug || filename.replace('.mdx', '');

    // Check if image field is missing
    if (!data.image) {
      // Check if image file exists
      const imagePath = `/images/breeds/${slug}.jpg`;
      const imageFilePath = path.join(PUBLIC_DIR, imagePath);

      if (fs.existsSync(imageFilePath)) {
        // Add image field to frontmatter
        data.image = imagePath;

        // Reconstruct the file with updated frontmatter
        const updatedFile = matter.stringify(content, data);
        fs.writeFileSync(filePath, updatedFile, 'utf-8');

        console.log(`✅ Fixed: ${slug} → ${imagePath}`);
        fixedCount++;
      } else {
        console.log(`⚠️  Skipped: ${slug} (image file doesn't exist)`);
        skippedCount++;
      }
    } else {
      skippedCount++;
    }
  });

  console.log('\n━'.repeat(60));
  console.log(`✅ Fixed ${fixedCount} breed(s)`);
  console.log(`⏭️  Skipped ${skippedCount} breed(s) (already have image field or file doesn't exist)`);
  console.log('━'.repeat(60));
}

// Run fix
fixBreedImageFrontmatter();
