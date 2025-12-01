#!/usr/bin/env tsx

/**
 * Audit Script for 404 Routes
 * Verifies that all expected routes have corresponding MDX files
 * Prevents broken links and 404 errors in production
 */

import * as fs from 'fs';
import * as path from 'path';
import { allBreeds, allArticles, allGuides } from '../lib/content-lists';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface RouteCheck {
  type: 'breed' | 'article' | 'guide';
  slug: string;
  title: string;
  route: string;
  exists: boolean;
  filePath: string;
}

function checkMDXFile(type: 'breed' | 'article' | 'guide', slug: string): boolean {
  const contentDir = type === 'breed' ? 'breeds' : type === 'article' ? 'articles' : 'guides';
  const mdxPath = path.join(process.cwd(), 'content', contentDir, `${slug}.mdx`);
  return fs.existsSync(mdxPath);
}

async function audit404Routes() {
  console.log(`\n${colors.bright}${colors.cyan}🔗 404 ROUTES AUDIT${colors.reset}`);
  console.log('='.repeat(100));
  console.log('Checking all routes for potential 404 errors...\n');

  const results: RouteCheck[] = [];

  // Check all breeds
  console.log(`${colors.blue}📋 Checking Breeds...${colors.reset}`);
  for (const breed of allBreeds) {
    const exists = checkMDXFile('breed', breed.slug);
    results.push({
      type: 'breed',
      slug: breed.slug,
      title: breed.name,
      route: `/rase/${breed.slug}`,
      exists,
      filePath: `content/breeds/${breed.slug}.mdx`,
    });
  }
  const breedsOK = results.filter(r => r.type === 'breed' && r.exists).length;
  console.log(`   ${breedsOK}/${allBreeds.length} breeds OK`);

  // Check all articles
  console.log(`${colors.blue}📋 Checking Articles...${colors.reset}`);
  for (const article of allArticles) {
    const exists = checkMDXFile('article', article.slug);
    results.push({
      type: 'article',
      slug: article.slug,
      title: article.title,
      route: `/articole/${article.slug}`,
      exists,
      filePath: `content/articles/${article.slug}.mdx`,
    });
  }
  const articlesOK = results.filter(r => r.type === 'article' && r.exists).length;
  console.log(`   ${articlesOK}/${allArticles.length} articles OK`);

  // Check all guides
  console.log(`${colors.blue}📋 Checking Guides...${colors.reset}`);
  for (const guide of allGuides) {
    const exists = checkMDXFile('guide', guide.slug);
    results.push({
      type: 'guide',
      slug: guide.slug,
      title: guide.title,
      route: `/ghiduri/${guide.slug}`,
      exists,
      filePath: `content/guides/${guide.slug}.mdx`,
    });
  }
  const guidesOK = results.filter(r => r.type === 'guide' && r.exists).length;
  console.log(`   ${guidesOK}/${allGuides.length} guides OK\n`);

  // Find all missing routes (404s)
  const missing404s = results.filter(r => !r.exists);

  console.log('='.repeat(100));
  console.log(`\n${colors.bright}📊 SUMMARY:${colors.reset}`);
  console.log(`Total routes checked: ${results.length}`);
  console.log(`${colors.green}✅ Working routes: ${results.length - missing404s.length}${colors.reset}`);
  console.log(`${colors.red}❌ Potential 404s: ${missing404s.length}${colors.reset}`);

  // Display detailed 404 information by type
  if (missing404s.length > 0) {
    console.log(`\n${colors.bright}${colors.red}🚨 ROUTES THAT WILL RETURN 404${colors.reset}`);
    console.log('-'.repeat(100));

    const missing404sByType = {
      breed: missing404s.filter(r => r.type === 'breed'),
      article: missing404s.filter(r => r.type === 'article'),
      guide: missing404s.filter(r => r.type === 'guide'),
    };

    if (missing404sByType.breed.length > 0) {
      console.log(`\n${colors.yellow}🐱 BREEDS (${missing404sByType.breed.length}):${colors.reset}`);
      missing404sByType.breed.forEach(r => {
        console.log(`   ${colors.red}✗${colors.reset} ${r.route}`);
        console.log(`     File needed: ${r.filePath}`);
      });
    }

    if (missing404sByType.article.length > 0) {
      console.log(`\n${colors.yellow}📝 ARTICLES (${missing404sByType.article.length}):${colors.reset}`);
      missing404sByType.article.forEach(r => {
        console.log(`   ${colors.red}✗${colors.reset} ${r.route}`);
        console.log(`     File needed: ${r.filePath}`);
      });
    }

    if (missing404sByType.guide.length > 0) {
      console.log(`\n${colors.yellow}📚 GUIDES (${missing404sByType.guide.length}):${colors.reset}`);
      missing404sByType.guide.forEach(r => {
        console.log(`   ${colors.red}✗${colors.reset} ${r.route}`);
        console.log(`     File needed: ${r.filePath}`);
      });
    }

    // Recommendations
    console.log(`\n${colors.cyan}💡 HOW TO FIX:${colors.reset}`);
    if (missing404sByType.breed.length > 0) {
      console.log('   For breeds: npm run generate:breed');
    }
    if (missing404sByType.article.length > 0) {
      console.log('   For articles: npm run generate:article');
    }
    if (missing404sByType.guide.length > 0) {
      console.log('   For guides: npm run generate:guides');
    }

    console.log(`\n${colors.red}❌ 404 Audit FAILED - ${missing404s.length} route(s) will return 404${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All routes are working! No 404 errors found.${colors.reset}`);
    process.exit(0);
  }
}

// Run the audit
audit404Routes().catch(error => {
  console.error('Error running 404 audit:', error);
  process.exit(1);
});
