'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Container from '@/components/common/Container';
import ArticleCard from '@/components/articles/ArticleCard';
import { supabase } from '@/lib/supabase-client';
import { Article } from '@/types';

// Article categories for filtering
const articleCategories = [
  { value: 'all', label: 'Toate Articolele' },
  { value: 'simptome', label: 'Simptome' },
  { value: 'boli', label: 'Boli' },
  { value: 'preventie', label: 'Prevenție' },
  { value: 'proceduri', label: 'Proceduri' },
  { value: 'nutritie', label: 'Nutriție' },
  { value: 'comportament', label: 'Comportament' },
  { value: 'ingrijire', label: 'Îngrijire' },
];

export default function SanateatePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Load articles from Supabase
  useEffect(() => {
    async function loadArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading articles:', error);
          return;
        }

        // Transform Supabase data to Article type
        const transformedArticles: Article[] = (data || []).map((article: any) => ({
          slug: article.slug,
          title: article.title,
          description: article.description || article.title,
          category: article.category || 'simptome',
          image: article.image_url || `/images/articles/${article.slug}.jpg`,
          readingTime: Math.ceil(article.content.split(' ').length / 200), // Estimate reading time
          date: new Date(article.created_at).toISOString().split('T')[0],
          author: 'Dr. Maria Popescu',
          tags: article.keywords || [],
        }));

        setArticles(transformedArticles);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-600 mx-auto"></div>
          <p className="mt-4 text-warmgray-600">Se încarcă articolele...</p>
        </div>
      </Container>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lavender-50 to-white py-16 border-b border-lavender-100">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-4">
              📚 Sănătate Pisici
            </h1>
            <p className="text-xl text-warmgray-600 leading-relaxed">
              Articole medicale verificate de veterinari specializați în sănătatea
              felină. Informații esențiale pentru proprietarii responsabili de pisici.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-warmgray-200 sticky top-0 z-10 shadow-sm">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="🔍 Caută articole..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {articleCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-lavender-600 text-white'
                      : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
            >
              <option value="date">Cele mai recente</option>
              <option value="title">Alfabetic</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-warmgray-600">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'articol' : 'articole'}
            {selectedCategory !== 'all' && ` în categoria "${articleCategories.find(c => c.value === selectedCategory)?.label}"`}
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <Container>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-warmgray-600">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Nu au fost găsite articole. Încearcă alt criteriu de căutare.'
                  : 'Nu există încă articole publicate.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
