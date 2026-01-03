Write-Host "`n⏰ Așteptăm 2 minute pentru redeploy Vercel...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 120

Write-Host "🚀 Testare POST...`n" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://www.pisicopedia.ro/api/auto-post?secret=pisicopedia-local-dev-secret-2024" -Method POST -TimeoutSec 120
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ SUCCESS! Status: $($response.status)" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Green
    
    if ($response.status -eq 'created') {
        Write-Host "📝 ARTICOL GENERAT:" -ForegroundColor Cyan
        Write-Host "  Title: $($response.title)"
        Write-Host "  Slug: $($response.slug)"
        Write-Host "  Category: $($response.category)"
        Write-Host "  Duration: $([math]::Round($response.duration/1000, 2))s`n"
        Write-Host "🔗 URL: https://www.pisicopedia.ro/sanatate/$($response.slug)`n" -ForegroundColor Cyan
    } else {
        Write-Host "Status: $($response.status)" -ForegroundColor Yellow
        if ($response.reason) {
            Write-Host "Reason: $($response.reason)`n"
        }
    }
    
    Write-Host "Full response:" -ForegroundColor Gray
    $response | ConvertTo-Json
    
} catch {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ EROARE: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "========================================`n" -ForegroundColor Red
}

