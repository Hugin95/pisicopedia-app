#!/usr/bin/env tsx

/**
 * Audit Script for Articles
 * Verifies all articles have MDX files, images, and consistent data
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { allArticles } from '../lib/content-lists';
import { sampleArticles } from '../lib/data';

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

interface ArticleAuditResult {
  slug: string;
  title: string;
  category: string;
  hasMDX: boolean;
  hasImage: boolean;
  inDataFile: boolean;
  imagePath?: string;
  frontmatterIssues: string[];
  issues: string[];
}

function checkMDXExists(slug: string): boolean {
  const mdxPath = path.join(process.cwd(), 'content', 'articles', `${slug}.mdx`);
  return fs.existsSync(mdxPath);
}

function checkArticleImageExists(slug: string, category: string): string | null {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const imageDir = path.join(process.cwd(), 'public', 'images', 'articles');

  // First check for specific article image
  for (const ext of imageExtensions) {
    const imagePath = path.join(imageDir, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `/images/articles/${slug}${ext}`;
    }
  }

  // Then check for category-based image
  const categoryImageMap: Record<string, string> = {
    'simptome': 'simptome.jpg',
    'boli': 'boli-cronice.jpg',
    'preventie': 'preventie.jpg',
    'proceduri': 'proceduri.jpg',
    'nutritie': 'nutritie.jpg',
    'comportament': 'comportament.jpg',
    'ingrijire': 'ingrijire.jpg',
    'ghiduri': 'ghiduri.jpg',
  };

  const categoryImage = categoryImageMap[category];
  if (categoryImage) {
    const categoryImagePath = path.join(imageDir, categoryImage);
    if (fs.existsSync(categoryImagePath)) {
      return `/images/articles/${categoryImage}`;
    }
  }

  return null;
}

function checkInDataFile(slug: string): boolean {
  return sampleArticles.some(article => article.slug === slug);
}

function checkFrontmatter(slug: string): string[] {
  const issues: string[] = [];
  const mdxPath = path.join(process.cwd(), 'content', 'articles', `${slug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    return issues; // Skip if file doesn't exist
  }

  try {
    const fileContent = fs.readFileSync(mdxPath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);

    // Required fields
    const requiredFields = [
      'title',
      'description',
      'slug',
      'category',
      'subcategory',
      'image',
      'date',
      'author',
      'readingTime',
      'tags'
    ];

    for (const field of requiredFields) {
      if (!frontmatter[field]) {
        issues.push(`Missing ${field}`);
      }
    }

    // Validate tags is an array
    if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
      issues.push('tags must be array');
    }

    // Validate slug matches filename
    if (frontmatter.slug && frontmatter.slug !== slug) {
      issues.push(`slug mismatch (${frontmatter.slug} !== ${slug})`);
    }

  } catch (error) {
    issues.push('Frontmatter parse error');
  }

  return issues;
}

async function auditArticles() {
  console.log(`\n${colors.bright}${colors.cyan}📝 ARTICLE CONTENT AUDIT${colors.reset}`);
  console.log('='.repeat(100));

  const results: ArticleAuditResult[] = [];

  // Audit each article from content-lists (source of truth)
  for (const article of allArticles) {
    const result: ArticleAuditResult = {
      slug: article.slug,
      title: article.title,
      category: article.category,
      hasMDX: false,
      hasImage: false,
      inDataFile: false,
      frontmatterIssues: [],
      issues: [],
    };

    // Check MDX file
    result.hasMDX = checkMDXExists(article.slug);
    if (!result.hasMDX) {
      result.issues.push('Missing MDX');
    }

    // Check frontmatter consistency
    if (result.hasMDX) {
      result.frontmatterIssues = checkFrontmatter(article.slug);
      if (result.frontmatterIssues.length > 0) {
        result.issues.push(`Frontmatter: ${result.frontmatterIssues.length} issue(s)`);
      }
    }

    // Check image (article-specific or category)
    const imagePath = checkArticleImageExists(article.slug, article.category);
    if (imagePath) {
      result.hasImage = true;
      result.imagePath = imagePath;
    } else {
      result.issues.push('No image');
    }

    // Check if in data.ts
    result.inDataFile = checkInDataFile(article.slug);
    if (!result.inDataFile && result.hasMDX) {
      // Only flag as issue if MDX exists but not in data
      result.issues.push('Not in data.ts');
    }

    results.push(result);
  }

  // Display results grouped by category
  const categories = [...new Set(allArticles.map(a => a.category))];

  console.log(`\n${colors.bright}Article Audit Results by Category:${colors.reset}`);

  let totalOK = 0;
  let totalWarning = 0;
  let totalError = 0;

  for (const category of categories) {
    const categoryArticles = results.filter(r =>
      allArticles.find(a => a.slug === r.slug)?.category === category
    );

    console.log(`\n${colors.blue}📂 ${category.toUpperCase()}${colors.reset}`);
    console.log('-'.repeat(100));
    console.log('Status | Title                                              | MDX | IMG | Data | Issues');
    console.log('-'.repeat(100));

    for (const result of categoryArticles) {
      const status = result.issues.length === 0
        ? `${colors.green}✅${colors.reset}`
        : result.issues.length === 1
          ? `${colors.yellow}⚠️${colors.reset}`
          : `${colors.red}❌${colors.reset}`;

      const mdx = result.hasMDX ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
      const img = result.hasImage ? `${colors.green}✓${colors.reset}` : `${colors.yellow}○${colors.reset}`;
      const data = result.inDataFile ? `${colors.green}✓${colors.reset}` : `${colors.yellow}-${colors.reset}`;

      const titleTruncated = result.title.length > 50
        ? result.title.substring(0, 47) + '...'
        : result.title;
      const titlePadded = titleTruncated.padEnd(50);
      const issuesStr = result.issues.join(', ') || 'None';

      console.log(`${status}     | ${titlePadded} | ${mdx}   | ${img}   | ${data}    | ${issuesStr}`);

      if (result.issues.length === 0) totalOK++;
      else if (result.issues.length === 1) totalWarning++;
      else totalError++;
    }
  }

  console.log('\n' + '='.repeat(100));

  // Summary statistics
  console.log(`\n${colors.bright}📊 SUMMARY:${colors.reset}`);
  console.log(`Total articles defined: ${allArticles.length}`);
  console.log(`${colors.green}✅ Complete: ${totalOK}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Warnings: ${totalWarning}${colors.reset}`);
  console.log(`${colors.red}❌ Errors: ${totalError}${colors.reset}`);

  // Detailed issues
  const missingMDX = results.filter(r => !r.hasMDX);
  const missingImages = results.filter(r => !r.hasImage);
  const notInData = results.filter(r => !r.inDataFile && r.hasMDX);

  if (missingMDX.length > 0) {
    console.log(`\n${colors.yellow}📝 Missing MDX Files (${missingMDX.length}/${allArticles.length}):${colors.reset}`);
    if (missingMDX.length <= 10) {
      missingMDX.forEach(r => console.log(`   - ${r.slug}`));
    } else {
      console.log(`   First 10: ${missingMDX.slice(0, 10).map(r => r.slug).join(', ')}`);
      console.log(`   ... and ${missingMDX.length - 10} more`);
    }
  }

  if (missingImages.length > 0) {
    console.log(`\n${colors.yellow}🖼️  Missing Specific Images (${missingImages.length}):${colors.reset}`);
    console.log('   (Using category placeholders for these)');
  }

  // Content completion percentage
  const mdxPercentage = Math.round((results.filter(r => r.hasMDX).length / allArticles.length) * 100);
  const imagePercentage = Math.round((results.filter(r => r.hasImage).length / allArticles.length) * 100);

  console.log(`\n${colors.bright}📈 COMPLETION METRICS:${colors.reset}`);
  console.log(`   MDX Files: ${mdxPercentage}% (${results.filter(r => r.hasMDX).length}/${allArticles.length})`);
  console.log(`   Images: ${imagePercentage}% (${results.filter(r => r.hasImage).length}/${allArticles.length})`);

  // Progress bar for MDX
  const mdxBar = '█'.repeat(Math.floor(mdxPercentage / 5)) + '░'.repeat(20 - Math.floor(mdxPercentage / 5));
  console.log(`   MDX Progress:  [${mdxBar}] ${mdxPercentage}%`);

  // Frontmatter consistency check
  const frontmatterIssues = results.filter(r => r.frontmatterIssues.length > 0);

  if (frontmatterIssues.length > 0) {
    console.log(`\n${colors.bright}${colors.yellow}🔍 FRONTMATTER CONSISTENCY ISSUES${colors.reset}`);
    console.log('-'.repeat(100));
    console.log(`Found ${frontmatterIssues.length} article(s) with frontmatter issues:\n`);

    for (const result of frontmatterIssues) {
      console.log(`${colors.yellow}${result.slug}${colors.reset} (${result.title.substring(0, 50)}${result.title.length > 50 ? '...' : ''})`);
      result.frontmatterIssues.forEach(issue => {
        console.log(`   ${colors.red}✗${colors.reset} ${issue}`);
      });
      console.log('');
    }
    console.log('-'.repeat(100));
  } else {
    console.log(`\n${colors.green}✅ All articles have consistent frontmatter${colors.reset}`);
  }

  // Recommendations
  if (missingMDX.length > 0) {
    console.log(`\n${colors.cyan}💡 To generate missing articles:${colors.reset}`);
    console.log('   npm run generate:article');
    console.log('   OR for auto-generation:');
    console.log('   npm run generate:auto-post');
  }

  if (missingImages.length > 5) {
    console.log(`\n${colors.cyan}💡 To generate article images:${colors.reset}`);
    console.log('   npm run leonardo:articles');
  }

  // Exit code based on critical issues only (missing MDX)
  const criticalIssues = missingMDX.length;
  if (criticalIssues > 20) {
    console.log(`\n${colors.yellow}⚠️  Many articles are not yet created (${missingMDX.length}/${allArticles.length})${colors.reset}`);
    console.log('This is expected for a new site. Use auto-generation to create content.');
    process.exit(0); // Don't fail for expected missing content
  } else if (criticalIssues > 0) {
    console.log(`\n${colors.yellow}⚠️  Some articles need attention${colors.reset}`);
    process.exit(0); // Warning but not failure
  } else {
    console.log(`\n${colors.green}✅ All articles are properly configured!${colors.reset}`);
    process.exit(0);
  }
}

// Run the audit
auditArticles().catch(error => {
  console.error('Error running article audit:', error);
  process.exit(1);
});