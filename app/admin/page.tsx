'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/common/Container';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  created_at: string;
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Load articles
  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading articles:', error);
        return;
      }

      setArticles(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteArticle(id: number, slug: string) {
    if (!confirm(`Sigur vrei să ștergi articolul "${slug}"?`)) {
      return;
    }

    setDeleting(id);

    try {
      const response = await fetch('/api/delete-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          secret: 'pisicopedia-local-dev-secret-2024',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      // Remove from local state
      setArticles(articles.filter(a => a.id !== id));
    } catch (err: any) {
      alert('Eroare la ștergere: ' + err.message);
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-warmgray-50 py-16">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-600 mx-auto"></div>
            <p className="mt-4 text-warmgray-600">Se încarcă...</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warmgray-50 py-16">
      <Container className="max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warmgray-900 mb-2">
              🎛️ Admin Panel
            </h1>
            <p className="text-warmgray-600 mb-4">
              Gestionează articolele din Pisicopedia
            </p>

            {/* Stats */}
            <div className="flex gap-4 mt-6">
              <div className="bg-lavender-50 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-lavender-700">
                  {articles.length}
                </div>
                <div className="text-sm text-warmgray-600">Total Articole</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-green-700">
                  {articles.filter(a => a.image_url).length}
                </div>
                <div className="text-sm text-warmgray-600">Cu Imagini</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 flex-1">
                <div className="text-2xl font-bold text-red-700">
                  {articles.filter(a => !a.image_url).length}
                </div>
                <div className="text-sm text-warmgray-600">Fără Imagini</div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              ℹ️ Sistem Automat Activ
            </h3>
            <p className="text-sm text-blue-800">
              Articole noi se generează automat în fiecare oră prin Vercel Cron.
              Poți șterge articolele care nu au imagini sau nu îți plac.
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-warmgray-900 mb-4">
              📚 Articole ({articles.length})
            </h2>

            {articles.length === 0 ? (
              <div className="text-center py-12 text-warmgray-600">
                <p>Nu există articole încă.</p>
                <p className="text-sm mt-2">
                  Primul articol va fi generat automat în maxim 1 oră.
                </p>
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg transition-all ${
                    article.image_url
                      ? 'border-warmgray-200 bg-white'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  {/* Image */}
                  {article.image_url ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-warmgray-200 flex items-center justify-center text-warmgray-500 flex-shrink-0">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-warmgray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-warmgray-600 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-warmgray-500">
                      <span className="px-2 py-1 bg-lavender-100 text-lavender-700 rounded">
                        {article.category}
                      </span>
                      <span>
                        {new Date(article.created_at).toLocaleDateString('ro-RO')}
                      </span>
                      {!article.image_url && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                          ❌ Fără imagine
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={`/sanatate/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-lavender-100 text-lavender-700 rounded-lg hover:bg-lavender-200 text-sm font-medium transition-colors text-center"
                    >
                      Vezi
                    </a>
                    <button
                      onClick={() => deleteArticle(article.id, article.slug)}
                      disabled={deleting === article.id}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        deleting === article.id
                          ? 'bg-warmgray-200 text-warmgray-500 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {deleting === article.id ? '...' : 'Șterge'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Refresh Button */}
          <div className="mt-6 text-center">
            <button
              onClick={loadArticles}
              className="px-6 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 transition-colors font-medium"
            >
              🔄 Reîmprospătează Lista
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}
