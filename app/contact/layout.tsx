import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Pisicopedia.ro',
  description: 'Contactați echipa Pisicopedia.ro pentru întrebări, sugestii sau colaborări. Răspundem în termen de 24-48 de ore lucrătoare.',
  keywords: 'contact pisicopedia, întrebări pisici, sugestii articole, colaborare pisicopedia',
  openGraph: {
    title: 'Contact | Pisicopedia.ro',
    description: 'Contactați echipa Pisicopedia.ro pentru întrebări, sugestii sau colaborări.',
    url: 'https://pisicopedia.ro/contact',
    siteName: 'Pisicopedia.ro',
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://pisicopedia.ro/contact',
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

