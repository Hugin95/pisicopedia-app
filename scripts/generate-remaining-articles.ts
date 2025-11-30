import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MIN_WORDS_THRESHOLD = 1500; // Pragul pentru articole
const DELAY_BETWEEN_REQUESTS = 3000; // 3 secunde între cereri

interface CLIOptions {
  maxArticles?: number;
  onlyMissing?: boolean;
  dryRun?: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {};

  args.forEach(arg => {
    if (arg.startsWith('--max-articles=')) {
      options.maxArticles = parseInt(arg.split('=')[1]);
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
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  return contentWithoutFrontmatter.split(/\s+/).filter(word => word.length > 0).length;
}

async function generateArticleContent(title: string, category: string, currentContent: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Determine article type based on title/category
  const isSymptom = category === 'simptome' || title.includes('simptome');
  const isDisease = category === 'boli' || title.includes('boala') || title.includes('sindrom');
  const isPrevention = category === 'preventie' || title.includes('vaccinare') || title.includes('deparazitare');
  const isProcedure = category === 'proceduri' || title.includes('sterilizare') || title.includes('analize');
  const isBehavior = category === 'comportament' || title.includes('comportament') || title.includes('agresivitate');
  const isNutrition = category === 'nutritie' || title.includes('dietă') || title.includes('hrănire');
  const isCare = category === 'ingrijire' || title.includes('îngrijire');

  const prompt = `Ești un medic veterinar expert care creează ghiduri medicale detaliate în limba română.

SARCINĂ: Creează un articol complet de ~1800-2000 cuvinte despre "${title}".

STRUCTURĂ OBLIGATORIE:

# ${title}

## Introducere
- 3 paragrafe care explică direct problema/subiectul
- Menționează frecvența în România
- Importanța pentru proprietarii de pisici

## Ce trebuie să știi despre ${title.toLowerCase()}
- Definiție clară și completă
- Mecanismul de apariție/dezvoltare
- Factori de risc

${isSymptom || isDisease ? `
## Simptome și semne clinice
- Simptome timpurii
- Simptome avansate
- Semne de urgență medicală
- Cum să observi corect pisica
` : ''}

${isDisease ? `
## Cauze și factori declanșatori
- Cauze primare
- Factori predispozanți
- Grupuri de risc
` : ''}

## Diagnostic
- Ce teste sunt necesare
- Ce întrebări va pune veterinarul
- Cum să te pregătești pentru vizită

${isDisease || isSymptom ? `
## Opțiuni de tratament
- Abordarea generală (NU medicamente specifice)
- Ce poți face acasă în siguranță
- Când este necesară spitalizarea
- Prognosticul general
` : ''}

${isPrevention || isProcedure ? `
## Procedura în detaliu
- Pregătirea necesară
- Etapele procedurii
- Îngrijirea post-procedură
- Riscuri și complicații posibile
` : ''}

## Prevenție
- Măsuri preventive concrete
- Factori de mediu
- Monitorizare regulată
- Controale veterinare recomandate

## Îngrijirea acasă
- Ce poți face în siguranță
- Monitorizarea simptomelor
- Confortul pisicii
- Alimentația adaptată

## Când să mergi URGENT la veterinar
- Lista clară de semne de alarmă
- Ce NU trebuie să aștepți
- Cum să transporți pisica în urgență

## Costuri estimate în România
- Consultație și diagnostic
- Tratament de bază
- Cazuri complicate
- Sfaturi pentru economii

## Mituri și concepții greșite
- 3-4 mituri comune demontate
- Ce NU trebuie să faci
- Informații false de pe internet

## FAQ - Întrebări frecvente

### 1. ${title} este contagios pentru oameni?
[Răspuns clar]

### 2. Cât durează recuperarea?
[Răspuns detaliat]

### 3. Poate fi prevenit complet?
[Răspuns practic]

### 4. Care sunt șansele de vindecare?
[Răspuns realist]

### 5. Este ereditar?
[Răspuns științific]

### 6. Pisica poate avea o viață normală după?
[Răspuns încurajator dar realist]

### 7. Cât costă tratamentul în România?
[Răspuns cu interval de prețuri]

### 8. Sunt necesare controale regulate?
[Răspuns cu frecvența recomandată]

### 9. Ce alte pisici sunt predispuse?
[Răspuns despre grupuri de risc]

### 10. Există tratamente naturiste eficiente?
[Răspuns responsabil medical]

## Concluzie
- Rezumat al punctelor cheie
- Încurajare pentru acțiune responsabilă
- Importanța colaborării cu veterinarul

---

*Notă medicală: Informațiile prezentate au scop educativ și nu înlocuiesc consultarea unui medic veterinar. Pentru diagnostic și tratament specific, consultați întotdeauna un specialist.*

REGULI IMPORTANTE:
- Limba română cu diacritice complete
- NU recomanda medicamente, doze, mărci specifice
- Întotdeauna "consultați medicul veterinar"
- Prețuri în RON pentru România
- Ton profesional dar accesibil
- Informații practice și aplicabile
- Fără exagerări sau panică

Generează articolul complet:`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert veterinarian writing comprehensive medical guides in Romanian.'
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

async function processArticle(articleSlug: string, options: CLIOptions): Promise<boolean> {
  const mdxPath = path.join(process.cwd(), 'content', 'articles', `${articleSlug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    console.log(`❌ File not found: ${articleSlug}.mdx`);
    return false;
  }

  const currentContent = fs.readFileSync(mdxPath, 'utf-8');
  const wordCount = countWords(currentContent);

  console.log(`\n📊 ${articleSlug}: ${wordCount} words`);

  if (wordCount >= MIN_WORDS_THRESHOLD) {
    console.log(`✅ Already extended (${wordCount} words)`);
    return false;
  }

  if (options.dryRun) {
    console.log(`🔍 Would extend (dry run)`);
    return false;
  }

  // Extract metadata from frontmatter
  const titleMatch = currentContent.match(/title:\s*"([^"]+)"/);
  const categoryMatch = currentContent.match(/category:\s*"([^"]+)"/);
  const subcategoryMatch = currentContent.match(/subcategory:\s*"([^"]+)"/);

  const title = titleMatch ? titleMatch[1] : articleSlug;
  const category = subcategoryMatch ? subcategoryMatch[1] :
                   categoryMatch ? categoryMatch[1] : 'general';

  console.log(`🔄 Extending "${title}"...`);

  try {
    const extendedContent = await generateArticleContent(title, category, currentContent);

    // Extract frontmatter
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
      throw error;
    }
    return false;
  }
}

async function updateDataFile() {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
  const articlesPath = path.join(process.cwd(), 'content', 'articles');

  console.log('\n📝 Updating lib/data.ts with all articles...');

  // Get all article files
  const articleFiles = fs.readdirSync(articlesPath)
    .filter(f => f.endsWith('.mdx'));

  const articles = [];

  for (const file of articleFiles) {
    const content = fs.readFileSync(path.join(articlesPath, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const descMatch = content.match(/description:\s*"([^"]+)"/);
    const catMatch = content.match(/category:\s*"([^"]+)"/);
    const excerptMatch = content.match(/excerpt:\s*"([^"]+)"/);
    const readingTimeMatch = content.match(/readingTime:\s*(\d+)/);

    const slug = file.replace('.mdx', '');
    const title = titleMatch ? titleMatch[1] : slug;
    const description = descMatch ? descMatch[1] : excerptMatch ? excerptMatch[1] : '';
    const category = catMatch ? catMatch[1] : 'general';
    const readingTime = readingTimeMatch ? parseInt(readingTimeMatch[1]) : 5;

    // Determine image based on category
    const categoryImageMap: Record<string, string> = {
      'simptome': 'simptome.jpg',
      'boli': 'boli-cronice.jpg',
      'preventie': 'preventie.jpg',
      'proceduri': 'proceduri.jpg',
      'comportament': 'comportament.jpg',
      'nutritie': 'nutritie.jpg',
      'ingrijire': 'ingrijire.jpg',
      'ghiduri': 'ghiduri.jpg'
    };

    const image = `/images/articles/${categoryImageMap[category] || 'general.jpg'}`;

    articles.push({
      slug,
      title,
      description,
      category,
      image,
      readingTime
    });
  }

  // Read current data.ts and preserve breeds
  const currentData = fs.readFileSync(dataPath, 'utf-8');
  const breedsMatch = currentData.match(/export const breeds[\s\S]*?\];/);
  const breedsSection = breedsMatch ? breedsMatch[0] : '';

  // Generate new data.ts content
  const newContent = `${breedsSection}

export const articles = [
${articles.map(a => `  {
    slug: "${a.slug}",
    title: "${a.title.replace(/"/g, '\\"')}",
    description: "${a.description.replace(/"/g, '\\"')}",
    category: "${a.category}",
    image: "${a.image}",
    readingTime: ${a.readingTime}
  }`).join(',\n')}
];

export const guides = [
  {
    slug: "cum-sa-alegi-pisica-potrivita",
    title: "Cum să alegi pisica potrivită pentru tine",
    description: "Ghid complet pentru alegerea rasei de pisică potrivite stilului tău de viață",
    category: "ghid-cumparare",
    image: "/images/guides/alegere-pisica.jpg",
    readingTime: 10
  },
  {
    slug: "pregatirea-casei-pentru-pisica",
    title: "Pregătirea casei pentru noua pisică",
    description: "Tot ce trebuie să știi pentru a-ți pregăti casa pentru sosirea unei pisici",
    category: "ghid-ingrijire",
    image: "/images/guides/pregatire-casa.jpg",
    readingTime: 8
  }
];

// Helper functions
export const sampleBreeds = breeds;
export const sampleArticles = articles;

export function getAllBreeds() {
  return breeds;
}

export function getBreedBySlug(slug: string) {
  return breeds.find(breed => breed.slug === slug);
}

export function getTopBreeds(count: number = 6) {
  return breeds.slice(0, count);
}

export function getAllArticles() {
  return articles;
}

export function getArticleBySlug(slug: string) {
  return articles.find(article => article.slug === slug);
}

export function getLatestArticles(count: number = 6) {
  return articles.slice(0, count);
}

export function getArticlesByCategory(category: string) {
  return articles.filter(article => article.category === category);
}

export function getAllGuides() {
  return guides;
}

export function getTopGuides(count: number = 3) {
  return guides.slice(0, count);
}`;

  // Backup and write
  fs.writeFileSync(`${dataPath}.backup-${Date.now()}`, currentData);
  fs.writeFileSync(dataPath, newContent);

  console.log(`✅ Updated data.ts with ${articles.length} articles`);
}

async function main() {
  const options = parseArgs();

  console.log('🚀 Starting article content extension');
  console.log('📋 Options:', options);
  console.log(`📝 Minimum word threshold: ${MIN_WORDS_THRESHOLD}`);
  console.log(`⏱️  Delay between requests: ${DELAY_BETWEEN_REQUESTS}ms\n`);

  // Get all article files
  const articlesPath = path.join(process.cwd(), 'content', 'articles');
  const articleFiles = fs.readdirSync(articlesPath)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));

  console.log(`Found ${articleFiles.length} article files\n`);

  let processedCount = 0;
  let extendedCount = 0;
  let errorCount = 0;

  for (const article of articleFiles) {
    if (options.maxArticles && processedCount >= options.maxArticles) {
      console.log(`\n⚠️ Reached max articles limit (${options.maxArticles})`);
      break;
    }

    try {
      const wasExtended = await processArticle(article, options);
      processedCount++;

      if (wasExtended) {
        extendedCount++;
        // Add delay between API calls
        if (processedCount < articleFiles.length &&
            (!options.maxArticles || processedCount < options.maxArticles)) {
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

  // Update data.ts with all articles
  if (extendedCount > 0 && !options.dryRun) {
    await updateDataFile();
  }

  // Final report
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL REPORT');
  console.log('='.repeat(60));
  console.log(`Total articles processed: ${processedCount}`);
  console.log(`Articles extended: ${extendedCount}`);
  console.log(`Errors: ${errorCount}`);

  // Count current status
  let above1500 = 0;
  let below1500 = 0;

  for (const article of articleFiles) {
    const mdxPath = path.join(articlesPath, `${article}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf-8');
      const words = countWords(content);
      if (words >= 1500) above1500++;
      else below1500++;
    }
  }

  console.log(`\n📈 Current status:`);
  console.log(`Articles ≥1500 words: ${above1500}/${articleFiles.length}`);
  console.log(`Articles <1500 words: ${below1500}/${articleFiles.length}`);
  console.log(`Progress: [${Array(above1500).fill('█').join('')}${Array(below1500).fill('░').join('')}] ${Math.round(above1500/articleFiles.length*100)}%`);
}

main().catch(console.error);