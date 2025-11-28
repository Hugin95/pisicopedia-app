// Sample data for initial development
import { Breed, Article, Guide } from '@/types';

export const sampleBreeds: Breed[] = [
  {
    slug: 'persiana',
    title: 'Pisica Persană',
    description: 'Pisica Persană este o rasă de pisică cu păr lung, cunoscută pentru aspectul său elegant și temperamentul calm.',
    shortDescription: 'Rasă elegantă cu păr lung și temperament calm, perfectă pentru viața de apartament.',
    image: '/images/breeds/persian.jpg',
    thumbnail: '/images/breeds/persian-thumb.jpg',
    origin: 'Persia (Iran)',
    weight: '3.5-5.5 kg',
    lifeSpan: '12-17 ani',
    temperament: ['Calm', 'Afectuos', 'Liniștit', 'Loial'],
    activityLevel: 2,
    healthConcerns: ['Probleme respiratorii', 'Probleme oculare', 'Boală renală polichistică'],
    shedding: 'very-high',
    grooming: 'high',
    category: 'longhaired',
    size: 'medium',
    tags: ['calm', 'indoor', 'family-friendly'],
  },
  {
    slug: 'british-shorthair',
    title: 'British Shorthair',
    description: 'British Shorthair este o rasă de pisică robustă cu un corp compact și o blană deasă și plușată.',
    shortDescription: 'Pisică robustă și calmă cu blană plușată, excelentă pentru familii.',
    image: '/images/breeds/british-shorthair.jpg',
    thumbnail: '/images/breeds/british-shorthair-thumb.jpg',
    origin: 'Marea Britanie',
    weight: '4-8 kg',
    lifeSpan: '12-20 ani',
    temperament: ['Calm', 'Loial', 'Independent', 'Prietenos'],
    activityLevel: 3,
    healthConcerns: ['Cardiomiopatie hipertrofică', 'Obezitate'],
    shedding: 'medium',
    grooming: 'low',
    category: 'shorthaired',
    size: 'large',
    tags: ['calm', 'family-friendly', 'easy-care'],
  },
  {
    slug: 'maine-coon',
    title: 'Maine Coon',
    description: 'Maine Coon este una dintre cele mai mari rase de pisici domestice, cunoscută pentru personalitatea sa prietenoasă.',
    shortDescription: 'Gigantul blând al lumii feline, perfect pentru familiile active.',
    image: '/images/breeds/maine-coon.jpg',
    thumbnail: '/images/breeds/maine-coon-thumb.jpg',
    origin: 'Statele Unite',
    weight: '6-11 kg',
    lifeSpan: '10-15 ani',
    temperament: ['Prietenos', 'Jucăuș', 'Inteligent', 'Social'],
    activityLevel: 4,
    healthConcerns: ['Displazie de șold', 'Cardiomiopatie hipertrofică', 'Atrofie musculară spinală'],
    shedding: 'high',
    grooming: 'medium',
    category: 'longhaired',
    size: 'large',
    tags: ['active', 'family-friendly', 'social'],
  },
  {
    slug: 'siameza',
    title: 'Pisica Siameză',
    description: 'Siameza este o rasă de pisică foarte vocală și socială, cunoscută pentru inteligența sa remarcabilă.',
    shortDescription: 'Pisică inteligentă și vocală cu ochi albaștri strălucitori.',
    image: '/images/breeds/siamese.jpg',
    thumbnail: '/images/breeds/siamese-thumb.jpg',
    origin: 'Thailanda',
    weight: '3-5 kg',
    lifeSpan: '15-20 ani',
    temperament: ['Vocal', 'Inteligent', 'Social', 'Activ'],
    activityLevel: 5,
    healthConcerns: ['Amiloidoză', 'Astm', 'Probleme dentare'],
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'small',
    tags: ['vocal', 'intelligent', 'active'],
  },
  {
    slug: 'ragdoll',
    title: 'Ragdoll',
    description: 'Ragdoll este o rasă de pisică mare și docilă, cunoscută pentru tendința de a se relaxa complet când este ridicată.',
    shortDescription: 'Pisică docilă și afectuoasă care adoră să fie ținută în brațe.',
    image: '/images/breeds/ragdoll.jpg',
    thumbnail: '/images/breeds/ragdoll-thumb.jpg',
    origin: 'Statele Unite',
    weight: '4-9 kg',
    lifeSpan: '12-17 ani',
    temperament: ['Docil', 'Calm', 'Afectuos', 'Prietenos'],
    activityLevel: 2,
    healthConcerns: ['Cardiomiopatie hipertrofică', 'Boală renală polichistică'],
    shedding: 'medium',
    grooming: 'medium',
    category: 'longhaired',
    size: 'large',
    tags: ['calm', 'affectionate', 'family-friendly'],
  },
  {
    slug: 'sfinx',
    title: 'Sfinx',
    description: 'Sfinx este o rasă de pisică fără păr, cunoscută pentru personalitatea sa extrovertă și energică.',
    shortDescription: 'Pisică fără păr cu personalitate extrovertă și nevoie de îngrijire specială.',
    image: '/images/breeds/sphynx.jpg',
    thumbnail: '/images/breeds/sphynx-thumb.jpg',
    origin: 'Canada',
    weight: '3-5 kg',
    lifeSpan: '8-14 ani',
    temperament: ['Energic', 'Extrovert', 'Curios', 'Afectuos'],
    activityLevel: 4,
    healthConcerns: ['Probleme de piele', 'Cardiomiopatie hipertrofică', 'Probleme respiratorii'],
    shedding: 'low',
    grooming: 'high',
    category: 'hairless',
    size: 'medium',
    tags: ['hypoallergenic', 'active', 'unique'],
  },
];

export const sampleArticles: Article[] = [
  {
    slug: 'vaccinarea-pisicilor-ghid-complet',
    title: 'Vaccinarea Pisicilor: Ghid Complet pentru Proprietari',
    category: 'prevention',
    description: 'Tot ce trebuie să știi despre vaccinarea pisicilor: schema, tipuri de vaccin și importanța imunizării.',
    excerpt: 'Vaccinarea este esențială pentru sănătatea pisicii tale. Află când și cum să îți vaccinezi pisica pentru o protecție optimă împotriva bolilor.',
    image: '/images/articles/vaccination.jpg',
    author: 'Dr. Maria Popescu',
    date: '2024-01-15',
    readingTime: 8,
    tags: ['vaccinare', 'prevenție', 'pui de pisică'],
    featured: true,
  },
  {
    slug: 'boala-renala-cronica-la-pisici',
    title: 'Boala Renală Cronică la Pisici: Simptome și Tratament',
    category: 'diseases',
    description: 'Ghid complet despre boala renală cronică felină, una dintre cele mai comune afecțiuni la pisicile senior.',
    excerpt: 'Boala renală cronică afectează până la 30% dintre pisicile de peste 10 ani. Descoperă simptomele timpurii și opțiunile de tratament.',
    image: '/images/articles/kidney-disease.jpg',
    author: 'Dr. Ion Georgescu',
    date: '2024-01-10',
    readingTime: 12,
    tags: ['boală renală', 'pisici senior', 'tratament'],
  },
  {
    slug: 'pisica-nu-mananca-cauze-solutii',
    title: 'Pisica Nu Mănâncă: Cauze și Ce Poți Face',
    category: 'symptoms',
    description: 'Descoperă cauzele pierderii apetitului la pisici și când este necesară vizita urgentă la veterinar.',
    excerpt: 'Lipsa apetitului la pisici poate semnala probleme grave de sănătate. Află când să te îngrijorezi și cum să stimulezi apetitul pisicii.',
    image: '/images/articles/cat-not-eating.jpg',
    author: 'Dr. Ana Dumitrescu',
    date: '2024-01-08',
    readingTime: 6,
    tags: ['apetit', 'simptome', 'urgențe'],
    featured: true,
  },
  {
    slug: 'sterilizarea-pisicilor-beneficii-recuperare',
    title: 'Sterilizarea Pisicilor: Beneficii și Recuperare',
    category: 'procedures',
    description: 'Ghid complet despre sterilizare: când, de ce și cum să ai grijă de pisica după operație.',
    excerpt: 'Sterilizarea prelungește viața pisicii și previne multe probleme de sănătate. Află tot ce trebuie să știi despre această procedură.',
    image: '/images/articles/spaying.jpg',
    author: 'Dr. Mihai Radu',
    date: '2024-01-05',
    readingTime: 10,
    tags: ['sterilizare', 'chirurgie', 'recuperare'],
  },
  {
    slug: 'alimentatia-corecta-pisici-ghid',
    title: 'Alimentația Corectă a Pisicilor: Ghid Nutrițional',
    category: 'nutrition',
    description: 'Cum să alegi hrana potrivită pentru pisica ta în funcție de vârstă, greutate și stare de sănătate.',
    excerpt: 'O dietă echilibrată este fundamentul sănătății pisicii. Descoperă principiile unei alimentații corecte și greșelile frecvente.',
    image: '/images/articles/nutrition.jpg',
    author: 'Dr. Elena Stoica',
    date: '2024-01-03',
    readingTime: 9,
    tags: ['nutriție', 'hrană', 'dietă'],
  },
  {
    slug: 'agresivitatea-la-pisici-cauze-solutii',
    title: 'Agresivitatea la Pisici: Cauze și Soluții',
    category: 'behavior',
    description: 'Înțelege de ce pisica ta devine agresivă și cum să gestionezi comportamentul problematic.',
    excerpt: 'Agresivitatea felină poate avea multiple cauze, de la frică la durere. Află cum să identifici triggers și să rezolvi problema.',
    image: '/images/articles/aggression.jpg',
    author: 'Dr. Cristina Pavel',
    date: '2024-01-01',
    readingTime: 7,
    tags: ['comportament', 'agresivitate', 'training'],
  },
];

export const sampleGuides: Guide[] = [
  {
    slug: 'schema-vaccinare-pisici',
    title: 'Schema Completă de Vaccinare pentru Pisici',
    description: 'Ghid pas cu pas pentru vaccinarea corectă a pisicilor de la naștere până la vârsta adultă.',
    category: 'medical',
    image: '/images/guides/vaccination-schedule.jpg',
    readingTime: 15,
    tags: ['vaccinare', 'pui', 'calendar'],
  },
  {
    slug: 'ingrijirea-dupa-sterilizare',
    title: 'Îngrijirea Pisicii După Sterilizare',
    description: 'Tot ce trebuie să știi pentru recuperarea optimă după operația de sterilizare.',
    category: 'care',
    image: '/images/guides/post-surgery-care.jpg',
    readingTime: 10,
    tags: ['sterilizare', 'recuperare', 'îngrijire'],
  },
  {
    slug: 'gestatia-la-pisici',
    title: 'Gestația la Pisici: Ghid Complet',
    description: 'De la concepție la naștere - tot ce trebuie să știi despre sarcina la pisici.',
    category: 'lifecycle',
    image: '/images/guides/pregnancy.jpg',
    readingTime: 20,
    tags: ['gestație', 'reproducere', 'pui'],
  },
];

// Helper functions to get data
export async function getTopBreeds(limit: number = 6): Promise<Breed[]> {
  return sampleBreeds.slice(0, limit);
}

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  return sampleArticles.slice(0, limit);
}

export async function getTopGuides(limit: number = 3): Promise<Guide[]> {
  return sampleGuides.slice(0, limit);
}

export async function getBreedBySlug(slug: string): Promise<Breed | undefined> {
  return sampleBreeds.find(breed => breed.slug === slug);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return sampleArticles.find(article => article.slug === slug);
}

export async function getAllBreeds(): Promise<Breed[]> {
  return sampleBreeds;
}

export async function getAllArticles(): Promise<Article[]> {
  return sampleArticles;
}