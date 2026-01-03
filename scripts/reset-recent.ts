import fs from 'fs';
import path from 'path';

const QUEUE_PATH = path.join(process.cwd(), 'content/auto-queue.json');
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

const rawData = fs.readFileSync(QUEUE_PATH, 'utf-8');
const queue = JSON.parse(rawData);

// Găsim articolele publicate astăzi pentru a le reseta
const today = new Date().toISOString().split('T')[0];
let resetCount = 0;

queue.forEach((item: any) => {
    // Resetăm tot ce apare ca 'published' dar are probleme (sau a fost făcut azi)
    if (item.status === 'published' && item.publishedAt && item.publishedAt.startsWith(today)) {
        console.log(`🔄 Resetting: ${item.title}`);
        item.status = 'pending';
        item.publishedAt = null;
        resetCount++;
        
        // Ștergem fișierul greșit
        const filePath = path.join(ARTICLES_DIR, `${item.slug}.mdx`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Deleted bad file: ${item.slug}.mdx`);
        }
    }
});

fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8');
console.log(`\n✅ Am resetat ${resetCount} articole. Acum poți rula din nou generatorul!`);