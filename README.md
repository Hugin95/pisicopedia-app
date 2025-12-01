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

## 🤖 Sistem AUTO-POST cu Coadă (Queue-based)

### Ce este Auto-Post?
Sistem complet automatizat pentru generarea de articole noi folosind:
- **Coadă JSON** (`content/auto-queue.json`) - 40 topicuri pre-definite
- **OpenAI GPT-4** - Generare text profesional în română (1400-1800 cuvinte)
- **Leonardo.ai** - Generare imagini dedicate pentru fiecare articol
- **Actualizare automată** - Adaugă articolele noi în `lib/content-lists.ts`

### Comenzi Disponibile

#### Generare 1 Articol:
```bash
npm run auto:post
```

**Ce face:**
1. ✅ Citește `content/auto-queue.json`
2. ✅ Selectează primul topic cu `status: "pending"`
3. ✅ Generează conținut complet cu OpenAI (1400-1800 cuvinte)
4. ✅ Generează imagine cu Leonardo.ai
5. ✅ Salvează MDX în `content/articles/` sau `content/guides/`
6. ✅ Salvează imagine în `public/images/articles/` sau `public/images/guides/`
7. ✅ Actualizează `lib/content-lists.ts` automat
8. ✅ Marchează topic-ul ca `status: "done"` în queue

#### Generare în Lot (Batch):
```bash
npm run auto:batch
# Generează 3 articole automat (configurabil în package.json)

# Sau cu argument custom:
npx tsx scripts/auto-post.ts --batch=5
# Generează 5 articole
```

### Configurare Chei API

Adaugă în `.env.local`:
```env
# OpenAI - Pentru generare text
OPENAI_API_KEY=sk-...

# Leonardo.ai - Pentru generare imagini (OPȚIONAL)
LEONARDO_API_KEY=...
```

**Notă:** Dacă `LEONARDO_API_KEY` lipsește, sistemul va folosi imagini placeholder automat.

### Cum Funcționează Coada (Queue)?

#### 1. Editare Topics
Deschide `content/auto-queue.json` și adaugă/modifică topicuri:

```json
[
  {
    "id": "T001",
    "title": "Pisica vomită spumă albă dimineața",
    "slug": "pisica-vomita-spuma-alba-dimineata",
    "category": "sanatate",
    "focusKeyword": "pisica vomita spuma alba dimineata",
    "status": "pending",
    "createdAt": null,
    "publishedAt": null
  }
]
```

**Categorii disponibile:**
- `sanatate` - Articole medicale (salvate în `content/articles/`)
- `ghid` - Ghiduri practice (salvate în `content/guides/`)

#### 2. Rulare Auto-Post
```bash
npm run auto:post
```

Sistemul va:
- ✅ Găsi primul topic cu `"status": "pending"`
- ✅ Genera articolul complet
- ✅ Marca topic-ul ca `"status": "done"`
- ✅ Adăuga timestamp-uri: `createdAt`, `publishedAt`

#### 3. Verificare Rezultat
```bash
# Verifică conținutul generat
npm run validate:content

# Verifică build-ul
npm run build
```

### Structură Articole Generate

#### Pentru categoria "sanatate":
```markdown
---
title: "Pisica vomită spumă albă dimineața"
slug: "pisica-vomita-spuma-alba-dimineata"
category: "sanatate"
focusKeyword: "pisica vomita spuma alba dimineata"
image: "/images/articles/pisica-vomita-spuma-alba-dimineata.jpg"
---

## Introducere (răspuns direct)

## Cauze posibile

## Ce poți observa acasă

## Ce poți face în siguranță acasă

## Când trebuie mers de urgență la veterinar

## Prevenție

## Întrebări frecvente

## Concluzie

**Notă:** Disclaimer medical obligatoriu
```

#### Pentru categoria "ghid":
```markdown
---
title: "Cum să socializezi o pisică adoptată adult"
category: "ghid"
---

## Introducere

## Înțelegerea pisicii adulte

## Pregătirea casei

## Etapele socializării (pas cu pas)

## Greșeli de evitat

## Întrebări frecvente

## Concluzie
```

### Automatizare cu Cron Job

Pentru generare automată 1 articol/zi:

```bash
# Linux/Mac - Editează crontab
crontab -e

# Adaugă linia:
0 10 * * * cd /path/to/pisicopedia-app && npm run auto:post && npm run build
# Rulează zilnic la 10:00 AM

# Windows - Task Scheduler
# Creează task cu acțiunea: npm run auto:post
```

### Monitorizare Queue

Verifică status-ul queue-ului:
```bash
# Citește auto-queue.json
cat content/auto-queue.json | grep "pending" | wc -l
# Afișează numărul de articole rămase
```

### Resetare Queue (dacă e nevoie)

Pentru a reseta toate topic-urile la `pending`:
```bash
# Editează manual auto-queue.json
# SAU rulează un script custom pentru reset
```

### Note Importante
- ✅ **Queue-ul este editabil** - Adaugă noi topicuri oricând în `auto-queue.json`
- ✅ **Failsafe** - Dacă Leonardo.ai eșuează, folosește placeholder automat
- ✅ **Validare automată** - Toate articolele includ disclaimer medical
- ✅ **SEO-ready** - Focus keyword, meta description, structured FAQ
- ⚠️ **Cost OpenAI** - Fiecare articol costă ~$0.10-0.20 (GPT-4)
- ⚠️ **Cost Leonardo** - Fiecare imagine costă ~$0.01-0.05

---

## 🔁 Auto-Post AUTOPILOT (Vercel Cron)

### Ce este Autopilot?

Sistem **complet automat** care rulează pe Vercel fără nicio intervenție manuală. Site-ul generează singur articole noi la interval regulat folosind **Vercel Cron Jobs**.

**Zero comenzi în terminal** - tot ce trebuie e să configurezi variabilele de mediu și să dai push pe Vercel!

### Arhitectură

```
Vercel Cron (la fiecare 2 ore)
    ↓
POST /api/auto-post?secret=CRON_SECRET
    ↓
lib/auto-post.ts → runAutoPostOnce()
    ↓
1. Verifică limita zilnică (MAX_AUTO_POSTS_PER_DAY)
2. Citește content/auto-queue.json
3. Generează articol cu OpenAI
4. Generează imagine cu Leonardo.ai
5. Salvează MDX + imagine
6. Actualizează lib/content-lists.ts
7. Marchează topic ca "done"
8. Loghează în logs/auto-post-[YYYY-MM-DD].json
```

### Setup Pas cu Pas

#### 1. Configurare Environment Variables în Vercel

Du-te în **Vercel Dashboard** → Settings → Environment Variables și adaugă:

```env
# OBLIGATORII
OPENAI_API_KEY=sk-...
CRON_SECRET=your-strong-random-secret-here

# OPȚIONALE
LEONARDO_API_KEY=...
MAX_AUTO_POSTS_PER_DAY=5
```

**⚠️ Important:** `CRON_SECRET` trebuie să fie un string aleatoriu puternic (min 32 caractere). Folosește un generator de parole sau:

```bash
# Generează un secret puternic
openssl rand -hex 32
```

#### 2. Verifică vercel.json

Fișierul `vercel.json` este deja configurat:

```json
{
  "crons": [
    {
      "path": "/api/auto-post?secret=$CRON_SECRET",
      "schedule": "0 */2 * * *"
    }
  ]
}
```

**Schedule-uri disponibile:**
- `0 */2 * * *` - La fiecare 2 ore (12 articole/zi maxim)
- `0 */3 * * *` - La fiecare 3 ore (8 articole/zi maxim)
- `0 */4 * * *` - La fiecare 4 ore (6 articole/zi maxim)
- `0 9,15,21 * * *` - La 9 AM, 3 PM, 9 PM (3 articole/zi)
- `0 10 * * *` - Zilnic la 10 AM (1 articol/zi)

**Notă:** Schedule-ul folosește format cron standard. Vercel înlocuiește automat `$CRON_SECRET` cu valoarea din env vars.

#### 3. Deploy pe Vercel

```bash
# Commit changes
git add .
git commit -m "Add auto-post autopilot with Vercel Cron"

# Push to GitHub (sau GitLab/Bitbucket)
git push origin main

# Vercel va face deploy automat dacă ai conectat repo-ul
```

După deploy, cronul se activează automat!

#### 4. Verificare Cron Status

Du-te în **Vercel Dashboard** → Deployments → Cron Jobs pentru a vedea:
- ✅ Status: Active/Paused
- 📊 Ultima rulare
- 📝 Logs pentru fiecare execuție
- ⏰ Următoarea rulare programată

### API Endpoints

#### POST /api/auto-post

Generează 1 articol automat.

**Request:**
```bash
# Trigger manual cu cURL
curl -X POST 'https://pisicopedia.ro/api/auto-post?secret=YOUR_CRON_SECRET'

# Sau cu fetch în JavaScript
fetch('/api/auto-post?secret=YOUR_CRON_SECRET', {
  method: 'POST'
})
```

**Responses:**

✅ **Succes (status: created):**
```json
{
  "status": "created",
  "slug": "pisica-vomita-spuma-alba-dimineata",
  "title": "Pisica vomită spumă albă dimineața",
  "category": "sanatate",
  "duration": 45320,
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

⚠️ **Limită atinsă (status: limit-reached):**
```json
{
  "status": "limit-reached",
  "message": "Daily limit of 5 articles reached",
  "limit": 5,
  "current": 5,
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

ℹ️ **Queue gol (status: empty):**
```json
{
  "status": "empty",
  "message": "No pending topics in queue",
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

❌ **Eroare (status: error):**
```json
{
  "status": "error",
  "error": "OPENAI_API_KEY is not set",
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

🚫 **Unauthorized (401):**
```json
{
  "status": "error",
  "error": "Unauthorized. Invalid or missing secret."
}
```

#### GET /api/auto-post

Verifică status-ul sistemului fără a genera articol.

**Request:**
```bash
curl 'https://pisicopedia.ro/api/auto-post?secret=YOUR_CRON_SECRET'
```

**Response:**
```json
{
  "status": "ready",
  "queue": {
    "pending": 35,
    "done": 5,
    "total": 40
  },
  "config": {
    "maxPerDay": 5,
    "openaiConfigured": true,
    "leonardoConfigured": true
  },
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

### Admin Dashboard (Manual Trigger)

Pentru a declanșa manual generarea de articole fără terminal:

1. Accesează: **https://pisicopedia.ro/admin/auto-post**
2. Introdu `CRON_SECRET` în form
3. Click pe "Generate 1 Article" sau "Get Status"
4. Vezi rezultatul în real-time

**Features:**
- 📊 Status queue (pending/done/total)
- ✅ Verificare configurare (OpenAI, Leonardo)
- 🚀 Trigger manual instant
- 📈 Vizualizare limite zilnice
- 🔍 JSON raw response pentru debugging

### Logging și Monitorizare

#### Daily Logs

Fiecare articol generat este logat în `logs/auto-post-[YYYY-MM-DD].json`:

```json
{
  "date": "2025-01-15",
  "articles": [
    {
      "slug": "pisica-vomita-spuma-alba-dimineata",
      "timestamp": "2025-01-15T10:00:00.000Z",
      "title": "Pisica vomită spumă albă dimineața"
    },
    {
      "slug": "pisica-nu-mananca",
      "timestamp": "2025-01-15T12:00:00.000Z",
      "title": "Pisica nu mănâncă - Cauze și Soluții"
    }
  ]
}
```

**Utilizare:**
- Tracking: Vezi exact câte articole au fost generate și când
- Debugging: Identifică probleme în cronul zilnic
- Limite: Sistemul verifică automat acest log pentru MAX_AUTO_POSTS_PER_DAY

#### Vercel Logs

Vezi logs în timp real în **Vercel Dashboard**:
- Du-te la **Deployments** → Latest deployment → **Runtime Logs**
- Filtrează după `/api/auto-post`
- Vezi output complet: OpenAI calls, Leonardo status, erori

### Limitare și Siguranță

#### Limite Zilnice

Sistemul previne spam și costuri excesive prin:

```typescript
// În lib/auto-post.ts
function checkDailyLimit() {
  const maxPerDay = parseInt(process.env.MAX_AUTO_POSTS_PER_DAY || '5', 10);
  const todayLog = getTodayLog();
  const current = todayLog.articles.length;

  return {
    allowed: current < maxPerDay,
    current,
    limit: maxPerDay,
  };
}
```

**Exemple de configurare:**

| MAX_AUTO_POSTS_PER_DAY | Cron Schedule     | Articole/Zi | Uz                          |
|------------------------|-------------------|-------------|-----------------------------|
| 5                      | `0 */2 * * *`     | 5           | Default (moderat)           |
| 10                     | `0 */2 * * *`     | 10          | Creștere rapidă             |
| 3                      | `0 9,15,21 * * *` | 3           | Controlat, fix hours        |
| 1                      | `0 10 * * *`      | 1           | Minim, 1 pe zi la 10 AM     |

#### Autentificare Secret

API-ul este protejat cu `CRON_SECRET`:

```typescript
// Verificare în app/api/auto-post/route.ts
const cronSecret = process.env.CRON_SECRET;
const providedSecret = request.nextUrl.searchParams.get('secret');

if (!providedSecret || providedSecret !== cronSecret) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Best practices:**
- ✅ Folosește un secret de min 32 caractere
- ✅ NU expune secretul în cod sau frontend
- ✅ Setează-l doar în Vercel env vars
- ✅ Rotește-l periodic (o dată la 6 luni)

#### Error Handling

Sistemul nu modifică queue-ul dacă apar erori:

```typescript
if (result.status === 'error') {
  // Topic rămâne "pending"
  // Nu se marchează ca "done"
  // Log eroarea pentru debugging
  console.error('[Auto-Post] Error:', result.error);
}
```

Astfel, cronul următor va reîncerca același topic până reușește.

### Testare Locală

Înainte de deploy, testează local:

```bash
# 1. Setează env vars în .env.local
OPENAI_API_KEY=sk-...
LEONARDO_API_KEY=...
CRON_SECRET=test-secret-local
MAX_AUTO_POSTS_PER_DAY=5

# 2. Pornește dev server
npm run dev

# 3. Test API endpoint
curl -X POST 'http://localhost:3000/api/auto-post?secret=test-secret-local'

# 4. Verifică logs/auto-post-[DATE].json
cat logs/auto-post-$(date +%Y-%m-%d).json

# 5. Verifică content/auto-queue.json (topic marcat ca "done")
```

### Troubleshooting

#### Cronul nu rulează

**1. Verifică Cron Status în Vercel:**
- Dashboard → Cron Jobs → verifică dacă e "Active"
- Dacă e "Paused", activează-l manual

**2. Verifică vercel.json:**
```json
{
  "crons": [
    {
      "path": "/api/auto-post?secret=$CRON_SECRET",
      "schedule": "0 */2 * * *"
    }
  ]
}
```

**3. Redeploy:**
```bash
git commit --allow-empty -m "Trigger redeploy for cron"
git push origin main
```

#### Eroare "Unauthorized"

- Verifică că `CRON_SECRET` e setat în Vercel env vars
- Verifică că `vercel.json` folosește `$CRON_SECRET` (NU valoarea hardcoded)

#### Eroare "OPENAI_API_KEY not set"

- Setează `OPENAI_API_KEY` în Vercel env vars (Dashboard → Settings → Environment Variables)
- Redeploy după setare

#### Limită atinsă constant

- Verifică `MAX_AUTO_POSTS_PER_DAY` în env vars
- Mărește limita sau ajustează cron schedule-ul
- Verifică `logs/auto-post-[DATE].json` pentru a vedea câte au fost generate

#### Queue gol

- Verifică `content/auto-queue.json`
- Adaugă noi topicuri cu `"status": "pending"`
- Commit și push:
```bash
git add content/auto-queue.json
git commit -m "Add new topics to queue"
git push origin main
```

### Cost Estimare

Cu configurația default (`MAX_AUTO_POSTS_PER_DAY=5`):

**Lunar (30 zile × 5 articole/zi = 150 articole):**
- OpenAI GPT-4: 150 × $0.15 = **$22.50**
- Leonardo.ai: 150 × $0.03 = **$4.50**
- **Total: ~$27/lună**

**Anual (12 luni):**
- **~$324/an** pentru 1,800 articole complete

**Optimizare costuri:**
- Reduce `MAX_AUTO_POSTS_PER_DAY` la 3 → ~$16/lună
- Sau 1 articol/zi → ~$5/lună
- Skip Leonardo (folosește placeholder) → -$4.50/lună

### Recap: Sistemul Complet Automat

După setup inițial, sistemul funcționează 100% autonom:

✅ **Zero intervenție manuală** - cronul rulează singur
✅ **Limite automate** - previne spam și costuri excesive
✅ **Logging complet** - tracking detaliat în logs/
✅ **Error recovery** - reîncearcă topics failed
✅ **Queue management** - marchează automat topics ca done
✅ **Admin dashboard** - trigger manual când e nevoie
✅ **Vercel native** - folosește infrastructura Vercel Cron

**Rezultat:** Site-ul tău generează singur 3-5 articole noi pe zi, fără să faci nimic! 🚀

---

## 🖼️ Generare Imagini cu Leonardo.ai

Pisicopedia folosește Leonardo.ai pentru generarea profesională a imaginilor:

### Comenzi Disponibile:
```bash
# Generare imagini pentru toate cele 30 de rase
npm run leonardo:breeds

# Generare imagini pentru categorii articole
npm run leonardo:articles

# Generare imagini de brand (hero, despre, etc.)
npm run leonardo:brand

# Generare TOATE imaginile (rase + articole + brand)
npm run leonardo:all
```

### Structura Imaginilor:
- **Rase**: `public/images/breeds/[slug].jpg` - 30 imagini unice
- **Articole**: `public/images/articles/[categorie].jpg` - 8 imagini pe categorii
- **Brand**: `public/images/brand/` - imagini hero și de identitate

### Configurare API:
```env
LEONARDO_API_KEY=your_api_key_here
```

## 🔍 Content Validation

Scriptul de validare verifică integritatea conținutului înainte de deploy:

```bash
npm run validate:content
```

Ce verifică:
- ✅ Existența câmpurilor obligatorii (title, slug) în toate datele
- ✅ Verifică dacă imaginile referențiate există în `public/`
- ⚠️  Avertizează pentru imagini lipsă (site-ul va folosi fallback automat)
- ❌ Erori critice pentru date invalide (împiedică deploy-ul)

**Target pentru lansare oficială:**
- 0 warnings, 0 erori = Site 100% complet vizual
- Toate cele 30 de rase cu imagini proprii
- Toate articolele cu imagini reprezentative

**Fallback automat pentru dezvoltare:**
- Rase fără imagine → `/images/default-breed.svg`
- Articole fără imagine → `/images/default-article.svg`
- Componente actualizate să folosească mereu o imagine

## 🚀 Deployment

### 📋 Cum fac un Release Nou (Prod Deploy) - Pași 1-2-3

#### Pasul 1: Pregătire Pre-Deploy
```bash
# 1.1 - Verifică că ești pe branch-ul corect
git status

# 1.2 - Pull ultimele modificări
git pull origin main

# 1.3 - Validează conținutul (verifică imagini și date)
npm run validate:content
# Verifică că toate imaginile și câmpurile obligatorii sunt prezente
# Warning-urile (⚠️) sunt OK - imaginile lipsă vor folosi fallback
# Erorile (❌) trebuie rezolvate înainte de deploy!

# 1.4 - Rulează build-ul
npm run build
# Trebuie să se termine fără erori!

# 1.5 - Verifică checklist-ul
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

# Auto-Post System (NEW!)
npm run auto:post        # Generate 1 article from queue
npm run auto:batch       # Generate 3 articles from queue

# Content Generation
npm run generate:article # Generate new article (interactive)
npm run generate:breed   # Generate breed content (interactive)
npm run generate:guides  # Generate guides

# Image Generation
npm run leonardo:test    # Test image generation
npm run leonardo:breeds  # Generate all breed images

# Content Validation
npm run validate:content # Validate all content
npm run audit:breeds     # Audit breed files
npm run audit:articles   # Audit article files
npm run audit:404        # Check for 404 errors
npm run audit:all        # Run all audits

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