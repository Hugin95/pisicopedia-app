import React from 'react';

interface BannerPlaceholderProps {
  size?: '300x250' | '728x90' | '970x250' | '320x50';
  className?: string;
}

export default function BannerPlaceholder({
  size = '300x250',
  className = '',
}: BannerPlaceholderProps) {
  const sizeClasses = {
    '300x250': 'w-[300px] h-[250px]',
    '728x90': 'w-[728px] h-[90px]',
    '970x250': 'w-[970px] h-[250px]',
    '320x50': 'w-[320px] h-[50px]',
  };

  return (
    <div className={`mx-auto overflow-hidden ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-lavender-100 to-rose-100 rounded-lg border-2 border-dashed border-warmgray-300 flex items-center justify-center`}
      >
        <div className="text-center p-4">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-warmgray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <p className="text-sm text-warmgray-600 font-medium">
            Spațiu publicitar disponibil
          </p>
          <p className="text-xs text-warmgray-500 mt-1">
            {size}
          </p>
        </div>
      </div>
    </div>
  );
}