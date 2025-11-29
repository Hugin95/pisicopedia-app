#!/usr/bin/env tsx

/**
 * Create placeholder images for missing breed and article images
 * This creates copies from existing images or default placeholders
 */

import * as fs from 'fs';
import * as path from 'path';
import { sampleBreeds, sampleArticles } from '../lib/data';

// Map to handle special cases
const breedImageMapping: Record<string, string> = {
  'persana': 'persiana.jpg', // Use existing persiana.jpg for persana
};

async function createPlaceholderImages() {
  console.log('🖼️  Creating placeholder images for missing content...\n');

  const breedsDir = path.join(process.cwd(), 'public', 'images', 'breeds');
  const articlesDir = path.join(process.cwd(), 'public', 'images', 'articles');

  // Ensure directories exist
  if (!fs.existsSync(breedsDir)) {
    fs.mkdirSync(breedsDir, { recursive: true });
  }
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  let createdCount = 0;

  // Process breeds
  console.log('📂 Processing breed images...');
  for (const breed of sampleBreeds) {
    const expectedFile = path.join(breedsDir, `${breed.slug}.jpg`);

    // Check if image already exists
    if (fs.existsSync(expectedFile)) {
      console.log(`✅ Exists: ${breed.slug}.jpg`);
      continue;
    }

    // Check for special mappings
    if (breedImageMapping[breed.slug]) {
      const sourceFile = path.join(breedsDir, breedImageMapping[breed.slug]);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, expectedFile);
        console.log(`📋 Copied: ${breedImageMapping[breed.slug]} → ${breed.slug}.jpg`);
        createdCount++;
        continue;
      }
    }

    // Use a similar existing breed image as placeholder
    const existingBreeds = ['british-shorthair.jpg', 'maine-coon.jpg', 'ragdoll.jpg', 'siameza.jpg', 'sfinx.jpg'];
    const randomExisting = existingBreeds[Math.floor(Math.random() * existingBreeds.length)];
    const sourceFile = path.join(breedsDir, randomExisting);

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, expectedFile);
      console.log(`🎨 Created placeholder: ${breed.slug}.jpg (from ${randomExisting})`);
      createdCount++;
    } else {
      // Fallback: copy default breed SVG
      const defaultSvg = path.join(process.cwd(), 'public', 'images', 'default-breed.svg');
      if (fs.existsSync(defaultSvg)) {
        // Create a simple placeholder by copying SVG (won't work as JPG but prevents 404)
        const svgContent = fs.readFileSync(defaultSvg, 'utf-8');
        fs.writeFileSync(expectedFile.replace('.jpg', '.svg'), svgContent);
        console.log(`⚠️  Created SVG placeholder: ${breed.slug}.svg`);
      }
    }
  }

  // Get unique article images needed
  console.log('\n📂 Processing article category images...');
  const uniqueArticleImages = new Set<string>();
  sampleArticles.forEach(article => {
    if (article.image) {
      const filename = article.image.split('/').pop();
      if (filename) uniqueArticleImages.add(filename);
    }
  });

  // Create article category images
  const categoryImages = ['simptome.jpg', 'boli-cronice.jpg', 'preventie.jpg', 'proceduri.jpg',
                          'nutritie.jpg', 'comportament.jpg', 'ingrijire.jpg', 'ghiduri.jpg'];

  for (const imageName of categoryImages) {
    const imagePath = path.join(articlesDir, imageName);

    if (fs.existsSync(imagePath)) {
      console.log(`✅ Exists: ${imageName}`);
      continue;
    }

    // Create a placeholder by copying an existing breed image
    const sourceBreed = path.join(breedsDir, 'british-shorthair.jpg');
    if (fs.existsSync(sourceBreed)) {
      fs.copyFileSync(sourceBreed, imagePath);
      console.log(`🎨 Created placeholder: ${imageName}`);
      createdCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Created ${createdCount} placeholder images`);
  console.log('\n💡 These are temporary placeholders!');
  console.log('   Run npm run leonardo:all to generate real images');
  console.log('   Then run npm run validate:content to verify');
}

// Run the script
createPlaceholderImages().catch(error => {
  console.error('Error creating placeholders:', error);
  process.exit(1);
});