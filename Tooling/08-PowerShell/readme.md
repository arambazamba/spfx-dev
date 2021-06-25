## Azure Powershell

```bash
Install-Module -Name PowerShellGet -Force
Install-Module -Name Az -AllowClobber -Scope CurrentUser
```

Sign in to Azure

```
Connect-AzAccount
```

Example: Create VM in Cloud Shell:

```bash
New-AzResourceGroup -Name "myResourceGroup" -Location EastUS

New-AzVm `
 -ResourceGroupName "myResourceGroup" `
 -Name "myVM" `
 -Location "East US" `
 -VirtualNetworkName "myVnet" `
 -SubnetName "mySubnet" `
 -SecurityGroupName "myNetworkSecurityGroup" `
 -PublicIpAddressName "myPublicIpAddress" `
 -OpenPorts 80,3389
```
