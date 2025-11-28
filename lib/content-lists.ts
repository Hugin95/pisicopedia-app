/**
 * Content Lists for Pisicopedia.ro
 * Complete lists of breeds and health topics to be generated
 */

export interface BreedInfo {
  slug: string;
  name: string;
  origin: string;
  similar?: string[]; // Similar breeds for internal linking
}

export interface ArticleInfo {
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  related?: string[]; // Related articles for internal linking
}

// Complete list of 30 cat breeds important for Romania/Europe
export const allBreeds: BreedInfo[] = [
  // First 10 - to be implemented immediately
  { slug: 'persana', name: 'Pisica Persană', origin: 'Iran', similar: ['exotic-shorthair', 'himalayan', 'ragdoll'] },
  { slug: 'british-shorthair', name: 'British Shorthair', origin: 'Marea Britanie', similar: ['scottish-fold', 'chartreux', 'russian-blue'] },
  { slug: 'maine-coon', name: 'Maine Coon', origin: 'SUA', similar: ['norvegiana', 'siberiana', 'ragdoll'] },
  { slug: 'siameza', name: 'Pisica Siameză', origin: 'Thailanda', similar: ['balineza', 'birmaneza', 'oriental-shorthair'] },
  { slug: 'ragdoll', name: 'Ragdoll', origin: 'SUA', similar: ['birmaneza', 'persana', 'maine-coon'] },
  { slug: 'sfinx', name: 'Sfinx', origin: 'Canada', similar: ['peterbald', 'devon-rex', 'cornish-rex'] },
  { slug: 'norvegiana', name: 'Pisica Norvegiană de Pădure', origin: 'Norvegia', similar: ['maine-coon', 'siberiana', 'ragdoll'] },
  { slug: 'bengaleza', name: 'Pisica Bengaleză', origin: 'SUA', similar: ['savannah', 'ocicat', 'abissiniana'] },
  { slug: 'scottish-fold', name: 'Scottish Fold', origin: 'Scoția', similar: ['british-shorthair', 'scottish-straight', 'chartreux'] },
  { slug: 'europeana', name: 'Pisica Europeană', origin: 'Europa', similar: ['domestica-cu-par-scurt', 'chartreux', 'british-shorthair'] },

  // Next 20 - to be implemented gradually
  { slug: 'russian-blue', name: 'Russian Blue', origin: 'Rusia', similar: ['chartreux', 'british-shorthair', 'korat'] },
  { slug: 'birmaneza', name: 'Pisica Birmaneză', origin: 'Myanmar', similar: ['ragdoll', 'siameza', 'balineza'] },
  { slug: 'abissiniana', name: 'Pisica Abissiniană', origin: 'Etiopia', similar: ['somali', 'bengaleza', 'ocicat'] },
  { slug: 'devon-rex', name: 'Devon Rex', origin: 'Anglia', similar: ['cornish-rex', 'sfinx', 'peterbald'] },
  { slug: 'oriental-shorthair', name: 'Oriental Shorthair', origin: 'Thailanda', similar: ['siameza', 'balineza', 'javanese'] },
  { slug: 'exotic-shorthair', name: 'Exotic Shorthair', origin: 'SUA', similar: ['persana', 'british-shorthair', 'scottish-fold'] },
  { slug: 'siberiana', name: 'Pisica Siberiană', origin: 'Rusia', similar: ['maine-coon', 'norvegiana', 'ragdoll'] },
  { slug: 'turceasca-angora', name: 'Angora Turcească', origin: 'Turcia', similar: ['turceasca-van', 'persana', 'balineza'] },
  { slug: 'turceasca-van', name: 'Van Turcească', origin: 'Turcia', similar: ['turceasca-angora', 'norvegiana', 'maine-coon'] },
  { slug: 'chartreux', name: 'Chartreux', origin: 'Franța', similar: ['british-shorthair', 'russian-blue', 'korat'] },
  { slug: 'balineza', name: 'Pisica Balineză', origin: 'SUA', similar: ['siameza', 'birmaneza', 'oriental-shorthair'] },
  { slug: 'cornish-rex', name: 'Cornish Rex', origin: 'Anglia', similar: ['devon-rex', 'sfinx', 'peterbald'] },
  { slug: 'manx', name: 'Manx', origin: 'Insula Man', similar: ['cymric', 'bobtail-american', 'scottish-fold'] },
  { slug: 'himalayan', name: 'Himalayan', origin: 'SUA', similar: ['persana', 'exotic-shorthair', 'ragdoll'] },
  { slug: 'somali', name: 'Somali', origin: 'Somalia', similar: ['abissiniana', 'maine-coon', 'norvegiana'] },
  { slug: 'ocicat', name: 'Ocicat', origin: 'SUA', similar: ['bengaleza', 'abissiniana', 'savannah'] },
  { slug: 'peterbald', name: 'Peterbald', origin: 'Rusia', similar: ['sfinx', 'devon-rex', 'cornish-rex'] },
  { slug: 'savannah', name: 'Savannah', origin: 'SUA', similar: ['bengaleza', 'ocicat', 'abissiniana'] },
  { slug: 'korat', name: 'Korat', origin: 'Thailanda', similar: ['russian-blue', 'chartreux', 'british-shorthair'] },
  { slug: 'domestica-cu-par-scurt', name: 'Pisica Domestică cu Păr Scurt', origin: 'Global', similar: ['europeana', 'british-shorthair', 'chartreux'] }
];

// Complete list of 30 health articles
export const allArticles: ArticleInfo[] = [
  // First 10 - to be implemented immediately
  {
    slug: 'pisica-nu-mananca',
    title: 'De ce pisica mea nu mănâncă? Cauze și soluții',
    category: 'simptome',
    subcategory: 'apetit',
    related: ['pisica-vomita', 'pisica-letargica', 'deshidratare-pisici']
  },
  {
    slug: 'pisica-vomita',
    title: 'Pisica vomită: când este normal și când să mergi la veterinar',
    category: 'simptome',
    subcategory: 'digestive',
    related: ['pisica-nu-mananca', 'boala-inflamatorie-intestinala', 'intoxicatii-pisici']
  },
  {
    slug: 'pisica-stranutaa',
    title: 'Pisica strănută des: cauze și tratament',
    category: 'simptome',
    subcategory: 'respiratorii',
    related: ['rinotraheita-felina', 'alergii-pisici', 'calicivirus-felin']
  },
  {
    slug: 'insuficienta-renala',
    title: 'Insuficiența renală la pisici: ghid complet',
    category: 'boli',
    subcategory: 'cronice',
    related: ['analize-sange-pisici', 'alimentatie-renala', 'deshidratare-pisici']
  },
  {
    slug: 'diabet-pisici',
    title: 'Diabetul la pisici: simptome, diagnostic și tratament',
    category: 'boli',
    subcategory: 'endocrine',
    related: ['obezitate-pisici', 'alimentatie-diabet', 'insulina-pisici']
  },
  {
    slug: 'vaccinare-pisici',
    title: 'Ghid complet de vaccinare pentru pisici',
    category: 'preventie',
    subcategory: 'vaccinuri',
    related: ['calendar-vaccinal', 'reactii-adverse-vaccin', 'costuri-veterinare']
  },
  {
    slug: 'deparazitare-pisici',
    title: 'Deparazitarea internă și externă la pisici',
    category: 'preventie',
    subcategory: 'paraziți',
    related: ['purici-pisici', 'viermi-intestinali', 'capuse-pisici']
  },
  {
    slug: 'sterilizare-pisici',
    title: 'Sterilizarea pisicilor: avantaje, procedură și recuperare',
    category: 'proceduri',
    subcategory: 'chirurgie',
    related: ['castrare-motani', 'recuperare-post-operatorie', 'costuri-sterilizare']
  },
  {
    slug: 'analize-sange-pisici',
    title: 'Analizele de sânge la pisici: ce arată și când sunt necesare',
    category: 'proceduri',
    subcategory: 'diagnostic',
    related: ['hemoleucograma-pisici', 'biochimie-sanguina', 'insuficienta-renala']
  },
  {
    slug: 'stres-pisici',
    title: 'Stresul la pisici: cauze, simptome și management',
    category: 'comportament',
    subcategory: 'psihologic',
    related: ['anxietate-separare', 'feromoni-pisici', 'imbogatire-ambientala']
  },

  // Next 20 - to be implemented gradually
  { slug: 'rinotraheita-felina', title: 'Rinotraheita felină: simptome și tratament', category: 'boli', subcategory: 'respiratorii' },
  { slug: 'calicivirus-felin', title: 'Calicivirusul felin: prevenție și management', category: 'boli', subcategory: 'virale' },
  { slug: 'leucemie-felina', title: 'Leucemia felină (FeLV): diagnostic și îngrijire', category: 'boli', subcategory: 'virale' },
  { slug: 'peritonita-infectioasa', title: 'Peritonita infecțioasă felină (FIP)', category: 'boli', subcategory: 'virale' },
  { slug: 'hipertiroidism-pisici', title: 'Hipertiroidismul la pisicile bătrâne', category: 'boli', subcategory: 'endocrine' },
  { slug: 'boala-inflamatorie-intestinala', title: 'Boala inflamatorie intestinală la pisici', category: 'boli', subcategory: 'digestive' },
  { slug: 'astm-felin', title: 'Astmul felin: diagnostic și tratament', category: 'boli', subcategory: 'respiratorii' },
  { slug: 'cistita-idiopatica', title: 'Cistita idiopatică felină', category: 'boli', subcategory: 'urinare' },
  { slug: 'artrita-pisici', title: 'Artrita la pisicile bătrâne', category: 'boli', subcategory: 'locomotorii' },
  { slug: 'dermatita-alergica', title: 'Dermatita alergică la pisici', category: 'boli', subcategory: 'piele' },
  { slug: 'obezitate-pisici', title: 'Obezitatea la pisici: prevenție și tratament', category: 'nutritie', subcategory: 'management-greutate' },
  { slug: 'alimentatie-renala', title: 'Dieta pentru pisici cu probleme renale', category: 'nutritie', subcategory: 'diete-terapeutice' },
  { slug: 'hranire-pui-pisica', title: 'Cum să hrănești corect un pui de pisică', category: 'nutritie', subcategory: 'pui' },
  { slug: 'dinti-pisici', title: 'Îngrijirea dinților la pisici', category: 'preventie', subcategory: 'igiena' },
  { slug: 'ingrijire-blana', title: 'Îngrijirea blănii la pisici', category: 'ingrijire', subcategory: 'grooming' },
  { slug: 'taiere-gheare', title: 'Cum să tai corect ghearele pisicii', category: 'ingrijire', subcategory: 'gheare' },
  { slug: 'transport-pisici', title: 'Transportul în siguranță al pisicilor', category: 'ghiduri', subcategory: 'călătorii' },
  { slug: 'introducere-pisica-noua', title: 'Cum să introduci o pisică nouă în casă', category: 'comportament', subcategory: 'socializare' },
  { slug: 'agresivitate-pisici', title: 'Agresivitatea la pisici: cauze și soluții', category: 'comportament', subcategory: 'probleme' },
  { slug: 'marcaj-urina', title: 'Marcajul cu urină: cauze și prevenire', category: 'comportament', subcategory: 'probleme' }
];

// Helper function to get similar breeds
export function getSimilarBreeds(currentSlug: string, limit: number = 3): BreedInfo[] {
  const currentBreed = allBreeds.find(b => b.slug === currentSlug);
  if (!currentBreed || !currentBreed.similar) return [];

  return currentBreed.similar
    .slice(0, limit)
    .map(slug => allBreeds.find(b => b.slug === slug))
    .filter(Boolean) as BreedInfo[];
}

// Helper function to get related articles
export function getRelatedArticles(currentSlug: string, limit: number = 3): ArticleInfo[] {
  const currentArticle = allArticles.find(a => a.slug === currentSlug);

  // If has explicit related articles
  if (currentArticle?.related) {
    return currentArticle.related
      .slice(0, limit)
      .map(slug => allArticles.find(a => a.slug === slug))
      .filter(Boolean) as ArticleInfo[];
  }

  // Otherwise, get from same category/subcategory
  if (currentArticle) {
    return allArticles
      .filter(a =>
        a.slug !== currentSlug &&
        (a.category === currentArticle.category || a.subcategory === currentArticle.subcategory)
      )
      .slice(0, limit);
  }

  return [];
}