#!/usr/bin/env tsx

/**
 * QA AUDIT EXHAUSTIV - Pisicopedia.ro
 *
 * Scanează toate rasele, articolele, ghidurile și generează raport detaliat
 * cu deficite exacte pentru conținut, imagini și design.
 */

import * as fs from 'fs';
import * as path from 'path';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface BreedAudit {
  slug: string;
  title: string;
  totalWords: number;
  healthSectionWords: number;
  missSections: string[];
  image: string;
  status: 'ok' | 'warning' | 'error';
  issues: string[];
}

interface ArticleAudit {
  slug: string;
  title: string;
  totalWords: number;
  missingSections: string[];
  image: string;
  imageDuplicate: boolean;
  status: 'ok' | 'warning' | 'error';
  issues: string[];
}

interface GuideAudit {
  slug: string;
  title: string;
  totalWords: number;
  status: 'ok' | 'warning';
  issues: string[];
}

// Count words excluding frontmatter
function countWords(content: string): number {
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');
  const cleaned = withoutFrontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/#+\s/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ');
  const words = cleaned.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Extract frontmatter field
function extractFrontmatter(content: string, field: string): string | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const fieldMatch = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return fieldMatch ? fieldMatch[1].replace(/['"]/g, '').trim() : null;
}

// Find health section in breed content
function findHealthSection(content: string): { found: boolean; words: number } {
  const healthPatterns = [
    /##\s+(?:Probleme de )?Sănătate[\s\S]*?(?=##|$)/i,
    /##\s+Probleme (?:de sănătate|medicale)[\s\S]*?(?=##|$)/i,
    /##\s+Sănătate și (?:îngrijire|probleme medicale)[\s\S]*?(?=##|$)/i,
    /##\s+Îngrijire (?:medicală|și sănătate)[\s\S]*?(?=##|$)/i,
  ];

  for (const pattern of healthPatterns) {
    const match = content.match(pattern);
    if (match) {
      const sectionContent = match[0];
      const words = countWords(sectionContent);
      return { found: true, words };
    }
  }

  return { found: false, words: 0 };
}

// Check required sections in breed
function checkBreedSections(content: string): string[] {
  const requiredSections = [
    { pattern: /##\s+(?:Descriere|Despre)/i, name: 'Descriere generală' },
    { pattern: /##\s+Aspect/i, name: 'Aspect fizic' },
    { pattern: /##\s+(?:Temperament|Personalitate)/i, name: 'Temperament' },
    { pattern: /##\s+Îngrijire/i, name: 'Îngrijire' },
    { pattern: /##\s+(?:Sănătate|Probleme)/i, name: 'Sănătate' },
    { pattern: /##\s+(?:Întrebări|FAQ)/i, name: 'FAQ' },
  ];

  const missing: string[] = [];
  for (const section of requiredSections) {
    if (!content.match(section.pattern)) {
      missing.push(section.name);
    }
  }

  return missing;
}

// Check required sections in article
function checkArticleSections(content: string): string[] {
  const requiredSections = [
    { pattern: /##\s+(?:Cauze|Ce cauzează)/i, name: 'Cauze' },
    { pattern: /##\s+Simptome/i, name: 'Simptome' },
    { pattern: /##\s+(?:Diagnostic|Diagnosticare)/i, name: 'Diagnostic' },
    { pattern: /##\s+(?:Tratament|Îngrijire)/i, name: 'Tratament' },
    { pattern: /##\s+(?:Prevenție|Prevenire)/i, name: 'Prevenție' },
    { pattern: /##\s+(?:Întrebări|FAQ)/i, name: 'FAQ' },
    { pattern: /##\s+Concluzie/i, name: 'Concluzie' },
  ];

  const missing: string[] = [];
  for (const section of requiredSections) {
    if (!content.match(section.pattern)) {
      missing.push(section.name);
    }
  }

  return missing;
}

// Audit all breeds
function auditBreeds(): BreedAudit[] {
  const breedsDir = path.join(process.cwd(), 'content', 'breeds');
  const files = fs.readdirSync(breedsDir).filter(f => f.endsWith('.mdx') && !f.includes('.backup'));

  const results: BreedAudit[] = [];

  for (const file of files) {
    const filePath = path.join(breedsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.mdx', '');
    const title = extractFrontmatter(content, 'title') || slug;
    const image = extractFrontmatter(content, 'image') || '';
    const totalWords = countWords(content);
    const healthSection = findHealthSection(content);
    const missingSections = checkBreedSections(content);

    const issues: string[] = [];
    let status: 'ok' | 'warning' | 'error' = 'ok';

    if (totalWords < 2000) {
      issues.push(`Total words: ${totalWords} (deficit: -${2000 - totalWords})`);
      status = 'warning';
    }

    if (!healthSection.found) {
      issues.push('Health section NOT FOUND');
      status = 'error';
    } else if (healthSection.words < 400) {
      issues.push(`Health section: ${healthSection.words} words (deficit: -${400 - healthSection.words})`);
      status = 'warning';
    }

    if (missingSections.length > 0) {
      issues.push(`Missing sections: ${missingSections.join(', ')}`);
      status = 'warning';
    }

    results.push({
      slug,
      title,
      totalWords,
      healthSectionWords: healthSection.words,
      missSections: missingSections,
      image,
      status,
      issues,
    });
  }

  return results.sort((a, b) => a.totalWords - b.totalWords);
}

// Audit all articles
function auditArticles(): ArticleAudit[] {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx') && !f.includes('.backup'));

  // Known duplicate images
  const duplicateImages: Record<string, string[]> = {
    '/images/articles/simptome.jpg': [],
    '/images/articles/preventie.jpg': [],
    '/images/articles/boli-cronice.jpg': [],
    '/images/articles/proceduri.jpg': [],
  };

  const results: ArticleAudit[] = [];

  // First pass: collect images
  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const image = extractFrontmatter(content, 'image') || '';

    if (duplicateImages[image]) {
      duplicateImages[image].push(file.replace('.mdx', ''));
    }
  }

  // Second pass: audit
  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.mdx', '');
    const title = extractFrontmatter(content, 'title') || slug;
    const image = extractFrontmatter(content, 'image') || '';
    const totalWords = countWords(content);
    const missingSections = checkArticleSections(content);

    const isDuplicate = duplicateImages[image] && duplicateImages[image].length > 1;

    const issues: string[] = [];
    let status: 'ok' | 'warning' | 'error' = 'ok';

    if (totalWords < 1500) {
      issues.push(`Total words: ${totalWords} (deficit: -${1500 - totalWords})`);
      status = 'warning';
    }

    if (isDuplicate) {
      issues.push(`DUPLICATE IMAGE: ${image} (used by: ${duplicateImages[image].join(', ')})`);
      status = 'warning';
    }

    if (missingSections.length > 0) {
      issues.push(`Missing sections: ${missingSections.join(', ')}`);
      status = 'warning';
    }

    results.push({
      slug,
      title,
      totalWords,
      missingSections,
      image,
      imageDuplicate: isDuplicate,
      status,
      issues,
    });
  }

  return results.sort((a, b) => a.totalWords - b.totalWords);
}

// Audit all guides
function auditGuides(): GuideAudit[] {
  const guidesDir = path.join(process.cwd(), 'content', 'guides');
  const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.mdx') && !f.includes('.backup'));

  const results: GuideAudit[] = [];

  for (const file of files) {
    const filePath = path.join(guidesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.mdx', '');
    const title = extractFrontmatter(content, 'title') || slug;
    const totalWords = countWords(content);

    const issues: string[] = [];
    let status: 'ok' | 'warning' = 'ok';

    if (totalWords < 1500) {
      issues.push(`Total words: ${totalWords} (deficit: -${1500 - totalWords})`);
      status = 'warning';
    }

    results.push({
      slug,
      title,
      totalWords,
      status,
      issues,
    });
  }

  return results.sort((a, b) => a.totalWords - b.totalWords);
}

// Main function
async function main() {
  console.log(`${colors.bright}${colors.cyan}🔍 QA AUDIT EXHAUSTIV - PISICOPEDIA.RO${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Audit breeds
  console.log(`${colors.blue}📂 Auditare RASE...${colors.reset}`);
  const breeds = auditBreeds();

  // Audit articles
  console.log(`${colors.blue}📂 Auditare ARTICOLE...${colors.reset}`);
  const articles = auditArticles();

  // Audit guides
  console.log(`${colors.blue}📂 Auditare GHIDURI...${colors.reset}`);
  const guides = auditGuides();

  // Generate report
  console.log(`\n${colors.bright}${colors.cyan}📊 RAPORT COMPLET${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // RASE Summary
  const breedsOk = breeds.filter(b => b.status === 'ok').length;
  const breedsWarning = breeds.filter(b => b.status === 'warning').length;
  const breedsError = breeds.filter(b => b.status === 'error').length;
  const breedsUnder2000 = breeds.filter(b => b.totalWords < 2000);
  const breedsHealthUnder400 = breeds.filter(b => b.healthSectionWords < 400);

  console.log(`${colors.bright}1. RASE (30 total)${colors.reset}`);
  console.log(`   ${colors.green}✓ OK: ${breedsOk}${colors.reset} | ${colors.yellow}⚠ Warning: ${breedsWarning}${colors.reset} | ${colors.red}✗ Error: ${breedsError}${colors.reset}\n`);

  if (breedsUnder2000.length > 0) {
    console.log(`   ${colors.yellow}Rase sub 2000 cuvinte (${breedsUnder2000.length}):${colors.reset}`);
    for (const breed of breedsUnder2000.slice(0, 10)) {
      console.log(`   - ${breed.slug}: ${breed.totalWords} words (deficit: -${2000 - breed.totalWords})`);
    }
    if (breedsUnder2000.length > 10) console.log(`   ... +${breedsUnder2000.length - 10} more\n`);
  }

  if (breedsHealthUnder400.length > 0) {
    console.log(`   ${colors.yellow}Secțiuni sănătate < 400 cuvinte (${breedsHealthUnder400.length}):${colors.reset}`);
    for (const breed of breedsHealthUnder400.slice(0, 10)) {
      console.log(`   - ${breed.slug}: ${breed.healthSectionWords} words (deficit: -${400 - breed.healthSectionWords})`);
    }
    if (breedsHealthUnder400.length > 10) console.log(`   ... +${breedsHealthUnder400.length - 10} more\n`);
  }

  // ARTICOLE Summary
  const articlesOk = articles.filter(a => a.status === 'ok').length;
  const articlesWarning = articles.filter(a => a.status === 'warning').length;
  const articlesUnder1500 = articles.filter(a => a.totalWords < 1500);
  const articlesDuplicate = articles.filter(a => a.imageDuplicate);

  console.log(`\n${colors.bright}2. ARTICOLE (30 total)${colors.reset}`);
  console.log(`   ${colors.green}✓ OK: ${articlesOk}${colors.reset} | ${colors.yellow}⚠ Warning: ${articlesWarning}${colors.reset}\n`);

  if (articlesUnder1500.length > 0) {
    console.log(`   ${colors.yellow}Articole sub 1500 cuvinte (${articlesUnder1500.length}):${colors.reset}`);
    for (const article of articlesUnder1500) {
      console.log(`   - ${article.slug}: ${article.totalWords} words (deficit: -${1500 - article.totalWords})`);
    }
    console.log();
  }

  if (articlesDuplicate.length > 0) {
    console.log(`   ${colors.yellow}Articole cu imagini duplicate (${articlesDuplicate.length}):${colors.reset}`);
    for (const article of articlesDuplicate) {
      console.log(`   - ${article.slug}: ${article.image}`);
    }
    console.log();
  }

  // GHIDURI Summary
  const guidesOk = guides.filter(g => g.status === 'ok').length;
  const guidesWarning = guides.filter(g => g.status === 'warning').length;
  const guidesUnder1500 = guides.filter(g => g.totalWords < 1500);

  console.log(`${colors.bright}3. GHIDURI (24 total)${colors.reset}`);
  console.log(`   ${colors.green}✓ OK: ${guidesOk}${colors.reset} | ${colors.yellow}⚠ Warning: ${guidesWarning}${colors.reset}\n`);

  if (guidesUnder1500.length > 0) {
    console.log(`   ${colors.yellow}Ghiduri sub 1500 cuvinte (${guidesUnder1500.length}):${colors.reset}`);
    for (const guide of guidesUnder1500) {
      console.log(`   - ${guide.slug}: ${guide.totalWords} words (deficit: -${1500 - guide.totalWords})`);
    }
    console.log();
  }

  // Generate markdown report
  const report = generateMarkdownReport(breeds, articles, guides);
  const reportPath = path.join(process.cwd(), '..', 'RAPORT_QA_FINAL_2025-12-13.md');
  fs.writeFileSync(reportPath, report, 'utf-8');

  console.log(`\n${colors.green}✅ Raport salvat: ${reportPath}${colors.reset}\n`);
}

// Generate markdown report
function generateMarkdownReport(breeds: BreedAudit[], articles: ArticleAudit[], guides: GuideAudit[]): string {
  const now = new Date().toISOString().split('T')[0];

  let md = `# RAPORT QA AUDIT EXHAUSTIV - PISICOPEDIA.RO\n`;
  md += `**Data:** ${now}\n`;
  md += `**Status:** Audit Complet\n\n`;
  md += `---\n\n`;

  // Rase
  md += `## 1. RASE (30 total)\n\n`;
  const breedsOk = breeds.filter(b => b.status === 'ok').length;
  const breedsWarning = breeds.filter(b => b.status === 'warning').length;
  const breedsError = breeds.filter(b => b.status === 'error').length;
  md += `**Status:** ✅ ${breedsOk} OK | ⚠️ ${breedsWarning} Warning | ❌ ${breedsError} Error\n\n`;

  const breedsUnder2000 = breeds.filter(b => b.totalWords < 2000);
  if (breedsUnder2000.length > 0) {
    md += `### Rase sub 2000 cuvinte (${breedsUnder2000.length})\n\n`;
    md += `| Rasă | Cuvinte | Deficit |\n`;
    md += `|------|---------|----------|\n`;
    for (const breed of breedsUnder2000) {
      md += `| ${breed.slug} | ${breed.totalWords} | -${2000 - breed.totalWords} |\n`;
    }
    md += `\n`;
  }

  const breedsHealthUnder400 = breeds.filter(b => b.healthSectionWords < 400);
  if (breedsHealthUnder400.length > 0) {
    md += `### Secțiuni sănătate < 400 cuvinte (${breedsHealthUnder400.length})\n\n`;
    md += `| Rasă | Cuvinte Sănătate | Deficit |\n`;
    md += `|------|------------------|----------|\n`;
    for (const breed of breedsHealthUnder400) {
      md += `| ${breed.slug} | ${breed.healthSectionWords} | -${400 - breed.healthSectionWords} |\n`;
    }
    md += `\n`;
  }

  // Articole
  md += `## 2. ARTICOLE (30 total)\n\n`;
  const articlesOk = articles.filter(a => a.status === 'ok').length;
  const articlesWarning = articles.filter(a => a.status === 'warning').length;
  md += `**Status:** ✅ ${articlesOk} OK | ⚠️ ${articlesWarning} Warning\n\n`;

  const articlesUnder1500 = articles.filter(a => a.totalWords < 1500);
  if (articlesUnder1500.length > 0) {
    md += `### Articole sub 1500 cuvinte (${articlesUnder1500.length})\n\n`;
    md += `| Articol | Cuvinte | Deficit |\n`;
    md += `|---------|---------|----------|\n`;
    for (const article of articlesUnder1500) {
      md += `| ${article.slug} | ${article.totalWords} | -${1500 - article.totalWords} |\n`;
    }
    md += `\n`;
  }

  const articlesDuplicate = articles.filter(a => a.imageDuplicate);
  if (articlesDuplicate.length > 0) {
    md += `### Articole cu imagini duplicate (${articlesDuplicate.length})\n\n`;
    md += `| Articol | Imagine |\n`;
    md += `|---------|----------|\n`;
    for (const article of articlesDuplicate) {
      md += `| ${article.slug} | ${article.image} |\n`;
    }
    md += `\n`;
  }

  // Ghiduri
  md += `## 3. GHIDURI (24 total)\n\n`;
  const guidesOk = guides.filter(g => g.status === 'ok').length;
  const guidesWarning = guides.filter(g => g.status === 'warning').length;
  md += `**Status:** ✅ ${guidesOk} OK | ⚠️ ${guidesWarning} Warning\n\n`;

  const guidesUnder1500 = guides.filter(g => g.totalWords < 1500);
  if (guidesUnder1500.length > 0) {
    md += `### Ghiduri sub 1500 cuvinte (${guidesUnder1500.length})\n\n`;
    md += `| Ghid | Cuvinte | Deficit |\n`;
    md += `|------|---------|----------|\n`;
    for (const guide of guidesUnder1500) {
      md += `| ${guide.slug} | ${guide.totalWords} | -${1500 - guide.totalWords} |\n`;
    }
    md += `\n`;
  }

  // Prioritization
  md += `## PRIORITIZARE PROBLEME\n\n`;
  md += `### 🔴 CRITICE\n`;
  if (breedsError > 0) md += `- ${breedsError} rase fără secțiune sănătate\n`;
  md += `\n`;

  md += `### ⚠️ IMPORTANTE\n`;
  if (breedsUnder2000.length > 0) md += `- ${breedsUnder2000.length} rase sub 2000 cuvinte\n`;
  if (breedsHealthUnder400.length > 0) md += `- ${breedsHealthUnder400.length} rase cu secțiune sănătate < 400 cuvinte\n`;
  if (articlesUnder1500.length > 0) md += `- ${articlesUnder1500.length} articole sub 1500 cuvinte\n`;
  if (articlesDuplicate.length > 0) md += `- ${articlesDuplicate.length} articole cu imagini duplicate\n`;
  if (guidesUnder1500.length > 0) md += `- ${guidesUnder1500.length} ghiduri sub 1500 cuvinte\n`;
  md += `\n`;

  return md;
}

// Run
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
