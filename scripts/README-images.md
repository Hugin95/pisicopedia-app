# 📸 Image Management Guide for Pisicopedia.ro

## Overview
Pisicopedia.ro uses static images that can be generated locally using Leonardo.ai API or manually added to the project.

## 🎨 Leonardo.ai Integration (READY!)

### Quick Start
```bash
# Test with one breed first
npm run leonardo:test

# Generate all breed images (6 images)
npm run leonardo:breeds
```

### API Configuration
Leonardo.ai API key is configured in `.env.local`:
```env
LEONARDO_API_KEY=6d2d30ac-c99e-4c6b-aada-12afc34f0282
```

### Available Commands
- **`npm run leonardo:test`** - Generate test image (Persian cat)
- **`npm run leonardo:breeds`** - Generate all 6 breed images automatically
- **`npm run leonardo:maine`** - Generate Maine Coon separately (special handling)

### Cost & Credits
- Each image: ~150 API credits
- Total for 6 breeds: ~900 credits
- Check credits: https://app.leonardo.ai/

## Alternative Image Sources
- **Midjourney** - Professional AI images
- **Stock photos** - Unsplash, Pexels, etc.
- **Professional photography**
- **Manual illustrations**

## Directory Structure

```
public/images/
├── breeds/           # Cat breed images
│   ├── persiana.webp
│   ├── british-shorthair.webp
│   ├── maine-coon.webp
│   └── ...
├── sanatate/        # Health article images
│   ├── article-slug.webp
│   └── ...
├── hero/            # Homepage hero images
│   ├── hero-1.webp
│   └── ...
├── placeholders/    # SVG fallbacks
│   ├── breed-placeholder.svg
│   ├── article-placeholder.svg
│   └── guide-placeholder.svg
└── default-cat.webp # Generic fallback
```

## Workflow for Adding Images

### 1. Generate or Obtain Images
Use your preferred method:
- Generate with Leonardo.ai or other AI service
- Download from stock photo sites
- Create manually

### 2. Prepare Images
- **Format:** WebP (recommended) or JPG/PNG
- **Dimensions:**
  - Breeds: 1024x1024 (square)
  - Articles: 1200x630 (landscape)
  - Hero: 1920x1080 (full width)
- **Naming:** Use the exact slug from data (e.g., `persiana.webp`)

### 3. Add to Project
Place images in the appropriate directory:
```bash
# For breeds
public/images/breeds/[breed-slug].webp

# For health articles
public/images/sanatate/[article-slug].webp
```

### 4. Update Data Files
In `lib/data.ts`, ensure each item has the correct image path:

```typescript
{
  slug: 'persiana',
  title: 'Pisica Persană',
  image: '/images/breeds/persiana.webp',  // ← Image path
  // ... other fields
}
```

## Image Requirements

### Style Guidelines
- **Medical/professional aesthetic**
- **Pastel colors** (lavender, rose, cream)
- **Clean backgrounds**
- **High quality, no watermarks**

### Technical Specs
- **File size:** < 200KB per image (optimize with WebP)
- **Resolution:** High enough for retina displays
- **Aspect ratio:** Maintain consistency within categories

## Fallback System

The site automatically handles missing images:

1. **Primary:** Specified image path
2. **Fallback:** Category placeholder SVG
3. **Ultimate fallback:** `/images/default-cat.webp`

## Example Image Generation Prompt (Leonardo.ai)

```
Professional medical illustration of a [BREED NAME] cat.
Soft pastel colors - lavender, rose pink, cream.
Clean white background. Medical textbook style.
Anatomically accurate. No text or watermarks.
```

## Notes
- **NO API integration** - All images are static files
- **Manual process** - Images are added manually, not generated at runtime
- **OpenAI** - Used ONLY for text content, NOT for images
- **Flexibility** - Use any image source you prefer

## Quick Checklist
- [ ] Generate/obtain image
- [ ] Convert to WebP format
- [ ] Optimize size (< 200KB)
- [ ] Name file correctly (match slug)
- [ ] Place in correct directory
- [ ] Update data.ts with image path
- [ ] Test in browser