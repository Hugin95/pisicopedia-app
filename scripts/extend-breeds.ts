#!/usr/bin/env tsx

/**
 * Extend Breeds Content
 *
 * Extinde fiecare rasă la 2000+ cuvinte total și secțiune sănătate 400-600 cuvinte
 * folosind OpenAI API.
 */

import * as fs from 'fs';
import * as path from 'path';
import { getOpenAIClient, CONTENT_CONFIG } from '../lib/ai-config';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

// Parse args
function parseArgs(): { breed?: string; dryRun: boolean } {
  const args = process.argv.slice(2);
  let breed: string | undefined;
  let dryRun = false;

  for (const arg of args) {
    if (arg.startsWith('--breed=')) {
      breed = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  return { breed, dryRun };
}

// Count words
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

// Find health section
function findHealthSection(content: string): { start: number; end: number; words: number } | null {
  const healthPatterns = [
    /##\s+(?:Probleme de )?Sănătate/i,
    /##\s+Probleme (?:de sănătate|medicale)/i,
    /##\s+Sănătate și (?:îngrijire|probleme medicale)/i,
  ];

  for (const pattern of healthPatterns) {
    const match = content.match(pattern);
    if (match && match.index !== undefined) {
      const start = match.index;
      const nextSectionMatch = content.slice(start + match[0].length).match(/\n##\s+/);
      const end = nextSectionMatch ? start + match[0].length + nextSectionMatch.index! : content.length;

      const sectionContent = content.slice(start, end);
      const words = countWords(sectionContent);

      return { start, end, words };
    }
  }

  return null;
}

// Extend breed content with OpenAI
async function extendBreedContent(filePath: string, dryRun: boolean): Promise<void> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = path.basename(filePath, '.mdx');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`${colors.red}❌ No frontmatter found in ${slug}${colors.reset}`);
    return;
  }

  const frontmatter = frontmatterMatch[0];
  const bodyContent = content.slice(frontmatter.length);

  // Get current stats
  const totalWords = countWords(content);
  const healthSection = findHealthSection(content);
  const healthWords = healthSection ? healthSection.words : 0;

  console.log(`\n${colors.cyan}📝 Processing: ${slug}${colors.reset}`);
  console.log(`   Current: ${totalWords} words total, ${healthWords} words health section`);

  // Check if needs extension
  const needsGeneralExtension = totalWords < 2000;
  const needsHealthExtension = healthWords < 400;

  if (!needsGeneralExtension && !needsHealthExtension) {
    console.log(`${colors.green}✅ Already complete - skipping${colors.reset}`);
    return;
  }

  if (dryRun) {
    console.log(`${colors.yellow}🔍 DRY RUN - would extend:${colors.reset}`);
    if (needsGeneralExtension) console.log(`   - General content: ${totalWords} → 2000+ words`);
    if (needsHealthExtension) console.log(`   - Health section: ${healthWords} → 400-600 words`);
    return;
  }

  // Create backup
  const backupPath = `${filePath}.backup-${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`   Backup created: ${path.basename(backupPath)}`);

  const openai = getOpenAIClient();

  try {
    // Extend health section if needed
    let updatedContent = content;

    if (needsHealthExtension) {
      console.log(`${colors.cyan}🏥 Extending health section...${colors.reset}`);

      const prompt = `Ai un articol despre rasa de pisici "${slug}" pentru Pisicopedia.ro.

CONȚINUTUL ACTUAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${content}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEMA: Secțiunea de sănătate are doar ${healthWords} cuvinte. Trebuie extinsă la 400-600 cuvinte.

SARCINA TA:
1. GĂSEȘTE secțiunea de sănătate (poate fi "## Sănătate", "## Probleme de sănătate", etc.)
2. EXTINDE această secțiune la 400-600 cuvinte adăugând:
   - Predispoziții genetice specifice rasei
   - Probleme de sănătate frecvente la această rasă
   - Semne de alarmă pentru proprietari
   - Recomandări de screening veterinar
   - Speranță de viață și îngrijire preventivă
3. PĂSTREAZĂ exact structura și formatarea MDX existentă
4. NU modifica frontmatter-ul YAML
5. NU modifica alte secțiuni decât cea de sănătate

OUTPUT: Întreg articolul cu secțiunea de sănătate extinsă. Returnează MDX complet, gata de salvat.`;

      const response = await openai.chat.completions.create({
        model: CONTENT_CONFIG.model,
        temperature: CONTENT_CONFIG.temperature,
        max_tokens: CONTENT_CONFIG.max_tokens,
        messages: [
          { role: 'system', content: 'Ești un medic veterinar expert în rase de pisici, care scrie conținut medical pentru enciclopedia Pisicopedia.ro.' },
          { role: 'user', content: prompt }
        ],
      });

      updatedContent = response.choices[0].message.content || content;
      const newHealthWords = findHealthSection(updatedContent)?.words || 0;
      console.log(`   ${colors.green}✓ Health section extended: ${healthWords} → ${newHealthWords} words${colors.reset}`);
    }

    // Extend general content if still needed
    const currentTotal = countWords(updatedContent);
    if (currentTotal < 2000) {
      console.log(`${colors.cyan}📝 Extending general content...${colors.reset}`);

      const prompt = `Ai un articol despre rasa de pisici "${slug}" pentru Pisicopedia.ro.

CONȚINUTUL ACTUAL (${currentTotal} cuvinte):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${updatedContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEMA: Articolul are doar ${currentTotal} cuvinte. Trebuie extins la minimum 2000 cuvinte.

SARCINA TA:
1. ADAUGĂ secțiuni lipsă sau extinde secțiunile existente:
   - Compatibilitate cu alte animale (pisici, câini, copii)
   - Nutriție și dietă specifică rasei
   - Îngrijirea blănii (frecvență, tehnici)
   - Exercițiu și activitate fizică
   - Achiziție și cost (ce să verifici la breeder)
   - FAQ (8-10 întrebări frecvente)
   - Concluzie
2. PĂSTREAZĂ exact toate secțiunile existente (nu le modifica)
3. NU modifica frontmatter-ul YAML
4. Asigură-te că articolul final are MINIMUM 2000 cuvinte

STIL:
- Ton profesional dar prietenos
- Informații practice pentru proprietari
- Specific pentru rasa ${slug}

OUTPUT: Articol MDX complet cu minimum 2000 cuvinte, gata de salvat.`;

      const response = await openai.chat.completions.create({
        model: CONTENT_CONFIG.model,
        temperature: CONTENT_CONFIG.temperature,
        max_tokens: CONTENT_CONFIG.max_tokens,
        messages: [
          { role: 'system', content: 'Ești un medic veterinar expert în rase de pisici, care scrie conținut detaliat pentru enciclopedia Pisicopedia.ro.' },
          { role: 'user', content: prompt }
        ],
      });

      updatedContent = response.choices[0].message.content || updatedContent;
    }

    // Save updated content
    const finalWords = countWords(updatedContent);
    const finalHealthWords = findHealthSection(updatedContent)?.words || 0;

    fs.writeFileSync(filePath, updatedContent, 'utf-8');

    console.log(`${colors.green}✅ Extended successfully:${colors.reset}`);
    console.log(`   Total: ${totalWords} → ${finalWords} words (+${finalWords - totalWords})`);
    console.log(`   Health: ${healthWords} → ${finalHealthWords} words (+${finalHealthWords - healthWords})`);

    // Wait 3 seconds between API calls
    await new Promise(resolve => setTimeout(resolve, 3000));

  } catch (error: any) {
    console.error(`${colors.red}❌ Error extending ${slug}: ${error.message}${colors.reset}`);
    // Restore backup on error
    fs.copyFileSync(backupPath, filePath);
    console.log(`   ${colors.yellow}⚠️  Restored from backup${colors.reset}`);
  }
}

// Main
async function main() {
  console.log(`${colors.cyan}🔧 BREED CONTENT EXTENDER${colors.reset}\n`);

  const { breed, dryRun } = parseArgs();

  const breedsDir = path.join(process.cwd(), 'content', 'breeds');
  const files = fs.readdirSync(breedsDir)
    .filter(f => f.endsWith('.mdx') && !f.includes('.backup'))
    .filter(f => !breed || f === `${breed}.mdx`);

  console.log(`Processing ${files.length} breed(s)${dryRun ? ' (DRY RUN)' : ''}...\n`);

  for (const file of files) {
    await extendBreedContent(path.join(breedsDir, file), dryRun);
  }

  console.log(`\n${colors.green}✅ Done!${colors.reset}\n`);
}

main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
