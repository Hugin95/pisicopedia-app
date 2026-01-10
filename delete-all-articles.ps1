# Delete all articles from Supabase
$SUPABASE_URL = "https://wvyeuudaerurvpvljmgq.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eWV1dWRhZXJ1cnZwdmxqbWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjA4MTg5NSwiZXhwIjoyMDUxNjU3ODk1fQ.YVqbv36E1K8gp6TMz_PkB78JIkFb3K1H50mPXgHsq1w"

Write-Host "🗑️  Deleting all articles from Supabase..." -ForegroundColor Yellow

$headers = @{
    "apikey" = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
    "Content-Type" = "application/json"
    "Prefer" = "return=minimal"
}

try {
    $response = Invoke-RestMethod `
        -Uri "$SUPABASE_URL/rest/v1/articles?select=*" `
        -Method DELETE `
        -Headers $headers `
        -ErrorAction Stop

    Write-Host "✅ All articles deleted successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

