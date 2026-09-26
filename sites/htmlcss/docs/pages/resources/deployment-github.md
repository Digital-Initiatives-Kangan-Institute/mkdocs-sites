<style>
img {
    border: 1px solid gray;
    border-radius: 10px !important;
    box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 4px;
}

h1.notice-me,
h2.notice-me {
    border: 0;
    border-radius: 5px;

    font-weight: 400 !important;
    padding: 1rem;

    color: white !important;
    background-color: rgb(51, 168, 156);
}
</style>

# Deploying to GitHub Pages {.notice-me}
**GitHub** is a platform where developers can store and manage their code in projects called **repositories**. In this guide, you will learn how to:

- Create a GitHub repository
- Upload your website files to the repository
- Publish your website using GitHub Pages
- Access and view your deployed website

!!! warning
    This guide assumes you have [created a GitHub account](https://github.com/signup) and have [logged in](https://github.com/login).

## Creating a GitHub Repository {.notice-me}
The following instructions will show you how to create a GitHub repository, to prepare to upload your website files.

**Instructions**
1. Using your web browser of choice (**Google Chrome, Microsoft Edge, FireFox**, etc..), visit [https://github.com/](https://github.com/).

2. Locate the `Create new...` button **at the top of the screen** and **click** on it

    ??? question "Preview Image - Click to view"
        ![Create Repository Button](../../assets/deploy-github/create-repo-button.png)

3. Select the `New repository` option from the menu that appears

    ??? question "Preview Image - Click to view"
        ![Select New Repository Button](../../assets/deploy-github/create-repo-option.png)

4. Fill in the repository form
You need to give your repository a name and enable the `Add README` option.

    !!! warning
        It is important that you enable the `Add README` option, otherwise you will not be able to upload files.

    ??? question "Preview Image - Click to view"
        ![Create Repository Fields](../../assets/deploy-github/create-repo-fields.png)

5. If you have followed these steps correctly you should see a repository with a single file in it called `README.md`:

    ??? question "Preview Image - Click to view"
        ![Repository with README.md file](../../assets/deploy-github/readme-file.png)

## Uploading Site Files {.notice-me}
**Instructions**

1. Click the `Add file` button

    ??? question "Preview Image - Click to view"
        ![Add file button](../../assets/deploy-github/add-file-button.png)

2. Select the `Upload files` option

    ??? question "Preview Image - Click to view"
        ![Upload files option](../../assets/deploy-github/upload-files-option.png)

3. Click the `choose your files` link

    ??? question "Preview Image - Click to view"
        ![Choose files link](../../assets/deploy-github/choose-files-link.png)

4. Select the website files you have created in a previous activity
Select any `index.html` and other `html` files you created in a previous activity and click the `open` button.
!!! This probably needs a screenshot !!!

5. Click the `Commit changes` button to upload the files

    ??? question "Preview Image - Click to view"
        ![Commit changes button](../../assets/deploy-github/commit-changes-button.png)

6. If you have done these steps correctly you should see your files uploaded to your repository:

    ??? question "Preview Image - Click to view"
        ![Site files in repository](../../assets/deploy-github/site-files.png)

## Deploying to GitHub Pages {.notice-me}
**Instructions**

1. Click on the `Settings` tab in the navigation bar

    ??? question "Preview Image - Click to view"
        ![Settings tab button](../../assets/deploy-github/settings-tab-button.png)

2. Click on the `Pages` tab in the sidebar navigation

    ??? question "Preview Image - Click to view"
        ![Pages sidebar tab button](../../assets/deploy-github/pages-tab-button.png)

3. Click on the `Branch` drop-down menu

    ??? question "Preview Image - Click to view"
        ![Branch dropdown button](../../assets/deploy-github/branch-dropdown.png)

4. Select the `main` branch

    ??? question "Preview Image - Click to view"
        ![Branch main option](../../assets/deploy-github/branch-dropdown-option.png)

5. Click on the `Save` button

    ??? question "Preview Image - Click to view"
        ![Branch save button](../../assets/deploy-github/branch-save-button.png)

## Viewing your Deployed Website {.notice-me}
**Instructions**

1. Click on the `Actions` tab in the navigation bar

    ??? question "Preview Image - Click to view"
        ![Actions tab button](../../assets/deploy-github/actions-tab-button.png)

2. Wait for the action to complete
You will need to wait for the website to be deployed by GitHub, you will know when it is complete when the action changes from **orange** to **green**.

    ??? question "Preview Image - Click to view"
        ![Action running](../../assets/deploy-github/action-running.png)

    ??? question "Preview Image - Click to view"
        ![Action completed](../../assets/deploy-github/action-completed.png)

3. Click on the action name
This will take you to the completed action (the GitHub deployment)

    ??? question "Preview Image - Click to view"
        ![Action completed link](../../assets/deploy-github/action-completed-link.png)

4. Click on your deployed pages link

    ??? question "Preview Image - Click to view"
        ![Deployment link](../../assets/deploy-github/deployment-link.png)

5. If you have done the steps correctly you should see the website that you made in a previous activity show up (your website may look different to mine):

    ??? question "Preview Image - Click to view"
        ![Choose files link](../../assets/deploy-github/site-preview.png)

    If you do see your website then your site is now live and you can share your website link with your peers and visit it from any computer / network with an internet connection.

## Troubleshooting {.notice-me}
If you are experiencing issues with your deployed GitHub Pages website, refer to the frequently asked questions below for help:

**I only see the name of my repository with an empty site**
If your website looks like the following after deploying your site and opening the link, then you have not correctly setup your index file:

??? question "Preview Image - Click to view"
    ![Choose files link](../../assets/deploy-github/site-preview-no-index.png)

Make sure you have a `html` file in your repository named `index.html`. If you do not have this file, then the web browser does not know how to get to your page. 

Remember: Web browser look for the `index.html` file by default when you do not specify a page in the address bar.

## Activity - Publish Your Website {.notice-me}

[Attempt Activity 8 - Publish Your Website](../tasks/task-8-publish-website.md){.md-button}

