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

// Comprehensive mapping of guide categories to related content (SEO optimized with 6+ links per category)
const categoryLinks: Record<string, RelatedLink[]> = {
  'ghid-cumparare': [
    { title: 'Maine Coon', href: '/rase/maine-coon', type: 'breed' },
    { title: 'British Shorthair', href: '/rase/british-shorthair', type: 'breed' },
    { title: 'Ragdoll', href: '/rase/ragdoll', type: 'breed' },
    { title: 'Pregătirea casei pentru pisica ta', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Prima vizită la veterinar', href: '/ghiduri/prima-vizita-veterinar', type: 'guide' },
  ],
  'ghid-ingrijire': [
    { title: 'Alegerea litierelor perfecte', href: '/ghiduri/alegere-litiera', type: 'guide' },
    { title: 'Pregătirea casei pentru pisică', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Amenajarea spațiului optim', href: '/ghiduri/amenajare-spatiu', type: 'guide' },
    { title: 'Igienă zilnică completă', href: '/ghiduri/igiena-zilnica', type: 'guide' },
    { title: 'Calendar de vaccinare', href: '/ghiduri/calendar-vaccinare', type: 'guide' },
    { title: 'Ghid deparazitare complet', href: '/ghiduri/ghid-deparazitare', type: 'guide' },
  ],
  'ghid-sanatate': [
    { title: 'Calendar de vaccinare complet', href: '/ghiduri/calendar-vaccinare', type: 'guide' },
    { title: 'Ghid deparazitare internă și externă', href: '/ghiduri/ghid-deparazitare', type: 'guide' },
    { title: 'Sterilizare: pro și contra', href: '/ghiduri/sterilizare-pro-contra', type: 'guide' },
    { title: 'Controale veterinare regulate', href: '/ghiduri/controale-veterinare', type: 'guide' },
    { title: 'Prima vizită la veterinar', href: '/ghiduri/prima-vizita-veterinar', type: 'guide' },
    { title: 'Pisica nu a mâncat de 24 ore', href: '/sanatate/pisica-nu-a-mancat-de-24-de-ore-cand-sa-te-ingrijorezi-si-ce-sa-faci', type: 'article' },
    { title: 'Pisica vomită spumă albă', href: '/sanatate/pisica-vomita-spuma-alba-dimineata-cauze-si-solutii', type: 'article' },
  ],
  'ghid-nutritie': [
    { title: 'Hrană uscată vs umedă: compară', href: '/ghiduri/hrana-uscata-vs-umeda', type: 'guide' },
    { title: 'Calcularea porțiilor corecte', href: '/ghiduri/calculare-portii', type: 'guide' },
    { title: 'Alimente TOXICE pentru pisici', href: '/ghiduri/alimente-periculoase', type: 'guide' },
    { title: 'Diete speciale medicale', href: '/ghiduri/diete-speciale', type: 'guide' },
    { title: 'Nutriție pisici seniori', href: '/ghiduri/nutritie-senior', type: 'guide' },
    { title: 'Înțărcarea puilor pas cu pas', href: '/ghiduri/intarcare-pui', type: 'guide' },
    { title: 'Pisica nu bea apă - urgent', href: '/sanatate/pisica-nu-bea-apa-ce-sa-faci-urgent', type: 'article' },
  ],
  'ghid-comportament': [
    { title: 'Limbajul corporal complet', href: '/ghiduri/limbaj-pisica', type: 'guide' },
    { title: 'Dresajul pisicilor - tehnici', href: '/ghiduri/dresaj-pisica', type: 'guide' },
    { title: 'Probleme de comportament', href: '/ghiduri/probleme-comportament', type: 'guide' },
    { title: 'Jucării și îmbogățire mediu', href: '/ghiduri/jucarii-imbogatire', type: 'guide' },
    { title: 'Socializarea puilor corect', href: '/ghiduri/socializare-pui', type: 'guide' },
    { title: 'Pisica miaună excesiv noaptea', href: '/sanatate/pisica-miauna-excesiv-noaptea', type: 'article' },
    { title: 'Pisica se linge excesiv', href: '/sanatate/pisica-se-linge-excesiv-pana-se-jupuieste', type: 'article' },
  ],
  'ghid-pui': [
    { title: 'Pui nou-născuți - îngrijire 24/7', href: '/ghiduri/pui-nou-nascuti', type: 'guide' },
    { title: 'Înțărcarea puilor pas cu pas', href: '/ghiduri/intarcare-pui', type: 'guide' },
    { title: 'Socializarea corectă', href: '/ghiduri/socializare-pui', type: 'guide' },
    { title: 'Prima vizită la veterinar', href: '/ghiduri/prima-vizita-veterinar', type: 'guide' },
    { title: 'Pregătirea casei pentru pui', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Calendar vaccinare complet', href: '/ghiduri/calendar-vaccinare', type: 'guide' },
    { title: 'Hrană umedă pentru pui', href: '/ghiduri/hrana-uscata-vs-umeda', type: 'guide' },
  ],
  'ghid-senior': [
    { title: 'Îngrijirea pisicii senior', href: '/ghiduri/ingrijire-senior', type: 'guide' },
    { title: 'Probleme comune la seniori', href: '/ghiduri/probleme-senior', type: 'guide' },
    { title: 'Adaptarea casei pentru senior', href: '/ghiduri/adaptare-casa-senior', type: 'guide' },
    { title: 'Nutriție optimă pentru seniori', href: '/ghiduri/nutritie-senior', type: 'guide' },
    { title: 'Diete speciale medicale', href: '/ghiduri/diete-speciale', type: 'guide' },
    { title: 'Controale veterinare regulate', href: '/ghiduri/controale-veterinare', type: 'guide' },
    { title: 'Pisica doarme tot timpul', href: '/sanatate/pisica-doarme-tot-timpul-letargie', type: 'article' },
  ],

  // Ghiduri speciale practice
  'ghid-special': [
    { title: 'Călătorie cu pisica - transport sigur', href: '/ghiduri/calatorie-cu-pisica', type: 'guide' },
    { title: 'Pisică pierdută: acționează URGENT', href: '/ghiduri/pisica-pierduta-ghid-urgent', type: 'guide' },
    { title: 'Mutare/relocare fără stres', href: '/ghiduri/mutare-relocare-pisica', type: 'guide' },
    { title: 'Pregătirea casei pentru pisică', href: '/ghiduri/pregatire-casa-pisica', type: 'guide' },
    { title: 'Introducere pisică nouă', href: '/ghiduri/introducere-pisica-noua', type: 'guide' },
    { title: 'Îngrijire blană completă', href: '/ghiduri/ingrijire-blana-pisica', type: 'guide' },
    { title: 'Calendar de vaccinare', href: '/ghiduri/calendar-vaccinare', type: 'guide' },
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
