# 📊 Ghid Setup Analytics & SEO - Pisicopedia.ro

## 🔧 Google Analytics 4 (GA4)

### Pasul 1: Creare Cont și Proprietate

1. **Accesează Google Analytics**
   - URL: https://analytics.google.com
   - Loghează-te cu contul Google

2. **Creează proprietatea**
   ```
   Admin → Create Property →
   - Nume: Pisicopedia.ro
   - Time zone: Romania
   - Currency: RON
   - Industry: Pets & Animals
   ```

3. **Configurează Data Stream**
   ```
   Web →
   - URL: https://pisicopedia.ro
   - Stream name: Pisicopedia Web
   ```

4. **Obține Measurement ID**
   - Format: `G-XXXXXXXXXX`
   - Salvează pentru .env.local

### Pasul 2: Integrare în Proiect

1. **Adaugă în `.env.local`:**
   ```env
   # Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Adaugă scriptul în `app/layout.tsx`:**
   ```tsx
   import Script from 'next/script';

   // În head sau body
   {process.env.NODE_ENV === 'production' && (
     <>
       <Script
         src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
         strategy="afterInteractive"
       />
       <Script id="google-analytics" strategy="afterInteractive">
         {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
         `}
       </Script>
     </>
   )}
   ```

3. **Folosește wrapper-ul `lib/analytics.ts`** (vezi mai jos)

### Pasul 3: Evenimente Recomandate

Configure următoarele evenimente custom:

```javascript
// Explorare rasă
gtag('event', 'view_breed', {
  breed_name: 'Persană',
  breed_slug: 'persana'
});

// Citire articol
gtag('event', 'read_article', {
  article_title: 'Pisica nu mănâncă',
  article_category: 'simptome',
  read_time: 180 // secunde
});

// Click CTA principal
gtag('event', 'cta_click', {
  cta_text: 'Explorează Rasele',
  cta_location: 'homepage_hero'
});

// Scroll depth
gtag('event', 'scroll_depth', {
  percent: 90
});
```

## 🔍 Google Search Console

### Pasul 1: Setup Inițial

1. **Accesează Search Console**
   - URL: https://search.google.com/search-console
   - Click "Add property"

2. **Alege metoda Domain**
   ```
   Domain property: pisicopedia.ro
   ```

3. **Verificare DNS**
   ```
   TXT Record:
   google-site-verification=xxxxxxxxxxxxx

   Adaugă în DNS-ul domeniului
   Așteaptă 5-10 minute
   Click "Verify"
   ```

### Pasul 2: Configurări Esențiale

1. **Submit Sitemap**
   ```
   Sitemaps → Add new sitemap
   URL: https://pisicopedia.ro/sitemap.xml
   Submit → Wait for processing
   ```

2. **Verifică Coverage**
   ```
   Coverage →
   - Valid pages: trebuie să crească gradual
   - Errors: rezolvă imediat
   - Excluded: verifică să fie intenționat
   ```

3. **URL Inspection Tool**
   - Testează pagini importante individual
   - Request indexing pentru conținut nou urgent

### Pasul 3: Monitorizare (Primele 90 Zile)

#### Săptămânal verifică:
- **Performance**
  - Total clicks trend ↗
  - Total impressions ↗
  - Average CTR > 2%
  - Average position < 50 (și în scădere)

- **Coverage**
  - Valid pages = număr real de pagini
  - No errors
  - Warnings investigate

- **Core Web Vitals**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

#### Lunar analizează:
- **Top Queries**
  - Keywords care aduc trafic
  - Oportunități (impressions mari, CTR mic)

- **Top Pages**
  - Cele mai performante
  - Necesită optimizare

## 🎯 Facebook Pixel (Opțional)

### Setup pentru Remarketing

1. **Obține Pixel ID**
   - Facebook Business Manager
   - Events Manager → Create Pixel

2. **Adaugă în proiect**
   ```tsx
   // În .env.local
   NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX

   // În app/layout.tsx
   <Script id="facebook-pixel" strategy="afterInteractive">
     {`
       !function(f,b,e,v,n,t,s)
       {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
       n.callMethod.apply(n,arguments):n.queue.push(arguments)};
       if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
       n.queue=[];t=b.createElement(e);t.async=!0;
       t.src=v;s=b.getElementsByTagName(e)[0];
       s.parentNode.insertBefore(t,s)}(window, document,'script',
       'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
       fbq('track', 'PageView');
     `}
   </Script>
   ```

## 🌱 Plausible Analytics (Alternativă Privacy-First)

### De ce Plausible?
- GDPR compliant by default
- Nu necesită cookie banner
- Lightweight (< 1KB)
- Real-time dashboard

### Setup Rapid

1. **Crează cont**
   - https://plausible.io
   - Add site: pisicopedia.ro

2. **Integrare simplă**
   ```tsx
   // În app/layout.tsx
   <Script
     defer
     data-domain="pisicopedia.ro"
     src="https://plausible.io/js/script.js"
   />
   ```

3. **Custom events**
   ```javascript
   // Trigger event
   window.plausible('Download', {
     props: {type: 'PDF', name: 'Ghid Vaccinare'}
   });
   ```

## 📝 Wrapper Analytics (`lib/analytics.ts`)

Creează acest fișier pentru tracking unificat:

```typescript
// lib/analytics.ts

type EventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';

  // Track page view
  pageview(url: string) {
    if (!this.isProduction) {
      console.log('📊 Pageview:', url);
      return;
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }

    // Plausible (auto-tracks pageviews)

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }

  // Track custom event
  event({ action, category = 'general', label, value, ...rest }: EventParams) {
    if (!this.isProduction) {
      console.log('📊 Event:', { action, category, label, value, ...rest });
      return;
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
      });
    }

    // Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(action, {
        props: { category, label, value, ...rest }
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', action, rest);
    }
  }

  // Track breed view
  viewBreed(breedName: string, breedSlug: string) {
    this.event({
      action: 'view_breed',
      category: 'engagement',
      label: breedName,
      breed_slug: breedSlug,
    });
  }

  // Track article read
  readArticle(title: string, category: string, readTime?: number) {
    this.event({
      action: 'read_article',
      category: 'content',
      label: title,
      value: readTime,
      article_category: category,
    });
  }

  // Track CTA clicks
  clickCTA(ctaText: string, location: string) {
    this.event({
      action: 'cta_click',
      category: 'engagement',
      label: ctaText,
      cta_location: location,
    });
  }

  // Track search
  search(query: string, resultsCount: number) {
    this.event({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
    });
  }

  // Track scroll depth
  scrollDepth(percent: number) {
    this.event({
      action: 'scroll_depth',
      category: 'engagement',
      value: percent,
    });
  }

  // Track external link
  externalLink(url: string) {
    this.event({
      action: 'external_link',
      category: 'outbound',
      label: url,
    });
  }
}

export const analytics = new Analytics();
```

## 🎯 Implementare în Componente

### Exemple de Utilizare

```tsx
// În pages/rase/[slug].tsx
import { analytics } from '@/lib/analytics';

useEffect(() => {
  analytics.viewBreed(breed.title, breed.slug);
}, [breed]);

// În components/common/Button.tsx
<Button
  onClick={() => {
    analytics.clickCTA('Explorează Rasele', 'homepage_hero');
    router.push('/rase');
  }}
>
  Explorează Rasele
</Button>

// În hooks/useScrollDepth.ts
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    if (scrollPercent > 90 && !tracked90) {
      analytics.scrollDepth(90);
      setTracked90(true);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 📈 KPIs de Urmărit

### Prima Săptămână
- [ ] Analytics funcțional (date în dashboard)
- [ ] Search Console verificat
- [ ] Primele 10 pagini indexate
- [ ] CTR > 1% pe primele impresii

### Prima Lună
- [ ] 100+ pagini indexate
- [ ] 500+ utilizatori organici
- [ ] 20+ keywords ranked
- [ ] Bounce rate < 70%
- [ ] Session duration > 1:30

### Primele 3 Luni
- [ ] 1000+ utilizatori/lună
- [ ] 50+ keywords pe prima pagină
- [ ] CTR mediu > 3%
- [ ] 5+ backlinks de calitate
- [ ] Conversii tracking setup

## 🚨 Troubleshooting Comun

### GA4 nu înregistrează date
1. Verifică Measurement ID corect
2. Adblocker dezactivat pentru test
3. Real-time reports pentru debugging
4. Console browser pentru erori

### Search Console nu indexează
1. Robots.txt permite crawling
2. Sitemap valid și accesibil
3. Manual request indexing pentru pagini importante
4. Verifică canonical URLs

### Pixel Facebook nu trackuiește
1. Facebook Pixel Helper extension
2. Verify Pixel ID corect
3. Test Events în Events Manager
4. iOS 14.5+ limitations

---

**Notă:** După setup, așteaptă 24-48h pentru date complete în Analytics și 3-7 zile pentru indexare completă în Search Console.