#!/usr/bin/env tsx

/**
 * Count words in all articles and identify issues
 */

import * as fs from 'fs';
import * as path from 'path';

const articlesDir = path.join(process.cwd(), 'content', 'articles');

function countWords(content: string): number {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

  // Remove markdown formatting
  const cleaned = withoutFrontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#+\s/g, '') // Remove headings
    .replace(/[*_~`]/g, '') // Remove formatting
    .replace(/\n+/g, ' '); // Normalize whitespace

  // Count words
  const words = cleaned.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Read all articles
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

console.log('ARTICLE,WORDS,STATUS');

const results: { slug: string; words: number }[] = [];

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const wordCount = countWords(content);
  const slug = file.replace('.mdx', '');

  results.push({ slug, words: wordCount });
}

// Sort by word count
results.sort((a, b) => a.words - b.words);

// Print results
for (const r of results) {
  const status = r.words < 1500 ? 'BELOW_TARGET' : 'OK';
  console.log(`${r.slug},${r.words},${status}`);
}

// Summary
const belowTarget = results.filter(r => r.words < 1500);
console.log('\n=== SUMMARY ===');
console.log(`Total articles: ${results.length}`);
console.log(`Below 1500 words: ${belowTarget.length}`);
console.log(`OK: ${results.length - belowTarget.length}`);

if (belowTarget.length > 0) {
  console.log('\n=== ARTICLES BELOW TARGET ===');
  for (const r of belowTarget) {
    console.log(`${r.slug}: ${r.words} words (deficit: -${1500 - r.words})`);
  }
}
