# Saving to localStorage

These exercises practise saving data in the browser with `localStorage` so it survives a refresh: saving and loading strings, converting arrays and objects with JSON, and the Next.js pattern of loading `localStorage` components in the browser only.

Revisit [Saving Data in the Browser](../resources/nextjs/browser-storage.md) and [useState and useEffect](../resources/nextjs/usestate-useeffect.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `local-storage`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest local-storage
    cd local-storage
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    In these exercises each folder has **two** files: a `page.tsx` that loads the component browser-only, and a component file that uses `localStorage`. The page always looks like the starter below; change the folder, the import and the names for each exercise.

??? code "click to expand"
    ```tsx
    // app/task1/page.tsx
    "use client";

    import dynamic from "next/dynamic";

    const Counter = dynamic(() => import("./Counter"), {
        ssr: false,
        loading: () => <p>Loading…</p>,
    });

    const Task1 = () => (
        <main>
            <h1>Task 1</h1>
            <Counter />
        </main>
    );

    export default Task1;
    ```

!!! note "Watching your storage"
    Open DevTools (F12) and find **Application → Local storage** (Chrome/Edge) or **Storage → Local Storage** (Firefox). Keep it open while you work: you'll see each value appear and change as you click. You can also delete entries there to test the empty state.

## See the Problem First

!!! abstract "Instructions"
    Create `app/task0/page.tsx` as a normal client page (no `dynamic`). Add a counter with **+1** and **−1** buttons, and try to set its starting value straight from `localStorage`:

    ```tsx
    const [count, setCount] = useState(Number(localStorage.getItem("count") ?? 0));
    ```

    1. Refresh the page and read the error. Write down in a comment what it says and **why** it happens.
    2. Delete the page once you understand it.

??? question "Hint"
    Next.js prepares client pages on the **server** first. Which object exists in the browser but not on the server? The "Why Next.js Needs Extra Care" section of the resource explains it.

## A Counter That Remembers

!!! abstract "Instructions"
    Create `app/task1/page.tsx` (from the starter) and `app/task1/Counter.tsx`.

    1. In `Counter.tsx`, make a `count` state whose starting value is read from `localStorage` under the key `"count"`, using a `useState(() => …)` initialiser. Fall back to `0` when nothing is saved.
    2. Add **+1**, **−1** and **Reset** buttons.
    3. Save the count to `localStorage` in a `useEffect` that runs whenever `count` changes.
    4. **Check:** click a few times, refresh, close the tab and reopen it. The count should still be there.

??? hint "Hint - Click to expand"
    `localStorage` only stores strings, so convert with `Number(...)` when you read and `String(...)` when you save. The effect only saves; it shouldn't call `setCount`.

## Remember Settings

!!! abstract "Instructions"
    Create `app/task2/page.tsx` and `app/task2/Settings.tsx`. Each setting is saved under its own key.

    1. A **name** input: show `Hello, {name}` underneath. Save it under `"name"`.
    2. A **dark mode** checkbox that switches the component's background and text colours with a ternary. Save it under `"dark"`.
    3. A **font size** `<select>` with Small / Medium / Large. Save it under `"fontSize"`.
    4. A **Reset settings** button that sets all three back to their defaults.
    5. **Check:** change everything, refresh, and confirm all three settings are restored.

??? hint "Hint - Click to expand"
    A boolean must be saved as a string too. When you read it back, compare the string: `"true"` means on. Each setting can have its own `useState` initialiser and its own saving `useEffect`, or you can keep all three in one settings object and save it with `JSON.stringify`.

## A Todo List That Remembers

!!! abstract "Instructions"
    Create `app/task3/page.tsx` and `app/task3/TodoList.tsx`. Build a todo list (like the one in [Arrays with map and filter](arrays-map-filter.md)) that is saved under the key `"todos"`.

    1. A `Todo` type (`id`, `text`, `done`) and a `todos` state loaded from `localStorage` with `JSON.parse`, falling back to an empty array.
    2. Add, toggle (with a strike-through) and delete todos.
    3. Save the whole array with `JSON.stringify` in a `useEffect` that depends on `todos`.
    4. Show `"Nothing to do. Add something!"` when the list is empty.
    5. Add a **Clear completed** button that removes every done todo.
    6. **Check:** add three todos, tick one, refresh. Then look at the saved value in DevTools: what does the JSON look like?

??? hint "Hint - Click to expand"
    `JSON.parse` needs a string, so give `getItem` a fallback of `"[]"` with `??`. Type the parsed value as `Todo[]` so the rest of the component knows its shape. Clearing completed todos is a `.filter()` that keeps the ones that aren't done.

## Favourites from an API

!!! abstract "Instructions"
    Combine fetching with saving. Create `app/task4/page.tsx` and `app/task4/Products.tsx`.

    1. Fetch `https://dummyjson.com/products?limit=12` and show each product's title, price and thumbnail, with loading and error states.
    2. Keep a `favourites` state: an array of product **ids**, loaded from and saved to `localStorage` under `"favourites"`.
    3. Each product has a ♡ / ♥ button (a ternary) that adds or removes its id from `favourites`.
    4. Add a **Show favourites only** checkbox that filters the list.
    5. **Check:** favourite three products, refresh, and confirm the hearts are still filled.

    **Think:** why save only the ids, rather than the whole product objects?

??? hint "Hint - Click to expand"
    The products come from the API (not saved); only the favourites are saved. To toggle, check whether the id is already in the array with `.includes()`: if it is, filter it out, otherwise spread it onto the end.

## From Memory: Notes App

!!! abstract "Instructions"
    Without looking back, build `app/task5/` with a page and a `Notes.tsx` component:

    - A textarea and an **Add note** button (disabled while the textarea is empty)
    - Each note shows its text and the time it was added (`new Date().toLocaleString()`), with a ❌ delete button
    - Notes are saved to `localStorage` and survive a refresh
    - The textarea's unsaved draft is **also** saved, so a half-written note isn't lost on refresh
    - A message when there are no notes
