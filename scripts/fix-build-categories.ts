import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
const articlesDir = path.join(process.cwd(), 'content', 'articles');

console.log('🔧 Fixing categories to resolve build errors...');

// 1. Fix lib/data.ts
try {
  if (fs.existsSync(dataPath)) {
    let content = fs.readFileSync(dataPath, 'utf-8');
    let hasChanges = false;

    if (content.match(/category:\s*['"]ghid['"]/)) {
      content = content.replace(/category:\s*['"]ghid['"]/g, "category: 'ghiduri'");
      hasChanges = true;
      console.log('  ✅ lib/data.ts: Replaced "ghid" with "ghiduri"');
    }
    
    if (content.match(/category:\s*['"]sanatate['"]/)) {
      content = content.replace(/category:\s*['"]sanatate['"]/g, "category: 'ingrijire'");
      hasChanges = true;
      console.log('  ✅ lib/data.ts: Replaced "sanatate" with "ingrijire"');
    }

    if (hasChanges) {
      fs.writeFileSync(dataPath, content, 'utf-8');
      console.log('  💾 Saved lib/data.ts');
    } else {
      console.log('  ✨ lib/data.ts is already correct.');
    }
  }
} catch (error) {
  console.error('❌ Error fixing lib/data.ts:', error);
}

// 2. Fix MDX files
try {
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(articlesDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      let hasChanges = false;

      if (content.match(/category:\s*['"]?ghid['"]?/)) {
        content = content.replace(/category:\s*['"]?ghid['"]?/, "category: 'ghiduri'");
        hasChanges = true;
        console.log(`  ✅ ${file}: Replaced "ghid" with "ghiduri"`);
      }
      
      if (content.match(/category:\s*['"]?sanatate['"]?/)) {
        content = content.replace(/category:\s*['"]?sanatate['"]?/, "category: 'ingrijire'");
        hasChanges = true;
        console.log(`  ✅ ${file}: Replaced "sanatate" with "ingrijire"`);
      }

      if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    }
  }
} catch (error) {
  console.error('❌ Error fixing MDX files:', error);
}