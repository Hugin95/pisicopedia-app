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

export interface GuideInfo {
  slug: string;
  title: string;
  category: string;
  description?: string; // SEO-optimized meta description
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

// Complete list of health articles - will be populated automatically by auto-post system
export const allArticles: ArticleInfo[] = [
  { slug: 'pisica-burta-tare-umflata', title: 'Pisica are burta tare și umflată - semne de alarmă', category: 'sanatate', subcategory: 'simptome' },
  { slug: 'pisica-vomita-spuma-alba-dimineata', title: 'Pisica vomită spumă albă dimineața - cauze și soluții', category: 'sanatate', subcategory: 'simptome' },
  { slug: 'pisica-nu-a-mancat-24-ore', title: 'Pisica nu a mâncat de 24 de ore - când devine urgență', category: 'sanatate', subcategory: 'simptome' },];

// Complete list of 24 practical guides
export const allGuides: GuideInfo[] = [
  // Îngrijire de bază (4 ghiduri)
  { slug: 'pregatire-casa-pisica', title: 'Pregătirea casei pentru noua pisică', category: 'ghid-ingrijire', description: 'Descoperă cum să îți pregătești casa perfect pentru noua pisică! ✅ Lista completă de echipamente ✅ Sfaturi de siguranță ✅ Evită erorile comune.' },
  { slug: 'alegere-litiera', title: 'Cum să alegi litiera perfectă pentru pisică', category: 'ghid-ingrijire', description: 'Alege litiera ideală pentru pisica ta! 🐱 Compare toate tipurile ✅ Recomandări expert ✅ Economisește bani ✅ Pisica ta va iubi litiera noua!' },
  { slug: 'amenajare-spatiu', title: 'Amenajarea spațiului pentru pisici', category: 'ghid-ingrijire', description: 'Transformă casa în paradisul pisicii tale! 🏠 Idei creative de amenajare ✅ Soluții pentru spații mici ✅ Creează zone de joacă și odihnă perfecte.' },
  { slug: 'igiena-zilnica', title: 'Rutina zilnică de îngrijire a pisicii', category: 'ghid-ingrijire', description: 'Rutina completă de îngrijire zilnică! ✨ Periaj ✅ Curățare ochi și urechi ✅ Îngrijire blană ✅ 10 minute pe zi pentru o pisică sănătoasă!' },

  // Sănătate preventivă (4 ghiduri)
  { slug: 'calendar-vaccinare', title: 'Calendar complet de vaccinare pentru pisici', category: 'ghid-sanatate', description: 'Calendar complet de vaccinare 2024! 💉 Toate vaccinurile obligatorii ✅ Când să vaccinezi ✅ Costuri și ce să aștepți ✅ Protejează-ți pisica!' },
  { slug: 'ghid-deparazitare', title: 'Ghid complet de deparazitare internă și externă', category: 'ghid-sanatate', description: 'Scapă de paraziți rapid și sigur! 🛡️ Ghid deparazitare internă și externă ✅ Produse recomandate ✅ Prevenție eficientă ✅ Sănătate garantată!' },
  { slug: 'sterilizare-pro-contra', title: 'Sterilizarea pisicilor: pro și contra', category: 'ghid-sanatate', description: 'Sterilizare: pro și contra! ⚖️ Toate avantajele și dezavantajele ✅ Când e momentul ideal ✅ Costuri și recuperare ✅ Ia decizia corectă!' },
  { slug: 'controale-veterinare', title: 'Controale veterinare regulate: când și de ce', category: 'ghid-sanatate', description: 'Controale veterinare: când și de ce! 🏥 Program complet de vizite ✅ Ce se verifică ✅ Prevenție economisește bani ✅ Pisică sănătoasă = pisică fericită!' },

  // Nutriție (4 ghiduri)
  { slug: 'hrana-uscata-vs-umeda', title: 'Hrană uscată vs. hrană umedă: ce să alegi', category: 'ghid-nutritie', description: 'Hrană uscată sau umedă? 🍽️ Compară avantajele și dezavantajele ✅ Recomandări pentru fiecare vârstă ✅ Economisește și hrănește corect!' },
  { slug: 'calculare-portii', title: 'Cum să calculezi porțiile corecte pentru pisică', category: 'ghid-nutritie', description: 'Calculează porțiile perfecte! 📊 Formula exactă pentru greutate ideală ✅ Evită obezitatea ✅ Adaptează după vârstă și activitate ✅ Pisică sănătoasă!' },
  { slug: 'alimente-periculoase', title: 'Alimente periculoase pentru pisici: lista completă', category: 'ghid-nutritie', description: 'Lista completă de alimente TOXICE! ⚠️ 30+ alimente periculoase ✅ Simptome de intoxicație ✅ Ce să faci urgent ✅ Salvează viața pisicii tale!' },
  { slug: 'diete-speciale', title: 'Diete speciale pentru pisici: când sunt necesare', category: 'ghid-nutritie', description: 'Diete speciale pentru probleme de sănătate! 💊 Diete renale, digestive, urinare ✅ Când sunt necesare ✅ Alimente recomandate ✅ Îmbunătățește sănătatea!' },

  // Comportament (4 ghiduri)
  { slug: 'limbaj-pisica', title: 'Limbajul corporal al pisicilor: ghid complet', category: 'ghid-comportament', description: 'Înțelege perfect pisica ta! 🐱 Limbaj corporal complet ✅ Semnificația fiecărei mișcări ✅ Recunoaște emoțiile ✅ Comunicare perfectă!' },
  { slug: 'dresaj-pisica', title: 'Dresajul pisicilor: tehnici eficiente', category: 'ghid-comportament', description: 'Dresează pisica cu tehnici dovedite! 🎯 Metode pozitive ✅ Comenzi de bază ✅ Trucuri impresionante ✅ Rezultate în doar câteva săptămâni!' },
  { slug: 'probleme-comportament', title: 'Probleme comune de comportament și soluții', category: 'ghid-comportament', description: 'Rezolvă problemele de comportament! 🔧 Agresivitate, miaune excesive, zgârieturi ✅ Soluții practice ✅ Rezultate rapide ✅ Pace în casă!' },
  { slug: 'jucarii-imbogatire', title: 'Jucării și îmbogățirea mediului pentru pisici', category: 'ghid-comportament', description: 'Jucării și activități pentru pisica ta! 🎾 30+ idei de jucării DIY ✅ Îmbogățire mediu ✅ Previne plictiseala ✅ Pisică fericită și activă!' },

  // Creștere pui (4 ghiduri)
  { slug: 'pui-nou-nascuti', title: 'Îngrijirea puilor de pisică nou-născuți', category: 'ghid-pui', description: 'Îngrijește puii nou-născuți perfect! 👶 Alimentație, temperatură, socializare ✅ 24/7 program de îngrijire ✅ Asigură supraviețuirea puilor!' },
  { slug: 'intarcare-pui', title: 'Înțărcarea puilor: ghid pas cu pas', category: 'ghid-pui', description: 'Înțărcarea perfectă pas cu pas! 🍼 Calendar complet 4-12 săptămâni ✅ Alimente recomandate ✅ Tranziție fără stres ✅ Pui sănătoși garantat!' },
  { slug: 'socializare-pui', title: 'Socializarea puilor de pisică', category: 'ghid-pui', description: 'Socializează puii corect! 👥 Perioada critică 2-7 săptămâni ✅ Tehnici eficiente ✅ Expunere la stimuli ✅ Pisică echilibrată pe viață!' },
  { slug: 'prima-vizita-veterinar', title: 'Prima vizită la veterinar cu puiul', category: 'ghid-pui', description: 'Prima vizită la veterinar fără stres! 🏥 Ce să te aștepți ✅ Pregătirea transportului ✅ Costuri și proceduri ✅ Checklist complet!' },

  // Îngrijire senior (4 ghiduri)
  { slug: 'ingrijire-senior', title: 'Îngrijirea pisicilor senior: ghid complet', category: 'ghid-senior', description: 'Îngrijire specială pentru pisica senior! 👴 Nevoile după 7 ani ✅ Ajustări în rutină ✅ Suplimente recomandate ✅ Calitate vieții îmbunătățită!' },
  { slug: 'probleme-senior', title: 'Probleme comune la pisicile senior', category: 'ghid-senior', description: 'Problemele senior depistează și previne! 🔍 Boli comune după 7 ani ✅ Simptome de urmărit ✅ Tratamente disponibile ✅ Monitorizare eficientă!' },
  { slug: 'adaptare-casa-senior', title: 'Adaptarea casei pentru pisici în vârstă', category: 'ghid-senior', description: 'Adaptează casa pentru confortul pisicii senior! 🏠 Modificări necesare ✅ Acces ușor litieră și hrană ✅ Siguranță maximă ✅ Mobilitate îmbunătățită!' },
  { slug: 'nutritie-senior', title: 'Nutriția pisicilor senior: ce să știi', category: 'ghid-senior', description: 'Nutriție optimă pentru pisica senior! 🥘 Diete adaptate după 7 ani ✅ Suplimente esențiale ✅ Previne boli ✅ Energie și vitalitate la bătrânețe!' }
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