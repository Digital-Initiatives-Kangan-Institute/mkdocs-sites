# Task 1 - Development Environment

## Install VS Code

!!! abstract "Instructions"
    **Using your web browser**, download and install **Visual Studio Code** from `https://code.visualstudio.com/`.

    Once it is installed, open VS Code and find each of these areas of the window:

    - the **Activity Bar** (the column of icons on the far left)
    - the **Explorer** panel
    - the **Extensions** view
    - the **editor** area where code is written

??? question "Hint"
    Hover over each icon in the Activity Bar to see its name. The Explorer is the top icon, which looks like two pieces of paper.

## Install the Live Preview Extension

!!! abstract "Instructions"
    **Using VS Code**, install the **Live Preview** extension published by **Microsoft**.

    As you go, write down each step you take, as a numbered list, in your own words. Someone who has never used VS Code should be able to follow your steps.

??? question "Hint"
    Extensions are installed from the **Extensions** view in the Activity Bar. Check the publisher name under the extension title. Several extensions have similar names, and you want the one by Microsoft.

## Create a Project Folder

!!! abstract "Instructions"
    **Using VS Code**, create a website project with the following directory structure:

    ```
    my-website/
    ├── index.html
    ├── about.html
    ├── style.css
    └── images/
    ```

    Create the `my-website` folder first, open it in VS Code with `File` then `Open Folder...`, then create everything else using the buttons at the top of the **Explorer** panel.

??? question "Hint"
    The Explorer panel has a **New File** and a **New Folder** button that appear when you hover over the project name. Check that every file name is lowercase with the correct extension. VS Code shows a different icon for `.html` and `.css` files, which is a quick way to spot a mistake.

## Preview Your First Page

!!! abstract "Instructions"
    **Using VS Code**, open `index.html` from your project folder and:

    - use the **Emmet** shortcut to create the full page structure
    - add a heading and a sentence inside the `body`
    - open the page with **Live Preview**
    - change the sentence, save, and watch the preview update

??? question "Hint"
    In an empty `.html` file, typing an exclamation mark and pressing `Tab` creates the page structure. The **Show Preview** button is in the top right corner of the editor when an HTML file is open.

## Set Your Preferences

!!! abstract "Instructions"
    **Using VS Code**, configure these preferences:

    - turn on **Auto Save**
    - change the **colour theme** to one you find easy to read
    - change the editor **font size**
    - turn on **Format On Save**

    Then open `about.html` and use Live Preview again to confirm everything still works.

??? question "Hint"
    Auto Save is in the `File` menu. The other settings are in `File` then `Preferences` then `Settings` (or the cog icon in the bottom left). Use the search box at the top of the Settings page to find each one by name.

## Identify IDE Features

!!! abstract "Instructions"
    **Using VS Code**, find an example of each IDE feature below while working in your `index.html` file. For each one, write a sentence describing what it does and how it helps a web developer.

    - syntax highlighting
    - code completion (IntelliSense)
    - automatic closing tags
    - error detection
    - file explorer
    - extensions
    - integrated terminal

??? question "Hint"
    Try typing the start of a tag, such as a less-than sign followed by `h`, and watch what appears. The integrated terminal is opened from the `Terminal` menu. The [Development Environment](../resources/development-environment.md) resource describes each feature.

## Choose an IDE

!!! abstract "Instructions"
    **Using the Development Environment resource**, read each client scenario below and choose the most suitable IDE or editor. Write a sentence for each explaining **why** it suits that client's requirements.

    - A small charity with no budget for software, using Windows laptops, wants volunteers to update simple HTML pages and see the changes as they work.
    - A web design agency that already pays for JetBrains software for its developers wants an IDE with as many web tools built in as possible.
    - A school's computers run Windows and Linux. The teacher wants students to use the same free editor at school and at home, with a live preview.

??? question "Hint"
    For each scenario, underline the requirements first: cost, operating system, features, and what the organisation already uses. Then compare those requirements against the table of IDEs in the resource.
