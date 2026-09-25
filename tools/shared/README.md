# tools/shared — code shared by every tool

`ToolShell.tsx` + `tool-shell.css` render the common shell around each tool:
a slim dark bar with a **Tools** back button (→ the tools portal at `../`)
and the tool UI filling the remaining viewport height.

## Using it in a tool

```tsx
import { ToolShell } from '../../shared/ToolShell'

return (
  <ToolShell title="My Tool">
    {/* app root must fill its parent (height: 100%), not 100vh */}
  </ToolShell>
)
```

Rules:

- One shared shell only — never restyle the bar per tool and never create
  per-tool copies of these files.
- The app root inside the shell must use `height: 100%`, never `100vh`.
- Embed/share modes (e.g. anigram's `#viewer=`) must NOT use the shell.
- New tools that import from `../../shared` need
  `server: { fs: { allow: ['..'] } }` in their `vite.config.*` so the Vite
  dev server can serve the shared files (production builds are unaffected).
