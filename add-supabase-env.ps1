# Script pentru adăugare variabile Supabase în .env.local

$envFile = ".env.local"

$supabaseVars = @"

# Supabase
SUPABASE_URL=https://wvyeuudaerurvpvljmgq.supabase.co
SUPABASE_ANON_KEY=sb_publishable_G41w_OvYDvb2vt1jx7hexw_WUKjR0X7
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eWV1dWRhZXJ1cnZwdmxqbWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzcwNTE2NiwiZXhwIjoyMDgzMjgxMTY2fQ.5OUoM8Lk0lj0FGKM1G_EubU974f6x4XHvmL6filCfFY
"@

Add-Content -Path $envFile -Value $supabaseVars

Write-Host "`n✅ Variabile Supabase adăugate în .env.local!`n" -ForegroundColor Green
Write-Host "Acum rulează: npm run dev`n" -ForegroundColor Cyan

