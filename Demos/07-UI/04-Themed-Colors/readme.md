# App Page using Themed Colors

[Use theme colors in your SharePoint Framework customizations](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-theme-colors-in-your-customizations)

## Demo

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