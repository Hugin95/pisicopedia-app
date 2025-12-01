# QA Launch Checklist - Pisicopedia.ro

Ghid complet pentru verificarea calității și lansarea în producție a site-ului Pisicopedia.

## 📋 Cuprins

- [Scripturile QA Disponibile](#scripturile-qa-disponibile)
- [Checklist Pre-Launch](#checklist-pre-launch)
- [Cum să Adaugi Conținut Nou](#cum-să-adaugi-conținut-nou)
- [Troubleshooting](#troubleshooting)
- [Workflow Complet de Deploy](#workflow-complet-de-deploy)

---

## 🔧 Scripturile QA Disponibile

### 1. **npm run audit:breeds**

Verifică toate rasele de pisici pentru:
- ✅ Fișiere MDX existente
- ✅ Imagini existente
- ✅ Prezența în `lib/data.ts`
- ✅ **[NOU]** Imagini duplicate între rase

**Când să-l rulezi:**
- După adăugarea unei rase noi
- După regenerarea imaginilor
- Înainte de fiecare deploy

**Output:**
```
🔍 BREED CONTENT AUDIT
================================================================================
Breed Audit Results:
Status | Breed Name                     | MDX | IMG | Data | Issues
--------------------------------------------------------------------------------
✅     | Abyssinian                     | ✓   | ✓   | ✓    | None
⚠️     | Bengal                         | ✓   | ✗   | ✓    | Missing image
...

🔍 CHECKING FOR DUPLICATE IMAGES
--------------------------------------------------------------------------------
✅ No duplicate images found

📊 SUMMARY:
Total breeds: 30
✅ Complete: 28
⚠️  Warnings: 2
❌ Errors: 0
```

---

### 2. **npm run audit:articles**

Verifică toate articolele pentru:
- ✅ Fișiere MDX existente
- ✅ Imagini (specifice sau de categorie)
- ✅ Prezența în `lib/data.ts`
- ✅ **[NOU]** Consistența frontmatter-ului

**Când să-l rulezi:**
- După adăugarea unui articol nou
- După modificarea frontmatter-ului
- Înainte de fiecare deploy

**Câmpuri verificate în frontmatter:**
```yaml
title: "Titlul articolului"           # OBLIGATORIU
description: "Descriere SEO"          # OBLIGATORIU
slug: "slug-articol"                  # OBLIGATORIU (trebuie să matcheze filename)
category: "boli"                      # OBLIGATORIU
subcategory: "infectioase"            # OBLIGATORIU
image: "/images/articles/..."         # OBLIGATORIU
date: "2025-11-28"                    # OBLIGATORIU
author: "Dr. Veterinar Pisicopedia"   # OBLIGATORIU
readingTime: "8 min"                  # OBLIGATORIU
tags: ["tag1","tag2"]                 # OBLIGATORIU (array)
```

**Output:**
```
📝 ARTICLE CONTENT AUDIT
====================================================================================================

📂 SIMPTOME
----------------------------------------------------------------------------------------------------
Status | Title                                              | MDX | IMG | Data | Issues
----------------------------------------------------------------------------------------------------
✅     | Pisica nu mănâncă: cauze și soluții              | ✓   | ✓   | ✓    | None
...

🔍 FRONTMATTER CONSISTENCY ISSUES
----------------------------------------------------------------------------------------------------
Found 2 article(s) with frontmatter issues:

pisica-nu-bea-apa (Pisica nu bea apă: cauze și soluții)
   ✗ Missing image
   ✗ Missing readingTime

📊 SUMMARY:
Total articles defined: 30
✅ Complete: 28
⚠️  Warnings: 2
```

---

### 3. **npm run audit:404**

Verifică că toate rutele au fișiere MDX corespunzătoare:
- ✅ `/rase/[slug]` - 30 rase
- ✅ `/articole/[slug]` - 30 articole
- ✅ `/ghiduri/[slug]` - 24 ghiduri

**Când să-l rulezi:**
- După adăugarea de rute noi în `lib/content-lists.ts`
- După generarea de conținut nou
- **OBLIGATORIU înainte de deploy**

**Output:**
```
🔗 404 ROUTES AUDIT
====================================================================================================
Checking all routes for potential 404 errors...

📋 Checking Breeds...
   30/30 breeds OK
📋 Checking Articles...
   30/30 articles OK
📋 Checking Guides...
   20/24 guides OK

====================================================================================================

📊 SUMMARY:
Total routes checked: 84
✅ Working routes: 80
❌ Potential 404s: 4

🚨 ROUTES THAT WILL RETURN 404
----------------------------------------------------------------------------------------------------

📚 GUIDES (4):
   ✗ /ghiduri/jocuri-pisici
     File needed: content/guides/jocuri-pisici.mdx
   ...

💡 HOW TO FIX:
   For guides: npm run generate:guides

❌ 404 Audit FAILED - 4 route(s) will return 404
```

---

### 4. **npm run validate:content**

Validare globală a consistenței conținutului.

**Când să-l rulezi:**
- Periodic (săptămânal)
- După modificări majore în structura conținutului

---

### 5. **npm run audit:all**

Rulează toate verificările într-o singură comandă:
```bash
npm run validate:content && \
npm run audit:breeds && \
npm run audit:articles && \
npm run audit:404
```

**Când să-l rulezi:**
- **OBLIGATORIU înainte de fiecare deploy**
- După orice modificare de conținut
- În CI/CD pipeline

---

## ✅ Checklist Pre-Launch

### 1. Verificări de Conținut

- [ ] **Rulează `npm run audit:all`**
  - [ ] Toate rasele au MDX + imagini
  - [ ] Toate articolele au MDX + imagini
  - [ ] Toate ghidurile au MDX
  - [ ] Zero rute 404
  - [ ] Frontmatter consistent pentru toate articolele

- [ ] **Verificare manuală**
  - [ ] Diacritice corecte în tot conținutul român
  - [ ] Link-uri interne funcționale
  - [ ] Imagini se încarcă corect

### 2. Build și Deploy

- [ ] **Rulează `npm run build`**
  ```bash
  cd pisicopedia-app
  npm run build
  ```
  - [ ] Build reușit fără erori TypeScript
  - [ ] Zero erori de compilare
  - [ ] Toate rutele statice generate

- [ ] **Test local**
  ```bash
  npm run start
  ```
  - [ ] Testează 3-5 pagini de rase aleatorii
  - [ ] Testează 3-5 articole aleatorii
  - [ ] Testează 3-5 ghiduri aleatorii
  - [ ] Verifică navigarea între pagini

### 3. Verificări SEO

- [ ] **Rulează `npm run audit:seo`**
  - [ ] Meta tags prezente pe toate paginile
  - [ ] Schema.org structured data corect
  - [ ] Open Graph tags configurate

### 4. Deploy pe Vercel

- [ ] Push pe GitHub
  ```bash
  git add .
  git commit -m "Pre-launch QA complete"
  git push origin main
  ```
- [ ] Verifică deploy automat pe Vercel
- [ ] Testează live site (pisicopedia.ro)
  - [ ] Minimum 5 pagini random
  - [ ] Verifică viteza de încărcare
  - [ ] Verifică mobile responsiveness

---

## 📝 Cum să Adaugi Conținut Nou

### Adăugarea unei Rase Noi

1. **Adaugă rasa în `lib/content-lists.ts`:**
   ```typescript
   export const allBreeds: BreedListItem[] = [
     // ... rase existente
     {
       slug: 'burmilla',
       name: 'Burmilla',
       category: 'rase-medii',
     },
   ];
   ```

2. **Generează conținutul MDX:**
   ```bash
   npm run generate:breed
   # Alege: burmilla
   ```

3. **Generează imaginea:**
   ```bash
   npm run leonardo:breeds
   ```

4. **Verifică:**
   ```bash
   npm run audit:breeds
   ```

5. **Build și test:**
   ```bash
   npm run build
   ```

### Adăugarea unui Articol Nou

1. **Adaugă articolul în `lib/content-lists.ts`:**
   ```typescript
   export const allArticles: ArticleListItem[] = [
     // ... articole existente
     {
       slug: 'artrita-pisici',
       title: 'Artrita la pisici: diagnostic și tratament',
       category: 'boli',
     },
   ];
   ```

2. **Generează conținutul:**
   ```bash
   npm run generate:article
   # Alege: artrita-pisici
   ```

3. **Asigură-te că frontmatter-ul este complet:**
   ```yaml
   ---
   title: "Artrita la pisici: diagnostic și tratament"
   description: "Ghid complet despre artrita felină"
   slug: "artrita-pisici"
   category: "boli"
   subcategory: "musculo-scheletice"
   image: "/images/articles/boli-cronice.jpg"  # OBLIGATORIU!
   date: "2025-12-01"
   author: "Dr. Veterinar Pisicopedia"
   readingTime: "7 min"
   tags: ["boli","cronice","pisici","sănătate"]
   ---
   ```

4. **Verifică:**
   ```bash
   npm run audit:articles
   ```

### Adăugarea unui Ghid Nou

1. **Adaugă ghidul în `lib/content-lists.ts`:**
   ```typescript
   export const allGuides: GuideListItem[] = [
     // ... ghiduri existente
     {
       slug: 'introducere-pisica-noua',
       title: 'Cum să introduci o pisică nouă în casă',
       category: 'ghid-ingrijire',
     },
   ];
   ```

2. **Creează fișierul MDX manual** sau **regenerează toate ghidurile:**
   ```bash
   npm run generate:guides
   ```

3. **Verifică:**
   ```bash
   npm run audit:404
   ```

---

## 🐛 Troubleshooting

### Eroare: "Missing MDX file"

**Cauză:** Fișierul MDX nu există în `content/breeds/`, `content/articles/` sau `content/guides/`

**Soluție:**
```bash
# Pentru rase:
npm run generate:breed

# Pentru articole:
npm run generate:article

# Pentru ghiduri:
npm run generate:guides
```

### Eroare: "Missing image"

**Cauză:** Imaginea nu există în `public/images/breeds/` sau `public/images/articles/`

**Soluție:**
```bash
# Pentru rase:
npm run leonardo:breeds

# Pentru articole - verifică că există imaginea de categorie:
ls public/images/articles/
# Dacă lipsește, adaugă imagine manuală sau folosește o imagine de categorie
```

### Eroare: "Frontmatter: X issue(s)"

**Cauză:** Frontmatter-ul articolului nu are toate câmpurile obligatorii

**Soluție:**
1. Rulează `npm run audit:articles` pentru detalii
2. Deschide fișierul MDX problematic
3. Adaugă câmpurile lipsă conform template-ului de mai sus

### Eroare: "404 route will return 404"

**Cauză:** Există o rută definită în `content-lists.ts` dar fișierul MDX nu există

**Soluție:**
```bash
# Identifică tipul (breed/article/guide) și generează:
npm run audit:404  # Vezi exact ce lipsește
npm run generate:guides  # sau generate:breed, generate:article
```

### Eroare de Build TypeScript

**Cauză:** Tipuri inconsistente sau fronmatter invalid

**Soluție:**
1. Verifică toate frontmatter-urile cu `npm run audit:articles`
2. Repară câmpurile lipsă sau incorecte
3. Verifică că toate slug-urile sunt unice
4. Rulează `npm run build` din nou

---

## 🚀 Workflow Complet de Deploy

### Pre-Deploy (Local)

```bash
# 1. Verifică tot conținutul
npm run audit:all

# 2. Dacă există erori, repară-le (vezi Troubleshooting)

# 3. Build local
npm run build

# 4. Test local
npm run start
# Deschide http://localhost:3000 și verifică manual

# 5. Oprește serverul (Ctrl+C)
```

### Deploy (Production)

```bash
# 1. Commit și push
git add .
git commit -m "Content update - QA passed"
git push origin main

# 2. Vercel va deploy automat
# Verifică pe dashboard: https://vercel.com/your-project

# 3. După deploy, verifică live site:
# https://pisicopedia.ro
```

### Post-Deploy

```bash
# Verifică manual pe site live:
# - Homepage
# - /rase - verifică că toate rasele apar
# - /articole - verifică că toate articolele apar
# - /ghiduri - verifică că toate ghidurile apar
# - Testează 5 pagini random de fiecare tip
```

---

## 📊 Metrici de Calitate

### Target pentru Launch:

- ✅ **100% rase cu MDX** (30/30)
- ✅ **100% rase cu imagini** (30/30)
- ✅ **100% articole cu MDX** (30/30)
- ✅ **100% articole cu câmp image** (30/30)
- ✅ **100% ghiduri cu MDX** (24/24)
- ✅ **Zero rute 404** (84/84 working)
- ✅ **Zero erori frontmatter**
- ✅ **Build reușit fără erori**

### Verificare Rapidă (1 minut):

```bash
npm run audit:all && npm run build
```

Dacă toate scripturile returnează success (exit code 0) și build-ul reușește → **READY FOR DEPLOY** ✅

---

## 🔄 Mentenanță Regulată

### Zilnic (dacă adaugi conținut nou):
```bash
npm run audit:all
npm run build
```

### Săptămânal:
```bash
# Full audit + SEO check
npm run audit:all
npm run audit:seo
npm run health:pages
npm run build
```

### Lunar:
- Review manual al conținutului
- Verificare link-uri externe
- Update dependencies (`npm outdated`)
- Performance audit (Lighthouse)

---

## 📞 Contact & Support

Pentru probleme tehnice sau întrebări despre QA:
- GitHub Issues: [pisicopedia-app/issues](https://github.com/your-repo/issues)
- Documentation: `/docs/`

---

**Ultima actualizare:** 2025-12-01
**Versiune:** 1.0.0
