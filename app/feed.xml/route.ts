import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Fetch latest articles from Supabase
    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('slug, title, description, created_at, category')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !articles) {
      return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Pisicopedia.ro</title><link>https://pisicopedia.ro</link><description>Articole despre sănătatea pisicilor</description></channel></rss>', {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }

    const baseUrl = 'https://pisicopedia.ro';
    const now = new Date().toUTCString();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pisicopedia.ro - Articole Sănătate Pisici</title>
    <link>${baseUrl}</link>
    <description>Articole actualizate despre sănătatea, îngrijirea și boli pisici. Informații verificate de experți veterinari.</description>
    <language>ro-RO</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Pisicopedia.ro</title>
      <link>${baseUrl}</link>
    </image>
    ${articles
      .map((article) => {
        const pubDate = new Date(article.created_at).toUTCString();
        const articleUrl = `${baseUrl}/sanatate/${article.slug}`;
        const description = article.description || article.title;
        
        return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${article.category || 'simptome'}</category>
    </item>`;
      })
      .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Pisicopedia.ro</title><link>https://pisicopedia.ro</link><description>Error loading feed</description></channel></rss>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

