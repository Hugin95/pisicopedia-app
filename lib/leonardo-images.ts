/**
 * Leonardo.ai Image Generation for Articles
 * Helper functions for auto-generating images for blog posts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getLeonardoClient } from './leonardo-client';
import { getNegativePrompt, getLeonardoConfig } from './leonardo-prompts';
import { supabaseAdmin } from './supabase';

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

  // Build the prompt - PHOTO-REALISTIC style
  return `Professional studio photograph of a SINGLE healthy domestic cat ${contextElements.join(', ')}, related to topic: "${cleanTitle}", soft pastel background in lavender and rose tones, high-resolution DSLR photography, 8K ultra-sharp focus, natural lighting, photorealistic, detailed fur texture, realistic cat anatomy, veterinary photography style, no text, no watermark, no humans, no illustrations, no drawings, real photograph`;
}

// Generate enhanced negative prompt for articles
export function getArticleNegativePrompt(): string {
  return getNegativePrompt() + ', two cats, multiple cats, two heads, extra heads, extra faces, extra eyes, multiple bodies, mutated, deformed, distorted anatomy, broken legs, twisted body, blurry, out of focus, low quality, sketch, cartoon, illustration, drawing, painting, artwork, artistic rendering, 3D render, CGI, text, watermark, logo, cut off, cropped, extreme perspective, wide angle, humans, people, hands, animated, anime';
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

  // Check if running in Vercel (read-only filesystem)
  const isVercel = process.env.VERCEL === '1';

  if (isVercel) {
    // Use Supabase Storage for Vercel environment
    console.log('🔄 Using Supabase Storage (Vercel environment)');

    try {
      // Generate prompts
      const prompt = titleOrPrompt.length > 100 || titleOrPrompt.includes('professional') || titleOrPrompt.includes('photography')
        ? titleOrPrompt
        : generateArticlePrompt(titleOrPrompt, categoryOrFolder, subcategory);
      const negativePrompt = getArticleNegativePrompt();

      console.log('📝 Prompt:', prompt.substring(0, 100) + '...');

      // Step 1: Generate image with Leonardo
      const generateResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: negativePrompt,
          // Leonardo Kino XL - Best photorealistic model
          modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628',
          width: 1344,  // Higher resolution for clarity
          height: 768,  // 16:9 aspect ratio
          num_images: 1,
          // PhotoReal v2 settings for ultra-realistic images
          alchemy: true,
          photoReal: true,
          photoRealVersion: 'v2',
          presetStyle: 'CINEMATIC',
          guidance_scale: 7,
        }),
      });

      const generateData: any = await generateResponse.json();

      if (!generateData.sdGenerationJob?.generationId) {
        throw new Error('Leonardo generation failed');
      }

      const generationId = generateData.sdGenerationJob.generationId;

      // Step 2: Poll for completion
      let attempts = 0;
      const maxAttempts = 30;
      let imageUrl: string | null = null;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
          },
        });

        const statusData: any = await statusResponse.json();

        if (statusData.generations_by_pk?.status === 'COMPLETE') {
          imageUrl = statusData.generations_by_pk.generated_images[0]?.url;
          break;
        }

        attempts++;
      }

      if (!imageUrl) {
        throw new Error('Image generation timeout');
      }

      // Step 3: Download image
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

      // Step 4: Upload to Supabase Storage
      const fileName = `${slug}.jpg`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('article-images')
        .upload(filePath, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('article-images')
        .getPublicUrl(filePath);

      console.log(`✅ Image uploaded to Supabase: ${publicUrl}`);
      return publicUrl;

    } catch (error: any) {
      console.error(`❌ Failed to generate image for ${slug}:`, error.message || error);
      return null; // Return null instead of fallback
    }

  } else {
    // Use local filesystem for development
    console.log('🔄 Using local filesystem (development)');

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
      // Generate prompts
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
        height: 576,
        num_images: 1
      });

      console.log(`✅ Image generated successfully: ${imagePath}`);
      return imagePath;

    } catch (error: any) {
      console.error(`❌ Failed to generate image for ${slug}:`, error.message || error);
      return null;
    }
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