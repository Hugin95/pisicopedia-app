import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { Breed } from '@/types';
import { getImageSource } from '@/lib/image-utils';

interface BreedCardProps {
  breed: Breed;
  featured?: boolean;
}

export default function BreedCard({ breed, featured = false }: BreedCardProps) {
  return (
    <Link href={`/rase/${breed.slug}`}>
      <Card hover className="h-full">
        <div className="relative aspect-[4/3] -m-6 mb-4 overflow-hidden rounded-t-xl">
          <Image
            src={getImageSource(breed.image, 'breed')}
            alt={breed.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary">Popular</Badge>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-warmgray-900 mb-2">
          {breed.title}
        </h3>

        <p className="text-sm text-warmgray-600 mb-3 line-clamp-2">
          {breed.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-xs text-warmgray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {breed.origin}
          </div>
          <div className="flex items-center text-xs text-warmgray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {breed.lifeSpan}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xs text-warmgray-500 mr-2">Activitate:</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < breed.activityLevel
                      ? 'text-lavender-500'
                      : 'text-warmgray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <span className="text-sm font-medium text-lavender-600">
            Detalii →
          </span>
        </div>
      </Card>
    </Link>
  );
}