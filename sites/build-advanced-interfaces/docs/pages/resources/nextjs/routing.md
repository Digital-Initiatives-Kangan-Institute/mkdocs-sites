# Routing

Routing in Next.js is based on the file system. The folders and files inside `app/` determine which pages exist and how URLs map to them.

---

## How File-Based Routing Works

Many frameworks make you declare routes in a separate config file. Next.js skips that: it derives routes straight from the folders and files, so creating a page is as simple as creating a file, and there is no route table to keep in sync.

Every folder inside `app/` that contains a `page.tsx` file becomes a route:

```
app/
├── page.tsx          →  /         (home page)
├── about/
│   └── page.tsx      →  /about
├── products/
│   └── page.tsx      →  /products
```

---

## Static Routes

A static route is a page with a fixed URL. Create a folder and add a `page.tsx`:

```
app/about/page.tsx
```

```tsx
export default function AboutPage() {
    return (
        <main>
            <h1>About Us</h1>
            <p>Learn about our cafe.</p>
        </main>
    );
}
```

This page is available at `/about`.

---

## Dynamic Routes

Dynamic routes use square brackets for the folder name. They match any value at that segment:

```
app/products/[id]/
    └── page.tsx      →  /products/1, /products/42, /products/abc
```

```tsx
interface Props {
    params: { id: string };
}

export default function ProductPage({ params }: Props) {
    return (
        <main>
            <h1>Product {params.id}</h1>
        </main>
    );
}
```

- The folder is named `[id]`
- `params.id` contains the value from the URL
- Visiting `/products/42` makes `params.id` equal `"42"`

---

## The useParams Hook

The `params` prop works in server components. If your page is a **client component** (it uses hooks or event handlers), read the route value with the `useParams` hook instead:

```tsx
"use client";

import { useParams } from "next/navigation";

export default function ProductPage() {
    const params = useParams();

    return (
        <main>
            <h1>Product {params.id}</h1>
        </main>
    );
}
```

- Import `useParams` from `next/navigation`
- Add `"use client"` at the top of the file
- `params.id` works the same way as the prop version

Use the `params` prop for simple server components, and `useParams` when the component is a client component.

---

## Creating a Multi-Page Site

Here is what a site with two static routes and one dynamic route looks like:

```
app/
├── layout.tsx
├── page.tsx              →  /
├── about/
│   └── page.tsx          →  /about
├── menu/
│   └── page.tsx          →  /menu
└── menu/[category]/
    └── page.tsx          →  /menu/drinks, /menu/food
```

---

## Linking Between Pages

Use the `<Link>` component instead of `<a>` tags for client-side navigation:

```tsx
import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/menu">Menu</Link>
        </nav>
    );
}
```

`<Link>` enables fast page transitions without a full browser reload.

---

## Summary

- Static routes: create a folder with a `page.tsx` file
- Dynamic routes: use `[param]` folder names, read them with the `params` prop (server) or `useParams` (client)
- Use `<Link>` for navigating between pages
- The file system determines the URL structure
