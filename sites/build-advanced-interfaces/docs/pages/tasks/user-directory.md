# User Directory App

This is a **guided, line-by-line build**. You will make a **User Directory** webapp with Next.js: a visitor searches for users by name, clicks a result, and views that user's profile and posts.

| Route | Type | What it shows |
|---|---|---|
| `/` | Static | Home page |
| `/users` | Static | Search box and results |
| `/users/[id]` | Dynamic | One user's profile |
| `/users/[id]/posts` | Dynamic | That user's posts |

All data comes from the [DummyJSON Users API](https://dummyjson.com/docs/users).

!!! abstract "Instructions"
    Create a new Next.js app and work through the files below in order. Each file is shown in full first, then every meaningful line is explained — read the explanation before you type the code.

    When you finish, your app must:

    - Have at least **one static route** and at least **two dynamic routes**
    - Let a visitor **search for users** by name using `https://dummyjson.com/users/search?q=...`
    - Let a visitor **click a result** to view that user's profile at `/users/[id]`
    - Show that user's **posts** at `/users/[id]/posts`

    Push your work to GitHub.

    Revisit these while you build: [Routing](../resources/nextjs/routing.md), [Client and Server Components](../resources/nextjs/client-server-components.md), [Fetching Data](../resources/nextjs/fetching-data.md), and [useState and useEffect](../resources/nextjs/usestate-useeffect.md).

---

## The Plan

Next.js uses **file-based routing**: every folder inside `app/` that contains a `page.tsx` becomes a route. You will create these files:

```text
app/
├── layout.tsx              →  shared navigation on every page
├── page.tsx                →  /            (static route)
├── types.ts                →  TypeScript interfaces
└── users/
    ├── page.tsx            →  /users       (static route)
    └── [id]/
        ├── page.tsx        →  /users/1     (dynamic route)
        └── posts/
            └── page.tsx    →  /users/1/posts (dynamic route)
```

- `users/page.tsx` is **static** — its URL is always `/users`.
- `[id]` is **dynamic** — square brackets mean "any value", so `/users/1`, `/users/2`, and `/users/42` all use the same file.

Create the app now:

```bash
npx create-next-app@latest user-directory
```

Accept the default settings (including TypeScript), then change into the folder:

```bash
cd user-directory
```

---

## Shared Types

Create `app/types.ts`:

```ts
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    age: number;
    gender: string;
    phone: string;
    role: string;
    university: string;
    address: {
        city: string;
        state: string;
        country: string;
    };
    company: {
        name: string;
        title: string;
    };
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
}
```

**What this file does in one sentence:** it describes the shape of the user and post objects returned by the API, so TypeScript can catch mistakes before they reach the browser.

Line by line:

- **`export interface User { ... }`** — an *interface* is a contract describing an object's shape. `export` lets other files import it.
- **`id: number;`** — the unique number that identifies a user.
- **`firstName: string;`**, **`lastName: string;`**, **`email: string;`**, **`image: string;`** — text fields. `image` holds the URL of the user's avatar.
- **`age: number;`** — a number field.
- **`gender: string;`**, **`phone: string;`**, **`role: string;`**, **`university: string;`** — more text. `phone` is a string (not a number) because it contains symbols like `+` and `-`.
- **`address: { ... }`** — the API nests an address object inside each user, so the type is nested too.
- **`company: { ... }`** — same idea: a nested object holding the company name and the user's job title.
- **`export interface Post { ... }`** — describes a post. `userId: number` links a post back to its author, and `tags: string[]` is an array of strings.

---

## Shared Layout

Replace `app/layout.tsx` (Next.js already created it) with:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/users">Search Users</Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
```

**What this file does in one sentence:** it wraps every page in the app with a shared navigation bar.

Line by line:

- **`import Link from "next/link";`** — imports `<Link>` for navigating between pages without a full browser reload.
- **`import type { ReactNode } from "react";`** — imports the type used for the `children` prop.
- **`export default function RootLayout({ children }: { children: ReactNode })`** — defines the layout component. `children` is a special prop that represents whatever page is currently being shown.
- **`<html lang="en">`** and **`<body>`** — the required document shell every page needs.
- **`<nav>`** with two `<Link>`s — the navigation that appears on every page.
- **`<main>{children}</main>`** — renders the current page's content inside the `<main>` element.

This file has no hooks or event handlers, so it is a **server component** — no `"use client"` needed.

---

## Home Page (Static Route)

Replace `app/page.tsx` with:

```tsx
import Link from "next/link";

export default function HomePage() {
    return (
        <main>
            <h1>User Directory</h1>
            <p>Search for users and view their profiles.</p>
            <Link href="/users">Browse Users</Link>
        </main>
    );
}
```

**What this file does in one sentence:** it shows the landing page at `/` with a link to the search page.

Line by line:

- **`import Link from "next/link";`** — imports the `<Link>` component.
- **`export default function HomePage() { ... }`** — because this file is at `app/page.tsx`, it is the home route `/`.
- **`<Link href="/users">Browse Users</Link>`** — points at the search page you build next.

No hooks or events here either, so it is a server component.

---

## Search Page (Static Route)

Create `app/users/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { User } from "../types";

export default function UsersPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    function onJson(data: { users: User[] }) {
        setResults(data.users);
        setLoading(false);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function searchUsers() {
        setLoading(true);
        setSearched(true);
        fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`).then(onFetch);
    }

    return (
        <main>
            <h1>Search Users</h1>

            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a name, e.g. John"
            />
            <button onClick={searchUsers}>Search</button>

            {loading && <p>Searching...</p>}

            {searched && !loading && results.length === 0 && (
                <p>No users found.</p>
            )}

            <ul>
                {results.map(user => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
```

**What this file does in one sentence:** it searches the DummyJSON API for users matching the visitor's text and shows each result as a clickable link.

Line by line:

1. **`"use client";`** — a Next.js directive that must be the very first line. This file uses state and an event handler, which only work in the browser. The directive tells Next.js "run this in the browser, not on the server".

2. **`import Link from "next/link";`** — imports `<Link>` for linking each result to its profile.
3. **`import { useState } from "react";`** — imports the `useState` hook, which lets the component remember values between renders.
4. **`import type { User } from "../types";`** — imports the `User` interface from `app/types.ts` (one folder up). The `import type` keyword tells TypeScript this import exists only for types.
5. **`export default function UsersPage() { ... }`** — defines the component. Because it lives at `app/users/page.tsx`, it is the page shown at `/users`.
6. **`const [query, setQuery] = useState("");`** — creates state for the text in the search box. `useState` returns a pair: `query` is the current value (starts as an empty string) and `setQuery` is the function that updates it. Updating state re-renders the component.
7. **`const [results, setResults] = useState<User[]>([]);`** — state for the search results, typed as an array of `User`. It starts as an empty array.
8. **`const [loading, setLoading] = useState(false);`** — a flag meaning "a search is in progress", starts `false`.
9. **`const [searched, setSearched] = useState(false);`** — a flag meaning "the visitor has searched at least once", used to decide when to show "No users found".
10. **`function onJson(data: { users: User[] }) { ... }`** — runs once the response has been parsed. It copies `data.users` (the array of matches) into `results`, then sets `loading` to `false`.
11. **`function onFetch(response: Response) { response.json().then(onJson); }`** — runs when `fetch` gets a response. `response` is not the data yet; `response.json()` parses it (this takes time, so it returns a Promise), and `.then(onJson)` hands the parsed data to `onJson`.
12. **`function searchUsers() { ... }`** — the function the button calls:
    - `setLoading(true)` and `setSearched(true)` update state before the request starts.
    - `` fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`) `` builds the request URL with a template literal. `${encodeURIComponent(query)}` safely inserts the search text, turning spaces into `%20`.
    - `.then(onFetch)` starts the chain: **fetch → onFetch → onJson**.
13. **`return ( <main> ... </main> );`** — the JSX the component displays.
14. **`<input value={query} onChange={e => setQuery(e.target.value)} ... />`** — a *controlled* input. `value={query}` keeps the box in sync with state, and `onChange` updates `query` with whatever the visitor typed (`e.target.value`).
15. **`<button onClick={searchUsers}>Search</button>`** — clicking the button calls `searchUsers`.
16. **`{loading && <p>Searching...</p>}`** — a JSX conditional: the paragraph renders only while `loading` is `true`.
17. **`{searched && !loading && results.length === 0 && (<p>No users found.</p>)}`** — shows "No users found" only after a search has finished and returned nothing.
18. **`{results.map(user => ( ... ))}`** — `map` turns each user into one list item. `key={user.id}` gives React a unique identifier per item so it can update the list efficiently.
19. **`<Link href={`/users/${user.id}`}>{user.firstName} {user.lastName}</Link>`** — a link to the dynamic profile route. Clicking "Emily Johnson" navigates to `/users/1`.

---

## Profile Page (Dynamic Route)

Create `app/users/[id]/page.tsx`:

```tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "../../types";

export default function UserProfilePage() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    function onJson(data: User) {
        setUser(data);
        setLoading(false);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function onLoad() {
        if (!id) return;
        fetch(`https://dummyjson.com/users/${id}`).then(onFetch);
    }

    useEffect(onLoad, [id]);

    if (loading) return <p>Loading user...</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <main>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email}</p>
            <p>{user.age} years old, {user.gender}</p>
            <p>{user.company.title} at {user.company.name}</p>
            <p>{user.address.city}, {user.address.state}, {user.address.country}</p>
            <Link href={`/users/${user.id}/posts`}>View posts</Link>
        </main>
    );
}
```

**What this file does in one sentence:** it reads the `id` from the URL, fetches that one user from the API, and displays their profile.

Line by line:

1. **`"use client";`** — same directive as before: this component uses hooks, so it runs in the browser.
2. **`import { useParams } from "next/navigation";`** — imports the `useParams` hook for reading dynamic parts of the URL.
3. **`import { useEffect, useState } from "react";`** — imports two hooks: `useState` to store the user, and `useEffect` to run the fetch after the page appears.
4. **`import Link from "next/link";`** — for the link to this user's posts.
5. **`import type { User } from "../../types";`** — imports the `User` interface (two folders up from `app/users/[id]/`).
6. **`const { id } = useParams();`** — calls `useParams()` and uses *destructuring* to pull out `id`. For the URL `/users/42`, this makes `id` equal the string `"42"`.
7. **`const [user, setUser] = useState<User | null>(null);`** — state for the user. It starts `null` (no data yet) and will hold a `User` object after the fetch. `User | null` means "either a User or nothing".
8. **`const [loading, setLoading] = useState(true);`** — starts `true` because the data has not loaded yet.
9. **`function onJson(data: User) { ... }`** — runs after parsing; stores the user in state and sets `loading` to `false`.
10. **`function onFetch(response: Response) { response.json().then(onJson); }`** — the same middle step as the search page: parse the response, then call `onJson`.
11. **`function onLoad() { ... }`** — the function that starts the fetch:
    - `if (!id) return;` guards against `id` being missing.
    - `` fetch(`https://dummyjson.com/users/${id}`) `` requests the one user with this id, then `.then(onFetch)` continues the chain.
12. **`useEffect(onLoad, [id]);`** — runs `onLoad` after the page first renders. The dependency array `[id]` means "run again if `id` changes" (e.g. navigating directly from `/users/1` to `/users/2`).
13. **`if (loading) return <p>Loading user...</p>;`** — an *early return*: while loading, show a message instead of the profile.
14. **`if (!user) return <p>User not found.</p>;`** — a safety check in case the fetch returned nothing.
15. **`return ( <main> ... </main> );`** — the profile itself, once loaded.
16. **`<img src={user.image} alt={`${user.firstName} ${user.lastName}`} />`** — shows the avatar. `src` is the image URL; `alt` describes the image for screen readers. (Next.js may suggest its `Image` component — plain `<img>` is fine for this task.)
17. **`<p>{user.company.title} at {user.company.name}</p>`** and the address line — read nested fields using dot notation.
18. **`<Link href={`/users/${user.id}/posts`}>View posts</Link>`** — links to the second dynamic route.

---

## Posts Page (Dynamic Route)

Create `app/users/[id]/posts/page.tsx`:

```tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "../../../types";

export default function UserPostsPage() {
    const { id } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    function onJson(data: { posts: Post[] }) {
        setPosts(data.posts);
        setLoading(false);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function onLoad() {
        if (!id) return;
        fetch(`https://dummyjson.com/users/${id}/posts`).then(onFetch);
    }

    useEffect(onLoad, [id]);

    if (loading) return <p>Loading posts...</p>;

    return (
        <main>
            <h1>Posts</h1>
            {posts.map(post => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </article>
            ))}
        </main>
    );
}
```

**What this file does in one sentence:** it fetches the posts belonging to the user in the URL and lists them.

This uses the exact same fetch chain as the profile page — `useEffect(onLoad, [id])` → `onLoad` → `fetch` → `onFetch` → `response.json()` → `onJson`. The differences:

- **`import type { Post } from "../../../types";`** — three folders up from `app/users/[id]/posts/`.
- **`const [posts, setPosts] = useState<Post[]>([]);`** — state for an array of posts, starting empty.
- **`onJson(data: { posts: Post[] })`** — the endpoint `/users/{id}/posts` returns `{ posts: [...] }`, so it reads `data.posts`.
- **`{posts.map(post => ( <article key={post.id}> ... ))}`** — renders an `<article>` per post with its `title` and `body`.

---

## Run and Test

Start the dev server:

```bash
npm run dev
```

Then check each route in your browser:

- `/` — the Home page appears with working navigation
- `/users` — the search page appears
- Search for `John`, click a result, and confirm the profile opens at `/users/1` (or a similar id)
- Click `View posts` and confirm the posts appear at `/users/1/posts`

If a page does not appear, check the terminal for errors — a common cause is a wrong import path or a missing `"use client"`.

---

## Full Flow: From Search to Profile

1. The visitor opens `/users`.
2. Next.js renders `UsersPage` as a Client Component because of `"use client"`.
3. The visitor types `John` — each keystroke calls `onChange` and updates `query`.
4. The visitor clicks **Search** — `searchUsers` runs, sets `loading` and `searched`, and calls `fetch("https://dummyjson.com/users/search?q=John")`.
5. The server responds — `onFetch` receives the response, `response.json()` parses it, and `onJson` stores the results in `results`.
6. React re-renders, showing a `<Link>` for each match.
7. The visitor clicks **Emily Johnson** — `<Link href="/users/1">` navigates to the profile route.
8. `UserProfilePage` renders with `loading` true, so it shows "Loading user...".
9. `useEffect` calls `onLoad`, which fetches `https://dummyjson.com/users/1`.
10. `onJson` stores the user and sets `loading` to false; React re-renders the profile.
11. The visitor clicks **View posts** — the posts route runs the same chain against `/users/1/posts`.

---

## Common Beginner Pitfalls & Improvements

1. **Missing `"use client"`** — a page that uses `useState`, `useEffect`, or `onClick` without `"use client"` will fail. Add the directive as the very first line.

2. **`id` missing on the first render** — the guard `if (!id) return;` inside `onLoad` prevents a fetch with an undefined id.

3. **Infinite fetch loop** — forgetting the dependency array (`useEffect(onLoad)`) runs the effect after every render, which sets state, which triggers another render, and so on. Keep `[id]`.

4. **Wrong import paths** — the number of `../` depends on the folder depth:
    - `app/users/page.tsx` → `../types`
    - `app/users/[id]/page.tsx` → `../../types`
    - `app/users/[id]/posts/page.tsx` → `../../../types`

5. **`params.id` is a string** — even though it looks like a number, `"42"` from the URL is text. That is fine for building the fetch URL, but remember it if you ever do math with it.

6. **No error state** — the search page handles a failed fetch, but the profile and posts pages do not. A more complete version adds a `.catch()`:

    ```ts
    function onFail() {
        setLoading(false);
        setUser(null);
    }

    function onFetch(response: Response) {
        response.json().then(onJson).catch(onFail);
    }
    ```

7. **`<img>` warning** — Next.js prefers its `next/image` component. Plain `<img>` works for this task, but you can try `next/image` as a stretch goal.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Hook** | A function starting with `use` that adds React power (state, lifecycle) to a component |
| **State** | Memory that persists between renders; updating it re-renders the UI |
| **Client Component** | A component marked `"use client"` that runs in the browser and can use hooks and events |
| **Static route** | A fixed URL created by a folder with a `page.tsx` (e.g. `/users`) |
| **Dynamic route** | A URL pattern with square brackets (e.g. `[id]`) that matches many values |
| **`useParams`** | A hook that reads dynamic values from the URL |
| **`useEffect`** | A hook that runs code after the component appears |
| **Promise / `.then()`** | A placeholder for a future value, because fetching takes time |
| **JSX** | HTML-like syntax inside JavaScript; `{}` embeds JavaScript |
| **Interface** | A TypeScript description of an object's shape |

---

## Summary

- A **static route** is a folder with a `page.tsx` (like `app/users/page.tsx` → `/users`)
- A **dynamic route** uses square brackets (like `app/users/[id]/page.tsx` → `/users/1`)
- `useParams` reads the dynamic value from the URL and needs `"use client"`
- Search uses a button-triggered `fetch`; profiles and posts use `useEffect` to fetch on page load
- Fetching follows the chain: `fetch(...).then(onFetch)` → `response.json().then(onJson)` → update state

---

## Stretch Goals

Try these on your own once the core app works:

- Show the user's **todos** on a third dynamic route `/users/[id]/todos` using `https://dummyjson.com/users/{id}/todos`
- Add a **"Back to results"** link on the profile page
- Show post **likes and views** (the API returns a `reactions` object and a `views` number)
- Add a `.catch()` to the profile and posts pages for proper error handling
- Style the pages with your own CSS
