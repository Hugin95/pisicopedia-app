#!/usr/bin/env tsx

/**
 * Comprehensive SEO Audit Script for Pisicopedia.ro
 * Checks all SEO implementations and provides a score
 */

import * as fs from 'fs';
import * as path from 'path';
import { allBreeds, allArticles } from '../lib/content-lists';
import { sampleBreeds, sampleArticles } from '../lib/data';

// Colors for console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

interface SEOCheckResult {
  category: string;
  check: string;
  status: 'pass' | 'warning' | 'fail';
  score: number;
  maxScore: number;
  message: string;
}

class SEOAuditor {
  private results: SEOCheckResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  // Check if file exists
  private fileExists(filePath: string): boolean {
    return fs.existsSync(path.join(this.projectRoot, filePath));
  }

  // Check if content includes pattern
  private fileContains(filePath: string, pattern: string | RegExp): boolean {
    const fullPath = path.join(this.projectRoot, filePath);
    if (!fs.existsSync(fullPath)) return false;
    const content = fs.readFileSync(fullPath, 'utf-8');
    return typeof pattern === 'string'
      ? content.includes(pattern)
      : pattern.test(content);
  }

  // Add check result
  private addResult(result: SEOCheckResult) {
    this.results.push(result);
  }

  // 1. Check Schema.org Implementation
  checkSchemaOrg() {
    console.log(`\n${colors.cyan}Checking Schema.org Implementation...${colors.reset}`);

    // Check if seo-advanced.ts exists
    if (this.fileExists('lib/seo-advanced.ts')) {
      this.addResult({
        category: 'Schema.org',
        check: 'Advanced SEO library',
        status: 'pass',
        score: 10,
        maxScore: 10,
        message: '✅ Advanced SEO library implemented',
      });
    } else {
      this.addResult({
        category: 'Schema.org',
        check: 'Advanced SEO library',
        status: 'fail',
        score: 0,
        maxScore: 10,
        message: '❌ Missing lib/seo-advanced.ts',
      });
    }

    // Check layout.tsx for Schema.org scripts
    if (this.fileContains('app/layout.tsx', 'application/ld+json')) {
      this.addResult({
        category: 'Schema.org',
        check: 'Schema.org in layout',
        status: 'pass',
        score: 10,
        maxScore: 10,
        message: '✅ Schema.org scripts in layout',
      });
    } else {
      this.addResult({
        category: 'Schema.org',
        check: 'Schema.org in layout',
        status: 'fail',
        score: 0,
        maxScore: 10,
        message: '❌ No Schema.org scripts in layout',
      });
    }

    // Check for BreadcrumbList schema
    if (this.fileContains('lib/seo-advanced.ts', 'BreadcrumbList')) {
      this.addResult({
        category: 'Schema.org',
        check: 'BreadcrumbList schema',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ BreadcrumbList schema implemented',
      });
    }

    // Check for FAQPage schema
    if (this.fileContains('lib/seo-advanced.ts', 'FAQPage')) {
      this.addResult({
        category: 'Schema.org',
        check: 'FAQPage schema',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ FAQPage schema implemented',
      });
    }
  }

  // 2. Check Meta Tags
  checkMetaTags() {
    console.log(`\n${colors.cyan}Checking Meta Tags...${colors.reset}`);

    // Check Open Graph tags
    if (this.fileContains('app/layout.tsx', 'openGraph:')) {
      this.addResult({
        category: 'Meta Tags',
        check: 'Open Graph tags',
        status: 'pass',
        score: 10,
        maxScore: 10,
        message: '✅ Open Graph tags configured',
      });
    }

    // Check Twitter Card tags
    if (this.fileContains('app/layout.tsx', 'twitter:')) {
      this.addResult({
        category: 'Meta Tags',
        check: 'Twitter Card tags',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ Twitter Card tags configured',
      });
    }

    // Check canonical URLs
    if (this.fileContains('app/layout.tsx', 'alternates:') &&
        this.fileContains('app/layout.tsx', 'canonical')) {
      this.addResult({
        category: 'Meta Tags',
        check: 'Canonical URLs',
        status: 'pass',
        score: 10,
        maxScore: 10,
        message: '✅ Canonical URLs implemented',
      });
    }

    // Check metadataBase
    if (this.fileContains('app/layout.tsx', 'metadataBase')) {
      this.addResult({
        category: 'Meta Tags',
        check: 'Metadata base URL',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ Metadata base URL configured',
      });
    }
  }

  // 3. Check Sitemap
  checkSitemap() {
    console.log(`\n${colors.cyan}Checking Sitemap...${colors.reset}`);

    if (this.fileExists('app/sitemap.ts')) {
      const content = fs.readFileSync(path.join(this.projectRoot, 'app/sitemap.ts'), 'utf-8');

      // Check for priority
      if (content.includes('priority')) {
        this.addResult({
          category: 'Sitemap',
          check: 'Priority values',
          status: 'pass',
          score: 5,
          maxScore: 5,
          message: '✅ Sitemap includes priority values',
        });
      }

      // Check for changeFrequency
      if (content.includes('changeFrequency')) {
        this.addResult({
          category: 'Sitemap',
          check: 'Change frequency',
          status: 'pass',
          score: 5,
          maxScore: 5,
          message: '✅ Sitemap includes change frequency',
        });
      }

      // Check if includes all breeds/articles
      if (content.includes('allBreeds') && content.includes('allArticles')) {
        this.addResult({
          category: 'Sitemap',
          check: 'Complete content coverage',
          status: 'pass',
          score: 10,
          maxScore: 10,
          message: '✅ Sitemap includes all content',
        });
      }
    } else {
      this.addResult({
        category: 'Sitemap',
        check: 'Sitemap file',
        status: 'fail',
        score: 0,
        maxScore: 20,
        message: '❌ Missing sitemap.ts',
      });
    }
  }

  // 4. Check robots.txt
  checkRobotsTxt() {
    console.log(`\n${colors.cyan}Checking robots.txt...${colors.reset}`);

    if (this.fileExists('public/robots.txt')) {
      const content = fs.readFileSync(path.join(this.projectRoot, 'public/robots.txt'), 'utf-8');

      // Check for sitemap reference
      if (content.includes('Sitemap:')) {
        this.addResult({
          category: 'Robots.txt',
          check: 'Sitemap reference',
          status: 'pass',
          score: 5,
          maxScore: 5,
          message: '✅ Robots.txt includes sitemap',
        });
      }

      // Check for Googlebot rules
      if (content.includes('User-agent: Googlebot')) {
        this.addResult({
          category: 'Robots.txt',
          check: 'Googlebot rules',
          status: 'pass',
          score: 5,
          maxScore: 5,
          message: '✅ Googlebot rules configured',
        });
      }

      // Check for crawl delay
      if (content.includes('Crawl-delay:')) {
        this.addResult({
          category: 'Robots.txt',
          check: 'Crawl delay',
          status: 'pass',
          score: 3,
          maxScore: 3,
          message: '✅ Crawl delay configured',
        });
      }
    } else {
      this.addResult({
        category: 'Robots.txt',
        check: 'Robots.txt file',
        status: 'fail',
        score: 0,
        maxScore: 13,
        message: '❌ Missing robots.txt',
      });
    }
  }

  // 5. Check Internal Linking
  checkInternalLinking() {
    console.log(`\n${colors.cyan}Checking Internal Linking...${colors.reset}`);

    if (this.fileExists('components/seo/InternalLinks.tsx')) {
      this.addResult({
        category: 'Internal Linking',
        check: 'Internal links component',
        status: 'pass',
        score: 10,
        maxScore: 10,
        message: '✅ Internal links component exists',
      });
    }

    if (this.fileExists('lib/seo-advanced.ts') &&
        this.fileContains('lib/seo-advanced.ts', 'generateInternalLinks')) {
      this.addResult({
        category: 'Internal Linking',
        check: 'Auto-linking function',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ Auto-linking function implemented',
      });
    }
  }

  // 6. Check Content Optimization
  checkContentOptimization() {
    console.log(`\n${colors.cyan}Checking Content Optimization...${colors.reset}`);

    // Check content completion
    const totalBreeds = allBreeds.length;
    const existingBreeds = sampleBreeds.length;
    const breedCompletion = (existingBreeds / totalBreeds) * 100;

    if (breedCompletion >= 50) {
      this.addResult({
        category: 'Content',
        check: 'Breed content',
        status: breedCompletion >= 80 ? 'pass' : 'warning',
        score: Math.floor(breedCompletion / 10),
        maxScore: 10,
        message: `${breedCompletion >= 80 ? '✅' : '⚠️'} Breed content: ${existingBreeds}/${totalBreeds} (${Math.round(breedCompletion)}%)`,
      });
    } else {
      this.addResult({
        category: 'Content',
        check: 'Breed content',
        status: 'fail',
        score: Math.floor(breedCompletion / 10),
        maxScore: 10,
        message: `❌ Low breed content: ${existingBreeds}/${totalBreeds} (${Math.round(breedCompletion)}%)`,
      });
    }

    const totalArticles = allArticles.length;
    const existingArticles = sampleArticles.length;
    const articleCompletion = (existingArticles / totalArticles) * 100;

    if (articleCompletion >= 50) {
      this.addResult({
        category: 'Content',
        check: 'Article content',
        status: articleCompletion >= 80 ? 'pass' : 'warning',
        score: Math.floor(articleCompletion / 10),
        maxScore: 10,
        message: `${articleCompletion >= 80 ? '✅' : '⚠️'} Article content: ${existingArticles}/${totalArticles} (${Math.round(articleCompletion)}%)`,
      });
    } else {
      this.addResult({
        category: 'Content',
        check: 'Article content',
        status: 'fail',
        score: Math.floor(articleCompletion / 10),
        maxScore: 10,
        message: `❌ Low article content: ${existingArticles}/${totalArticles} (${Math.round(articleCompletion)}%)`,
      });
    }
  }

  // 7. Check Page Performance
  checkPagePerformance() {
    console.log(`\n${colors.cyan}Checking Page Performance...${colors.reset}`);

    // Check for image optimization
    if (this.fileExists('lib/image-utils.ts')) {
      this.addResult({
        category: 'Performance',
        check: 'Image optimization utils',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ Image optimization utilities exist',
      });
    }

    // Check for Next.js Image component usage
    const hasNextImage = this.fileContains('app/rase/[slug]/page.tsx', 'next/image');
    if (hasNextImage) {
      this.addResult({
        category: 'Performance',
        check: 'Next.js Image optimization',
        status: 'pass',
        score: 5,
        maxScore: 5,
        message: '✅ Using Next.js Image component',
      });
    }
  }

  // Generate final report
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log(`${colors.bright}${colors.magenta}🏆 SEO AUDIT REPORT - PISICOPEDIA.RO${colors.reset}`);
    console.log('='.repeat(80));

    // Group results by category
    const categories = [...new Set(this.results.map(r => r.category))];

    let totalScore = 0;
    let maxTotalScore = 0;

    categories.forEach(category => {
      console.log(`\n${colors.blue}📊 ${category}${colors.reset}`);
      console.log('-'.repeat(60));

      const categoryResults = this.results.filter(r => r.category === category);
      let categoryScore = 0;
      let categoryMaxScore = 0;

      categoryResults.forEach(result => {
        const statusIcon = result.status === 'pass' ? '✅' :
                           result.status === 'warning' ? '⚠️' : '❌';

        console.log(`${statusIcon} ${result.check.padEnd(30)} ${result.score}/${result.maxScore} pts`);
        if (result.status !== 'pass') {
          console.log(`   ${colors.yellow}→ ${result.message}${colors.reset}`);
        }

        categoryScore += result.score;
        categoryMaxScore += result.maxScore;
      });

      const categoryPercent = Math.round((categoryScore / categoryMaxScore) * 100);
      console.log(`${colors.bright}Category Score: ${categoryScore}/${categoryMaxScore} (${categoryPercent}%)${colors.reset}`);

      totalScore += categoryScore;
      maxTotalScore += categoryMaxScore;
    });

    // Final score
    console.log('\n' + '='.repeat(80));
    const finalPercent = Math.round((totalScore / maxTotalScore) * 100);
    const grade = finalPercent >= 90 ? 'A+' :
                  finalPercent >= 80 ? 'A' :
                  finalPercent >= 70 ? 'B' :
                  finalPercent >= 60 ? 'C' :
                  finalPercent >= 50 ? 'D' : 'F';

    console.log(`${colors.bright}${colors.green}📈 FINAL SEO SCORE: ${totalScore}/${maxTotalScore} (${finalPercent}%)${colors.reset}`);
    console.log(`${colors.bright}🎯 GRADE: ${grade}${colors.reset}`);

    // Progress bar
    const filled = Math.floor(finalPercent / 5);
    const empty = 20 - filled;
    const progressBar = '█'.repeat(filled) + '░'.repeat(empty);
    console.log(`Progress: [${progressBar}] ${finalPercent}%`);

    // Recommendations
    console.log(`\n${colors.cyan}💡 TOP RECOMMENDATIONS:${colors.reset}`);
    const failedChecks = this.results.filter(r => r.status === 'fail');
    const warningChecks = this.results.filter(r => r.status === 'warning');

    if (failedChecks.length > 0) {
      console.log(`\n${colors.red}Critical Issues (Fix immediately):${colors.reset}`);
      failedChecks.slice(0, 5).forEach(check => {
        console.log(`  • ${check.category}: ${check.check}`);
      });
    }

    if (warningChecks.length > 0) {
      console.log(`\n${colors.yellow}Warnings (Should improve):${colors.reset}`);
      warningChecks.slice(0, 5).forEach(check => {
        console.log(`  • ${check.category}: ${check.check}`);
      });
    }

    if (finalPercent >= 80) {
      console.log(`\n${colors.green}🎉 Excelent! Site-ul tău este optimizat pentru SEO!${colors.reset}`);
      console.log('Continuă să adaugi conținut și să monitorizezi performanța.');
    } else if (finalPercent >= 60) {
      console.log(`\n${colors.yellow}📊 Bun progres, dar mai ai loc de îmbunătățire.${colors.reset}`);
      console.log('Concentrează-te pe problemele critice și adaugă mai mult conținut.');
    } else {
      console.log(`\n${colors.red}⚠️ Sunt necesare îmbunătățiri semnificative pentru SEO.${colors.reset}`);
      console.log('Rezolvă problemele critice și completează conținutul lipsă.');
    }

    console.log('\n' + '='.repeat(80));
  }

  // Run all checks
  async runAudit() {
    console.log(`${colors.bright}${colors.cyan}🔍 Starting SEO Audit...${colors.reset}`);

    this.checkSchemaOrg();
    this.checkMetaTags();
    this.checkSitemap();
    this.checkRobotsTxt();
    this.checkInternalLinking();
    this.checkContentOptimization();
    this.checkPagePerformance();

    this.generateReport();
  }
}

// Run the audit
const auditor = new SEOAuditor();
auditor.runAudit().catch(console.error);