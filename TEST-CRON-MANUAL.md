# Test Manual Cron Job

## Metoda 1: cURL (din terminal)

```bash
# Înlocuiește YOUR_CRON_SECRET cu valoarea din .env.local
curl -X POST "https://www.pisicopedia.ro/api/auto-post?secret=YOUR_CRON_SECRET"
```

## Metoda 2: Browser (direct)

1. Deschide fișierul `.env.local`
2. Copiază valoarea `CRON_SECRET=...`
3. Deschide în browser:
   ```
   https://www.pisicopedia.ro/api/auto-post?secret=PASTE_SECRET_HERE
   ```

## Ce ar trebui să vezi:

### SUCCESS Response:
```json
{
  "status": "created",
  "slug": "pisica-...",
  "title": "...",
  "category": "sanatate",
  "duration": 45000,
  "timestamp": "2026-01-03T..."
}
```

### Sau "nothing_to_post":
```json
{
  "status": "nothing_to_post",
  "reason": "No pending topics in queue"
}
```

### Sau "daily_limit":
```json
{
  "status": "daily_limit",
  "reason": "Daily limit reached (5 posts)"
}
```

## Verificare Vercel Logs:

1. Mergi la: https://vercel.com/hugin95s-projects/pisicopedia-app/logs
2. Filtrează: "All Functions" → `/api/auto-post`
3. Verifică dacă apar execuții

## Verificare GitHub:

1. Mergi la: https://github.com/Hugin95/pisicopedia-app/commits/master
2. Caută commit-uri noi cu "Auto-post: ..."


## Test executat: 01/03/2026 23:29:02
