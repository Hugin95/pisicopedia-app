/**
 * FAQ Schema pentru Top 10 Ghiduri
 * Optimizat pentru Featured Snippets și Google Rich Results
 */

export interface GuideFAQ {
  question: string;
  answer: string;
}

export const guideFAQs: Record<string, GuideFAQ[]> = {
  // 1. Pregătirea casei pentru noua pisică
  'pregatire-casa-pisica': [
    {
      question: 'Ce echipamente sunt necesare pentru o pisică nouă?',
      answer: 'Pentru o pisică nouă ai nevoie de: litieră și nisip, boluri pentru apă și hrană, pat sau cuşcă, jucării, post de zgâriat, perie pentru blană, cutie de transport și hrană de calitate adaptată vârstei.',
    },
    {
      question: 'Când trebuie să pregătesc casa înainte de sosirea pisicii?',
      answer: 'Pregătește casa cu cel puțin 3-5 zile înainte ca pisica să sosească. Asigură-te că toate echipamentele sunt instalate, zonele periculoase sunt securizate și ai suficiente provizii pentru prima lună.',
    },
    {
      question: 'Ce zone din casă sunt periculoase pentru pisici?',
      answer: 'Zonele periculoase includ: balcoane neprotejate, ferestre deschise, cabluri electrice neizolate, plante toxice (crin, filodendron), produse de curățenie, medicamente și alimente periculoase.',
    },
    {
      question: 'Cât costă echipamentele de bază pentru o pisică?',
      answer: 'Bugetul inițial pentru echipamente este între 300-800 lei, incluzând litieră (50-150 lei), boluri (30-80 lei), post zgâriat (80-200 lei), jucării (50-100 lei), pat (80-150 lei) și perie (30-70 lei).',
    },
    {
      question: 'Cum adaptez casa pentru un pui vs pisică adult?',
      answer: 'Pentru pui: zonă mică și sigură initial, acces limitat, jucării moi, scară către litieră. Pentru adulți: mai mult spațiu, posturi de observație la înălțime, ascunzișuri multiple și zone de joacă variate.',
    },
  ],

  // 2. Calendar complet de vaccinare
  'calendar-vaccinare': [
    {
      question: 'Când trebuie vaccinată prima dată o pisică?',
      answer: 'Prima vaccinare se face la 8 săptămâni (2 luni) cu vaccinul trivalent (panleucopenie, rinotraheită, calicivirusă). A doua doză la 12 săptămâni, a treia la 16 săptămâni, apoi rapel anual.',
    },
    {
      question: 'Care sunt vaccinurile obligatorii pentru pisici în România?',
      answer: 'Vaccinurile recomandate sunt: trivalent/tetravalent (rinotraheită, calicivirusă, panleucopenie, clamidioză) și antirabic (obligatoriu pentru călătorii sau expoziții). Vaccinarea antirabică se face de la 12-16 săptămâni.',
    },
    {
      question: 'Cât costă vaccinarea completă a unei pisici?',
      answer: 'Costurile variază: vaccinare trivalent 100-150 lei per doză (x3 doze first year), antirabic 80-120 lei, consultație 50-100 lei. Total prima year: aproximativ 600-900 lei.',
    },
    {
      question: 'Pot vaccina pisica dacă este bolnavă?',
      answer: 'NU! Pisica trebuie să fie complet sănătoasă pentru vaccinare. Se amână vaccinarea dacă are febră, este slăbită, are diare/vărsături sau este în recuperare după boală. Consultă veterinarul pentru evaluare.',
    },
    {
      question: 'Ce reacții adverse pot apărea după vaccinare?',
      answer: 'Reacții ușoare: somn, letargie 24-48h, umflătură locală, febră ușoară. Reacții severe (rare): reacție alergică, dificultăți respiratorii, vărsături severe. Contactează veterinarul urgent dacă apar reacții severe.',
    },
  ],

  // 3. Hrană uscată vs. hrană umedă
  'hrana-uscata-vs-umeda': [
    {
      question: 'Ce este mai bună pentru pisici: hrană uscată sau umedă?',
      answer: 'Ambele au avantaje. Uscată: economică, practică, sănătate dentară. Umedă: hidratare, palatabilitate, digestie ușoară. Ideal: combinație 70% uscată + 30% umedă pentru echilibru optim.',
    },
    {
      question: 'Câtă apă bea o pisică care mănâncă doar hrană uscată?',
      answer: 'Pisicile pe hrană uscată trebuie să bea 200-300ml apă/zi (pentru 4kg greutate). Hrană uscată conține 10% apă, umedă 75-80%. Asigură-te că au mereu apă proaspătă disponibilă.',
    },
    {
      question: 'Pot schimba brusc de la hrană uscată la umedă?',
      answer: 'NU! Tranziția trebuie graduală: 7-10 zile. Zi 1-2: 75% veche + 25% nouă. Zi 3-4: 50-50%. Zi 5-6: 25% veche + 75% nouă. Zi 7+: 100% nouă. Previne diaree și refuzul alimentului.',
    },
    {
      question: 'Cât costă hrana umedă vs uscată pe lună?',
      answer: 'Uscată premium: 150-250 lei/lună (4kg pisică). Umedă premium: 350-550 lei/lună. Combinație (70-30): aproximativ 220-350 lei/lună. Alege calitate peste cantitate pentru sănătate pe termen lung.',
    },
    {
      question: 'Ce hrană este mai bună pentru pisicile cu probleme renale?',
      answer: 'Pentru probleme renale: hrană umedă (hidratare!), conținut scăzut de proteine și fosfor, hrană special formulată renal. Consultă veterinarul pentru recomandări specifice și monitorizare.',
    },
  ],

  // 4. Rutina zilnică de îngrijire
  'igiena-zilnica': [
    {
      question: 'Cât timp durează rutina zilnică de îngrijire a pisicii?',
      answer: 'Rutina optimă durează 10-15 minute zilnic: periaj blană (5 min), curățare ochi (2 min), verificare urechi (2 min), curățare litieră (3 min), joacă interactivă (5 min).',
    },
    {
      question: 'Cât de des trebuie să periez pisica?',
      answer: 'Păr scurt: 2-3 ori/săptămână. Păr lung: zilnic! Pisici în năpârlire: zilnic indiferent de lungime. Periajul previne ghemotoace de păr, stimulează circulația și întărește legătura.',
    },
    {
      question: 'Cum curăț corect ochii și urechile pisicii?',
      answer: 'Ochi: șterge blând cu compresă sterilă umezită cu apă caldă, de la colțul interior spre exterior. Urechi: curăță pavilionul cu compresă umezită, FĂRĂ betișoare! La secreții anormale: veterinar urgent.',
    },
    {
      question: 'Cât de des trebuie făcut baia pisicii?',
      answer: 'Pisicile se curăță singure! Baie necesară doar dacă: sunt foarte murdare, au paraziți, rase fără blană (Sfinx: lunar), recomandare veterinar. În general: 2-3 bai/an sau niciodată pentru pisici normale.',
    },
    {
      question: 'Ce produse sunt sigure pentru igiena pisicilor?',
      answer: 'Sigure: șampoane specifice pisici, șervețele umed pentru animale, loțiuni curățare urechi veterinare, paste dentar felină. Evită: produse umane, uleiuri esențiale concentrate, detergenți puternici.',
    },
  ],

  // 5. Alimente periculoase pentru pisici
  'alimente-periculoase': [
    {
      question: 'Care sunt cele mai toxice alimente pentru pisici?',
      answer: 'TOP TOXICE: ciocolată, ceapă, usturoi, struguri/stafide, xylitol (îndulcitor), avocado, alcool, cofeină, nuci de macadamia. Chiar cantități mici pot fi FATALE! Contactează veterinarul URGENT la ingerare.',
    },
    {
      question: 'Ce simptome apar la intoxicația alimentară la pisici?',
      answer: 'Simptome: vărsături, diaree, salivație excesivă, letargie, convulsii, tremurături, dificultăți respiratorii, colaps. Simptomele apar în 30 min - 24 ore. LA ORICE SIMPTOM → VETERINAR URGENT!',
    },
    {
      question: 'Pot pisicile să mănânce lactate?',
      answer: 'NU RECOMANDAT! Majoritatea pisicilor adulte sunt intole rante la lactoză. Lapte → diaree, balonare, crampe. Excepții: iaurt simplu, brânză proaspătă în cantități MICI (1-2 lingurițe). Apă proaspătă > lapte!',
    },
    {
      question: 'Ce fac dacă pisica a mâncat ciocolată?',
      answer: 'URGENȚĂ VETERINARĂ! Notează: tipul ciocolatei, cantitatea, când a mâncat. NU provoca vărsături acasă! Ciocolată neagră = mai toxică. Simptome: agitație, tremurături, vărsături, convulsii. MERGI IMEDIAT LA VETERINAR!',
    },
    {
      question: 'Sunt plantele de apartament periculoase pentru pisici?',
      answer: 'DA! Toxice: crin (FATAL!), filodendron, dieffenbachia, potos, aloe vera, iederă. Sigure: iarba pisicii, catnip, lavandă, rozmarină. La ingerare plantă toxică: veterinar URGENT cu mostră plantă!',
    },
  ],

  // 6. Dresajul pisicilor
  'dresaj-pisica': [
    {
      question: 'Pot dresă o pisică la fel ca un câine?',
      answer: 'Pisicile pot fi dresate, dar diferit! Folosesc: motivație (recompense alimentare), sesiuni scurte (5-10 min), întărire pozitivă, răbdare. Nu funcționează: pedepse, forță, ton ridicat.',
    },
    {
      question: 'La ce vârstă pot începe să dresez pisica?',
      answer: 'Începe de la 8-12 săptămâni! Puii învață rapid. Adulții pot fi dresați oricând, dar durează mai mult. Comandele de bază (vino, șezi, stay) se învață în 2-4 săptămâni cu antrenament zilnic.',
    },
    {
      question: 'Ce comenzi de bază pot învăța pisicile?',
      answer: 'Comenzi practice: "Vino" (cu clicker), "Șezi", "Stay", "Dă labă", "Da/Nu". Trucuri: sărit prin cerc, rostogolit, high-five. Clicker training accelerează învățarea cu 50%!',
    },
    {
      question: 'Cum opresc pisica să zgârie mobilierul?',
      answer: 'Soluții: post zgâriat atractiv (sisal, carton), spray deterent pe mobilier, folie aluminiu temporar, trim gheare regulat, recompensează când folosește postul corect. NICIODATĂ: declawing (mutilare!).',
    },
    {
      question: 'Cât timp durează până pisica învață o comandă?',
      answer: 'Comenzi simple: 1-2 săptămâni cu antrenament zilnic (10-15 min). Trucuri complexe: 3-6 săptămâni. Factori: vârsta, rasa (Siameză și Abisiniană învață rapid), motivația, consistența. Răbdare = cheie!',
    },
  ],

  // 7. Sterilizarea pisicilor
  'sterilizare-pro-contra': [
    {
      question: 'La ce vârstă se sterilizează pisicile?',
      answer: 'Vârsta optimă: 5-7 luni ÎNAINTE de prima căldură! Early spay (3-4 luni): sigur pentru anumite rase. Sterilizarea târzie (după 1 an): risc crescut cancer mamar. Consultă veterinarul pentru timing optim.',
    },
    {
      question: 'Cât costă sterilizarea unei pisici în România?',
      answer: 'Costuri medii: Femele 250-450 lei, Masculi 150-300 lei. Include: anestezie, procedură, medicamente post-op, guler protector. Clinici acreditate pot oferi prețuri reduse. Investiție pentru sănătate pe termen lung!',
    },
    {
      question: 'Care sunt avantajele sterilizării?',
      answer: 'AVANTAJE: elimină căldura/miaune nocturne, previne cancer uterin/ovarian, reduce cancer mamar cu 90%, elimină gestații nedorite, crește durata vieții cu 3-5 ani, reduce marcarea teritoriului, pisică mai liniștită.',
    },
    {
      question: 'Se îngrașă pisicile după sterilizare?',
      answer: 'MITUL: "Se îngrașă automat" = FALS! Metabolism scade cu 20-30%, dar obezitatea se previne prin: porții ajustate, hrană sterilizat low-calorie, exercițiu zilnic. Monitorizează greutatea lunar!',
    },
    {
      question: 'Cât durează recuperarea după sterilizare?',
      answer: 'Recuperare: 7-14 zile. Evită: sărituri, joacă intensă, lins suturi (guler obligatoriu!). Simptome normale: somn, apetit redus 24h. ALARME: sângerare, umflături, febră, letargie severă → veterinar URGENT!',
    },
  ],

  // 8. Limbajul corporal al pisicilor
  'limbaj-pisica': [
    {
      question: 'Ce înseamnă când pisica toarce?',
      answer: 'Toarcerea = emoții multiple! Mulțumire/confort (90%), durere/stres (rare), autolinștire, comunicare cu puii. Context: urechi relaxate + ochi semiînchiși = fericit. Urechi strânse + corp încordat = stres/durere.',
    },
    {
      question: 'De ce pisica își lasă coada în jos sau o zbârlește?',
      answer: 'Coadă: Ridicată vertical = salut fericit. Cocoșată/zbârlită = frică/agresivitate. În jos = nesigur ață/supunere. Biciuind rapid = iritare. Învârtită în ochi = curiozitate/joacă. Coada = "barometrul" emoțiilor!',
    },
    {
      question: 'Ce înseamnă când pisica clipește încet către mine?',
      answer: '"Cat kiss" sau "slow blink" = IUBIRE! Pisica spune: "Am încredere, te iubesc". Răspunde cu clip lent înapoi pentru a întări legătura. E echivalentul zâmbetului uman în limbaj felin!',
    },
    {
      question: 'De ce pisica se freacă de picioarele mele?',
      answer: 'Frecare = MARCARE și afecțiune! Glandele de pe obraji/coadă secretă feromoni: "Ești AL MEU!". Bunting (cap în picioare) = salut și cerere atenție. E compliment - pisica te include în "familia" ei!',
    },
    {
      question: 'Cum recunosc că pisica este furioasă sau speriată?',
      answer: 'FURIE: urechi înapoi, pupile dilatate, șuierături, blană ridicată, poziție laterală (pare mai mare). SPAIMĂ: urechi lipite, pupile FOARTE dilatate, ghemuit, tremur, coada între picioare. EVITĂ contactul direct - lasă spațiu!',
    },
  ],

  // 9. Alegerea litierei perfecte
  'alegere-litiera': [
    {
      question: 'Ce mărime trebuie să aibă litiera pentru pisică?',
      answer: 'Formula: litiera = 1.5x lungimea pisicii (nas-coadă). Minim 40x30cm (pisici mici), ideal 55x40cm+ (adulți). Pentru pisici mari (Maine Coon): 70x50cm+. Regula: Cu cât mai mare, cu atât mai bine!',
    },
    {
      question: 'Ce tip de litieră este mai bună: închisă sau deschisă?',
      answer: 'DEPINDE de pisică! Deschisă: aerisire bună, acces ușor, mai acceptată. Închisă: intimitate, miros controlat, dar poate fi claustrofobică. Test: începe cu deschisă; dacă pisica pare jenată, încearcă închisă.',
    },
    {
      question: 'Câte litiere trebuie să am pentru mai multe pisici?',
      answer: 'REGULA DE AUR: Număr pisici + 1! Pentru 2 pisici = 3 litiere. Pentru 3 pisici = 4 litiere. Amplasate în locuri diferite. Previne conflicte și refuzul folosirii litierei.',
    },
    {
      question: 'Ce nisip de litieră este cel mai bun?',
      answer: 'Tipuri: Bentonita aglomeranta (top!), silica gel (absorbare excelentă), bioecologic (compostabil), nisip clasic (ieftin). Evită: parfumat puternic (respiratie!). Test 2-3 tipuri să vezi ce preferă pisica.',
    },
    {
      question: 'Unde amplasez litiera în casă?',
      answer: 'IDEAL: zonă liniștită, privată, accesibilă 24/7, departe de hrană/apă. EVITĂ: lângă mașina de spălat, zone zgomotoase, culcare vizavi. Apartamente mici: baie, balcon acoperit, cameră utilă.',
    },
  ],

  // 10. Prima vizită la veterinar
  'prima-vizita-veterinar': [
    {
      question: 'Când trebuie să duc puiul la primul control veterinar?',
      answer: 'URGENT în primele 3-7 zile după achiziție! Veterinarul verifică: starea generală, deparazitare, vaccinare, nutriție, socializare. Depistarea timpurie a problemelor = tratament mai ușor și mai ieftin!',
    },
    {
      question: 'Ce documente trebuie să am pentru prima vizită?',
      answer: 'Documentele necesare: certificat de origine/pedigree, carnet de sănătate (dacă există), dovada deparazitare/vaccinare anterioară, contract de vânzare, observații despre comportament/alimentație. Notează întrebările dinainte!',
    },
    {
      question: 'Ce proceduri se fac la prima vizită veterinară?',
      answer: 'Proceduri standard: examen fizic complet (ochi, urechi, dinți, blană), cântărire, auscultație, verificare paraziti interni (analize fecale), deparazitare, plan vaccinare, recomandări nutriție și îngrijire.',
    },
    {
      question: 'Cât costă prima vizită la veterinar pentru pui?',
      answer: 'Costuri medii: Consultație 80-150 lei, deparazitare 30-60 lei, analize fecale 50-100 lei, vaccinare (de la 2 luni) 100-150 lei. Total: 260-460 lei. Investiție esențială pentru sănătatea pe termen lung!',
    },
    {
      question: 'Cum transport puiul la veterinar în siguranță?',
      answer: 'Transport obligatoriu în CUȘCĂ! Nu în brațe! Cușcă rigidă, lenjerie moale, jucărie familiară pentru confort. Mașină: fixează cușca, ventilație, fără AC direct. Primul transport = impresie durabilă - fă-l plăcut!',
    },
  ],
};

