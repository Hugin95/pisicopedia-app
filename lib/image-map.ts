/**
 * Article Image Variety System
 *
 * Provides 3-5 image variants per article category to avoid repetition.
 * Images can be selected dynamically based on article index or slug hash.
 *
 * Usage:
 *   import { getArticleImage } from '@/lib/image-map';
 *   const image = getArticleImage('boli', articleSlug);
 */

export type ArticleCategory =
  | 'boli'
  | 'comportament'
  | 'nutritie'
  | 'proceduri'
  | 'preventie'
  | 'ingrijire'
  | 'simptome'
  | 'ghiduri';

/**
 * Image variants for each article category
 * Each category has 3-5 variations to provide visual variety
 */
export const ARTICLE_IMAGE_VARIANTS: Record<ArticleCategory, string[]> = {
  // Boli (Diseases) - 5 variants
  boli: [
    '/images/articles/disease-cat-examination.jpg',
    '/images/articles/disease-cat-vet.jpg',
    '/images/articles/disease-cat-medicine.jpg',
    '/images/articles/disease-cat-checkup.jpg',
    '/images/articles/disease-cat-treatment.jpg',
  ],

  // Comportament (Behavior) - 4 variants
  comportament: [
    '/images/articles/behavior-cat-playing.jpg',
    '/images/articles/behavior-cat-curious.jpg',
    '/images/articles/behavior-cat-relaxed.jpg',
    '/images/articles/behavior-cat-alert.jpg',
  ],

  // Nutriție (Nutrition) - 4 variants
  nutritie: [
    '/images/articles/nutrition-cat-eating.jpg',
    '/images/articles/nutrition-cat-food-bowl.jpg',
    '/images/articles/nutrition-cat-healthy.jpg',
    '/images/articles/nutrition-cat-meal.jpg',
  ],

  // Proceduri (Procedures) - 4 variants
  proceduri: [
    '/images/articles/procedure-cat-vet.jpg',
    '/images/articles/procedure-cat-examination.jpg',
    '/images/articles/procedure-cat-clinic.jpg',
    '/images/articles/procedure-cat-care.jpg',
  ],

  // Prevenție (Prevention) - 4 variants
  preventie: [
    '/images/articles/prevention-cat-vaccine.jpg',
    '/images/articles/prevention-cat-healthy.jpg',
    '/images/articles/prevention-cat-checkup.jpg',
    '/images/articles/prevention-cat-wellness.jpg',
  ],

  // Îngrijire (Care) - 4 variants
  ingrijire: [
    '/images/articles/care-cat-grooming.jpg',
    '/images/articles/care-cat-brushing.jpg',
    '/images/articles/care-cat-hygiene.jpg',
    '/images/articles/care-cat-cleaning.jpg',
  ],

  // Simptome (Symptoms) - 4 variants
  simptome: [
    '/images/articles/symptom-cat-sick.jpg',
    '/images/articles/symptom-cat-worried.jpg',
    '/images/articles/symptom-cat-unwell.jpg',
    '/images/articles/symptom-cat-monitor.jpg',
  ],

  // Ghiduri (Guides) - 3 variants
  ghiduri: [
    '/images/articles/guide-cat-owner.jpg',
    '/images/articles/guide-cat-happy.jpg',
    '/images/articles/guide-cat-care.jpg',
  ],
};

/**
 * Get a deterministic image for an article based on its category and slug
 *
 * @param category - Article category
 * @param slug - Article slug (for consistent selection)
 * @returns Image path
 */
export function getArticleImage(
  category: ArticleCategory,
  slug: string
): string {
  const variants = ARTICLE_IMAGE_VARIANTS[category];

  if (!variants || variants.length === 0) {
    // Fallback to default article image
    return '/images/default-article.svg';
  }

  // Use slug hash to deterministically select a variant
  // This ensures the same article always gets the same image
  const hash = hashString(slug);
  const index = hash % variants.length;

  return variants[index];
}

/**
 * Get all available image variants for a category
 *
 * @param category - Article category
 * @returns Array of image paths
 */
export function getCategoryImages(category: ArticleCategory): string[] {
  return ARTICLE_IMAGE_VARIANTS[category] || [];
}

/**
 * Simple string hash function for deterministic selection
 * Based on Java's String.hashCode() algorithm
 *
 * @param str - String to hash
 * @returns Positive integer hash
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Check if a category has image variants defined
 *
 * @param category - Category to check
 * @returns True if variants exist
 */
export function hasImageVariants(category: string): category is ArticleCategory {
  return category in ARTICLE_IMAGE_VARIANTS;
}
