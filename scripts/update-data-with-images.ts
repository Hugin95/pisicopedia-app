#!/usr/bin/env tsx

/**
 * Update lib/data.ts with all 30 breeds and articles with correct image paths
 * This script generates the complete data structure for Pisicopedia.ro
 */

import * as fs from 'fs';
import * as path from 'path';
import { allBreeds, allArticles } from '../lib/content-lists';
import type { Breed, Article } from '../types';

// Map subcategories to image files
const articleImageMap: Record<string, string> = {
  'apetit': 'simptome.jpg',
  'digestive': 'simptome.jpg',
  'respiratorii': 'simptome.jpg',
  'cronice': 'boli-cronice.jpg',
  'endocrine': 'boli-cronice.jpg',
  'virale': 'boli-cronice.jpg',
  'urinare': 'boli-cronice.jpg',
  'locomotorii': 'boli-cronice.jpg',
  'piele': 'simptome.jpg',
  'vaccinuri': 'preventie.jpg',
  'paraziți': 'preventie.jpg',
  'igiena': 'ingrijire.jpg',
  'chirurgie': 'proceduri.jpg',
  'diagnostic': 'proceduri.jpg',
  'management-greutate': 'nutritie.jpg',
  'diete-terapeutice': 'nutritie.jpg',
  'pui': 'nutritie.jpg',
  'psihologic': 'comportament.jpg',
  'socializare': 'comportament.jpg',
  'probleme': 'comportament.jpg',
  'grooming': 'ingrijire.jpg',
  'gheare': 'ingrijire.jpg',
  'călătorii': 'ghiduri.jpg',
};

// Generate breed data
function generateBreedData(): string {
  const breeds = allBreeds.map((breed, index) => {
    const breedData: Breed = {
      slug: breed.slug,
      title: breed.name,
      description: `${breed.name} este o rasă de pisică originară din ${breed.origin}, cunoscută pentru caracteristicile sale unice și temperamentul său distinctiv.`,
      shortDescription: `Rasă din ${breed.origin}, perfectă pentru iubitorii de pisici.`,
      image: `/images/breeds/${breed.slug}.jpg`,
      thumbnail: `/images/breeds/${breed.slug}.jpg`,
      origin: breed.origin,
      weight: index < 10 ? '3.5-5.5 kg' : '4-7 kg', // Placeholder weights
      lifeSpan: '12-16 ani',
      temperament: ['Calm', 'Afectuos', 'Inteligent', 'Loial'],
      activityLevel: 3,
      healthConcerns: ['Verificări regulate necesare', 'Dietă echilibrată recomandată'],
      shedding: 'medium' as const,
      grooming: index % 3 === 0 ? 'high' : 'medium' as const,
      category: index % 2 === 0 ? 'longhaired' : 'shorthaired' as const,
      size: index < 10 ? 'medium' : 'large' as const,
      tags: ['family-friendly', 'indoor'],
    };

    return `  {
    slug: '${breedData.slug}',
    title: '${breedData.title}',
    description: '${breedData.description}',
    shortDescription: '${breedData.shortDescription}',
    image: '${breedData.image}',
    thumbnail: '${breedData.thumbnail}',
    origin: '${breedData.origin}',
    weight: '${breedData.weight}',
    lifeSpan: '${breedData.lifeSpan}',
    temperament: ${JSON.stringify(breedData.temperament)},
    activityLevel: ${breedData.activityLevel},
    healthConcerns: ${JSON.stringify(breedData.healthConcerns)},
    shedding: '${breedData.shedding}',
    grooming: '${breedData.grooming}',
    category: '${breedData.category}',
    size: '${breedData.size}',
    tags: ${JSON.stringify(breedData.tags)},
  }`;
  }).join(',\n');

  return breeds;
}

// Map Romanian categories to English (as defined in types)
const categoryMap: Record<string, string> = {
  'simptome': 'symptoms',
  'boli': 'diseases',
  'preventie': 'prevention',
  'proceduri': 'procedures',
  'nutritie': 'nutrition',
  'comportament': 'behavior',
  'ingrijire': 'prevention',
  'ghiduri': 'procedures',
};

// Generate article data
function generateArticleData(): string {
  const articles = allArticles.slice(0, 10).map((article, index) => {
    const imageFile = articleImageMap[article.subcategory] || 'ghiduri.jpg';
    const englishCategory = categoryMap[article.category] || 'procedures';

    const articleData: Article = {
      slug: article.slug,
      title: article.title,
      description: `${article.title} - ghid complet pentru proprietarii de pisici.`,
      excerpt: `Ghid complet despre ${article.title.toLowerCase()}. Află tot ce trebuie să știi pentru sănătatea pisicii tale.`,
      content: '', // Content will be in MDX files
      image: `/images/articles/${imageFile}`,
      category: englishCategory as any,
      date: new Date(2024, 0, 15 + index).toISOString().split('T')[0],
      author: 'Dr. Veterinar Pisicopedia',
      readingTime: 5 + (index % 3),
      tags: [article.category, article.subcategory],
    };

    return `  {
    slug: '${articleData.slug}',
    title: '${articleData.title}',
    description: '${articleData.description}',
    excerpt: '${articleData.excerpt}',
    content: '',
    image: '${articleData.image}',
    category: '${articleData.category}',
    date: '${articleData.date}',
    author: '${articleData.author}',
    readingTime: ${articleData.readingTime},
    tags: ${JSON.stringify(articleData.tags)},
  }`;
  }).join(',\n');

  return articles;
}

// Generate the complete data.ts file
function generateDataFile(): string {
  return `// Complete data for Pisicopedia.ro - All 30 breeds and articles
// Auto-generated by scripts/update-data-with-images.ts
import { Breed, Article, Guide } from '@/types';

// All ${allBreeds.length} cat breeds with images
export const sampleBreeds: Breed[] = [
${generateBreedData()}
];

// First 10 health articles with category images
export const sampleArticles: Article[] = [
${generateArticleData()}
];

// Sample guides (to be expanded)
export const sampleGuides: Guide[] = [
  {
    slug: 'ghid-ingrijire-pisica-nou-nascuta',
    title: 'Îngrijirea pisicii nou-născute',
    description: 'Tot ce trebuie să știi despre îngrijirea unui pui de pisică',
    category: 'care',
    image: '/images/guides/kitten-care.jpg',
    readingTime: 15,
    tags: ['pui', 'ingrijire', 'nou-nascuti'],
  },
  {
    slug: 'ghid-hranire-pisica',
    title: 'Ghid complet de hrănire',
    description: 'Cum să hrănești corect pisica în funcție de vârstă și nevoi',
    category: 'care',
    image: '/images/guides/feeding-guide.jpg',
    readingTime: 10,
    tags: ['nutritie', 'hrana', 'dieta'],
  },
];

// Helper functions
export async function getAllBreeds(): Promise<Breed[]> {
  return sampleBreeds;
}

export async function getBreedBySlug(slug: string): Promise<Breed | undefined> {
  return sampleBreeds.find((breed) => breed.slug === slug);
}

export async function getFeaturedBreeds(): Promise<Breed[]> {
  return sampleBreeds.slice(0, 6);
}

export async function getAllArticles(): Promise<Article[]> {
  return sampleArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return sampleArticles.find((article) => article.slug === slug);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return sampleArticles.slice(0, 6);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return sampleArticles.filter((article) => article.category === category);
}

export async function getAllGuides(): Promise<Guide[]> {
  return sampleGuides;
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  return sampleGuides.find((guide) => guide.slug === slug);
}

// Alias functions for backward compatibility
export async function getTopBreeds(limit?: number): Promise<Breed[]> {
  return limit ? sampleBreeds.slice(0, limit) : sampleBreeds;
}

export async function getLatestArticles(limit?: number): Promise<Article[]> {
  return limit ? sampleArticles.slice(0, limit) : sampleArticles;
}

export async function getTopGuides(limit?: number): Promise<Guide[]> {
  return limit ? sampleGuides.slice(0, limit) : sampleGuides;
}
`;
}

// Main function
async function updateDataWithImages() {
  console.log('📝 Updating lib/data.ts with all breeds and articles...\n');

  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
  const backupPath = path.join(process.cwd(), 'lib', 'data.ts.backup');

  try {
    // Create backup
    if (fs.existsSync(dataPath)) {
      fs.copyFileSync(dataPath, backupPath);
      console.log('✅ Created backup: lib/data.ts.backup');
    }

    // Generate and write new data file
    const newContent = generateDataFile();
    fs.writeFileSync(dataPath, newContent);

    console.log('✅ Updated lib/data.ts with:');
    console.log(`   - ${allBreeds.length} breeds (all with image paths)`);
    console.log(`   - 10 articles (with category-based images)`);
    console.log(`   - 2 sample guides`);

    console.log('\n📋 Image mapping for articles:');
    console.log('   - Simptome → simptome.jpg');
    console.log('   - Boli cronice → boli-cronice.jpg');
    console.log('   - Prevenție → preventie.jpg');
    console.log('   - Proceduri → proceduri.jpg');
    console.log('   - Nutriție → nutritie.jpg');
    console.log('   - Comportament → comportament.jpg');
    console.log('   - Îngrijire → ingrijire.jpg');
    console.log('   - Ghiduri → ghiduri.jpg');

    console.log('\n💡 Next steps:');
    console.log('   1. Run: npm run leonardo:all (to generate all images)');
    console.log('   2. Run: npm run validate:content (to check everything)');
    console.log('   3. Run: npm run build (to verify no errors)');

  } catch (error) {
    console.error('❌ Error updating data.ts:', error);

    // Restore backup if exists
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, dataPath);
      console.log('↩️  Restored from backup');
    }
    process.exit(1);
  }
}

// Run the update
updateDataWithImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});