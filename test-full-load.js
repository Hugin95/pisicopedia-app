const https = require('https');
const { URL } = require('url');

console.log('\n🔍 TEST COMPLET - URMĂRIM TOATE REDIRECT-URILE...\n');

function followRedirects(startUrl, maxRedirects = 10) {
  return new Promise((resolve) => {
    let redirectCount = 0;
    const history = [];
    
    function makeRequest(url) {
      const parsedUrl = new URL(url);
      
      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      };
      
      https.get(options, (res) => {
        history.push({
          url: url,
          status: res.statusCode,
          location: res.headers.location
        });
        
        console.log(`${redirectCount + 1}. ${url}`);
        console.log(`   Status: ${res.statusCode}`);
        if (res.headers.location) {
          console.log(`   → ${res.headers.location}`);
        }
        
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          redirectCount++;
          
          if (redirectCount >= maxRedirects) {
            console.log(`\n❌ REDIRECT LOOP! Mai mult de ${maxRedirects} redirect-uri!\n`);
            resolve({ loop: true, history });
            return;
          }
          
          // Follow redirect
          let nextUrl = res.headers.location;
          if (!nextUrl.startsWith('http')) {
            nextUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${nextUrl}`;
          }
          
          makeRequest(nextUrl);
        } else if (res.statusCode === 200) {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            console.log(`   Mărime: ${data.length} bytes`);
            console.log(`\n✅ SUCCESS! Pagina s-a încărcat după ${redirectCount} redirect-uri!\n`);
            resolve({ success: true, history, size: data.length });
          });
        } else {
          console.log(`\n❌ Status neașteptat: ${res.statusCode}\n`);
          resolve({ error: true, status: res.statusCode, history });
        }
      }).on('error', (err) => {
        console.log(`\n❌ EROARE: ${err.message}\n`);
        resolve({ error: true, message: err.message, history });
      });
    }
    
    makeRequest(startUrl);
  });
}

async function runTests() {
  console.log('═══════════════════════════════════════');
  console.log('TEST 1: https://pisicopedia.ro/');
  console.log('═══════════════════════════════════════\n');
  
  const result1 = await followRedirects('https://pisicopedia.ro/');
  
  console.log('\n═══════════════════════════════════════');
  console.log('TEST 2: https://www.pisicopedia.ro/');
  console.log('═══════════════════════════════════════\n');
  
  const result2 = await followRedirects('https://www.pisicopedia.ro/');
  
  console.log('\n═══════════════════════════════════════');
  console.log('REZUMAT');
  console.log('═══════════════════════════════════════\n');
  
  if (result1.loop || result2.loop) {
    console.log('❌ REDIRECT LOOP DETECTAT!\n');
  } else if (result1.success && result2.success) {
    console.log('✅ SITE-UL FUNCȚIONEAZĂ PERFECT!\n');
  } else {
    console.log('⚠️  Există probleme...\n');
  }
}

runTests();

