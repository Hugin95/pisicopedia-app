$SUPABASE_URL = "https://wvyeuudaerurvpvljmgq.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eWV1dWRhZXJ1cnZwdmxqbWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODE4OTUsImV4cCI6MjA1MTY1Nzg5NX0.d6KN_sPfJN6gMYRJZx0wWO_Q2gvvUJqy3Qx8g3tXDGQ"

Write-Host "`n🔍 Checking articles in Supabase...`n" -ForegroundColor Cyan

$headers = @{
    "apikey" = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
}

$uri = "$SUPABASE_URL/rest/v1/articles?select=id,slug,title,image_url"

$response = Invoke-RestMethod -Uri $uri -Method GET -Headers $headers

Write-Host "📊 Found $($response.Count) article(s):`n" -ForegroundColor Green

foreach ($article in $response) {
    Write-Host "ID: $($article.id)" -ForegroundColor Yellow
    Write-Host "Slug: $($article.slug)"
    Write-Host "Title: $($article.title)"
    if ($article.image_url) {
        Write-Host "Image URL: $($article.image_url)" -ForegroundColor Green
    } else {
        Write-Host "Image URL: NULL ❌" -ForegroundColor Red
    }
    Write-Host ""
}
