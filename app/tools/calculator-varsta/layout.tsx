import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator Vârstă Pisică - Câți Ani Oameni Are Pisica Ta? | Pisicopedia',
  description: 'Calculator precis pentru conversia vârstei pisicii în ani oameni. Află câți ani oameni are pisica ta folosind formula științifică recunoscută de veterinar.',
  keywords: 'calculator vârstă pisică, ani oameni pisică, vârstă pisică echivalent oameni, calculator pisică, vârstă pisică',
  openGraph: {
    title: 'Calculator Vârstă Pisică - Câți Ani Oameni Are Pisica Ta?',
    description: 'Calculator precis pentru conversia vârstei pisicii în ani oameni. Formula științifică recunoscută.',
    url: 'https://pisicopedia.ro/tools/calculator-varsta',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/tools/calculator-varsta',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalculatorVarstaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

