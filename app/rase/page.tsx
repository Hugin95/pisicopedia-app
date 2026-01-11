'use client';

import React, { useState, useMemo } from 'react';
import Container from '@/components/common/Container';
import BreedCard from '@/components/breeds/BreedCard';
import { getAllBreeds } from '@/lib/data';
import { Breed } from '@/types';
import { breedCategories, breedSizes } from '@/lib/constants';

export default function BreedsPage() {
  const [breeds, setBreeds] = React.useState<Breed[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'popularity'>('name');

  React.useEffect(() => {
    async function loadBreeds() {
      const data = await getAllBreeds();
      setBreeds(data);
    }
    loadBreeds();
  }, []);

  const filteredBreeds = useMemo(() => {
    let filtered = [...breeds];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (breed) =>
          breed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          breed.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          breed.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (breed) => breed.category === selectedCategory
      );
    }

    // Size filter
    if (selectedSize !== 'all') {
      filtered = filtered.filter((breed) => breed.size === selectedSize);
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title, 'ro'));
    } else if (sortBy === 'popularity') {
      // For demo, sort by activity level as proxy for popularity
      filtered.sort((a, b) => b.activityLevel - a.activityLevel);
    }

    return filtered;
  }, [breeds, searchQuery, selectedCategory, selectedSize, sortBy]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-soft py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-4">
              Catalog Complet de Rase de Pisici
            </h1>
            <p className="text-lg text-warmgray-600">
              Explorează 30 de rase de pisici cu informații detaliate despre temperament,
              îngrijire și probleme de sănătate specifice fiecărei rase.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-warmgray-200">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-warmgray-700 mb-2">
                Caută rasă
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: Persană, Siameză..."
                className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              >
                <option value="all">Toate categoriile</option>
                {breedCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-warmgray-700 mb-2">
                Mărime
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              >
                <option value="all">Toate mărimile</option>
                {breedSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-warmgray-700 mb-2">
                Sortează după
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'popularity')}
                className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              >
                <option value="name">Nume (A-Z)</option>
                <option value="popularity">Popularitate</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-warmgray-600">
            {filteredBreeds.length} rase găsite
            {searchQuery && ` pentru "${searchQuery}"`}
          </div>
        </Container>
      </section>

      {/* Breeds Grid */}
      <section className="py-12 bg-white">
        <Container>
          {filteredBreeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.slug} breed={breed} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-warmgray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-warmgray-900 mb-2">
                Nu am găsit nicio rasă
              </h3>
              <p className="text-warmgray-600">
                Încearcă să ajustezi filtrele sau termenii de căutare
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}