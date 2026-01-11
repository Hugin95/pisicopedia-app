import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nume pentru Pisici - Peste 100 de Idei cu Semnificații | Pisicopedia',
  description: 'Găsește numele perfect pentru noua ta pisică! Colecție de peste 100 de nume cu semnificații: populare, românești, după personalitate și culoare.',
  keywords: 'nume pisici, nume pentru pisici, nume pisici femele, nume motani, nume românești pisici, idei nume pisici',
  openGraph: {
    title: 'Nume pentru Pisici - Peste 100 de Idei cu Semnificații',
    description: 'Găsește numele perfect pentru noua ta pisică! Colecție de peste 100 de nume cu semnificații pentru toate gusturile.',
    url: 'https://pisicopedia.ro/nume-pisici',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/nume-pisici',
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

export default function NumePisiciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

