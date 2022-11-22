# Using Single part app pages in SharePoint Online

[Using Single part app pages in SharePoint Online](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages?tabs=pnpposh)

- Update WebPart Maifest:
    ```
    "supportedHosts": ["SharePointWebPart", "SharePointFullPage"],
    ```
- Update `package-solution.json`:
    ```
    "skipFeatureDeployment": true,
    ```
- Build & Deploy WebPart. You dont need to add it to the site as it is deployed when adding the package
- From the Home Page add a new Page:

    ![app-page](_images/app-page.png)