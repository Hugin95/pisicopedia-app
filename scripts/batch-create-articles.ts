#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const articlesData = [
  {
    slug: 'pisica-stranuta',
    title: 'Pisica strănută des: cauze și tratament',
    description: 'Ghid complet despre strănut la pisici - de la alergii la infecții respiratorii grave',
    category: 'simptome',
    subcategory: 'respiratorii',
    content: `
## Cauze frecvente de strănut

### 1. Infecții respiratorii
- **Rinotraheită (Herpesvirus)** - foarte frecvent, cronic
- **Calicivirus** - strănut + ulcere orale
- **Chlamydia** - strănut + conjunctivită
- **Infecții bacteriene secundare**

### 2. Alergii și iritanți
- Polen, praf, mucegai
- Parfumuri, detergenți
- Fumul de țigară
- Litieră parfumată

### 3. Corps străine nazale
- Fire de iarbă
- Semințe
- Necesită extracție veterinară

### 4. Probleme dentare
- Abcese radiculare superioare
- Fistule oro-nazale

## Semne de urgență
- Strănut cu sânge
- Dificultate respiratorie
- Secreții purulente verzi/galbene
- Deformare facială
- Nu mănâncă >24 ore

## Tratament acasă
- Umidificare aer
- Curățare secreții cu ser fiziologic
- Izolare de iritanți
- **NU medicamente umane!**

## Când la veterinar
- Strănut persistent >3 zile
- Orice sângerare
- Febră sau letargie
- Pisoi sau pisici bătrâne`
  },
  {
    slug: 'insuficienta-renala',
    title: 'Insuficiența renală la pisici: ghid complet',
    description: 'Tot ce trebuie să știți despre boala renală cronică - diagnostic, tratament și management',
    category: 'boli',
    subcategory: 'cronice',
    content: `
## Ce este insuficiența renală

Boala renală cronică (CKD) afectează 30-40% din pisicile >10 ani. Rinichii își pierd progresiv capacitatea de filtrare.

## Stadiile bolii
- **Stadiul 1**: Creatinină normală, alte semne prezente
- **Stadiul 2**: Creatinină 1.6-2.8 mg/dl
- **Stadiul 3**: Creatinină 2.9-5.0 mg/dl
- **Stadiul 4**: Creatinină >5.0 mg/dl

## Simptome după stadiu

### Stadiu timpuriu:
- Bea mai mult
- Urinează mai mult
- Pierdere ușoară în greutate

### Stadiu avansat:
- Vomă frecventă
- Pierdere apetit
- Deshidratare
- Anemie
- Ulcere bucale

## Diagnostic
- Analize sânge (uree, creatinină, fosfor)
- Analiză urină (densitate, proteine)
- Ecografie renală
- Tensiune arterială

## Tratament

### Dietă renală
- **ESENȚIALĂ** - poate dubla supraviețuirea
- Proteine reduse dar de calitate
- Fosfor redus
- Omega-3 adăugate

### Medicație:
- Inhibitori ACE (Benazepril)
- Chelatori fosfor
- Stimulente apetit
- Antiemetice

### Fluide subcutanate
- 100-200ml la 1-3 zile
- Învățați tehnica de la veterinar
- Îmbunătățește dramatic calitatea vieții

## Monitorizare
- Analize la 3-6 luni
- Tensiune arterială
- Greutate săptămânală
- Jurnal simptome`
  },
  {
    slug: 'diabet-pisici',
    title: 'Diabetul la pisici: simptome, diagnostic și tratament',
    description: 'Ghid complet despre diabetul felin - de la primele semne la managementul cu insulină',
    category: 'boli',
    subcategory: 'endocrine',
    content: `
## Ce este diabetul felin

Diabetul apare când pancreasul nu produce suficientă insulină sau corpul nu o poate folosi eficient. Afectează 1 din 200 pisici.

## Factori de risc
- Obezitate (risc x4)
- Vârstă >7 ani
- Masculi castrați
- Corticosteroizi
- Pancreatită cronică

## Simptome clasice (cele 4 P-uri)
1. **Poliurie** - urinează mult
2. **Polidipsie** - bea mult
3. **Polifagie** - mănâncă mult
4. **Pierdere pondere** - slăbește paradoxal

## Semne avansate
- Mers pe călcâie (neuropatie)
- Blană degradată
- Letargie
- Vomă
- Cetoacidoză (urgență!)

## Diagnostic
- Glicemie >250 mg/dl
- Glucoză în urină
- Fructozamină pentru confirmare

## Tratament cu insulină

### Tipuri insulină:
- Glargine (Lantus) - preferată
- PZI (ProZinc)
- Detemir (Levemir)

### Protocol:
- Start conservator: 0.25-0.5 U/kg
- Injecții la 12 ore
- Ajustare după curbe glicemice

## Monitorizare acasă
- Glucometru veterinar
- Teste urină
- Jurnal: apetit, sete, urină
- Semne hipoglicemie

## Remisie diabetică
- Posibilă în 30-80% cazuri
- Dietă low-carb esențială
- Slăbire la pisici obeze
- Control strict primele luni`
  },
  {
    slug: 'vaccinare-pisici',
    title: 'Ghid complet de vaccinare pentru pisici',
    description: 'Calendar vaccinal, tipuri de vaccin și reacții adverse - tot ce trebuie să știți',
    category: 'preventie',
    subcategory: 'vaccinuri',
    content: `
## Vaccinuri esențiale (CORE)

### 1. FVRCP (Trivalent)
Protejează contra:
- **F**eline **V**iral **R**hinotracheitis (Herpesvirus)
- **C**alicivirus
- **P**anleukopenia (parvoviroza felină)

### 2. Antirabic
- Obligatoriu legal în România
- Prima doză la 12 săptămâni
- Rapel anual

## Calendar vaccinal pisoi

### 6-8 săptămâni:
- FVRCP prima doză

### 10-12 săptămâni:
- FVRCP rapel
- FeLV dacă vor ieși afară

### 14-16 săptămâni:
- FVRCP rapel final
- Antirabic
- FeLV rapel dacă s-a făcut

### 1 an:
- FVRCP booster
- Antirabic
- FeLV dacă iese afară

### Adult:
- FVRCP la 3 ani (interior) sau anual (exterior)
- Antirabic anual

## Vaccinuri opționale

### FeLV (Leucemie)
- Pentru pisici cu acces exterior
- Test înainte de vaccinare
- 2 doze inițial, rapel anual

### FIV
- Nu se recomandă de rutină
- Interferă cu testarea

### Chlamydia
- În cazuri speciale
- Adăpostri cu focare

## Reacții adverse

### Normale (24-48h):
- Letargie ușoară
- Apetit redus
- Sensibilitate la locul injecției
- Febră ușoară

### URGENȚE (rare):
- Umflare față/bot
- Dificultate respiratorie
- Vomă repetată
- Colaps

## Contraindicații
- Pisici bolnave
- Gravide
- Imunosuprimate
- Sub tratament cortizonic`
  },
  {
    slug: 'deparazitare-pisici',
    title: 'Deparazitarea internă și externă la pisici',
    description: 'Ghid complet despre paraziți - identificare, tratament și prevenție',
    category: 'preventie',
    subcategory: 'paraziti',
    content: `
## Paraziți interni

### 1. Viermi rotunzi (Ascaride)
- Cei mai frecvenți
- Aspect "spaghete"
- Transmitere: ouă în fecale

### 2. Viermi plați (Tenii)
- Segmente ca "boabe de orez"
- Transmitere: purici înghițiți

### 3. Anchilostome
- Sug sânge, cauzează anemie
- Mai rari la pisici

### 4. Giardia
- Parazit microscopic
- Diaree cronică
- Test special necesar

## Protocol deparazitare internă

### Pisoi:
- 2, 4, 6, 8, 12 săptămâni
- Lunar până la 6 luni

### Adulți:
- **Interior only**: la 3-6 luni
- **Acces exterior**: lunar sau la 3 luni
- **Vânători activi**: lunar

## Paraziți externi

### 1. Purici
- 95% în mediu, 5% pe pisică
- Transmit tenii
- Dermatită alergică

### 2. Căpușe
- Transmit boli grave
- Verificare după ieșiri
- Extragere corectă esențială

### 3. Acarieni urechi
- "Cerumen" negru
- Mâncărime intensă
- Foarte contagioși

## Produse recomandate

### Spot-on lunar:
- Advantage (doar purici)
- Frontline (purici + căpușe)
- Broadline (spectru larg)
- Revolution Plus (complet)

### Comprimate:
- Milbemax (viermi)
- Drontal (viermi)
- Bravecto (purici + căpușe 3 luni)

## Prevenție naturală limitată
- Usturoi/drojdie - TOXICE!
- Uleiuri esențiale - periculoase
- Diatomee - eficiență limitată
- **Folosiți produse veterinare!**`
  },
  {
    slug: 'sterilizare-pisici',
    title: 'Sterilizarea pisicilor: avantaje, procedură și recuperare',
    description: 'Tot despre sterilizare/castrare - când, cum și de ce este esențială',
    category: 'proceduri',
    subcategory: 'chirurgie',
    content: `
## De ce sterilizarea este ESENȚIALĂ

### Beneficii medicale femele:
- Previne **100%** cancerul ovarian/uterin
- Reduce cu 90% cancerul mamar (dacă e făcută înainte de primul călduri)
- Elimină riscul de piometră (infecție uterină fatală)
- Oprește căldurile stresante

### Beneficii medicale masculi:
- Elimină cancerul testicular
- Reduce agresivitatea cu 85%
- Reduce marcajul cu urină cu 90%
- Reduce rătăcirea și luptele

## Vârsta optimă

### Sterilizare timpurie:
- **Ideal**: 4-6 luni
- Posibil de la 8 săptămâni
- Recuperare mai rapidă
- Beneficii maxime

### Mituri FALSE:
- ❌ "Trebuie să facă o dată pui"
- ❌ "Se îngrașă automat"
- ❌ "Își schimbă personalitatea"
- ❌ "E prea tânără/bătrână"

## Pregătire pre-operatorie
1. Post 12 ore (fără mâncare)
2. Fără apă dimineața
3. Analize pre-anestezice (recomandat)
4. Transportator sigur

## Procedura

### Femele (ovariohisterectomie):
- Anestezie generală
- Incizie abdominală mică
- Îndepărtare ovare + uter
- Sutură internă + externă
- Durată: 20-30 minute

### Masculi (castrare):
- Mai simplă
- Incizie scrotală
- Îndepărtare testicule
- Durată: 10-15 minute

## Recuperare

### Primele 24 ore:
- Confuzie post-anestezie
- Ținut în spațiu sigur, cald
- Fără sărituri
- Apă după 4 ore, mâncare după 6

### 7-10 zile:
- Guler elizabetan OBLIGATORIU
- Verificare zilnică incizie
- Fără băi
- Activitate limitată

## Semne de complicații
- Sângerare activă
- Umflare excesivă
- Secreții purulente
- Deschiderea inciziei
- Letargie după 48h

## Costuri estimate (România)
- Femele: 250-500 RON
- Masculi: 150-300 RON
- Include: anestezie, chirurgie, antibiotice`
  },
  {
    slug: 'analize-sange-pisici',
    title: 'Analizele de sânge la pisici: ce arată și când sunt necesare',
    description: 'Ghid pentru înțelegerea analizelor - hemoleucogramă, biochimie și interpretare',
    category: 'proceduri',
    subcategory: 'diagnostic',
    content: `
## Tipuri principale de analize

### 1. Hemoleucograma (CBC)
Evaluează celulele sanguine:
- **Hematii (RBC)** - transportă oxigen
- **Hemoglobina** - scăzută = anemie
- **Leucocite (WBC)** - sistem imunitar
- **Trombocite** - coagulare

### 2. Biochimia sanguină
Evaluează organele:
- **Uree/Creatinină** - funcție renală
- **ALT/AST** - funcție hepatică
- **Glicemie** - diabet
- **Proteine totale** - stare generală
- **Electroliți** - Na, K, Cl

### 3. Teste specializate
- **T4** - funcție tiroidă
- **fPLI** - pancreatită
- **SDMA** - detectare precoce boli renale
- **Fructozamină** - control diabet

## Când sunt necesare

### Analize de rutină:
- **Anual** până la 7 ani
- **Bi-anual** după 7 ani
- Pre-anestezic
- Pisoi adoptați

### Analize urgente pentru:
- Vomă/diaree persistente
- Pierdere pondere inexplicabilă
- Letargie severă
- Nu mănâncă >48h
- Bea excesiv

## Pregătire pentru analize
- Post 8-12 ore (ideal)
- Hidratare normală
- Evitați stresul excesiv
- Aduceți istoric medical

## Interpretarea rezultatelor

### Valori normale principale:
- **Creatinină**: 0.8-2.4 mg/dl
- **Uree**: 16-36 mg/dl
- **Glicemie**: 74-159 mg/dl
- **Hematocrit**: 25-45%

### Ce înseamnă devierile:

**Creatinină crescută:**
- Boală renală
- Deshidratare
- Obstrucție urinară

**ALT crescut:**
- Hepatită
- Lipidoză hepatică
- Toxine

**Leucocite crescute:**
- Infecție
- Inflamație
- Stres acut
- Leucemie

## Costuri estimate
- Hemoleucogramă: 60-100 RON
- Biochimie standard: 120-200 RON
- Profil complet: 250-400 RON
- Teste specializate: 80-150 RON/test`
  },
  {
    slug: 'stres-pisici',
    title: 'Stresul la pisici: cauze, simptome și management',
    description: 'Ghid complet despre stresul felin - identificare, reducere și crearea unui mediu calm',
    category: 'comportament',
    subcategory: 'psihologic',
    content: `
## Cauzele stresului felin

### Schimbări de mediu:
- Mutare casă nouă
- Mobilă rearanjată
- Renovări/zgomote
- Oaspeți/petreceri
- Animal nou

### Probleme sociale:
- Conflict între pisici
- Bullying la litieră/mâncare
- Teritoriu insuficient
- Lipsa proprietarului

### Factori medicali:
- Durere cronică
- Boli ascunse
- Efecte secundare medicamente

## Simptome comportamentale

### Evidente:
- Ascundere excesivă
- Agresivitate nouă
- Vocalizare excesivă
- Marcaj cu urină
- Eliminare în afara litierei

### Subtile:
- Over-grooming (chelie)
- Apetit modificat
- Somn perturbat
- Evitare contact
- "Înghețare" frecventă

## Simptome fizice
- Diaree/constipație
- Cistită idiopatică
- Vărsături de stres
- Pierdere blană
- Sistem imunitar slăbit

## Soluții practice

### Îmbogățire ambientală:
- **Verticalizare** - rafturi, copaci
- **Ascunzișuri** - cutii, peșteri
- **Ferestre** - bird TV natural
- **Jucării** - rotație săptămânală

### Rutină și predictibilitate:
- Ore fixe de masă
- Curățare litieră regulat
- Timp de joacă programat
- Ritual de culcare

### Resurse multiple (N+1):
- Litiere = nr. pisici + 1
- Boluri apă/mâncare separate
- Zone de odihnă multiple
- Trasee alternative

## Produse calmante

### Feromoni:
- **Feliway Classic** - calm general
- **Feliway Friends** - conflicte
- Difuzor/spray

### Suplimente:
- Zylkene (cazeiną)
- Anxitane (L-teanină)
- CBD veterinar

### Medicamente (prescripție):
- Gabapentin - anxietate acută
- Fluoxetină - stres cronic
- Clomipramină - probleme severe

## Plan anti-stres

### Săptămâna 1-2:
- Identificați sursa stresului
- Implementați feromoni
- Creați zone sigure

### Săptămâna 3-4:
- Îmbogățire ambientală
- Rutină strictă
- Evaluare progres

### Luna 2+:
- Ajustări fine
- Considerați suplimente
- Consult comportamentalist`
  }
];

async function createArticles() {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');

  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  for (const article of articlesData) {
    const date = new Date().toISOString().split('T')[0];

    const mdxContent = `---
title: "${article.title}"
description: "${article.description}"
slug: "${article.slug}"
category: "${article.category}"
subcategory: "${article.subcategory}"
date: "${date}"
author: "Dr. Veterinar Pisicopedia"
readingTime: "8 min"
tags: ${JSON.stringify([article.category, article.subcategory, 'pisici', 'sănătate'])}
---

# ${article.title}

${article.content}

## Concluzie

Informațiile prezentate în acest articol sunt bazate pe cercetări veterinare actuale și experiență clinică. Fiecare pisică este unică, iar răspunsul la tratament poate varia. Colaborarea strânsă cu medicul veterinar este esențială pentru rezultate optime.

---

*Acest articol are rol informativ și educațional. Pentru probleme medicale specifice, consultați întotdeauna un medic veterinar calificat. Nu amânați vizita la veterinar în caz de urgență - timpul poate fi critic pentru salvarea vieții pisicii dumneavoastră.*`;

    const filePath = path.join(articlesDir, `${article.slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent);
    console.log(`✅ Created: ${article.slug}.mdx`);
  }
}

createArticles().then(() => {
  console.log('\n🎉 All articles created successfully!');
}).catch(console.error);