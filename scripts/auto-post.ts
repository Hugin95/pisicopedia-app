#!/usr/bin/env tsx

/**
 * Auto-Post System for Pisicopedia.ro
 *
 * Automatically generates new articles:
 * 1. Picks next topic from auto-queue.json
 * 2. Generates content with OpenAI
 * 3. Generates image with Leonardo.ai
 * 4. Creates MDX file
 * 5. Updates content-lists.ts
 * 6. Marks topic as done
 *
 * Usage:
 *   npm run auto:post          # Generate 1 article
 *   npm run auto:batch         # Generate 3 articles (default)
 *   npm run auto:batch -- N    # Generate N articles
 */

import * as fs from 'fs';
import * as path from 'path';
import { getOpenAIClient, CONTENT_CONFIG } from '../lib/ai-config';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface Topic {
  id: string;
  title: string;
  slug: string;
  category: 'sanatate' | 'ghid';
  focusKeyword: string;
  status: 'pending' | 'done';
  createdAt: string | null;
  publishedAt: string | null;
}

interface ArticleInfo {
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  related?: string[];
}

interface GuideInfo {
  slug: string;
  title: string;
  category: string;
}

// Parse command line arguments
function parseArgs(): { batchSize: number } {
  const args = process.argv.slice(2);
  let batchSize = 1;

  for (const arg of args) {
    if (arg.startsWith('--batch=')) {
      batchSize = parseInt(arg.split('=')[1], 10);
    } else if (!isNaN(parseInt(arg, 10))) {
      batchSize = parseInt(arg, 10);
    }
  }

  return { batchSize };
}

// Load auto-queue
function loadQueue(): Topic[] {
  const queuePath = path.join(process.cwd(), 'content', 'auto-queue.json');
  if (!fs.existsSync(queuePath)) {
    console.error(`${colors.red}Error: auto-queue.json not found at ${queuePath}${colors.reset}`);
    process.exit(1);
  }
  const queueData = fs.readFileSync(queuePath, 'utf-8');
  return JSON.parse(queueData);
}

// Save queue
function saveQueue(queue: Topic[]) {
  const queuePath = path.join(process.cwd(), 'content', 'auto-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf-8');
}

// Generate content with OpenAI
async function generateArticleContent(topic: Topic): Promise<string> {
  const openai = getOpenAIClient();

  const systemPrompt = `Ești un medic veterinar expert specializat în pisici, care scrie articole medicale informative pentru Pisicopedia.ro, enciclopedia online despre pisici din România.

REGULI IMPORTANTE:
1. Scrii EXCLUSIV în limba română, clar și accesibil
2. Ești empatic, calm și informativ
3. NU oferi diagnostic definitiv sau scheme de tratament concrete
4. NU recomandări medicamente specifice sau doze
5. Întotdeauna menționezi consultarea veterinarului pentru probleme de sănătate
6. Folosești un ton profesional dar prietenos
7. Eviți termenii prea tehnici sau îi explici când sunt necesari

STILUL PISICOPEDIA:
- Răspuns direct în primele 2-3 paragrafe (pentru SEO și utilizatori grăbiți)
- Structură clară cu headings (H2, H3)
- Liste cu puncte pentru claritate
- Secțiune FAQ cu 4-6 întrebări frecvente
- Disclaimer medical clar
- Ton medical dar cozy, cu empatie pentru proprietari și pisici`;

  const userPrompt = topic.category === 'sanatate'
    ? generateHealthArticlePrompt(topic)
    : generateGuidePrompt(topic);

  console.log(`${colors.cyan}📝 Generating content with OpenAI...${colors.reset}`);

  try {
    const response = await openai.chat.completions.create({
      model: CONTENT_CONFIG.model,
      temperature: CONTENT_CONFIG.temperature,
      max_tokens: CONTENT_CONFIG.max_tokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
    });

    const content = response.choices[0].message.content || '';
    console.log(`${colors.green}✅ Content generated (${content.length} characters)${colors.reset}`);
    return content;
  } catch (error: any) {
    console.error(`${colors.red}❌ OpenAI Error: ${error.message}${colors.reset}`);
    throw error;
  }
}

// Health article prompt
function generateHealthArticlePrompt(topic: Topic): string {
  return `Scrie un articol complet pentru Pisicopedia.ro despre: "${topic.title}"

Focusează-te pe keyword-ul: "${topic.focusKeyword}"

STRUCTURĂ OBLIGATORIE pentru articol de SĂNĂTATE:

1. Frontmatter YAML:
---
title: "${topic.title}"
slug: "${topic.slug}"
category: "sanatate"
subcategory: "simptome"
description: "Descoperă cauzele și soluțiile pentru ${topic.focusKeyword}. Ghid complet cu sfaturi veterinare pentru sănătatea pisicii tale."
image: "/images/articles/${topic.slug}.jpg"
date: "${new Date().toISOString().split('T')[0]}"
author: "Dr. Veterinar Pisicopedia"
readingTime: 8
tags:
  - "pisici"
  - "sanatate"
  - "simptome"
---

2. CONȚINUT MDX (1400-1800 cuvinte):

# ${topic.title}

[Introducere cu răspuns direct în 2-3 paragrafe - de ce se întâmplă, cât de grav este, ce trebuie să știe proprietarul]

## Cauze posibile

[3-5 cauze principale, explicate clar. Folosește liste cu puncte.]

## Ce poți observa acasă

[Simptome asociate, semne de alarmă. Ce să monitorizeze proprietarul.]

## Ce poți face în siguranță acasă

[Măsuri imediate, first-aid, ce E SIGUR să facă proprietarul FĂRĂ veterinar]

## Când trebuie mers de urgență la veterinar

[Situații care necesită intervenție imediată. RED FLAGS clare.]

## Prevenție

[Cum să previi problema. Sfaturi practice.]

## Întrebări frecvente

### [Întrebare relevantă 1]
[Răspuns scurt, 2-3 propoziții]

### [Întrebare relevantă 2]
[Răspuns scurt, 2-3 propoziții]

### [Întrebare relevantă 3]
[Răspuns scurt, 2-3 propoziții]

### [Întrebare relevantă 4]
[Răspuns scurt, 2-3 propoziții]

## Concluzie

[Recapitulare scurtă cu acțiuni concrete]

**Notă:** Acest articol are scop informativ și nu înlocuiește consultația veterinară. Pentru orice problemă de sănătate a pisicii tale, consultă întotdeauna medicul veterinar.

OUTPUT: Direct în format MDX de mai sus, gata de salvat în fișier.`;
}

// Guide prompt
function generateGuidePrompt(topic: Topic): string {
  return `Scrie un ghid complet pentru Pisicopedia.ro despre: "${topic.title}"

Focusează-te pe keyword-ul: "${topic.focusKeyword}"

STRUCTURĂ OBLIGATORIE pentru GHID PRACTIC:

1. Frontmatter YAML:
---
title: "${topic.title}"
slug: "${topic.slug}"
category: "ghid"
subcategory: "ingrijire"
description: "Ghid complet pentru ${topic.focusKeyword}. Pași concreți și sfaturi practice pentru pisica ta."
image: "/images/guides/${topic.slug}.jpg"
date: "${new Date().toISOString().split('T')[0]}"
author: "Dr. Veterinar Pisicopedia"
readingTime: 10
tags:
  - "pisici"
  - "ghid"
  - "ingrijire"
---

2. CONȚINUT MDX (1400-1800 cuvinte):

# ${topic.title}

[Introducere - de ce este important acest ghid, ce va învăța proprietarul]

## Ce trebuie să știi înainte de a începe

[Prerequisites, informații de bază, lucruri importante de știut]

## Pasul 1: [Titlu clar]

[Descriere detaliată cu liste și sfaturi practice]

## Pasul 2: [Titlu clar]

[Descriere detaliată cu liste și sfaturi practice]

## Pasul 3: [Titlu clar]

[Descriere detaliată cu liste și sfaturi practice]

[Continuă cu pașii necesari - minim 3, maxim 6]

## Greșeli frecvente de evitat

[Lista cu 4-6 greșeli comune și cum să le eviți]

## Recomandări practice și check-list

[Check-list final cu puncte esențiale de reținut]

## Întrebări frecvente

### [Întrebare practică 1]
[Răspuns clar, 2-3 propoziții]

### [Întrebare practică 2]
[Răspuns clar, 2-3 propoziții]

### [Întrebare practică 3]
[Răspuns clar, 2-3 propoziții]

### [Întrebare practică 4]
[Răspuns clar, 2-3 propoziții]

## Concluzie

[Recapitulare cu sfaturi finale]

**Notă:** Pentru sfaturi personalizate despre pisica ta, consultă medicul veterinar.

OUTPUT: Direct în format MDX de mai sus, gata de salvat în fișier.`;
}

// Generate image with Leonardo.ai
async function generateImageWithLeonardo(topic: Topic): Promise<string | null> {
  const apiKey = process.env.LEONARDO_API_KEY;

  if (!apiKey) {
    console.log(`${colors.yellow}⚠️  LEONARDO_API_KEY not set - skipping image generation${colors.reset}`);
    return null;
  }

  console.log(`${colors.cyan}🎨 Generating image with Leonardo.ai...${colors.reset}`);

  const prompt = `Professional veterinary medical illustration of a domestic cat, related to: ${topic.title}. Soft studio lighting, neutral background, realistic, high quality, 4k, for a Romanian website about cat health. Medical illustration style.`;

  try {
    // Step 1: Create generation
    const generateResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876', // Leonardo Diffusion XL
        width: 1200,
        height: 800,
        num_images: 1,
        guidance_scale: 7,
        sd_version: 'SDXL_1_0',
      }),
    });

    const generateData: any = await generateResponse.json();

    if (!generateData.sdGenerationJob?.generationId) {
      console.log(`${colors.yellow}⚠️  Leonardo generation failed - using fallback${colors.reset}`);
      return null;
    }

    const generationId = generateData.sdGenerationJob.generationId;
    console.log(`${colors.cyan}⏳ Waiting for image generation (ID: ${generationId})...${colors.reset}`);

    // Step 2: Poll for completion
    let attempts = 0;
    const maxAttempts = 30;
    let imageUrl: string | null = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds

      const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const statusData: any = await statusResponse.json();

      if (statusData.generations_by_pk?.status === 'COMPLETE') {
        imageUrl = statusData.generations_by_pk.generated_images[0]?.url;
        break;
      }

      attempts++;
    }

    if (!imageUrl) {
      console.log(`${colors.yellow}⚠️  Image generation timeout - using fallback${colors.reset}`);
      return null;
    }

    // Step 3: Download image
    console.log(`${colors.cyan}📥 Downloading image...${colors.reset}`);
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Step 4: Save image
    const imagePath = topic.category === 'sanatate'
      ? path.join(process.cwd(), 'public', 'images', 'articles', `${topic.slug}.jpg`)
      : path.join(process.cwd(), 'public', 'images', 'guides', `${topic.slug}.jpg`);

    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`${colors.green}✅ Image saved: ${imagePath}${colors.reset}`);

    return `/images/${topic.category === 'sanatate' ? 'articles' : 'guides'}/${topic.slug}.jpg`;
  } catch (error: any) {
    console.error(`${colors.red}❌ Leonardo Error: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Using fallback image${colors.reset}`);
    return null;
  }
}

// Save MDX file
function saveMDXFile(topic: Topic, content: string) {
  const folder = topic.category === 'sanatate' ? 'articles' : 'guides';
  const mdxPath = path.join(process.cwd(), 'content', folder, `${topic.slug}.mdx`);

  fs.writeFileSync(mdxPath, content, 'utf-8');
  console.log(`${colors.green}✅ MDX saved: ${mdxPath}${colors.reset}`);
}

// Update content-lists.ts
function updateContentLists(topic: Topic) {
  const listsPath = path.join(process.cwd(), 'lib', 'content-lists.ts');
  let listsContent = fs.readFileSync(listsPath, 'utf-8');

  if (topic.category === 'sanatate') {
    // Add to articles list
    const newArticle: ArticleInfo = {
      slug: topic.slug,
      title: topic.title,
      category: 'sanatate',
      subcategory: 'simptome',
    };

    // Find the allArticles array and add at the beginning
    const articleMatch = listsContent.match(/export const allArticles: ArticleInfo\[\] = \[([\s\S]*?)\];/);
    if (articleMatch) {
      const currentArticles = articleMatch[1];
      const newArticleStr = `  { slug: '${newArticle.slug}', title: '${newArticle.title}', category: '${newArticle.category}', subcategory: '${newArticle.subcategory}' },`;
      const updatedArticles = `\n${newArticleStr}${currentArticles}`;
      listsContent = listsContent.replace(
        /export const allArticles: ArticleInfo\[\] = \[([\s\S]*?)\];/,
        `export const allArticles: ArticleInfo[] = [${updatedArticles}];`
      );
    }
  } else {
    // Add to guides list
    const newGuide: GuideInfo = {
      slug: topic.slug,
      title: topic.title,
      category: 'ghid-ingrijire',
    };

    // Find the allGuides array and add at the beginning
    const guideMatch = listsContent.match(/export const allGuides: GuideInfo\[\] = \[([\s\S]*?)\];/);
    if (guideMatch) {
      const currentGuides = guideMatch[1];
      const newGuideStr = `  { slug: '${newGuide.slug}', title: '${newGuide.title}', category: '${newGuide.category}' },`;
      const updatedGuides = `\n${newGuideStr}${currentGuides}`;
      listsContent = listsContent.replace(
        /export const allGuides: GuideInfo\[\] = \[([\s\S]*?)\];/,
        `export const allGuides: GuideInfo[] = [${updatedGuides}];`
      );
    }
  }

  fs.writeFileSync(listsPath, listsContent, 'utf-8');
  console.log(`${colors.green}✅ Updated content-lists.ts${colors.reset}`);
}

// Process one topic
async function processOneTopic(queue: Topic[]): Promise<boolean> {
  // Find first pending topic
  const topic = queue.find(t => t.status === 'pending');

  if (!topic) {
    console.log(`${colors.yellow}ℹ️  No pending topics in queue${colors.reset}`);
    return false;
  }

  console.log(`\n${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}📝 Processing: ${topic.title}${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`${colors.blue}ID:${colors.reset} ${topic.id}`);
  console.log(`${colors.blue}Slug:${colors.reset} ${topic.slug}`);
  console.log(`${colors.blue}Category:${colors.reset} ${topic.category}`);
  console.log(`${colors.blue}Keyword:${colors.reset} ${topic.focusKeyword}\n`);

  try {
    // 1. Generate content with OpenAI
    const content = await generateArticleContent(topic);

    // 2. Generate image with Leonardo.ai (optional)
    const imagePath = await generateImageWithLeonardo(topic);

    // 3. Update image path in content if generated
    let finalContent = content;
    if (imagePath) {
      finalContent = content.replace(
        /image:\s*"[^"]*"/,
        `image: "${imagePath}"`
      );
    }

    // 4. Save MDX file
    saveMDXFile(topic, finalContent);

    // 5. Update content-lists.ts
    updateContentLists(topic);

    // 6. Mark as done in queue
    topic.status = 'done';
    topic.createdAt = new Date().toISOString();
    topic.publishedAt = new Date().toISOString();
    saveQueue(queue);

    console.log(`\n${colors.bright}${colors.green}✅ SUCCESS!${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}Topic:${colors.reset} ${topic.title}`);
    console.log(`${colors.green}Slug:${colors.reset} ${topic.slug}`);
    console.log(`${colors.green}File:${colors.reset} content/${topic.category === 'sanatate' ? 'articles' : 'guides'}/${topic.slug}.mdx`);
    console.log(`${colors.green}Image:${colors.reset} ${imagePath || 'Using fallback'}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    return true;
  } catch (error: any) {
    console.error(`\n${colors.red}❌ FAILED: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Main function
async function main() {
  console.log(`${colors.bright}${colors.cyan}🚀 AUTO-POST SYSTEM${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  const { batchSize } = parseArgs();
  console.log(`${colors.blue}Batch size:${colors.reset} ${batchSize} article(s)\n`);

  const queue = loadQueue();
  const pendingCount = queue.filter(t => t.status === 'pending').length;
  const doneCount = queue.filter(t => t.status === 'done').length;

  console.log(`${colors.blue}Queue status:${colors.reset}`);
  console.log(`  - Pending: ${pendingCount}`);
  console.log(`  - Done: ${doneCount}`);
  console.log(`  - Total: ${queue.length}\n`);

  if (pendingCount === 0) {
    console.log(`${colors.yellow}ℹ️  No pending topics. Add more to content/auto-queue.json${colors.reset}`);
    process.exit(0);
  }

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < batchSize; i++) {
    const result = await processOneTopic(queue);
    if (result) {
      successCount++;
    } else {
      failureCount++;
      if (pendingCount - successCount === 0) {
        break; // No more pending topics
      }
    }

    // Wait a bit between generations to avoid rate limits
    if (i < batchSize - 1) {
      console.log(`${colors.cyan}⏳ Waiting 5 seconds before next generation...${colors.reset}\n`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log(`\n${colors.bright}${colors.cyan}📊 FINAL SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.green}✅ Successful:${colors.reset} ${successCount}`);
  console.log(`${colors.red}❌ Failed:${colors.reset} ${failureCount}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  process.exit(failureCount > 0 ? 1 : 0);
}

// Run
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
