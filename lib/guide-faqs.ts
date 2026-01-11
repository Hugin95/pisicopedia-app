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

  // 11. Călătorie cu pisica
  'calatorie-cu-pisica': [
    {
      question: 'Cât de des pot călători cu pisica mea?',
      answer: 'Depinde de temperamentul pisicii. Pentru majoritatea, călătoriile frecvente (săptămânale) sunt prea stresante. Călătorii ocazionale (câteva pe an) sunt mai acceptabile. Evaluează nivelul de stres al pisicii și ia în considerare alternative (pet-sitter) pentru vacanțe scurte.',
    },
    {
      question: 'Ce documente sunt necesare pentru călătorii internaționale cu pisica?',
      answer: 'Documente obligatorii: microchip ISO compatibil, certificat de sănătate (valabil 10 zile), certificat de vaccinare antirabică (valabil 1-3 ani), pașaport european pentru animale (pentru UE), test titrare anticorpi antirabici (pentru anumite țări). Verifică reglementările specifice țării de destinație!',
    },
    {
      question: 'Pisica mea miaună constant în mașină. Ce pot face?',
      answer: 'Este normal, mai ales la început. Soluții: vorbește calm și liniștitor, pune muzică relaxantă pe volum redus, acoperă parțial cușca pentru a reduce stimulii vizuali, folosește spray cu feromoni (Feliway). Dacă persistă, consultă veterinarul pentru suplimente calmante naturale sau pe bază de prescripție.',
    },
    {
      question: 'Pot să-mi iau pisica în vacanță la mare sau munte?',
      answer: 'Da, dar evaluează dacă stresul călătoriei merită. Pentru vacanțe scurte (3-4 zile), este adesea mai puțin stresant pentru pisică să rămână acasă cu un pet-sitter de încredere. Pentru vacanțe mai lungi, călătoria poate fi justificată dacă pisica se adaptează bine la transport.',
    },
    {
      question: 'Ce fac dacă pisica refuză să mănânce în călătorie?',
      answer: 'Normal pentru primele 12-24 ore din cauza stresului. Oferă hrană preferată, încălzită ușor pentru miros mai atrăgător. Asigură-te că are acces constant la apă proaspătă. Dacă refuză să mănânce peste 48 ore sau arată semne de letargie severă, consultă un veterinar urgent.',
    },
  ],

  // 12. Pisică pierdută - ghid urgent
  'pisica-pierduta-ghid-urgent': [
    {
      question: 'Care sunt șansele de a găsi o pisică pierdută?',
      answer: '75% din pisicile pierdute sunt găsite în primele 24 de ore dacă proprietarii acționează imediat și corect. După 7 zile fără acțiune, șansele scad sub 20%. După 30 de zile, sub 5%. ACȚIONAREA IMEDIATĂ în primele ore este CRITICĂ pentru succes!',
    },
    {
      question: 'Unde se ascund pisicile pierdute de obicei?',
      answer: '50% din pisicile pierdute nu se depărtează cu mai mult de 50 metri de casă în primele 3 zile. Locuri comune: sub mașini parcate (cel mai frecvent!), în tufișuri și garduri vii, sub gard, în garajele veccinilor deschise, în spațiile dintre case, în cutii de carton, pe acoperișuri joase. Pisicile speritate se ascund în locuri mici, întunecate și greu accesibile.',
    },
    {
      question: 'De ce pisica mea nu vine când o strig dacă e pierdută?',
      answer: 'Pisicile pierdute intră rapid într-o stare de panică și frică extremă. NU vor răspunde la strigarea numelui lor, chiar dacă te recunosc și te aud - frica este prea puternică și instinctul le spune să rămână tăcute și nemișcate pentru a evita "prada torii". De aceea căutarea trebuie făcută ÎN TĂCERE, cu lanternă și ascultare atentă.',
    },
    {
      question: 'Ce trebuie să fac în primele 3 ore după ce realizez că pisica a dispărut?',
      answer: 'ACȚIUNE IMEDIATĂ: 1) Verifică întreaga casă (sub paturi, dulapuri, spații ascunse). 2) Caută perimetrul imediat (0-20m): sub toate mașinile, în tufișuri, garajele veccinilor. 3) Anunță TOȚI vecinii și cere-le să verifice garajele și pivnițele. 4) Postează pe Facebook în grupurile locale de animale pierdute. 5) Contactează adăposturile și clinicile veterinare din zonă. NU aștepta - fiecare oră contează!',
    },
    {
      question: 'Ce informații trebuie să conțină flyerul pentru pisică pierdută?',
      answer: 'Flyerul trebuie să includă: fotografie COLOR, CLARĂ, RECENTĂ (2-3 poze din unghiuri diferite), nume pisică, rasă/descriere detaliată, vârstă, zona pierderii, data pierderii, semne distinctive clare (pete, cicatrici, zgardă), AVERTISMENT că pisica este speriată și să nu încerce nimeni să o prindă, număr de contact MARE și vizibil. Opțional: oferă recompensă - crește semnificativ șansele!',
    },
  ],

  // 13. Mutare/relocare cu pisica
  'mutare-relocare-pisica': [
    {
      question: 'Cât timp durează până când pisica se adaptează la o casă nouă?',
      answer: 'Cu pregătire corespunzătoare, majoritatea pisicilor se adaptează în 1-2 săptămâni. Fără pregătire, procesul poate dura 1-3 luni sau mai mult. Pisicile senior sau foarte anxioase pot avea nevoie de 4-6 săptămâni chiar cu protocol corect. Fiecare pisică este unică - respectă ritmul ei individual și nu compara cu alte cazuri.',
    },
    {
      question: 'Ce este "camera sigură" și de ce este esențială?',
      answer: 'Camera sigură este o cameră mică, liniștită unde pisica stă COMPLET IZOLATĂ primele 3-5 zile în casa nouă. Conține toate resursele: litieră, hrană, apă, pat, jucării. Este esențială pentru că permite pisicii să se adapteze treptat la mirosurile și sunetele noii case fără a fi copleșită de spațiul mare. Extinderea graduală a teritoriului reduce dramatic stresul și problemele de comportament.',
    },
    {
      question: 'Pot să las pisica liberă în casa nouă din prima zi?',
      answer: 'NU! Aceasta este greșeala nr. 1 și cauza majorității problemelor de adaptare. Pisica copleșită de un spațiu mare necunoscut va: 1) Se ascunde timp îndelungat și refuză să iasă. 2) Dezvolta probleme de eliminare (urină în afara litierei). 3) Refuza hrana. 4) Încerca să fugă. Camera sigură pentru 3-5 zile, urmată de extindere graduală = succes garantat!',
    },
    {
      question: 'Ce fac dacă pisica refuză să mănânce după mutare?',
      answer: 'Refuzul hranei pentru 12-24 ore este normal din cauza stresului. Soluții: oferă hrana preferată (nu introduce alimente noi!), încălzește ușor hrana umedă pentru miros mai puternic, petrece timp în camera sigură cu pisica pentru a o liniști, folosește Feliway spray/difuzor. Dacă refuză să mănânce peste 48 ore sau nu bea apă 24h, contactează URGENT veterinarul - risc deshidratare și lipidoză hepatică.',
    },
    {
      question: 'Cum previn ca pisica să fugă în ziua mutării?',
      answer: 'IZOLARE OBLIGATORIE! Cu 2 ore înainte ca mutatorii să vină, închide pisica într-o cameră sigură (baie sau dormitor mic) cu litieră, apă, hrană și cușca de transport. Lipește un SEMN MARE pe ușă: "NU DESCHIDEȚI - PISICĂ ÎNĂUNTRU!". Informează TOȚI mutatorii despre pisică. NU scoate pisica până când ultima cutie nu a plecat din casă. Ușile deschise constant = risc URIAȘ de fugă!',
    },
  ],

  // 14. Introducere pisică nouă
  'introducere-pisica-noua': [
    {
      question: 'Cât durează procesul de introducere a unei pisici noi?',
      answer: 'Protocolul complet durează 2-6 săptămâni, în funcție de personalitatea pisicilor. FAZA 1 (separare completă): 7 zile. FAZA 2 (contact vizual prin barieră): 7 zile. FAZA 3 (interacțiune supravegheată): 7 zile. FAZA 4 (integrare completă): 7-21 zile. NU GRĂBI procesul - introducerea prea rapidă este cauza nr. 1 a conflictelor pe termen lung!',
    },
    {
      question: 'Pot să prezint pisicile direct, față în față, din prima zi?',
      answer: 'NU! Aceasta este cea mai gravă greșeală și cauzează 60% din cazurile de "pisici care nu se suportă niciodată". Contactul direct imediat = traume pentru ambele pisici, agresivitate severă, asocieri negative permanente. Odată creată o relație negativă, este de 10x mai greu să o repari. ÎNTOTDEAUNA începe cu separare completă și introducere graduală pe 2-6 săptămâni!',
    },
    {
      question: 'Ce înseamnă formula "N+1" pentru resurse?',
      answer: 'Formula de aur pentru pisici multiple: ai nevoie de N+1 din fiecare resursă, unde N=numărul total de pisici. Pentru 2 pisici: 3 litiere, 2+ stații de hrănire, 2+ boluri cu apă, multiple paturi/locuri de odihnă, 2+ posturi de zgâriat. Competiția pentru resurse = conflict garantat. Resursele abundente elimină principala cauză de conflict!',
    },
    {
      question: 'Ce semne arată că pisicile sunt gata pentru următoarea fază?',
      answer: 'Semne BUNE de progres: ambele mănâncă relaxate lângă ușă/barieră, nu mai șuieră când simt mirosul celeilalte, curiozitate calmă (urechi înainte, coadă ridicată), clipire lentă, apropierea voluntară de barieră. Semne NEGATIVE (nu ești gata): șuierături/mârâit constant, refuzul hranei, blană ridicată, fixare intensă fără clipire, lovitură cu laba spre barieră. Dacă vezi agresivitate, revino la faza anterioară pentru încă 3-5 zile!',
    },
    {
      question: 'Ce fac dacă o pisică devine bully și cealaltă victimă?',
      answer: 'Intervenție necesară: 1) Amplasează litiere/hrană în MULTIPLE locații - victima trebuie să aibă acces sigur. 2) Joacă SEPARAT cu bully-ul 2x/zi pentru a descărca energia. 3) Creează "trasee de evacuare" - victima poate scăpa ușor din orice cameră. 4) Feroch difuzoare în zonele de conflict. 5) Consultă behaviorist felin certificat dacă situația nu se îmbunătățește în 2 săptămâni. NU ignora problema - se agravează!',
    },
  ],

  // 15. Îngrijire blană
  'ingrijire-blana-pisica': [
    {
      question: 'Cât de des trebuie să periez pisica cu păr scurt vs. păr lung?',
      answer: 'Păr scurt: 2-3x/săptămână în condiții normale, ZILNIC în perioada de năpârlire (primăvară, toamnă). Timp necesar: 5-10 minute. Păr lung: ZILNIC OBLIGATORIU, 10-15 minute minim, indiferent de sezon! 2x/zi dacă este năpârlire intensă. Pisicile cu păr lung care nu sunt periaje zilnic dezvoltă încâlciri (mats) severe care trag pielea și provoacă durere - necesită tunsoare profesională sub sedare.',
    },
    {
      question: 'Cât de des trebuie să fac baie pisicii?',
      answer: 'Majoritatea pisicilor NU au nevoie de baie regulată! Pisici păr scurt sănătoase: 1-2x/AN sau deloc - se curăță singure eficient. Pisici păr lung periată zilnic: 2-4x/AN, doar când foarte murdară. Pisici fără blană (Sfinx): la 1-2 SĂPTĂMÂNI (sebum vizibil pe piele). Baia frecventă elimină uleiurile naturale protective și cauzează stres inutil. Excepție: pisici obeze/senior care nu se mai pot curăță - baie lunară.',
    },
    {
      question: 'Pot folosi șampon pentru oameni sau câini?',
      answer: 'NU! Șampoanele pentru oameni au pH diferit și irită pielea pisicii. Șampoanele pentru CÂINI pot conține PERMETRIN - TOXIC pentru pisici, poate cauza convulsii și deces! Folosește DOAR șampoane specifice pentru pisici: pH echilibrat pentru piele felină, fără substanțe toxice, fără parfumuri puternice. Cost: 30-80 lei - investiție mică pentru siguranța pisicii!',
    },
    {
      question: 'Ce sunt ghemotoace de păr (hairballs) și cum le previn?',
      answer: 'Ghemotoace = acumulări de păr în stomac din toaletare. Simptome: vărsături cu ghem de păr, tuse "secă", constipație, pierdere apetit. PREVENȚIE (eficientă 90%): 1) Periaj ZILNIC (reduce părul înghițit cu 70%!). 2) Paste pentru hairball (Malt-Soft) - 40-60 lei. 3) Hrană specială hairball control. 4) Creștere fibre în dietă. Dacă pisica nu mănâncă 24h + vărsături constante = URGENȚĂ veterinară (risc obstrucție intestinală)!',
    },
    {
      question: 'Când este necesară tunsoarea profesională?',
      answer: 'Tunsoare necesară când: 1) Încâlciri severe (mats) care nu pot fi demix - trag pielea, provoacă durere. 2) Pisică senior/bolnavă care nu se mai poate curăța. 3) Vară foarte caldă + pisică longhair (confort termic). 4) Probleme dermatologice - acces mai ușor la piele pentru tratament. Cost: Groomer 150-300 lei, Clinică veterinară cu sedare 300-600 lei. NU tunde acasă - risc mare de rănire (pielea pisicii este extrem de fină)!',
    },
  ],
};

