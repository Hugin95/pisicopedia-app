import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Pisicopedia',
  title: 'Pisicopedia - Enciclopedia Raselor și Sănătății Pisicilor',
  description: 'Prima enciclopedie românească dedicată exclusiv raselor de pisici și informațiilor medicale verificate. Ghiduri complete pentru îngrijirea pisicii tale.',
  url: 'https://pisicopedia.ro',
  ogImage: 'https://pisicopedia.ro/og-image.svg',
  links: {
    facebook: 'https://facebook.com/pisicopedia',
    instagram: 'https://instagram.com/pisicopedia',
  },
  disclaimer: 'Informațiile prezentate pe Pisicopedia.ro sunt doar cu scop informativ și educațional. Pentru diagnostic și tratament, consultați întotdeauna un medic veterinar calificat.',
};

export const mainNavigation: NavItem[] = [
  {
    label: 'Rase',
    href: '/rase',
    children: [
      { label: 'Toate Rasele', href: '/rase' },
      { label: 'Rase Populare', href: '/rase?filter=popular' },
      { label: 'După Mărime', href: '/rase?filter=size' },
      { label: 'După Temperament', href: '/rase?filter=temperament' },
    ],
  },
  {
    label: 'Sănătate',
    href: '/sanatate',
    children: [
      { label: 'Toate Articolele', href: '/sanatate' },
      { label: 'Simptome', href: '/sanatate/categories/simptome' },
      { label: 'Boli', href: '/sanatate/categories/boli' },
      { label: 'Prevenție', href: '/sanatate/categories/preventie' },
      { label: 'Nutriție', href: '/sanatate/categories/nutritie' },
    ],
  },
  {
    label: 'Ghiduri',
    href: '/ghiduri',
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'Toate Tools-urile', href: '/tools' },
      { label: '🧮 Calculator Vârstă Pisică', href: '/tools/calculator-varsta' },
      { label: '🍽️ Calculator Hrană Pisică', href: '/tools/calculator-hrana' },
      { label: '⚖️ Calculator Greutate Ideală', href: '/tools/calculator-greutate' },
      { label: '🎯 Găsește Rasa Potrivită', href: '/tools/rasa-potrivita' },
    ],
  },
  {
    label: 'Nume Pisici',
    href: '/nume-pisici',
  },
];

export const footerNavigation = {
  navigare: [
    { label: 'Acasă', href: '/' },
    { label: 'Rase de Pisici', href: '/rase' },
    { label: 'Articole Sănătate', href: '/sanatate' },
    { label: 'Ghiduri Medicale', href: '/ghiduri' },
    { label: 'Nume pentru Pisici', href: '/nume-pisici' },
  ],
  retea: [
    { label: 'DogoDog.ro', href: 'https://dogodog.ro' },
    { label: 'PetsDaily.ro', href: 'https://petsdaily.ro' },
    { label: 'PetsCare.ro', href: 'https://petscare.ro' },
    { label: 'AquaGuide.ro', href: 'https://aquaguide.ro' },
  ],
  legal: [
    { label: 'Contact', href: '/contact' },
    { label: 'Despre Noi', href: '/despre' },
    { label: 'Politică Confidențialitate', href: '/politica-confidentialitate' },
    { label: 'Termeni și Condiții', href: '/termeni-si-conditii' },
    { label: 'Disclaimer Medical', href: '/disclaimer' },
  ],
};

export const breedCategories = [
  { value: 'shorthaired', label: 'Păr Scurt' },
  { value: 'longhaired', label: 'Păr Lung' },
  { value: 'hairless', label: 'Fără Păr' },
];

export const breedSizes = [
  { value: 'small', label: 'Mică (< 4kg)' },
  { value: 'medium', label: 'Medie (4-6kg)' },
  { value: 'large', label: 'Mare (> 6kg)' },
];

export const articleCategories = [
  { value: 'symptoms', label: 'Simptome' },
  { value: 'diseases', label: 'Boli' },
  { value: 'prevention', label: 'Prevenție' },
  { value: 'procedures', label: 'Proceduri' },
  { value: 'nutrition', label: 'Nutriție' },
  { value: 'behavior', label: 'Comportament' },
];

export const healthSymptoms = [
  'Vomită',
  'Diaree',
  'Letargie',
  'Pierdere în greutate',
  'Pierdere apetit',
  'Strănut',
  'Tuse',
  'Dificultăți respiratorii',
  'Urinare excesivă',
  'Sete excesivă',
];

export const commonDiseases = [
  'Boală renală cronică',
  'Diabet zaharat',
  'Hipertiroidism',
  'Leucemie felină (FeLV)',
  'Virusul imunodeficienței feline (FIV)',
  'Peritonită infecțioasă felină (PIF)',
  'Astm felin',
  'Boală cardiacă',
  'Cancer',
  'Artrită',
];