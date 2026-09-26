# tools/shared — code shared by every tool

`ToolShell.tsx` + `tool-shell.css` render the common shell around each tool:
a slim dark bar with a **Tools** back button (→ the tools portal at `../`)
and the tool UI filling the remaining viewport height.

## Using it in a tool

```tsx
import { ToolShell } from '../../shared/ToolShell'

return (
  <ToolShell
    title="My Tool"
    actions={
      <>
        <button className="tool-shell__btn" onClick={handleShare} title="Share">Share</button>
        <button className="tool-shell__btn" onClick={handleHelp} title="Help">?</button>
      </>
    }
  >
    {/* app root must fill its parent (height: 100%), not 100vh */}
  </ToolShell>
)
```

- `title` is a plain string for simple tools, or a custom element for
  tools migrating their header into the shell. Use the `tool-shell__brand`
  lockup (`tool-shell__logo` + `tool-shell__name`) for logo + app name,
  or `tool-shell__title-input` (inside a `data-value` sizer) for an
  editable document title like CodePad's project name.
- `actions` is for global toolbar buttons (Share, Export, Help, layout
  toggles, menus) that should sit right-aligned in the shell bar on every
  tool. Use the `tool-shell__btn` class for buttons that match the bar
  (it supports `aria-expanded` for menu triggers). Menu dropdown panels
  keep their own app styling — only the triggers need the shell class.
  Per-tool or contextual controls stay inside the tool UI — e.g.
  learn-terminal's desktop has no toolbar to migrate.

Rules:

- One shared shell only — never restyle the bar per tool and never create
  per-tool copies of these files.
- The app root inside the shell must use `height: 100%`, never `100vh`.
- Embed/share modes (e.g. anigram's `#viewer=`) must NOT use the shell.
- New tools that import from `../../shared` need
  `server: { fs: { allow: ['..'] } }` in their `vite.config.*` so the Vite
  dev server can serve the shared files (production builds are unaffected).
