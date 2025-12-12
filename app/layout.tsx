import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/constants";
import { generateWebsiteSchema, seoConfig } from "@/lib/seo-advanced";
import { generateOrganizationSchema } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pisicopedia.ro'),
  title: {
    default: 'Pisicopedia.ro - Enciclopedia #1 despre Pisici în România',
    template: `%s | Pisicopedia.ro`,
  },
  description: 'Ghidul complet despre pisici: 30+ rase detaliate, 50+ articole medicale verificate, sfaturi de îngrijire și nutriție. Portal #1 despre pisici în România.',
  keywords: [
    "pisici romania",
    "rase pisici romanesti",
    "pisica domestica",
    "sanatate pisici",
    "boli pisici simptome",
    "ingrijire pisici apartament",
    "adoptie pisici bucuresti",
    "veterinar pisici bucuresti",
    "hrana pisici recomandari",
    "pisici british shorthair",
    "pisici persane pret",
    "pisici maine coon romania",
    "pisici bengal romania",
    "pisici sfinx romania",
    "tratament pisici",
    "vaccinuri pisici",
    "sterilizare pisici pret",
    "deparazitare pisici",
    "medicina veterinara pisici",
    "comportament pisici",
  ],
  authors: [{ name: 'Pisicopedia Team' }],
  creator: 'Pisicopedia Romania',
  publisher: 'Pisicopedia Romania',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: 'Pisicopedia.ro - Enciclopedia #1 despre Pisici în România',
    description: 'Ghidul complet despre pisici: 30+ rase detaliate, 50+ articole medicale verificate, sfaturi de îngrijire și nutriție.',
    images: [
      {
        url: `${seoConfig.siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pisicopedia - Enciclopedia pisicilor din România',
        type: 'image/jpeg',
      },
      {
        url: `${seoConfig.siteUrl}/images/og-image-square.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Pisicopedia Romania',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: '@pisicopedia',
    creator: "@pisicopedia",
    title: 'Pisicopedia.ro - Tot despre pisici',
    description: 'Ghidul complet despre pisici în România: rase, sănătate, îngrijire',
    images: {
      url: `${seoConfig.siteUrl}/images/og-image.jpg`,
      alt: 'Pisicopedia Romania',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      'ro-RO': seoConfig.siteUrl,
      'ro': seoConfig.siteUrl,
    },
    types: {
      'application/rss+xml': `${seoConfig.siteUrl}/feed.xml`,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    other: {
      'msvalidate.01': 'bing-verification-code',
      'y_key': 'yahoo-verification-code',
    },
  },
  category: 'pets',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'Pisicopedia Romania',
  referrer: 'origin-when-cross-origin',
  appleWebApp: {
    title: 'Pisicopedia',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate comprehensive Schema.org data
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.organization.name,
    url: seoConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: seoConfig.organization.logo,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-XXX-XXX-XXX',
      contactType: 'customer support',
      areaServed: 'RO',
      availableLanguage: ['Romanian'],
    },
    sameAs: [
      seoConfig.social.facebook,
      seoConfig.social.instagram,
      seoConfig.social.youtube,
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressLocality: 'București',
      postalCode: '010101',
    },
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Pisicopedia Team',
    },
    description: seoConfig.description,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Acasă',
        item: seoConfig.siteUrl,
      },
    ],
  };

  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
