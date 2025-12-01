/**
 * Extend Articles Script for Pisicopedia.ro
 *
 * Extends article content to 1500-2500 words using OpenAI GPT-4.
 * Preserves existing content and adds depth/detail.
 *
 * Usage:
 *   npm run extend:articles
 *   npm run extend:articles -- --dry-run  (preview without saving)
 *   npm run extend:articles -- --article=slug  (extend specific article)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getOpenAIClient, CONTENT_CONFIG } from '../lib/ai-config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const MIN_WORDS = 1500;
const MAX_WORDS = 2500;

interface ArticleInfo {
  filename: string;
  slug: string;
  title: string;
  category: string;
  wordCount: number;
  needsExtension: boolean;
}

/**
 * Count words in markdown content (excluding frontmatter)
 */
function countWords(content: string): number {
  // Remove markdown syntax
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .trim();

  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Get all article files with their info
 */
function getArticleFiles(): ArticleInfo[] {
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.mdx') && !file.includes('.backup'));

  return files.map(filename => {
    const filePath = path.join(ARTICLES_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const wordCount = countWords(content);
    const needsExtension = wordCount < MIN_WORDS;

    return {
      filename,
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || '',
      category: data.category || 'unknown',
      wordCount,
      needsExtension,
    };
  });
}

/**
 * Generate extension prompt for OpenAI
 */
function generateExtensionPrompt(
  title: string,
  category: string,
  currentContent: string,
  currentWordCount: number
): string {
  const targetWords = Math.floor(Math.random() * (MAX_WORDS - MIN_WORDS + 1)) + MIN_WORDS;
  const wordsToAdd = targetWords - currentWordCount;

  return `Ești un medic veterinar expert specializat în pisici. Ai un articol existent pe Pisicopedia.ro care are ${currentWordCount} cuvinte și trebuie extins la aproximativ ${targetWords} cuvinte (adaugă ~${wordsToAdd} cuvinte).

IMPORTANT - NU RESCRIE ARTICOLUL! PĂSTREAZĂ TOT CONȚINUTUL EXISTENT!

Articol existent:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${currentContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SARCINA TA:
1. PĂSTREAZĂ EXACT tot conținutul de mai sus (titluri, paragrafe, structură)
2. ADAUGĂ conținut nou pentru a extinde articolul la ~${targetWords} cuvinte
3. Adaugă detalii medicale suplimentare în secțiunile existente
4. Extinde explicațiile existente cu exemple concrete
5. Adaugă secțiuni noi relevante dacă e necesar:
   - Factori de risc
   - Complicații posibile
   - Prognostic
   - Când să mergi de urgență la veterinar
   - Întrebări frecvente (FAQ) cu 5-7 întrebări
   - Mărturii/cazuri tipice (anonimizate)
   - Sfaturi practice pentru proprietari

STILUL PISICOPEDIA:
- Limba română, ton profesional dar accesibil
- Empatic și informativ
- NU dai diagnostic sau tratamente concrete
- Recomandă consultarea veterinarului
- Folosește liste, bold pentru concepte importante
- Structură clară cu H2 (##) și H3 (###)

RĂSPUNDE DOAR CU ARTICOLUL COMPLET EXTINS (cu tot conținutul vechi + noul conținut), FĂRĂ explicații sau comentarii în afara articolului.`;
}

/**
 * Extend a single article using OpenAI
 */
async function extendArticle(
  articleInfo: ArticleInfo,
  dryRun: boolean = false
): Promise<boolean> {
  const filePath = path.join(ARTICLES_DIR, articleInfo.filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  console.log(`\n📝 Extending: ${articleInfo.title}`);
  console.log(`   Current: ${articleInfo.wordCount} words`);
  console.log(`   Target: ${MIN_WORDS}-${MAX_WORDS} words`);

  try {
    const client = getOpenAIClient();
    const prompt = generateExtensionPrompt(
      articleInfo.title,
      articleInfo.category,
      content,
      articleInfo.wordCount
    );

    console.log('   ⏳ Calling OpenAI...');

    const response = await client.chat.completions.create({
      model: CONTENT_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `Ești un medic veterinar expert specializat în pisici, care extinde articole medicale pentru Pisicopedia.ro. PĂSTREZI tot conținutul existent și adaugi detalii relevante.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000, // Max for gpt-4-turbo-preview
    });

    const extendedContent = response.choices[0]?.message?.content?.trim();

    if (!extendedContent) {
      throw new Error('No content received from OpenAI');
    }

    const newWordCount = countWords(extendedContent);
    console.log(`   ✅ Extended to ${newWordCount} words (+${newWordCount - articleInfo.wordCount})`);

    if (dryRun) {
      console.log('   🔍 DRY RUN - Not saving');
      return true;
    }

    // Create backup
    const backupPath = `${filePath}.backup-${Date.now()}`;
    fs.copyFileSync(filePath, backupPath);

    // Update reading time based on new word count (average reading: 200 words/min)
    const readingTime = Math.ceil(newWordCount / 200);
    data.readingTime = readingTime;

    // Save extended article
    const updatedFile = matter.stringify(extendedContent, data);
    fs.writeFileSync(filePath, updatedFile, 'utf-8');

    console.log(`   💾 Saved! Backup created: ${path.basename(backupPath)}`);
    console.log(`   📖 Reading time updated: ${readingTime} min`);

    return true;
  } catch (error: any) {
    console.error(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const specificArticle = args.find(arg => arg.startsWith('--article='))?.split('=')[1];

  console.log('📚 Article Extension Script\n');
  console.log('━'.repeat(60));

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set in .env.local');
    process.exit(1);
  }

  // Get all articles
  let articles = getArticleFiles();

  // Filter if specific article requested
  if (specificArticle) {
    articles = articles.filter(a => a.slug === specificArticle);
    if (articles.length === 0) {
      console.error(`❌ Article not found: ${specificArticle}`);
      process.exit(1);
    }
  }

  // Filter to only articles needing extension
  const articlesToExtend = articles.filter(a => a.needsExtension);

  console.log(`\n📊 Analysis:`);
  console.log(`   Total articles: ${articles.length}`);
  console.log(`   Need extension: ${articlesToExtend.length}`);
  console.log(`   Already good: ${articles.length - articlesToExtend.length}`);

  if (articlesToExtend.length === 0) {
    console.log('\n✅ All articles already meet the word count requirement!');
    process.exit(0);
  }

  if (dryRun) {
    console.log('\n🔍 DRY RUN MODE - No changes will be saved\n');
  }

  console.log('\n━'.repeat(60));

  let successCount = 0;
  let failCount = 0;

  // Process each article
  for (let i = 0; i < articlesToExtend.length; i++) {
    const article = articlesToExtend[i];
    console.log(`\n[${i + 1}/${articlesToExtend.length}]`);

    const success = await extendArticle(article, dryRun);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between API calls
    if (i < articlesToExtend.length - 1) {
      console.log('\n   ⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 SUMMARY:');
  console.log(`   ✅ Successfully extended: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total processed: ${articlesToExtend.length}`);

  if (!dryRun && successCount > 0) {
    console.log(`\n💡 TIP: Backups created with .backup-[timestamp] extension`);
    console.log(`   Review changes and delete backups when satisfied.`);
  }

  console.log('\n━'.repeat(60));
}

// Run
main().catch(error => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
