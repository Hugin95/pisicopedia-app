import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator Hrană Pisică - Calculează Porțiile Zilnice | Pisicopedia',
  description: 'Calculator precis pentru calcularea cantității zilnice de hrană pentru pisică. Personalizat după greutate, vârstă, activitate și stare de sănătate.',
  keywords: 'calculator hrană pisică, porții hrană pisică, cantitate hrană pisică, calculator nutriție pisică, kcal pisică',
  openGraph: {
    title: 'Calculator Hrană Pisică - Calculează Porțiile Zilnice',
    description: 'Calculator precis pentru calcularea cantității zilnice de hrană. Personalizat după greutate, vârstă și activitate.',
    url: 'https://pisicopedia.ro/tools/calculator-hrana',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/tools/calculator-hrana',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalculatorHranaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

