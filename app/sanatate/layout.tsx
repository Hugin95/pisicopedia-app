import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sănătate Pisici - Simptome, Boli, Prevenție | Pisicopedia',
  description: 'Ghid complet de sănătate pentru pisici: simptome de boală, boli comune, prevenție și tratamente. Informații medicale verificate de veterinari.',
  keywords: 'sănătate pisici, boli pisici, simptome pisici, veterinar pisici, îngrijire medicală pisici',
  openGraph: {
    title: 'Sănătate Pisici - Simptome, Boli, Prevenție',
    description: 'Ghid complet de sănătate pentru pisici: simptome de boală, boli comune, prevenție și tratamente verificate de veterinari.',
    url: 'https://pisicopedia.ro/sanatate',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/sanatate',
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

export default function SanatateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

