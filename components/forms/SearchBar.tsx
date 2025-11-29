'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Caută rase, simptome sau articole...',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Caută în Pisicopedia"
          className="w-full px-5 py-3 pl-12 pr-4 text-warmgray-900 bg-white border border-warmgray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warmgray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <button
          type="submit"
          aria-label="Execută căutarea"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-lavender-500 text-white text-sm font-medium rounded-full hover:bg-lavender-600 transition-colors duration-200"
        >
          Caută
        </button>
      </div>
    </form>
  );
}