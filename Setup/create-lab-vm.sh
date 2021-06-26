rnd=$RANDOM
loc=westeurope
grp=spfx-lab
vmname=labvm-$rnd
user=spfxlabadmin
pwd=Lab@dmin1234

az group create -n $grp -l $loc

az vm create -g $grp -n $vmname --admin-username $user --admin-password $pwd --image  MicrosoftWindowsDesktop:Windows-10:21h1-pro-g2:19043.985.2105141120 --size Standard_E2s_v3

az vm auto-shutdown -g $grp -n $vmname --time 1830