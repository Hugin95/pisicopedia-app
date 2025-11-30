// Main TypeScript Type Definitions for Pisicopedia

export interface Breed {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  thumbnail: string;

  // Metadata
  origin: string;
  weight: string;
  lifeSpan: string;
  temperament: string[];
  activityLevel: number; // 1-5
  healthConcerns: string[];
  shedding: 'low' | 'medium' | 'high' | 'very-high';
  grooming: 'low' | 'medium' | 'high';
  category: 'shorthaired' | 'longhaired' | 'hairless';
  size: 'small' | 'medium' | 'large';
  tags: string[];

  // Content sections
  generalDescription?: string;
  physicalAppearance?: string;
  personality?: string;
  careNeeds?: string;
  healthProfile?: string;
  suitableFor?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: 'symptoms' | 'diseases' | 'prevention' | 'procedures' | 'nutrition' | 'behavior' | 'simptome' | 'boli' | 'preventie' | 'proceduri' | 'nutritie' | 'comportament' | 'ingrijire' | 'ghiduri';
  description: string;
  excerpt?: string;
  image: string;
  author?: string;
  date?: string;
  readingTime: number; // in minutes
  tags?: string[];
  content?: string;
  featured?: boolean;

  // Medical article specific
  symptoms?: string[];
  causes?: string[];
  treatment?: string[];
  prevention?: string[];
  whenToSeeVet?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: 'medical' | 'care' | 'lifecycle' | 'ghid-cumparare' | 'ghid-ingrijire';
  image: string;
  icon?: string;
  readingTime: number;
  steps?: GuideStep[];
  checkpoints?: string[];
  tags?: string[];
  content?: string;
}

export interface GuideStep {
  number: number;
  title: string;
  description: string;
  warning?: string;
}

export interface Name {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'unisex';
  origin: string;
  meaning?: string;
  popularity?: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface SearchResult {
  type: 'breed' | 'article' | 'guide';
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  disclaimer: string;
}

export interface BannerPlacement {
  id: string;
  size: '300x250' | '728x90' | '970x250' | '320x50';
  position: 'sidebar' | 'header' | 'article' | 'footer';
}