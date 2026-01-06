'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import { RelatedArticles } from '@/components/common/RelatedContent';
import { supabase } from '@/lib/supabase-client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

// Main page component
export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error || !data) {
          setArticle(null);
          setLoading(false);
          return;
        }

        const transformedArticle = {
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

        setArticle(transformedArticle);
      } catch (err) {
        console.error('Error:', err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-warmgray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-600 mx-auto"></div>
          <p className="mt-4 text-warmgray-600">Se încarcă...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-warmgray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warmgray-900 mb-2">Articol negăsit</h1>
          <p className="text-warmgray-600">Ne pare rău, acest articol nu există.</p>
        </div>
      </main>
    );
  }

  return (
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
  );
}
