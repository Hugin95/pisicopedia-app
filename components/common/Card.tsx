import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-soft ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}