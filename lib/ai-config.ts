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

// Article generation prompts
export const ARTICLE_PROMPTS = {
  system: `Ești un medic veterinar expert specializat în pisici, care scrie articole medicale informative pentru publicul larg din România.

  Stilul tău de scriere:
  - Profesional dar accesibil
  - Bazat pe dovezi științifice
  - Include sfaturi practice
  - Folosește termeni medicali cu explicații clare
  - Evită conținutul comercial sau recenzii de produse
  - Menționează când este necesar să consulți un veterinar

  Format:
  - Folosește markdown pentru formatare
  - Include secțiuni clare cu titluri H2 și H3
  - Adaugă liste cu puncte pentru sfaturi
  - Include o secțiune "Când să mergi la veterinar"
  - Închide cu un rezumat al punctelor principale`,

  generateArticle: (topic: string, category: string) => `
Scrie un articol medical detaliat despre "${topic}" pentru categoria "${category}".

Articolul trebuie să includă:
1. O introducere captivantă (2-3 paragrafe)
2. Informații medicale detaliate și precise
3. Simptome comune (dacă e relevant)
4. Metode de prevenție
5. Opțiuni de tratament
6. Sfaturi practice pentru proprietari
7. Când este urgent să mergi la veterinar
8. Concluzii și recomandări finale

Lungime: aproximativ 1500-2000 de cuvinte
Ton: profesional, empatic, informativ
Limbă: Română corectă, fără anglicisme inutile`,
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