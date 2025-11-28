#!/usr/bin/env tsx

/**
 * Generate Breed Content with OpenAI
 * Usage: npm run generate:breed "Breed Name"
 * Example: npm run generate:breed "Pisica Persană"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import dotenv from 'dotenv';
import {
  getOpenAIClient,
  CONTENT_CONFIG,
  BREED_PROMPTS,
  generateMDXFrontmatter,
  generateMDXContent,
  cleanAIContent,
  generateSlug,
} from '../lib/ai-config';
import { sampleBreeds } from '../lib/data';

// Load environment variables
dotenv.config({ path: '.env.local' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function generateBreedContent(breedName: string) {
  try {
    console.log('\n🤖 Generez conținut pentru rasă cu OpenAI...');
    console.log(`🐱 Rasă: ${breedName}\n`);

    const openai = getOpenAIClient();

    // Generate breed content
    console.log('⏳ Generez profilul detaliat al rasei...');
    const response = await openai.chat.completions.create({
      model: CONTENT_CONFIG.model,
      temperature: CONTENT_CONFIG.temperature,
      max_tokens: CONTENT_CONFIG.max_tokens,
      messages: [
        {
          role: 'system',
          content: BREED_PROMPTS.system,
        },
        {
          role: 'user',
          content: BREED_PROMPTS.generateBreedContent(breedName),
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Nu am putut genera conținutul');
    }

    // Clean the content
    const cleanedContent = cleanAIContent(content);

    // Generate metadata
    const slug = generateSlug(breedName);
    const date = new Date().toISOString().split('T')[0];

    // Generate description
    const plainText = cleanedContent.replace(/[#*`\[\]]/g, '').trim();
    const description = plainText.substring(0, 160) + '...';

    // Generate frontmatter
    const frontmatter = generateMDXFrontmatter({
      title: breedName,
      description,
      category: 'breed',
      date,
      tags: ['rase', 'pisici', breedName.toLowerCase()],
    });

    // Combine into MDX file
    const mdxContent = generateMDXContent(frontmatter, cleanedContent);

    // Create content directory if it doesn't exist
    const contentDir = path.join(process.cwd(), 'content', 'breeds');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Save the MDX file
    const filePath = path.join(contentDir, `${slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);

    console.log('✅ Profil de rasă generat cu succes!');
    console.log(`📄 Salvat la: ${filePath}`);

    return { filePath, content: cleanedContent };
  } catch (error) {
    console.error('❌ Eroare la generarea conținutului:', error);
    throw error;
  }
}

async function updateBreedDescription(breedSlug: string, newDescription: string) {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');

  // Read current data file
  let dataContent = fs.readFileSync(dataPath, 'utf-8');

  // Update the breed description
  const breedRegex = new RegExp(
    `(slug: '${breedSlug}'[\\s\\S]*?description: )'[^']*'`,
    'g'
  );

  dataContent = dataContent.replace(
    breedRegex,
    `$1'${newDescription.replace(/'/g, "\\'")}'`
  );

  fs.writeFileSync(dataPath, dataContent);
  console.log('✅ Descrierea rasei actualizată în lib/data.ts!');
}

async function main() {
  try {
    console.log('\n🐱 Generator de Conținut pentru Rase - Pisicopedia.ro');
    console.log('=' .repeat(50));

    // Show existing breeds
    console.log('\n📋 Rase existente în sistem:');
    sampleBreeds.forEach((breed, index) => {
      console.log(`  ${index + 1}. ${breed.title} (${breed.slug})`);
    });

    // Get breed selection
    const input = await question('\nSelectați rasa (nume sau număr) sau introduceți o rasă nouă: ');

    let breedName: string;
    let breedSlug: string | undefined;

    // Check if input is a number
    const breedNumber = parseInt(input);
    if (!isNaN(breedNumber) && breedNumber > 0 && breedNumber <= sampleBreeds.length) {
      const selectedBreed = sampleBreeds[breedNumber - 1];
      breedName = selectedBreed.title;
      breedSlug = selectedBreed.slug;
    } else {
      // Check if it matches an existing breed name
      const existingBreed = sampleBreeds.find(b =>
        b.title.toLowerCase() === input.toLowerCase() ||
        b.slug === input.toLowerCase()
      );

      if (existingBreed) {
        breedName = existingBreed.title;
        breedSlug = existingBreed.slug;
      } else {
        // New breed
        breedName = input;
        console.log('\n⚠️ Aceasta este o rasă nouă care nu există în sistem.');
        console.log('   Va trebui adăugată manual în lib/data.ts după generare.');
      }
    }

    // Generate the content
    const result = await generateBreedContent(breedName);

    // If it's an existing breed, offer to update the description
    if (breedSlug) {
      const updateDesc = await question('\nDoriți să actualizați descrierea în lib/data.ts? (da/nu): ');
      if (updateDesc.toLowerCase() === 'da' || updateDesc.toLowerCase() === 'yes') {
        // Extract first paragraph as description
        const firstParagraph = result.content.split('\n\n')[0]
          .replace(/[#*`\[\]]/g, '')
          .trim()
          .substring(0, 200);

        await updateBreedDescription(breedSlug, firstParagraph + '...');
      }
    }

    console.log('\n💡 Sfaturi următoare:');
    console.log('1. Verificați conținutul generat și editați după nevoie');
    console.log('2. Generați imaginea pentru rasă (dacă nu există):');
    console.log(`   npm run leonardo:breeds`);
    if (!breedSlug) {
      console.log('3. Adăugați rasa nouă în lib/data.ts');
    }

  } catch (error) {
    console.error('❌ Eroare:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}