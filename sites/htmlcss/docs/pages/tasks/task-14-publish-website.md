# Task 14 - Publish Your Website

!!! note "Working in GitHub"
    In this task you publish the **Green Thumb Gardening** website to the internet with **GitHub Pages**. Download it in the first exercise. You will need a free GitHub account.

## Download the Website

!!! abstract "Instructions"
    **Using your web browser**, download and unzip the Green Thumb Gardening website.

    [Download Green Thumb Gardening](../../assets/task-14-green-thumb-gardening.zip){.md-button}

    Open `index.html` in your browser and click through every page, so you know what the website should look like once it is published.

??? question "Hint"
    Right-click the zip file and choose **Extract All**. The website is in the `green-thumb-gardening` folder, which contains four pages, `style.css` and an `images` folder.

## Create a Repository

!!! abstract "Instructions"
    **Using GitHub**, create a new repository for the Green Thumb Gardening website with the following configuration:

    | Setting | Value |
    |---|---|
    | Repository name | `green-thumb-gardening` |
    | Description | `Green Thumb Gardening website` |
    | Visibility | Public |
    | Add README | On |

??? question "Hint"
    Follow the `Creating a GitHub Repository` section of the [Deploying to GitHub Pages](../resources/deployment-github.md) guide.

## Upload Your Site

!!! abstract "Instructions"
    **Using GitHub**, upload the Green Thumb Gardening website into the repository so it is ready to publish.

    Follow the `Uploading Site Files` section of the guide. Your repository must contain:

    - `index.html`, `services.html`, `about.html` and `contact.html`
    - `style.css`
    - the `images` folder with all of the images inside it

??? question "Hint"
    Upload the files **inside** the `green-thumb-gardening` folder, not the folder itself. The file picker cannot select folders, so drag and drop the `images` folder onto the upload area. Double check your file names after uploading: the home page must be called exactly `index.html`.

## Go Live with Pages

!!! abstract "Instructions"
    **Using GitHub**, publish your uploaded site with GitHub Pages.

    Follow the `Deploying to GitHub Pages` and `Viewing your Deployed Website` sections of the guide, then open your live site address in a new browser tab.

??? question "Hint"
    Publishing happens under the repository `Settings` and then the `Pages` section. Select the `main` branch and save. The deployment takes a moment: watch the `Actions` tab change from orange to green before opening the link.

## Check Your Live Site

!!! abstract "Instructions"
    **Using your browser**, test your live website the way a visitor would.

    - visit every page using the navigation menu, and click the logo on every page
    - confirm every image loads and the styles are applied on every page
    - confirm the address starts with `https://` and shows a padlock
    - if something is broken, work through the `Troubleshooting` section of the guide and fix the problem

??? question "Hint"
    Browsers load `index.html` by default when no page is named in the address, so an empty-looking site usually means that file is missing or misnamed. A link or image that works on your computer but not online is usually a difference in capital letters, or a file that was not uploaded.

## Update the Live Site

!!! abstract "Instructions"
    **Using VS Code and GitHub**, add a fifth service called `Lawn Mowing` to the services page, with a description and a price.

    - make the change in VS Code and test it with Live Preview
    - upload the changed file to your repository and commit it
    - wait for the new deployment to finish, then check the change appears on the live site

??? question "Hint"
    Copy one of the existing service cards in `services.html` and change its details. You can reuse one of the other photos, or leave the image out. Uploading a file with the same name as an existing file replaces it. GitHub Pages re-publishes the site automatically after each commit, which you can watch in the `Actions` tab. If the old version still shows, refresh the page with `Ctrl + F5`.

## Publish the Second Website

!!! abstract "Instructions"
    **Using GitHub**, repeat the whole publishing process for the **Harbour Swim School** website:

    [Download Harbour Swim School](../../assets/task-14-harbour-swim-school.zip){.md-button}

    - create a public repository called `harbour-swim-school` with a description and a README
    - upload all of the pages, the stylesheet and the `images` folder
    - turn on GitHub Pages and wait for the deployment
    - test every page of the live site

??? question "Hint"
    This repeats every exercise in this task. Try to complete it without looking at the guide, then use the guide to check anything you were unsure about. This website has a `lessons.html` page instead of a services page.
