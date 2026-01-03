import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

export async function getArticleMDXContent(slug: string) {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  const filePath = path.join(articlesDir, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  // Compile MDX
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter,
    content: mdxContent,
  };
}

export async function getGuideMDXContent(slug: string) {
  const guidesDir = path.join(process.cwd(), 'content', 'guides');
  const filePath = path.join(guidesDir, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  // Compile MDX
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter,
    content: mdxContent,
  };
}

