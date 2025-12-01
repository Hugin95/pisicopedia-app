/**
 * Extend Breed Health Sections Script for Pisicopedia.ro
 *
 * Extends the health section ("Sănătate și probleme medicale") in breed MDX files.
 * Adds genetic predispositions, screening recommendations, and detailed health info.
 *
 * Usage:
 *   npm run extend:breed-health
 *   npm run extend:breed-health -- --dry-run  (preview without saving)
 *   npm run extend:breed-health -- --breed=slug  (extend specific breed)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getOpenAIClient, CONTENT_CONFIG } from '../lib/ai-config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const BREEDS_DIR = path.join(process.cwd(), 'content', 'breeds');

interface BreedInfo {
  filename: string;
  slug: string;
  title: string;
  origin: string;
}

/**
 * Get all breed files
 */
function getBreedFiles(): BreedInfo[] {
  const files = fs.readdirSync(BREEDS_DIR)
    .filter(file => file.endsWith('.mdx') && !file.includes('.backup'));

  return files.map(filename => {
    const filePath = path.join(BREEDS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      filename,
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || '',
      origin: data.origin || 'Unknown',
    };
  });
}

/**
 * Generate extension prompt for breed health section
 */
function generateHealthExtensionPrompt(
  breedName: string,
  origin: string,
  currentContent: string
): string {
  return `Ești un medic veterinar expert specializat în genetica și sănătatea felinelor. Ai un profil de rasă pentru ${breedName} (origine: ${origin}) pe Pisicopedia.ro și trebuie să extinzi secțiunea de sănătate.

CONȚINUT EXISTENT AL DOCUMENTULUI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${currentContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SARCINA TA:
Găsește secțiunea "## Sănătate și probleme medicale" din documentul de mai sus și extinde-o SUBSTANȚIAL, adăugând:

1. **Predispoziții genetice specifice rasei ${breedName}**
   - Boli ereditare comune la această rasă
   - Mutații genetice cunoscute (dacă există)
   - Factori de risc genetici

2. **Probleme de sănătate comune**
   - Afecțiuni la care rasa este predispusă
   - Simptome timpurii de monitorizat
   - Incidența și prevalența

3. **Screening și teste recomandate**
   - Teste genetice disponibile
   - Screening oftalmologic, cardiac, renal
   - Frecvența controalelor

4. **Management preventiv**
   - Măsuri de prevenție specifice
   - Nutriție adaptată problemelor de sănătate
   - Stil de viață optim

5. **Speranța de viață și longevitate**
   - Durata medie de viață
   - Factori care influențează longevitatea

INSTRUCȚIUNI IMPORTANTE:
- PĂSTREAZĂ EXACT tot restul documentului (titluri, paragrafe, secțiuni)
- EXTINDE DOAR secțiunea "## Sănătate și probleme medicale"
- Adaugă conținut medical SPECIFIC pentru rasa ${breedName}
- Folosește limba română, ton profesional dar accesibil
- Include 500-800 cuvinte în secțiunea de sănătate extinsă
- Păstrează formatarea Markdown (##, ###, liste, bold)
- NU inventa boli inexistente - folosește doar informații reale despre rasă

RĂSPUNDE CU ÎNTREG DOCUMENTUL, cu secțiunea de sănătate extinsă, FĂRĂ explicații sau comentarii în afara documentului.`;
}

/**
 * Extend health section for a single breed
 */
async function extendBreedHealth(
  breedInfo: BreedInfo,
  dryRun: boolean = false
): Promise<boolean> {
  const filePath = path.join(BREEDS_DIR, breedInfo.filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  console.log(`\n🧬 Extending health section: ${breedInfo.title}`);
  console.log(`   Origin: ${breedInfo.origin}`);

  try {
    const client = getOpenAIClient();
    const prompt = generateHealthExtensionPrompt(
      breedInfo.title,
      breedInfo.origin,
      content
    );

    console.log('   ⏳ Calling OpenAI...');

    const response = await client.chat.completions.create({
      model: CONTENT_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `Ești un medic veterinar expert specializat în genetica felinelor, care extinde secțiuni de sănătate pentru profiluri de rase pe Pisicopedia.ro. PĂSTREZI tot conținutul existent și extinzi DOAR secțiunea de sănătate.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const extendedContent = response.choices[0]?.message?.content?.trim();

    if (!extendedContent) {
      throw new Error('No content received from OpenAI');
    }

    console.log(`   ✅ Health section extended`);

    if (dryRun) {
      console.log('   🔍 DRY RUN - Not saving');
      return true;
    }

    // Create backup
    const backupPath = `${filePath}.backup-${Date.now()}`;
    fs.copyFileSync(filePath, backupPath);

    // Save extended breed profile
    const updatedFile = matter.stringify(extendedContent, data);
    fs.writeFileSync(filePath, updatedFile, 'utf-8');

    console.log(`   💾 Saved! Backup: ${path.basename(backupPath)}`);

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
  const specificBreed = args.find(arg => arg.startsWith('--breed='))?.split('=')[1];

  console.log('🐱 Breed Health Extension Script\n');
  console.log('━'.repeat(60));

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set in .env.local');
    process.exit(1);
  }

  // Get all breeds
  let breeds = getBreedFiles();

  // Filter if specific breed requested
  if (specificBreed) {
    breeds = breeds.filter(b => b.slug === specificBreed);
    if (breeds.length === 0) {
      console.error(`❌ Breed not found: ${specificBreed}`);
      process.exit(1);
    }
  }

  console.log(`\n📊 Analysis:`);
  console.log(`   Total breeds: ${breeds.length}`);

  if (dryRun) {
    console.log('\n🔍 DRY RUN MODE - No changes will be saved\n');
  }

  console.log('\n━'.repeat(60));

  let successCount = 0;
  let failCount = 0;

  // Process each breed
  for (let i = 0; i < breeds.length; i++) {
    const breed = breeds[i];
    console.log(`\n[${i + 1}/${breeds.length}]`);

    const success = await extendBreedHealth(breed, dryRun);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between API calls
    if (i < breeds.length - 1) {
      console.log('\n   ⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 SUMMARY:');
  console.log(`   ✅ Successfully extended: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total processed: ${breeds.length}`);

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
