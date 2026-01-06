$response = Invoke-RestMethod -Uri "https://www.pisicopedia.ro/api/generate-article?secret=pisicopedia-local-dev-secret-2024" -Method POST

Write-Host "`n=== RESPONSE ===" -ForegroundColor Cyan
$response | ConvertTo-Json -Depth 10
Write-Host "`n"

