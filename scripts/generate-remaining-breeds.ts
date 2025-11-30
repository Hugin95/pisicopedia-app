import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: '.env.local' });

const MIN_WORDS_THRESHOLD = 2000; // Pragul pentru a considera un articol complet
const DELAY_BETWEEN_REQUESTS = 3000; // 3 secunde între cereri

// Rasele deja extinse complet (nu le atingem)
const COMPLETED_BREEDS = ['maine-coon', 'british-shorthair', 'persana'];

interface CLIOptions {
  maxBreeds?: number;
  onlyMissing?: boolean;
  dryRun?: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {};

  args.forEach(arg => {
    if (arg.startsWith('--max-breeds=')) {
      options.maxBreeds = parseInt(arg.split('=')[1]);
    }
    if (arg === '--only-missing') {
      options.onlyMissing = true;
    }
    if (arg === '--dry-run') {
      options.dryRun = true;
    }
  });

  return options;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function countWords(content: string): number {
  // Remove frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  // Count words
  return contentWithoutFrontmatter.split(/\s+/).filter(word => word.length > 0).length;
}

async function generateBreedContent(breedName: string, currentContent: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Ești un expert în pisici care creează conținut enciclopedic detaliat în limba română.

SARCINĂ: Extinde articolul despre rasa "${breedName}" la aproximativ 2500 cuvinte, urmând EXACT structura de mai jos.
Folosește ca MODEL DE TON și STRUCTURĂ articolele despre Maine Coon, British Shorthair și Persană.

STRUCTURĂ OBLIGATORIE (16 secțiuni):

1. **Titlu principal** (# ${breedName})
2. **Introducere captivantă** (paragraf de hook + 2 paragrafe context)
3. ## Introducere (3 paragrafe detaliate)
4. ## Istoric și origine (3-4 paragrafe)
5. ## Aspect fizic și standard de rasă (4-5 paragrafe cu detalii complete)
6. ## Temperament și personalitate (4 paragrafe)
7. ## Îngrijire și întreținere (3-4 paragrafe)
8. ## Sănătate și probleme medicale (4-5 paragrafe, fără tratamente specifice)
9. ## Exercițiu și activitate fizică (2-3 paragrafe)
10. ## Compatibilitate cu stiluri de viață (3 paragrafe)
11. ## Nivel de activitate (2 paragrafe)
12. ## Nutriție și greutate (3 paragrafe)
13. ## Îngrijirea pe termen lung (3 paragrafe)
14. ## Pentru cine este potrivită rasa (2-3 paragrafe)
15. ## Pentru cine NU este potrivită rasa (2 paragrafe)
16. ## Cum alegi un pui de ${breedName} (3 paragrafe)
17. ## Curiozități și fapte interesante (2-3 paragrafe)
18. ## FAQ - Întrebări frecvente (10 întrebări cu răspunsuri scurte)

REGULI IMPORTANTE:
- Folosește limba română cu diacritice complete
- NU recomanda medicamente, doze sau tratamente specifice
- Menționează întotdeauna "consultați medicul veterinar"
- Adaptează pentru publicul din România (prețuri în RON, referințe locale)
- Folosește bold (**text**) pentru evidențiere
- Păstrează ton profesional dar accesibil
- Include informații practice și utile

CONȚINUT CURENT (pentru context):
${currentContent.substring(0, 1000)}...

Generează articolul complet de ~2500 cuvinte:`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert veterinarian and animal behaviorist writing comprehensive breed guides in Romanian.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error('OpenAI API quota exceeded');
    }
    throw error;
  }
}

async function processBreed(breedSlug: string, options: CLIOptions): Promise<boolean> {
  const mdxPath = path.join(process.cwd(), 'content', 'breeds', `${breedSlug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    console.log(`❌ File not found: ${breedSlug}.mdx`);
    return false;
  }

  const currentContent = fs.readFileSync(mdxPath, 'utf-8');
  const wordCount = countWords(currentContent);

  console.log(`\n📊 ${breedSlug}: ${wordCount} words`);

  // Skip if already complete
  if (COMPLETED_BREEDS.includes(breedSlug)) {
    console.log(`✅ Already complete (manually extended)`);
    return false;
  }

  if (wordCount >= MIN_WORDS_THRESHOLD) {
    console.log(`✅ Already extended (${wordCount} words)`);
    return false;
  }

  if (options.dryRun) {
    console.log(`🔍 Would extend (dry run)`);
    return false;
  }

  // Extract breed name from frontmatter
  const titleMatch = currentContent.match(/title:\s*"([^"]+)"/);
  const breedName = titleMatch ? titleMatch[1] : breedSlug;

  console.log(`🔄 Extending ${breedName}...`);

  try {
    const extendedContent = await generateBreedContent(breedName, currentContent);

    // Extract frontmatter from current content
    const frontmatterMatch = currentContent.match(/^---[\s\S]*?---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';

    // Combine frontmatter with new content
    const finalContent = frontmatter + '\n\n' + extendedContent;

    // Backup original
    fs.writeFileSync(`${mdxPath}.backup-${Date.now()}`, currentContent);

    // Write extended content
    fs.writeFileSync(mdxPath, finalContent);

    const newWordCount = countWords(finalContent);
    console.log(`✅ Extended to ${newWordCount} words`);

    return true;
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    if (error.message.includes('quota exceeded')) {
      throw error; // Stop processing if quota exceeded
    }
    return false;
  }
}

async function main() {
  const options = parseArgs();

  console.log('🚀 Starting breed content extension');
  console.log('📋 Options:', options);
  console.log(`📝 Minimum word threshold: ${MIN_WORDS_THRESHOLD}`);
  console.log(`⏱️  Delay between requests: ${DELAY_BETWEEN_REQUESTS}ms\n`);

  // Get all breed files
  const breedsPath = path.join(process.cwd(), 'content', 'breeds');
  const breedFiles = fs.readdirSync(breedsPath)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));

  console.log(`Found ${breedFiles.length} breed files\n`);

  let processedCount = 0;
  let extendedCount = 0;
  let errorCount = 0;

  for (const breed of breedFiles) {
    if (options.maxBreeds && processedCount >= options.maxBreeds) {
      console.log(`\n⚠️ Reached max breeds limit (${options.maxBreeds})`);
      break;
    }

    try {
      const wasExtended = await processBreed(breed, options);
      processedCount++;

      if (wasExtended) {
        extendedCount++;
        // Add delay between API calls
        if (processedCount < breedFiles.length &&
            (!options.maxBreeds || processedCount < options.maxBreeds)) {
          console.log(`⏳ Waiting ${DELAY_BETWEEN_REQUESTS}ms...`);
          await delay(DELAY_BETWEEN_REQUESTS);
        }
      }
    } catch (error: any) {
      errorCount++;
      if (error.message.includes('quota exceeded')) {
        console.error('\n🛑 OpenAI quota exceeded. Stopping...');
        break;
      }
    }
  }

  // Final report
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL REPORT');
  console.log('='.repeat(60));
  console.log(`Total breeds processed: ${processedCount}`);
  console.log(`Breeds extended: ${extendedCount}`);
  console.log(`Already complete: ${breedFiles.filter(b => COMPLETED_BREEDS.includes(b)).length}`);
  console.log(`Errors: ${errorCount}`);

  // Count current status
  let above2000 = 0;
  let below2000 = 0;

  for (const breed of breedFiles) {
    const mdxPath = path.join(breedsPath, `${breed}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf-8');
      const words = countWords(content);
      if (words >= 2000) above2000++;
      else below2000++;
    }
  }

  console.log(`\n📈 Current status:`);
  console.log(`Breeds ≥2000 words: ${above2000}/${breedFiles.length}`);
  console.log(`Breeds <2000 words: ${below2000}/${breedFiles.length}`);
  console.log(`Progress: [${Array(above2000).fill('█').join('')}${Array(below2000).fill('░').join('')}] ${Math.round(above2000/breedFiles.length*100)}%`);
}

main().catch(console.error);