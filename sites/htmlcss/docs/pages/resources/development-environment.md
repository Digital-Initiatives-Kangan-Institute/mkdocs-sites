# Development Environment

A **development environment** is the set of tools a web developer uses to write, preview and manage their code. This page covers text editors and IDEs, how to choose one, how to set up **Visual Studio Code**, and how to organise your website files.

---

## Text Editors and IDEs

HTML and CSS files are plain text, so you could write a website in any basic text editor such as **Notepad**. However, most developers use an **Integrated Development Environment (IDE)** or a code editor with IDE features.

An **IDE** brings all the tools you need to build software into one application, so you do not need to switch between separate programs.

| Basic Text Editor (e.g. Notepad) | IDE (e.g. Visual Studio Code) |
|---|---|
| Plain black text | Colour-coded code |
| No help while typing | Suggestions and auto-complete |
| Mistakes are hard to spot | Errors are underlined |
| One file at a time | Whole project folder visible |
| No extra tools | Extensions, terminal, version control, live preview |

***

## Main Features of an IDE

| Feature | What it does |
|---|---|
| **Syntax highlighting** | Colours different parts of the code (tags, attributes, values) so it is easier to read |
| **Code completion (IntelliSense)** | Suggests tags, attributes and properties as you type, and can close tags for you automatically |
| **Error detection** | Underlines mistakes such as a missing closing tag or an unknown CSS property |
| **File explorer** | Shows every file and folder in the project so you can open, create, rename and organise them |
| **Extensions** | Add-ons that add new features, such as live preview, formatters or FTP upload |
| **Live preview** | Shows the webpage and refreshes it automatically each time you save |
| **Integrated terminal** | A command line built into the editor |
| **Version control (Git) integration** | Tracks changes to files and connects to services such as GitHub |
| **Code formatting** | Tidies indentation and spacing so code is consistent |
| **Find and replace** | Searches for text across one file or the whole project |
| **Emmet shortcuts** | Expands short abbreviations into full HTML, for example typing `!` then `Tab` creates a full page template |

***

## Choosing an IDE

Common IDEs and code editors for web development include:

| IDE / Editor | Cost | Notes |
|---|---|---|
| **Visual Studio Code** | Free | Most popular web editor. Runs on Windows, macOS and Linux. Huge range of extensions. |
| **WebStorm** | Paid (free for students) | Full-featured web IDE by JetBrains with many tools built in |
| **Sublime Text** | Paid (free to evaluate) | Very fast, lightweight editor |
| **Notepad++** | Free | Lightweight editor for Windows with syntax highlighting |
| **Adobe Dreamweaver** | Paid subscription | Visual design view alongside code view |

The right IDE depends on the **requirements of the client and the job**. Things to consider include:

- **Cost**: does the client or organisation pay for licences?
- **Operating system**: does it run on the computers being used?
- **Features needed**: live preview, FTP upload, Git integration
- **Organisational standards**: does the team already use a particular tool?
- **Ease of use**: can the developer work efficiently with it?

In a workplace, you should **confirm your choice of IDE with your supervisor** (or the required personnel) before setting it up, so it fits the organisation's procedures.

***

## Setting Up Visual Studio Code

This site uses **Visual Studio Code (VS Code)** for exercises that are done outside the browser.

### Installing VS Code

1. Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Download the installer for your operating system
3. Run the installer and accept the default options

### Installing the Live Preview Extension

The **Live Preview** extension (made by Microsoft) shows your webpage inside VS Code and refreshes it each time you make a change.

1. Open VS Code
2. Click the **Extensions** icon in the Activity Bar on the left side of the window (or press `Ctrl + Shift + X`)
3. Type `Live Preview` into the search box
4. Select **Live Preview** published by **Microsoft**
5. Click the **Install** button
6. Open an HTML file, then click the **Show Preview** button in the top right corner of the editor (or right-click the file and choose **Show Preview**)

The preview opens in a panel next to your code. When you save or type, the preview updates.

!!! note "Extensions make the IDE yours"
    Changing settings and installing extensions is called **configuring** or **setting preferences** for your IDE. Other useful extensions for web development include **Prettier** (code formatter) and **SFTP** (uploads files to a web server over FTP or SFTP, see [Publishing a Website](publishing.md)).

### Opening a Project Folder

Always open the **whole website folder** in VS Code rather than single files:

1. Create a folder for your website, for example `my-website`
2. In VS Code, choose `File` then `Open Folder...`
3. Select your website folder

The **Explorer** panel on the left now shows every file in the project. Use the **New File** and **New Folder** buttons at the top of the Explorer to create files in the correct place.

***

## Organising Website Files

A website is a folder of files. Keeping those files organised is important because links and images use **file paths** to find each other. If a file is moved or renamed, anything pointing to it breaks.

A typical simple website **directory structure** looks like this:

```
my-website/
├── index.html        ← home page (must be named index.html)
├── about.html
├── contact.html
├── style.css         ← one stylesheet shared by every page
└── images/           ← all images kept together
    ├── logo.png
    └── team-photo.jpg
```

### File Naming Rules

| Rule | Good | Bad |
|---|---|---|
| Use lowercase letters | `about.html` | `About.HTML` |
| No spaces (use hyphens instead) | `our-team.html` | `our team.html` |
| Use the correct extension | `style.css`, `index.html` | `style.txt`, `index.htm.txt` |
| Use short, descriptive names | `contact.html` | `page4-final-v2.html` |
| Home page is always `index.html` | `index.html` | `home.html` |

Web servers are often **case sensitive**, so `Logo.png` and `logo.png` are treated as two different files. A link that works on your computer can break once published if the capital letters do not match.

### Saving Your Work

- Save often with `Ctrl + S`. VS Code shows a dot on the file tab when there are unsaved changes.
- Turn on **Auto Save** from the `File` menu if you prefer.
- Keep a backup of your project, for example in a **GitHub** repository or cloud storage.

---

## Summary

- An IDE combines tools such as syntax highlighting, code completion, error detection, a file explorer and extensions in one application
- Choose an IDE that meets the client and organisation's requirements, and confirm the choice with your supervisor
- VS Code with the **Live Preview** extension lets you see your page as you build it
- Keep website files in a clear directory structure, with images in their own folder
- Use lowercase file names with no spaces, and always name the home page `index.html`

### Activity - Development Environment

[Attempt Activity 1 - Development Environment](../tasks/task-1-development-environment.md){.md-button}
