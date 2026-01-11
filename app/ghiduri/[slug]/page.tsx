import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import { getGuideBySlug, getAllGuides } from '@/lib/data';
import { seoConfig } from '@/lib/seo-advanced';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-advanced';
import Image from 'next/image';
import { getGuideMDXContent } from '@/lib/mdx';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Ghid negăsit - Pisicopedia',
    };
  }

  const guideUrl = `${seoConfig.siteUrl}/ghiduri/${guide.slug}`;
  const imageUrl = guide.image?.startsWith('http')
    ? guide.image
    : `${seoConfig.siteUrl}${guide.image || '/images/guides/default.jpg'}`;

  return {
    title: `${guide.title} | Ghid Complet Pisici 2024`,
    description: `${guide.description} ✅ Ghid detaliat ✅ Sfaturi practice ✅ Recomandări experți`,
    keywords: `${guide.title.toLowerCase()}, ghid pisici, ${guide.category}, îngrijire pisici`,
    creator: 'Pisicopedia Romania',
    publisher: 'Pisicopedia Romania',
    alternates: {
      canonical: guideUrl,
    },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: guideUrl,
      siteName: 'Pisicopedia.ro',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: guide.title,
        }
      ],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
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
  const guides = await getAllGuides();
  return guides.map((guide: any) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Try to load MDX content
  const mdxData = await getGuideMDXContent(slug);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Acasă', url: '/' },
    { name: 'Ghiduri', url: '/ghiduri' },
    { name: guide.title, url: `/ghiduri/${guide.slug}` },
  ]);

  // Generate FAQ schema
  const faqSchema = generateFAQSchema([
    {
      question: `Despre ce este ghidul ${guide.title.toLowerCase()}?`,
      answer: guide.description,
    },
    {
      question: 'Pentru cine este acest ghid?',
      answer: 'Acest ghid este destinat proprietarilor de pisici care doresc să ofere îngrijire de calitate și să înțeleagă mai bine nevoile felinelor lor.',
    },
    {
      question: 'Cum pot folosi informațiile din acest ghid?',
      answer: 'Informațiile din ghid sunt practice și aplicabile imediat. Urmați pașii recomandați și consultați medicul veterinar pentru situații specifice.',
    },
  ]);

  // Generate Article schema for Google Rich Results
  const guideUrl = `${seoConfig.siteUrl}/ghiduri/${guide.slug}`;
  const imageUrl = guide.image?.startsWith('http')
    ? guide.image
    : `${seoConfig.siteUrl}${guide.image || '/images/guides/default.jpg'}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    image: imageUrl,
    datePublished: guide.date || new Date().toISOString(),
    dateModified: guide.date || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Pisicopedia Romania',
      url: seoConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pisicopedia Romania',
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
    },
    articleSection: 'Ghiduri pentru proprietarii de pisici',
    wordCount: guide.readingTime ? guide.readingTime * 180 : 1500,
    inLanguage: 'ro-RO',
    isAccessibleForFree: 'True',
    keywords: `${guide.title.toLowerCase()}, ghid pisici, îngrijire pisici, ${guide.category}`,
  };

  // Category label mapping
  const categoryLabels: Record<string, string> = {
    'ghid-cumparare': 'Ghid Cumpărare',
    'ghid-ingrijire': 'Ghid Îngrijire',
    'sanatate': 'Sănătate',
    'nutritie': 'Nutriție',
    'comportament': 'Comportament',
    'pui': 'Creștere Pui',
    'senior': 'Îngrijire Senior',
  };

  return (
    <>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
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
                  <a href="/ghiduri" className="hover:text-lavender-600 transition-colors">
                    Ghiduri
                  </a>
                </li>
                <li className="text-warmgray-400">/</li>
                <li className="text-warmgray-900 font-medium">{guide.title}</li>
              </ol>
            </nav>

            {/* Guide Header */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">
                  {categoryLabels[guide.category] || guide.category}
                </Badge>
                <h1 className="text-3xl lg:text-5xl font-bold text-warmgray-900 mb-4">
                  {guide.title}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-warmgray-600">
                  <span>{guide.readingTime} min citire</span>
                </div>
              </div>

              {/* Featured Image */}
              {guide.image && (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Guide Content */}
              <div className="prose prose-lg max-w-none">
                {/* Description */}
                <div className="text-xl text-warmgray-700 mb-8 font-medium leading-relaxed">
                  {guide.description}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                  {mdxData ? (
                    // Render actual MDX content
                    <div className="prose prose-lg max-w-none prose-headings:text-warmgray-900 prose-p:text-warmgray-700 prose-a:text-lavender-600 prose-strong:text-warmgray-900 prose-ul:text-warmgray-700 prose-ol:text-warmgray-700">
                      {mdxData.content}
                    </div>
                  ) : (
                    // Fallback if MDX file doesn't exist
                    <div className="space-y-6">
                      <section>
                        <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                          Informații esențiale
                        </h2>
                        <p className="text-warmgray-700 leading-relaxed">
                          {guide.description}
                        </p>
                      </section>

                      {/* Info Box */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          💡 Sfat Important
                        </h3>
                        <p className="text-blue-800">
                          Informațiile din acest ghid sunt orientative. Pentru situații specifice sau urgențe,
                          consultați întotdeauna medicul veterinar.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  Vrei mai multe sfaturi despre îngrijirea pisicii?
                </h2>
                <p className="text-warmgray-600 mb-6">
                  Explorează și celelalte ghiduri complete pentru proprietarii de pisici.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/ghiduri"
                    className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
                  >
                    Vezi toate ghidurile
                  </a>
                  <a
                    href="/sanatate"
                    className="inline-flex items-center px-6 py-3 bg-white text-warmgray-900 rounded-lg hover:shadow-md transition-shadow"
                  >
                    Articole despre sănătate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
