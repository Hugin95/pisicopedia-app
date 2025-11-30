import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesPath = path.join(process.cwd(), 'content', 'articles');
const dataPath = path.join(process.cwd(), 'lib', 'data.ts');

// Category mapping
const categoryMap: Record<string, string> = {
  'simptome': 'simptome',
  'boli': 'boli-cronice',
  'respiratorii': 'respiratorii',
  'preventie': 'preventie',
  'proceduri': 'proceduri',
  'nutritie': 'nutritie',
  'comportament': 'comportament',
  'ingrijire': 'ingrijire',
  'ghiduri': 'ghiduri'
};

async function updateAllArticles() {
  console.log('📝 Scanning all articles in content/articles...\n');

  // Read all MDX files
  const files = fs.readdirSync(articlesPath).filter(f => f.endsWith('.mdx'));
  console.log(`Found ${files.length} article files\n`);

  const articles = [];

  for (const file of files) {
    const filePath = path.join(articlesPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);

    const slug = file.replace('.mdx', '');
    const category = frontmatter.category || 'general';
    const subcategory = frontmatter.subcategory || '';

    // Determine image based on category/subcategory
    let imageName = 'general.jpg';
    if (subcategory && categoryMap[subcategory]) {
      imageName = `${categoryMap[subcategory]}.jpg`;
    } else if (categoryMap[category]) {
      imageName = `${categoryMap[category]}.jpg`;
    }

    articles.push({
      slug,
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.excerpt || '',
      category: category,
      subcategory: subcategory,
      image: `/images/articles/${imageName}`,
      frontmatter
    });

    console.log(`✅ ${slug} - ${frontmatter.title}`);
  }

  // Sort articles alphabetically
  articles.sort((a, b) => a.title.localeCompare(b.title, 'ro'));

  // Read current data.ts
  const dataContent = fs.readFileSync(dataPath, 'utf-8');

  // Extract breeds section
  const breedsMatch = dataContent.match(/export const breeds: Breed\[\] = \[([\s\S]*?)\];/);
  const breedsSection = breedsMatch ? breedsMatch[0] : '';

  // Generate new articles section
  const articlesSection = `export const articles = [
${articles.map(article => `  {
    slug: "${article.slug}",
    title: "${article.title.replace(/"/g, '\\"')}",
    description: "${article.description.replace(/"/g, '\\"')}",
    category: "${article.category}",
    image: "${article.image}",
    readingTime: ${article.frontmatter.readingTime || 5}
  }`).join(',\n')}
];`;

  // Generate guides section
  const guidesSection = `export const guides = [
  {
    slug: "cum-sa-alegi-pisica-potrivita",
    title: "Cum să alegi pisica potrivită pentru tine",
    description: "Ghid complet pentru alegerea rasei de pisică potrivite stilului tău de viață",
    category: "ghid-cumparare",
    image: "/images/guides/alegere-pisica.jpg",
    readingTime: 10
  },
  {
    slug: "pregatirea-casei-pentru-pisica",
    title: "Pregătirea casei pentru noua pisică",
    description: "Tot ce trebuie să știi pentru a-ți pregăti casa pentru sosirea unei pisici",
    category: "ghid-ingrijire",
    image: "/images/guides/pregatire-casa.jpg",
    readingTime: 8
  }
];`;

  // Combine everything
  const newDataContent = `${breedsSection}

${articlesSection}

${guidesSection}`;

  // Backup original file
  fs.copyFileSync(dataPath, `${dataPath}.backup-${Date.now()}`);

  // Write new content
  fs.writeFileSync(dataPath, newDataContent);

  console.log(`\n✅ Updated lib/data.ts with ${articles.length} articles`);
  console.log('\n📋 Articles by category:');

  const byCategory = articles.reduce((acc, art) => {
    const cat = art.subcategory || art.category;
    if (!acc[cat]) acc[cat] = 0;
    acc[cat]++;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count} articles`);
  });
}

updateAllArticles().catch(console.error);