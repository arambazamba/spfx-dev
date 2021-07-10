# Make sure you have logged in using: m365 login

$siteUrl = "https://integrationsonline.sharepoint.com/sites/m365dev"
$appId = m365 spo app add --filePath ./spfx-cli/sharepoint/solution/spfx-cli.sppkg --overwrite 
m365 spo app deploy --id $appId --skipFeatureDeployment
m365 spo app install --id $appId --siteUrl $siteUrl