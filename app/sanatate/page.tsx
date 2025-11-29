'use client';

import React, { useState, useMemo } from 'react';
import Container from '@/components/common/Container';
import ArticleCard from '@/components/articles/ArticleCard';
import { getAllArticles } from '@/lib/data';
import { Article } from '@/types';

// Article categories for filtering
const articleCategories = [
  { value: 'all', label: 'Toate Articolele' },
  { value: 'symptoms', label: 'Simptome' },
  { value: 'diseases', label: 'Boli' },
  { value: 'prevention', label: 'Prevenție' },
  { value: 'procedures', label: 'Proceduri' },
  { value: 'nutrition', label: 'Nutriție' },
  { value: 'behavior', label: 'Comportament' },
];

export default function SanateatePage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  React.useEffect(() => {
    async function loadArticles() {
      const data = await getAllArticles();
      setArticles(data);
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
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
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
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.title.localeCompare(b.title, 'ro');
      }
    });

    return filtered;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              Sănătatea Pisicii Tale
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Ghiduri complete despre sănătatea, îngrijirea și bunăstarea pisicilor.
              Informații medicale verificate de medici veterinari.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-2">
                  Caută articole
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: vaccinare, diaree, stres..."
                  className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-2">
                  Categorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
                >
                  {articleCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-2">
                  Sortare
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                  className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
                >
                  <option value="date">Cele mai recente</option>
                  <option value="title">Alfabetic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-warmgray-600">
              {filteredArticles.length}
              {filteredArticles.length === 1 ? ' articol găsit' : ' articole găsite'}
            </p>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-warmgray-600 mb-4">
                Nu am găsit articole care să corespundă criteriilor tale.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
              >
                Resetează filtrele
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
              Îngrijește-ți pisica cu încredere
            </h2>
            <p className="text-warmgray-600 mb-6 max-w-2xl mx-auto">
              Toate articolele noastre sunt revizuite de medici veterinari pentru a-ți oferi
              informații corecte și actualizate despre sănătatea pisicii tale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ghiduri"
                className="inline-flex items-center px-6 py-3 bg-white text-warmgray-900 rounded-lg hover:shadow-md transition-shadow"
              >
                Vezi ghidurile complete
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
              >
                Întreabă un specialist
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}