# AGENTS.md

## Cache Busting

All local file references use a `?v=N` query string for Cloudflare cache busting.
Files that must include the version query:

- `styles.css?v=N` in `index.html`
- `bg.png?v=N` in `styles.css`
- `app.js?v=N` in `index.html`
- `lib/utils.js?v=N` in `index.html`
- `lib/vfs.js?v=N` in `index.html`
- `lib/commands.js?v=N` in `index.html`

**Rule:** After every change to any of these files, ask the user if they want the cache version bumped. If yes, increment all `?v=N` values by 1 across all references (must match in `index.html` and `styles.css`).

## Git

**Rule:** Never perform git operations (commit, push, pull, branch, checkout, etc.). The user manages git themselves.
