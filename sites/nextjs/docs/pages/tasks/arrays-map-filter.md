# Arrays with map and filter

These exercises practise arrow-function callbacks in `.map()`, `.filter()` and `.find()`, ternaries inside `.map()`, filter buttons, messages for empty lists, and updating arrays in state.

Revisit [Lists with map and filter](../resources/nextjs/lists-map-filter.md) and [Conditional Rendering](../resources/nextjs/conditional-rendering.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-05`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-05
    cd activity-05
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …). **Every page starts with `"use client";` on line 1.**

    Create a file called `app/data.ts` and paste in the shared data below. Every exercise imports it:

    ```tsx
    import { products, students } from "@/app/data";
    ```

??? code "click to expand"
    ```tsx
    // app/data.ts
    export type Product = {
        id: number;
        name: string;
        price: number;
        inStock: boolean;
    };

    export const products: Product[] = [
        { id: 1, name: "Hoodie", price: 59, inStock: true },
        { id: 2, name: "Cap", price: 25, inStock: false },
        { id: 3, name: "Sticker pack", price: 0, inStock: true },
        { id: 4, name: "Water bottle", price: 18, inStock: true },
        { id: 5, name: "Tote bag", price: 15, inStock: false },
    ];

    export type Student = {
        id: number;
        name: string;
        mark: number;
    };

    export const students: Student[] = [
        { id: 1, name: "Aisha", mark: 82 },
        { id: 2, name: "Ben", mark: 47 },
        { id: 3, name: "Chloe", mark: 66 },
        { id: 4, name: "Dev", mark: 50 },
        { id: 5, name: "Ella", mark: 31 },
    ];
    ```

## Map Two Ways

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Show every product name in a `<ul>`, using `.map()` with a block body (`{ return … }`).
    2. Show them again in a second `<ul>`, this time with an implicit return.
    3. Do both again for `students`, showing `name - mark`.
    4. Write a named arrow function `renderProduct` that takes one `Product` and returns an `<li>`, then pass it to `.map()` by name. You'll need to import the `Product` type too.

    Every item in a `.map()` needs a unique `key` prop. Use the `id`.

??? hint "Hint - Click to expand"
    With a block body, the JSX must come after the word `return`. With an implicit return, wrap the JSX in `( )` instead of `{ }`. When passing a named function, write `products.map(renderProduct)` with no brackets after `renderProduct`, the same way you pass `onClick={increment}`.

## Ternaries Inside map

!!! abstract "Instructions"
    Create `app/task2/page.tsx`. Map over `products` and use ternaries to show these for each product:

    1. `"In stock"` / `"Sold out"`
    2. The price as `"Free"` when it's `0`, otherwise a dollar sign followed by the price
    3. A line through the names of sold-out products (`textDecoration` of `"none"` / `"line-through"`)
    4. A **Buy** button that is `disabled` when the product is sold out, with the text `"Buy"` / `"Unavailable"`
    5. A `"🔥 Bargain"` label, but only for in-stock products under $20

    Then map over `students` and show these for each one:

    6. `"Competent"` / `"Not Yet Competent"` (50 or more is competent)
    7. The mark in green or red text, depending on whether they passed

??? hint "Hint - Click to expand"
    For the price, a template literal like `` `$${product.price}` `` works: the first `$` is just a dollar sign and `${ }` inserts the value. `"$" + product.price` does the same thing. For the bargain label, two conditions must both be true, so join them with `&&` before the JSX.

## Filter with Arrows

!!! abstract "Instructions"
    Create `app/task3/page.tsx`.

    1. Make an `inStockProducts` variable using `.filter()` with an arrow function, and list them.
    2. Make `soldOutProducts` the same way and list them.
    3. Make `cheapProducts` (price under 20) and list them.
    4. Do the same for `students` with `passed` (50+) and `notYetPassed`.
    5. Show counts like `"3 products in stock"`. Use `.length`, plus a ternary to choose between "product" and "products".

??? hint "Hint - Click to expand"
    The arrow function you pass to `.filter()` returns `true` to keep an item. For in-stock products, the product's own `inStock` property is already `true` or `false`. For sold-out ones, flip it with `!`.

## Filter Buttons

!!! abstract "Instructions"
    Create `app/task4/page.tsx`.

    1. Make a `filter` state:

        ```tsx
        const [filter, setFilter] = useState<"all" | "inStock" | "soldOut">("all");
        ```

    2. Add three buttons, **All**, **In stock** and **Sold out**, that call `setFilter(…)`.
    3. Make the active button look different with a ternary on `style` or `className`.
    4. Filter the products with a nested ternary inside the filter arrow:

        ```tsx
        const visible = products.filter((p) =>
            filter === "all" ? true : filter === "inStock" ? p.inStock : !p.inStock
        );
        ```

    5. Show a heading using a nested ternary: `"All products"` / `"In stock"` / `"Sold out"`.
    6. Add a search input that also filters by name. You'll need a new `search` state. Add a **second** `.filter()` straight after the first one, so each filter takes the list from the one before it.
    7. If nothing matches, show `"No products found"` instead of the list.

??? hint "Hint - Click to expand"
    For a case-insensitive search, compare lowercase versions of both sides: `.toLowerCase()` on the product name and on the search text, then `.includes()`. For step 7, the question is whether `visible.length` is `0`.

## Todo List

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. This exercise puts a ternary inside an arrow, inside a map, inside a state update, so take it slowly. Read the "Updating Arrays in State" section of [Lists with map and filter](../resources/nextjs/lists-map-filter.md) first.

    1. Create a `Todo` type (`id: number; text: string; done: boolean`) and a `todos` state that starts with 3 todos.
    2. Show them with `.map()`. Done todos have a line through them (a ternary on `style`).
    3. Toggle a todo when it's clicked:

        ```tsx
        const toggleTodo = (id: number) => {
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
            );
        };
        ```

        Read it out loud: *"for each todo, if it's the one we clicked, give back a copy with `done` flipped, otherwise give it back unchanged."*

    4. Delete a todo with a ❌ button, using `.filter()`.
    5. Add a todo with an input and a button. Disable the **Add** button while the input is empty.
    6. Show `"X tasks left"`, using `.filter()` and `.length` with a plural ternary.
    7. Show `"🎉 All done!"` when every todo is done and `"Nothing to do. Add something!"` when the list is empty. Otherwise show the list.

??? hint "Hint - Click to expand"
    - **Delete:** keep every todo whose `id` is **not** the one clicked.
    - **Add:** spread the previous array into a new one and put a new todo object on the end. `Date.now()` gives a number that works as a quick unique id.
    - **Step 7:** check "empty" first, then "every todo is done" (the count of todos left is `0`), then show the list. That's a nested ternary with three outcomes.

## Student Report

!!! abstract "Instructions"
    Create `app/task6/page.tsx` and use the `students` data.

    1. Show a table with each student's name, mark and result (`Competent` / `Not Yet Competent`). React needs a `<tbody>` between `<table>` and the rows, or you'll get an error about invalid nesting.
    2. Add a grade column using a nested ternary (80+ `Distinction`, 65+ `Credit`, 50+ `Pass`, else `-`).
    3. Add a checkbox labelled "Only show students who need support". When it's ticked, show only the students under 50.
    4. Use `.find()` with an arrow to get the first student who scored 80+, and show `"Top student: Aisha"`. If `.find()` gives back `undefined`, show `"No top student"` instead.

??? hint "Hint - Click to expand"
    For step 3, filter with an arrow that returns `true` for everyone when the box is unticked, and only for marks under 50 when it's ticked. A ternary inside the filter arrow does this. For step 4, a ternary on the result of `.find()` handles the `undefined` case.

## From Memory: Shopping List

!!! abstract "Instructions"
    Don't look back at your code for this one. Create `app/task7/page.tsx` with a shopping list. Keep an array of `{ id, name, bought }` in state, and add:

    - an input for adding items
    - clicking an item to toggle `bought`, with a strike-through from a ternary
    - a "Hide bought items" checkbox
    - a ❌ delete button for each item
    - a message for when the list is empty
