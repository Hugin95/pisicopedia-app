#!/usr/bin/env tsx

/**
 * Batch Generate ALL Missing Content for SEO Domination
 * Generates all missing breeds and articles with AI
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { getOpenAIClient, generateSlug } from '../lib/ai-config';
import { allBreeds, allArticles } from '../lib/content-lists';
import { generateArticleImage } from '../lib/leonardo-images';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Colors for console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Check if MDX exists
function mdxExists(type: 'breeds' | 'articles', slug: string): boolean {
  const dir = path.join(process.cwd(), 'content', type);
  const filePath = path.join(dir, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

// Generate breed MDX content
async function generateBreedContent(breed: any): Promise<string> {
  const client = getOpenAIClient();

  const prompt = `Creează un profil complet MDX pentru rasa de pisică "${breed.name}" (origine: ${breed.origin}).

STRUCTURA OBLIGATORIE:
---
title: "${breed.name}"
slug: "${breed.slug}"
description: "Profil complet ${breed.name} - origine, caracteristici, temperament și îngrijire"
image: "/images/breeds/${breed.slug}.jpg"
origin: "${breed.origin}"
---

# ${breed.name}

## Introducere
[2-3 paragrafe captivante despre rasă]

## Istorie și Origine
[Istoria detaliată a rasei din ${breed.origin}]

## Caracteristici Fizice
### Mărime și Greutate
[Detalii despre dimensiuni]

### Blană și Culori
[Descriere detaliată a blănii]

### Trăsături Distinctive
[Ce face această rasă unică]

## Temperament și Personalitate
[Descriere detaliată a caracterului]

### Nivel de Energie
[Cât de activă este rasa]

### Sociabilitate
[Relația cu oamenii și alte animale]

## Îngrijire și Întreținere
### Îngrijirea Blănii
[Frecvență periaj, unelte necesare]

### Necesități de Exercițiu
[Cât exercițiu necesită]

### Hrănire
[Recomandări nutriționale]

## Sănătate
### Probleme Comune de Sănătate
[Afecțiuni specifice rasei]

### Speranță de Viață
[Durata medie de viață]

### Controale Veterinare
[Frecvența vizitelor recomandate]

## Potrivire cu Familia
[Pentru ce tip de familie e potrivită]

## Sfaturi pentru Adoptare
[Ce să cauți când adopți această rasă]

## Concluzie
[Rezumat și recomandări finale]

## Întrebări Frecvente
[3-5 întrebări cu răspunsuri despre rasă]

LUNGIME: 1200-1500 cuvinte
STIL: Informativ, prietenos, cu empatie pentru pisici`;

  try {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 4000,
      messages: [
        { role: 'system', content: 'Ești un expert în rase de pisici care creează conținut SEO-optimizat în română.' },
        { role: 'user', content: prompt }
      ]
    });

    return response.choices[0]?.message?.content || '';
  } catch (error: any) {
    console.error(`Error generating breed ${breed.name}:`, error.message);
    throw error;
  }
}

// Generate article MDX content
async function generateArticleContent(article: any): Promise<string> {
  const client = getOpenAIClient();

  const categoryContext = {
    simptome: 'simptome și semne de boală',
    boli: 'boli și afecțiuni medicale',
    preventie: 'măsuri preventive și vaccinări',
    proceduri: 'proceduri medicale și intervenții',
    nutritie: 'nutriție și dietă',
    comportament: 'comportament și psihologie felină',
    ingrijire: 'îngrijire și igienă',
    ghiduri: 'ghiduri practice pentru proprietari',
  };

  const context = categoryContext[article.category as keyof typeof categoryContext] || 'informații generale';

  const prompt = `Scrie un articol MDX complet pentru Pisicopedia.ro despre: "${article.title}"

CONTEXT: Articol despre ${context}
CATEGORIA: ${article.category}
SUBCATEGORIA: ${article.subcategory}

STRUCTURA OBLIGATORIE:
---
title: "${article.title}"
slug: "${article.slug}"
description: "Ghid complet despre ${article.title.toLowerCase()} pentru proprietarii de pisici"
excerpt: "Află tot ce trebuie să știi despre ${article.title.toLowerCase()}"
category: "${article.category}"
subcategory: "${article.subcategory}"
date: "${new Date().toISOString().split('T')[0]}"
author: "Dr. Veterinar Pisicopedia"
readingTime: 7
image: "/images/articles/${article.slug}.jpg"
---

# ${article.title}

## Introducere
[Răspuns direct la problemă în 2-3 paragrafe]

## ${article.category === 'simptome' ? 'Cauze Posibile' : 'Ce Este'}
[Explicație detaliată]

## ${article.category === 'simptome' ? 'Ce Poți Observa Acasă' : 'Simptome și Semne'}
[Lista detaliată cu observații]

## ${article.category === 'simptome' ? 'Când să Mergi la Veterinar' : 'Diagnostic'}
[Ghid clar despre urgențe]

## ${article.category === 'preventie' ? 'Măsuri Preventive' : 'Tratament'}
[Opțiuni și recomandări]

## ${article.category === 'nutritie' ? 'Recomandări Practice' : 'Îngrijire Acasă'}
[Sfaturi pentru proprietari]

## Prevenție
[Cum să previi problema pe viitor]

## Întrebări Frecvente

### Întrebare 1?
[Răspuns detaliat]

### Întrebare 2?
[Răspuns detaliat]

### Întrebare 3?
[Răspuns detaliat]

### Întrebare 4?
[Răspuns detaliat]

### Întrebare 5?
[Răspuns detaliat]

## Concluzie
[Rezumat și acțiuni clare]

**Notă:** Acest articol are scop informativ și nu înlocuiește consultația veterinară. Pentru orice problemă de sănătate a pisicii tale, consultă întotdeauna medicul veterinar.

LUNGIME: 1000-1500 cuvinte
KEYWORDS: Include natural cuvinte cheie pentru SEO
STIL: Medical dar accesibil, empatic, informativ`;

  try {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 4000,
      messages: [
        { role: 'system', content: 'Ești un medic veterinar expert care scrie articole SEO-optimizate pentru Pisicopedia.ro.' },
        { role: 'user', content: prompt }
      ]
    });

    return response.choices[0]?.message?.content || '';
  } catch (error: any) {
    console.error(`Error generating article ${article.title}:`, error.message);
    throw error;
  }
}

// Save MDX file
function saveMDX(type: 'breeds' | 'articles', slug: string, content: string): void {
  const dir = path.join(process.cwd(), 'content', type);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${slug}.mdx`);
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Main batch generation
async function batchGenerateAllContent() {
  console.log(`\n${colors.bright}${colors.magenta}🚀 BATCH CONTENT GENERATION FOR SEO DOMINATION${colors.reset}`);
  console.log('='.repeat(80));

  if (!process.env.OPENAI_API_KEY) {
    console.error(`${colors.red}❌ OPENAI_API_KEY not set!${colors.reset}`);
    process.exit(1);
  }

  // PHASE 1: Generate missing breeds
  console.log(`\n${colors.cyan}📚 PHASE 1: GENERATING MISSING BREED CONTENT${colors.reset}`);
  console.log('-'.repeat(60));

  const missingBreeds = allBreeds.filter(breed => !mdxExists('breeds', breed.slug));
  console.log(`Found ${missingBreeds.length} missing breed MDX files`);

  let breedSuccess = 0;
  let breedErrors = 0;

  for (let i = 0; i < missingBreeds.length; i++) {
    const breed = missingBreeds[i];
    console.log(`\n[${i + 1}/${missingBreeds.length}] Generating: ${breed.name}`);

    try {
      const content = await generateBreedContent(breed);
      if (content) {
        saveMDX('breeds', breed.slug, content);
        console.log(`${colors.green}✅ Generated: ${breed.slug}.mdx${colors.reset}`);
        breedSuccess++;
      }

      // Small delay to avoid rate limits
      if (i < missingBreeds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`${colors.red}❌ Failed: ${breed.name}${colors.reset}`);
      breedErrors++;
    }
  }

  // PHASE 2: Generate missing articles
  console.log(`\n${colors.cyan}📝 PHASE 2: GENERATING MISSING ARTICLE CONTENT${colors.reset}`);
  console.log('-'.repeat(60));

  const missingArticles = allArticles.filter(article => !mdxExists('articles', article.slug));
  console.log(`Found ${missingArticles.length} missing article MDX files`);

  let articleSuccess = 0;
  let articleErrors = 0;

  for (let i = 0; i < missingArticles.length; i++) {
    const article = missingArticles[i];
    console.log(`\n[${i + 1}/${missingArticles.length}] Generating: ${article.title}`);

    try {
      // Generate text content
      const content = await generateArticleContent(article);
      if (content) {
        saveMDX('articles', article.slug, content);
        console.log(`${colors.green}✅ Generated text: ${article.slug}.mdx${colors.reset}`);

        // Generate image if Leonardo is available
        if (process.env.LEONARDO_API_KEY) {
          try {
            const imagePath = await generateArticleImage(
              article.slug,
              article.title,
              article.category,
              article.subcategory
            );
            console.log(`${colors.green}✅ Generated image: ${imagePath}${colors.reset}`);
          } catch (imgError) {
            console.log(`${colors.yellow}⚠️  Image generation failed, using placeholder${colors.reset}`);
          }
        }

        articleSuccess++;
      }

      // Small delay to avoid rate limits
      if (i < missingArticles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`${colors.red}❌ Failed: ${article.title}${colors.reset}`);
      articleErrors++;
    }
  }

  // SUMMARY
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.bright}${colors.green}🎉 BATCH GENERATION COMPLETE!${colors.reset}`);
  console.log('='.repeat(80));

  console.log(`\n${colors.bright}📊 RESULTS:${colors.reset}`);
  console.log(`BREEDS:`);
  console.log(`  ✅ Generated: ${breedSuccess}/${missingBreeds.length}`);
  console.log(`  ❌ Failed: ${breedErrors}`);

  console.log(`\nARTICLES:`);
  console.log(`  ✅ Generated: ${articleSuccess}/${missingArticles.length}`);
  console.log(`  ❌ Failed: ${articleErrors}`);

  const totalContent = allBreeds.length + allArticles.length;
  const totalGenerated = breedSuccess + articleSuccess;
  const existingContent = (allBreeds.length - missingBreeds.length) + (allArticles.length - missingArticles.length);
  const totalNow = existingContent + totalGenerated;
  const percentage = Math.round((totalNow / totalContent) * 100);

  console.log(`\n${colors.bright}📈 CONTENT COMPLETION:${colors.reset}`);
  console.log(`  Total content: ${totalNow}/${totalContent} (${percentage}%)`);

  const progressBar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
  console.log(`  Progress: [${progressBar}] ${percentage}%`);

  if (percentage === 100) {
    console.log(`\n${colors.bright}${colors.green}🏆 PISICOPEDIA.RO IS NOW 100% COMPLETE!${colors.reset}`);
    console.log(`${colors.cyan}Ready to dominate Romanian SEO!${colors.reset}`);
  }

  console.log(`\n${colors.cyan}💡 Next steps:${colors.reset}`);
  console.log('  1. Run: npm run audit:all (verify everything)');
  console.log('  2. Run: npm run build (check build)');
  console.log('  3. Update lib/data.ts with new content');
  console.log('  4. Deploy to production!');
}

// Run the batch generation
batchGenerateAllContent().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});