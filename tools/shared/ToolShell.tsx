import type { ReactNode } from 'react'
import './tool-shell.css'

// True when the tool is rendering inside an <iframe>, <embed>, or <object>
// (e.g. embedded in an MkDocs site page). In that case the back button
// would navigate only the embed — never the top page — so it is hidden.
// A `?embed` (or `?embedded` / `?chrome=none`) query param forces the same
// behaviour for embed methods that don't create a nested browsing context.
function isEmbeddedContext(): boolean {
  try {
    if (typeof window !== 'undefined' && window.self !== window.top) return true
  } catch {
    // Accessing window.top throws cross-origin — that itself means embedded.
    return true
  }
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.has('embed') || params.has('embedded') || params.get('chrome') === 'none') return true
    }
  } catch {
    // ignore malformed query strings
  }
  return false
}

export interface ToolShellProps {
  /** Shown in the shell bar. Plain string (e.g. "Learn Terminal") or a
   *  custom element — brand lockup (`tool-shell__brand` + `tool-shell__logo`
   *  + `tool-shell__name`) or editable doc title (`tool-shell__title-input`). */
  title: ReactNode
  /** Where the back button points. Defaults to "/#tools" (the main portal's Tools tab). */
  portalHref?: string
  /** Force-hide the back button. Defaults to auto-detecting an embed
   *  context (iframe/embed/object or `?embed`), so embedded tools hide it
   *  without any per-tool changes. Pass `false` to always show it. */
  hideBackButton?: boolean
  /** Optional global actions rendered right-aligned in the shell bar
   *  (e.g. Share, Export, Help). Use the `tool-shell__btn` class for
   *  icon buttons that match the bar, or any custom elements. */
  actions?: ReactNode
  children: ReactNode
}

// Common shell around every tool: a slim bar with a back button to the
// main portal (Tools tab), with the tool UI filling the remaining viewport height.
//
// Usage (in tools/<name>/src/App.*):
//   import { ToolShell } from '../../shared/ToolShell'
//   return (
//     <ToolShell title="My Tool" actions={…}>
//       <div className="app">…</div>
//     </ToolShell>
//   )
// Custom title (brand lockup or editable doc title):
//   <ToolShell
//     title={
//       <span className="tool-shell__brand">
//         <img src="./favicon.png" alt="" className="tool-shell__logo" />
//         <span className="tool-shell__name">My Tool</span>
//       </span>
//     }
//   >
//
// Rules:
// - The app root rendered inside the shell must fill its parent
//   (height: 100%), not the viewport (height: 100vh).
// - Embed/share modes (e.g. anigram's #viewer=) must NOT use this shell.
// - Global toolbar buttons (Share, Export, Help, layout toggles) belong in
//   `actions` so every tool keeps them in the same spot; per-tool or
//   contextual controls stay inside the tool UI.
export function ToolShell({ title, portalHref = '/#tools', hideBackButton, actions, children }: ToolShellProps) {
  const hideBack = hideBackButton ?? isEmbeddedContext()
  return (
    <div className="tool-shell">
      <header className="tool-shell__bar">
        {hideBack ? null : (
        <a className="tool-shell__back" href={portalHref}>
          <span className="tool-shell__back-arrow" aria-hidden="true">
            &#8592;
          </span>
          <span>Tools</span>
        </a>
        )}
        <span className="tool-shell__title">{title}</span>
        {actions ? <div className="tool-shell__actions">{actions}</div> : null}
      </header>
      <div className="tool-shell__body">{children}</div>
    </div>
  )
}
