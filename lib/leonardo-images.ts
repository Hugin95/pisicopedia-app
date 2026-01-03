/**
 * Leonardo.ai Image Generation for Articles
 * Helper functions for auto-generating images for blog posts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getLeonardoClient } from './leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from './leonardo-prompts';

// Generate prompt based on article topic
export function generateArticlePrompt(title: string, category: string, subcategory?: string): string {
  // Clean title for better prompts
  const cleanTitle = title
    .replace(/[?!]/g, '')
    .replace(/De ce/gi, '')
    .replace(/Cum să/gi, '')
    .replace(/Când să/gi, '')
    .trim();

  // Base prompt components
  let contextElements = [];

  // Add context based on category
  switch (category) {
    case 'symptoms':
      contextElements.push('showing signs of illness or discomfort');
      contextElements.push('veterinary examination context');
      break;
    case 'diseases':
      contextElements.push('in recovery or medical care setting');
      contextElements.push('peaceful and healing environment');
      break;
    case 'prevention':
      contextElements.push('in healthy preventive care context');
      contextElements.push('with vaccination or health check elements');
      break;
    case 'behavior':
      contextElements.push('showing natural cat behavior');
      contextElements.push('in home environment');
      break;
    case 'nutrition':
      contextElements.push('with healthy food bowls');
      contextElements.push('nutrition and feeding context');
      break;
    case 'procedures':
      contextElements.push('in clinical or veterinary setting');
      contextElements.push('calm medical procedure context');
      break;
    default:
      contextElements.push('in comfortable indoor setting');
  }

  // Build the prompt
  return `Professional illustration of a SINGLE healthy domestic cat ${contextElements.join(', ')}, related to topic: "${cleanTitle}", soft pastel background in lavender and rose tones, high detail, sharp focus, centered composition, medical and cozy style, no text, no watermark, no humans, realistic proportions`;
}

// Generate enhanced negative prompt for articles
export function getArticleNegativePrompt(): string {
  return getNegativePrompt() + ', two cats, multiple cats, two heads, extra heads, extra faces, extra eyes, multiple bodies, mutated, deformed, distorted anatomy, broken legs, twisted body, blurry, out of focus, low quality, sketch, cartoon, text, watermark, logo, cut off, cropped, extreme perspective, wide angle, humans, people, hands';
}

// Main function to generate and save article image
export async function generateArticleImage(
  slug: string,
  titleOrPrompt: string,
  categoryOrFolder: string = 'articles',
  subcategory?: string,
  outputDir?: string
): Promise<string | null> {
  console.log(`\n🎨 Generating image for: ${slug}`);

  // Check API key
  if (!process.env.LEONARDO_API_KEY) {
    throw new Error('LEONARDO_API_KEY is not set in environment variables');
  }

  const client = getLeonardoClient();
  const config = getLeonardoConfig();

  // Determine if categoryOrFolder is actually a folder name (guides, articles, breeds)
  const isFolder = ['guides', 'articles', 'breeds'].includes(categoryOrFolder);
  const folder = isFolder ? categoryOrFolder : 'articles';

  // Set output directory
  const articlesDir = outputDir || path.join(process.cwd(), 'public', 'images', folder);

  // Ensure directory exists
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  const outputPath = path.join(articlesDir, `${slug}.jpg`);
  const imagePath = `/images/${folder}/${slug}.jpg`;

  // Check if image already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  Image already exists: ${imagePath}`);
    return null; // Return null to indicate skip
  }

  try {
    // Generate prompts - if it looks like a full prompt, use it directly, otherwise generate
    const prompt = titleOrPrompt.length > 100 || titleOrPrompt.includes('professional') || titleOrPrompt.includes('photography')
      ? titleOrPrompt
      : generateArticlePrompt(titleOrPrompt, categoryOrFolder, subcategory);
    const negativePrompt = getArticleNegativePrompt();

    console.log('📝 Prompt:', prompt.substring(0, 100) + '...');

    // Generate and download image
    await client.generateAndDownload(prompt, outputPath, {
      negative_prompt: negativePrompt,
      ...config,
      width: 1024,
      height: 576, // 16:9 aspect ratio for article cards
      num_images: 1
    });

    console.log(`✅ Image generated successfully: ${imagePath}`);
    return imagePath;

  } catch (error: any) {
    console.error(`❌ Failed to generate image for ${slug}:`, error.message || error);

    // Return fallback image path
    const fallbackPath = '/images/placeholders/article-placeholder.svg';
    console.log(`⚠️  Using fallback image: ${fallbackPath}`);
    return fallbackPath;
  }
}

// Batch generate images for multiple articles
export async function generateBatchArticleImages(
  articles: Array<{
    slug: string;
    title: string;
    category: string;
    subcategory?: string;
  }>,
  delay: number = 3000
): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  console.log(`\n🎨 Generating images for ${articles.length} articles...`);

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    try {
      const imagePath = await generateArticleImage(
        article.slug,
        article.title,
        article.category,
        article.subcategory
      );

      if (imagePath) {
        results.set(article.slug, imagePath);
      }

      // Add delay between requests
      if (i < articles.length - 1) {
        console.log(`⏳ Waiting ${delay / 1000} seconds before next generation...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`Failed to generate image for ${article.slug}:`, error);
      results.set(article.slug, '/images/placeholders/article-placeholder.svg');
    }
  }

  return results;
}

// Check if article image exists
export function articleImageExists(slug: string, baseDir?: string): boolean {
  const articlesDir = baseDir || path.join(process.cwd(), 'public', 'images', 'articles');
  const imagePath = path.join(articlesDir, `${slug}.jpg`);
  return fs.existsSync(imagePath);
}

// Get article image path (with fallback)
export function getArticleImagePath(slug: string, fallback: boolean = true): string {
  if (articleImageExists(slug)) {
    return `/images/articles/${slug}.jpg`;
  }

  return fallback ? '/images/placeholders/article-placeholder.svg' : '';
}