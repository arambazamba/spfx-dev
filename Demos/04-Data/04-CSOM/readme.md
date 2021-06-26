# CSOM Webpart

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