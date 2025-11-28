# 🐱 Pisicopedia.ro - Next.js Application

Aplicație web modernă pentru enciclopedia raselor și sănătății pisicilor, dezvoltată cu Next.js 14 și TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Structura Proiectului

```
pisicopedia-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── rase/              # Breeds routes
│   │   ├── page.tsx       # Breeds catalog
│   │   └── [slug]/        # Individual breed page
│   └── (future routes)    # sanatate/, ghiduri/, etc.
│
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── breeds/           # Breed-specific components
│   ├── articles/         # Article components
│   ├── guides/           # Guide components
│   ├── common/           # Reusable UI components
│   └── forms/            # Form components
│
├── lib/                  # Utilities
│   ├── constants.ts     # Site configuration
│   └── data.ts         # Sample data
│
├── types/               # TypeScript definitions
│   └── index.ts        # Type interfaces
│
└── public/             # Static assets
    └── images/         # Images (to be added)
```

## 🎨 Componente Principale

### Layout Components
- `Header` - Navigation bar responsive cu meniu dropdown
- `Footer` - Footer cu disclaimer medical și link-uri
- `BannerPlaceholder` - Zone rezervate pentru publicitate

### UI Components
- `Button` - Buton customizabil cu variante
- `Card` - Container pentru conținut
- `Badge` - Etichete pentru categorii
- `Container` - Wrapper pentru layout consistent

### Feature Components
- `BreedCard` - Card pentru afișarea raselor
- `ArticleCard` - Card pentru articole medicale
- `GuideCard` - Card pentru ghiduri
- `SearchBar` - Bară de căutare globală

## 🛠️ Tehnologii

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom pastel palette)
- **Optimization:** Static Site Generation
- **Font:** Inter (Google Fonts)

## 📦 Scripts Disponibile

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",        // Build for production
  "start": "next start",        // Start production server
  "lint": "next lint"           // Run ESLint
}
```

## 🔗 Rute Implementate

| Rută | Descriere |
|------|-----------|
| `/` | Homepage cu toate secțiunile |
| `/rase` | Catalog rase cu filtrare |
| `/rase/[slug]` | Pagină individuală rasă |

## 🚧 Rute Planificate

- `/sanatate` - Articole medicale
- `/ghiduri` - Ghiduri de îngrijire
- `/nume-pisici` - Generator nume
- `/contact` - Formular contact
- `/despre` - Despre noi

## 🌐 Deployment

Aplicația este pregătită pentru deployment pe:
- [Vercel](https://vercel.com) (recomandat)
- Netlify
- Self-hosted cu Node.js

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 Licență

© 2024 Pisicopedia.ro. Toate drepturile rezervate.
