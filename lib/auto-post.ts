/**
 * Auto-Post Core Module for Pisicopedia.ro
 *
 * Reusable logic for automatic article generation.
 * Can be called from CLI scripts or API routes.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { getOpenAIClient, CONTENT_CONFIG } from './ai-config';

// ============================================================================
// TYPES
// ============================================================================

export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: 'sanatate' | 'ghid';
  focusKeyword: string;
  status: 'pending' | 'done';
  createdAt: string | null;
  publishedAt: string | null;
}

export interface ArticleInfo {
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  related?: string[];
}

export interface GuideInfo {
  slug: string;
  title: string;
  category: string;
}

export type AutoPostResult =
  | { status: 'created'; slug: string; title: string; category: string }
  | { status: 'empty'; message: string }
  | { status: 'limit-reached'; message: string; limit: number; current: number }
  | { status: 'error'; error: string; topic?: string };

// ============================================================================
// QUEUE MANAGEMENT
// ============================================================================

function getQueuePath(): string {
  return path.join(process.cwd(), 'content', 'auto-queue.json');
}

export function loadQueue(): Topic[] {
  const queuePath = getQueuePath();
  if (!fs.existsSync(queuePath)) {
    throw new Error(`auto-queue.json not found at ${queuePath}`);
  }
  const queueData = fs.readFileSync(queuePath, 'utf-8');
  return JSON.parse(queueData);
}

export function saveQueue(queue: Topic[]): void {
  const queuePath = getQueuePath();
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf-8');
}

export function getNextPendingTopic(queue: Topic[]): Topic | null {
  return queue.find(t => t.status === 'pending') || null;
}

// ============================================================================
// CONTENT GENERATION
// ============================================================================

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

  const response = await openai.chat.completions.create({
    model: CONTENT_CONFIG.model,
    temperature: CONTENT_CONFIG.temperature,
    max_tokens: CONTENT_CONFIG.max_tokens,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
  });

  return response.choices[0].message.content || '';
}

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

IMPORTANT: 
- Frontmatter TREBUIE să folosească "---" (triple dash), NU code blocks cu yaml
- Format EXACT: --- la început, apoi YAML, apoi --- la sfârșit
- INTERZIS să folosești delimitatori de tip code block

OUTPUT: Direct în format MDX de mai sus, gata de salvat în fișier.`;
}

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

IMPORTANT: 
- Frontmatter TREBUIE să folosească "---" (triple dash), NU code blocks cu yaml
- Format EXACT: --- la început, apoi YAML, apoi --- la sfârșit
- INTERZIS să folosești delimitatori de tip code block

OUTPUT: Direct în format MDX de mai sus, gata de salvat în fișier.`;
}

// ============================================================================
// IMAGE GENERATION
// ============================================================================

async function generateImageWithLeonardo(topic: Topic): Promise<string | null> {
  const apiKey = process.env.LEONARDO_API_KEY;

  if (!apiKey) {
    console.log('[Auto-Post] Leonardo API key not set - skipping image generation');
    return null;
  }

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
        modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876',
        width: 1200,
        height: 800,
        num_images: 1,
        guidance_scale: 7,
        sd_version: 'SDXL_1_0',
      }),
    });

    const generateData: any = await generateResponse.json();

    if (!generateData.sdGenerationJob?.generationId) {
      console.log('[Auto-Post] Leonardo generation failed - using fallback');
      return null;
    }

    const generationId = generateData.sdGenerationJob.generationId;

    // Step 2: Poll for completion
    let attempts = 0;
    const maxAttempts = 30;
    let imageUrl: string | null = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000));

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
      console.log('[Auto-Post] Image generation timeout - using fallback');
      return null;
    }

    // Step 3: Download image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Step 4: Save image
    const imagePath = topic.category === 'sanatate'
      ? path.join(process.cwd(), 'public', 'images', 'articles', `${topic.slug}.jpg`)
      : path.join(process.cwd(), 'public', 'images', 'guides', `${topic.slug}.jpg`);

    fs.writeFileSync(imagePath, imageBuffer);

    return `/images/${topic.category === 'sanatate' ? 'articles' : 'guides'}/${topic.slug}.jpg`;
  } catch (error: any) {
    console.error('[Auto-Post] Leonardo error:', error.message);
    return null;
  }
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

function saveMDXFile(topic: Topic, content: string): void {
  const folder = topic.category === 'sanatate' ? 'articles' : 'guides';
  const mdxPath = path.join(process.cwd(), 'content', folder, `${topic.slug}.mdx`);

  fs.writeFileSync(mdxPath, content, 'utf-8');
}

function updateContentLists(topic: Topic): void {
  const listsPath = path.join(process.cwd(), 'lib', 'content-lists.ts');
  let listsContent = fs.readFileSync(listsPath, 'utf-8');

  if (topic.category === 'sanatate') {
    const newArticle: ArticleInfo = {
      slug: topic.slug,
      title: topic.title,
      category: 'sanatate',
      subcategory: 'simptome',
    };

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
    const newGuide: GuideInfo = {
      slug: topic.slug,
      title: topic.title,
      category: 'ghid-ingrijire',
    };

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
}

// ============================================================================
// DAILY LIMIT TRACKING
// ============================================================================

interface DailyLog {
  date: string;
  articles: Array<{
    slug: string;
    timestamp: string;
    title: string;
  }>;
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function getLogPath(): string {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  const today = getTodayDateString();
  return path.join(logsDir, `auto-post-${today}.json`);
}

function getTodayLog(): DailyLog {
  const logPath = getLogPath();
  const today = getTodayDateString();

  if (fs.existsSync(logPath)) {
    const logData = fs.readFileSync(logPath, 'utf-8');
    return JSON.parse(logData);
  }

  return { date: today, articles: [] };
}

function saveTodayLog(log: DailyLog): void {
  const logPath = getLogPath();
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf-8');
}

function checkDailyLimit(): { allowed: boolean; current: number; limit: number } {
  const maxPerDay = parseInt(process.env.MAX_AUTO_POSTS_PER_DAY || '5', 10);
  const todayLog = getTodayLog();
  const current = todayLog.articles.length;

  return {
    allowed: current < maxPerDay,
    current,
    limit: maxPerDay,
  };
}

function logArticleGeneration(slug: string, title: string): void {
  const log = getTodayLog();
  log.articles.push({
    slug,
    timestamp: new Date().toISOString(),
    title,
  });
  saveTodayLog(log);
}

// ============================================================================
// GIT AUTO-COMMIT AND PUSH
// ============================================================================

/**
 * Automatically commit and push changes to GitHub.
 * This enables the auto-post system to work fully automatically without manual intervention.
 */
async function gitCommitAndPush(slug: string, title: string): Promise<void> {
  try {
    console.log('[Git] Starting auto-commit and push...');

    // Configure git user (needed for Vercel environment)
    try {
      execSync('git config user.name "Pisicopedia Auto-Post"', { 
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      execSync('git config user.email "auto-post@pisicopedia.ro"', { 
        encoding: 'utf-8',
        stdio: 'pipe'
      });
    } catch (configError) {
      // Git config might already be set, ignore errors
      console.log('[Git] Git config already set or not needed');
    }

    // Check if there are changes to commit
    let hasChanges = false;
    try {
      const status = execSync('git status --porcelain', { 
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      hasChanges = status.trim().length > 0;
    } catch (error) {
      console.log('[Git] Could not check git status, assuming changes exist');
      hasChanges = true;
    }

    if (!hasChanges) {
      console.log('[Git] No changes to commit');
      return;
    }

    // Stage all changes
    execSync('git add -A', { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    console.log('[Git] Staged all changes');

    // Commit with descriptive message
    const commitMessage = `Auto-post: ${title} (${slug})`;
    execSync(`git commit -m "${commitMessage}"`, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    console.log(`[Git] Committed: ${commitMessage}`);

    // Push to GitHub
    // Note: In Vercel, this will use the GitHub App authentication automatically
    // No need for personal access tokens
    execSync('git push origin master', { 
      encoding: 'utf-8',
      stdio: 'pipe',
      timeout: 30000 // 30 second timeout
    });
    console.log('[Git] Successfully pushed to GitHub');
    console.log('[Git] Vercel will automatically deploy the changes');

  } catch (error: any) {
    console.error('[Git] Error during commit/push:', error.message);
    
    // Log more details for debugging
    if (error.stdout) {
      console.error('[Git] stdout:', error.stdout.toString());
    }
    if (error.stderr) {
      console.error('[Git] stderr:', error.stderr.toString());
    }

    // Don't throw - we don't want to fail the entire auto-post process
    // The article is still saved locally and will be pushed on next deployment
    console.warn('[Git] Auto-push failed, but article is saved locally');
    console.warn('[Git] Changes will be deployed on next manual push or successful auto-post');
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Generate one article from the queue.
 * This is the main entry point used by both CLI and API.
 */
export async function runAutoPostOnce(): Promise<AutoPostResult> {
  try {
    // Check API keys
    if (!process.env.OPENAI_API_KEY) {
      return {
        status: 'error',
        error: 'OPENAI_API_KEY is not set in environment variables',
      };
    }

    // Check daily limit
    const limitCheck = checkDailyLimit();
    if (!limitCheck.allowed) {
      return {
        status: 'limit-reached',
        message: `Daily limit of ${limitCheck.limit} articles reached`,
        limit: limitCheck.limit,
        current: limitCheck.current,
      };
    }

    // Load queue and find next topic
    const queue = loadQueue();
    const topic = getNextPendingTopic(queue);

    if (!topic) {
      return {
        status: 'empty',
        message: 'No pending topics in queue',
      };
    }

    console.log(`[Auto-Post] Processing: ${topic.title} (${topic.slug})`);

    // Generate content
    const content = await generateArticleContent(topic);

    // Generate image (optional)
    const imagePath = await generateImageWithLeonardo(topic);

    // Update image path in content if generated
    let finalContent = content;
    if (imagePath) {
      finalContent = content.replace(
        /image:\s*"[^"]*"/,
        `image: "${imagePath}"`
      );
    }

    // Save MDX file
    saveMDXFile(topic, finalContent);

    // Update content-lists.ts
    updateContentLists(topic);

    // Mark as done in queue
    topic.status = 'done';
    topic.createdAt = new Date().toISOString();
    topic.publishedAt = new Date().toISOString();
    saveQueue(queue);

    // Log generation
    logArticleGeneration(topic.slug, topic.title);

    console.log(`[Auto-Post] SUCCESS: ${topic.slug}`);

    // Auto-commit and push to GitHub (enables fully automatic publishing)
    await gitCommitAndPush(topic.slug, topic.title);

    return {
      status: 'created',
      slug: topic.slug,
      title: topic.title,
      category: topic.category,
    };
  } catch (error: any) {
    console.error('[Auto-Post] Error:', error.message);
    return {
      status: 'error',
      error: error.message,
    };
  }
}
