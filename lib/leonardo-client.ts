/**
 * Leonardo.ai API Client
 * For generating cat breed and article images
 */

import * as fs from 'fs';
import * as path from 'path';

const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v1';

interface GenerationRequest {
  prompt: string;
  negative_prompt?: string;
  modelId?: string;
  width?: number;
  height?: number;
  num_images?: number;
  guidance_scale?: number;
  init_strength?: number;
  alchemy?: boolean;
  photoReal?: boolean;
  photoRealVersion?: string;
  presetStyle?: string;
}

interface GenerationResponse {
  sdGenerationJob: {
    generationId: string;
  };
}

interface GenerationResult {
  generations_by_pk: {
    status: string;
    generated_images: Array<{
      url: string;
      id: string;
    }>;
  };
}

export class LeonardoClient {
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.headers = {
      'accept': 'application/json',
      'authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    };
  }

  /**
   * Create a new image generation job
   */
  async createGeneration(params: GenerationRequest): Promise<string> {
    const response = await fetch(`${LEONARDO_API_URL}/generations`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        prompt: params.prompt,
        negative_prompt: params.negative_prompt || "text, watermark, signature, blurry, low quality",
        modelId: params.modelId || "aa77f04e-3eec-4034-9c07-d0f619684628", // Leonardo Kino XL for PhotoReal
        width: params.width || 1024,
        height: params.height || 1024,
        num_images: params.num_images || 1,
        guidance_scale: params.guidance_scale || 7,
        alchemy: params.alchemy !== undefined ? params.alchemy : false,
        photoReal: params.photoReal !== undefined ? params.photoReal : false,
        photoRealVersion: params.photoRealVersion || "v2",
        presetStyle: params.presetStyle || "CINEMATIC",
        public: false
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Leonardo API error: ${response.status} - ${error}`);
    }

    const data: GenerationResponse = await response.json();
    return data.sdGenerationJob.generationId;
  }

  /**
   * Check generation status and get results
   */
  async getGenerationResult(generationId: string): Promise<GenerationResult> {
    const response = await fetch(`${LEONARDO_API_URL}/generations/${generationId}`, {
      method: 'GET',
      headers: this.headers
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Leonardo API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Wait for generation to complete and return image URL
   */
  async waitForGeneration(generationId: string, maxAttempts: number = 60): Promise<string> {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

      const result = await this.getGenerationResult(generationId);

      if (result.generations_by_pk.status === 'COMPLETE') {
        if (result.generations_by_pk.generated_images.length > 0) {
          return result.generations_by_pk.generated_images[0].url;
        } else {
          throw new Error('No images generated');
        }
      } else if (result.generations_by_pk.status === 'FAILED') {
        throw new Error('Generation failed');
      }
    }

    throw new Error('Generation timeout');
  }

  /**
   * Download image from URL
   */
  async downloadImage(imageUrl: string, outputPath: string): Promise<void> {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save as JPEG first (Leonardo returns JPEG)
    const jpegPath = outputPath.replace('.webp', '.jpg');
    fs.writeFileSync(jpegPath, Buffer.from(buffer));

    console.log(`✅ Image saved: ${jpegPath}`);

    // Note: For WebP conversion, you'd need to install and use sharp again
    // For now, we'll use JPEG format which is web-friendly
  }

  /**
   * Generate and download an image
   */
  async generateAndDownload(
    prompt: string,
    outputPath: string,
    options: Partial<GenerationRequest> = {}
  ): Promise<void> {
    console.log('🎨 Starting Leonardo.ai generation...');

    // Create generation
    const generationId = await this.createGeneration({
      prompt,
      ...options
    });

    console.log(`📝 Generation ID: ${generationId}`);
    console.log('⏳ Waiting for generation to complete...');

    // Wait for completion
    const imageUrl = await this.waitForGeneration(generationId);

    console.log('✅ Generation complete!');
    console.log('📥 Downloading image...');

    // Download image
    await this.downloadImage(imageUrl, outputPath);
  }
}

// Create singleton instance
let leonardoClient: LeonardoClient | null = null;

export function getLeonardoClient(): LeonardoClient {
  if (!leonardoClient) {
    const apiKey = process.env.LEONARDO_API_KEY;
    if (!apiKey) {
      throw new Error('LEONARDO_API_KEY is not set in environment variables');
    }
    leonardoClient = new LeonardoClient(apiKey);
  }
  return leonardoClient;
}