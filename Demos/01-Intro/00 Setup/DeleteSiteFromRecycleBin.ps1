$orgName="integrationsonline";
$siteurl="devsite";

$site = "https://$orgName.sharepoint.com/sites/$siteurl";

Connect-SPOService -Url https://$orgName-admin.sharepoint.com;
Remove-SPODeletedSite -Identity $site -Confirm:$false
