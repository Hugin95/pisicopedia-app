#!/usr/bin/env tsx

/**
 * Generate MDX Article with OpenAI
 * Usage: npm run generate:article "Topic Name" "category"
 * Example: npm run generate:article "Vaccinarea pisicilor" "prevention"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import dotenv from 'dotenv';
import {
  getOpenAIClient,
  CONTENT_CONFIG,
  ARTICLE_PROMPTS,
  generateMDXFrontmatter,
  generateMDXContent,
  cleanAIContent,
  generateSlug,
} from '../lib/ai-config';

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

// Article categories
const CATEGORIES = {
  prevention: 'Prevenție',
  diseases: 'Boli comune',
  symptoms: 'Simptome',
  procedures: 'Proceduri medicale',
  nutrition: 'Nutriție',
  behavior: 'Comportament',
};

async function generateArticle(topic: string, category: string) {
  try {
    console.log('\n🤖 Generez articol cu OpenAI...');
    console.log(`📝 Subiect: ${topic}`);
    console.log(`📁 Categorie: ${CATEGORIES[category as keyof typeof CATEGORIES]}\n`);

    const openai = getOpenAIClient();

    // Generate article content
    console.log('⏳ Generez conținutul articolului...');
    const response = await openai.chat.completions.create({
      model: CONTENT_CONFIG.model,
      temperature: CONTENT_CONFIG.temperature,
      max_tokens: CONTENT_CONFIG.max_tokens,
      messages: [
        {
          role: 'system',
          content: ARTICLE_PROMPTS.system,
        },
        {
          role: 'user',
          content: ARTICLE_PROMPTS.generateArticle(topic, CATEGORIES[category as keyof typeof CATEGORIES]),
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
    const slug = generateSlug(topic);
    const date = new Date().toISOString().split('T')[0];

    // Generate description (first 160 characters of content without markdown)
    const plainText = cleanedContent.replace(/[#*`\[\]]/g, '').trim();
    const description = plainText.substring(0, 160) + '...';

    // Generate frontmatter
    const frontmatter = generateMDXFrontmatter({
      title: topic,
      description,
      category,
      date,
      tags: [category, 'pisici', 'sanatate', 'veterinar'],
    });

    // Combine into MDX file
    const mdxContent = generateMDXContent(frontmatter, cleanedContent);

    // Create content directory if it doesn't exist
    const contentDir = path.join(process.cwd(), 'content', 'articles');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Save the MDX file
    const filePath = path.join(contentDir, `${slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);

    console.log('✅ Articol generat cu succes!');
    console.log(`📄 Salvat la: ${filePath}`);

    // Also update the data.ts file with the new article
    console.log('\n📝 Actualizez lib/data.ts...');
    await updateDataFile(slug, topic, description, category);

    return filePath;
  } catch (error) {
    console.error('❌ Eroare la generarea articolului:', error);
    throw error;
  }
}

async function updateDataFile(slug: string, title: string, description: string, category: string) {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');

  // Read current data file
  let dataContent = fs.readFileSync(dataPath, 'utf-8');

  // Create new article object
  const newArticle = `  {
    slug: '${slug}',
    title: '${title}',
    description: '${description}',
    category: '${category}',
    image: '/images/sanatate/${slug}.webp',
    date: '${new Date().toISOString().split('T')[0]}',
    readTime: '5 min',
    author: 'Dr. Veterinar',
  }`;

  // Find the healthArticles array and add the new article
  const articlesRegex = /export const healthArticles: Article\[\] = \[([\s\S]*?)\];/;
  const match = dataContent.match(articlesRegex);

  if (match) {
    const currentArticles = match[1];
    const updatedArticles = currentArticles.trimEnd() + ',\n' + newArticle;
    dataContent = dataContent.replace(
      articlesRegex,
      `export const healthArticles: Article[] = [${updatedArticles}\n];`
    );

    fs.writeFileSync(dataPath, dataContent);
    console.log('✅ lib/data.ts actualizat cu succes!');
  } else {
    console.log('⚠️ Nu am putut actualiza automat lib/data.ts - vă rugăm adăugați manual articolul');
  }
}

async function main() {
  try {
    console.log('\n🐱 Generator de Articole Pisicopedia.ro');
    console.log('=' .repeat(50));

    // Get topic
    const topic = await question('\n📝 Introduceți subiectul articolului: ');
    if (!topic.trim()) {
      console.error('❌ Subiectul nu poate fi gol');
      process.exit(1);
    }

    // Show categories
    console.log('\n📁 Categorii disponibile:');
    Object.entries(CATEGORIES).forEach(([key, value], index) => {
      console.log(`  ${index + 1}. ${value} (${key})`);
    });

    // Get category
    const categoryInput = await question('\nSelectați categoria (nume sau număr): ');
    let category: string;

    // Check if input is a number
    const categoryNumber = parseInt(categoryInput);
    if (!isNaN(categoryNumber) && categoryNumber > 0 && categoryNumber <= Object.keys(CATEGORIES).length) {
      category = Object.keys(CATEGORIES)[categoryNumber - 1];
    } else if (CATEGORIES[categoryInput as keyof typeof CATEGORIES]) {
      category = categoryInput;
    } else {
      console.error('❌ Categorie invalidă');
      process.exit(1);
    }

    // Generate the article
    await generateArticle(topic, category);

    console.log('\n💡 Sfat: Nu uitați să generați și imaginea pentru articol folosind:');
    console.log(`   npm run leonardo:article "${generateSlug(topic)}"`);

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