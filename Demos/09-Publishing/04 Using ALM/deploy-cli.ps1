# Make sure you have logged in

$siteUrl = "https://integrationsonline.sharepoint.com/sites/DevGrp"
$appId = o365 spo app add --filePath ./spfx-alm/sharepoint/solution/sp-fx-alm.sppkg --overwrite 
o365 spo app deploy --id $appId --skipFeatureDeployment
o365 spo app install --id $appId --siteUrl $siteUrl