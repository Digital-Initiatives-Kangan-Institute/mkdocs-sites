# Handling Loading and Error States

A good user interface communicates what is happening. When fetching data, you should handle three states: loading, success, and error.

Fetching with hooks requires a **client component** — add `"use client"` at the top of the file.

---

## The Three States

Every data-fetching component should handle:

- **Loading** — the data is being fetched (show a spinner or message)
- **Success** — the data arrived (display it)
- **Error** — something went wrong (show an error message)

---

## Tracking State

Use separate state variables to track each case:

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

- `loading` starts as `true` because data has not loaded yet
- `error` starts as `null` because there is no error yet

---

## A Complete Fetch Component

```tsx
"use client";

import { useState, useEffect } from "react";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then(res => {
                if (!res.ok) throw new Error("Network response failed");
                return res.json();
            })
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {products.map(p => <li key={p.id}>{p.title}</li>)}
        </ul>
    );
}
```

---

## Empty States

What if the fetch succeeds but returns no data?

```tsx
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
if (products.length === 0) return <p>No products found.</p>;

return (
    <ul>
        {products.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
);
```

---

## Better Loading Indicators

Instead of plain text, use visual indicators:

```tsx
if (loading) {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
        </div>
    );
}
```

---

## Clearer Data Formatting

Display data in a readable format:

```tsx
{products.map(product => (
    <div key={product.id} className="card">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
    </div>
))}
```

---

## Error Handling with Console

During development, log errors to the browser console for debugging:

```typescript
.catch(err => {
    console.error("Fetch error:", err);
    setError("Could not load products. Please try again.");
    setLoading(false);
});
```

Open the browser console (F12) to see detailed error messages.

---

## Summary

- Every fetch component should handle loading, success, and error states
- Track loading and error with separate state variables
- Always set `loading` to `false` in both success and error paths
- Handle empty results (no data returned) as a separate case
- Use the browser console to debug fetch errors
