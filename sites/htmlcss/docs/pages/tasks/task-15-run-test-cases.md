# Task 15 - Running Test Cases

In this task you run the test cases in the test record against the **Green Thumb Gardening** website in two web browsers, then fix any failures.

## Download the Website and Test Record

!!! abstract "Instructions"
    **Using your web browser**, download and unzip the Green Thumb Gardening website, then open the `green-thumb-gardening` folder in VS Code.

    Download the test record template. It contains the test cases you will run.

    [Download Green Thumb Gardening](../../assets/task-15-green-thumb-gardening.zip){.md-button}

    [Download Test Record Template](../../assets/task-15-test-record-template.xlsx){.md-button}

??? question "Hint"
    Right-click the website zip file and choose **Extract All** before you open the folder. VS Code cannot open files that are still inside a zip file. The test record is a spreadsheet, so open it in Excel, Google Sheets or LibreOffice Calc.

## Read the Test Cases

!!! abstract "Instructions"
    **Using the Test Record sheet**, read every test case. Open `index.html` with **Live Preview** so you can see the website while you read.

??? question "Hint"
    Each test case says what to do and what should happen. If you are unsure what a test case means, find the page it refers to and try the steps yourself.

## Run the Test Cases in Browser 1

!!! abstract "Instructions"
    **Using your first web browser**, such as Google Chrome, type its name and version into the **Browser 1** heading, for example `Chrome 131`.

    Run **every** test case, in order. Record **Pass** or **Fail** in the **Browser 1** column, using the drop-down list. For every **Fail**, write a comment in the **Comments** column that says which page, what happened and what should have happened.

??? question "Hint"
    Drag `index.html` from your file explorer onto the browser window to open it. Keep the test record open next to the browser so you can enter each result straight away. To find your browser's version, check its settings or about page. In Chrome, type `chrome://version` into the address bar.

??? tip "Hint - Click to expand"
    Do not skip a test case because it looks obvious. Some faults are only visible when you follow the exact steps.

## Run the Test Cases in Browser 2

!!! abstract "Instructions"
    **Using a second web browser** with a different engine from Browser 1, type its name and version into the **Browser 2** heading, for example `Firefox 133`.

    Run **every** test case again, in the same order. Record **Pass** or **Fail** in the **Browser 2** column. For every **Fail**, write a comment in the **Comments** column.

??? question "Hint"
    Chrome and Edge both use the same engine, so if you used Chrome for Browser 1, choose Firefox for Browser 2. The [Multi-Browser Testing](../resources/multi-browser-testing.md#choosing-browsers) guide has a table of browsers and their engines. To find Firefox's version, type `about:support` into the address bar.

??? tip "Hint - Click to expand"
    Do not skip a test case because it passed in Browser 1. Browsers can behave differently, and that difference is what this step is checking for.

## Fix the Failures

!!! abstract "Instructions"
    **Using VS Code**, fix each failure you recorded in either browser. Then retest that test case in **both** browsers, not just the one where it failed.

    In the **Comments** column of each fixed test case, add a note that starts with `Fixed:`. Say what you changed and the date, for example `Fixed: changed the link so it points to services.html. 12/03/2026`.

??? question "Hint"
    Start with a fail that appears in both browsers, because it is most likely a fault in the code. A fail in only one browser may mean that browser handles the feature differently.

