# 🐱 Pisicopedia.ro - Enciclopedia Pisicilor

## Despre Proiect

Pisicopedia.ro este o enciclopedie online completă dedicată pisicilor, oferind informații detaliate despre rase, sănătate și îngrijire. Site-ul face parte dintr-o rețea de site-uri specializate pe animale de companie.

### Caracteristici Principale
- 📚 **Catalog de rase** - Profile detaliate pentru cele mai populare rase
- 🏥 **Articole medicale** - Ghiduri de sănătate scrise de experți
- 🎨 **Design medical** - Interfață cu nuanțe pastel (lavandă, roz, crem)
- 🚀 **Performanță optimă** - Site static cu Next.js și SSG
- 🤖 **Content AI** - Generare automată de conținut cu OpenAI
- 📸 **Imagini realiste** - Fotografii generate cu Leonardo.ai

## 🚀 Instalare și Pornire

### Cerințe
- Node.js 18+
- npm sau yarn
- API Keys (vezi Configurare)

### Instalare
```bash
# Clonează repository-ul
git clone https://github.com/yourusername/pisicopedia-app.git
cd pisicopedia-app

# Instalează dependențele
npm install

# Configurează variabilele de mediu
cp .env.local.example .env.local
# Editează .env.local cu cheile tale API
```

### Pornire Development
```bash
# Pornește serverul de development
npm run dev

# Deschide http://localhost:3000
```

### Build pentru Producție
```bash
# Creează build optimizat
npm run build

# Pornește serverul de producție
npm start
```

## 🔧 Configurare

### Variabile de Mediu (.env.local)
```env
# OpenAI - DOAR pentru generare text
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview

# Leonardo.ai - Pentru generare imagini
LEONARDO_API_KEY=your-leonardo-api-key
```

### Obținere API Keys
1. **OpenAI**: https://platform.openai.com/api-keys
2. **Leonardo.ai**: https://app.leonardo.ai/api-access

## 📝 Workflow de Conținut

### 1. Generare Articole Medicale

```bash
# Generează un articol nou
npm run generate:article

# Urmează prompturile interactive:
# - Introdu subiectul (ex: "Vaccinarea pisicilor")
# - Selectează categoria (1-6 sau numele)
# - Articolul va fi salvat în content/articles/
```

**Categorii disponibile:**
- `prevention` - Prevenție
- `diseases` - Boli comune
- `symptoms` - Simptome
- `procedures` - Proceduri medicale
- `nutrition` - Nutriție
- `behavior` - Comportament

### 2. Generare Conținut pentru Rase

```bash
# Generează profil detaliat pentru o rasă
npm run generate:breed

# Selectează rasa existentă (1-6) sau adaugă una nouă
# Conținutul va fi salvat în content/breeds/
```

### 3. Generare Imagini

#### Pentru rase de pisici:
```bash
# Generează toate imaginile pentru rase
npm run leonardo:breeds

# Sau testează cu o singură imagine
npm run leonardo:test
```

#### Pentru articole (manual):
1. Generează imaginea cu Leonardo.ai
2. Salvează în `public/images/sanatate/[article-slug].webp`
3. Imaginea va fi folosită automat

## 📁 Structura Proiectului

```
pisicopedia-app/
├── app/                      # Next.js App Router
│   ├── (pages)/             # Pagini principale
│   │   ├── rase/            # Catalog rase
│   │   └── sanatate/        # Articole sănătate
│   ├── despre/              # Pagina Despre
│   ├── contact/             # Pagina Contact
│   ├── termeni-si-conditii/ # Termeni și condiții
│   ├── politica-confidentialitate/ # Politică confidențialitate
│   ├── not-found.tsx        # Pagină 404 personalizată
│   ├── sitemap.ts           # Sitemap automat
│   ├── robots.ts            # Robots.txt
│   └── layout.tsx           # Layout principal cu SEO
├── components/              # Componente React
│   ├── common/             # Componente reutilizabile
│   ├── layout/             # Header, Footer
│   └── sections/           # Secțiuni pagini
├── content/                # Conținut MDX generat
│   ├── articles/           # Articole medicale
│   └── breeds/             # Profile rase
├── lib/                    # Utilități și configurări
│   ├── data.ts            # Date statice (rase, articole)
│   ├── ai-config.ts       # Configurare OpenAI
│   ├── leonardo-client.ts # Client Leonardo.ai
│   └── seo.ts             # Utilități SEO
├── public/                # Fișiere statice
│   └── images/            # Imagini
│       ├── breeds/        # Imagini rase
│       └── sanatate/      # Imagini articole
└── scripts/               # Scripturi CLI
    ├── generate-article.ts        # Generator articole
    ├── generate-breed-content.ts  # Generator conținut rase
    └── generate-leonardo-breeds.ts # Generator imagini
```

## 🎨 Design și Stilizare

### Paletă de Culori
- **Lavandă**: `#e6d0ff` - Culoare principală
- **Roz pastel**: `#ffb3c8` - Accente
- **Crem**: `#fff5e6` - Fundal secundar
- **Gri cald**: `#8b7e74` - Text
- **Alb**: `#ffffff` - Fundal principal

### Componente UI
- **Container**: Wrapper responsive cu padding
- **Button**: 3 variante (primary, secondary, ghost)
- **Card**: Pentru afișare rase și articole
- **Badge**: Pentru categorii și etichete

## 📊 SEO și Performanță

### Optimizări Implementate
- ✅ **Static Site Generation** - Toate paginile pre-generate
- ✅ **Meta tags dinamice** - Title, description, OG tags
- ✅ **JSON-LD** - Structured data pentru Google
- ✅ **Sitemap automat** - Generat din date
- ✅ **Robots.txt** - Configurare crawlere
- ✅ **Imagini optimizate** - Format WebP < 200KB

### Verificare SEO
```bash
# După build, verifică:
- /sitemap.xml - Toate paginile listate
- /robots.txt - Reguli pentru crawlere
- Meta tags în HTML (View Source)
- JSON-LD în <head>
```

## 🚀 Deployment

### 📋 Cum fac un Release Nou (Prod Deploy) - Pași 1-2-3

#### Pasul 1: Pregătire Pre-Deploy
```bash
# 1.1 - Verifică că ești pe branch-ul corect
git status

# 1.2 - Pull ultimele modificări
git pull origin main

# 1.3 - Rulează testele locale
npm run build
# Trebuie să se termine fără erori!

# 1.4 - Verifică checklist-ul
# Deschide docs/launch-checklist.md și verifică toate punctele
```

#### Pasul 2: Deploy to Production
```bash
# 2.1 - Creează un tag pentru versiune
git tag -a v1.0.x -m "Release: [descriere scurtă]"
git push origin v1.0.x

# 2.2 - Deploy cu Vercel (RECOMANDAT)
vercel --prod

# SAU pentru deploy automat:
git push origin main
# (dacă ai conectat repo-ul cu Vercel)
```

#### Pasul 3: Verificare Post-Deploy
```bash
# 3.1 - Verifică site-ul live
open https://pisicopedia.ro

# 3.2 - Testează funcționalitățile critice:
# ✓ Homepage se încarcă
# ✓ Navigație funcțională
# ✓ Paginile de rase se încarcă
# ✓ Articolele se încarcă
# ✓ Mobile responsive OK

# 3.3 - Monitorizează pentru erori (primele 30 min)
# Check: Google Analytics Real-Time
# Check: Vercel Dashboard pentru erori
```

### 🔧 Vercel Setup Inițial (o singură dată)
```bash
# Instalează Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add LEONARDO_API_KEY
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
```

### 🔄 Deploy Automat cu GitHub
1. Conectează repo-ul în Vercel Dashboard
2. Setează Production Branch: `main`
3. Orice push pe `main` = deploy automat

### 📱 Preview Deployments
```bash
# Pentru a testa modificări înainte de production
vercel
# Creează un preview URL temporar

# Sau creează un PR pe GitHub
# Vercel va crea automat un preview pentru PR
```

### 🚨 Rollback în Caz de Probleme
```bash
# Opțiunea 1: Rollback instant în Vercel Dashboard
# Deployments → Select previous deployment → Promote to Production

# Opțiunea 2: Git revert
git revert HEAD
git push origin main

# Opțiunea 3: Deploy tag anterior
vercel --prod --force
```

### 📊 Monitorizare Post-Deploy
- **Primele 5 minute**: Verifică manual funcționalitățile
- **Prima oră**: Monitorizează Analytics pentru erori
- **Primele 24h**: Check Search Console pentru erori de crawling
- **După 48h**: Analizează metrici de performanță

### ⚙️ Alternative: Netlify
```bash
# Build command: npm run build
# Publish directory: out
# Environment variables: Set în dashboard
```

## 🔄 Actualizare Conținut

### Adăugare Articol Nou
1. Generează articolul: `npm run generate:article`
2. Generează imaginea cu Leonardo.ai
3. Salvează imaginea în `public/images/sanatate/`
4. Rebuild: `npm run build`

### Adăugare Rasă Nouă
1. Adaugă în `lib/data.ts` → `breeds`
2. Generează conținut: `npm run generate:breed`
3. Generează imagine: `npm run leonardo:breeds`
4. Rebuild: `npm run build`

## 📋 Checklist Lansare

- [ ] Configurare domeniu pisicopedia.ro
- [ ] Setare variabile de mediu în producție
- [ ] Generare conținut inițial (6 rase + 10 articole)
- [ ] Generare toate imaginile
- [ ] Verificare SEO cu Google Search Console
- [ ] Instalare Google Analytics
- [ ] Testare pe mobile
- [ ] Verificare performanță (Lighthouse)
- [ ] Backup cod și conținut

## 🛠️ Comenzi Utile

```bash
# Development
npm run dev              # Start development server

# Content Generation
npm run generate:article # Generate new article
npm run generate:breed   # Generate breed content

# Image Generation
npm run leonardo:test    # Test image generation
npm run leonardo:breeds  # Generate all breed images

# Production
npm run build           # Create production build
npm run start           # Start production server

# Code Quality
npm run lint            # Check code quality
```

## 📚 Resurse

- [Next.js Docs](https://nextjs.org/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Leonardo.ai API](https://docs.leonardo.ai/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚀 Primii pași după lansare

### Conținut inițial implementat
✅ **10 rase complete** cu profile detaliate MDX
✅ **10 articole medicale** cu informații complete
✅ **30 rase** în total planificate (lista completă în `lib/content-lists.ts`)
✅ **30 articole** în total planificate

### Ritm recomandat de publicare
Pentru a construi autoritate și trafic organic:

#### Săptămâna 1-2
- **+3 articole noi/zi** din lista existentă
- Focus pe urgențe și probleme comune
- Promovare pe social media

#### Săptămâna 3-4
- **+2 rase noi/zi** din lista rămasă
- Articole de sezon (deparazitare primăvara, etc.)
- Începe colectare email-uri

#### Luna 2+
- **Ritm sustenabil**: 2-3 conținut nou/săptămână
- Actualizare conținut existent
- Guest posts și colaborări

### Workflow simplu pentru conținut nou

#### 1️⃣ Pentru articol nou:
```bash
# Opțiunea A: Generator automat cu AI
npm run generate:article

# Opțiunea B: Creare manuală
# Copiază un template din content/articles/
# Modifică frontmatter și conținut
```

#### 2️⃣ Pentru rasă nouă:
```bash
# Opțiunea A: Generator automat
npm run generate:breed

# Opțiunea B: Manual
# Copiază template din content/breeds/
```

#### 3️⃣ Generare imagine (opțional):
```bash
# Pentru rase
npm run leonardo:breeds

# Pentru articole - manual pe leonardo.ai
```

#### 4️⃣ Verificare locală:
```bash
npm run dev
# Verifică pe http://localhost:3000
```

#### 5️⃣ Deploy:
```bash
git add .
git commit -m "Add: [nume conținut]"
git push
# Vercel face deploy automat
```

### Metrici de urmărit

#### Primele 30 zile:
- [ ] 30 articole publicate
- [ ] 20 rase complete
- [ ] Google Search Console configurat
- [ ] 100+ pagini indexate
- [ ] Prima poziție pentru "pisici România"

#### Primele 90 zile:
- [ ] 1000+ vizitatori unici/lună
- [ ] 50+ keywords pe prima pagină
- [ ] Newsletter cu 100+ abonați
- [ ] Parteneriate cu 2-3 clinici veterinare

## 🤝 Contribuții

Pentru sugestii sau probleme, contactează echipa la contact@pisicopedia.ro

## 📄 Licență

© 2024 Pisicopedia.ro - Toate drepturile rezervate

---

**Dezvoltat cu ❤️ pentru iubitorii de pisici din România**