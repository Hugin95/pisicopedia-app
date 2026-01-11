import https from 'https';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;

async function testLeonardoAPI() {
  console.log('\n🧪 TEST RAPID LEONARDO API\n');

  // Test simple generation
  const requestData = JSON.stringify({
    prompt: 'Professional photograph of a fluffy orange cat sitting on a windowsill, natural lighting, photorealistic, 8K',
    modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876', // PhotoReal v2
    width: 1024,
    height: 768,
    num_images: 1,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'cloud.leonardo.ai',
      path: '/api/rest/v1/generations',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData),
      },
    };

    console.log('📤 Trimit request la Leonardo AI...\n');

    const req = https.request(options, (res) => {
      let data = '';
      
      console.log(`📊 Status code: ${res.statusCode}`);
      console.log(`📋 Headers:`, res.headers);
      console.log('');

      res.on('data', (chunk) => data += chunk);
      
      res.on('end', () => {
        console.log('📥 Răspuns primit:\n');
        console.log(data);
        console.log('');

        try {
          const response = JSON.parse(data);
          if (response.sdGenerationJob?.generationId) {
            console.log('✅ SUCCESS! Generation ID:', response.sdGenerationJob.generationId);
          } else if (response.error) {
            console.log('❌ EROARE API:', response.error);
          } else {
            console.log('⚠️  Răspuns neașteptat');
          }
        } catch (error) {
          console.error('❌ Eroare la parsare JSON:', error);
        }
        
        resolve(null);
      });
    });

    req.on('error', (error) => {
      console.error('❌ Eroare request:', error);
      resolve(null);
    });

    req.write(requestData);
    req.end();
  });
}

if (!LEONARDO_API_KEY) {
  console.error('❌ LEONARDO_API_KEY nu este setat!');
  process.exit(1);
}

testLeonardoAPI();

