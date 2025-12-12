/**
 * Complete Maine Coon truncated article
 *
 * Usage:
 *   npm run complete:maine-coon
 */

import fs from 'fs';
import path from 'path';
import { getOpenAIClient, CONTENT_CONFIG } from '../lib/ai-config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const BREEDS_DIR = path.join(process.cwd(), 'content', 'breeds');
const MAINE_COON_FILE = path.join(BREEDS_DIR, 'maine-coon.mdx');

async function completeMaineCoon() {
  console.log('🐱 Completare articol Maine Coon\n');
  console.log('━'.repeat(60));

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set in .env.local');
    process.exit(1);
  }

  // Read current incomplete file
  const currentContent = fs.readFileSync(MAINE_COON_FILE, 'utf-8');

  console.log('\n📖 Articol actual: 1,885 cuvinte');
  console.log('   Se termină la: "Pentru proprietarii care lucrează ore lungi, opțiunile includ: a doua pisic"');
  console.log('   (fraza incompletă)\n');

  // Create backup
  const backupPath = `${MAINE_COON_FILE}.backup-${Date.now()}`;
  fs.copyFileSync(MAINE_COON_FILE, backupPath);
  console.log(`💾 Backup creat: ${path.basename(backupPath)}\n`);

  const client = getOpenAIClient();

  const prompt = `Ai un articol pentru Pisicopedia.ro despre rasa Maine Coon care S-A TRUNCHIAT la jumătatea unei fraze.

CONȚINUTUL EXISTENT (INCOMPLET):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${currentContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEMA: Articolul se termină brusc cu fraza incompletă "Pentru proprietarii care lucrează ore lungi, opțiunile includ: a doua pisic"

SARCINA TA:
1. PĂSTREAZĂ EXACT tot conținutul de mai sus (inclusiv frontmatter-ul YAML)
2. COMPLETEAZĂ fraza "a doua pisic" la final (probabil "a doua pisică pentru companie, camere de joacă interactive, sau servicii de pet-sitting")
3. ADAUGĂ secțiunile lipsă care de obicei urmează în profilul unei rase:

### Compatibilitate cu alte animale
- Compatibilitate cu alte pisici (excelentă - sunt sociabile)
- Compatibilitate cu câini (foarte bună - natura lor blândă se potrivește)
- Compatibilitate cu alte animale (precauții cu rozătoare/păsări mici)

## Îngrijire și mentenanță
### Îngrijirea blănii
- Periaj regulat (2-3 ori/săptămână, zilnic în perioada de năpârlire)
- Scăldatul ocazional
- Îngrijirea ghearelor, urechilor, dinților

### Necesități de exercițiu
- Jocuri interactive zilnice
- Copaci de cățărat
- Jucării puzzle
- Nevoia de stimulare mentală

## Nutriție și dietă
- Nevoi calorice pentru o rasă mare (mai mult decât pisicile obișnuite)
- Hrană de calitate înaltă, bogată în proteine
- Probleme comune legate de greutate (tendință la obezitate dacă nu fac suficient exercițiu)
- Hidratare (importanța apei proaspete)

## Sănătate și probleme medicale
- Speranță de viață (12-15 ani, uneori mai mult)
- Cardiomiopatie hipertrofică (HCM) - cea mai comună problemă cardiacă
- Displazia șoldului - din cauza dimensiunilor mari
- Atrofia musculară spinală (SMA) - genetică
- Boala polichistică renală (PKD) - mai rar
- Teste genetice recomandate
- Controale veterinare regulate

## Achiziție și cost
- Prețuri pentru un Maine Coon de rasă (4000-8000 RON, uneori mai mult)
- Cum să alegi un crescător responsabil
- Ce să verifici înainte de achiziție (teste genetice, pedigree, socializare)
- Costuri recurente (hrană specială, îngrijire, veterinar)

## Întrebări frecvente (FAQ)
Creează 8-10 întrebări frecvente cu răspunsuri clare (ex: "Cât crește o pisică Maine Coon?", "Sunt hipoalergenice?", "Se potrivesc pentru apartamente?", "Pierd mult păr?", "Cât costă întreținerea lunară?")

## Concluzie
Rezumat final despre de ce Maine Coon este o alegere excelentă pentru anumite familii.

INSTRUCȚIUNI IMPORTANTE:
- Limba română, ton profesional dar accesibil
- PĂSTREAZĂ EXACT structura MDX și frontmatter-ul
- COMPLETEAZĂ fraza întreruptă natural
- Adaugă minimum 1000-1200 cuvinte pentru secțiunile noi
- Menține tonul și stilul existent al articolului
- Informații factuale și verificate despre rasă

RĂSPUNDE CU ÎNTREG DOCUMENTUL COMPLET (vechi + nou), FĂRĂ explicații în afara documentului.`;

  console.log('⏳ Apelez OpenAI API pentru completare...\n');

  try {
    const response = await client.chat.completions.create({
      model: CONTENT_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `Ești un expert în rase de pisici care completează un articol trunchiat despre Maine Coon pentru Pisicopedia.ro. PĂSTREZI exact conținutul existent și completezi secțiunile lipsă.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const completedContent = response.choices[0]?.message?.content?.trim();

    if (!completedContent) {
      throw new Error('No content received from OpenAI');
    }

    // Count words
    const wordCount = completedContent.split(/\s+/).length;
    console.log(`✅ Articol completat: ${wordCount} cuvinte (înainte: 1,885)\n`);

    // Save completed article
    fs.writeFileSync(MAINE_COON_FILE, completedContent, 'utf-8');
    console.log(`💾 Salvat: ${MAINE_COON_FILE}\n`);

    console.log('━'.repeat(60));
    console.log('✅ SUCCESS!\n');
    console.log('Maine Coon article completat.');
    console.log(`Backup disponibil: ${path.basename(backupPath)}\n`);

  } catch (error: any) {
    console.error(`❌ ERROR: ${error.message}`);
    console.log(`\n💡 Backup disponibil: ${backupPath}`);
    process.exit(1);
  }
}

// Run
completeMaineCoon().catch(error => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
