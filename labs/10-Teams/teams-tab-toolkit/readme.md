# Deploying a Microsoft Teams app

## Task 1: Setup Environment for Teams development

Make sure you are using Node 10.x and Version 1.2.3 of the Teams Toolkit Extension

### Install your development tools

These lessons show how you can get started quickly with the Microsoft Teams Toolkit for Visual Studio Code.

> **NOTE:**
> Due to a bug in the latest Microsoft Teams Toolkit for bot development, you will need to install version 1.1.2.

1. Open Visual Studio Code and select **Extensions** on the left Activity Bar.

2. Search **Microsoft Teams Toolkit** on the extensions panel and install the **Microsoft Teams Toolkit**.

    ![Microsoft Teams Toolkit extension](../../../images/teamstoolkit-install01.png)

3. After the latest Microsoft Teams Toolkit is installed, click on the gear icon and choose **Install Another Version**.

    ![Microsoft Teams Toolkit extension](../../../images/teamstoolkit-install02.png)

4. Select **1.1.2**.

    ![Microsoft Teams Toolkit extension](../../../images/teamstoolkit-install03.png)

5. Click on **Reload Required** to reload Visual Studio Code.

    ![Microsoft Teams Toolkit extension](../../../images/teamstoolkit-install04.png)

## Task 2: Use the Microsoft Teams Toolkit in Visual Studio Code to set up your first app project

1. In Visual Studio Code, select **Microsoft Teams** on the left Activity Bar and choose **Create a new Teams app**.

    ![Create a new Teams app](../../../images/m04_e01_t02_image_1.png)

1. When prompted, sign in with your Microsoft 365 development account.

1. On the **Add capabilities** screen, select **Tab** then Next.

    ![Add capabilities](../../../images/m04_e01_t02_image_2.png)

1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)

1. Check only the **Personal tab** option and select **Finish** at the bottom of the screen to configure your project.

### Review the generated solution

Once the toolkit configures your project, you will have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of Visual Studio Code.

![Microsoft Visual Studio Code showing expanded left navigation pane.](../../../images/m04_e01_t02_image_3.png)

> **NOTE**: The toolkit automatically creates scaffolding for you in the src directory based on the capabilities you added during setup.
>
> For example, if you create a tab during setup the **App.js** file in the **src/components** directory is important because it handles the initialization and routing of your app. It calls the [Microsoft Teams SDK](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/using-teams-client-sdk) to establish communication between your app and Teams.

#### App ID

Your Teams app ID is needed to configure your app with App Studio.

-   You can find the ID in the **teamsAppId** object, which is located in your project's **package.json** file.

### Build and run your app

Your Tab will be located in the **./src/components/Tab.js** file. This is the TypeScript React based class for your Tab.

-   Locate the **render()** method and observe the code inside the `<div>` tag.

```typescript
<div>
    <h3>Hello World!</h3>
    <h1>Congratulations {userName}!</h1>
    <h3>This is the tab you made :-)</h3>
</div>
```

1. Open Terminal in Visual Studio Code. From the Visual Studio Code ribbon select **Terminal > New Terminal**.

1. Go to the root directory of your app project and run: `npm install`.

1. To build your solution run the `npm run build` command.

    - This will transpile your solution into the **./build** folder.

        ![dist directory expanded in VS Code.](../../../images/m04_e01_t02_image_4.png)

### Run your app

To run your app you use the `npm start` command.

> This will build and start a local web server for you to test your app. The command will also rebuild the application whenever you save a file in your project.

Once complete, there's a Compiled successfully! message in the terminal. Your app should now be running on **https://localhost:3000**.

## Task 3: Sideload an app in Microsoft Teams

Now that you’ve tested your tab, it’s time to run your app inside Microsoft Teams.

1. In Visual Studio Code, press the **F5** key to launch a Teams web client.

1. To display your app content in Teams, specify that where your app is running (localhost) is trustworthy:

    1. Open a new tab in the same browser window (Google Chrome by default) which opened after pressing **F5**.

    1. Go to [https://localhost:3000/tab](https://localhost:3000/tab) and proceed to the page.

1. Go back to Teams. In the dialog, select **Add for me** to install your app.

    ![Add app to Te](../../../images/m04_e01_t03_image_1.png)
