import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import { RelatedArticles } from '@/components/common/RelatedContent';
import { getArticleBySlug, getAllArticles } from '@/lib/data';
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

  return {
    title: `${article.title} - Pisicopedia`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
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

  // Generate structured data
  const structuredData = generateArticleSchema({
    title: article.title,
    description: article.description,
    author: article.author,
    datePublished: article.date,
    dateModified: article.date,
    image: article.image,
    url: `/sanatate/${article.slug}`,
  });

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
          __html: JSON.stringify(structuredData),
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
                  <span>{article.author}</span>
                  <span>•</span>
                  <time>{new Date(article.date).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                  <span>•</span>
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