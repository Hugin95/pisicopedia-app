import 'dotenv/config';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import matter from 'gray-matter';
import OpenAI from 'openai';

// Initializare OpenAI cu cheia din .env
// Fix: Asiguram ca apiKey este string (chiar daca e gol, pentru a multumi TypeScript)
const apiKey = process.env.OPENAI_API_KEY || "";

if (!apiKey) {
  console.warn("⚠️  ATENTIE: OPENAI_API_KEY nu este setat in .env. Scriptul va esua la apelurile AI.");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

interface QueueItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  focusKeyword: string;
  status: 'pending' | 'published' | 'failed';
  createdAt: string | null;
  publishedAt: string | null;
}

const QUEUE_PATH = path.join(process.cwd(), 'content/auto-queue.json');
const POSTS_DIR = path.join(process.cwd(), 'content/articles');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/articles');

// Asigura existenta folderului de postari
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function generateBlogImage(topic: QueueItem): Promise<string> {
  console.log(`[AI Images] Generez imaginea de copertă pentru: "${topic.title}"...`);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A professional, photorealistic blog post cover image for an article titled "${topic.title}". The image should feature a cat and relate to the topic: ${topic.focusKeyword}. Warm, cozy, veterinary clinic or home style. High quality, 4k, natural lighting.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    // Fix: Accesare sigura a datelor cu optional chaining
    const imageObject = response.data?.[0];
    const imageUrl = imageObject?.url;
    
    if (!imageUrl) throw new Error("Nu s-a generat URL-ul imaginii.");

    // Descarcam imaginea
    // @ts-ignore - fetch este disponibil global in Node 18+ dar TS s-ar putea sa nu stie
    const imgRes = await fetch(imageUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    
    const filename = `${topic.slug}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);
    
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ Imagine salvată: public/images/articles/${filename}`);
    
    return `/images/articles/${filename}`;
  } catch (error) {
    console.error("⚠️ Eroare la generarea imaginii (folosim placeholder):", error);
    return "/images/placeholder-cat.jpg"; // Fallback in caz de eroare
  }
}

async function generateArticleContent(topic: QueueItem, imageUrl: string): Promise<string> {
  console.log(`[AI Research] Încep generarea avansată pentru: "${topic.title}"...`);

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Lipseste OPENAI_API_KEY din .env!");
  }

  // Prompt optimizat pentru "Research Puternic" si SEO
  const prompt = `
    Ești un medic veterinar expert și un specialist în comportamentul felin pentru site-ul Pisicopedia.ro.
    Sarcina ta este să scrii un articol de blog complet, foarte detaliat și optimizat SEO.
    
    Detalii Articol:
    - Titlu: "${topic.title}"
    - Cuvânt cheie principal: "${topic.focusKeyword}"
    - Categorie: ${topic.category}
    - Ton: Empatic, autoritar (medical), dar accesibil proprietarilor de pisici.
    - Format: Markdown.
    
    Structura Obligatorie:
    1. **Introducere**: Captivantă, să răspundă rapid la intenția utilizatorului și să includă cuvântul cheie "${topic.focusKeyword}".
    2. **Cuprins Detaliat**: Folosește H2 și H3. Acoperă cauze, simptome, soluții.
    3. **Elemente Vizuale (Text)**: Include liste cu puncte (bullet points) sau tabele markdown unde este relevant (ex: alimente permise vs interzise, simptome ușoare vs grave).
    4. **Secțiune Critică**: "Când să mergi urgent la veterinar" (obligatoriu pentru subiecte de sănătate).
    5. **Concluzie**: Un rezumat scurt.
    6. **FAQ**: Secțiune de Întrebări Frecvente la final (folosește H2 pentru titlu "Întrebări Frecvente" și H3 pentru fiecare întrebare). Include 3-5 întrebări relevante.

    Reguli de scriere:
    - Nu include titlul H1 la început (îl adaug eu din cod).
    - Scrie conținut lung, informativ (minim 1000 cuvinte dacă subiectul permite).
    - Folosește bold pentru ideile principale.
    - Nu te repeta.
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o", // Folosim modelul cel mai capabil pentru calitate maxima
    temperature: 0.7,
  });

  const aiContent = completion.choices[0].message.content || "";
  
  // Curatam eventualele markere markdown de la inceput/sfarsit daca AI-ul le pune
  const cleanContent = aiContent.replace(/^```markdown\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');

  const today = new Date().toISOString();

  // Construim fisierul final cu Frontmatter
  return matter.stringify(cleanContent, {
    title: topic.title,
    date: today,
    category: topic.category,
    focusKeyword: topic.focusKeyword,
    image: imageUrl,
    status: 'published',
    excerpt: `Ghid complet despre ${topic.title}. Află totul despre ${topic.focusKeyword} de la experți.`
  });
}

async function updateDataFile(topic: QueueItem, imageUrl: string) {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
  if (!fs.existsSync(dataPath)) {
    console.warn("⚠️ Nu am găsit lib/data.ts, articolul nu va apărea în liste automat.");
    return;
  }

  let content = fs.readFileSync(dataPath, 'utf-8');
  const today = new Date().toISOString().split('T')[0];

  const newEntry = `
  {
    slug: '${topic.slug}',
    title: '${topic.title.replace(/'/g, "\\'")}',
    description: 'Ghid complet despre ${topic.title}. Află totul despre ${topic.focusKeyword} de la experți.',
    category: '${topic.category}',
    image: '${imageUrl}',
    readingTime: 5,
    date: '${today}',
    author: 'Dr. Veterinar Pisicopedia',
    tags: ['${topic.category}', 'blog'],
  },`;

  // Inserăm la începutul listei de articole (suportă ambele variante de nume de variabilă)
  if (content.includes('export const articles = [')) {
    content = content.replace(/export const articles = \[/, `export const articles = [${newEntry}`);
  } else if (content.includes('export const sampleArticles = [')) {
    content = content.replace(/export const sampleArticles = \[/, `export const sampleArticles = [${newEntry}`);
  }

  fs.writeFileSync(dataPath, content, 'utf-8');
  console.log('✅ lib/data.ts actualizat cu noul articol.');
}

async function main() {
  try {
    // 1. Citire Coada
    if (!fs.existsSync(QUEUE_PATH)) {
      console.error("Eroare: Nu am gasit fisierul auto-queue.json");
      return;
    }

    const rawData = fs.readFileSync(QUEUE_PATH, 'utf-8');
    const queue: QueueItem[] = JSON.parse(rawData);

    // 2. Gasire articol pending
    const index = queue.findIndex((item) => item.status === 'pending');

    if (index === -1) {
      console.log("🎉 Toate articolele din coadă au fost generate!");
      return;
    }

    const topic = queue[index];
    console.log(`🚀 Procesez subiectul: [${topic.id}] ${topic.title}`);

    // 3. Generare Imagine (DALL-E 3)
    const imageUrl = await generateBlogImage(topic);

    // 4. Generare Text (GPT-4o)
    const fileContent = await generateArticleContent(topic, imageUrl);

    // 5. Salvare Fisier
    const fileName = `${topic.slug}.mdx`;
    const filePath = path.join(POSTS_DIR, fileName);
    
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`✅ Articol salvat: content/articles/${fileName}`);

    // 6. Actualizare data.ts pentru a apărea pe site
    await updateDataFile(topic, imageUrl);

    // 5. Actualizare JSON
    queue[index].status = 'published';
    queue[index].publishedAt = new Date().toISOString();
    
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8');
    console.log(`✅ Coada actualizată.`);

  } catch (error) {
    console.error("❌ Eroare:", error);
  }
}

main();
