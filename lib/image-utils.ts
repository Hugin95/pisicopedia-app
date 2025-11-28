/**
 * Image utility functions for handling sources and fallbacks
 */

/**
 * Get the correct image source path for breeds
 */
export function getBreedImageSource(slug: string): string {
  return `/images/breeds/${slug}.webp`;
}

/**
 * Get the correct image source path for health articles
 */
export function getArticleImageSource(slug: string): string {
  return `/images/sanatate/${slug}.webp`;
}

/**
 * Get image source with fallback to placeholder
 */
export function getImageSource(
  imagePath: string | undefined,
  fallbackType: 'breed' | 'article' | 'guide' = 'breed'
): string {
  if (!imagePath) {
    // Return appropriate placeholder
    return `/images/placeholders/${fallbackType}-placeholder.svg`;
  }
  return imagePath;
}

/**
 * Generate fallback placeholder based on type
 */
export function getPlaceholder(type: 'breed' | 'article' | 'guide'): string {
  return `/images/placeholders/${type}-placeholder.svg`;
}

/**
 * Get default fallback image for any missing image
 */
export function getDefaultImage(): string {
  return '/images/default-cat.svg';
}