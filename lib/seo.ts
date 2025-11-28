/**
 * SEO Configuration and Utilities
 */

import { Metadata } from 'next';

export const siteConfig = {
  name: 'Pisicopedia.ro',
  description: 'Enciclopedia completă despre pisici - rase, sănătate și îngrijire',
  url: 'https://pisicopedia.ro',
  author: 'Pisicopedia.ro',
  email: 'contact@pisicopedia.ro',
  social: {
    facebook: 'https://facebook.com/pisicopedia',
    instagram: 'https://instagram.com/pisicopedia',
  },
  keywords: [
    'pisici',
    'rase pisici',
    'sanatate pisici',
    'ingrijire pisici',
    'pisici romania',
    'enciclopedie pisici',
    'veterinar pisici',
    'boli pisici',
    'nutritie pisici',
  ],
};

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
}): Metadata {
  const finalTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Enciclopedia Pisicilor`;

  const finalDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image || `${siteConfig.url}/images/og-default.jpg`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: 'ro_RO',
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate JSON-LD structured data
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/cautare?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${image}`,
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Component to inject JSON-LD
export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}