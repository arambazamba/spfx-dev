# Use SharePoint Rest Api from Node Stand-Alone

- Use Node 12.x
- Go to `https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps`
- Create an App Registration and update `msal-config.json`

    ![app-reg-01](_images/app-reg-01.png)

    ![app-reg-01](_images/app-reg-02.png)

    ![app-reg-01](_images/app-reg-03.png)

- Install http-server using `npm i -g http-server`    
- Excute http-server in proj folder and open `http://localhost:8080`