import { MetadataRoute } from 'next';
import { sampleBreeds, sampleArticles } from '@/lib/data';
import { allBreeds, allArticles } from '@/lib/content-lists';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pisicopedia.ro';

  // Get current date for dynamic content
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Static pages with enhanced priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rase`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sanatate`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ghiduri`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nume-pisici`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/despre`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: lastMonth,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termeni-si-conditii`,
      lastModified: lastMonth,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-confidentialitate`,
      lastModified: lastMonth,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Create a set of existing content slugs for priority adjustment
  const existingBreedSlugs = new Set(sampleBreeds.map(b => b.slug));
  const existingArticleSlugs = new Set(sampleArticles.map(a => a.slug));

  // All breed pages with priority based on content existence
  const breedPages: MetadataRoute.Sitemap = allBreeds.map((breed: any) => {
    const hasContent = existingBreedSlugs.has(breed.slug);
    const isPopular = ['maine-coon', 'british-shorthair', 'pisica-persana', 'ragdoll', 'scottish-fold'].includes(breed.slug);

    return {
      url: `${baseUrl}/rase/${breed.slug}`,
      lastModified: hasContent ? lastWeek : lastMonth,
      changeFrequency: 'monthly',
      priority: isPopular ? 0.85 : hasContent ? 0.8 : 0.65,
    };
  });

  // All article pages with priority based on content existence
  const articlePages: MetadataRoute.Sitemap = allArticles.map((article: any) => {
    const hasContent = existingArticleSlugs.has(article.slug);
    const existingArticle = sampleArticles.find(a => a.slug === article.slug);
    const isImportant = article.category === 'simptome' || article.category === 'boli';

    return {
      url: `${baseUrl}/sanatate/${article.slug}`,
      lastModified: existingArticle?.date ? new Date(existingArticle.date) : lastMonth,
      changeFrequency: isImportant ? 'weekly' : 'monthly',
      priority: isImportant ? 0.75 : hasContent ? 0.7 : 0.55,
    };
  });

  // Category pages for better crawling
  const categoryPages: MetadataRoute.Sitemap = [
    // Breed filter pages
    {
      url: `${baseUrl}/rase/par-lung`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rase/par-scurt`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rase/hipoalergenice`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/rase/apartament`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    // Health category pages
    {
      url: `${baseUrl}/sanatate/simptome`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sanatate/boli`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sanatate/preventie`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/sanatate/nutritie`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sanatate/comportament`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Combine all pages and sort by priority
  const allPages = [...staticPages, ...breedPages, ...articlePages, ...categoryPages];
  return allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}