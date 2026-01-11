const https = require('https');

console.log('\n🔍 VERIFICARE SITE PISICOPEDIA.RO...\n');

// Test 1: pisicopedia.ro (should work)
function testURL(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          location: res.headers.location,
          size: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function runTests() {
  console.log('Test 1: https://pisicopedia.ro/');
  const result1 = await testURL('https://pisicopedia.ro/');
  
  if (result1.error) {
    console.log(`❌ EROARE: ${result1.error}\n`);
  } else if (result1.status === 200) {
    console.log(`✅ PERFECT! Status: ${result1.status}, Mărime: ${result1.size} bytes\n`);
  } else if (result1.status >= 300 && result1.status < 400) {
    console.log(`⚠️  Redirect ${result1.status} → ${result1.location}\n`);
  } else {
    console.log(`❌ Status neașteptat: ${result1.status}\n`);
  }

  console.log('Test 2: https://www.pisicopedia.ro/');
  const result2 = await testURL('https://www.pisicopedia.ro/');
  
  if (result2.error) {
    console.log(`❌ EROARE: ${result2.error}\n`);
  } else if (result2.status === 200) {
    console.log(`⚠️  NU AR TREBUI SĂ FIE 200! Ar trebui redirect!\n`);
  } else if (result2.status === 301 || result2.status === 308) {
    console.log(`✅ PERFECT! Redirect ${result2.status} → ${result2.location}\n`);
  } else {
    console.log(`❌ Status: ${result2.status}\n`);
  }

  console.log('✅ Testare completă!\n');
}

runTests();

