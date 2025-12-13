import { getBreedMDX, serializeMDX } from './mdx-utils';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export async function getBreedContent(slug: string): Promise<{
  mdxContent: MDXRemoteSerializeResult | null;
  hasContent: boolean;
}> {
  try {
    const mdxData = await getBreedMDX(slug);

    if (!mdxData || !mdxData.content) {
      return { mdxContent: null, hasContent: false };
    }

    const serialized = await serializeMDX(mdxData.content);

    return {
      mdxContent: serialized,
      hasContent: true,
    };
  } catch (error) {
    console.error(`Error loading breed content for ${slug}:`, error);
    return { mdxContent: null, hasContent: false };
  }
}
