# useEffect and Loading States

These exercises practise using `useEffect` to load data when the page first appears, showing the four states of loaded data (loading, error, empty and data) with ternaries, writing the same logic three ways, `async` arrow functions, and using `fetch()` to load a JSON file.

Revisit [useState and useEffect](../resources/nextjs/usestate-useeffect.md), [Fetching Data](../resources/nextjs/fetching-data.md) and [Handling Loading and Error States](../resources/nextjs/loading-error-states.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-06`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-06
    cd activity-06
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …). **Every page starts with `"use client";` on line 1**, and imports the hooks it needs: `import { useEffect, useState } from "react";`

    These exercises pretend to talk to a server. Create `app/fakeApi.ts` and paste in the code below. It has three functions: one that always works, one that fails about 1 in 3 times, and one that works but returns no pets.

??? code "click to expand"
    ```tsx
    // app/fakeApi.ts
    export type Pet = {
        id: number;
        name: string;
        species: "dog" | "cat" | "rabbit";
        age: number;
        adopted: boolean;
    };

    const pets: Pet[] = [
        { id: 1, name: "Biscuit", species: "dog", age: 3, adopted: false },
        { id: 2, name: "Mittens", species: "cat", age: 1, adopted: true },
        { id: 3, name: "Thumper", species: "rabbit", age: 2, adopted: false },
        { id: 4, name: "Rex", species: "dog", age: 7, adopted: false },
        { id: 5, name: "Luna", species: "cat", age: 4, adopted: true },
    ];

    // Always works, after 1.5 seconds
    export const getPets = (): Promise<Pet[]> =>
        new Promise((resolve) => {
            setTimeout(() => resolve(pets), 1500);
        });

    // Fails about 1 in 3 times
    export const getPetsMaybe = (): Promise<Pet[]> =>
        new Promise((resolve, reject) => {
            setTimeout(
                () => (Math.random() < 0.33 ? reject(new Error("Server is grumpy. Try again.")) : resolve(pets)),
                1500
            );
        });

    // Works, but there are no pets
    export const getNoPets = (): Promise<Pet[]> =>
        new Promise((resolve) => {
            setTimeout(() => resolve([]), 1500);
        });
    ```

!!! note
    Count the arrow functions in `fakeApi.ts`. There's also a ternary choosing between `reject` and `resolve`.

## The Pattern

Every exercise builds on this shape. Read it alongside the timeline diagram in [useState and useEffect](../resources/nextjs/usestate-useeffect.md):

```tsx
const [pets, setPets] = useState<Pet[]>([]);
const [loading, setLoading] = useState(true);   // start as true: we're loading straight away
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    getPets()
        .then((data) => setPets(data))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
}, []); // [] = run once, when the page first appears
```

!!! warning
    The lint error "Calling setState synchronously within an effect" means you called something like `setLoading(true)` directly inside `useEffect`. Put starting values in `useState(…)` instead. Only call setters inside `.then()`, `.catch()` or `.finally()`, or after an `await`.

## Loading, Then Data

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Import `useState`, `useEffect`, `getPets` and the `Pet` type.
    2. Set up the `pets` and `loading` state. You don't need an error state yet.
    3. In `useEffect`, call `getPets()`. Use arrow functions in `.then()` to store the data and set `loading` to `false`.
    4. Render `<p>Loading pets…</p>` while loading, otherwise a `<ul>` of pets.
    5. Inside the list, use ternaries to show these for each pet:
        - an emoji for the species (nested ternary: 🐶 / 🐱 / 🐰)
        - `"1 year old"` vs `"3 years old"`
        - `"Adopted ❤️"` / `"Available"`

    **Check:** refresh the page. "Loading pets…" should show for 1.5 seconds before the list appears.

??? hint "Hint - Click to expand"
    Without `.finally()`, you need to call both setters in the same `.then()`, so it needs a block body with two statements. The import for `getPets` comes from `"@/app/fakeApi"`.

## Adding Errors

!!! abstract "Instructions"
    Create `app/task2/page.tsx`. Copy the previous exercise, then:

    1. Swap `getPets` for `getPetsMaybe`.
    2. Add an `error` state (`string | null`) and a `.catch()` with an arrow function.
    3. Set loading to false in `.finally()` instead of in `.then()`.
    4. Render with a nested ternary: loading, otherwise error (in red), otherwise the list.

    **Check:** refresh a few times. You'll get the error on some refreshes and the list on others.

## Four States, Three Ways

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. Use `getNoPets` for now, then switch to `getPetsMaybe` later to test the other states. Show:

    | State | Show |
    | --- | --- |
    | loading | `Loading…` |
    | error | the error in red |
    | empty (`pets.length === 0`) | `No pets right now. Check back soon!` |
    | data | the list |

    Write this three times in the same page:

    - **Way A:** a nested ternary in the JSX, with one more level than before.
    - **Way B:** an arrow helper function `renderContent` with `if` statements and early `return`s, called as `{renderContent()}` in the JSX.
    - **Way C:** early returns in a separate component. Create `app/task3/PetList.tsx` with an arrow-function component that takes `loading`, `error` and `pets` as props, then import it into the page.

    **Think:** which one would you rather read in 6 months?

??? code "click to expand"
    ```tsx
    // app/task3/PetList.tsx
    import { Pet } from "@/app/fakeApi";

    const PetList = ({ loading, error, pets }: { loading: boolean; error: string | null; pets: Pet[] }) => {
        if (loading) return <p>Loading…</p>;
        // TODO: error, empty and data
    };

    export default PetList;
    ```

??? hint "Hint - Click to expand"
    The order of checks matters in all three ways: loading first, then error, then empty, then data. `PetList.tsx` isn't a page (it's not called `page.tsx`), so it doesn't get its own URL. Import it with `import PetList from "@/app/task3/PetList";` and use it like `<PetList loading={loading} error={error} pets={pets} />`.

## Reload Button

!!! abstract "Instructions"
    Create `app/task4/page.tsx`. Copy your best version from the previous exercise (using `getPetsMaybe`), then add a **Reload** button. `useEffect` runs again whenever anything in its dependency array changes, and the reload button takes advantage of that.

    1. Add a `reloadKey` state starting at `0`.
    2. Change the effect's dependency array to `[reloadKey]`.
    3. Write a `reload` handler that sets `loading` back to `true`, clears the error, and adds one to `reloadKey`.
    4. Disable the button while loading, and give it the text `"Loading…"` / `"Reload"`.
    5. Show `"Loaded 3 times"` using `reloadKey + 1`, with a plural ternary for "time" / "times".

??? hint "Hint - Click to expand"
    Calling `setLoading(true)` is fine in a click handler; the lint rule only applies to code directly inside `useEffect`. Use an updater function to add one to `reloadKey`.

## Async and Await

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. Rebuild the reload exercise using an `async` arrow function inside the effect, with `try` / `catch` / `finally` instead of `.then()` / `.catch()` / `.finally()`. Read the `async` and `await` section of [Fetching Data](../resources/nextjs/fetching-data.md) first.

    Then add **All**, **Available** and **Adopted** filter buttons, and a heading with the count, e.g. `"2 pets available"`.

??? code "click to expand"
    ```tsx
    useEffect(() => {
        const loadPets = async () => {
            try {
                // TODO: await getPetsMaybe() and store the result
            } catch (err) {
                // TODO: store the error message
            } finally {
                // TODO: stop loading
            }
        };

        loadPets();
    }, [reloadKey]);
    ```

??? hint "Hint - Click to expand"
    TypeScript doesn't know what type `err` is in a `catch` block, so check `err instanceof Error` before using `err.message` (a ternary works well, with a fallback message). To show a heading **and** a list in one branch of a ternary, wrap them in a fragment `<> </>`.

## Real fetch

!!! abstract "Instructions"
    This exercise uses a real `fetch` request to a file inside your own app. Files you put in the `public` folder can be fetched by name: `public/pets.json` is at `/pets.json`.

    1. Create `public/pets.json` with the pets from the starter code. Check it works by visiting `http://localhost:3000/pets.json`.
    2. Create `app/task6/page.tsx` and load the pets with `fetch("/pets.json")` in `useEffect`. Check `res.ok` before reading the JSON.
    3. Render all four states with ternaries, using whichever of ways A, B or C you like.
    4. Change the URL to `/petz.json` (a typo). What shows? Change it back afterwards.
    5. Write it again as an `async` arrow function, with `await fetch(…)` and `await res.json()`. Use `throw` to handle a bad response.

??? code "click to expand"
    ```json
    [
        { "id": 1, "name": "Biscuit", "species": "dog", "age": 3, "adopted": false },
        { "id": 2, "name": "Mittens", "species": "cat", "age": 1, "adopted": true },
        { "id": 3, "name": "Thumper", "species": "rabbit", "age": 2, "adopted": false },
        { "id": 4, "name": "Rex", "species": "dog", "age": 7, "adopted": false },
        { "id": 5, "name": "Luna", "species": "cat", "age": 4, "adopted": true }
    ]
    ```

??? hint "Hint - Click to expand"
    The answer arrives in two steps: the first `.then` gets the response, checks `res.ok`, and returns `res.json()`; the second `.then` gets the data. `throw new Error(...)` stops the chain and jumps straight to `.catch()`. The [Fetching Data](../resources/nextjs/fetching-data.md) resource shows the shape of both the `.then()` and `async` versions.

!!! note
    You'll use the same pattern with Supabase in the [Pet Adoption Board](pet-adoption-board.md) project. Only the URL and some headers change.

## From Memory: Quotes

!!! abstract "Instructions"
    Don't look back at your code for this one. Create `public/quotes.json` with 5 quotes (each with an `id`, `text` and `author`), then create `app/task7/page.tsx`, which:

    - fetches the quotes with `fetch` in `useEffect`
    - shows loading / error / empty / data with ternaries
    - shows one quote at a time, with a **Next** button that goes back to the first quote after the last one
    - shows `"Quote 2 of 5"`

??? hint "Hint - Click to expand"
    Keep an `index` state. The Next button's updater uses a ternary: if `prev` is the last index (`quotes.length - 1`), go back to `0`, otherwise add one.
