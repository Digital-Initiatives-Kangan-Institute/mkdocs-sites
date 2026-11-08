# Task 16 - Peer Testing

In this task you finish the **Summit Climbing Gym** website, publish it on GitHub Pages and send the live link and the Peer Test Record to a peer to test. You then fix anything that fails.

## Download the Website

!!! abstract "Instructions"
    **Using your web browser**, download and unzip the Summit Climbing Gym website, then open the `summit-climbing-gym` folder in VS Code.

    [Download Summit Climbing Gym](../../assets/task-16-summit-climbing-gym.zip){.md-button}

??? question "Hint"
    Right-click the zip file and choose **Extract All** before you open the folder. VS Code cannot open files that are still inside a zip file.

## Wire Up the Website

!!! abstract "Instructions"
    **Using VS Code**, complete every `TODO` comment in `index.html`, `about.html` and `contact.html`:

    - add a menu link to each of the three pages: **Home**, **About Us** and **Contact**
    - give the menu link for the page you are on the class `active`
    - link the stylesheet on the About Us and Contact pages
    - make the logo on the About Us and Contact pages a link to the home page

    Delete each `TODO` comment once you have completed it. Open each page with **Live Preview** and click every link to check your work.

??? code "click to expand"
    ```html
    <nav>
      <ul>
        <li><!-- TODO: link to the home page --></li>
        <li><!-- TODO: link to the about page --></li>
        <li><!-- TODO: link to the contact page --></li>
      </ul>
    </nav>
    ```

??? question "Hint"
    `index.html` already has a linked stylesheet and a logo that links to the home page. Look at how those are written in its `head` and `header`, then do the same on the other two pages.

??? tip "Hint - Click to expand"
    The menu should be the same on every page, so build it once in `index.html`, then copy it into the other two pages. Only the `active` class moves, so that it sits on the link for the page you are on.

## Fix the Faults

!!! abstract "Instructions"
    **Using VS Code**, find and fix the faults in the website. There are four faults that are **not** marked with a `TODO` comment.

??? question "Hint"
    Check each page's browser tab title, every image and every form field. Compare each page with the other two: a fault is often something that was copied from another page and not changed.

??? tip "Hint - Click to expand"
    One fault only shows up once the site is live on GitHub Pages. Web servers treat file names as case-sensitive, so check that every `src` matches the file name in the `images` folder exactly, including capital letters.

## Publish Your Website

!!! abstract "Instructions"
    **Using GitHub**, publish your `summit-climbing-gym` website with GitHub Pages. Follow these sections of the [Deploying to GitHub Pages](../resources/deployment-github.md) guide:

    - `Creating a GitHub Repository`, using `summit-climbing-gym` as the repository name
    - `Uploading Site Files`, uploading the files and the `images` folder inside your `summit-climbing-gym` folder
    - `Deploying to GitHub Pages` and `Viewing your Deployed Website`

    When the site is live, open its address in a new browser tab and check that the home page loads.

??? question "Hint"
    Upload the files **inside** the `summit-climbing-gym` folder, not the folder itself, so that `index.html` sits at the top of the repository. Drag the `images` folder onto the upload area so that the folder is kept. If the page does not load, use the [Troubleshooting](../resources/deployment-github.md#troubleshooting) section of the Deploying to GitHub Pages guide.

## Send Your Website for Peer Testing

!!! abstract "Instructions"
    **Using the Peer Test Record template**, download the template and send it to a peer, along with the live link to your website. Your peer does not need your website files.

    [Download Peer Test Record Template](../../assets/task-16-peer-test-record-template.xlsx){.md-button}

    Ask your peer to:

    - fill in their name in **Tester Name** and the date in **Date Tested**
    - run every test case on your live website and record **Pass** or **Fail** in the **Browser 1** column, and in the **Browser 2** column if they have a second browser
    - for every **Fail**, write what happened in the **Comments** column
    - send the completed test record back to you

    Do **not** change your website while your peer is testing it.

??? question "Hint"
    The live link is the address you opened in the last step. Copy it exactly, including the `https://` at the start.

??? tip "Hint - Click to expand"
    Your peer may not have done website testing before. Let them know that many test cases apply to every page, so they need to check all three pages, not only the home page.

## Fix Your Website

!!! abstract "Instructions"
    **Using VS Code**, fix each test case your peer marked as **Fail**, using their comments to find the problem. Upload each changed file to your repository and commit it, then wait for the new deployment to finish.

    When your fixes are live, download a new copy of the Peer Test Record template and retest your website yourself. Fill in your own name in **Tester Name** and the date in **Date Tested**, then run **every** test case on your live website and record **Pass** or **Fail**. Keep fixing until every test case passes.

    [Download Peer Test Record Template](../../assets/task-16-peer-test-record-template.xlsx){.md-button}

??? question "Hint"
    Start with the failures that affect several pages, such as a menu problem, because one fix may solve several test cases. If your change does not appear on the live site, check the **I made changes but the live site has not updated** item in the [Troubleshooting](../resources/deployment-github.md#troubleshooting) section of the Deploying to GitHub Pages guide.
