import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const breedsDirectory = path.join(process.cwd(), 'content', 'breeds');
const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export interface MDXContent {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
}

/**
 * Read and parse a breed MDX file
 */
export async function getBreedMDX(slug: string): Promise<MDXContent | null> {
  try {
    const fullPath = path.join(breedsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      console.warn(`MDX file not found for breed: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX for breed ${slug}:`, error);
    return null;
  }
}

/**
 * Read and parse an article MDX file
 */
export async function getArticleMDX(slug: string): Promise<MDXContent | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      console.warn(`MDX file not found for article: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX for article ${slug}:`, error);
    return null;
  }
}

/**
 * Check if MDX file exists for a breed
 */
export function breedMDXExists(slug: string): boolean {
  const fullPath = path.join(breedsDirectory, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}

/**
 * Check if MDX file exists for an article
 */
export function articleMDXExists(slug: string): boolean {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  return fs.existsSync(fullPath);
}
