import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');
const TARGET_WORDS = 1800;
const MIN_WORDS_THRESHOLD = 1600;

interface GuideStats {
  file: string;
  currentWords: number;
  needsExtension: boolean;
  targetWords: number;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function extractFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: '', content };
  return {
    frontmatter: match[1],
    content: match[2],
  };
}

async function analyzeGuides(): Promise<GuideStats[]> {
  const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.mdx'));
  const stats: GuideStats[] = [];

  console.log('\n📊 ANALIZĂ GHIDURI:\n');
  console.log('━'.repeat(60));

  for (const file of files) {
    const content = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf-8');
    const { content: bodyContent } = extractFrontmatter(content);
    const wordCount = countWords(bodyContent);
    const needsExtension = wordCount < MIN_WORDS_THRESHOLD;

    stats.push({
      file,
      currentWords: wordCount,
      needsExtension,
      targetWords: TARGET_WORDS,
    });

    const status = needsExtension ? '❌' : '✅';
    console.log(`${status} ${file.padEnd(35)} ${wordCount.toString().padStart(4)} cuvinte`);
  }

  console.log('━'.repeat(60));
  const needsWork = stats.filter(s => s.needsExtension).length;
  console.log(`\n📈 Ghiduri de extins: ${needsWork}/${stats.length}\n`);

  return stats;
}

async function extendGuideContent(
  originalContent: string,
  fileName: string,
  currentWords: number,
  targetWords: number
): Promise<string> {
  const { frontmatter, content } = extractFrontmatter(originalContent);
  const wordsToAdd = targetWords - currentWords;

  console.log(`\n🔄 Extind ${fileName}...`);
  console.log(`   Cuvinte curente: ${currentWords}`);
  console.log(`   Cuvinte țintă: ${targetWords}`);
  console.log(`   De adăugat: ~${wordsToAdd}`);

  const prompt = `Ești un expert în scriere de conținut SEO pentru articole despre îngrijirea pisicilor.

SARCINĂ: Extinde conținutul acestui ghid de la ${currentWords} la ${targetWords} cuvinte.

CONȚINUT ACTUAL:
${content}

CERINȚE STRICTE:
1. **Păstrează EXACT structura actuală** (titluri, subtitluri, secțiuni)
2. **NU schimba ordinea secțiunilor** existente
3. **NU elimina nimic** din conținutul existent
4. **Adaugă DOAR conținut nou, relevant și practic**

CE SĂ ADAUGI (${wordsToAdd} cuvinte):

### În secțiuni existente:
- Exemple concrete și cazuri practice din viața reală
- Liste cu bullet points detaliate
- Statistici și date utile pentru proprietarii de pisici
- Sfaturi "Pro tip:" sau "Sfat de expert:"
- Scenarii "Ce să faci dacă..." cu soluții pas cu pas

### Noi secțiuni (dacă e necesar):
- "🔍 Semne de monitorizat" - când să fii atent
- "💡 Trucuri și recomandări experte" - sfaturi avansate
- "❓ Întrebări frecvente suplimentare" - 3-5 Q&A
- "📊 Comparații și alternative" - diferite abordări
- "⚠️ Greșeli comune de evitat" - ce NU trebuie făcut

STIL DE SCRIERE:
- Prietenos, accesibil, dar profesionist
- Paragrafe scurte (2-3 propoziții)
- Folosește emojis pentru vizibilitate (🐱 💡 ⚠️ ✅)
- Adresează direct cititorului ("tu", "ta pisica")
- Focus pe PRACTICĂ, nu teorie

IMPORTANT:
- Conținutul trebuie să fie **100% original și relevant**
- Nu repeta informații deja existente
- Fiecare paragraf adăugat trebuie să aducă valoare REALĂ
- Scrie în **limba română**, natural și fluid

Răspunde DOAR cu conținutul extins complet (fără frontmatter, fără explicații suplimentare).`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Ești un expert în conținut SEO pentru articole despre îngrijirea pisicilor. Scrii în limba română, cu stil prietenos și profesionist.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const extendedContent = response.choices[0].message.content?.trim() || content;
    const finalWords = countWords(extendedContent);

    console.log(`   ✅ Finalizat: ${finalWords} cuvinte (+${finalWords - currentWords})`);

    return `---\n${frontmatter}\n---\n\n${extendedContent}`;
  } catch (error: any) {
    console.error(`   ❌ Eroare: ${error.message}`);
    return originalContent;
  }
}

async function extendAllGuides() {
  const stats = await analyzeGuides();
  const guidesToExtend = stats.filter(s => s.needsExtension);

  if (guidesToExtend.length === 0) {
    console.log('✅ Toate ghidurile au deja conținut suficient!\n');
    return;
  }

  console.log(`\n🚀 ÎNCEPEM EXTINDEREA A ${guidesToExtend.length} GHIDURI...\n`);
  console.log('━'.repeat(60));

  let completed = 0;
  let failed = 0;

  for (const guide of guidesToExtend) {
    try {
      const filePath = path.join(GUIDES_DIR, guide.file);
      const originalContent = fs.readFileSync(filePath, 'utf-8');

      const extendedContent = await extendGuideContent(
        originalContent,
        guide.file,
        guide.currentWords,
        guide.targetWords
      );

      // Save extended content
      fs.writeFileSync(filePath, extendedContent, 'utf-8');
      completed++;

      // Wait 2 seconds between requests to avoid rate limits
      if (completed < guidesToExtend.length) {
        console.log('   ⏳ Aștept 2 secunde...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error: any) {
      console.error(`\n❌ Eroare la ${guide.file}: ${error.message}`);
      failed++;
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log(`\n📊 REZULTATE FINALE:`);
  console.log(`   ✅ Ghiduri extinse: ${completed}`);
  console.log(`   ❌ Eșuări: ${failed}`);
  console.log(`   📈 Total procesate: ${guidesToExtend.length}\n`);

  // Final analysis
  console.log('🔍 ANALIZĂ FINALĂ:\n');
  await analyzeGuides();
}

// Run the script
extendAllGuides().catch(console.error);

