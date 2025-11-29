/**
 * OpenAI Configuration for Text Content Generation
 * Used ONLY for generating article content and breed descriptions
 * NOT for image generation - images are handled by Leonardo.ai
 */

import OpenAI from 'openai';

// Initialize OpenAI client
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    openaiClient = new OpenAI({
      apiKey: apiKey,
    });
  }
  return openaiClient;
}

// Content generation configurations
export const CONTENT_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
  temperature: 0.7,
  max_tokens: 4000,
};

// Article generation prompts for auto-blog
export const ARTICLE_PROMPTS = {
  system: `Ești un medic veterinar expert specializat în pisici, care scrie articole medicale informative pentru Pisicopedia.ro, enciclopedia online despre pisici din România.

  REGULI IMPORTANTE:
  1. Scrii EXCLUSIV în limba română, clar și accesibil
  2. Ești empatic, calm și informativ
  3. NU oferi diagnostic definitiv sau scheme de tratament concrete
  4. NU recomandezi medicamente specifice sau doze
  5. Întotdeauna menționezi consultarea veterinarului pentru probleme de sănătate
  6. Folosești un ton profesional dar prietenos
  7. Eviți termenii prea tehnici sau îi explici când sunt necesari

  STILUL PISICOPEDIA:
  - Răspuns direct în primele 2-3 paragrafe (pentru SEO și utilizatori grăbiți)
  - Structură clară cu headings (H2, H3)
  - Liste cu puncte pentru claritate
  - Secțiune FAQ cu 3-5 întrebări frecvente
  - Disclaimer medical clar
  - Ton medical dar cozy, cu empatie pentru proprietari și pisici

  FORMAT MDX:
  - Output direct în format MDX cu frontmatter YAML
  - Conținutul trebuie să fie gata de salvat
  - Include întotdeauna secțiunea FAQ
  - Include disclaimer medical la final`,

  generateArticle: (topic: any) => `Scrie un articol complet pentru Pisicopedia.ro despre: "${topic.title}"

DETALII SUBIECT:
- Categorie: ${topic.category}
- Subcategorie: ${topic.subcategory}
- Cuvinte cheie: ${topic.keywords.join(', ')}
- Context: ${topic.description}

STRUCTURĂ OBLIGATORIE:

1. Frontmatter YAML exact în formatul:
---
title: "${topic.title}"
slug: "${topic.slug}"
category: "${topic.category}"
subcategory: "${topic.subcategory}"
date: "${new Date().toISOString().split('T')[0]}"
readingTime: "5 min"
image: ""
source: "auto"
status: "published"
---

2. Conținut MDX structurat astfel:
- Introducere cu răspuns direct (2-3 paragrafe)
- Minim 3 secțiuni H2 relevante:
  * Pentru simptome: "## Cauze posibile", "## Ce poți observa acasă", "## Când să mergi la veterinar", "## Prevenție"
  * Pentru boli: "## Ce este [boala]", "## Simptome principale", "## Diagnostic și tratament", "## Prognostic"
  * Pentru comportament: "## De ce se întâmplă", "## Soluții practice", "## Când devine problemă", "## Sfaturi de prevenție"
  * Pentru nutriție: "## Beneficii", "## Riscuri potențiale", "## Recomandări practice", "## Tranziția corectă"
- Secțiune "## Întrebări frecvente" cu 3-5 întrebări și răspunsuri
- Concluzie cu acțiuni clare
- Paragraf final: "**Notă:** Acest articol are scop informativ și nu înlocuiește consultația veterinară. Pentru orice problemă de sănătate a pisicii tale, consultă întotdeauna medicul veterinar."

LUNGIME: 800-1200 cuvinte
OUTPUT: Direct în format MDX, gata de salvat în fișier`,
};

// Breed content generation prompts
export const BREED_PROMPTS = {
  system: `Ești un expert în rase de pisici care creează profiluri detaliate și precise pentru o enciclopedie online.

  Stilul tău:
  - Informații factuale și verificate
  - Descrieri clare ale caracteristicilor fizice
  - Aspecte comportamentale specifice rasei
  - Informații despre sănătate și îngrijire
  - Istoric și origine
  - Potrivire cu diferite tipuri de familii`,

  generateBreedContent: (breedName: string) => `
Creează un profil complet pentru rasa "${breedName}".

Structura profilului:
1. **Introducere** - Prezentare generală captivantă
2. **Istorie și origine** - De unde provine rasa
3. **Caracteristici fizice** - Descriere detaliată
   - Mărime și greutate
   - Blană și culori
   - Trăsături distinctive
4. **Temperament și personalitate**
   - Trăsături comportamentale
   - Nivel de energie
   - Sociabilitate
5. **Îngrijire și întreținere**
   - Îngrijirea blănii
   - Necesități de exercițiu
   - Hrănire specifică
6. **Sănătate**
   - Probleme comune de sănătate
   - Speranță de viață
   - Controale veterinare recomandate
7. **Potrivire cu familia**
   - Compatibilitate cu copiii
   - Compatibilitate cu alte animale
   - Mediu de viață ideal
8. **Sfaturi pentru adoptare**
9. **Concluzie**

Lungime: 1200-1500 cuvinte
Ton: informativ, prietenos, profesional`,
};

// MDX generation utilities
export function generateMDXFrontmatter(metadata: {
  title: string;
  description: string;
  category: string;
  date: string;
  author?: string;
  tags?: string[];
}) {
  return `---
title: "${metadata.title}"
description: "${metadata.description}"
category: "${metadata.category}"
date: "${metadata.date}"
author: "${metadata.author || 'Dr. Veterinar Pisicopedia'}"
tags: ${metadata.tags ? JSON.stringify(metadata.tags) : '[]'}
---`;
}

export function generateMDXContent(frontmatter: string, content: string) {
  return `${frontmatter}

${content}`;
}

// Utility function to clean and format AI-generated content
export function cleanAIContent(content: string): string {
  // Remove any potential code blocks that might interfere with MDX
  content = content.replace(/```mdx\n?/g, '');
  content = content.replace(/```\n?$/g, '');

  // Ensure proper spacing between sections
  content = content.replace(/\n{3,}/g, '\n\n');

  // Clean up any potential formatting issues
  content = content.trim();

  return content;
}

// Generate SEO-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Validate auto-generated content
export function validateAutoGeneratedContent(content: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for frontmatter
  if (!content.startsWith('---')) {
    errors.push('Missing frontmatter');
  }

  // Extract and validate frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const requiredFields = ['title', 'slug', 'category', 'subcategory', 'date', 'readingTime', 'source', 'status'];

    for (const field of requiredFields) {
      if (!frontmatter.includes(`${field}:`)) {
        errors.push(`Missing required field in frontmatter: ${field}`);
      }
    }

    // Check if source is 'auto'
    if (!frontmatter.includes('source: "auto"')) {
      warnings.push('Article not marked as auto-generated');
    }
  } else {
    errors.push('Invalid frontmatter format');
  }

  // Check content structure
  const contentBody = content.replace(/^---[\s\S]*?---\n/, '');

  // Check for FAQ section
  if (!contentBody.includes('## Întrebări frecvente')) {
    errors.push('Missing FAQ section (## Întrebări frecvente)');
  }

  // Check for medical disclaimer
  if (!contentBody.includes('consultația veterinară') && !contentBody.includes('medicul veterinar')) {
    errors.push('Missing medical disclaimer');
  }

  // Check minimum content length
  const wordCount = contentBody.split(/\s+/).length;
  if (wordCount < 600) {
    errors.push(`Content too short: ${wordCount} words (minimum 600)`);
  } else if (wordCount < 800) {
    warnings.push(`Content slightly short: ${wordCount} words (recommended 800+)`);
  }

  // Check for H2 sections
  const h2Matches = contentBody.match(/^## /gm);
  if (!h2Matches || h2Matches.length < 3) {
    errors.push('Insufficient H2 sections (minimum 3 required)');
  }

  // Check for conclusion/note
  if (!contentBody.includes('**Notă:**')) {
    warnings.push('Missing bold note section at the end');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Extract slug from MDX content
export function extractSlugFromContent(content: string): string | null {
  const match = content.match(/slug:\s*"([^"]+)"/);
  return match ? match[1] : null;
}

// Extract frontmatter as object
export function extractFrontmatter(content: string): Record<string, any> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  }

  return frontmatter;
}