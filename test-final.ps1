Write-Host "`n🚀 TESTARE FINALĂ - GENERARE ARTICOL`n" -ForegroundColor Cyan

Write-Host "Așteptare 30 secunde pentru ca API-ul să fie gata..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "`nTrimiți POST request...`n" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://www.pisicopedia.ro/api/auto-post?secret=pisicopedia-local-dev-secret-2024" -Method POST -TimeoutSec 120
    
    Write-Host "✅ SUCCESS!`n" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Status: $($response.status)" -ForegroundColor Yellow
    
    if ($response.status -eq "created") {
        Write-Host "`n📝 ARTICOL NOU GENERAT:" -ForegroundColor Green
        Write-Host "  Title: $($response.title)"
        Write-Host "  Slug: $($response.slug)"
        Write-Host "  Category: $($response.category)"
        Write-Host "  Duration: $([math]::Round($response.duration/1000, 2))s"
        Write-Host "`n🔗 URL: https://www.pisicopedia.ro/sanatate/$($response.slug)" -ForegroundColor Cyan
        Write-Host "`n✅ Verifică GitHub: https://github.com/Hugin95/pisicopedia-app/commits/master" -ForegroundColor Green
    } elseif ($response.status -eq "nothing_to_post") {
        Write-Host "`n⚠️  Nu mai sunt topicuri în queue" -ForegroundColor Yellow
    } elseif ($response.status -eq "daily_limit") {
        Write-Host "`n⚠️  Limită zilnică atinsă" -ForegroundColor Yellow
    } else {
        Write-Host "`n⚠️  Status: $($response.status)" -ForegroundColor Yellow
        if ($response.reason) {
            Write-Host "  Reason: $($response.reason)"
        }
    }
    
    Write-Host "========================================`n" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ EROARE!`n" -ForegroundColor Red
    Write-Host "Message: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails) {
        Write-Host "`nDetalii:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message
    }
}

Write-Host "`n✅ Test complet!" -ForegroundColor Green

