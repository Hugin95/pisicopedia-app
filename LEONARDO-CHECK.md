# 🔍 Leonardo API - Verificare

## ✅ API Key din .env.local:
```
6d2d30ac-c99e-4c6b-aada-12afc34f0282
```

## 🔧 CE TREBUIE VERIFICAT:

### 1. Verifică în Vercel Environment Variables:
```
https://vercel.com/hugin95s-projects/pisicopedia-app/settings/environment-variables
```

**Asigură-te că:**
- ✅ `LEONARDO_API_KEY` este setat
- ✅ Value = `6d2d30ac-c99e-4c6b-aada-12afc34f0282`
- ✅ Environment = **Production** (bifat)

### 2. Verifică Leonardo Dashboard:
```
https://app.leonardo.ai/settings
```

**Verifică:**
- ✅ API Key-ul există
- ✅ Nu e expirat
- ✅ Ai credit-uri disponibile

### 3. Verifică Leonardo Usage:
```
https://app.leonardo.ai/api-usage
```

**Verifică:**
- Câte generări ai făcut astăzi
- Dacă ai atins limita

---

## 🚨 POSIBILE PROBLEME:

### A) Key-ul nu e valid
- Generează un key NOU în Leonardo Dashboard
- Înlocuiește în Vercel Environment Variables

### B) Nu ai credit-uri
- Leonardo free tier: **150 tokens/zi**
- 1 imagine = ~8-10 tokens
- Poți genera ~15 imagini/zi

### C) Rate limit
- Leonardo API: max 10 requests/min
- Dacă generi prea repede, eșuează

---

## ✅ SOLUȚIE TEMPORARĂ:

**Articolele funcționează FĂRĂ imagini!** 

Site-ul arată bine și cu imagini placeholder. Leonardo este **OPȚIONAL**.

Dacă vrei imagini:
1. **Generează local** cu `npm run generate:guide-images`
2. **Upload manual** pe GitHub
3. SAU folosește **Unsplash/Pexels** (gratuit, fără limit)

---

## 🎯 NEXT STEP:

**Mergi la Leonardo Dashboard și verifică:**
1. API Key valid?
2. Credit-uri disponibile?
3. Usage astăzi?

Apoi:
- Dacă DA → Regenerează key și adaugă în Vercel
- Dacă NU → Lasă fără imagini sau folosește alt serviciu


## Updated: 01/04/2026 00:26:39
