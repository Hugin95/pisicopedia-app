import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ghiduri Complete pentru Pisici - Îngrijire, Sănătate, Nutriție | Pisicopedia',
  description: 'Ghiduri detaliate pentru îngrijirea pisicilor: vaccinare, deparazitare, sterilizare, nutriție, comportament și multe altele. Sfaturi de la experți veterinari.',
  keywords: 'ghiduri pisici, îngrijire pisici, vaccinare pisici, nutriție pisici, comportament pisici, sfaturi pisici',
  openGraph: {
    title: 'Ghiduri Complete pentru Pisici',
    description: 'Ghiduri detaliate pentru îngrijirea pisicilor: vaccinare, deparazitare, sterilizare, nutriție și multe altele.',
    url: 'https://pisicopedia.ro/ghiduri',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/ghiduri',
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

export default function GhiduriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

