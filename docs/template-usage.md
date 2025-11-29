# 🚀 Ghid Clonare Template - Cum să folosești Pisicopedia ca Starter

Acest ghid îți arată cum să folosești Pisicopedia.ro ca template pentru a crea rapid un nou site în ecosistemul tău (lifestyle, produse, etc.).

## 📋 Structură Template Reutilizabilă

### Ce păstrezi (Design System & Infrastructure)

```
✅ PĂSTREZI:
├── components/common/       # Toate componentele UI reutilizabile
│   ├── Badge.tsx           # Pentru etichete și categorii
│   ├── Button.tsx          # Butoane cu variante
│   ├── Card.tsx            # Card-uri generice
│   ├── Container.tsx       # Container responsive
│   └── ...
├── components/layout/       # Layout-uri de bază
│   ├── Header.tsx          # Modifică doar logo și meniu
│   └── Footer.tsx          # Modifică doar linkuri și text
├── lib/
│   ├── design-system.ts    # Configurație temă (culori, fonturi, etc.)
│   ├── image-utils.ts      # Utilități pentru imagini și fallback
│   ├── analytics.ts        # Google Analytics wrapper
│   └── seo.tsx             # Utilități SEO
├── styles/
│   └── globals.css         # Stiluri globale și Tailwind
├── scripts/
│   └── validate-content.ts # Adaptat pentru noul content
└── app/
    ├── layout.tsx          # Layout principal
    └── globals.css         # Keep Tailwind setup
```

### Ce ștergi (Content Specific Pisicopedia)

```
❌ ȘTERGI/MODIFICI:
├── content/                 # Tot conținutul MDX specific pisici
├── public/images/
│   ├── breeds/             # Imagini pisici
│   └── articles/           # Imagini articole medicale
├── lib/
│   ├── data.ts             # Date specifice pisici
│   ├── content-lists.ts    # Liste rase și articole
│   └── leonardo-*.ts       # Prompturi specifice pisici
├── app/
│   ├── rase/               # Pagini specifice rase pisici
│   ├── sanatate/           # Pagini articole medicale
│   └── despre/page.tsx     # Modifică pentru noul brand
└── types/index.ts          # Adaptează tipurile pentru noul domeniu
```

## 🛠️ Pași pentru Clonare și Adaptare

### 1. Clonează și Curăță

```bash
# Clonează repository-ul
git clone https://github.com/your-repo/pisicopedia.git nume-site-nou
cd nume-site-nou

# Șterge istoricul git pentru a începe fresh
rm -rf .git
git init

# Șterge conținutul specific pisici
rm -rf content/
rm -rf public/images/breeds
rm -rf public/images/articles
rm lib/data.ts
rm lib/content-lists.ts
rm -rf app/rase
rm -rf app/sanatate

# Creează structura pentru noul content
mkdir content/your-content-type
mkdir public/images/your-images
```

### 2. Actualizează Configurația

#### 2.1 Package.json
```json
{
  "name": "nume-site-nou",
  "version": "0.1.0",
  // Păstrează toate dependențele
}
```

#### 2.2 Site Config (lib/seo.ts)
```typescript
export const siteConfig = {
  name: 'NumeSiteNou.ro',
  description: 'Descriere nouă',
  url: 'https://numesitenou.ro',
  // Actualizează toate metadatele
};
```

#### 2.3 Environment Variables (.env.local)
```env
# Păstrează structura, actualizează valorile
OPENAI_API_KEY=your_key
LEONARDO_API_KEY=your_key
# Adaugă ce mai ai nevoie
```

### 3. Adaptează Design System-ul

#### Schimbă Culorile (lib/design-system.ts)
```typescript
// Exemplu: Pentru un site de lifestyle, schimbă lavender cu teal
export const colors = {
  // Primary - Teal (Fresh & Modern)
  primary: {
    50: '#f0fdfa',
    500: '#14b8a6',
    // etc.
  },
  // Secondary - Coral (Energetic)
  secondary: {
    50: '#fff5f1',
    500: '#fb7185',
    // etc.
  }
};
```

#### Actualizează Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Importă culorile din design-system.ts
        primary: colors.primary,
        secondary: colors.secondary,
      }
    }
  }
}
```

### 4. Creează Noua Structură de Date

#### Types (types/index.ts)
```typescript
// Exemplu pentru site de lifestyle
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: 'fashion' | 'travel' | 'food' | 'wellness';
  image: string;
  date: string;
  author: string;
  readingTime: number;
  tags: string[];
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
}
```

#### Data Structure (lib/data.ts)
```typescript
import { Article, Product } from '@/types';

export const articles: Article[] = [
  // Noile tale articole
];

export const products: Product[] = [
  // Produsele tale
];

// Helper functions
export async function getArticleBySlug(slug: string) {
  return articles.find(a => a.slug === slug);
}
```

### 5. Adaptează Rutele

#### App Structure
```
app/
├── page.tsx                 # Homepage - adaptează pentru noul content
├── [content-type]/
│   ├── page.tsx            # Lista de conținut
│   └── [slug]/
│       └── page.tsx        # Pagină detaliu
├── produse/                 # Sau orice alte secțiuni
├── contact/page.tsx        # Păstrează, doar actualizează textul
└── layout.tsx              # Actualizează metadata
```

### 6. Adaptează Componentele

#### Card Component - Exemplu adaptare
```typescript
// components/articles/ArticleCard.tsx → components/content/ContentCard.tsx
import { getImageSource } from '@/lib/image-utils';

export default function ContentCard({ item }: { item: YourContentType }) {
  return (
    <Card hover>
      <Image
        src={getImageSource(item.image, 'content')}
        alt={item.title}
        // Restul rămâne similar
      />
      {/* Adaptează pentru noul content */}
    </Card>
  );
}
```

## 📦 Componente Gata de Folosit

### 1. Layout Components
- **Container**: Wrapper responsive cu max-width
- **Header**: Navbar configurabil (schimbă doar logo și meniu)
- **Footer**: Footer adaptabil (schimbă linkuri și text)

### 2. UI Components
- **Button**: 4 variante, 3 dimensiuni
- **Card**: Container cu hover effect
- **Badge**: Pentru categorii și etichete
- **SearchBar**: Funcțional, adaptează placeholder

### 3. Content Components
- **FAQSection**: Pentru întrebări frecvente
- **RelatedContent**: Pentru conținut similar
- **BannerPlaceholder**: Pentru ads/promoții

### 4. Utilities
- **SEO helpers**: generateMetadata, JsonLd
- **Image utils**: getImageSource cu fallback automat
- **Analytics**: GA4 wrapper gata de folosit

## 🎨 Customizare Rapidă

### Schimbă Brand-ul în 5 minute:
1. **Logo**: `public/images/logo.png`
2. **Culori**: `lib/design-system.ts`
3. **Font**: `app/layout.tsx` (import Google Fonts)
4. **Metadata**: `lib/seo.ts`
5. **Footer**: `components/layout/Footer.tsx`

### Adaugă Funcționalități:
```typescript
// Exemplu: Adaugă newsletter
// components/forms/Newsletter.tsx
export default function Newsletter() {
  // Folosește Button și design system
  return (
    <div className="bg-primary-50 p-6 rounded-xl">
      <h3>Subscribe to our newsletter</h3>
      <input className="..." />
      <Button variant="primary">Subscribe</Button>
    </div>
  );
}
```

## 🚀 Deploy Rapid

### Vercel (Recomandat)
```bash
# După customizare
npm run build        # Verifică că nu sunt erori
npm run validate     # Adaptează validatorul pentru noul content

# Deploy
vercel --prod
```

### Netlify Alternative
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

# Deploy
netlify deploy --prod
```

## 📝 Checklist Final Clonare

- [ ] Repository clonat și git history șters
- [ ] Content specific Pisicopedia eliminat
- [ ] Site config actualizat (nume, URL, descriere)
- [ ] Design system adaptat (culori, fonturi)
- [ ] Types actualizate pentru noul domeniu
- [ ] Structură de date nouă creată
- [ ] Rute adaptate pentru noul content
- [ ] Componente generice păstrate
- [ ] Logo și branding actualizate
- [ ] Environment variables configurate
- [ ] Build rulează fără erori
- [ ] Deploy pe Vercel/Netlify funcțional

## 💡 Tips & Tricks

### 1. Păstrează Structura MDX
MDX e foarte flexibil. Poți avea:
```
content/
├── articles/        # Articole blog
├── products/        # Pagini produse
├── guides/          # Ghiduri
└── pages/          # Pagini statice
```

### 2. Sistem de Imagini
Păstrează `image-utils.ts` și adaptează fallback-urile:
```typescript
const placeholders = {
  article: '/images/default-article.jpg',
  product: '/images/default-product.jpg',
  // etc.
};
```

### 3. Validare Content
Adaptează `validate-content.ts` pentru noua structură:
```typescript
// Verifică noile tipuri de content
for (const article of articles) {
  // Validare customizată
}
```

### 4. SEO Optimization
Păstrează toate utilitățile SEO și adaptează:
- Schema.org pentru noul tip de content
- Meta tags specifice domeniului
- Sitemap actualizat

## 🎯 Rezultat Final

După parcurgerea acestui ghid, vei avea:
- ✅ Un site nou funcțional în 30-60 minute
- ✅ Design system consistent și profesional
- ✅ Infrastructură solidă (Next.js 14+, TypeScript, Tailwind)
- ✅ SEO optimizat din start
- ✅ Analytics pregătit
- ✅ Responsive și accesibil
- ✅ Gata pentru content și scale

## 📞 Suport

Dacă ai întrebări despre adaptarea template-ului:
1. Verifică documentația Next.js
2. Consultă Tailwind CSS docs pentru stilizare
3. Pentru Leonardo.ai/OpenAI, vezi documentația lor oficială

---

**Remember**: Acest template e un starting point solid. Customize și extinde după nevoile tale! 🚀