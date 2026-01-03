import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Initializare OpenAI
const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey) {
  console.warn("⚠️  ATENTIE: OPENAI_API_KEY nu este setat in .env.");
}

const openai = new OpenAI({ apiKey: apiKey });

interface QueueItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  focusKeyword: string;
  status: 'pending' | 'published' | 'failed';
  createdAt?: string | null;
  publishedAt?: string | null;
}

const QUEUE_PATH = path.join(process.cwd(), 'content/auto-queue.json');
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/articles');

// Asigura existenta folderelor
if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

function getValidCategory(category: string): string {
  const mapping: Record<string, string> = {
    'ghid': 'ghiduri',
    'sanatate': 'ingrijire', // Mapam sanatate la ingrijire pentru siguranta
  };
  return mapping[category] || category;
}

async function generateBlogImage(topic: QueueItem): Promise<string> {
  console.log(`[AI Images] Generez imaginea pentru: "${topic.title}"...`);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A professional, photorealistic blog post cover image for an article titled "${topic.title}". The image should feature a cat and relate to the topic: ${topic.focusKeyword}. Warm, cozy, veterinary clinic or home style. High quality, 4k, natural lighting.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) throw new Error("Nu s-a generat URL-ul imaginii.");

    const imgRes = await fetch(imageUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    
    const filename = `${topic.slug}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);
    
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ Imagine salvată: public/images/articles/${filename}`);
    
    return `/images/articles/${filename}`;
  } catch (error) {
    console.error("⚠️ Eroare la generarea imaginii (folosim placeholder):", error);
    return "/images/placeholder-cat.jpg";
  }
}

async function generateArticleContent(topic: QueueItem, imageUrl: string): Promise<string> {
  console.log(`[AI Research] Scriu articolul: "${topic.title}"...`);

  const prompt = `
    Ești un medic veterinar expert și un specialist în comportamentul felin pentru site-ul Pisicopedia.ro.
    Sarcina ta este să scrii un articol de blog complet, foarte detaliat și optimizat SEO.
    
    Detalii Articol:
    - Titlu: "${topic.title}"
    - Cuvânt cheie principal: "${topic.focusKeyword}"
    - Ton: Empatic, autoritar (medical), dar accesibil.
    
    STRUCTURA OBLIGATORIE (Markdown):
    1. Introducere: 2-3 paragrafe captivante care răspund la întrebarea principală.
    2. Cuprins Detaliat: Folosește titluri H2 (##) pentru secțiunile principale.
    3. Conținut: Detaliază cauze, simptome, soluții. Folosește liste cu puncte.
    4. Când să mergi la veterinar: Secțiune obligatorie (folosește ##).
    5. FAQ: 3-5 întrebări frecvente (folosește ##).
    6. Concluzie: Rezumat scurt (folosește ##).

    REGULI CRITICE:
    - Folosește ## pentru titlurile secțiunilor (NU **Bold**).
    - Returnează DOAR conținutul articolului (corpul textului).
    - NU include frontmatter (liniile cu ---).
    - NU include titlul H1 la început (îl adaug eu).
    - Scrie un articol LUNG și DETALIAT (minim 1200 de cuvinte).
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 4000,
  });

  let content = completion.choices[0].message.content || "";
  
  // Curățare text
  content = content
    .replace(/^```markdown\s*/, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .trim();

  if (content.startsWith('---')) {
    content = content.replace(/^---[\s\S]*?---\s*/, '').trim();
  }

  if (content.length < 500) {
    throw new Error(`Eroare: Conținutul generat este prea scurt (${content.length} caractere).`);
  }

  // Afișăm mai mult din preview pentru a confirma că e ok
  console.log(`📝 Preview text generat (primele 300 caractere):\n${content.substring(0, 300)}...\n`);

  const today = new Date().toISOString().split('T')[0];
  const category = getValidCategory(topic.category);

  const fileContent = `---
title: "${topic.title}"
date: "${today}"
category: "${category}"
focusKeyword: "${topic.focusKeyword}"
image: "${imageUrl}"
status: "published"
excerpt: "Ghid complet despre ${topic.title}. Află totul despre ${topic.focusKeyword} de la experți."
tags: ["${category}", "blog", "pisici"]
author: "Dr. Veterinar Pisicopedia"
readingTime: 5
---

${content}`;

  return fileContent;
}

async function updateDataFile(topic: QueueItem, imageUrl: string) {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
  if (!fs.existsSync(dataPath)) {
    console.error("❌ Eroare: Nu am găsit lib/data.ts!");
    return;
  }

  let content = fs.readFileSync(dataPath, 'utf-8');
  const today = new Date().toISOString().split('T')[0];
  const category = getValidCategory(topic.category);

  if (content.includes(`slug: '${topic.slug}'`) || content.includes(`slug: "${topic.slug}"`)) {
    console.log('ℹ️  Articolul există deja în data.ts, nu îl mai adaug.');
    return;
  }

  const newEntry = `
  {
    slug: '${topic.slug}',
    title: '${topic.title.replace(/'/g, "\\'")}',
    description: 'Ghid complet despre ${topic.title}.',
    category: '${category}',
    image: '${imageUrl}',
    readingTime: 5,
    date: '${today}',
    author: 'Dr. Veterinar Pisicopedia',
    tags: ['${category}', 'blog'],
  },`;

  // Căutăm array-ul de articole
  const articlesRegex = /(export const articles(?:\s*:\s*[^=]+)?\s*=\s*\[)/;
  
  if (articlesRegex.test(content)) {
    content = content.replace(articlesRegex, `$1${newEntry}`);
    fs.writeFileSync(dataPath, content, 'utf-8');
    console.log('✅ lib/data.ts actualizat cu succes.');
  } else {
    console.warn("⚠️ Nu am putut găsi 'export const articles' în lib/data.ts. Verifică structura fișierului.");
  }
}

async function main() {
  try {
    if (!fs.existsSync(QUEUE_PATH)) {
      console.error("Eroare: Nu am gasit auto-queue.json");
      return;
    }

    const rawData = fs.readFileSync(QUEUE_PATH, 'utf-8');
    const queue: QueueItem[] = JSON.parse(rawData);

    const index = queue.findIndex((item) => item.status === 'pending');

    if (index === -1) {
      console.log("🎉 Toate articolele din coadă au fost generate!");
      return;
    }

    const topic = queue[index];
    console.log(`🚀 Procesez: [${topic.id}] ${topic.title}`);

    const imageUrl = await generateBlogImage(topic);
    const fileContent = await generateArticleContent(topic, imageUrl);

    const fileName = `${topic.slug}.mdx`;
    const filePath = path.join(ARTICLES_DIR, fileName);
    
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`✅ Articol salvat: content/articles/${fileName}`);

    await updateDataFile(topic, imageUrl);

    queue[index].status = 'published';
    queue[index].publishedAt = new Date().toISOString();
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8');
    console.log(`✅ Coada actualizată.`);

  } catch (error) {
    console.error("❌ Eroare:", error);
  }
}

main();
