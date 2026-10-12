# Saving Data in the Browser

State disappears when you refresh the page. This resource covers `localStorage`, the browser's built-in storage, and the Next.js pattern for using it safely in a client component.

---

## What is localStorage?

`localStorage` is a small storage area that every browser gives each website. Anything you save there stays after a refresh, after closing the tab, and after restarting the computer, until the user clears their browser data.

| | `useState` | `localStorage` | A database (e.g. Supabase) |
|---|---|---|---|
| Survives a refresh | No | Yes | Yes |
| Shared between devices | No | No (one browser only) | Yes |
| Other users can see it | No | No | Yes, if allowed |
| Good for | What's on screen right now | Preferences, drafts, small personal lists | Real, shared data |

***

## The localStorage Methods

`localStorage` stores **strings** under a name (called a key):

```typescript
localStorage.setItem("theme", "dark");          // save
const theme = localStorage.getItem("theme");     // read: "dark", or null if it isn't there
localStorage.removeItem("theme");                // delete one
```

`getItem` returns `null` when nothing has been saved yet, so always have a fallback:

```typescript
const theme = localStorage.getItem("theme") ?? "light";
```

You can see everything a site has saved in DevTools (F12): **Application** tab → **Local storage** (Chrome/Edge), or **Storage** tab (Firefox).

***

## Saving Arrays and Objects

Because `localStorage` only stores strings, convert arrays and objects to JSON text on the way in, and back again on the way out:

```typescript
const todos = [{ id: 1, text: "Learn Next.js", done: false }];

// Save: object → JSON text
localStorage.setItem("todos", JSON.stringify(todos));

// Load: JSON text → object
const saved: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]");
```

`?? "[]"` gives `JSON.parse` an empty array to read when nothing has been saved yet.

***

## Why Next.js Needs Extra Care

Next.js prepares pages on the **server** before sending them to the browser, even pages marked `"use client"`. The server has no `localStorage` (and no `window`), so this crashes:

```tsx
// INCORRECT - runs on the server too, where localStorage doesn't exist
const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos") ?? "[]"));
```

You'll see `ReferenceError: localStorage is not defined`. Even if you check for the server, the server's page (empty list) and the browser's page (saved list) won't match, and React shows a **hydration** error.

***

## The Pattern: Browser-Only Components

The cleanest fix is to put the part of the page that uses `localStorage` in its own component, and tell Next.js to load that component **only in the browser** with `dynamic` and `ssr: false`.

### 1. The component that uses localStorage

```tsx
// app/todos/TodoList.tsx
"use client";

import { useEffect, useState } from "react";

type Todo = { id: number; text: string; done: boolean };

const TodoList = () => {
    // Read once, when the component first appears
    const [todos, setTodos] = useState<Todo[]>(() =>
        JSON.parse(localStorage.getItem("todos") ?? "[]")
    );

    // Save every time todos changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // ...the rest of the component
};

export default TodoList;
```

- `useState(() => …)` takes a **function** that works out the starting value. React only calls it once, on the first render, so `localStorage` isn't read again on every render.
- The effect has `[todos]` as its dependency array, so it saves after every change.
- The effect doesn't call any setters, so it doesn't trigger the "setState within an effect" lint error.

### 2. The page loads it browser-only

```tsx
// app/todos/page.tsx
"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("./TodoList"), {
    ssr: false,
    loading: () => <p>Loading your list…</p>,
});

const TodosPage = () => (
    <main>
        <h1>My todos</h1>
        <TodoList />
    </main>
);

export default TodosPage;
```

- `dynamic(() => import("./TodoList"), { ssr: false })` means "don't prepare this component on the server; load it in the browser"
- `loading` is shown for the moment before it arrives
- `ssr: false` only works inside a client component, so the page needs `"use client"`

***

## What Not to Store

`localStorage` can be read by any JavaScript running on your site and by anyone using that computer.

- Never store passwords, secret keys or private personal data
- Keep it small; browsers allow roughly 5 MB per site
- Treat it as a convenience: the user can clear it at any time, so your app must still work when it's empty

***

## Summary

- `localStorage` keeps data in one browser across refreshes, using `setItem`, `getItem` and `removeItem`
- It only stores strings: use `JSON.stringify` to save and `JSON.parse` to load
- `getItem` returns `null` when nothing is saved, so provide a fallback with `??`
- Next.js renders client components on the server first, where `localStorage` doesn't exist
- Put `localStorage` code in its own component and load it with `dynamic(..., { ssr: false })`
- Read with a `useState(() => …)` initialiser; save in a `useEffect` that depends on the data

### Activity - Saving to localStorage

[Attempt Activity - Saving to localStorage](../../tasks/local-storage.md){.md-button}
