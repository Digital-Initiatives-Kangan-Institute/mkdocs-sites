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
const [products, setProducts] = useState<Product[]>([]);
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

interface Product {
    id: number;
    title: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
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

## Four States, Three Ways

With the empty state included, a data component has **four** states. Only one shows at a time:

| State | Show |
| --- | --- |
| loading | `Loading…` |
| error | the error in red |
| empty (`products.length === 0`) | a friendly "nothing here" message |
| data | the list |

There are three common ways to write this. They all give the same result.

### A. Nested ternary in the JSX

```tsx
return (
    <main>
        {loading ? (
            <p>Loading…</p>
        ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
        ) : products.length === 0 ? (
            <p>No products found.</p>
        ) : (
            <ul>
                {products.map((p) => <li key={p.id}>{p.title}</li>)}
            </ul>
        )}
    </main>
);
```

This keeps the surrounding page (headings, links) visible in every state.

### B. An arrow helper function with if statements

```tsx
const renderContent = () => {
    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;
    return (
        <ul>
            {products.map((p) => <li key={p.id}>{p.title}</li>)}
        </ul>
    );
};

return (
    <main>
        <h1>Products</h1>
        {renderContent()}
    </main>
);
```

### C. Early returns in a separate component

Move the display logic into its own component that receives the state as props:

```tsx
// app/products/ProductList.tsx
const ProductList = ({ loading, error, products }: {
    loading: boolean;
    error: string | null;
    products: Product[];
}) => {
    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;
    return (
        <ul>
            {products.map((p) => <li key={p.id}>{p.title}</li>)}
        </ul>
    );
};

export default ProductList;
```

```tsx
// in the page
<ProductList loading={loading} error={error} products={products} />
```

A file that isn't called `page.tsx` doesn't get its own URL, so `ProductList.tsx` can live next to the page that uses it.

### Fragments

Each branch of a ternary can only return **one** element. To show a heading and a list together, wrap them in a fragment `<> </>`:

```tsx
{loading ? (
    <p>Loading…</p>
) : (
    <>
        <h2>{products.length} products</h2>
        <ul>{/* ... */}</ul>
    </>
)}
```

---

## Not Found

A detail page that loads **one** item has a fourth state of its own: the request worked but the item doesn't exist. Store the item as `useState<Product | null>(null)` and check for `null`:

```tsx
{loading ? (
    <p>Loading…</p>
) : error ? (
    <p style={{ color: "red" }}>{error}</p>
) : product === null ? (
    <p>Sorry, we couldn&apos;t find that product.</p>
) : (
    <h1>{product.title}</h1>
)}
```

!!! note "Apostrophes in JSX text"
    Typing `couldn't` straight into JSX text gives a lint error, because ESLint worries the `'` is a typo. Write `&apos;` instead, as shown above. Apostrophes inside a `"string"` in `{ }` are fine.

---

## Testing Your States

Each state should be tested on purpose:

- **Loading**: open DevTools (F12), go to the **Network** tab, and set the speed to **Slow 4G**. Refresh to see your loading state properly.
- **Error**: break the URL for a moment (e.g. `/productz`) and refresh.
- **Empty**: point at an endpoint or file that returns `[]`.
- **Not found**: visit a detail page with an id that doesn't exist, like `/products/999`.

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
- Write the four states as a nested ternary, an `if` helper function, or a separate component with early returns
- Test every state on purpose: slow network, broken URL, empty data, unknown id

### Activity - useEffect and Loading States

[Attempt Activity - useEffect and Loading States](../../tasks/useeffect-loading-states.md){.md-button}
