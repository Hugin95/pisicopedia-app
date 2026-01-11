import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rase de Pisici - Enciclopedie Completă | Pisicopedia',
  description: 'Descoperă toate rasele de pisici: caracteristici, temperament, îngrijire specifică. Ghid complet pentru alegerea rasei perfecte pentru tine.',
  keywords: 'rase pisici, pisici de rasă, rase populare pisici, caracteristici rase pisici, alegere rasă pisică',
  openGraph: {
    title: 'Rase de Pisici - Enciclopedie Completă',
    description: 'Descoperă toate rasele de pisici: caracteristici, temperament, îngrijire specifică pentru fiecare rasă.',
    url: 'https://pisicopedia.ro/rase',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/rase',
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

export default function RaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

