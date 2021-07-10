$tenant = "integrationsonline"
Connect-PnPOnline -url https://$tenant.sharepoint.com
$objAppId = Add-PnPApp -Path ./spfx-cli/sharepoint/solution/spfx-cli.sppkg -Overwrite 
[GUID]$appid = $objAppId.Id
Write-Host "App added to catalog"
Publish-PnPApp -Identity $appid -Scope Tenant
Write-Host "App with ID: $appid published"
