# Fetching Data with State

This is a **guided, line-by-line build** of a component that fetches data when the user clicks a button. The second half adds loading and error states — the same fetch chain, made more complete.

!!! abstract "Instructions"
    Build the two guided components below. The first fetches on a button click; the second adds loading, success, and error states. Then connect to an endpoint you have **not used before** (e.g. `dummyjson.com/quotes`, `dummyjson.com/posts`, `dummyjson.com/todos`).

    Push your work to GitHub.

    Revisit [Fetching Data](../resources/nextjs/fetching-data.md) and [Handling Loading and Error States](../resources/nextjs/loading-error-states.md) while you work.

---

## Button Fetch

```tsx
"use client";

import { useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function PostFetcher() {
    const [post, setPost] = useState<Post | null>(null);

    function onJson(data: Post) {
        setPost(data);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function getPost() {
        fetch("https://dummyjson.com/posts/1")
            .then(onFetch)
            .catch(() => setPost(null));
    }

    return (
        <div>
            <button onClick={getPost}>Load a post</button>
            {post && <p>{post.title}</p>}
        </div>
    );
}
```

**What this file does in one sentence:** it fetches a post when the button is clicked and displays its title.

Line by line:

1. **`"use client";`** — needed because the component uses state and an event handler.
2. **`import { useState } from "react";`** — imports the `useState` hook.
3. **`interface Post { ... }`** — describes the shape of the data you expect (adjust the fields to match your chosen endpoint).
4. **`const [post, setPost] = useState<Post | null>(null);`** — state for the fetched data, starting empty (`null`).
5. **`function onJson(data: Post) { setPost(data); }`** — runs after parsing; stores the data in state, which re-renders the page.
6. **`function onFetch(response: Response) { response.json().then(onJson); }`** — parses the response, then passes the result to `onJson`.
7. **`function getPost() { ... }`** — the button's handler. It calls `fetch`, then `.then(onFetch)`, then `.catch(...)` to clear the data if the request fails.
8. **`<button onClick={getPost}>Load a post</button>`** — clicking triggers the fetch.
9. **`{post && <p>{post.title}</p>}`** — renders the title only when `post` is not `null`.

The chain is: **click → getPost → fetch → onFetch → response.json() → onJson → setPost → re-render**.

---

## Add Loading and Error States

A fetch takes time and can fail. Extend the component to handle **loading**, **success**, and **error**:

```tsx
"use client";

import { useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function PostFetcher() {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function onJson(data: Post) {
        setPost(data);
        setLoading(false);
    }

    function onFail() {
        setError("Could not load data. Please try again.");
        setLoading(false);
    }

    function onFetch(response: Response) {
        response.json().then(onJson).catch(onFail);
    }

    function getPost() {
        setLoading(true);
        setError(null);
        setPost(null);
        fetch("https://dummyjson.com/posts/1").then(onFetch).catch(onFail);
    }

    return (
        <div>
            <button onClick={getPost}>Load a post</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {post && <p>{post.title}</p>}
        </div>
    );
}
```

Line by line, focusing on the new parts:

1. **`const [loading, setLoading] = useState(false);`** — a flag for "a request is in progress".
2. **`const [error, setError] = useState<string | null>(null);`** — holds an error message, or `null` when there is none.
3. **`function onFail() { ... }`** — sets the error message and stops loading. Called from `.catch(...)`.
4. **`response.json().then(onJson).catch(onFail)`** — the `.catch` catches both a failed request and a failed parse.
5. **`setLoading(true); setError(null); setPost(null);`** — before each new fetch, reset the previous result and error and start loading.
6. **`{loading && <p>Loading...</p>}`** — shown only while loading.
7. **`{error && <p>{error}</p>}`** — shown only when there is an error.
8. **`{post && <p>{post.title}</p>}`** — shown only on success.

---

## Now You Try: A Different Endpoint

Repeat the same structure with a new endpoint. Pick one and adjust the interface and the display fields:

- `https://dummyjson.com/quotes` → `{ quotes: [...] }`, each has `quote` and `author`
- `https://dummyjson.com/todos` → `{ todos: [...] }`, each has `todo` and `completed`
- `https://dummyjson.com/posts` → `{ posts: [...] }`, each has `title` and `body`

Your version must handle loading, success, and error. Show evidence of all three states working.

??? hint "Hint - Click to expand"
    Only a few things change from the guided example: the URL, the interface fields, the field you display, and the shape of `onJson` (an array endpoint stores `data.quotes` or `data.posts`, so map over the results). Keep the loading/error logic identical.

---

## Full Flow

1. Visitor clicks the button.
2. `getPost` sets `loading` true and clears old results.
3. The page shows "Loading...".
4. `fetch` resolves → `onFetch` parses → `onJson` stores the data and sets `loading` false.
5. The page re-renders with the data.
6. If anything fails, `onFail` sets an error message and stops loading.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Button fetch** | A request triggered by the user, not the page loading |
| **`Response`** | The raw result from `fetch`, before JSON parsing |
| **`response.json()`** | Parses the response body into an object (returns a Promise) |
| **Loading state** | True while a request is in progress |
| **Error state** | Shown when a request fails |

---

## Summary

- Use `useState` to store fetched data, a loading flag, and an error message
- `.then(onJson).catch(onFail)` handles both success and failure
- Reset previous data and errors before each new fetch
- The same pattern works for any REST endpoint — change the URL and the fields
