# Next.js App with Routing

This is a **guided, line-by-line build** of a multi-page Next.js app. You will practise one idea many times — *a folder plus a `page.tsx` file equals a route* — because repetition is how the pattern sticks.

!!! abstract "Instructions"
    Create a new Next.js app and build the routes below in order. Each route is shown in full first, then explained line by line. After the first example, you will **repeat the same pattern yourself**.

    When you finish, your app must have:

    - At least **three static routes** (Home, About, Contact, and one more)
    - At least **two dynamic routes** (Products and Blog, and one more)
    - A **shared layout** with navigation links to every page

    Push your work to GitHub.

    Revisit [Routing](../resources/nextjs/routing.md) and [Client and Server Components](../resources/nextjs/client-server-components.md) while you work.

---

## Create the App

```bash
npx create-next-app@latest my-routing-app
```

Accept the default settings (including TypeScript), then change into the folder:

```bash
cd my-routing-app
```

---

## The Idea: Folders Become Routes

Next.js uses **file-based routing**. Every folder inside `app/` that contains a `page.tsx` file becomes a route:

```text
app/
├── page.tsx          →  /         (home)
├── about/
│   └── page.tsx      →  /about
└── products/
    └── [id]/
        └── page.tsx  →  /products/1, /products/2, /products/42
```

- A **static route** has a fixed URL: `/about` never changes.
- A **dynamic route** uses square brackets: `[id]` matches *any* value.

---

## Static Route: Home

Replace `app/page.tsx` with:

```tsx
// app/page.tsx
export default function HomePage() {
    return (
        <main>
            <h1>Welcome</h1>
            <p>This is the home page.</p>
        </main>
    );
}
```

**What this file does in one sentence:** it creates the home page at `/`.

Line by line:

1. **`// app/page.tsx`** — a comment showing where this file lives. It is not part of the real code.
2. **`export default function HomePage() { ... }`** — defines the page component. `export default` is the main thing Next.js looks for and renders.
3. **`return ( ... )`** — returns the JSX that appears on screen.
4. **`<main>`, `<h1>`, `<p>`** — ordinary HTML elements wrapped in JSX.
5. Because this file sits directly inside `app/`, its route is `/`.

---

## Repeat It: About

Create `app/about/page.tsx` with the **exact same structure**, different content:

```tsx
// app/about/page.tsx
export default function AboutPage() {
    return (
        <main>
            <h1>About</h1>
            <p>Learn more about this site.</p>
        </main>
    );
}
```

Notice what stayed the same: a folder inside `app/`, a `page.tsx` file, and `export default function ...` returning some JSX. Only the folder name and the text changed.

---

## Repeat It Again: Contact and Services

Now create two more static routes **yourself** — no code shown this time. Repeat the same pattern a third and fourth time:

- `app/contact/page.tsx` → route `/contact`
- `app/services/page.tsx` → route `/services`

Each page needs an `<h1>` and a `<p>`. Write them without scrolling back up first — this is the repetition that makes it stick.

??? hint "Hint - Click to expand"
    Make the folder, then inside it create `page.tsx`, then `export default function ...` returning an `<h1>` and `<p>`. The function name can be anything (e.g. `ContactPage`, `ServicesPage`) but the file **must** be called `page.tsx`.

---

## A Shared Layout

Replace `app/layout.tsx` (Next.js already created it) with:

```tsx
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/services">Services</Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
```

**What this file does in one sentence:** it wraps every page with a navigation bar that appears on all routes.

Line by line:

1. **`import Link from "next/link";`** — imports the `<Link>` component for navigating between pages without a full browser reload.
2. **`export default function RootLayout({ children }: { children: React.ReactNode })`** — the layout component. `children` is a special prop that represents the current page.
3. **`<html lang="en">`** and **`<body>`** — the required document shell.
4. **`<nav>` with `<Link>`s** — navigation that appears on every page. Each `href` matches a route folder.
5. **`<main>{children}</main>`** — renders the current page's content inside `<main>`.

This file has no hooks or events, so it is a **server component** — no `"use client"` needed.

---

## Dynamic Route: Products

Create `app/products/[id]/page.tsx`:

```tsx
// app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
    return (
        <main>
            <h1>Product {params.id}</h1>
            <p>You are viewing product {params.id}.</p>
        </main>
    );
}
```

**What this file does in one sentence:** it creates a route that matches any product id, like `/products/1` or `/products/42`.

Line by line:

1. **The folder name `[id]`** — square brackets tell Next.js this segment is dynamic: it matches any value.
2. **`export default function ProductPage({ params }: { params: { id: string } })`** — the component receives a `params` prop. `params.id` holds the value from the URL.
3. **`<h1>Product {params.id}</h1>`** — `{params.id}` embeds the URL value into the JSX. Visiting `/products/42` shows "Product 42".
4. `params.id` is a **string** (e.g. `"42"`), not a number.

---

## Repeat It: Blog

Create a second dynamic route with the **same pattern**, using `[slug]`:

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return (
        <main>
            <h1>{params.slug}</h1>
            <p>This is a blog post.</p>
        </main>
    );
}
```

Same idea, different folder name and value: `/blog/first-post` puts `"first-post"` into `params.slug`.

---

## Repeat It Again: Posts

Create a third dynamic route **yourself**:

- `app/posts/[id]/page.tsx` → matches `/posts/1`, `/posts/2`, and so on
- Display the id from the URL in the page

Write it from memory — this is the same folder-plus-brackets pattern a third time.

??? hint "Hint - Click to expand"
    The folder is `[id]` inside `app/posts/`. The component takes `{ params }: { params: { id: string } }` and renders `{params.id}` somewhere in its JSX.

---

## Link It All Together

Update the layout's `<nav>` so every route is reachable. Add links to your dynamic routes too — point them at a specific value:

```tsx
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/products/1">Product 1</Link>
                    <Link href="/blog/first-post">First post</Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
```

Line by line:

1. Each `<Link href="...">` points at a route.
2. For dynamic routes you supply a concrete value, e.g. `/products/1` instead of `/products/[id]`.
3. Use `<Link>` for navigation between your own pages — it is faster than a plain `<a>` because it does not reload the whole page.

---

## Run and Test

Start the dev server:

```bash
npm run dev
```

Then visit each URL and confirm a page appears:

- `/`, `/about`, `/contact`, `/services`
- `/products/1`, `/products/99`
- `/blog/first-post`, `/blog/anything-here`
- `/posts/7`

Typing a different value into a dynamic route should show that value on the page.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Route** | A URL that maps to a page |
| **Static route** | A fixed URL from a plain folder (e.g. `/about`) |
| **Dynamic route** | A URL pattern with square brackets (e.g. `/products/[id]`) |
| **`params`** | The prop that holds values from a dynamic URL |
| **`page.tsx`** | The file that turns a folder into a route |
| **`layout.tsx`** | The file that wraps every page with shared UI |
| **`<Link>`** | Next.js component for navigating between pages |

---

## Summary

- A folder plus a `page.tsx` equals a route
- Plain folder names are static routes; `[square brackets]` are dynamic routes
- Dynamic values arrive in the `params` prop
- `layout.tsx` provides navigation shared by all pages
- Repetition builds the habit: create folders, add `page.tsx`, export a component

---

## Stretch Goals

- Use `useParams` instead of the `params` prop (see [User Directory App](user-directory.md)) — remember it needs `"use client"`
- Add a nested dynamic route like `app/products/[id]/reviews/page.tsx`
- Style the pages with your own CSS
