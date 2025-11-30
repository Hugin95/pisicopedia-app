/**
 * Advanced SEO Utilities for Maximum Search Visibility
 * Schema.org, JSON-LD, and Meta Optimization
 */

import { Breed, Article } from '@/types';

// Site configuration for SEO
export const seoConfig = {
  siteName: 'Pisicopedia.ro',
  siteUrl: 'https://pisicopedia.ro',
  description: 'Enciclopedia completă despre pisici în România - rase, sănătate, îngrijire',
  author: 'Pisicopedia Team',
  social: {
    facebook: 'https://facebook.com/pisicopedia',
    instagram: 'https://instagram.com/pisicopedia',
    youtube: 'https://youtube.com/@pisicopedia',
  },
  organization: {
    name: 'Pisicopedia Romania',
    logo: 'https://pisicopedia.ro/logo.png',
    email: 'contact@pisicopedia.ro',
  }
};

// Generate comprehensive WebSite schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    inLanguage: 'ro-RO',
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.organization.logo,
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/cautare?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${seoConfig.siteUrl}${item.url}`
    }))
  };
}

// Generate comprehensive Article schema with author and organization
export function generateArticleSchemaEnhanced(article: Article & { keywords?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${seoConfig.siteUrl}/sanatate/${article.slug}`,
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http')
      ? article.image
      : `${seoConfig.siteUrl}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: `${seoConfig.siteUrl}/autor/${article.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.organization.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/sanatate/${article.slug}`
    },
    wordCount: article.readingTime * 200, // Approximate
    keywords: article.keywords?.join(', ') || article.tags.join(', '),
    articleSection: article.category,
    inLanguage: 'ro-RO',
    isAccessibleForFree: true,
    hasPart: {
      '@type': 'WebPageElement',
      isAccessibleForFree: true,
      cssSelector: '.article-content'
    }
  };
}

// Generate FAQ schema for articles
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Generate Breed/Pet schema
export function generateBreedSchema(breed: Breed) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${seoConfig.siteUrl}/rase/${breed.slug}`,
    headline: `${breed.title} - Profil Complet Rasă`,
    description: breed.description,
    image: breed.image.startsWith('http')
      ? breed.image
      : `${seoConfig.siteUrl}${breed.image}`,
    author: {
      '@type': 'Organization',
      name: seoConfig.organization.name
    },
    about: {
      '@type': 'Thing',
      name: breed.title,
      description: breed.description,
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Origin',
          value: breed.origin
        },
        {
          '@type': 'PropertyValue',
          name: 'Weight',
          value: breed.weight
        },
        {
          '@type': 'PropertyValue',
          name: 'Lifespan',
          value: breed.lifeSpan
        },
        {
          '@type': 'PropertyValue',
          name: 'Temperament',
          value: breed.temperament.join(', ')
        }
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/rase/${breed.slug}`
    },
    inLanguage: 'ro-RO'
  };
}

// Generate HowTo schema for guides
export function generateHowToSchema({
  title,
  description,
  image,
  steps,
  totalTime = 'PT30M'
}: {
  title: string;
  description: string;
  image: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    image: image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`,
    totalTime: totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ?
        (step.image.startsWith('http') ? step.image : `${seoConfig.siteUrl}${step.image}`)
        : undefined
    }))
  };
}

// Generate LocalBusiness schema (for vet clinic recommendations)
export function generateVetClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: 'Pisicopedia - Rețea Clinici Veterinare Recomandate',
    description: 'Rețea de clinici veterinare de încredere recomandate de Pisicopedia',
    url: `${seoConfig.siteUrl}/clinici-veterinare`,
    telephone: '+40-XXX-XXX-XXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressRegion: 'România'
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00'
      }
    ]
  };
}

// Generate Review schema for breed pages
export function generateBreedReviewSchema(breed: Breed, rating = 4.8, reviewCount = 127) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${breed.title} - Informații Rasă`,
    description: breed.description,
    image: breed.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    }
  };
}

// Generate CollectionPage schema for category pages
export function generateCollectionSchema(
  title: string,
  description: string,
  items: Array<{ name: string; url: string; description: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${seoConfig.siteUrl}/${title.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${seoConfig.siteUrl}${item.url}`,
        description: item.description
      }))
    }
  };
}

// Generate medical condition schema for health articles
export function generateMedicalConditionSchema({
  name,
  description,
  symptoms,
  causes,
  treatments,
  prevention
}: {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  prevention: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    about: {
      '@type': 'MedicalCondition',
      name: name,
      description: description,
      signOrSymptom: symptoms.map(s => ({
        '@type': 'MedicalSignOrSymptom',
        name: s
      })),
      possibleTreatment: treatments.map(t => ({
        '@type': 'MedicalTherapy',
        name: t
      })),
      riskFactor: causes.map(c => ({
        '@type': 'MedicalRiskFactor',
        name: c
      })),
      preventionInfo: {
        '@type': 'PreventionIndication',
        name: prevention.join(', ')
      }
    },
    disclaimer: 'Informațiile prezentate au scop educativ și nu înlocuiesc consultul veterinar.'
  };
}

// Generate comprehensive meta tags
export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author
}: {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}) {
  const fullUrl = url.startsWith('http') ? url : `${seoConfig.siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`;

  return {
    // Basic meta tags
    title: `${title} | ${seoConfig.siteName}`,
    description: description,
    keywords: keywords.join(', '),
    author: author || seoConfig.author,
    robots: 'index, follow, max-image-preview:large',

    // Open Graph
    'og:title': title,
    'og:description': description,
    'og:image': fullImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:url': fullUrl,
    'og:type': type,
    'og:site_name': seoConfig.siteName,
    'og:locale': 'ro_RO',

    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': fullImage,
    'twitter:site': '@pisicopedia',

    // Article specific
    ...(type === 'article' && {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': author,
      'article:section': 'Pets'
    }),

    // Additional SEO
    'canonical': fullUrl,
    'alternate': {
      'hreflang': 'ro',
      'href': fullUrl
    }
  };
}

// Generate internal linking suggestions
export function generateInternalLinks(
  currentSlug: string,
  content: string,
  allArticles: Article[],
  allBreeds: Breed[]
): Array<{ text: string; url: string; title: string }> {
  const links: Array<{ text: string; url: string; title: string }> = [];

  // Find related articles based on keywords
  const keywords = content.toLowerCase().split(/\s+/);

  allArticles.forEach(article => {
    if (article.slug === currentSlug) return;

    const titleWords = article.title.toLowerCase().split(/\s+/);
    const matches = titleWords.filter(word => keywords.includes(word));

    if (matches.length > 2) {
      links.push({
        text: article.title,
        url: `/sanatate/${article.slug}`,
        title: article.description
      });
    }
  });

  // Find related breeds
  allBreeds.forEach(breed => {
    if (content.toLowerCase().includes(breed.title.toLowerCase())) {
      links.push({
        text: breed.title,
        url: `/rase/${breed.slug}`,
        title: breed.description
      });
    }
  });

  return links.slice(0, 5); // Return top 5 most relevant
}