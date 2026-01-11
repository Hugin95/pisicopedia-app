import Link from 'next/link';

interface RelatedLink {
  title: string;
  href: string;
  type: 'breed' | 'article' | 'guide';
}

interface Props {
  category: string;
  currentSlug: string;
}

// Mapping of guide categories to related content
const categoryLinks: Record<string, RelatedLink[]> = {
  'ghid-cumparare': [
    { title: 'Maine Coon', href: '/rase/maine-coon', type: 'breed' },
    { title: 'British Shorthair', href: '/rase/british-shorthair', type: 'breed' },
    { title: 'Ragdoll', href: '/rase/ragdoll', type: 'breed' },
    { title: 'Pregătirea casei pentru pisica ta', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Prima vizită la veterinar', href: '/ghiduri/prima-vizita-veterinar', type: 'guide' },
  ],
  'ghid-ingrijire': [
    { title: 'Igienă zilnică pentru pisici', href: '/ghiduri/igiena-zilnica', type: 'guide' },
    { title: 'Alegerea litierelor pentru pisici', href: '/ghiduri/alegere-litiera', type: 'guide' },
    { title: 'Jucării și îmbogățire pentru pisici', href: '/ghiduri/jucarii-imbogatire', type: 'guide' },
    { title: 'Amenajarea spațiului pentru pisici', href: '/ghiduri/amenajare-spatiu', type: 'guide' },
  ],
  'sanatate': [
    { title: 'Pisica vomită spumă albă dimineața', href: '/sanatate/pisica-vomita-spuma-alba-dimineata-cauze-si-solutii', type: 'article' },
    { title: 'Pisica nu a mâncat de 24 de ore', href: '/sanatate/pisica-nu-a-mancat-de-24-de-ore-cand-sa-te-ingrijorezi-si-ce-sa-faci', type: 'article' },
    { title: 'Calendar de vaccinare pentru pisici', href: '/ghiduri/calendar-vaccinare', type: 'guide' },
    { title: 'Ghid deparazitare pisici', href: '/ghiduri/ghid-deparazitare', type: 'guide' },
    { title: 'Controale veterinare regulate', href: '/ghiduri/controale-veterinare', type: 'guide' },
  ],
  'nutritie': [
    { title: 'Hrană uscată vs hrană umedă', href: '/ghiduri/hrana-uscata-vs-umeda', type: 'guide' },
    { title: 'Calcularea porțiilor pentru pisici', href: '/ghiduri/calculare-portii', type: 'guide' },
    { title: 'Alimente periculoase pentru pisici', href: '/ghiduri/alimente-periculoase', type: 'guide' },
    { title: 'Diete speciale pentru pisici', href: '/ghiduri/diete-speciale', type: 'guide' },
    { title: 'Nutriție pentru pisici seniori', href: '/ghiduri/nutritie-senior', type: 'guide' },
  ],
  'comportament': [
    { title: 'Limbajul corporal al pisicilor', href: '/ghiduri/limbaj-pisica', type: 'guide' },
    { title: 'Dresajul pisicilor', href: '/ghiduri/dresaj-pisica', type: 'guide' },
    { title: 'Probleme de comportament', href: '/ghiduri/probleme-comportament', type: 'guide' },
    { title: 'Socializarea puilor de pisică', href: '/ghiduri/socializare-pui', type: 'guide' },
  ],
  'pui': [
    { title: 'Pui de pisică nou-născuți', href: '/ghiduri/pui-nou-nascuti', type: 'guide' },
    { title: 'Întărcare pui de pisică', href: '/ghiduri/intarcare-pui', type: 'guide' },
    { title: 'Socializarea puilor', href: '/ghiduri/socializare-pui', type: 'guide' },
    { title: 'Pregătirea casei pentru pisică', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Prima vizită la veterinar', href: '/ghiduri/prima-vizita-veterinar', type: 'guide' },
  ],
  'senior': [
    { title: 'Îngrijirea pisicilor seniori', href: '/ghiduri/ingrijire-senior', type: 'guide' },
    { title: 'Nutriție pentru pisici seniori', href: '/ghiduri/nutritie-senior', type: 'guide' },
    { title: 'Probleme de sănătate la pisici seniori', href: '/ghiduri/probleme-senior', type: 'guide' },
    { title: 'Adaptarea casei pentru pisici în vârstă', href: '/ghiduri/adaptare-casa-senior', type: 'guide' },
  ],
};

const typeIcons = {
  breed: '🐱',
  article: '📝',
  guide: '📖',
};

const typeLabels = {
  breed: 'Rasă',
  article: 'Articol',
  guide: 'Ghid',
};

export default function GuideRelatedLinks({ category, currentSlug }: Props) {
  const links = categoryLinks[category] || [];
  
  // Filter out current guide
  const filteredLinks = links.filter(link => 
    !link.href.includes(currentSlug)
  );

  if (filteredLinks.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-lavender-50 to-rose-50 rounded-2xl p-8 mt-8">
      <h3 className="text-2xl font-bold text-warmgray-900 mb-4 flex items-center gap-2">
        <span>🔗</span>
        <span>Resurse utile conexe</span>
      </h3>
      <p className="text-warmgray-600 mb-6">
        Explorează și alte resurse relevante pentru îngrijirea pisicii tale:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 border border-warmgray-100"
          >
            <div className="flex-shrink-0 text-2xl">
              {typeIcons[link.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-lavender-600 uppercase tracking-wider mb-1">
                {typeLabels[link.type]}
              </div>
              <div className="font-medium text-warmgray-900 group-hover:text-lavender-600 transition-colors line-clamp-2">
                {link.title}
              </div>
            </div>
            <svg
              className="w-5 h-5 text-warmgray-400 group-hover:text-lavender-600 group-hover:translate-x-1 transition-all flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
      
      {/* CTA to explore more */}
      <div className="mt-6 pt-6 border-t border-warmgray-200 flex flex-wrap gap-4 justify-center">
        <Link
          href="/rase"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-all text-sm font-medium text-warmgray-700 hover:text-lavender-600"
        >
          <span>🐱</span>
          <span>Toate rasele</span>
        </Link>
        <Link
          href="/sanatate"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-all text-sm font-medium text-warmgray-700 hover:text-lavender-600"
        >
          <span>📝</span>
          <span>Articole sănătate</span>
        </Link>
        <Link
          href="/ghiduri"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-all text-sm font-medium text-warmgray-700 hover:text-lavender-600"
        >
          <span>📖</span>
          <span>Toate ghidurile</span>
        </Link>
      </div>
    </div>
  );
}

