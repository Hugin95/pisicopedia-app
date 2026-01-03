Write-Host "`n⏰ Așteptăm 2 minute pentru redeploy...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 120

Write-Host "🚀 Testare POST (cu debug logging)...`n" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://www.pisicopedia.ro/api/auto-post?secret=pisicopedia-local-dev-secret-2024" -Method POST -TimeoutSec 120
    
    Write-Host "✅ SUCCESS! Status: $($response.status)`n" -ForegroundColor Green
    $response | ConvertTo-Json
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)`n" -ForegroundColor Red
    Write-Host "🔍 VERIFICĂ VERCEL LOGS pentru detalii:" -ForegroundColor Yellow
    Write-Host "   https://vercel.com/hugin95s-projects/pisicopedia-app/logs`n"
}

