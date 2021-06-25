Import-Module PowerShellGet

# Install-Module SharePointPnPPowerShell2016 -Force

Install-Module SharePointPnPPowerShellOnline -Force -SkipPublisherCheck -AllowClobber

# Update
# Update-Module SharePointPnPPowerShell*

# List CMDs
Get-Module SharePointPnPPowerShell* -ListAvailable | Select-Object Name, Version | Sort-Object Version -Descending

Exit
#Sample Connect
$orgName = "integrationsonline";
Connect-PnPOnline –Url https://$orgName.sharepoint.com –Credentials (Get-Credential)
New-PnPWeb -Title "PnP Web" -Url pnpWeb -Description "SPWeb created using PnP" -Locale 1033 -Template "STS#0"