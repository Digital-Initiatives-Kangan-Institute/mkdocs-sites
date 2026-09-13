# Supabase as a CMS

This is a **guided exercise** in using a database as a content management system (CMS). You will design a content model first, then display that content in your front end.

!!! abstract "Instructions"
    Complete the two guided sections below. Your work must include:

    - A content model with at least **two tables** and **four fields** per table, with sample records
    - Content displayed in your front end (from Supabase or a mock)
    - Notes explaining how content is created and updated

    Push your work and planning notes to GitHub.

    Revisit [Introduction to Supabase](../resources/supabase/intro-to-supabase.md) and [Content Management with Supabase](../resources/supabase/cms-with-supabase.md) while you work.

---

## Design a Content Model

A **content model** describes what data your site needs and how it is organised. Start with tables (like spreadsheets), then add fields (columns) and sample rows.

### Example: a Cafe Menu

Two related tables — categories and products:

**`categories`**

| id | name |
| :--- | :--- |
| 1 | Drinks |
| 2 | Food |

**`products`**

| id | title | price | description | category_id |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Latte | 4.50 | Smooth espresso with steamed milk | 1 |
| 2 | Cappuccino | 5.00 | Espresso with foamed milk | 1 |
| 3 | Croissant | 3.50 | Buttery and flaky | 2 |

Line by line:

- **`categories`** — a table holding the possible categories. Each row has a unique `id` and a `name`.
- **`products`** — the main content. Each product has its own `id`, a `title`, a `price`, a `description`, and a `category_id`.
- **`category_id`** — this is the link between tables. A product with `category_id = 1` belongs to the "Drinks" category. This is called a **foreign key**.

### Your Turn

Design your own model for a project of your choice (products, posts, recipes, anything). Requirements:

- At least **two tables**
- At least **four fields** per table
- Sample rows showing real-looking data
- A field that links one table to the other (a foreign key)

??? hint "Hint - Click to expand"
    Draw the tables side by side. First list the fields each table needs. Then decide how they relate: does a post belong to an author? does a product belong to a category? Add the linking field to the "many" side (e.g. `products.category_id`, not `categories.product_id`).

---

## Display CMS Content

Now display the content in a Next.js component. This example mocks the data as a JavaScript array so it works even without Supabase access:

```tsx
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
}

const products: Product[] = [
    { id: 1, title: "Latte", price: 4.5, description: "Smooth espresso with steamed milk.", category: "Drinks" },
    { id: 2, title: "Cappuccino", price: 5.0, description: "Espresso with foamed milk.", category: "Drinks" },
    { id: 3, title: "Croissant", price: 3.5, description: "Buttery and flaky.", category: "Food" },
];

export default function CmsDisplay() {
    return (
        <main>
            <h1>Menu</h1>
            {products.map(product => (
                <article key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>${product.price} — {product.category}</p>
                </article>
            ))}
        </main>
    );
}
```

**What this file does in one sentence:** it renders each product from the data as a card-like article.

Line by line:

1. **`interface Product { ... }`** — describes the shape of one product, matching the `products` table from the content model.
2. **`const products: Product[] = [ ... ];`** — the mock data. In a real app this would come from Supabase; the array stands in for the database rows.
3. **`export default function CmsDisplay() { ... }`** — the component that displays the content.
4. **`{products.map(product => ( ... ))}`** — turns each row into one `<article>`.
5. **`key={product.id}`** — uses the unique id so React can track each item.
6. **`<h2>{product.title}</h2>`**, the description, and the price/category line — each reads a field from the row.

### Replacing the Mock with Supabase

If Supabase access is available, make the component a client component and replace the array with a fetch inside `useEffect`:

```tsx
"use client";

import { useEffect, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
}

export default function CmsDisplay() {
    const [products, setProducts] = useState<Product[]>([]);

    function onJson(data: Product[]) {
        setProducts(data);
    }

    function onFetch(response: Response) {
        response.json().then(onJson);
    }

    function onLoad() {
        fetch("YOUR_SUPABASE_URL/rest/v1/products", {
            headers: { apikey: "YOUR_ANON_KEY" },
        }).then(onFetch);
    }

    useEffect(onLoad, []);

    return (
        <main>
            <h1>Menu</h1>
            {products.map(product => (
                <article key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>${product.price} — {product.category}</p>
                </article>
            ))}
        </main>
    );
}
```

The `map` and the JSX stay exactly the same as the mock version. That is the point of a CMS: the front end only cares about the data shape, not where the data lives.

---

## How Content Is Created and Updated

Write a short note answering: how does new content get into the system?

Two common workflows:

- **Dashboard editing** — a person logs into the Supabase dashboard and edits rows directly (fast, no code).
- **In-app forms** — a user submits a form in your app, and your code inserts or updates rows via the API.

Describe which workflow fits your project and why.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **CMS** | A system for creating and managing content, often backed by a database |
| **Content model** | The structure of your data: tables, fields, and relationships |
| **Table** | A collection of records with the same fields |
| **Field** | A single column of a table (e.g. `title`) |
| **Foreign key** | A field in one table that references a row in another |

---

## Summary

- A content model is planning before building: decide tables and fields first
- Link tables with a foreign key (e.g. `category_id`)
- Display content by mapping over the data and reading fields
- The front end does not care whether data comes from Supabase or a mock array
