import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'guides');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

interface GuideImagePrompt {
  slug: string;
  title: string;
  prompts: string[];
}

// TOP 10 MOST IMPORTANT GUIDES - Image prompts (2-3 images per guide)
const guideImagePrompts: GuideImagePrompt[] = [
  {
    slug: 'pregatire-casa-pisica',
    title: 'Pregătirea casei pentru pisica ta',
    prompts: [
      'New cat exploring prepared home with all essentials (bed, bowls, litter box), welcome setup',
      'Cat-proofed living room with safe environment and cat supplies, home preparation',
      'Person setting up cat corner with all necessary items, welcoming preparation'
    ]
  },
  {
    slug: 'prima-vizita-veterinar',
    title: 'Prima vizită la veterinar',
    prompts: [
      'Kitten in carrier at veterinary clinic entrance, first vet visit',
      'Gentle veterinarian examining kitten on table, first checkup scene',
      'Cat carrier with comfortable bedding prepared for vet visit, transport preparation'
    ]
  },
  {
    slug: 'calendar-vaccinare',
    title: 'Calendar de vaccinare pentru pisici',
    prompts: [
      'Veterinarian administering vaccine to calm tabby cat in clinic, professional medical photography',
      'Kitten receiving first vaccination at vet clinic, healthcare scene with gentle hands',
      'Vaccination record book with cat sitting nearby at vet office, documentation scene'
    ]
  },
  {
    slug: 'hrana-uscata-vs-umeda',
    title: 'Hrană uscată vs hrană umedă',
    prompts: [
      'Two bowls side by side - one with dry kibble, one with wet food, comparison photography',
      'Cat choosing between dry and wet food bowls, feeding decision scene',
      'Quality cat food packages (dry and wet) displayed with nutritional information'
    ]
  },
  {
    slug: 'igiena-zilnica',
    title: 'Igienă zilnică pentru pisici',
    prompts: [
      'Person brushing fluffy cat with grooming tools, daily care routine',
      'Cat grooming supplies arranged neatly (brush, nail clipper, toothbrush), hygiene products',
      'Owner cleaning cat ears gently during grooming session, healthcare routine'
    ]
  },
  {
    slug: 'alegere-litiera',
    title: 'Alegerea litierelor pentru pisici',
    prompts: [
      'Modern cat litter box with various types displayed, clean home interior, professional product photography',
      'Cat using covered litter box in bathroom, hygienic home environment, natural lighting',
      'Different cat litter types in containers side by side, comparison setup, studio lighting'
    ]
  },
  {
    slug: 'dresaj-pisica',
    title: 'Dresajul pisicilor',
    prompts: [
      'Person training orange cat with clicker and treats, positive reinforcement training',
      'Cat giving high-five to owner during training session, indoor learning environment',
      'Playful cat learning tricks with interactive toys, home training setup'
    ]
  },
  {
    slug: 'ingrijire-senior',
    title: 'Îngrijirea pisicilor seniori',
    prompts: [
      'Elderly cat being gently brushed by caring owner, senior pet care scene',
      'Senior cat resting comfortably with orthopedic bed, aged pet comfort',
      'Old cat receiving medication from owner with gentle care, elderly pet health'
    ]
  },
  {
    slug: 'socializare-pui',
    title: 'Socializarea puilor de pisică',
    prompts: [
      'Playful kittens interacting with person during socialization, early bonding',
      'Young kittens playing together learning social skills, kitten development',
      'Person gently handling young kitten for socialization, trust building'
    ]
  },
  {
    slug: 'sterilizare-pro-contra',
    title: 'Sterilizare - Pro și Contra',
    prompts: [
      'Cat recovering comfortably after spay/neuter surgery with cone, post-op care',
      'Veterinarian discussing sterilization procedure with cat owner, consultation scene',
      'Healthy spayed/neutered cat resting at home, successful recovery'
    ]
  },
];

// TOP 10 GHIDURI SELECTATE PENTRU IMAGINI MULTIPLE

async function generateImage(prompt: string): Promise<string | null> {
  const requestData = JSON.stringify({
    prompt: `Professional photograph: ${prompt}. 8K resolution, photorealistic, natural lighting, high detail, sharp focus, professional pet photography, clean composition, warm tones`,
    modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876', // PhotoReal v2
    width: 1024,
    height: 768,
    num_images: 1,
    photoReal: true,
    photoRealVersion: 'v2',
    presetStyle: 'CINEMATIC',
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

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.sdGenerationJob?.generationId) {
            resolve(response.sdGenerationJob.generationId);
          } else {
            console.error('No generation ID received');
            resolve(null);
          }
        } catch (error) {
          console.error('Parse error:', error);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      resolve(null);
    });

    req.write(requestData);
    req.end();
  });
}

async function waitForGeneration(generationId: string, maxAttempts = 60): Promise<string | null> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = await new Promise<any>((resolve) => {
      const options = {
        hostname: 'cloud.leonardo.ai',
        path: `/api/rest/v1/generations/${generationId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        },
      };

      https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }).on('error', () => resolve(null));
    });

    if (result?.generations_by_pk?.status === 'COMPLETE') {
      return result.generations_by_pk.generated_images?.[0]?.url || null;
    }
  }

  return null;
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        resolve(false);
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });

      fileStream.on('error', () => {
        resolve(false);
      });
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function generateAllGuideImages() {
  // TOP 10 PRIORITY GUIDES
  const TOP_10_SLUGS = [
    'pregatire-casa-pisica',
    'prima-vizita-veterinar',
    'calendar-vaccinare',
    'hrana-uscata-vs-umeda',
    'igiena-zilnica',
    'alegere-litiera',
    'dresaj-pisica',
    'ingrijire-senior',
    'socializare-pui',
    'sterilizare-pro-contra',
  ];

  // Filter to only TOP 10
  const priorityGuides = guideImagePrompts.filter(g => TOP_10_SLUGS.includes(g.slug));

  console.log('\n🎨 GENERARE IMAGINI PENTRU TOP 10 GHIDURI\n');
  console.log('━'.repeat(70));
  console.log(`📊 Total ghiduri selectate: ${priorityGuides.length}`);
  console.log(`🖼️  Total imagini de generat: ${priorityGuides.reduce((acc, g) => acc + g.prompts.length, 0)}`);
  console.log('━'.repeat(70));
  console.log('');

  let totalGenerated = 0;
  let totalFailed = 0;

  for (const guide of priorityGuides) {
    console.log(`\n📖 ${guide.title}`);
    console.log(`   Slug: ${guide.slug}`);
    console.log(`   Imagini de generat: ${guide.prompts.length}`);

    for (let i = 0; i < guide.prompts.length; i++) {
      const imageNumber = i + 1;
      const filename = i === 0 ? `${guide.slug}.jpg` : `${guide.slug}-${imageNumber}.jpg`;
      const filepath = path.join(IMAGES_DIR, filename);

      // Skip if image already exists
      if (fs.existsSync(filepath)) {
        console.log(`   ⏭️  Imagine ${imageNumber}: Există deja`);
        continue;
      }

      console.log(`   🎨 Imagine ${imageNumber}: Generare...`);
      
      const generationId = await generateImage(guide.prompts[i]);
      
      if (!generationId) {
        console.log(`   ❌ Imagine ${imageNumber}: Eroare la cerere`);
        totalFailed++;
        continue;
      }

      console.log(`   ⏳ Imagine ${imageNumber}: Așteptare procesare...`);
      const imageUrl = await waitForGeneration(generationId);

      if (!imageUrl) {
        console.log(`   ❌ Imagine ${imageNumber}: Timeout`);
        totalFailed++;
        continue;
      }

      console.log(`   💾 Imagine ${imageNumber}: Descărcare...`);
      const downloaded = await downloadImage(imageUrl, filepath);

      if (downloaded) {
        console.log(`   ✅ Imagine ${imageNumber}: Salvată ca ${filename}`);
        totalGenerated++;
      } else {
        console.log(`   ❌ Imagine ${imageNumber}: Eroare la descărcare`);
        totalFailed++;
      }

      // Wait between images to avoid rate limits
      if (i < guide.prompts.length - 1 || guide !== guideImagePrompts[guideImagePrompts.length - 1]) {
        console.log('   ⏸️  Pauză 5 secunde...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  console.log('\n' + '━'.repeat(70));
  console.log('\n📊 REZULTATE FINALE:');
  console.log(`   ✅ Imagini generate: ${totalGenerated}`);
  console.log(`   ❌ Eșuări: ${totalFailed}`);
  console.log(`   📈 Total procesate: ${totalGenerated + totalFailed}\n`);
}

// Run the script
if (!LEONARDO_API_KEY) {
  console.error('❌ LEONARDO_API_KEY nu este setat în .env.local!');
  process.exit(1);
}

generateAllGuideImages().catch(console.error);
