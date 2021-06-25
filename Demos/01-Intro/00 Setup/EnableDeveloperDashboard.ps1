if ((Get-PSSnapin "Microsoft.SharePoint.PowerShell" -ErrorAction SilentlyContinue) -eq $null) 
{
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
}

$d = [Microsoft.SharePoint.Administration.SPWebService]::ContentService.DeveloperDashboardSettings
$d.DisplayLevel = 'OnDemand'
$d.TraceEnabled = $false
$d.Update()