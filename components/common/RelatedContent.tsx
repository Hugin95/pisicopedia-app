'use client';

import Link from 'next/link';
import { getSimilarBreeds, getRelatedArticles } from '@/lib/content-lists';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface RelatedBreedsProps {
  currentSlug: string;
}

export function RelatedBreeds({ currentSlug }: RelatedBreedsProps) {
  const similarBreeds = getSimilarBreeds(currentSlug, 3);

  if (!similarBreeds.length) return null;

  return (
    <section className="mt-12 p-6 bg-lavender-50 rounded-2xl">
      <h2 className="text-2xl font-bold text-warmgray-900 mb-4">Rase similare</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {similarBreeds.map(breed => (
          <Link
            key={breed.slug}
            href={`/rase/${breed.slug}`}
            className="group flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-warmgray-900 group-hover:text-rose-600 transition-colors">
                {breed.name}
              </h3>
              <p className="text-sm text-warmgray-600">{breed.origin}</p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-warmgray-400 group-hover:text-rose-500 transition-colors" />
          </Link>
        ))}
      </div>
      <p className="text-sm text-warmgray-600 mt-4">
        Explorați și alte rase pentru a găsi companionul perfect pentru familia dumneavoastră.
      </p>
    </section>
  );
}

interface RelatedArticlesProps {
  currentSlug: string;
  category?: string;
}

export function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentSlug, 3);

  if (!relatedArticles.length) return null;

  return (
    <section className="mt-12 p-6 bg-cream-50 rounded-2xl">
      <h2 className="text-2xl font-bold text-warmgray-900 mb-4">Articole recomandate</h2>
      <div className="space-y-3">
        {relatedArticles.map(article => (
          <Link
            key={article.slug}
            href={`/sanatate/${article.slug}`}
            className="group block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-warmgray-900 group-hover:text-rose-600 transition-colors mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-lavender-100 text-lavender-700 text-xs rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-warmgray-600">
                {article.subcategory}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/sanatate"
          className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
        >
          Vezi toate articolele de sănătate
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// Component for Quick Links in articles
export function QuickLinks() {
  const emergencyTopics = [
    { title: "Pisica nu mănâncă", slug: "pisica-nu-mananca", urgent: true },
    { title: "Pisica vomită", slug: "pisica-vomita", urgent: true },
    { title: "Vaccinare", slug: "vaccinare-pisici", urgent: false },
    { title: "Sterilizare", slug: "sterilizare-pisici", urgent: false },
  ];

  return (
    <aside className="lg:sticky lg:top-8 p-6 bg-gradient-to-br from-lavender-50 to-rose-50 rounded-2xl">
      <h3 className="text-lg font-bold text-warmgray-900 mb-4">Acces rapid</h3>
      <div className="space-y-2">
        {emergencyTopics.map(topic => (
          <Link
            key={topic.slug}
            href={`/sanatate/${topic.slug}`}
            className={`block p-3 rounded-lg transition-all ${
              topic.urgent
                ? 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                : 'bg-white hover:bg-lavender-100 text-warmgray-700'
            }`}
          >
            {topic.urgent && (
              <span className="inline-block w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse" />
            )}
            {topic.title}
          </Link>
        ))}
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg">
        <p className="text-sm text-warmgray-600 mb-2">
          🏥 <strong>Urgențe 24/7</strong>
        </p>
        <p className="text-xs text-warmgray-500">
          Pentru urgențe în afara programului, contactați cea mai apropiată clinică veterinară de gardă.
        </p>
      </div>
    </aside>
  );
}