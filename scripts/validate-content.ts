#!/usr/bin/env tsx

/**
 * Content Validation Script for Pisicopedia.ro
 *
 * Validates all content to ensure:
 * 1. Required fields exist (title, slug)
 * 2. Image paths are valid and files exist
 * 3. No broken content reaches production
 *
 * Usage: npm run validate:content
 */

import * as fs from 'fs';
import * as path from 'path';
import { sampleBreeds, sampleArticles } from '../lib/data';
import type { Breed, Article } from '../types';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

interface ValidationResult {
  type: 'breed' | 'article';
  title: string;
  slug: string;
  status: 'ok' | 'warning' | 'error';
  issues: string[];
}

class ContentValidator {
  private results: ValidationResult[] = [];
  private hasErrors = false;
  private warningCount = 0;
  private publicDir: string;

  constructor() {
    this.publicDir = path.join(process.cwd(), 'public');
  }

  /**
   * Check if an image file exists in public directory
   */
  private imageExists(imagePath: string | undefined): boolean {
    if (!imagePath) return false;

    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullPath = path.join(this.publicDir, cleanPath);

    return fs.existsSync(fullPath);
  }

  /**
   * Validate a single breed
   */
  private validateBreed(breed: Breed): ValidationResult {
    const result: ValidationResult = {
      type: 'breed',
      title: breed.title || 'LIPSĂ TITLU',
      slug: breed.slug || 'LIPSĂ SLUG',
      status: 'ok',
      issues: [],
    };

    // Check required fields
    if (!breed.title) {
      result.status = 'error';
      result.issues.push('Lipsește titlul');
      this.hasErrors = true;
    }

    if (!breed.slug) {
      result.status = 'error';
      result.issues.push('Lipsește slug-ul');
      this.hasErrors = true;
    }

    // Check image - warning if missing (can use fallback)
    if (!breed.image) {
      result.status = result.status === 'error' ? 'error' : 'warning';
      result.issues.push('Câmp imagine nedefinit (va folosi fallback)');
      this.warningCount++;
    } else if (!this.imageExists(breed.image)) {
      result.status = result.status === 'error' ? 'error' : 'warning';
      result.issues.push(`Imagine lipsește: ${breed.image} (va folosi fallback)`);
      this.warningCount++;
    }

    // Check thumbnail if different from image
    if (breed.thumbnail && breed.thumbnail !== breed.image && !this.imageExists(breed.thumbnail)) {
      result.status = result.status === 'error' ? 'error' : 'warning';
      result.issues.push(`Thumbnail lipsește: ${breed.thumbnail}`);
      this.warningCount++;
    }

    return result;
  }

  /**
   * Validate a single article
   */
  private validateArticle(article: Article): ValidationResult {
    const result: ValidationResult = {
      type: 'article',
      title: article.title || 'LIPSĂ TITLU',
      slug: article.slug || 'LIPSĂ SLUG',
      status: 'ok',
      issues: [],
    };

    // Check required fields
    if (!article.title) {
      result.status = 'error';
      result.issues.push('Lipsește titlul');
      this.hasErrors = true;
    }

    if (!article.slug) {
      result.status = 'error';
      result.issues.push('Lipsește slug-ul');
      this.hasErrors = true;
    }

    // Check image - warning if missing (can use fallback)
    if (!article.image) {
      result.status = result.status === 'error' ? 'error' : 'warning';
      result.issues.push('Câmp imagine nedefinit (va folosi fallback)');
      this.warningCount++;
    } else if (!this.imageExists(article.image)) {
      result.status = result.status === 'error' ? 'error' : 'warning';
      result.issues.push(`Imagine lipsește: ${article.image} (va folosi fallback)`);
      this.warningCount++;
    }

    // Articles don't have thumbnail field, only breeds do

    return result;
  }

  /**
   * Print a single result
   */
  private printResult(result: ValidationResult): void {
    let icon = '';
    let color = '';

    switch (result.status) {
      case 'ok':
        icon = '✅';
        color = colors.green;
        break;
      case 'warning':
        icon = '⚠️ ';
        color = colors.yellow;
        break;
      case 'error':
        icon = '❌';
        color = colors.red;
        break;
    }

    console.log(`${icon} ${color}${result.slug}${colors.reset} - ${result.title}`);

    if (result.issues.length > 0) {
      result.issues.forEach(issue => {
        console.log(`   ${colors.gray}└─ ${issue}${colors.reset}`);
      });
    }
  }

  /**
   * Run the validation
   */
  public async run(): Promise<void> {
    console.log(`\n${colors.cyan}${colors.bold}🔍 Validare Conținut Pisicopedia.ro${colors.reset}`);
    console.log('='.repeat(50));

    // Validate breeds
    console.log(`\n${colors.blue}📂 Verificare Rase (${sampleBreeds.length} total)...${colors.reset}`);
    for (const breed of sampleBreeds) {
      const result = this.validateBreed(breed);
      this.results.push(result);
      this.printResult(result);
    }

    // Validate articles
    console.log(`\n${colors.blue}📂 Verificare Articole (${sampleArticles.length} total)...${colors.reset}`);
    for (const article of sampleArticles) {
      const result = this.validateArticle(article);
      this.results.push(result);
      this.printResult(result);
    }

    // Print summary
    this.printSummary();
  }

  /**
   * Print validation summary
   */
  private printSummary(): void {
    console.log('\n' + '='.repeat(50));
    console.log(`${colors.cyan}${colors.bold}📊 REZUMAT:${colors.reset}`);

    // Count by type and status
    const breedResults = this.results.filter(r => r.type === 'breed');
    const articleResults = this.results.filter(r => r.type === 'article');

    const breedOk = breedResults.filter(r => r.status === 'ok').length;
    const breedWarnings = breedResults.filter(r => r.status === 'warning').length;
    const breedErrors = breedResults.filter(r => r.status === 'error').length;

    const articleOk = articleResults.filter(r => r.status === 'ok').length;
    const articleWarnings = articleResults.filter(r => r.status === 'warning').length;
    const articleErrors = articleResults.filter(r => r.status === 'error').length;

    console.log(`- ${breedResults.length} rase: ${colors.green}${breedOk} OK${colors.reset}, ${colors.yellow}${breedWarnings} warnings${colors.reset}, ${colors.red}${breedErrors} erori${colors.reset}`);
    console.log(`- ${articleResults.length} articole: ${colors.green}${articleOk} OK${colors.reset}, ${colors.yellow}${articleWarnings} warnings${colors.reset}, ${colors.red}${articleErrors} erori${colors.reset}`);

    // List missing images
    const missingImages = this.results
      .filter(r => r.issues.some(i => i.includes('Imagine lipsește')))
      .length;

    if (missingImages > 0) {
      console.log(`- Total: ${colors.yellow}${missingImages} imagini lipsă${colors.reset} (vor folosi fallback)`);
    }

    console.log('\n' + '='.repeat(50));

    // Final status
    if (this.hasErrors) {
      console.log(`${colors.red}${colors.bold}❌ Validare EȘUATĂ - există erori critice!${colors.reset}`);
      console.log(`${colors.red}Corectează erorile înainte de deploy.${colors.reset}\n`);
      process.exit(1);
    } else if (this.warningCount > 0) {
      console.log(`${colors.yellow}${colors.bold}⚠️  Validare completă cu avertismente${colors.reset}`);
      console.log(`${colors.green}✅ Site-ul poate fi deploiat (imaginile lipsă vor folosi fallback)${colors.reset}\n`);
    } else {
      console.log(`${colors.green}${colors.bold}✅ Validare completă - toate verificările au trecut!${colors.reset}`);
      console.log(`${colors.green}Site-ul este 100% pregătit pentru deploy!${colors.reset}\n`);
    }
  }
}

// Run the validator
const validator = new ContentValidator();
validator.run().catch((error) => {
  console.error(`${colors.red}Eroare la validare:${colors.reset}`, error);
  process.exit(1);
});