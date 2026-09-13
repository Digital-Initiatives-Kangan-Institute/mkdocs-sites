# useEffect and Automatic Fetch

This is a **guided, line-by-line build** of a component that loads data automatically when the page opens, using `useEffect`.

!!! abstract "Instructions"
    Build the guided component below, then answer a short written question. Your component must:

    - Fetch data automatically with `useEffect` and a dependency array
    - NOT run the fetch in an infinite loop
    - Display the fetched data on the page

    Then write one paragraph: when is a **button fetch** more useful, and when is a **page-load fetch** more useful?

    Push your work to GitHub.

    Revisit [useState and useEffect](../resources/nextjs/usestate-useeffect.md) while you work.

---

## Page-Load Fetch

```tsx
"use client";

import { useEffect, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    function onJson(data: { products: Product[] }) {
        setProducts(data.products);
        setLoading(false);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function onLoad() {
        fetch("https://dummyjson.com/products").then(onFetch);
    }

    useEffect(onLoad, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.title} — ${product.price}
                </li>
            ))}
        </ul>
    );
}
```

**What this file does in one sentence:** it fetches a product list once, as soon as the page appears, and displays it.

Line by line:

1. **`"use client";`** — needed because the component uses hooks.
2. **`import { useEffect, useState } from "react";`** — imports both hooks.
3. **`interface Product { ... }`** — describes the shape of each product.
4. **`const [products, setProducts] = useState<Product[]>([]);`** — state for the list, starting as an empty array.
5. **`const [loading, setLoading] = useState(true);`** — starts `true` because data has not loaded yet.
6. **`function onJson(data: { products: Product[] }) { ... }`** — stores `data.products` and stops loading.
7. **`function onFetch(response: Response) { response.json().then(onJson); }`** — parses the response.
8. **`function onLoad() { fetch("https://dummyjson.com/products").then(onFetch); }`** — the function that performs the fetch.
9. **`useEffect(onLoad, []);`** — the heart of the page. `useEffect` runs `onLoad` **after the page first renders**. The empty array `[]` means "run only once".
10. **`if (loading) return <p>Loading products...</p>;`** — an early return shown while loading.
11. **`{products.map(product => ( ... ))}`** — renders one `<li>` per product, using `product.id` as the `key`.

The chain is: **page renders → useEffect → onLoad → fetch → onFetch → response.json() → onJson → setProducts → re-render**.

---

## The Dependency Array

`useEffect` takes two arguments: `useEffect(functionToRun, dependencies)`.

| Dependency array | When the effect runs |
| :--- | :--- |
| `[]` | Once, when the component first appears |
| `[id]` | When the component first appears, and again whenever `id` changes |
| *(nothing)* | After **every** render — usually a bug |

---

## Why the Empty Array Prevents an Infinite Loop

Without the array, the effect runs after every render:

```tsx
// INCORRECT — infinite loop
useEffect(() => {
    fetch("...")
        .then(res => res.json())
        .then(data => setProducts(data));  // setProducts triggers a re-render,
});                                       // re-render triggers useEffect again...
```

Each `setProducts` re-renders the component, which runs the effect again, which fetches again — forever. The fix is the empty array:

```tsx
// CORRECT — runs once
useEffect(onLoad, []);
```

---

## Now You Try: Another Endpoint

Repeat the pattern with a different endpoint, such as:

- `https://dummyjson.com/users` → `{ users: [...] }`
- `https://dummyjson.com/quotes` → `{ quotes: [...] }`
- `https://dummyjson.com/recipes` → `{ recipes: [...] }`

Adjust the interface and the fields you display, and keep `useEffect(onLoad, [])`.

??? hint "Hint - Click to expand"
    Change the URL, the interface fields, and the `onJson` shape (`data.users`, `data.quotes`, etc.). Everything else — the `useEffect(onLoad, [])`, the loading flag, and the `map` — stays the same.

---

## Button Fetch vs Page-Load Fetch

| | Button fetch | Page-load fetch |
|---|---|---|
| Trigger | The user clicks | The page opens |
| Uses | `onClick` handler | `useEffect` with `[]` |
| Good for | Search, refresh, "load more" | Initial data every visitor needs |

Write one paragraph answering: when is each more useful? An example: *"A page-load fetch is best for data every visitor needs immediately, like a product list on the home page. A button fetch is best for data the user asks for on demand, like search results or a refresh button."*

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **`useEffect`** | A hook that runs code after the component renders |
| **Dependency array** | The second argument to `useEffect`; controls when it re-runs |
| **Mount** | The moment a component first appears |
| **Infinite loop** | A fetch that re-triggers itself by updating state every render |

---

## Summary

- `useEffect(onLoad, [])` runs the fetch once when the page opens
- An empty dependency array prevents infinite fetch loops
- Use page-load fetch for initial data, button fetch for on-demand data
- The fetch chain is identical either way; only the trigger changes
