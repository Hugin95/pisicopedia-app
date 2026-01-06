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

STILUL PISICOPEDIA:
- Răspuns direct în primele 2-3 paragrafe (pentru SEO și utilizatori grăbiți)
- Structură clară cu headings (H2, H3)
- Liste cu puncte pentru claritate
- Secțiune FAQ cu 5-7 întrebări frecvente (optimizat pentru "People Also Ask")
- Disclaimer medical clar
- Ton medical dar cozy, cu empatie pentru proprietari și pisici
- Include "RED FLAGS" clare cu ⚠️ pentru urgențe
- Menționează costuri în RON unde este relevant (ex: "costă aproximativ 100-150 RON")

LUNGIME: 900-1400 cuvinte

FORMAT: Scrie articolul în format Markdown simplu, fără frontmatter YAML.
Structură:
- Titlu (H1)
- Introducere (2-3 paragrafe cu răspuns direct)
- Secțiuni principale (H2)
- Subsecțiuni (H3) unde e necesar
- Liste cu puncte
- Secțiune FAQ (H2)
- Disclaimer final

IMPORTANT: NU include delimitatori de tip ---, NU include code blocks, doar Markdown pur.`,

  user: (title: string) => `Scrie un articol medical complet despre: "${title}"

Asigură-te că:
1. Primele 2-3 paragrafe răspund direct la întrebarea din titlu
2. Include RED FLAGS cu ⚠️ pentru urgențe
3. Menționează costuri aproximative în RON
4. FAQ cu 5-7 întrebări frecvente
5. Disclaimer medical la final
6. Ton empatic și cozy, nu prea tehnic

NU include frontmatter YAML, doar conținut Markdown.`,
};

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
    
    // Generate image
    const imagePath = await generateArticleImage(slug, title, 'articles');
    
    if (imagePath) {
      // Return full URL
      return `https://www.pisicopedia.ro${imagePath}`;
    }
    
    return null;
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

    // 4. Find next topic to generate
    const topic = TOPICS.find(t => {
      const slug = t.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return !existingSlugs.has(slug);
    });

    if (!topic) {
      return NextResponse.json({
        status: 'no_topics',
        message: 'All topics have been generated',
      });
    }

    // 5. Generate slug
    const slug = topic.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

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

// GET method pentru status
export async function GET(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    const providedSecret = request.nextUrl.searchParams.get('secret');

    if (!cronSecret || !providedSecret || providedSecret !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('slug, title, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      status: 'ready',
      total_articles: articles?.length || 0,
      recent_articles: articles,
      config: {
        openai: !!process.env.OPENAI_API_KEY,
        leonardo: !!process.env.LEONARDO_API_KEY,
        supabase: !!process.env.SUPABASE_URL,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

