import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import { RelatedArticles } from '@/components/common/RelatedContent';
import { getArticleBySlug, getAllArticles } from '@/lib/data';
import { generateArticleSchemaEnhanced, generateBreadcrumbSchema, generateFAQSchema, seoConfig } from '@/lib/seo-advanced';
import { generateArticleSchema } from '@/lib/seo';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Articol negăsit - Pisicopedia',
    };
  }

  const articleUrl = `${seoConfig.siteUrl}/sanatate/${article.slug}`;
  const imageUrl = article.image.startsWith('http')
    ? article.image
    : `${seoConfig.siteUrl}${article.image}`;

  return {
    title: `${article.title} | Ghid Complet 2024`,
    description: `${article.description} ✅ Informații verificate medical ✅ Sfaturi practice ✅ Recomandări experți veterinari`,
    keywords: `${article.title.toLowerCase()}, ${article.category}, pisici ${article.category}${article.tags ? ', ' + article.tags.join(', ') : ''}`,
    authors: article.author ? [{ name: article.author }] : [],
    creator: article.author || 'Dr. Veterinar Pisicopedia',
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
      publishedTime: article.date || undefined,
      modifiedTime: article.date || undefined,
      authors: article.author ? [article.author] : undefined,
      section: article.category,
      tags: article.tags || undefined,
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
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Generate enhanced structured data
  const articleSchemaEnhanced = generateArticleSchemaEnhanced({
    ...article,
    keywords: [...(article.tags || []), article.category, 'pisici'],
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Acasă', url: '/' },
    { name: 'Sănătate', url: '/sanatate' },
    { name: article.title, url: `/sanatate/${article.slug}` },
  ]);

  // Generate FAQ schema (example FAQs - in production, extract from content)
  const faqSchema = generateFAQSchema([
    {
      question: `Ce este ${article.title.toLowerCase()}?`,
      answer: article.description,
    },
    {
      question: 'Când trebuie să merg la veterinar?',
      answer: 'Consultați imediat un medic veterinar dacă observați simptome severe sau persistente. Nu amânați vizita dacă pisica prezintă durere, letargie sau refuză mâncarea.',
    },
    {
      question: 'Cum pot preveni această problemă?',
      answer: 'Prevenția include controale regulate la veterinar, o dietă echilibrată, exercițiu fizic adecvat și menținerea unui mediu curat și sigur pentru pisica dumneavoastră.',
    },
  ]);

  // Category label mapping
  const categoryLabels: Record<string, string> = {
    symptoms: 'Simptome',
    diseases: 'Boli',
    prevention: 'Prevenție',
    procedures: 'Proceduri',
    nutrition: 'Nutriție',
    behavior: 'Comportament',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchemaEnhanced),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <article className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
        <Container>
          <div className="py-12 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-warmgray-600">
                <li>
                  <a href="/" className="hover:text-lavender-600 transition-colors">
                    Acasă
                  </a>
                </li>
                <li className="text-warmgray-400">/</li>
                <li>
                  <a href="/sanatate" className="hover:text-lavender-600 transition-colors">
                    Sănătate
                  </a>
                </li>
                <li className="text-warmgray-400">/</li>
                <li className="text-warmgray-900 font-medium">{article.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">
                  {categoryLabels[article.category] || article.category}
                </Badge>
                <h1 className="text-3xl lg:text-5xl font-bold text-warmgray-900 mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-warmgray-600">
                  {article.author && (
                    <>
                      <span>{article.author}</span>
                      <span>•</span>
                    </>
                  )}
                  {article.date && (
                    <>
                      <time>{new Date(article.date).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</time>
                      <span>•</span>
                    </>
                  )}
                  <span>{article.readingTime} min citire</span>
                </div>
              </div>

              {/* Featured Image */}
              {article.image && (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
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
                {/* Excerpt */}
                <div className="text-xl text-warmgray-700 mb-8 font-medium leading-relaxed">
                  {article.excerpt}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                  {/* Since we don't have MDX content loaded, show a placeholder */}
                  <div className="space-y-6">
                    <section>
                      <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                        Informații principale
                      </h2>
                      <p className="text-warmgray-700 leading-relaxed">
                        {article.description}
                      </p>
                    </section>

                    {/* Medical Disclaimer */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2">
                        ⚠️ Disclaimer Medical
                      </h3>
                      <p className="text-amber-800">
                        Acest articol are scop informativ și nu înlocuiește consultația veterinară.
                        Pentru orice problemă de sănătate a pisicii tale, consultă întotdeauna medicul veterinar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-lavender-100 text-lavender-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  Ai întrebări despre sănătatea pisicii tale?
                </h2>
                <p className="text-warmgray-600 mb-6">
                  Consultă mereu un medic veterinar pentru un diagnostic corect și tratament adecvat.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
                  >
                    Contactează-ne
                  </a>
                  <a
                    href="/sanatate"
                    className="inline-flex items-center px-6 py-3 bg-white text-warmgray-900 rounded-lg hover:shadow-md transition-shadow"
                  >
                    Vezi toate articolele
                  </a>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <RelatedArticles currentSlug={article.slug} category={article.category} />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}