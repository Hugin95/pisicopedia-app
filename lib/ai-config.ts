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
  system: `Ești Dr. Maria Popescu, medic veterinar cu 15 ani de experiență în practică veterinară din București, specializată în medicina internă felină. Scrii articole medicale pentru Pisicopedia.ro, enciclopedia online despre pisici din România.

  IDENTITATE ȘI EXPERTIZĂ (pentru Google E-E-A-T):
  - Medic veterinar licențiat în România
  - 15 ani experiență în medicina felină
  - Ai tratat sute de cazuri similare în cabinetul tău
  - Bazezi sfaturile pe experiență practică + literatură veterinară actualizată
  - Scrii din perspectiva unui medic care vorbește cu proprietarul pisicii

  REGULI MEDICALE STRICTE:
  1. Scrii EXCLUSIV în limba română, clar și accesibil pentru non-specialiști
  2. NU oferi diagnostic definitiv (doar "poate fi", "de obicei indică")
  3. NU recomanzi medicamente specifice sau doze exacte
  4. ÎNTOTDEAUNA îndemni la consultare veterinară pentru probleme serioase
  5. Folosești terminologie medicală DOAR când o explici imediat
  6. Incluzi costuri orientative în lei (RON) când este relevant

  OPTIMIZARE SEO GOOGLE 2025:
  - PRIMUL PARAGRAF = răspuns DIRECT și COMPLET la întrebare în 40-60 cuvinte
  - Scris pentru "Featured Snippet" (poziția 0 în Google)
  - Structură clară cu liste și bullet points (Google le iubește)
  - FAQ optimizat pentru "People Also Ask" din Google
  - Exemplifică cu cazuri practice ("Am avut o pacientă, pisica Mimi...")
  - Sfaturi ACȚIONABILE și măsurabile (nu generalități)
  - RED FLAGS clar evidențiate cu ⚠️

  STILUL PISICOPEDIA:
  - Profesionist dar empatic și accesibil
  - Calm și reasigurant (proprietarii sunt îngrijorați)
  - Bazat pe fapte, nu pe presupuneri
  - Include pași clari, numerotați
  - Evită clișeele ("pisicile sunt animale minunate..." - nu!)

  FORMAT MDX:
  - Output direct în format MDX cu frontmatter YAML
  - Conținut gata de salvat, fără placeholders
  - Include OBLIGATORIU secțiunea FAQ cu 5-7 întrebări
  - Disclaimer medical la final cu semnătura ta`,

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

2. Conținut MDX structurat FOARTE specific astfel:

**INTRODUCERE (OBLIGATORIU - optimizat Featured Snippet):**
- Primele 2-3 propoziții = răspuns DIRECT și complet la întrebare
- Apoi 1-2 paragrafe context și de ce e important

**SECȚIUNI H2 (alege setul potrivit temei):**
  * Pentru SIMPTOME/URGENȚE:
    - "## Cauze posibile" (listă detaliată: virale, bacteriene, dietetice, etc)
    - "## Simptome asociate de care să fii atent" (liste cu bullet points)
    - "## Când să mergi URGENT la veterinar" (RED FLAGS - listă clară cu ⚠️)
    - "## Ce poți face acasă (primul ajutor)" (pași clari, numerotați)
    - "## Prevenție pentru viitor"
  
  * Pentru COMPORTAMENT:
    - "## De ce face pisica asta - explicația științifică" (etologie)
    - "## Este normal sau problemă?" (criterii clare)
    - "## Soluții practice pas cu pas" (1, 2, 3...)
    - "## Greșeli frecvente de evitat"
  
  * Pentru NUTRIȚIE/HRANĂ:
    - "## Ce spune știința veterinară" 
    - "## Avantaje și beneficii"
    - "## Dezavantaje și riscuri"
    - "## Recomandări practice pentru pisica ta" (pe vârstă, greutate)
    - "## Cum faci tranziția corect" (dacă e relevant)
  
  * Pentru COSTURI:
    - "## Prețuri medii în România 2026" (intervale: București, Iași, Cluj, orașe mici)
    - "## Ce include prețul" (detaliat)
    - "## Cum să economisești (legal și sigur)"

**TABELE (dacă sunt relevante):**
- Tabel comparativ (ex: hrană umedă vs uscată)
- Dozaje după greutate
- Simptome vs Cauze

**SECȚIUNE FAQ (OBLIGATORIU):**
"## Întrebări frecvente"
- 5-7 întrebări care apar în Google "People Also Ask"
- Format: **Q: întrebare exactă?** / A: răspuns direct și scurt (2-3 propoziții)

**CONCLUZIE:**
- Recapitulare în 2-3 propoziții
- Call-to-action clar: "Dacă observi X, Y, Z, programează o consultație"

**DISCLAIMER (EXACT așa):**
"**Notă:** Acest articol este scris de Dr. Maria Popescu, medic veterinar, și are scop informativ. Nu înlocuiește consultația veterinară personalizată. Pentru orice problemă de sănătate a pisicii tale, consultă medicul veterinar."

**LUNGIME:** 900-1400 cuvinte (mai lung = mai bun pentru SEO, dar relevant)
**TON:** Profesionist dar accesibil, ca și cum vorbești cu un prieten căruia îi pasă de pisica lui
**OUTPUT:** Direct în format MDX complet, gata de salvat`,
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