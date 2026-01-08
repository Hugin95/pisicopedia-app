/**
 * Generate Article API Route (Supabase Version)
 * 
 * Generează articole și le salvează direct în Supabase DB
 * ZERO GitHub push, ZERO Vercel rebuild!
 * 
 * Usage:
 *   POST /api/generate-article?secret=YOUR_CRON_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import OpenAI from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prompturi pentru generare articol
const ARTICLE_PROMPTS = {
  system: `Ești Dr. Maria Popescu, un medic veterinar expert cu 15 ani de experiență, specializată în medicina felină, care scrie articole medicale informative pentru Pisicopedia.ro, enciclopedia online despre pisici din România.
  
  GOOGLE EEAT & SEO STRATEGY:
  - Începe cu un "Răspuns Rapid" (30-40 cuvinte) care să fie perfect pentru Google Featured Snippet.
  - Folosește experiența personală: "În clinica mea, am văzut mii de cazuri în care...", "Proprietarii mă întreabă des despre...".
  - Include un tabel Markdown care compară simptomele sau oferă un ghid de urgență (ex: 'Simptom' vs 'Ce să faci').
  - Include o secțiune 'Cât costă tratamentul în România?' cu estimări reale în RON.
  - Folosește un ton empatic, cald, dar 100% profesional și medical.
  - Include "RED FLAGS" clare cu ⚠️ pentru situații de viață și de moarte.
  - Articolul trebuie să aibă 1200-1600 cuvinte pentru a fi considerat "Deep Content".

  FORMAT: Scrie articolul în format Markdown simplu, fără frontmatter YAML.
  Structură:
  - Titlu (H1)
  - Introducere (Răspuns direct pentru Google Snippet)
  - Experiența mea ca medic (H2)
  - Secțiuni principale (H2) cu explicații medicale detaliate
  - Tabel comparativ sau de costuri (Markdown table)
  - Secțiune FAQ (H2) optimizată pentru 'People Also Ask' (5-7 întrebări)
  - Disclaimer medical clar la final`,

  user: (title: string) => `Scrie un articol medical de autoritate despre: "${title}". 
  Asigură-te că este cel mai bun articol de pe internet pe acest subiect. 
  Include experiență personală, un tabel de costuri și sfaturi practice pe care un proprietar le poate aplica imediat.`,

  generateNewTopic: (existingSlugs: string[]) => `Ești un expert SEO specializat în nișa animalelor de companie (pisici). 
  Analizează lista de articole deja scrise (slug-uri): [${existingSlugs.join(', ')}].
  Identifică un subiect NOU, ULTRA-CĂUTAT pe Google în România, care lipsește din această listă.
  Subiectul trebuie să fie legat de sănătate, comportament sau îngrijire avansată a pisicilor.
  Returnează un obiect JSON cu 'title' și 'category' (una din: simptome, ingrijire, comportament, nutritie).
  Exemplu: {"title": "Pisica are gingiile roșii: Semne de stomatită felină", "category": "simptome"}`
};

// Helper pentru slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Funcție pentru generare imagine cu Leonardo
async function generateImage(slug: string, title: string): Promise<string | null> {
  const leonardoKey = process.env.LEONARDO_API_KEY;
  
  if (!leonardoKey) {
    console.log('[Generate] Leonardo API key not configured, skipping image');
    return null;
  }

  try {
    // Import Leonardo image generator
    const { generateArticleImage } = await import('@/lib/leonardo-images');
    
    // Generate image - returns full Supabase URL
    const imageUrl = await generateArticleImage(slug, title, 'articles');
    
    // Return the URL directly (already full URL from Supabase)
    return imageUrl;
  } catch (error) {
    console.error('[Generate] Error generating image:', error);
    return null;
  }
}

// Topics pentru generare - 50 topicuri SEO-optimizate
const TOPICS = [
  { title: "Pisica nu a mâncat de 24 de ore: Când să te îngrijorezi și ce să faci", category: "simptome" },
  { title: "Pisica scuipă păr: Cauze, prevenție și când este normal", category: "ingrijire" },
  { title: "Pisica vomită spumă albă dimineața: Cauze și soluții", category: "simptome" },
  { title: "Pisica are burta tare și umflată: Cauze posibile și urgențe", category: "simptome" },
  { title: "Pisica mănâncă iarbă și apoi vomită: De ce o face?", category: "comportament" },
  { title: "Pisica nu bea apă - Ce să faci urgent", category: "simptome" },
  { title: "Pisica scutură capul des - Cauze și tratament", category: "simptome" },
  { title: "Pisica are diaree cu sânge - Când este urgență", category: "simptome" },
  { title: "Pisica tremură și nu se mișcă - Semne de alarmă", category: "simptome" },
  { title: "Pisica plânge când merge la litieră", category: "simptome" },
  { title: "Pisica are ochii lăcrimoși - Cauze și soluții", category: "simptome" },
  { title: "Pisica respiră greu cu gura deschisă", category: "simptome" },
  { title: "Pisica are nasul cald și uscat - Este bolnavă?", category: "simptome" },
  { title: "Pisica se ascunde și nu mai mănâncă", category: "comportament" },
  { title: "Pisica mușcă și zgârie brusc - Agresivitate", category: "comportament" },
  { title: "Pisica toarce dar și mușcă - De ce?", category: "comportament" },
  { title: "Pisica merge în cerc și cade - Probleme neurologice", category: "simptome" },
  { title: "Pisica are picioarele din spate slabe", category: "simptome" },
  { title: "Pisica strănută des - Răceală sau alergie?", category: "simptome" },
  { title: "Pisica se linge excesiv până se jupuiește", category: "comportament" },
  { title: "Pisica urinează în afara litierei - Soluții", category: "comportament" },
  { title: "Pisica are sughiț - Este periculos?", category: "simptome" },
  { title: "Pisica are febră - Cum să măsori temperatura", category: "simptome" },
  { title: "Pisica are gingiile albe sau galbene", category: "simptome" },
  { title: "Pisica pierde păr în exces - Alopecie", category: "simptome" },
  { title: "Pisica are coaja negrăpermanent murdară", category: "ingrijire" },
  { title: "Pisica miroase urât din gură - Halena", category: "simptome" },
  { title: "Pisica are piele cu solzi - Mătreață", category: "ingrijire" },
  { title: "Pisica se freacă de pereți obsesiv", category: "comportament" },
  { title: "Pisica varsă bilă galbenă", category: "simptome" },
  { title: "Pisica nu face cacă de 3 zile - Constipație", category: "simptome" },
  { title: "Pisica are convulsii - Ce să faci imediat", category: "simptome" },
  { title: "Pisica miaună excesiv noaptea", category: "comportament" },
  { title: "Pisica doarme tot timpul - Letargie", category: "simptome" },
  { title: "Pisica are limba afară permanent", category: "simptome" },
  { title: "Pisica tremură când doarme", category: "comportament" },
  { title: "Pisica are pupilele dilatate constant", category: "simptome" },
  { title: "Pisica se uită fix în gol - Comportament", category: "comportament" },
  { title: "Pisica calcă în lapte - De ce o face?", category: "comportament" },
  { title: "Pisica aduce șoareci morți - Explicație", category: "comportament" },
  { title: "Pisica mănâncă plastic - Pericole", category: "comportament" },
  { title: "Pisica sare la fața ta - Agresivitate", category: "comportament" },
  { title: "Pisica se sperie de zgomote brusc", category: "comportament" },
  { title: "Pisica îți linge mâinile și te mușcă", category: "comportament" },
  { title: "Pisica nu se mai toalată - Neglijență", category: "simptome" },
  { title: "Pisica are coada lăsată în jos", category: "comportament" },
  { title: "Pisica are labele calde - Febră?", category: "simptome" },
  { title: "Pisica doarme în litieră - Semn rău", category: "comportament" },
  { title: "Pisica nu mai sare și merge greu", category: "simptome" },
  { title: "Pisica îți aduce jucării - Ce înseamnă?", category: "comportament" },
];

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Verify secret
    const cronSecret = process.env.CRON_SECRET;
    const providedSecret = request.nextUrl.searchParams.get('secret');

    if (!cronSecret || !providedSecret || providedSecret !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Check Supabase connection
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // 3. Get existing articles
    const { data: existingArticles, error: fetchError } = await supabaseAdmin
      .from('articles')
      .select('slug');

    if (fetchError) {
      throw new Error(`Failed to fetch existing articles: ${fetchError.message}`);
    }

    const existingSlugs = new Set(existingArticles?.map(a => a.slug) || []);

    // 4. Find next topic to generate (Infinite Mode)
    let topic: { title: string; category: string } | undefined = TOPICS.find(t => {
      const slug = generateSlug(t.title);
      return !existingSlugs.has(slug);
    });

    if (!topic) {
      console.log('[Generate] All pre-defined topics exhausted. Generating NEW topic with AI...');
      const topicCompletion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Ești un expert SEO veterinar.' },
          { role: 'user', content: ARTICLE_PROMPTS.generateNewTopic(Array.from(existingSlugs)) },
        ],
        response_format: { type: "json_object" },
      });

      const aiTopic = JSON.parse(topicCompletion.choices[0]?.message?.content || '{}');
      if (aiTopic.title && aiTopic.category) {
        topic = { title: aiTopic.title, category: aiTopic.category };
        console.log(`[Generate] AI generated new topic: ${topic.title}`);
      } else {
        throw new Error('AI failed to generate a valid new topic');
      }
    }

    // 5. Generate slug
    const slug = generateSlug(topic.title);

    console.log(`[Generate] Generating article: ${slug}`);

    // 6. Generate content with OpenAI
    console.log('[Generate] Calling OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: ARTICLE_PROMPTS.system },
        { role: 'user', content: ARTICLE_PROMPTS.user(topic.title) },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('OpenAI returned empty content');
    }

    console.log('[Generate] Content generated, length:', content.length);

    // 7. Generate image
    console.log('[Generate] Generating image...');
    const imageUrl = await generateImage(slug, topic.title);

    // 8. Extract description (first 160 chars)
    const description = content
      .replace(/^#.*$/gm, '') // Remove headings
      .replace(/\*\*/g, '') // Remove bold
      .trim()
      .split('\n\n')[0] // First paragraph
      .substring(0, 160);

    // 9. Save to Supabase
    console.log('[Generate] Saving to Supabase...');
    const { data: article, error: insertError } = await supabaseAdmin
      .from('articles')
      .insert({
        slug,
        title: topic.title,
        content,
        description,
        image_url: imageUrl,
        category: topic.category,
        keywords: [slug.replace(/-/g, ' ')],
        published: true,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to save article: ${insertError.message}`);
    }

    const duration = Date.now() - startTime;

    console.log(`[Generate] SUCCESS! Article saved: ${slug} (${duration}ms)`);

    return NextResponse.json({
      status: 'success',
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        url: `https://www.pisicopedia.ro/sanatate/${article.slug}`,
      },
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Generate] Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET method - Vercel Cron folosește GET, deci tratăm GET la fel ca POST!
export async function GET(request: NextRequest) {
  console.log('[Generate API] GET request received - treating as POST for Vercel Cron');
  return POST(request);
}

