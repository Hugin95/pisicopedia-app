import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DELAY_BETWEEN_REQUESTS = 3000; // 3 secunde între cereri

// Lista completă de ghiduri de generat (24 total)
const GUIDES_LIST = [
  // Îngrijire de bază (4)
  { slug: 'pregatire-casa-pisica', title: 'Pregătirea casei pentru noua pisică', category: 'ghid-ingrijire', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'alegere-litiera', title: 'Cum să alegi litiera perfectă pentru pisică', category: 'ghid-ingrijire', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'amenajare-spatiu', title: 'Amenajarea spațiului pentru pisici', category: 'ghid-ingrijire', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'igiena-zilnica', title: 'Rutina zilnică de îngrijire a pisicii', category: 'ghid-ingrijire', image: '/images/guides/pregatire-casa.jpg' },

  // Sănătate preventivă (4)
  { slug: 'calendar-vaccinare', title: 'Calendar complet de vaccinare pentru pisici', category: 'sanatate', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'ghid-deparazitare', title: 'Ghid complet de deparazitare internă și externă', category: 'sanatate', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'sterilizare-pro-contra', title: 'Sterilizarea pisicilor: pro și contra', category: 'sanatate', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'controale-veterinare', title: 'Controale veterinare regulate: când și de ce', category: 'sanatate', image: '/images/guides/pregatire-casa.jpg' },

  // Nutriție (4)
  { slug: 'hrana-uscata-vs-umeda', title: 'Hrană uscată vs. hrană umedă: ce să alegi', category: 'nutritie', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'calculare-portii', title: 'Cum să calculezi porțiile corecte pentru pisică', category: 'nutritie', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'alimente-periculoase', title: 'Alimente periculoase pentru pisici: lista completă', category: 'nutritie', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'diete-speciale', title: 'Diete speciale pentru pisici: când sunt necesare', category: 'nutritie', image: '/images/guides/pregatire-casa.jpg' },

  // Comportament (4)
  { slug: 'limbaj-pisica', title: 'Limbajul corporal al pisicilor: ghid complet', category: 'comportament', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'dresaj-pisica', title: 'Dresajul pisicilor: tehnici eficiente', category: 'comportament', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'probleme-comportament', title: 'Probleme comune de comportament și soluții', category: 'comportament', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'jucarii-imbogatire', title: 'Jucării și îmbogățirea mediului pentru pisici', category: 'comportament', image: '/images/guides/pregatire-casa.jpg' },

  // Creștere pui (4)
  { slug: 'pui-nou-nascuti', title: 'Îngrijirea puilor de pisică nou-născuți', category: 'pui', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'intarcare-pui', title: 'Înțărcarea puilor: ghid pas cu pas', category: 'pui', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'socializare-pui', title: 'Socializarea puilor de pisică', category: 'pui', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'prima-vizita-veterinar', title: 'Prima vizită la veterinar cu puiul', category: 'pui', image: '/images/guides/pregatire-casa.jpg' },

  // Îngrijire senior (4)
  { slug: 'ingrijire-senior', title: 'Îngrijirea pisicilor senior: ghid complet', category: 'senior', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'probleme-senior', title: 'Probleme comune la pisicile senior', category: 'senior', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'adaptare-casa-senior', title: 'Adaptarea casei pentru pisici în vârstă', category: 'senior', image: '/images/guides/pregatire-casa.jpg' },
  { slug: 'nutritie-senior', title: 'Nutriția pisicilor senior: ce să știi', category: 'senior', image: '/images/guides/pregatire-casa.jpg' },
];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateGuideContent(title: string, category: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Ești un expert în îngrijirea pisicilor care creează ghiduri practice și detaliate în limba română.

SARCINĂ: Creează un ghid complet de ~1500-1800 cuvinte despre "${title}".

STRUCTURĂ OBLIGATORIE:

# ${title}

## Introducere
- 2-3 paragrafe care explică importanța subiectului
- Pentru cine este acest ghid
- Ce vei învăța din acest ghid

## De ce este important ${title.toLowerCase()}
- Beneficii practice
- Probleme pe care le previne
- Impact asupra sănătății și bunăstării pisicii

## Ghid pas cu pas
[Creează 5-7 pași detaliați, fiecare cu subsecțiuni]

### Pasul 1: [Titlu pas]
- Explicație detaliată
- Sfaturi practice
- Ce să eviți

[Continuă cu pașii 2-7]

## Cele mai bune practici
- Lista de 5-7 recomandări esențiale
- Sfaturi bazate pe experiență
- Trucuri utile

## Greșeli comune de evitat
- 4-5 greșeli frecvente
- De ce sunt problematice
- Cum să le eviți

## Pentru situații speciale
- Pisici cu nevoi speciale
- Cazuri particulare
- Când să ceri ajutor profesional

## Întrebări frecvente

### 1. [Întrebare practică relevantă]
[Răspuns clar și util]

### 2. [Întrebare despre costuri/resurse]
[Răspuns cu detalii pentru România]

### 3. [Întrebare despre dificultăți]
[Răspuns cu soluții practice]

### 4. [Întrebare despre timp/frecvență]
[Răspuns concret]

### 5. [Întrebare despre alternative]
[Răspuns cu opțiuni]

## Resurse utile
- Produse recomandate (fără mărci specifice)
- Unde să găsești ajutor
- Informații suplimentare

## Concluzie
- Rezumat al punctelor cheie
- Încurajare pentru acțiune
- Reminder pentru consultarea veterinarului când e necesar

REGULI IMPORTANTE:
- Limba română cu diacritice complete
- Ton prietenos și accesibil (nu prea tehnic)
- Sfaturi practice aplicabile imediat
- Prețuri/referințe pentru România când e relevant
- NU recomanda produse/mărci specifice
- Menționează când să consulți veterinarul
- Focus pe sfaturi preventive și proactive

Generează ghidul complet:`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in cat care writing comprehensive practical guides in Romanian.'
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

async function createGuide(guide: typeof GUIDES_LIST[0]): Promise<boolean> {
  const guidesPath = path.join(process.cwd(), 'content', 'guides');
  const mdxPath = path.join(guidesPath, `${guide.slug}.mdx`);

  // Skip if already exists
  if (fs.existsSync(mdxPath)) {
    console.log(`⏭️  Skipping ${guide.slug} - already exists`);
    return false;
  }

  console.log(`\n🔄 Generating ${guide.title}...`);

  try {
    const content = await generateGuideContent(guide.title, guide.category);

    const frontmatter = `---
title: "${guide.title}"
slug: "${guide.slug}"
description: "Ghid complet și practic despre ${guide.title.toLowerCase()} - sfaturi experți pentru proprietarii de pisici."
category: "${guide.category}"
image: "${guide.image}"
readingTime: 10
date: "${new Date().toISOString().split('T')[0]}"
---

`;

    const fullContent = frontmatter + content;

    fs.writeFileSync(mdxPath, fullContent);

    console.log(`✅ Created ${guide.slug}.mdx`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error generating ${guide.slug}: ${error.message}`);
    if (error.message.includes('quota exceeded')) {
      throw error;
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Starting guide generation');
  console.log(`📝 Guides to generate: ${GUIDES_LIST.length}\n`);

  // Ensure guides directory exists
  const guidesPath = path.join(process.cwd(), 'content', 'guides');
  if (!fs.existsSync(guidesPath)) {
    fs.mkdirSync(guidesPath, { recursive: true });
  }

  let createdCount = 0;
  let errorCount = 0;

  for (const guide of GUIDES_LIST) {
    try {
      const wasCreated = await createGuide(guide);
      if (wasCreated) {
        createdCount++;
        // Add delay between API calls
        if (createdCount < GUIDES_LIST.length) {
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
  console.log(`Total guides created: ${createdCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Existing guides skipped: ${GUIDES_LIST.length - createdCount - errorCount}`);
}

main().catch(console.error);
