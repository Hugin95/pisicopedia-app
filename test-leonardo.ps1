$apiKey = "6d2d30ac-c99e-4c6b-aada-12afc34f0282"

Write-Host "`n🔍 TESTARE LEONARDO API...`n" -ForegroundColor Cyan

try {
    $headers = @{
        "Authorization" = "Bearer $apiKey"
        "Accept" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "https://cloud.leonardo.ai/api/rest/v1/me" -Headers $headers -Method GET
    
    Write-Host "✅ API Key VALID!`n" -ForegroundColor Green
    Write-Host "User ID: $($response.user_details.user.id)"
    Write-Host "Username: $($response.user_details.user.username)"
    
    Write-Host "`n💰 SUBSCRIPTION & CREDITS:" -ForegroundColor Yellow
    $response.user_details | ConvertTo-Json -Depth 5
    
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)`n" -ForegroundColor Red
    
    if ($_.ErrorDetails) {
        Write-Host "Response:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}

