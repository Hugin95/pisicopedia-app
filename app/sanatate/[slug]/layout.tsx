import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const { data: article } = await supabaseAdmin
      .from('articles')
      .select('title, description, image_url, category, keywords, created_at')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!article) {
      return {
        title: 'Articol negăsit - Pisicopedia',
        description: 'Articolul căutat nu a fost găsit.',
      };
    }

    const title = `${article.title} | Sănătate Pisici - Pisicopedia`;
    const description = article.description || article.title;
    const imageUrl = article.image_url 
      ? (article.image_url.startsWith('http') ? article.image_url : `https://pisicopedia.ro${article.image_url}`)
      : `https://pisicopedia.ro/images/articles/${slug}.jpg`;

    return {
      title,
      description,
      keywords: article.keywords?.join(', ') || `${article.title}, sănătate pisici, ${article.category}`,
      openGraph: {
        title: article.title,
        description,
        url: `https://pisicopedia.ro/sanatate/${slug}`,
        siteName: 'Pisicopedia.ro',
        locale: 'ro_RO',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        publishedTime: article.created_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://pisicopedia.ro/sanatate/${slug}`,
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
  } catch (error) {
    return {
      title: 'Articol - Pisicopedia',
      description: 'Articol despre sănătatea pisicilor.',
    };
  }
}

export default function SanatateSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

