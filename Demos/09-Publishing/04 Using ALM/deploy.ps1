$tenant = "integrationsonline"
Connect-PnPOnline -url https://$tenant.sharepoint.com
$objAppId = Add-PnPApp -Path ./spfx-alm/sharepoint/solution/sp-fx-alm.sppkg -Overwrite 
[GUID]$appid = $objAppId.Id
Write-Host "App added to catalog"
Publish-PnPApp -Identity $appid -Scope Tenant
Write-Host "App with ID: $appid published"
