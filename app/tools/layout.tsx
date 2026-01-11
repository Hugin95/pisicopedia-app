import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools Interactive pentru Pisici - Calculatoare și Utilitare | Pisicopedia',
  description: 'Tools interactive pentru pisici: calculator vârstă, calculator hrană, calculator greutate ideală, găsește rasa potrivită. Utilitare gratuite pentru proprietarii de pisici.',
  keywords: 'tools pisici, calculatoare pisici, calculator vârstă pisică, calculator hrană pisică, calculator greutate pisică, rasa potrivită pisică',
  openGraph: {
    title: 'Tools Interactive pentru Pisici - Calculatoare și Utilitare',
    description: 'Tools interactive gratuite pentru pisici: calculator vârstă, calculator hrană, calculator greutate ideală și multe altele.',
    url: 'https://pisicopedia.ro/tools',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/tools',
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

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

