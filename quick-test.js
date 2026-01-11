const https = require('https');

async function quickTest(url) {
  return new Promise((resolve) => {
    console.log(`\nTestez: ${url}`);
    
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      console.log(`Status: ${res.statusCode}`);
      
      if (res.statusCode >= 300 && res.statusCode < 400) {
        console.log(`Redirect → ${res.headers.location}`);
        resolve({ redirect: true });
      } else if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`✅ OK! Mărime: ${data.length} bytes`);
          resolve({ ok: true });
        });
      } else {
        console.log(`❌ Eroare: ${res.statusCode}`);
        resolve({ error: true });
      }
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${err.message}`);
      resolve({ error: true });
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout!');
      req.destroy();
      resolve({ timeout: true });
    });
  });
}

async function main() {
  console.log('\n🧪 TEST RAPID SITE PISICOPEDIA\n');
  console.log('═══════════════════════════════════════');
  
  await quickTest('https://pisicopedia.ro/');
  await quickTest('https://www.pisicopedia.ro/');
  await quickTest('https://pisicopedia.ro/rase');
  
  console.log('\n═══════════════════════════════════════');
  console.log('\n✅ Test complet!\n');
}

main();

