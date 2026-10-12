# npm Packages

npm (Node Package Manager) is the default package manager for Node.js. It is used to install, share, and manage libraries that add functionality to your Next.js project.

---

## What is a Package?

A **package** (sometimes called a library or dependency) is reusable code someone else has written and published to the [npm registry](https://www.npmjs.com). Instead of writing everything from scratch, you can install packages that handle common tasks.

| Task | Package Example |
|---|---|
| HTTP requests | `axios` |
| UI components | `@mantine/core` |
| Date formatting | `date-fns` |
| Form handling | `react-hook-form` |
| Unique IDs | `uuid` |

---

## `package.json`

Every Node.js project has a `package.json` file at its root. It is the project manifest — it records metadata about your project and, most importantly, which packages it depends on.

When you run `create-next-app`, a `package.json` like this is generated (your version numbers will differ):

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "eslint": "^9",
    "typescript": "^5"
  }
}
```

### Key Fields

| Field | Purpose |
|---|---|
| `name` | Project identifier (lowercase, hyphenated) |
| `scripts` | Shortcut commands runnable with `npm run <script>` |
| `dependencies` | Packages your app needs to run in production |
| `devDependencies` | Packages only needed for development (types, linters, build tools) |

### Version Numbers

The `^` (caret) before a version means "compatible with this major version":

```
"^19.2.0"  →  accepts 19.2.1, 19.3.0, 19.9.9, but NOT 20.0.0
```

Without a caret, the exact version is pinned:

```
"16.0.0"  →  exactly 16.0.0, nothing else
```

---

## `package-lock.json`

When you run `npm install`, npm also generates or updates a file called `package-lock.json`. This file records the **exact** version of every package and every sub-dependency that was installed.

### Why It Matters

`package.json` declares which packages you want (with version ranges). `package-lock.json` records exactly what was installed:

```
package.json:     "react": "^19.2.0"     ←  "I want React 19.x"
package-lock.json:  "react": "19.2.3"    ←  "19.2.3 was actually installed"
```

This ensures every developer on the team and every deployment server gets the **identical** set of packages. Without a lock file, running `npm install` at different times could fetch different minor versions, potentially introducing bugs.

### What It Contains

The lock file records:
- The exact version of every package installed
- The download URL for each package
- The dependency tree (which packages depend on which other packages)
- Integrity hashes to verify packages have not been tampered with

### Should You Commit It?

Yes. `package-lock.json` should be committed to git. It ensures reproducible installs across environments.

The one file you should **not** commit is `node_modules/` — it is large and can be rebuilt from the lock file with `npm install`.

---

## Installing Packages

Use the `npm install` command from your project folder:

```bash
npm install axios
```

This does three things:

1. Downloads the package into `node_modules/`
2. Adds it to `package.json` under `dependencies`
3. Updates `package-lock.json` with the exact version installed

To install a specific version:

```bash
npm install axios@1.7.0
```

---

## Development Dependencies

Some packages are only needed during development (linters, type definitions, test frameworks). Flag them with `--save-dev`:

```bash
npm install --save-dev typescript
```

They appear in a separate section of `package.json`:

```json
{
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

Development dependencies are not included in the production build.

---

## Importing and Using a Package

Once installed, import the package in your code:

```typescript
import axios from "axios";

async function fetchProducts() {
    const response = await axios.get("https://dummyjson.com/products");
    console.log(response.data);
}
```

If the package uses browser APIs (like WebSockets or DOM), add `"use client"` at the top of the file in Next.js. `axios` works on both the server and client, so no directive is needed in this case.

Some packages export named functions rather than defaults:

```typescript
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
```

Check the package's documentation to see which import style it uses.

---

## TypeScript Type Definitions

Many packages ship with TypeScript types built in. For packages that do not, you can install community-maintained types:

```bash
npm install --save-dev @types/node
```

The `@types/` scope contains type definitions for thousands of popular packages.

---

## Removing Packages

To uninstall a package you no longer need:

```bash
npm uninstall axios
```

This removes it from `node_modules/`, `package.json`, and `package-lock.json`.

---

## Summary

- npm manages third-party libraries for your project
- `npm install <package>` downloads and registers a dependency
- `dependencies` are required at runtime; `devDependencies` are only for development
- Import installed packages with `import <name> from "<package>"`
- Use `--save-dev` for build tools, linters, and type definitions
- `npm uninstall <package>` removes a dependency completely

---

## Activity

[Try it: React Confetti Activity](../../tasks/react-confetti.md){ .md-button }
