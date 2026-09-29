# Task 13 - Publish Your Website

## Create a Repository

!!! abstract "Instructions"
    **Using GitHub**, create a new repository for your Paws and Claws website with the following configuration:

    | Setting | Value |
    |---|---|
    | Repository name | `paws-and-claws` |
    | Description | `Paws and Claws Pet Grooming website` |
    | Visibility | Public |
    | Add README | On |

    Write down the repository's URL once it has been created.

??? question "Hint"
    Follow the `Creating a GitHub Repository` section of the [Deploying to GitHub Pages](../resources/deployment-github.md) guide. The repository URL is shown in your browser's address bar, and follows the pattern of your GitHub username followed by the repository name.

## Upload Your Site

!!! abstract "Instructions"
    **Using GitHub**, upload your Paws and Claws website into the repository so it is ready to publish.

    Follow the `Uploading Site Files` section of the guide. Your repository must contain:

    - `index.html`, `services.html`, `about.html` and `contact.html`
    - `style.css`
    - the `images` folder with all of your images inside it

??? question "Hint"
    Your repository needs a `README` file before GitHub will let you upload other files. The file picker cannot select folders, so drag and drop the `images` folder onto the upload area. Double check your file names after uploading: the home page must be called exactly `index.html`.

## Go Live with Pages

!!! abstract "Instructions"
    **Using GitHub**, publish your uploaded site with GitHub Pages.

    Follow the `Deploying to GitHub Pages` and `Viewing your Deployed Website` sections of the guide, then open your live site address in a new browser tab.

    Write down each step you took in your own words, and record your live site's address.

??? question "Hint"
    Publishing happens under the repository `Settings` and then the `Pages` section. Select the `main` branch and save. The deployment takes a moment: watch the `Actions` tab change from orange to green before opening the link.

## Check Your Live Site

!!! abstract "Instructions"
    **Using your browser**, test your live website the way a visitor would.

    - visit every page using the navigation menu, and click the logo on every page
    - confirm every image loads and the styles are applied on every page
    - confirm the address starts with `https://` and shows a padlock
    - take a screenshot of every page
    - if something is broken, work through the `Troubleshooting` section of the guide and fix the problem

??? question "Hint"
    Browsers load `index.html` by default when no page is named in the address, so an empty-looking site usually means that file is missing or misnamed. A link or image that works on your computer but not online is usually a difference in capital letters, or a file that was not uploaded.

## Update the Live Site

!!! abstract "Instructions"
    **Using VS Code and GitHub**, make one improvement to your Paws and Claws website, such as a change from your amendment record in Task 12.

    - make the change in VS Code and test it with Live Preview
    - upload the changed file to your repository and commit it
    - wait for the new deployment to finish, then check the change appears on the live site
    - record the change in your amendment record

??? question "Hint"
    Uploading a file with the same name as an existing file replaces it. GitHub Pages re-publishes the site automatically after each commit, which you can watch in the `Actions` tab. If the old version still shows, refresh the page with `Ctrl + F5`.

## Publish the Second Website

!!! abstract "Instructions"
    **Using GitHub**, repeat the whole publishing process for your Riverside Bike Repairs website:

    - create a public repository called `riverside-bike-repairs` with a description and a README
    - upload all of the pages, the stylesheet and the `images` folder
    - turn on GitHub Pages and wait for the deployment
    - test every page of the live site and take a screenshot of each one
    - record your repository URL, the live site address, and the steps you took

??? question "Hint"
    This repeats every exercise in this task. Try to complete it without looking at the guide, then use the guide to check anything you were unsure about.

## Compare Publishing Methods

!!! abstract "Instructions"
    **Using the Publishing a Website resource**, write a short explanation for a client who asks: *"Should we publish our website with GitHub Pages, or pay for web hosting and upload it with FTP?"*

    Your explanation must cover:

    - what FTP is and what it is used for
    - at least `3` benefits of GitHub Pages
    - at least `2` situations where FTP hosting would be the better choice
    - the security differences between the two

??? question "Hint"
    The [GitHub Pages vs FTP](../resources/publishing.md#github-pages-vs-ftp) table compares the two methods. Think about cost, security, version control, and whether the site needs features that only work with a server, such as a working contact form.

## Explore an FTP Client

!!! abstract "Instructions"
    **Using FileZilla** (if it is available on your computer), open the application and identify:

    - where the host, username, password and port are entered
    - the **local site** panel and the **remote site** panel
    - where file transfers are shown while they are running

    Write a numbered list of the steps you would follow to upload a website to a web server with FileZilla.

??? question "Hint"
    You do not need a real web server for this exercise. The [FTP Clients](../resources/publishing.md#ftp-clients) section describes each part of the FileZilla window and the upload process. Think about which folder on the server the files need to go in, and why the folder structure must stay the same.
