# Typing Your Data

These exercises practise describing data with TypeScript: object types, optional and nullable properties, union types, nested types for real API data, typing props and state, handling values that might be missing, and fixing code by reading TypeScript's error messages.

Revisit [TypeScript Types for Data](../resources/nextjs/typescript-types.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `typescript-types`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest typescript-types
    cd typescript-types
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …). **Every page starts with `"use client";` on line 1.**

    Keep VS Code open beside the browser. The red underlines and their hover messages are the point of these exercises, so read every one.

## Describe a Pet

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Above the component, write a `Pet` type with: `id` (number), `name` (string), `age` (number), `adopted` (boolean), `nickname` (an **optional** string) and `description` (a string **or null**).
    2. Make an array `pets` of type `Pet[]` with three pets. Give one a nickname, and give one a `null` description.
    3. Map over the pets and show each name, age and description. Show `"No description yet"` when the description is `null`, and show the nickname in brackets only when there is one.
    4. **Break it on purpose**, one at a time, and write down the error message each causes as a comment at the bottom of the file:
        - Misspell `name` as `nmae` in one of the pets
        - Give one pet `age: "three"`
        - Remove `adopted` from one of the pets
        - Add `colour: "brown"` to one of the pets

??? hint "Hint - Click to expand"
    A `?` after a property name makes it optional. `| null` after a type allows `null`. The `??` operator gives a fallback for a `null` description, and `&&` shows the nickname only when it exists.

## Union Types

!!! abstract "Instructions"
    Create `app/task2/page.tsx`.

    1. Write a `Species` type that only allows `"dog"`, `"cat"` or `"rabbit"`, and add a `species: Species` property to a copy of your `Pet` type.
    2. Write a `Filter` type that allows `"all"`, `"available"` or `"adopted"`.
    3. Make a `filter` state typed with `Filter`, and three buttons that set it.
    4. Show only the pets that match the filter.
    5. Try `setFilter("everything")` in one of the buttons. Read the error, then fix it.
    6. Try giving a pet `species: "dragon"`. Read the error, then fix it.

??? hint "Hint - Click to expand"
    A union of exact strings is written with `|` between them. Pass the type to `useState` in angle brackets, before the starting value.

## Real API Data

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. You'll describe real data from `https://dummyjson.com/users?limit=10`.

    1. Visit that URL in your browser and study the shape of the data. Notice the list is wrapped in an outer object.
    2. Create `app/types.ts` and export these types, describing only the fields listed:
        - `Address`: `address`, `city`, `state`, `postalCode`
        - `Company`: `name`, `title`, `department`
        - `User`: `id`, `firstName`, `lastName`, `age`, `email`, `image`, `address` (an `Address`), `company` (a `Company`)
        - `UsersResponse`: `users` (an array of `User`), `total`, `skip`, `limit`
    3. In the page, import the types with `import type`, fetch the URL in `useEffect`, and store `data.users` in a `users` state typed as an array of `User`.
    4. Show each user's full name, age, city and job title.
    5. Show `"Showing 10 of 208 users"` using `users.length` and the response's `total`. You'll need a second state for the total.

??? code "click to expand"
    ```tsx
    // app/types.ts
    export type Address = {
        // TODO
    };

    export type Company = {
        // TODO
    };

    export type User = {
        // TODO
    };

    export type UsersResponse = {
        // TODO
    };
    ```

??? hint "Hint - Click to expand"
    Copy the property names exactly as the API spells them (they're case-sensitive). Nested values are read with dots, such as the city inside the address. The type on the second `.then()`'s parameter tells TypeScript what the JSON contains.

## Props and Function Props

!!! abstract "Instructions"
    Create `app/task4/page.tsx` and `app/task4/UserCard.tsx`, reusing the types and fetch from the previous exercise.

    1. In `UserCard.tsx`, write a `UserCardProps` type with a `user` (a `User`), an `isSelected` boolean, and an `onSelect` function prop that takes a user's id and returns nothing.
    2. Write the `UserCard` component. It shows the user's photo and name, has a different border when `isSelected` is true, and calls `onSelect` with the user's id when clicked.
    3. In the page, keep a `selectedId` state that is a number **or null**, starting as `null`.
    4. Render a `UserCard` for each user, passing `isSelected` and an `onSelect` that updates `selectedId`.
    5. Below the list, find the selected user and show their email and company name, or `"Click a user to see details"` when nobody is selected.
    6. Leave out one required prop when you use `<UserCard />`. Read the error, then fix it.

??? hint "Hint - Click to expand"
    A function prop's type looks like `(id: number) => void`. `.find()` returns the user **or `undefined`**, so TypeScript will make you check before reading the email. A ternary or `?.` both work.

## Fix the Errors

!!! abstract "Instructions"
    Create `app/task5/page.tsx` and paste in the starter code. It has **seven** TypeScript errors. Fix each one **without** using `any`, and add a comment above each fix explaining what the error message meant.

??? code "click to expand"
    ```tsx
    "use client";

    import { useState } from "react";

    type Product = {
        id: number;
        title: string;
        price: number;
        category: "food" | "drink";
    };

    const products: Product[] = [
        { id: 1, title: "Latte", price: "4.50", category: "drink" },
        { id: 2, title: "Muffin", price: 3, category: "snack" },
        { id: 3, title: "Juice", price: 5 },
    ];

    const formatPrice = (price) => `$${price.toFixed(2)}`;

    const Task5 = () => {
        const [cart, setCart] = useState([]);
        const [selected, setSelected] = useState<Product | null>(null);

        const addToCart = (product: Product) => {
            setCart((prev) => [...prev, product]);
        };

        return (
            <main>
                <h1>Task 5</h1>
                {products.map((p) => (
                    <button key={p.id} onClick={() => setSelected(p)}>
                        {p.titel}
                    </button>
                ))}
                <p>Selected: {selected.title}</p>
                <button onClick={() => selected && addToCart(selected)}>Add to cart</button>
                <p>{cart.length} items</p>
            </main>
        );
    };

    export default Task5;
    ```

??? hint "Hint - Click to expand"
    Work from the top of the file down. Hover over each red underline and read the **end** of the message first. The table of common errors in the [TypeScript Types for Data](../resources/nextjs/typescript-types.md) resource covers every one of them.

## From Memory: Type a New API

!!! abstract "Instructions"
    Without looking at your earlier code, create `app/task6/page.tsx` using `https://dummyjson.com/recipes?limit=6`.

    - Visit the URL and write `Recipe` and `RecipesResponse` types in `app/types.ts` for the fields you'll show (include at least one array of strings, such as the ingredients or tags)
    - Add a `Difficulty` union type for the recipe's difficulty values
    - Fetch the recipes with typed state and show each recipe's name, difficulty and number of ingredients
    - Add filter buttons for each difficulty, using a `filter` state typed with your union plus `"all"`
    - Build it with no `any` and no red underlines
