# Test POST la API auto-post
$url = "https://www.pisicopedia.ro/api/auto-post?secret=pisicopedia-local-dev-secret-2024"

Write-Host "`n🚀 Sending POST request to generate article...`n" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -ContentType "application/json"
    
    Write-Host "✅ SUCCESS!`n" -ForegroundColor Green
    Write-Host "Status: $($response.status)" -ForegroundColor Yellow
    
    if ($response.status -eq "created") {
        Write-Host "Title: $($response.title)" -ForegroundColor Green
        Write-Host "Slug: $($response.slug)" -ForegroundColor Green
        Write-Host "Category: $($response.category)" -ForegroundColor Green
        Write-Host "Duration: $($response.duration)ms" -ForegroundColor Green
    } else {
        Write-Host "Reason: $($response.reason)" -ForegroundColor Yellow
    }
    
    Write-Host "`nFull Response:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "❌ ERROR: $_" -ForegroundColor Red
}

