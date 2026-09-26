# Getting Started Guide

This guide walks you through setting up your local environment and building
sites in this repository. It covers the Python environment, the `create` and
`serve` scripts, how to author Markdown content (including MkDocs-specific
syntax), and the branching + pull request workflow.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Clone the Repository](#1-clone-the-repository)
- [2. Set Up the Python Environment](#2-set-up-the-python-environment)
- [3. Branching Strategy (`feature` → `dev` → `master`)](#3-branching-strategy-feature--dev--master)
- [4. Create a New Site (`create.sh`)](#4-create-a-new-site-createsh)
- [5. Preview a Site (`serve.sh`)](#5-preview-a-site-servesh)
- [6. Authoring Content](#6-authoring-content)
- [7. Markdown Guide](#7-markdown-guide)
  - [Basic Markdown Syntax](#basic-markdown-syntax)
  - [MkDocs Material Syntax](#mkdocs-material-syntax)
- [8. Committing & Opening Pull Requests](#8-committing--opening-pull-requests)

---

## Prerequisites

Before you start, make sure you have the following installed:

- **Git** — used to clone the repository and manage branches.
- **Python 3** — used to create the virtual environment that runs MkDocs.
- **Bash** — the `setup.sh`, `create.sh`, and `serve.sh` scripts are bash
  scripts. On Windows, use **Git Bash** or **WSL**.

You can verify your tools with:

```bash
git --version
python3 --version
```

---

## 1. Clone the Repository

Approved contributors work **directly** on the shared repository — forking is
not required. Clone the upstream repository:

```bash
git clone https://github.com/Digital-Initiatives-Kangan-Institute/mkdocs-sites.git
cd mkdocs-sites
```

You will land on the default branch (`master`). Do not work directly on
`master` — see [Branching Strategy](#3-branching-strategy-feature--dev--master)
below.

> **Do I need to fork?** No. If you have been added as a collaborator you have
> write access and should clone and branch directly on
> `Digital-Initiatives-Kangan-Institute/mkdocs-sites`. Forking is only needed
> for outside contributors without write access — it is not used in the normal
> workflow for this project.

---

## 2. Set Up the Python Environment

The repository ships a `setup.sh` script that does all the work for you.

```bash
./setup.sh
```

### What `setup.sh` does

1. Checks that `python3` is installed.
2. Creates a virtual environment in a `.venv/` directory (if it doesn't already
   exist).
3. Upgrades `pip` inside the virtual environment.
4. Installs the project dependencies:

| Package | Purpose |
|---|---|
| `mkdocs` | The static site generator |
| `mkdocs-material` | The Material theme used by every site |
| `mkdocs-enumerate-headings-plugin` | Auto-numbers headings across pages |
| `pymdown-extensions` | Extended Markdown features (superfences, details, highlight, etc.) |
| `pygments` | Syntax highlighting for code blocks |

> **Note:** `.venv/` is git-ignored — it is created locally and never committed.
> You only need to run `./setup.sh` once per clone. Re-run it if dependencies
> change or if your `.venv` is deleted.

### Using the scripts

The `create.sh` and `serve.sh` scripts handle the virtual environment for you —
they call the environment's tools directly (e.g. `.venv/bin/mkdocs`), so you
never need to activate it or run `mkdocs` commands yourself.

---

## 3. Branching Strategy (`feature` → `dev` → `master`)

This repository uses a simple three-branch model. Never commit directly to
`master` — all changes flow through branches and pull requests.


| Branch | Purpose | Rules |
|---|---|---|
| `master` | The production branch — stable, deployable code. | Never work on it directly. Changes only arrive via a reviewed pull request from `dev`. |
| `dev` | The integration branch where features come together. | Day-to-day integration branch. Test everything here before it goes to `master`. |
| `feature/<name>` | Short-lived branches for one specific piece of work. | Created from `dev`, merged back into `dev` via a reviewed pull request, then deleted. |

### The workflow

1. Check out `dev` and pull the latest changes.
2. Create a feature branch from `dev` (e.g. `feature/add-resources-page`).
3. Make your changes, committing often.
4. Push the feature branch to GitHub.
5. Open a **pull request** from `feature/...` → `dev`.
6. A repository maintainer **reviews and approves** the pull request before it
   is merged.
7. Once merged, delete the feature branch.
8. When `dev` is tested and stable, open a pull request from `dev` → `master`.
9. A repository maintainer **reviews and approves** this release pull request
   before it is merged into `master`.

> **Important:** You must open a pull request and wait for review and approval
> before merging **both** transitions — `feature` → `dev` and `dev` → `master`.
> The repository maintainers will review and approve the merge.

See [Committing & Opening Pull Requests](#8-committing--opening-pull-requests)
for the exact git commands.

---

## 4. Create a New Site (`create.sh`)

The `create.sh` script is an interactive wizard that scaffolds a new site from
the `base/` template.

```bash
./create.sh
```

### What the wizard asks for

1. **Site name** — the display title (spaces and capitals are fine, e.g.
   `Build Simple Webpages`). The script converts this into a kebab-case folder
   name (e.g. `build-simple-webpages`).
2. **Colour palette** — choose one of the Material theme primary colours from
   the numbered menu.

### What it generates

The script creates `sites/<slug>/` with the following structure:

```
sites/<slug>/
├── mkdocs.yml
└── docs/
    ├── index.md
    └── extra/
        └── style.css
```

### After running `create.sh`

The wizard scaffolds the site but there are a couple of manual steps to fully
wire it up:

1. **Register the site on the portal** — add an entry to the `sites` array in
   `build/portal.js` under the correct course (`cert3-in-it` and/or
   `diploma-of-it`).
2. **Update `AGENTS.md`** — add the new site to the "Existing Sites" table.
3. **Match the button colour** — `style.css` is copied from the template with a
   default (purple) button colour. Update the `.md-sidebar__inner ... .md-nav__link`
   background colour in `sites/<slug>/docs/extra/style.css` to match your chosen
   palette (see the palette hex table in `AGENTS.md`).

---

## 5. Preview a Site (`serve.sh`)

`serve.sh` starts a local development server with live reload so you can preview
your content as you write it.

```bash
./serve.sh
```

The script will:

1. List every site found in `sites/`.
2. Ask you to pick one by number.
3. Ask for a port (press **Enter** to accept the default `8000`).
4. Start MkDocs at `http://127.0.0.1:<port>` with live reload enabled.

Any change you make to the site's Markdown or config is reflected in the
browser automatically. Press `Ctrl+C` to stop the server.

---

## 6. Authoring Content

Each site is organised as:

```
sites/<slug>/docs/
├── index.md              # Landing page (not listed in nav)
└── pages/
    ├── resources/        # Reference / instructional content
    └── tasks/            # Hands-on exercises
```

### Adding a new page

1. Create a Markdown file under `sites/<slug>/docs/pages/...`
   (e.g. `pages/resources/intro-to-html.md`).
2. Open `sites/<slug>/mkdocs.yml` and add the page to the `nav` section:

   ```yaml
   nav:
     - Return to Portal: /
     - Menu:
       - Resources:
         - Intro to HTML: pages/resources/intro-to-html.md
       - Tasks:
         - Task 1 - Elements: pages/tasks/task-1-elements.md
   ```

   - `Return to Portal: /` must always be the first nav item.
   - The page's `#` H1 heading should match its nav label.

---

## 7. Markdown Guide

All site content is written in Markdown, enhanced by MkDocs Material and the
Pymdown extensions. The basics follow standard Markdown; the sections below
cover both.

### Basic Markdown Syntax

This section covers the core Markdown syntax (from the
[Markdown Guide](https://www.markdownguide.org/basic-syntax/)).

#### Headings

```md
# Heading level 1
## Heading level 2
### Heading level 3
```

Use `#` to `######` for levels 1–6. Always start a page with a single `#` H1.

> **Note:** The `enumerate-headings` plugin auto-numbers every heading. Do not
> add manual numbers to headings (write `## Syntax Rules`, not `## 1. Syntax
> Rules`).

#### Paragraphs & Line Breaks

Separate paragraphs with a blank line. To add a line break without starting a
new paragraph, end the line with two or more spaces.

```md
This is the first paragraph.

This is the second paragraph.
```

#### Emphasis

```md
**bold**          → **bold**
*italic*          → *italic*
***bold italic*** → ***bold italic***
```

#### Blockquotes

```md
> This is a blockquote.
> It can span multiple lines.
```

#### Lists

```md
- Unordered item one
- Unordered item two
  - Nested item (indent with two spaces)

1. Ordered item one
2. Ordered item two
3. Ordered item three
```

> **Note:** The `- [ ]` / `- [x]` task-list syntax does **not** render in this
> repository's MkDocs setup. Use plain `-` bulleted lists instead.

#### Code

Inline code uses single backticks:

```md
Use the `./serve.sh` script.
```

Fenced code blocks use triple backticks with a language hint:

````md
```html
<h1>Welcome!</h1>
<p>This is a paragraph.</p>
```
````

#### Horizontal Rules

Use `---` or `***` on their own line to insert a divider between sections.

#### Links

```md
[Link text](https://example.com)

[Link with a title](https://example.com "A title shown on hover")

[Relative link to another page](../tasks/task-1-elements.md)
```

#### Images

```md
![Alt text](./assets/image.png)
```

#### Escaping Characters

Prefix special characters with a backslash to display them literally:

```md
\* not italic \*
```

#### HTML

MkDocs pages support inline HTML, so you can drop in tags when Markdown is not
enough (e.g. `<embed>`, `<video>`, `<kbd>`).

#### Tables

```md
| Element | Purpose |
|---|---|
| `<h1>` | Main heading |
| `<p>` | Paragraph |
| `<a>` | Link |
```

You can align columns with colons in the separator row: `:---` (left),
`:---:` (centre), `---:` (right).

---

### MkDocs Material Syntax

On top of standard Markdown, this repository enables several Material/Pymdown
features. The enabled extensions are declared in each site's `mkdocs.yml`
(`admonition`, `pymdownx.details`, `pymdownx.superfences`, `pymdownx.highlight`,
`attr_list`, `md_in_html`, `pymdownx.blocks.caption`).

#### Admonitions (Callouts)

Admonitions add emphasis to a piece of information. Use `!!!` for a static
callout and `???` for a collapsible one.

```md
!!! note
    This is an informational callout.

!!! note "Custom title"
    A callout with a custom title.

??? note
    This is a collapsible callout — click to expand.
```

Common types used in this repository:

| Syntax | Purpose |
|---|---|
| `!!! note` | Informational callout |
| `!!! abstract "Instructions"` | Task brief in exercise pages |
| `??? code "click to expand"` | Collapsible starter code |
| `??? hint "Hint - Click to expand"` | Collapsible hint |
| `??? tip "Hint - Click to expand"` | Collapsible tip |
| `??? question "Hint"` | Alternative hint style |
| `!!! warning` | A caution / warning callout |
| `!!! tip` | A tip or suggestion |

The content inside an admonition must be indented by four spaces.

#### Code Blocks (Enhanced)

Fenced code blocks support syntax highlighting, line numbers, and titles via
`pymdownx.superfences` and `pymdownx.highlight`:

````md
```html title="Example HTML" linenums="1"
<h1>Welcome!</h1>
<p>This is a paragraph.</p>
```
````

Supported languages include `html`, `css`, `javascript`, `typescript`, `bash`,
`python`, `json`, and `yaml`.

#### Attribute Lists & Buttons

The `attr_list` extension lets you attach attributes/classes to elements using
`{...}`:

```md
[Attempt the task](../tasks/task-1-elements.md){.md-button}
```

The `{.md-button}` class renders a link as a Material-styled button.

#### Captions

`pymdownx.blocks.caption` adds a figure-style caption to the block immediately
above it (a code block, image, or table). Place the caption block **after** the
content it describes:

````md
```python
print("hello")
```

/// caption
A caption for the code block above.
///
````

```md
![The Double Diamond Phases](../assets/double-diamond-phases.jpeg)
/// caption
Image c/o [Artkai](https://artkai.io/) (2025)
///
```

#### Auto-Numbered Headings

The `enumerate-headings` plugin numbers all headings automatically and
increments across pages. Because of this:

- **Do not** put manual numbers in headings.
- To reset numbering at a specific page (typically the first task page), use the
  `restart_increment_after` option in `mkdocs.yml`:

  ```yaml
  plugins:
    - enumerate-headings:
        increment_across_pages: true
        restart_increment_after:
          - pages/tasks/task-1-elements.md
  ```

#### Page Conventions

- **Resource pages** teach concepts — use an H1 title, introductory paragraph,
  then H2 sections separated by `---`/`***` dividers, and finish with a
  `## Summary` of bullet points.
- **Task pages** contain hands-on exercises — use `!!! abstract "Instructions"`
  for the brief, `??? code "click to expand"` for starter code, and
  `??? hint` / `??? tip` / `??? question` for hints. Starter code should provide
  structure only (skeletons and `// TODO` comments), never a complete working
  solution.

---

## 8. Committing & Opening Pull Requests

> All merges into `dev` and `master` must go through a pull request that is
> **reviewed and approved** by a repository maintainer.

### Starting a feature

```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-new-page
```

### Committing your work

```bash
git add .
git commit -m "Add intro to HTML resource page"
git push -u origin feature/my-new-page
```

### Opening the pull request (feature → dev)

1. Go to the repository on GitHub.
2. Open a **pull request** with base = `dev` and compare = `feature/my-new-page`.
3. Add a clear title and a short description of the change.
4. Request review — a maintainer will review and approve before the merge.
5. After the merge, delete the feature branch:

   ```bash
   git checkout dev
   git pull origin dev
   git branch -d feature/my-new-page
   ```

### Releasing to production (dev → master)

When `dev` has been tested and is stable:

1. Open a pull request with base = `master` and compare = `dev`.
2. Summarise what is being released in the description.
3. A maintainer reviews and approves the release PR.
4. Merge the pull request into `master`.

> A GitHub Actions workflow enforces that only `dev` can merge into `master`.