/**
 * CORRECTED BREED DATA - Based on Real Research
 * Each breed has ACCURATE and SPECIFIC information
 */

export const correctedBreedsData = {
  persana: {
    weight: '3.5-5.5 kg',
    lifeSpan: '12-17 ani',
    temperament: ['Calm', 'Docil', 'Dulce', 'Tăcut', 'Afectuos'],
    activityLevel: 2, // LOW - sedentară
    shedding: 'very-high', // Năpârlește FOARTE mult
    grooming: 'high', // Periere ZILNICĂ obligatorie
    category: 'longhaired',
    size: 'medium',
    healthConcerns: [
      'Polichistoză renală (PKD)',
      'Miocardiopatie hipertrofică',
      'Probleme respiratorii (față plată)',
      'Probleme oculare (epifora)',
      'Tartru dentar'
    ],
    description: 'Pisica Persană este emblema eleganței și luxului felin, cu blană lungă și luxuriantă și față plată caracteristică. Calmă, docilă și extrem de afectuoasă, este perfectă pentru viața de apartament.'
  },

  'british-shorthair': {
    weight: '4-8 kg', // Masculi mai mari
    lifeSpan: '12-20 ani', // Pot trăi foarte mult!
    temperament: ['Calm', 'Independent', 'Loial', 'Răbdător', 'Blând'],
    activityLevel: 2, // LOW-MEDIUM
    shedding: 'high', // Năpârlește sezonier
    grooming: 'low', // Periere săptămânală
    category: 'shorthaired',
    size: 'medium-large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Polichistoză renală (PKD)',
      'Obezitate (metabolism lent)',
      'Probleme dentare'
    ],
    description: 'British Shorthair este "ursulețul de pluș" al lumii feline, cu blană deasă și moale și corp robust. Calmă, independentă dar afectuoasă, este perfectă pentru familii și persoane ocupate.'
  },

  'maine-coon': {
    weight: '5.5-11 kg', // Una din cele mai MARI rase! Masculi pot ajunge 11kg
    lifeSpan: '12-15 ani',
    temperament: ['Prietenos', 'Inteligent', 'Jucăuș', 'Sociabil', 'Blând', 'Vocal'],
    activityLevel: 4, // HIGH - foarte activă
    shedding: 'high',
    grooming: 'high', // Periere 3-4 ori/săptămână
    category: 'longhaired',
    size: 'large', // CEL MAI MARE!
    healthConcerns: [
      'Miocardiopatie hipertrofică (MCH)',
      'Displazia șoldului',
      'Atrofie musculară spinală (SMA)',
      'Polichistoză renală'
    ],
    description: 'Maine Coon este "gigantul blând" al pisicilor, cea mai mare rasă domestică. Cu personalitate de "câine", e inteligentă, sociabilă și adora apa. Blana ei luxuriantă necesită îngrijire constantă.'
  },

  siameza: {
    weight: '2.5-5.5 kg', // Mai mică, elegantă
    lifeSpan: '15-20 ani', // Longevivă!
    temperament: ['Vocală', 'Inteligentă', 'Socială', 'Afectuoasă', 'Energică', 'Certatoare'],
    activityLevel: 5, // VERY HIGH
    shedding: 'low',
    grooming: 'low', // Minimă
    category: 'shorthaired',
    size: 'small-medium',
    healthConcerns: [
      'Probleme dentare (gingivită)',
      'Astm felin',
      'Probleme cardiace',
      'Amiloidoză',
      'Strabism (la unele linii)'
    ],
    description: 'Siameză este "vorbitoarea" lumii feline - vocală, socială și extrem de inteligentă. Cu ochii albaștri hipnotizanți și corp elegant, cere atenție constantă și iubește conversațiile.'
  },

  ragdoll: {
    weight: '4.5-9 kg', // Mare, masculi peste 9kg
    lifeSpan: '12-17 ani',
    temperament: ['Calm', 'Docil', 'Afectuos', 'Relaxat', 'Tolerant', 'Blând'],
    activityLevel: 2, // LOW
    shedding: 'medium',
    grooming: 'medium', // 2-3 ori/săptămână
    category: 'longhaired',
    size: 'large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Polichistoză renală',
      'Obezitate (inactivitate)',
      'Calculi vezicali'
    ],
    description: 'Ragdoll devine "moale ca o păpușă de cârpă" când e ridicată - de aici numele. Extrem de calmă, docilă și afectuoasă, e perfectă pentru familii cu copii. Se relaxează complet în brațe.'
  },

  sfinx: {
    weight: '3-7 kg',
    lifeSpan: '13-15 ani',
    temperament: ['Energic', 'Afectuos', 'Curios', 'Sociabil', 'Jucăuș', 'Călduras'],
    activityLevel: 4, // HIGH
    shedding: 'none', // FĂRĂ PĂR!
    grooming: 'high', // Băi SĂPTĂMÂNALE obligatorii
    category: 'hairless',
    size: 'medium',
    healthConcerns: [
      'Probleme dermatologice',
      'Miocardiopatie hipertrofică',
      'Sensibilitate termică (hipotermie/hipertermie)',
      'Sensibilitate solară (arsuri)',
      'Infecții cutanate'
    ],
    description: 'Sfinx este pisica "fără blană" care compensează prin căldura pielii și personalitate vibrantă. Extrem de afectuoasă, sociabilă și energică, necesită băi regulate și protecție termică constantă.'
  },

  norvegiana: {
    weight: '4.5-9 kg', // Mare, robustă
    lifeSpan: '14-16 ani',
    temperament: ['Prietenos', 'Inteligent', 'Jucăuș', 'Independent', 'Calm', 'Sportiv'],
    activityLevel: 4, // HIGH
    shedding: 'very-high', // Năpârlire MASIVĂ sezonieră
    grooming: 'high', // 3-4 ori/săptămână
    category: 'longhaired',
    size: 'large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Displazia șoldului',
      'Glicogenoză tip IV (GSD IV)',
      'Polichistoză renală'
    ],
    description: 'Norvegiană de Pădure este "vikingul" pisicilor - robustă, sportivă și rezistentă. Cu blană dublă impermeabilă și îndemânare la căț\u0103rat, e aventuroasă dar afectuoasă. Excelent vânător.'
  },

  bengaleza: {
    weight: '4-7 kg',
    lifeSpan: '12-16 ani',
    temperament: ['Energic', 'Inteligent', 'Activ', 'Curios', 'Vocal', 'Jucăuș', 'Atletic'],
    activityLevel: 5, // VERY HIGH - cea mai activă!
    shedding: 'low',
    grooming: 'low', // Se auto-întreține
    category: 'shorthaired',
    size: 'medium-large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Atrofie progresivă retiniană (PRA)',
      'Displazia șoldului',
      'Sindrom IBS (intestin iritabil)'
    ],
    description: 'Bengaleză este "leopardul de apartament" - hibrid între pisica domestică și leopardul asiatic. Extrem de energică, inteligentă și atletică, iubește apa și necesită MULTĂ stimulare fizică și mentală.'
  },

  'scottish-fold': {
    weight: '2.5-6 kg',
    lifeSpan: '11-15 ani',
    temperament: ['Calm', 'Afectuos', 'Adaptabil', 'Loial', 'Blând', 'Sociabil'],
    activityLevel: 3, // MEDIUM
    shedding: 'medium',
    grooming: 'medium',
    category: 'shorthaired', // Există și longhaired
    size: 'medium',
    healthConcerns: [
      'Osteocondrodisplazie (probleme articulare GRAVE)',
      'Miocardiopatie hipertrofică',
      'Polichistoză renală',
      'Probleme urechilor (infecții)'
    ],
    description: 'Scottish Fold este "bufnița" pisicilor - cu urechile pliate caracteristice și ochi rotunzi mari. Calmă, afectuoasă și adaptabilă, dar predispusă la probleme articulare severe din cauza mutației genetice.'
  },

  europeana: {
    weight: '3.5-7 kg',
    lifeSpan: '15-22 ani', // Foarte longevivă!
    temperament: ['Independent', 'Inteligent', 'Adaptabil', 'Echilibrat', 'Vânător'],
    activityLevel: 3, // MEDIUM
    shedding: 'medium',
    grooming: 'low',
    category: 'shorthaired',
    size: 'medium',
    healthConcerns: [
      'Pisică robustă, sănătoasă',
      'Fără predispoziții genetice majore',
      'Parasiti (dacă are acces exterior)'
    ],
    description: 'Europeană este pisica "comună" robustă și sănătoasă, rezultat al selecției naturale. Echilibrată, independentă și adaptabilă, fără problemele genetice ale raselor pure. Excelent vânător și companion.'
  },

  'russian-blue': {
    weight: '3-5.5 kg',
    lifeSpan: '15-20 ani',
    temperament: ['Tăcut', 'Timid', 'Loial', 'Inteligent', 'Rezervat', 'Sensibil'],
    activityLevel: 3,
    shedding: 'low-medium', // Blană dublă dar scurtă
    grooming: 'low',
    category: 'shorthaired',
    size: 'medium',
    healthConcerns: [
      'Obezitate (tind să se îngrașe)',
      'Calculi urinari',
      'Probleme dentare'
    ],
    description: 'Russian Blue este aristocratul discret - cu blană argintie-albastră unică și ochi verzi smarald. Tăcută, timidă cu străinii dar devotată familiei. Blana ei plușată e hipoalergenică pentru unii.'
  },

  birmaneza: {
    weight: '3.5-7 kg',
    lifeSpan: '12-16 ani',
    temperament: ['Calm', 'Afectuos', 'Sociabil', 'Inteligent', 'Blând', 'Curios'],
    activityLevel: 3,
    shedding: 'medium',
    grooming: 'medium', // 2-3 ori/săptămână
    category: 'longhaired',
    size: 'medium',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Polichistoză renală',
      'Atrofie corneeană'
    ],
    description: 'Birmaneză e "pisica sacră a Birmaniei" cu "mănuși" albe la lăbuțe și ochi albaștri. Calmă, afectuoasă și sociabilă, combină frumusețea Siamezei cu blândețea Persanei.'
  },

  abissiniana: {
    weight: '2.7-4.5 kg',
    lifeSpan: '12-15 ani',
    temperament: ['Energic', 'Curios', 'Inteligent', 'Activ', 'Jucăuș', 'Sociabil'],
    activityLevel: 5, // VERY HIGH
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'small-medium',
    healthConcerns: [
      'Atrofie progresivă retiniană (PRA)',
      'Amiloidoză renală',
      'Luxație rotulă',
      'Gingivită'
    ],
    description: 'Abissiniană e pisica "modelul" - elegantă, atletică, cu blană "ticked" unic (fiecare fir multicolor). Extrem de activă, inteligentă și curioasă, e "cățelușul" pisicilor.'
  },

  'devon-rex': {
    weight: '2.5-4.5 kg',
    lifeSpan: '9-15 ani',
    temperament: ['Jucăuș', 'Activ', 'Inteligent', 'Sociabil', 'Poznaș', 'Afectuos'],
    activityLevel: 4,
    shedding: 'very-low', // Păr rar
    grooming: 'special', // Foarte delicată
    category: 'shorthaired',
    size: 'small',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Luxație rotulă',
      'Miopatie (slăbiciune musculară)',
      'Displazia șoldului'
    ],
    description: 'Devon Rex e "pixie-ul" pisicilor - cu urechi mari, față de elf și păr ondulat rar. Extrem de jucăușă, sociabilă și inteligentă, adoră să stea pe umeri ca un papagal.'
  },

  'oriental-shorthair': {
    weight: '3-5 kg',
    lifeSpan: '12-15 ani',
    temperament: ['Vocal', 'Energic', 'Social', 'Inteligent', 'Afectuos', 'Certat'],
    activityLevel: 5,
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'small-medium',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Atrofie progresivă retiniană',
      'Amiloidoză',
      'Probleme dentare'
    ],
    description: 'Oriental Shorthair e "Siameză într-o mie de culori" - același corp elegant și personalitate vocală, dar în peste 300 de variante de culori și modele. Extrem de sociabilă și vorbăreață.'
  },

  'exotic-shorthair': {
    weight: '3.5-6 kg',
    lifeSpan: '12-15 ani',
    temperament: ['Calm', 'Afectuos', 'Jucăuș', 'Loial', 'Dulce', 'Tăcut'],
    activityLevel: 2,
    shedding: 'medium',
    grooming: 'medium', // 2-3 ori/săptămână
    category: 'shorthaired',
    size: 'medium',
    healthConcerns: [
      'Polichistoză renală (PKD)',
      'Probleme respiratorii (față plată)',
      'Probleme oculare (epifora)',
      'Miocardiopatie hipertrofică'
    ],
    description: 'Exotic Shorthair e "Persana pentru leneși" - aceeași față plată adorabilă, dar cu păr scurt. Calmă, afectuoasă și mai puțină întreținere decât Persana.'
  },

  siberiana: {
    weight: '4.5-9 kg',
    lifeSpan: '11-15 ani',
    temperament: ['Prietenos', 'Inteligent', 'Loial', 'Calm', 'Jucăuș', 'Adaptabil'],
    activityLevel: 4,
    shedding: 'very-high', // Triplu strat!
    grooming: 'high',
    category: 'longhaired',
    size: 'large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Polichistoză renală (mai rar)',
      'Câteva probleme genetice'
    ],
    description: 'Siberiană e pisica "de taiga" rusească - robustă, cu blană triplă impermeabilă și temperament calm. Hipoalergenică pentru mulți (produce mai puțin Fel d 1). Loială ca un câine.'
  },

  'turceasca-angora': {
    weight: '2.5-5 kg',
    lifeSpan: '12-18 ani',
    temperament: ['Energic', 'Inteligent', 'Social', 'Jucăuș', 'Vocal', 'Afectuos'],
    activityLevel: 4,
    shedding: 'medium',
    grooming: 'medium',
    category: 'longhaired',
    size: 'small-medium',
    healthConcerns: [
      'Surditate (la pisicile albe cu ochi albaștri)',
      'Miocardiopatie hipertrofică',
      'Ataxie (probleme neurologice rare)'
    ],
    description: 'Angora Turcească e "dansatoarea" elegantă - cu blană lungă, mătăsoasă și corp atletic. Energică, inteligentă și foarte vocală. Pisicile albe cu ochi albaștri pot fi surde.'
  },

  'turceasca-van': {
    weight: '4.5-9 kg',
    lifeSpan: '13-17 ani',
    temperament: ['Energic', 'Jucăuș', 'Independent', 'Inteligent', 'Vocal', 'Atletic'],
    activityLevel: 5,
    shedding: 'medium',
    grooming: 'medium',
    category: 'longhaired',
    size: 'large',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Surditate (la unele linii)',
      'Fără alte probleme majore'
    ],
    description: 'Van Turcească e "pisica înotătoare" - una din puținele rase care IUBESC apa! Energică, independentă și atletică, cu model unic de culoare (albă cu pete pe cap și coadă).'
  },

  chartreux: {
    weight: '4-7 kg',
    lifeSpan: '12-15 ani',
    temperament: ['Calm', 'Inteligent', 'Loial', 'Tăcut', 'Adaptabil', 'Blând'],
    activityLevel: 2,
    shedding: 'medium',
    grooming: 'low',
    category: 'shorthaired',
    size: 'medium-large',
    healthConcerns: [
      'Luxație rotulă',
      'Polichistoză renală (rar)',
      'Pisică robustă în general'
    ],
    description: 'Chartreux e "călugărul tăcut" francez - cu blană albastru-gri densă tip "lână" și ochi portocalii/cupru. Calmă, inteligentă și extrem de tăcută (miaună rar).'
  },

  balineza: {
    weight: '2.5-5 kg',
    lifeSpan: '12-20 ani',
    temperament: ['Vocal', 'Inteligent', 'Social', 'Afectuos', 'Energic', 'Loial'],
    activityLevel: 4,
    shedding: 'low-medium',
    grooming: 'medium',
    category: 'longhaired',
    size: 'small-medium',
    healthConcerns: [
      'Astm felin',
      'Miocardiopatie hipertrofică',
      'Amiloidoză',
      'Strabism (rar)'
    ],
    description: 'Balineză e "Siameză cu păr lung" - aceeași personalitate vocală și inteligentă, dar cu blană semi-lungă mătăsoasă. Elegantă, sociabilă și foarte comunicativă.'
  },

  'cornish-rex': {
    weight: '2.5-4.5 kg',
    lifeSpan: '12-16 ani',
    temperament: ['Energic', 'Jucăuș', 'Inteligent', 'Afectuos', 'Activ', 'Sociabil'],
    activityLevel: 5,
    shedding: 'very-low',
    grooming: 'special', // Delicată
    category: 'shorthaired',
    size: 'small',
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Luxație rotulă',
      'Hipotricoză (pierderea părului)',
      'Sensibilitate la frig'
    ],
    description: 'Cornish Rex e "greyhound-ul" pisicilor - cu corp atletic, păr ondulat scurt și energic infinite. Extrem de activă, jucăușă și caldă la atingere (temperatură corporală mai ridicată).'
  },

  manx: {
    weight: '3.5-5.5 kg',
    lifeSpan: '9-14 ani', // Mai scurtă din cauza problemelor spinale
    temperament: ['Calm', 'Loial', 'Inteligent', 'Sociabil', 'Jucăuș', 'Prietenos'],
    activityLevel: 3,
    shedding: 'medium',
    grooming: 'medium',
    category: 'shorthaired',
    size: 'medium',
    healthConcerns: [
      'Sindrom Manx (spina bifida)',
      'Probleme spinale și nervoase GRAVE',
      'Megacolon',
      'Artrita spinală'
    ],
    description: 'Manx e pisica "fără coadă" de pe Insula Man - mutație genetică care poate cauza probleme spinale severe. Calmă, loială și sociabilă, dar cu risc de handicap de la naștere.'
  },

  himalayan: {
    weight: '3.5-6 kg',
    lifeSpan: '9-15 ani',
    temperament: ['Calm', 'Docil', 'Dulce', 'Afectuos', 'Tăcut', 'Blând'],
    activityLevel: 2,
    shedding: 'very-high',
    grooming: 'high', // ZILNICĂ
    category: 'longhaired',
    size: 'medium',
    healthConcerns: [
      'Polichistoză renală (PKD)',
      'Probleme respiratorii SEVERE (față plată)',
      'Probleme oculare (epifora, ulcere corneene)',
      'Miocardiopatie hipertrofică'
    ],
    description: 'Himalayană e "Persană cu model siamez" - față plată, blană lungă și puncte colorate. Extrem de calmă și docilă, dar cu probleme respiratorii severe din cauza feței plate.'
  },

  somali: {
    weight: '3-5.5 kg',
    lifeSpan: '12-14 ani',
    temperament: ['Energic', 'Inteligent', 'Curios', 'Jucăuș', 'Activ', 'Social'],
    activityLevel: 5,
    shedding: 'medium',
    grooming: 'medium',
    category: 'longhaired',
    size: 'medium',
    healthConcerns: [
      'Atrofie progresivă retiniană (PRA)',
      'Amiloidoză renală',
      'Luxație rotulă',
      'Gingivită'
    ],
    description: 'Somali e "Abissiniană cu păr lung" - aceeași energie și inteligență, dar cu blană semi-lungă stufoasă și coadă spectaculoasă tip "vulpe". Extrem de activă și curioasă.'
  },

  ocicat: {
    weight: '4-7 kg',
    lifeSpan: '12-18 ani',
    temperament: ['Energic', 'Sociabil', 'Prietenos', 'Inteligent', 'Vocal', 'Adaptabil'],
    activityLevel: 4,
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'medium-large',
    healthConcerns: [
      'Amiloidoză renală (rar)',
      'Probleme cardiace (rar)',
      'Pisică relativ sănătoasă'
    ],
    description: 'Ocicat arată ca un ocelot sălbatic dar e 100% domestică - cu pete ca leopardul și temperament de câine. Extrem de sociabilă, inteligentă și ușor de dresat. Iubește compania.'
  },

  peterbald: {
    weight: '3-5 kg',
    lifeSpan: '12-15 ani',
    temperament: ['Energic', 'Afectuos', 'Social', 'Inteligent', 'Curios', 'Vocal'],
    activityLevel: 4,
    shedding: 'none', // Fără păr
    grooming: 'high', // Băi săptămânale
    category: 'hairless',
    size: 'medium',
    healthConcerns: [
      'Probleme dermatologice',
      'Sensibilitate termică',
      'Sensibilitate solară',
      'Eclampsia neonatală (la femele)'
    ],
    description: 'Peterbald e "Sfinx-ul rus" elegant - fără păr, corp alungit tip Oriental Shorthair și personalitate extrovertă. Călduroasă, afectuoasă și necesită îngrijire constantă a pielii.'
  },

  savannah: {
    weight: '5-11 kg', // Poate fi MASIVĂ (F1-F2)
    lifeSpan: '12-20 ani',
    temperament: ['Energic', 'Inteligent', 'Atletic', 'Loial', 'Curios', 'Aventuros'],
    activityLevel: 5, // EXTREME
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'large-xlarge', // CEL MAI ÎNALT!
    healthConcerns: [
      'Miocardiopatie hipertrofică',
      'Atrofie progresivă retiniană',
      'Sterilitate (la masculi F1-F4)',
      'Probleme digestive'
    ],
    description: 'Savannah e hibridul cu SERVAL (pisică sălbatică africană) - cea mai înaltă rasă domestică. Extrem de energică, inteligentă și atletică, iubește apa și se comportă ca un câine. Necesită MULT spațiu!'
  },

  korat: {
    weight: '2.5-4.5 kg',
    lifeSpan: '10-15 ani',
    temperament: ['Calm', 'Afectuos', 'Loial', 'Timid', 'Inteligent', 'Tăcut'],
    activityLevel: 2,
    shedding: 'low',
    grooming: 'low',
    category: 'shorthaired',
    size: 'small-medium',
    healthConcerns: [
      'Gangliosidoză (boală neurologică fatală)',
      'Probleme neuromusculare',
      'Pisică relativ sănătoasă'
    ],
    description: 'Korat e "pisica norocului" thailandeză - cu blană argintie-albastră și ochi verzi smarald. Calmă, loială și timidă, e pisica "unei singure persoane". Trăsătură unică: inimă la cap (văzut de sus).'
  },

  'domestica-cu-par-scurt': {
    weight: '3.5-7 kg',
    lifeSpan: '15-20 ani',
    temperament: ['Variat', 'Adaptabil', 'Independent', 'Inteligent', 'Echilibrat'],
    activityLevel: 3,
    shedding: 'medium',
    grooming: 'low',
    category: 'shorthaired',
    size: 'medium',
    healthConcerns: [
      'Fără predispoziții genetice',
      'Pisică robustă și sănătoasă',
      'Probleme comune la toate pisicile (parasiti, obezitate)'
    ],
    description: 'Domestică cu Păr Scurt e pisica "de cartier" clasică - fără rasă definită, rezultat al reproducerii naturale. Robustă, sănătoasă, adaptabilă și longevivă. Personalitatea variază enorm.'
  }
};

