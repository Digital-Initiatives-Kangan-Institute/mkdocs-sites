# AGENTS.md

## Stack

React + TypeScript + Vite. `npm run build` type-checks and emits to `../../build/tools/learn-terminal` (see `vite.config.ts`). `npm run dev` for local work.

- `src/lib/` — pure, framework-free code (VFS, tokenizer, command implementations, formatting). Covered by `./test.sh`.
- `src/engine/` — the shell engine (`terminal.ts`), challenges, help text, persistence, dialog store. No React.
- `src/components/` — React UI. Components subscribe to the engine via `useSyncExternalStore` (`src/hooks.ts`).

Terminal output lines are HTML strings built by the engine; every interpolated value must go through `esc()`. They are persisted in localStorage as-is, so keep the class names and markup stable.

## Persistence

localStorage keys (`linux-vfs`, `linux-challenges`, `linux-cmdHistory-<user>`, `linux-termHistory-<user>`) and the workspace export format (`version: 1`) are shared with the original vanilla build. Don't rename them without a migration — students have existing workspaces.

## Tests

`./test.sh` (or `npm test`) runs the suites in `tests/` with `tsx`. Run `npm install` first.

## Cache Busting

Vite fingerprints built assets (`assets/index-<hash>.js`, etc.), so no manual `?v=N` versioning is needed.

## Git

**Rule:** Never perform git operations (commit, push, pull, branch, checkout, etc.). The user manages git themselves.
