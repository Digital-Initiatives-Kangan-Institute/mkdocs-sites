# Client and Server Components

In the Next.js App Router there are two kinds of components: **Server Components** and **Client Components**. Knowing which one to use matters because it determines what your component is allowed to do.

---

## Server Components (the Default)

Rendering on the server means the browser downloads less JavaScript, so pages load faster. Since static content does not need interactivity, keeping it on the server is both quicker and cheaper.

Every component you create is a **Server Component** unless you say otherwise. Server components run on the server:

- They render HTML that is sent to the browser
- They can fetch data directly from APIs or a database
- They **cannot** use hooks like `useState` or `useEffect`
- They **cannot** use event handlers like `onClick`
- They **cannot** use browser APIs like `window` or `localStorage`

```tsx
// app/page.tsx — a server component (no "use client" needed)
export default function HomePage() {
    return (
        <main>
            <h1>Welcome</h1>
            <p>This text is rendered on the server.</p>
        </main>
    );
}
```

This component works because it only returns static JSX.

---

## Client Components

A **Client Component** runs in the browser and can be interactive. Add the `"use client"` directive as the very first line of the file:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

Client components can use hooks, event handlers, and browser APIs.

---

## The "use client" Directive

`"use client"` must be the first line of the file, above all imports:

```tsx
"use client";

import { useState } from "react";
// rest of the component...
```

The rule is simple: if a component uses any of the following, it must be a client component.

| Feature | Example |
|---|---|
| State | `useState` |
| Side effects | `useEffect` |
| Route parameters | `useParams` |
| Event handlers | `onClick`, `onChange`, `onSubmit` |
| Browser APIs | `window`, `document`, `localStorage` |

If you forget `"use client"`, Next.js shows an error telling you the component needs to be a client component.

---

## Server vs Client Components

| | Server Component | Client Component |
|---|---|---|
| Where it runs | On the server | In the browser |
| Default? | Yes | No (needs `"use client"`) |
| Hooks (`useState`, `useEffect`) | No | Yes |
| Event handlers (`onClick`) | No | Yes |
| Browser APIs | No | Yes |
| Direct API/database access | Yes | No (fetch from the browser instead) |

---

## How to Decide

Start with a Server Component (the default). Only add `"use client"` when the component needs interactivity:

- Page just displays static content → **Server Component**
- Component has a button or form that responds to the user → **Client Component**
- Component fetches data on page load using `useEffect` → **Client Component**
- Component only receives data via props and displays it → **Server Component**

---

## Summary

- Server Components are the default and render on the server
- Client Components run in the browser and add `"use client"` at the top
- Hooks, event handlers, and browser APIs require a Client Component
- Start with a Server Component and opt in to client behaviour only when needed
