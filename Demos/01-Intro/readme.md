# Requirements

- Install [VS Code](https://code.visualstudio.com/download)
- Install [VS Code Powershell Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell)
- Install [NVM Windows](https://github.com/coreybutler/nvm-windows)
- Install [Node Version 12.x](https://nodejs.org/en/download/releases/) using nvm:

    ```
    nvm install 12.20.0
    ```
# Machine Setup for SPFx Dev

```
npm install -g yo gulp
npm install -g @microsoft/generator-sharepoint
npm install -g @pnp/generator-spfx
```

To trust the dev certificate run from within your first project:

```
gulp trust-dev-cert
```

## REST Client

Use [Postman](https://www.getpostman.com/)

[Setup Postman](https://blogs.msdn.microsoft.com/emeamsgdev/2018/08/03/querying-the-office-365-management-apis-using-postman/) to use with Office 365

as an Alternative you can use [SP REST Client](https://marketplace.visualstudio.com/items?itemName=s-kainet.rest-client)

## Office CLI

Install [Office CLI](https://pnp.github.io/office365-cli/)

```
npm i -g @pnp/office365-cli
```

[JMESPath Documentation](http://jmespath.org/)

```
npm i -g jmespath
```

## Recommende Extensions & AddOns

[Sharepoint Client Browser](https://github.com/bramdejager/spcb)

[SPRemote API Explorer](https://marketplace.visualstudio.com/items?itemName=SteveCurranMVP.SPRemoteAPIExplorer)

[SPFx Snippets](https://marketplace.visualstudio.com/items?itemName=eliostruyf.spfx-snippets)

[SPFx TaskRunner](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-spfx-task-runner)

[SharePoint Typed Items](https://marketplace.visualstudio.com/items?itemName=s-kainet.sharepoint-typed-item)