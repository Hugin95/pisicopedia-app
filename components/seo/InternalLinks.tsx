import Link from 'next/link';
import { sampleBreeds, sampleArticles } from '@/lib/data';

interface InternalLink {
  text: string;
  href: string;
  title: string;
  type: 'breed' | 'article' | 'category';
}

interface InternalLinksProps {
  currentSlug?: string;
  context?: 'breed' | 'article';
  maxLinks?: number;
}

export default function InternalLinks({
  currentSlug,
  context = 'article',
  maxLinks = 5
}: InternalLinksProps) {
  // Generate smart internal links based on context
  const generateLinks = (): InternalLink[] => {
    const links: InternalLink[] = [];

    // Add popular breeds
    const popularBreeds = sampleBreeds
      .filter((b: any) => b.slug !== currentSlug)
      .slice(0, 3)
      .map((breed: any) => ({
        text: breed.title,
        href: `/rase/${breed.slug}`,
        title: `Descoperă rasa ${breed.title}`,
        type: 'breed' as const,
      }));

    // Add related articles
    const relatedArticles = sampleArticles
      .filter((a: any) => a.slug !== currentSlug)
      .slice(0, 2)
      .map((article: any) => ({
        text: article.title,
        href: `/sanatate/${article.slug}`,
        title: article.description,
        type: 'article' as const,
      }));

    // Add category links
    const categoryLinks: InternalLink[] = [
      {
        text: 'Toate rasele de pisici',
        href: '/rase',
        title: 'Explorează toate rasele de pisici',
        type: 'category',
      },
      {
        text: 'Articole despre sănătate',
        href: '/sanatate',
        title: 'Citește ghiduri medicale pentru pisici',
        type: 'category',
      },
    ];

    // Mix links based on context
    if (context === 'breed') {
      links.push(...popularBreeds, ...relatedArticles.slice(0, 1), ...categoryLinks.slice(0, 1));
    } else {
      links.push(...relatedArticles, ...popularBreeds.slice(0, 2), ...categoryLinks.slice(0, 1));
    }

    return links.slice(0, maxLinks);
  };

  const links = generateLinks();

  return (
    <div className="bg-lavender-50 rounded-2xl p-6 mt-8">
      <h3 className="text-lg font-bold text-warmgray-900 mb-4">
        Articole Recomandate
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href} className="flex items-start">
            <span className="text-lavender-500 mr-2">→</span>
            <Link
              href={link.href}
              title={link.title}
              className="text-warmgray-700 hover:text-lavender-600 transition-colors underline-offset-2 hover:underline"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Smart content linker for automatic internal linking
export function autoLinkContent(content: string, currentSlug?: string): string {
  let linkedContent = content;

  // Link breed names
  sampleBreeds.forEach((breed: any) => {
    if (breed.slug === currentSlug) return;

    const regex = new RegExp(`\\b(${breed.title})\\b`, 'gi');
    const replacement = `<a href="/rase/${breed.slug}" title="Află mai multe despre ${breed.title}" class="text-lavender-600 hover:underline">$1</a>`;

    // Only link first occurrence
    let count = 0;
    linkedContent = linkedContent.replace(regex, (match: string) => {
      if (count === 0) {
        count++;
        return replacement.replace('$1', match);
      }
      return match;
    });
  });

  // Link medical terms to relevant articles
  const medicalTerms = [
    { term: 'vaccin', slug: 'vaccinarea-pisicilor-ghid-complet' },
    { term: 'deparazitare', slug: 'deparazitarea-pisicilor-tipuri-si-frecventa' },
    { term: 'strănută', slug: 'pisica-stranuta-cauze-si-tratament' },
    { term: 'FIV', slug: 'fiv-la-pisici-simptome-si-ingrijire' },
    { term: 'diaree', slug: 'diaree-la-pisici-cauze-si-solutii' },
    { term: 'vomită', slug: 'voma-la-pisici-cand-este-urgenta' },
  ];

  medicalTerms.forEach(({ term, slug }) => {
    if (slug === currentSlug) return;

    const article = sampleArticles.find((a: any) => a.slug === slug);
    if (!article) return;

    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    const replacement = `<a href="/sanatate/${slug}" title="${article.title}" class="text-lavender-600 hover:underline">$1</a>`;

    // Only link first occurrence
    let count = 0;
    linkedContent = linkedContent.replace(regex, (match: string) => {
      if (count === 0) {
        count++;
        return replacement.replace('$1', match);
      }
      return match;
    });
  });

  return linkedContent;
}

// Breadcrumb component for SEO
export function Breadcrumbs({
  items
}: {
  items: Array<{ name: string; href?: string }>
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-warmgray-600">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-warmgray-400">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-lavender-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-warmgray-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Related content suggestions
export function RelatedContent({
  type,
  currentSlug,
  category,
  limit = 3
}: {
  type: 'breed' | 'article';
  currentSlug: string;
  category?: string;
  limit?: number;
}) {
  const getRelated = () => {
    if (type === 'breed') {
      return sampleBreeds
        .filter((b: any) => b.slug !== currentSlug)
        .filter((b: any) => !category || b.category === category)
        .slice(0, limit);
    } else {
      return sampleArticles
        .filter((a: any) => a.slug !== currentSlug)
        .filter((a: any) => !category || a.category === category)
        .slice(0, limit);
    }
  };

  const related = getRelated();
  const basePath = type === 'breed' ? '/rase' : '/sanatate';

  return (
    <section className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
        {type === 'breed' ? 'Rase Similare' : 'Articole Similare'}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group block"
          >
            <article className="bg-white rounded-xl shadow-sm p-6 h-full hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-warmgray-900 group-hover:text-lavender-600 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-warmgray-600 text-sm line-clamp-3">
                {item.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}