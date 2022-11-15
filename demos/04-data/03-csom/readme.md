# CSOM Webpart

[The Client Side Object Model (CSOM) API for .NET.](<https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/jj193041(v=office.15)>)

[JSOM API RReference](<https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-visio/jj193034(v=office.15)>)

[Common CSOM Tasks](<https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee537013(v=office.14)>)

[Using CSOM for .NET Standard instead of CSOM for .NET Framework](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/using-csom-for-dotnet-standard)

[Connect to SharePoint using the JavaScript Object Model](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/connect-to-sharepoint-using-jsom)

## Demo

- Register CSOM in `config.json`
- Add SharePoint Types:

    ```
    npm i -D @types/sharepoint
    ```
- Add SharePoint Typing to tsconfig.json:

    ```
    "types": [
      "webpack-env",
      "sharepoint"
    ],
    ```