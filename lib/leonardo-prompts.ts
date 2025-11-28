/**
 * Leonardo.ai Prompt Templates
 * Optimized for medical-style cat illustrations
 */

import { Breed, Article } from '@/types';

/**
 * Generate optimized prompt for Leonardo.ai breed images
 */
export function generateBreedPrompt(breed: Breed): string {
  // Simple breed name mapping for clearer prompts
  const breedNames: Record<string, string> = {
    'persiana': 'Persian',
    'british-shorthair': 'British Shorthair',
    'maine-coon': 'Maine Forest', // Avoiding "coon" word
    'siameza': 'Siamese',
    'ragdoll': 'Ragdoll',
    'sfinx': 'Sphynx'
  };

  const breedName = breedNames[breed.slug] || breed.title;

  // Simple, clear prompt for realistic photography
  return `Professional studio photograph of a SINGLE healthy ${breedName} domestic cat, full body portrait, sitting naturally on a simple surface, centered in frame, facing the camera, catchlight in eyes, detailed fur texture with individual strands visible, natural proportions, realistic anatomy, sharp focus, 8K resolution, soft neutral background, professional studio lighting, veterinary reference photo style, no accessories, no other animals, no humans.`;
}

/**
 * Generate optimized prompt for Leonardo.ai article images
 */
export function generateArticlePrompt(article: Article): string {
  const categoryPrompts: Record<string, string> = {
    'prevention': 'veterinary prevention and vaccination theme, medical syringe and vaccine vials, protective health shield symbol',
    'diseases': 'medical diagnosis theme, stethoscope, medical charts, health monitoring equipment',
    'symptoms': 'symptom observation theme, magnifying glass examining a cat, medical checklist',
    'procedures': 'veterinary surgical procedure, operating room setting, medical instruments',
    'nutrition': 'healthy cat nutrition, premium cat food, feeding bowls, nutritional supplements',
    'behavior': 'cat behavior and psychology, interactive toys, behavioral training elements'
  };

  const basePrompt = categoryPrompts[article.category] || 'general veterinary care';

  return `Medical illustration for veterinary article, ${basePrompt}, featuring a healthy cat, soft pastel medical colors (lavender, rose pink, sage green), clean clinical background, professional medical textbook style, educational infographic elements, high quality rendering, no text overlays`;
}

/**
 * Generate negative prompt (what to avoid)
 */
export function getNegativePrompt(): string {
  return "illustration, drawing, painting, artwork, artistic, 3D render, CGI, cartoon, anime, sketch, two heads, extra heads, extra faces, extra eyes, multiple bodies, mutated, deformed, distorted anatomy, broken legs, twisted body, blurry, out of focus, low quality, text, watermark, logo, cut off, cropped, extreme perspective, wide angle";
}

/**
 * Get Leonardo model configuration
 */
export function getLeonardoConfig() {
  return {
    // Leonardo Kino XL - Best for photorealistic images
    modelId: "aa77f04e-3eec-4034-9c07-d0f619684628",
    // Settings for photorealistic quality
    alchemy: true,  // Required for PhotoReal
    photoReal: true,
    photoRealVersion: "v2",
    presetStyle: "CINEMATIC", // Best for lifelike portraits
    guidance_scale: 7,  // Optimal for PhotoReal
    width: 1024,
    height: 1024,
    num_images: 1
  };
}