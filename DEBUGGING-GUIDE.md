# 🐛 Debugging Guide - Cron Job 500 Error

## ❌ PROBLEMA ACTUALĂ:
API-ul `/api/auto-post` returnează **500 Internal Server Error**

## ✅ CE AM VERIFICAT:
- ✅ Environment Variables setate în Vercel (CRON_SECRET, OPENAI_API_KEY, LEONARDO_API_KEY)
- ✅ Git branch corect (master, nu main)
- ✅ Git operations făcute opționale (nu blochează)
- ✅ auto-queue.json există și este în repository
- ✅ Cron schedule corect (*/10 * * * *)

## 🔍 NEXT STEP - VERIFICĂ VERCEL LOGS:

### 1. Mergi la Vercel Logs:
```
https://vercel.com/hugin95s-projects/pisicopedia-app/logs
```

### 2. Filtrează după:
- **Functions** → `/api/auto-post`
- **Time:** Last 1 hour

### 3. Caută după:
- ❌ Error messages
- 🔴 Stack traces
- 📝 Console.log outputs

### 4. Mesaje posibile de căutat:
- `auto-queue.json not found`
- `LEONARDO_API_KEY is not set`
- `OPENAI_API_KEY is not set`
- `Error during commit/push`
- Orice altă eroare

## 🧪 TEST MANUAL:

```powershell
Invoke-RestMethod -Uri "https://www.pisicopedia.ro/api/auto-post?secret=pisicopedia-local-dev-secret-2024" -Method POST
```

## 📊 CE AR TREBUI SĂ FUNCȚIONEZE:

1. ✅ API primește POST request
2. ✅ Verifică CRON_SECRET
3. ✅ Încarcă auto-queue.json
4. ✅ Generează articol cu OpenAI
5. ⚠️  Generează imagine cu Leonardo (opțional)
6. ✅ Salvează articol în content/articles/
7. ✅ Actualizează content-lists.ts
8. ⚠️  Git commit & push (opțional, va eșua în Vercel)
9. ✅ Returnează success

## 🔧 POSIBILE SOLUȚII:

### Dacă eroarea este "auto-queue.json not found":
- Verifică că fișierul este în repository
- Verifică path-ul în logs

### Dacă eroarea este "API key not set":
- Verifică Environment Variables în Vercel
- Asigură-te că sunt setate pentru "Production"
- Redeploy după setare

### Dacă eroarea este legată de filesystem:
- Vercel are filesystem read-only
- Articolele se salvează, dar nu pot fi push-ate
- Acest lucru este OK - articolele vor fi disponibile după deploy manual

## 📝 LOGS UTILE:

Căută în Vercel logs după:
```
[Auto-Post] Processing:
[Auto-Post] SUCCESS:
[Auto-Post] ERROR:
[Git] Starting auto-commit
[Git] Error during commit
```

## 🚀 DUPĂ CE REZOLVI:

Cron-ul va rula automat la fiecare 10 minute și va genera articole!

Verifică:
- GitHub commits
- Site-ul (după deploy)
- Vercel logs pentru execuții reușite

