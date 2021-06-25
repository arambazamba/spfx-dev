# Deploy App using PnP PowerShell

Bundle & Build SPFx:

```javascript
gulp bundle
gulp package-solution
```

Upload & Deploy Package from Terminal:

```Powershell
$tenant = "integrationsonline"
Connect-PnPOnline -url https://$tenant.sharepoint.com
$objAppId = Add-PnPApp -Path ./spfx-alm/sharepoint/solution/sp-fx-alm.sppkg -Overwrite 
[GUID]$appid = $objAppId.Id
Write-Host "App added to catalog"
Publish-PnPApp -Identity $appid -Scope Tenant
Write-Host "App with ID: $appid published"
```

Install it:

```Powershell
Install-PnPApp -Identity $appid
```

Uninstall it:

```Powershell
Uninstall-PnPApp -Identity $appid -Scope Tenant
Remove-PnPApp -Identity $appid -Scope Tenant
```
# Deploy App using Office CLI

[Office CLI Reference](https://pnp.github.io/office365-cli/cmd/spo/login/)

## Install Office 365 CLI & Interactive Samples

```
npm install -g @pnp/office365-cli
```

Login

```
o365
spo login https://TENANT-admin.sharepoint.com
```

Get logged in user (status)

```
spo status
```

List apps available in the tenant app catalog

```
spo app list -o json
```

## Writing CLI Scripts

>Note: To write Powershell script simply use Powershell and prefix Office CLI script with `o365`

List apps available in the tenant app catalog - deploy those that are not deployed

```Powershell
$apps = o365 spo app list -o json | ConvertFrom-Json
$apps | ? Deployed -eq $false | % { o365 spo app deploy -i $_.ID }
```

Add app to catalog - requires login 

```Powershell
$siteUrl = "https://integrationsonline.sharepoint.com/sites/DevGrp"
$appId = o365 spo app add --filePath ./spfx-alm/sharepoint/solution/sp-fx-alm.sppkg --overwrite 
o365 spo app deploy --id $appId --skipFeatureDeployment
o365 spo app install --id $appId --siteUrl $siteUrl
```