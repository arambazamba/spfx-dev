# Requirements

- Install [VS Code](https://code.visualstudio.com/download)
- Remove existing Node installations in advance
- Install [NVM Windows](https://github.com/coreybutler/nvm-windows). 
- Install [Node Version 12.x](https://nodejs.org/en/download/releases/) using nvm:

    ```
    nvm install 12.20.0
    nvm use 12.20.0
    ```
> Note: Find Node versions [here](https://nodejs.org/en/download/releases/)

# Machine Setup for SPFx Dev

List global installations:

```
npm list -g --depth 0
```

Install SPFx requirements:

```
npm install -g yo gulp
npm install -g @microsoft/generator-sharepoint
```

Create Projcet:

```
yo @microsoft/generator-sharepoint
```

Start Project:

```
gulp serve
```

To trust the dev certificate run from within your first project:

```
gulp trust-dev-cert
```

Go to Online Workbench:

- Add `_layouts/workbench.aspx` to site url
- Add the WebPart

Create bundle:

```
gulp bundle [--ship]
```

Create *.sppkg:

```
gulp package-solution [--ship]
```

Deploy *.sppkg to app catalog

## REST Client

Use [Postman](https://www.getpostman.com/)

[Setup Postman](https://blogs.msdn.microsoft.com/emeamsgdev/2018/08/03/querying-the-office-365-management-apis-using-postman/) to use with Office 365

as an Alternative you can use [SP REST Client](https://marketplace.visualstudio.com/items?itemName=s-kainet.rest-client)

## CLI for Microsoft 365

Install [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/)

```
npm i -g @pnp/cli-microsoft365
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
