# Creating a Next.js App

This is a **guided, line-by-line build** of your first Next.js app. You will create the app, tour its structure, run the dev server, and edit the home page — then repeat the whole process two more times, because repetition is how the setup becomes automatic.

!!! abstract "Instructions"
    Create a new Next.js app, explore the generated files, run the dev server, and customise the home page. Then create **two more apps** from memory. Your apps must:

    - Be created with `npx create-next-app@latest`
    - Use TypeScript and the App Router
    - Run successfully with `npm run dev`
    - Have a customised home page in each app

    Push at least one app to GitHub.

    Revisit [Project Structure and TypeScript](../resources/nextjs/project-structure.md) while you work.

---

## Create Your First App

From a terminal, run:

```bash
npx create-next-app@latest my-first-app
```

Line by line:

- **`npx`** — runs a package without installing it permanently.
- **`create-next-app`** — the official Next.js scaffolding tool.
- **`@latest`** — use the most recent version.
- **`my-first-app`** — the project name. It becomes the folder name.

The tool then asks a series of setup questions:

| Prompt | Choose | Why |
| :--- | :--- | :--- |
| Use TypeScript? | **Yes** | Catches mistakes before they reach the browser |
| Use ESLint? | **Yes** | Lints your code for common problems |
| Use Tailwind CSS? | **No** for now | Covered separately in the [Tailwind CSS](tailwind.md) task |
| Use a `src/` directory? | **No** | Keeps `app/` at the project root |
| Use App Router? | **Yes** | The modern routing system |
| Customise import alias? | **Yes** (accept `@/*`) | Shortcut for imports |

The prompts may vary slightly between versions — accepting the defaults is fine as long as TypeScript and the App Router are enabled.

When it finishes, change into the new folder:

```bash
cd my-first-app
```

---

## Tour the Project Structure

The tool generates this structure:

```text
my-first-app/
├── app/
│   ├── layout.tsx      # shared layout that wraps every page
│   ├── page.tsx        # the home page (route: /)
│   └── globals.css     # global styles
├── public/             # static files (images, icons)
├── package.json        # project config and dependencies
└── tsconfig.json       # TypeScript config
```

Line by line:

- **`app/`** — the directory where pages and layouts live. Every folder here can become a route.
- **`layout.tsx`** — wraps all pages; holds the `<html>` and `<body>` shell.
- **`page.tsx`** — the home page, shown at `/`.
- **`globals.css`** — styles applied to the whole app.
- **`public/`** — files served as-is (images, favicons).
- **`package.json`** — lists dependencies and the `dev`, `build`, and `start` scripts.
- **`tsconfig.json`** — TypeScript compiler settings.

---

## Run the Dev Server

Start the development server:

```bash
npm run dev
```

Line by line:

- **`npm run dev`** — runs the `dev` script from `package.json`, which starts the Next.js dev server.
- The terminal prints a URL, usually `http://localhost:3000`.
- Open that URL in a browser to see the default welcome page.
- The server watches your files — save a change and the page refreshes automatically.
- Stop it at any time with `Ctrl + C`.

---

## Edit the Home Page

Open `app/page.tsx`. The generated page is long; replace it with:

```tsx
export default function HomePage() {
    return (
        <main>
            <h1>Welcome to my app</h1>
            <p>This is my first Next.js page.</p>
        </main>
    );
}
```

Line by line:

1. **`export default function HomePage() { ... }`** — defines the page component. `export default` is what Next.js renders.
2. **`return ( ... )`** — returns the JSX to display.
3. **`<h1>` and `<p>`** — the heading and paragraph.
4. Save the file and look at the browser — it updates automatically.

---

## Repeat It: Create a Second App

Create a **second** app entirely from memory, without scrolling back up:

- Name it `my-portfolio`
- Accept the same settings (TypeScript Yes, App Router Yes, Tailwind No, `src/` No)
- Run `npm run dev` and confirm it works
- Replace the home page with a heading and a paragraph about a portfolio

Write the command from memory first, then check the hint.

??? hint "Hint - Click to expand"
    The command is `npx create-next-app@latest my-portfolio`. Answer the prompts the same way you did the first time. Then `cd my-portfolio`, run `npm run dev`, and edit `app/page.tsx`.

---

## Repeat It Again: Create a Third App (A Different Way)

Create a **third** app, but this time make a different choice to see how it changes things:

- Name it `my-blog`
- This time choose **Yes** for "Use a `src/` directory?"

After it finishes, compare the two structures:

```text
No src/                          With src/
my-first-app/                    my-blog/
└── app/                         └── src/
    ├── page.tsx                     └── app/
    └── layout.tsx                      ├── page.tsx
                                        └── layout.tsx
```

Line by line:

- With **No**, `app/` sits at the project root.
- With **Yes**, `app/` moves inside a new `src/` folder.
- Everything else works the same — only the path to `app/` changes.

Run `npm run dev`, visit `http://localhost:3000`, and edit `src/app/page.tsx` to add a blog heading.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **`create-next-app`** | The tool that scaffolds a new Next.js project |
| **Dev server** | A local server started with `npm run dev` for development |
| **`app/`** | The directory where pages and layouts live |
| **`page.tsx`** | The file that makes a route |
| **`layout.tsx`** | The shared shell that wraps every page |

---

## Summary

- `npx create-next-app@latest <name>` creates a new app
- Accept TypeScript and the App Router; skip Tailwind for now
- `npm run dev` serves the app at `localhost:3000`
- `app/page.tsx` is the home page; edit it and the browser refreshes
- Repeating the setup three times (including once with `src/`) makes it stick
