# Make sure you have logged in using: m365 login

$siteUrl = "https://integrationsonline.sharepoint.com/sites/spfx-dev"
m365 spo app add --filePath ./spfx-cli/sharepoint/solution/spfx-cli.sppkg --overwrite 

$appId = m365 spo app list --query "[?contains(Title, 'spfx-cli-client-side-solution')].ID" --output json | ConvertFrom-Json
m365 spo app deploy --id $appId 
m365 spo app install --id $appId --siteUrl $siteUrl