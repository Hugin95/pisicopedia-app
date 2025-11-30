import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { Article } from '@/types';
import { getImageSource } from '@/lib/image-utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabels = {
    symptoms: 'Simptome',
    diseases: 'Boli',
    prevention: 'Prevenție',
    procedures: 'Proceduri',
    nutrition: 'Nutriție',
    behavior: 'Comportament',
    // Romanian categories
    simptome: 'Simptome',
    boli: 'Boli',
    preventie: 'Prevenție',
    proceduri: 'Proceduri',
    nutritie: 'Nutriție',
    comportament: 'Comportament',
    ingrijire: 'Îngrijire',
    ghiduri: 'Ghiduri',
  };

  const categoryColors = {
    symptoms: 'warning',
    diseases: 'error',
    prevention: 'success',
    procedures: 'primary',
    nutrition: 'secondary',
    behavior: 'default',
    // Romanian categories
    simptome: 'warning',
    boli: 'error',
    preventie: 'success',
    proceduri: 'primary',
    nutritie: 'secondary',
    comportament: 'default',
    ingrijire: 'primary',
    ghiduri: 'secondary',
  } as const;

  return (
    <Link href={`/sanatate/${article.slug}`}>
      <Card hover className="h-full flex flex-col">
        <div className="relative aspect-[16/9] -m-6 mb-4 overflow-hidden rounded-t-xl">
          <Image
            src={getImageSource(article.image, 'article')}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={categoryColors[article.category]}>
              {categoryLabels[article.category]}
            </Badge>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-warmgray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-warmgray-600 mb-3 line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-warmgray-500">
            <div className="flex items-center space-x-3">
              {article.date && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(article.date).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {article.readingTime} min citire
              </span>
            </div>

            <span className="text-sm font-medium text-lavender-600">
              Citește →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}