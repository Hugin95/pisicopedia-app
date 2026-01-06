import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import { RelatedArticles } from '@/components/common/RelatedContent';
import { supabaseAdmin } from '@/lib/supabase';
import { generateArticleSchemaEnhanced, generateBreadcrumbSchema, generateFAQSchema, seoConfig } from '@/lib/seo-advanced';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper function to get article from Supabase
async function getArticle(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    content: data.content,
    description: data.description || data.title,
    image: data.image_url || `/images/articles/${data.slug}.jpg`,
    category: data.category || 'simptome',
    keywords: data.keywords || [],
    created_at: data.created_at,
    readingTime: Math.ceil(data.content.split(' ').length / 200),
    date: new Date(data.created_at).toISOString().split('T')[0],
    author: 'Dr. Maria Popescu',
    tags: data.keywords || [],
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Articol negăsit - Pisicopedia',
    };
  }

  const articleUrl = `${seoConfig.siteUrl}/sanatate/${article.slug}`;
  const imageUrl = article.image && article.image.startsWith('http')
    ? article.image
    : `${seoConfig.siteUrl}${article.image}`;

  return {
    title: `${article.title} | Ghid Complet 2024`,
    description: `${article.description} ✅ Informații verificate medical ✅ Sfaturi practice ✅ Recomandări experți veterinari`,
    keywords: `${article.title.toLowerCase()}, ${article.category}, pisici ${article.category}${article.tags ? ', ' + article.tags.join(', ') : ''}`,
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: 'Pisicopedia Romania',
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: 'Pisicopedia.ro',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      locale: 'ro_RO',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const { data: articles } = await supabaseAdmin
    .from('articles')
    .select('slug')
    .eq('published', true);

  return (articles || []).map((article) => ({
    slug: article.slug,
  }));
}

// Main page component
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${seoConfig.siteUrl}/sanatate/${article.slug}`;
  const imageUrl = article.image && article.image.startsWith('http')
    ? article.image
    : `${seoConfig.siteUrl}${article.image}`;

  // Generate schemas
  const articleSchema = generateArticleSchemaEnhanced({
    ...article,
    image: imageUrl,
    keywords: article.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Acasă', url: seoConfig.siteUrl },
    { name: 'Sănătate', url: `${seoConfig.siteUrl}/sanatate` },
    { name: article.title, url: articleUrl },
  ]);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-warmgray-50">
        {/* Article Header */}
        <article className="bg-white border-b border-warmgray-200">
          <Container className="py-12">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant="primary">{article.category}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-warmgray-600 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-medium text-lavender-600">{article.author}</span>
              </div>
              <div>•</div>
              <div>{article.date}</div>
              <div>•</div>
              <div>{article.readingTime} min citire</div>
            </div>

            {/* Featured Image */}
            {article.image && (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-lavender-50 rounded-lg border border-lavender-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-lavender-200 rounded-full flex items-center justify-center text-2xl">
                  👩‍⚕️
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-warmgray-900 mb-2">
                    {article.author}
                  </h3>
                  <p className="text-warmgray-600">
                    Medic veterinar cu 15 ani de experiență, specializat în medicina felină.
                    Pasionat de educația proprietarilor de pisici și de promovarea bunăstării animalelor.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-warmgray-100 text-warmgray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </article>

        {/* Related Articles */}
        <section className="py-12 bg-warmgray-50">
          <Container>
            <RelatedArticles
              currentSlug={article.slug}
              category={article.category}
            />
          </Container>
        </section>
      </main>
    </>
  );
}
