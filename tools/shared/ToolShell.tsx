import type { ReactNode } from 'react'
import './tool-shell.css'

export interface ToolShellProps {
  /** Display name shown in the shell bar (e.g. "Code"). */
  title: string
  /** Where the back button points. Defaults to "/#tools" (the main portal's Tools tab). */
  portalHref?: string
  children: ReactNode
}

// Common shell around every tool: a slim bar with a back button to the
// main portal (Tools tab), with the tool UI filling the remaining viewport height.
//
// Usage (in tools/<name>/src/App.*):
//   import { ToolShell } from '../../shared/ToolShell'
//   return (
//     <ToolShell title="My Tool">
//       <div className="app">…</div>
//     </ToolShell>
//   )
//
// Rules:
// - The app root rendered inside the shell must fill its parent
//   (height: 100%), not the viewport (height: 100vh).
// - Embed/share modes (e.g. anigram's #viewer=) must NOT use this shell.
export function ToolShell({ title, portalHref = '/#tools', children }: ToolShellProps) {
  return (
    <div className="tool-shell">
      <header className="tool-shell__bar">
        <a className="tool-shell__back" href={portalHref}>
          <span className="tool-shell__back-arrow" aria-hidden="true">
            &#8592;
          </span>
          <span>Tools</span>
        </a>
        <span className="tool-shell__title">{title}</span>
      </header>
      <div className="tool-shell__body">{children}</div>
    </div>
  )
}
