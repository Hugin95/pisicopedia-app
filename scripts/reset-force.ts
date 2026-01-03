import fs from 'fs';
import path from 'path';

const QUEUE_PATH = path.join(process.cwd(), 'content/auto-queue.json');
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/articles');
const DATA_PATH = path.join(process.cwd(), 'lib', 'data.ts');

// Lista slug-urilor care au creat probleme (le resetăm pe toate cele recente)
const TARGET_SLUGS = [
  'pisica-vomita-spuma-alba-dimineata',
  'pisica-sforaie-cand-doarme',
  'cum-sa-introduci-pisica-noua-cu-alta-pisica',
  'ghid-pisici-interior',
  'pisica-pierde-par-excesiv'
];

function resetForce() {
  console.log('🚨 Încep RESETAREA FORȚATĂ pentru articolele recente...\n');

  // 1. Resetare Coadă (Queue)
  if (fs.existsSync(QUEUE_PATH)) {
    const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf-8'));
    let modified = false;

    queue.forEach((item: any) => {
      if (TARGET_SLUGS.includes(item.slug)) {
        console.log(`🔄 Resetare status coadă: ${item.slug}`);
        item.status = 'pending';
        item.publishedAt = null;
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8');
      console.log('✅ Coada (auto-queue.json) a fost actualizată.');
    }
  }

  // 2. Ștergere Fișiere Fizice
  TARGET_SLUGS.forEach(slug => {
    // Șterge MDX
    const mdxPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
    if (fs.existsSync(mdxPath)) {
      fs.unlinkSync(mdxPath);
      console.log(`🗑️  Șters MDX: ${slug}.mdx`);
    }

    // Șterge Imagine
    const imgPath = path.join(IMAGES_DIR, `${slug}.jpg`);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
      console.log(`🗑️  Șters Imagine: ${slug}.jpg`);
    }
  });

  // 3. Curățare lib/data.ts
  if (fs.existsSync(DATA_PATH)) {
    let dataContent = fs.readFileSync(DATA_PATH, 'utf-8');
    let dataModified = false;

    TARGET_SLUGS.forEach(slug => {
      // Regex care găsește obiectul articolului în array
      const regex = new RegExp(`\\s*{[^}]*slug:\\s*['"]${slug}['"][^}]*},?`, 'g');
      if (regex.test(dataContent)) {
        dataContent = dataContent.replace(regex, '');
        console.log(`🧹 Eliminat din data.ts: ${slug}`);
        dataModified = true;
      }
    });

    if (dataModified) {
      // Curățăm virgulele duble sau liniile goale rămase
      dataContent = dataContent
        .replace(/\[\s+,/g, '[')
        .replace(/,\s*,/g, ',')
        .replace(/,\s*\]/g, ']');
      
      fs.writeFileSync(DATA_PATH, dataContent, 'utf-8');
      console.log('✅ lib/data.ts a fost curățat.');
    }
  }

  console.log('\n✨ Resetare completă. Acum poți rula din nou generatorul!');
}

resetForce();