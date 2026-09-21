# AGENTS.md — Building MkDocs Sites

This file contains instructions for AI agents (Claude Code, Copilot, Codex, etc.) to build and modify sites in this repository.

---

## Project Overview

This is a collection of **MkDocs Material** sites deployed to **Cloudflare**. Each site lives in `sites/<slug>/`, gets built into `build/<slug>/`, and the portal at `build/index.html` links them all together via `build/sites.js`.

### Existing Sites

| Slug | Site Name | Palette | Course |
|---|---|---|---|
| `microbit` | microbit | purple | cert3-in-it |
| `htmlcss` | Build Simple Webpages | teal | cert3-in-it |
| `design` | Design Thinking | light blue | cert3-in-it |
| `python-edison` | Python Edison | deep orange | cert3-in-it |
| `nextjs` | NextJS | black | — |
| `test-site` | Test Site | green | — |
| `version-control` | Version Control | blue | cert3-in-it, diploma-of-it |
| `ai-tools` | AI-Assisted Development | cyan | diploma-of-it |
| `hardware-os` | Hardware & OS | red | cert3-in-it |
| `build-advanced-interfaces` | Build Advanced Interfaces | indigo | diploma-of-it |
| `program-iot-devices` | Program IoT Devices | purple | cert3-in-it |

---

## Creating a New Site

**When creating a new site, also update the following existing files:**
- `build/sites.js` — add the new site to the `sites` array under the correct course
- `AGENTS.md` — add the new site to the Existing Sites table and increment the count below

### 1. Choose a slug and palette

- The **slug** is the directory name under `sites/` and the URL path (e.g., `/my-site`). Use kebab-case.
- The **site name** is the display title in `mkdocs.yml` (`site_name`). Can have spaces and capitals.
- The **palette** is the Material theme primary colour. Available options:
  `red`, `pink`, `purple`, `deep purple`, `indigo`, `blue`, `light blue`, `cyan`, `teal`, `green`, `light green`, `lime`, `yellow`, `amber`, `orange`, `deep orange`, `brown`, `grey`, `blue grey`, `black`, `white`

Pick one not already in use by another site.

### 2. Create the directory structure

```
sites/<slug>/
├── mkdocs.yml
└── docs/
    ├── index.md           # Minimal: "Select a resource or task in the menu to begin."
    ├── extra/
    │   └── style.css      # Copy from any existing site, update the button colour
    └── pages/
        ├── resources/     # Reference/instructional content
        │   └── *.md
        └── tasks/         # Hands-on exercises
            └── *.md
```

### 3. Write mkdocs.yml

Copy the template from `base/mkdocs.yml` or any existing site. The key fields:

- `site_name`: Display name for the browser tab
- `nav`: Must start with `- Return to Portal: /`, then follow the pattern:

```yaml
nav:
  - Return to Portal: /
  - Menu:
    - Resources:
      - Page Title: pages/resources/filename.md
    - Tasks:
      - Task Title: pages/tasks/filename.md
```

- `theme.palette.primary`: Your chosen colour
- `plugins.enumerate-headings.restart_increment_after`: Set to the first task page path to reset heading numbering
- `extra_css: [extra/style.css]`
- The rest (features, markdown_extensions) should match existing sites exactly

### 4. Write style.css

Copy from any existing site's `docs/extra/style.css`. Update the button background-colour to match your palette — use the Material Design hex codes:

| Palette | Hex | Hover Hex |
|---|---|---|
| purple | `#7e56c2` | `#9d77df` |
| indigo | `#3f51b5` | `#5c6bc0` |
| teal | `#009688` | `#26a69a` |
| deep orange | `#ff7043` | `#ff8a65` |
| light blue | `#29b6f6` | `#4fc3f7` |
| black | `#212121` | `#424242` |
| green | `#43a047` | `#66bb6a` |
| red | `#e53935` | `#ef5350` |
| blue | `#1e88e5` | `#42a5f5` |

### 5. Register the site on the portal

Edit `build/sites.js` and add an entry to the `sites` array:

```json
{
  "href": "/<slug>",
  "img": "./_assets/<image-filename>",
  "title": "<Site Name>",
  "description": "<One-line description>",
  "courses": ["cert3-in-it"]   // or ["diploma-of-it"], or both
}
```

### 6. Preview locally

```bash
./serve.sh   # select your site from the menu
```

---

## Content Conventions

### Resource Pages

Resource pages teach concepts. Structure:

```markdown
# Page Title (H1 — matches nav label)

Introductory paragraph explaining what this resource covers.

---

## Section Heading (H2)

Content with explanations, syntax examples, and code blocks.

```html
<code example>
```

***

## Another Section

More content.

---

## Summary

Bullet points summarising key takeaways.
```

- Use `***` or `---` as horizontal dividers between major sections
- Code blocks: triple backticks with language (` ```html `, ` ```javascript `, ` ```bash `, ` ```css `, ` ```typescript `)
- Tables: standard markdown tables for comparisons or reference
- The `enumerate-headings` plugin auto-numbers all headings. Never put manual numbers in headings (e.g. use `## Syntax Rules` not `## 1. Syntax Rules`). Rely on the plugin for numbering.

### Task Pages

Task pages contain hands-on exercises. Structure:

```markdown
# Task Title (H1)

## Exercise Name (H2)

!!! abstract "Instructions"
    What the student needs to do. Can be one or more paragraphs.

??? code "click to expand"
    ```language
    starter code here
    ```

??? hint "Hint - Click to expand"
    Guidance for students who are stuck.

??? tip "Hint - Click to expand"
    Alternative hint style.
```

### Admonition Types Used

| Syntax | Purpose |
|---|---|
| `!!! note` | Informational callout (bare or with `"Title"`) |
| `!!! abstract "Instructions"` | Task brief in exercise pages |
| `??? code "click to expand"` | Collapsible starter code |
| `??? hint "Hint - Click to expand"` | Collapsible hint |
| `??? tip "Hint - Click to expand"` | Collapsible tip |
| `??? question "Hint"` | Alternative hint style |

### Page Invariants

- Every non-empty page starts with a `#` H1 heading matching its nav label
- Never use `- [ ]` checklist syntax — it does not render in this version of markdown. Use plain `-` bulleted lists instead.
- `index.md` in the root of `docs/` is NOT listed in `nav` — it's the landing page shown when the site first loads. Keep it minimal.

### Task Page Rules

Tasks are exercises for students to solve. Do not give away the answer:

- **Starter code** (`??? code "click to expand"`) should provide structure only — skeletons, HTML shells, or placeholder `// TODO` comments. Never provide a fully working implementation that the student can copy-paste.
- **Hints** (`??? hint`, `??? tip`, `??? question`) should use descriptive text and guiding questions. Mention property names, method names, or technique names — but never provide complete working code blocks.
- If the task asks the student to "write a function that...", the starter code should show the function signature and perhaps a comment, not the function body.
- CSS hints are particularly prone to giving away answers — describe what properties to use (e.g. "use `display: flex` with `justify-content: center`") rather than showing a complete CSS rule.

---

## Build System

### Important: Do Not Build Locally

The `build/` directory contains **only portal files** (`index.html`, `sites.js`, `_assets/`). Do **not** run mkdocs build targeting `build/` — the individual sites are built automatically on the Cloudflare Worker at deploy time. Never create site subdirectories under `build/`.

### Build and Verify (for AI Agents)

When an AI agent needs to verify a site builds correctly, build into a temporary folder, verify, then delete it:

```bash
# Build into a tmp folder
./.venv/bin/mkdocs build \
  --config-file sites/<slug>/mkdocs.yml \
  --site-dir "$(pwd)/tmp/<slug>-test-build" 2>&1

# Verify the pages exist
find tmp/<slug>-test-build/pages -type f -name index.html | sort

# Clean up
rm -rf tmp/<slug>-test-build
```

Never leave temporary build artifacts in the project directory.

### Scripts

| Script | Purpose |
|---|---|
| `./setup.sh` | Creates `.venv` and installs dependencies |
| `./create.sh` | Interactive wizard for new sites (uses `base/` template) |
| `./serve.sh` | Serves one site locally with livereload (for previewing content during authoring) |
| `./build.sh` | Builds ALL sites into `build/` (run on the Cloudflare Worker, not locally)

### Portal Pattern

The portal (`build/index.html`) loads `build/sites.js` and renders cards for each site. Filtering is done via URL hash (`#cert3-in-it` or `#diploma-of-it`). Each site card links to its `href` (e.g., `/htmlcss`), which resolves to the subdirectory under `build/`.
