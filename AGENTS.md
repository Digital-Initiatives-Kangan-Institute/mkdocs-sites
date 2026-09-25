# AGENTS.md — Building MkDocs Sites

This file contains instructions for AI agents (Claude Code, Copilot, Codex, etc.) to build and modify sites in this repository.

---

## Project Overview

This is a collection of **MkDocs Material** sites deployed to **Cloudflare**. Each site lives in `sites/<slug>/`, gets built into `build/<slug>/`, and the portal at `build/index.html` links them all together via `build/sites.js`.

All sites share a single stylesheet at `shared/style.css` (wired up via `theme.custom_dir: ../../shared` in each `mkdocs.yml`). Any site style / stylesheet modifications must be done in this file and this file only — never create per-site `style.css` files.

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
- Do not touch `theme.custom_dir`, `extra_css`, or `watch` — these already point at the shared stylesheet (`../../shared/style.css`). Styling is palette-aware, so setting `primary` is enough to theme buttons/nav per site.
- The rest (features, markdown_extensions) should match existing sites exactly

### 4. Shared stylesheet (do not create per-site CSS)

All sites use the single shared stylesheet at `shared/style.css` (loaded via `theme.custom_dir: ../../shared` + `extra_css: [style.css]`). It is palette-aware (uses `var(--md-primary-fg-color)` etc.), so per-site button/nav colours come from `theme.palette.primary` automatically — no per-site CSS needed.

- Do NOT create `sites/<slug>/docs/extra/style.css` or add new `extra_css` entries.
- Any site style / stylesheet modifications must be done in `shared/style.css` and in this file only, so the change applies consistently to every site.
- If you need a new palette's hex values, use the Material Design hex codes:

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

---

## Tools

Static web tools (e.g. the CodePad editor) live in `tools/<id>/` as source and are built to `build/tools/<id>/` via `./build-tools.sh` (see `tools/code/vite.config.js` for the `outDir` pattern). **React + Vite is the preferred stack for new tools** — scaffold with `npm create vite@latest`, then set `base: './'` and `build.outDir` to `../../build/tools/<id>` so the tool builds straight into its deploy folder. Tools with no build step (a folder without a `build` script in `package.json`) are copied as-is by the same script. Build tools must use relative asset paths (`base: './'`) and relative fetching (e.g. `import.meta.env.BASE_URL`) so they work when served from `/tools/<id>/`. They are listed on the tools portal at `build/tools/index.html`, which reads its cards from `build/tools/tools.js`. The main portal links to it via a "Tools" pill in the header of `build/index.html`. Never create a site called `tools` — `create.sh` blocks that reserved name.

### Common shell (`tools/shared/`)

Every React tool is wrapped in the common shell — a slim dark bar with a **Tools** back button (→ the tools portal) above the tool UI. The shell lives in `tools/shared/` (`ToolShell.tsx` + `tool-shell.css`, see `tools/shared/README.md`) and is imported by each app as:

```tsx
import { ToolShell } from '../../shared/ToolShell'

return (
  <ToolShell title="My Tool">
    {/* app root must fill its parent (height: 100%), not 100vh */}
  </ToolShell>
)
```

**Rules — strict:**

1. One shared shell only — never restyle the bar per tool and never create per-tool copies of these files. All selectors in `tool-shell.css` stay scoped under `.tool-shell`. The bar uses `z-index: 1100` so it stays visible above full-viewport overlays (login/boot screens, modal backdrops) — never lower it.
2. The app root inside the shell must use `height: 100%`, never `100vh` (the shell already owns the viewport height).
3. Embed/share modes (e.g. anigram's `#viewer=`) must NOT use the shell.
4. `tools/shared/` is not a tool — `./build-tools.sh` skips it, so never add a `package.json` with a `build` script there.
5. New tools that import from `../../shared` must copy the wiring from an existing tool: `server.fs.allow: ['..']` plus a `resolve.alias` mapping `react` to the tool's own `node_modules/react` in `vite.config.*` (Vite cannot resolve `react`/`react/jsx-runtime` from outside the app root), and a matching `paths` entry for `react`, `react/jsx-runtime`, and `react/jsx-dev-runtime` in `tsconfig.app.json` (only for `tsc -b` builds — plain `vite build` tools don't need it).

### Tool Thumbnails

Create a thumbnail in `build/tools/thumbs/` and reference it from the tool's entry in `build/tools/tools.js` (`"img": "./thumbs/<id>.svg"`). Thumbnails are committed (see the `!build/tools/thumbs` exception in `.gitignore`); built tool output under `build/tools/<id>/` stays ignored.

**Location:** `build/tools/thumbs/<id>.svg` (or `.webp`/`.png` if you must, but SVG is preferred).

**Rules — strict:**

1. **Size:** `640 × 400` (`viewBox="0 0 640 400"`, `rx="18"` on outer rect). Card displays at `aspect-ratio: 16/10`.
2. **No text:** Never use `<text>` elements. No labels, no titles, no "drop here" copy. Use **blocks only** — `rect`, `circle`, `line` to suggest UI.
3. **Rich but abstract:** a thumbnail must read as a miniature of the real tool, not a logo. Target roughly 15–25 shapes composed of 2–4 signature UI zones (e.g. CodePad → tabbed editor + code lines + console strip beside a live-preview page; Learn Terminal → terminal window + files window + taskbar; Anigram → shape toolbar + node flow + inspector panel). A single centered widget on an empty card is not enough.
4. **Compose zone by zone:** (a) pick the tool's 2–4 most recognisable regions (main surface, side panel/toolbar, status/output strip); (b) fill the content area edge to edge (`x=44` to `x=596`, `y=80` to `y=320`) — no lopsided empty margins; (c) give every panel a header row (tabs, titlebar dots, pill) so each zone reads as real UI; (d) end each zone with a grounding strip (console, taskbar, status bar) rather than floating content.
5. **Layer and finish:** use one subtle gradient per surface (top sheen, panel fade, desktop backdrop), `1px` borders on every panel (`stroke` slightly lighter than the fill), and `clipPath`s so inner strips never spill past rounded corners. Add exactly one focal accent per card — a selection glow (translucent outer stroke), a cursor block, or a highlighted node — plus small status dots/badges to break up rows of bars. Vary row widths and use `opacity: 0.55–0.85` on secondary rows for depth.
6. **Dark theme only (outer chrome):** Outer frame and card shell stay dark (`#0e0e11`, `#131316`, `#141418`, `#1e1e24`, borders `#232328` / `#2a2a32`, accent `#ff3d00` sparingly). Interior blocks may deviate to match the tool's real light/dark palette — see rule 9.
7. **Chrome:** Include the fake window chrome (top bar `36px` high, 3 dots `6px` radius, colors `#ff5f57`/`#febc2e`/`#28c840` at `x=56,76,96 y=46`), inner card `x=28 y=28 width=584 height=344 rx=16`.
8. **No em dashes, no real screenshots.** Keep it abstract so all cards feel cohesive.
9. **Match the tool's real color scheme:** Before drawing, extract the palette from the tool's source in `tools/<id>/` — e.g. `grep -o "#[0-9a-fA-F]\{3,8\}" tools/<id>/src/*` and check `:root` vars, `background`, `color`, `border`, and accent colors. Use those real colors for interior blocks so the card feels like the tool. Keep outer chrome dark (`#0e0e11` / `#131316` + `#232328` stroke).
10. **Verify:** After creating, run `grep -n "<text" build/tools/thumbs/*.svg` (must return nothing), parse each file as XML, and confirm content spans the full card (`x=44–596`, `y=80–320`) with nothing overflowing the inner card except the chrome itself.

Example skeleton:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400" role="img">
  <defs>
    <clipPath id="<id>-panel"><rect x="44" y="80" width="..." height="240" rx="10"/></clipPath>
    <linearGradient id="<id>-sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.06"/><stop offset="0.25" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="640" height="400" rx="18" fill="#0e0e11"/>
  <rect x="1" y="1" width="638" height="398" rx="17" fill="none" stroke="#232328" stroke-width="1.5"/>
  <rect x="28" y="28" width="584" height="344" rx="16" fill="#131316" stroke="#232328"/>
  <!-- chrome dots + divider line -->
  <!-- zone 1: main surface (header row, content rows, grounding strip, all clipped) -->
  <!-- zone 2: side panel / toolbar -->
  <!-- focal accent: selection glow, cursor, or highlighted node -->
</svg>
```
