# Arrow Functions in useEffect and fetch

These exercises slow right down and look at the arrow functions that make `useEffect` and `fetch` work, because you'll write this pattern in almost every app that loads data. You will label every arrow, write the same fetch three ways, build your own fetch helper, call a real API, re-run an effect when something changes, and fetch when a button is clicked.

Revisit [Fetching Data](../resources/nextjs/fetching-data.md) and [useState and useEffect](../resources/nextjs/usestate-useeffect.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-07`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-07
    cd activity-07
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …). **Every page starts with `"use client";` on line 1.**

    Create two files in the `public` folder, `public/animals.json` and `public/facts.json`, using the starter data below. Check they work by visiting `http://localhost:3000/animals.json` and `http://localhost:3000/facts.json`.

??? code "click to expand"
    `public/animals.json`:

    ```json
    [
        { "id": 1, "name": "Koala", "diet": "herbivore", "endangered": true },
        { "id": 2, "name": "Dingo", "diet": "carnivore", "endangered": false },
        { "id": 3, "name": "Platypus", "diet": "carnivore", "endangered": false },
        { "id": 4, "name": "Bilby", "diet": "omnivore", "endangered": true },
        { "id": 5, "name": "Wombat", "diet": "herbivore", "endangered": false }
    ]
    ```

    `public/facts.json`:

    ```json
    [
        { "id": 1, "text": "A wombat's poo is cube shaped." },
        { "id": 2, "text": "Koalas sleep up to 20 hours a day." },
        { "id": 3, "text": "A platypus has no stomach." },
        { "id": 4, "text": "Bilbies don't need to drink water." },
        { "id": 5, "text": "Dingoes can turn their heads almost 180 degrees." }
    ]
    ```

## How Many Arrows?

A typical `useEffect` that loads data contains several arrow functions, each running at a different time. You never call any of them yourself. You **hand them over**, and React or the Promise calls them at the right moment.

![A useEffect with fetch contains five arrow functions, each running at a different time](../../assets/diagrams/07-fetch-arrows.svg)

## Label Every Arrow

!!! abstract "Instructions"
    Create `app/task1/page.tsx` and paste in the starter code.

    1. Above **every** arrow function, add a comment saying what it does and when it runs, e.g. `// Arrow 2: runs when the server answers`.
    2. Make the arrows inside `useEffect` **block bodies** and add a `console.log` to each one. Open the browser's console (F12, then the **Console** tab) and refresh. What order do the messages appear in?
    3. Change the URL to `/animalz.json` and refresh. Which messages appear now?
    4. Answer these as comments at the bottom of the file:
        - How many arrow functions are in the whole file? (Count them all, including the component and the `.map`.)
        - Which arrow inside `useEffect` might never run?
        - Why does `useEffect` need `() => { … }` around the code? What would `useEffect(fetch("/animals.json"))` do?

??? code "click to expand"
    ```tsx
    "use client";

    import { useEffect, useState } from "react";

    type Animal = {
        id: number;
        name: string;
        diet: "herbivore" | "carnivore" | "omnivore";
        endangered: boolean;
    };

    const Task1 = () => {
        const [animals, setAnimals] = useState<Animal[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            fetch("/animals.json")
                .then((res) => res.json())
                .then((data: Animal[]) => setAnimals(data))
                .catch((err: Error) => setError(err.message))
                .finally(() => setLoading(false));
        }, []);

        return (
            <main>
                <h1>Task 1</h1>
                {loading ? (
                    <p>Loading…</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <ul>
                        {animals.map((animal) => (
                            <li key={animal.id}>{animal.name}</li>
                        ))}
                    </ul>
                )}
            </main>
        );
    };

    export default Task1;
    ```

??? hint "Hint - Click to expand"
    When you turn an implicit-return arrow into a block body, you must add `return` for any value the next `.then()` needs. In development, React runs effects twice on first load, so every message may appear twice. That doesn't happen in the built app.

## The Same Fetch, Three Ways

!!! abstract "Instructions"
    Create `app/task2/page.tsx`. Write **three arrow-function components** in this one file, each fetching `/animals.json` its own way, and put them all on the page. Each component has its own `animals`, `loading` and `error` state.

    1. **`BlockVersion`**: every arrow has curly braces. Remember the `return` in the first `.then`!
    2. **`ShortVersion`**: every arrow uses an implicit return.
    3. **`AsyncVersion`**: an `async` arrow function inside the effect, with `try` / `catch` / `finally`.
    4. Write one more arrow-function component, `AnimalList`, that takes an `animals` prop and shows each animal with ternaries:
        - a diet emoji with a nested ternary: 🌿 herbivore, 🥩 carnivore, 🍽️ omnivore
        - `"⚠️ Endangered"` / `"Safe"`

        Use `<AnimalList animals={animals} />` in all three versions.
    5. **Break it on purpose:** delete the `return` from `BlockVersion`'s first `.then`. What happens? Why? Put it back.

??? code "click to expand"
    ```tsx
    const Task2 = () => {
        return (
            <main>
                <h1>Task 2</h1>
                <BlockVersion />
                <ShortVersion />
                <AsyncVersion />
            </main>
        );
    };
    ```

??? hint "Hint - Click to expand"
    For `AsyncVersion`, define an `async` arrow function inside the effect and call it straight after. Inside `try`, `await` the fetch, then `await` the `.json()`. TypeScript doesn't know the type of `err` in `catch`, so check `err instanceof Error` before reading `err.message`.

## Your Own Fetch Helper

!!! abstract "Instructions"
    You've written the same `res.ok` check over and over. Put it in a reusable arrow function. Create `app/task3/page.tsx`, and above the component write:

    ```tsx
    const getJson = (url: string) =>
        fetch(url).then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Error ${res.status}`))));
    ```

    Read it out loud: *"`getJson` is an arrow function that takes a URL, fetches it, and if the response is OK, opens it as JSON; otherwise it fails with the status code."*

    1. Use `getJson` in **two separate** `useEffect`s: one loads `/animals.json`, the other loads `/facts.json`.
    2. Each one has its own loading and error state (`animalsLoading`, `factsLoading` and so on).
    3. Show two sections, each with its own loading / error / list ternary.
    4. Break **one** URL. Only that section should show an error, and the other should still work.

## A Real API

!!! abstract "Instructions"
    So far you've fetched files from your own app. Now fetch from a server on the internet. [JSONPlaceholder](https://jsonplaceholder.typicode.com) is a free practice API with fake data. Create `app/task4/page.tsx`.

    1. Visit `https://jsonplaceholder.typicode.com/todos?userId=1` in your browser first, to see what the data looks like.
    2. Write a `Todo` type to match it (`userId`, `id`, `title`, `completed`).
    3. Fetch that URL in `useEffect`, using arrow functions in every `.then`, `.catch` and `.finally`.
    4. Show the four states (loading, error, empty and list) with a ternary.
    5. For each todo, use ternaries for `"✅"` / `"⬜"` and for a line through completed ones.
    6. Above the list, show `"7 of 20 done"`, plus a 🎉 only if they're **all** done.

    **Check:** open DevTools, go to the **Network** tab, and set the speed to **Slow 4G**. Refresh, and you'll see your loading state properly.

??? hint "Hint - Click to expand"
    Count the completed todos with `.filter()` and `.length`. "All done" means that count equals the total number of todos.

## Run It Again When Something Changes

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. Read the "Running an Effect Again" and "The Cleanup Function" sections of [useState and useEffect](../resources/nextjs/usestate-useeffect.md) first.

    1. Add a `userId` state starting at `1`, and fetch `https://jsonplaceholder.typicode.com/todos?userId=${userId}` in an effect with `[userId]` as its dependency array. Use the cleanup arrow function with an `ignore` flag so slow answers can't overwrite newer ones.
    2. Add a `<select>` with users 1 to 10. Make the options with `.map()` over `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`.
    3. Write one `changeUser(newId)` arrow function that every control uses. It sets loading, clears the error, and sets the new user id. The select calls it with `onChange={(e) => changeUser(Number(e.target.value))}`.
    4. Add **← Previous** and **Next →** buttons that wrap around with a ternary: after user 10 comes user 1, and before user 1 comes user 10.
    5. Show `"Loading user 3…"` while loading, and `"User 3: 5 of 20 done"` above the list.

    **Count them:** how many arrow functions are in your `useEffect` now? (There's one more than in the first exercise.)

??? hint "Hint - Click to expand"
    The cleanup is an arrow function **returned** from the effect's arrow function. It sets `ignore = true`. Each setter inside `.then`, `.catch` and `.finally` should only run `if (!ignore)`. The Next button's argument is a ternary: is `userId` 10? then 1, otherwise `userId + 1`.

## Fetch When a Button Is Clicked

!!! abstract "Instructions"
    `useEffect` is for loading data **when the page appears**. If you want to load data **when the user does something**, call `fetch` inside an event handler instead. No `useEffect` needed.

    Create `app/task6/page.tsx`. Copy your `getJson` arrow function from earlier.

    1. State: `fact` (`Fact | null`, starts as `null`), `loading` (starts `false` this time; why?) and `error`.
    2. Write a `loadFact` click handler as an arrow function. It sets loading, clears the error, then uses `getJson("/facts.json")` and picks one random fact from the array.
    3. The button is disabled while loading. Its text uses a nested ternary: `"Loading…"` while loading, `"Another fact"` once there is a fact, otherwise `"Get a fact"`.
    4. Below the button, use a ternary: the error, **or** the fact, **or** `"Click the button to get a fact."`

??? hint "Hint - Click to expand"
    A random index is `Math.floor(Math.random() * facts.length)`. Setting `loading` to `true` at the start of the handler is fine, because it's a click handler, not an effect.

## From Memory: Show More Posts

!!! abstract "Instructions"
    Without looking: create `app/task7/page.tsx` that loads posts from `https://jsonplaceholder.typicode.com/posts?_limit=5`.

    - Keep a `limit` state starting at `5`, and put it in the URL and the dependency array.
    - A **Show more** button adds 5 to `limit` with an updater arrow.
    - Show loading / error / empty / list with ternaries, and `"Showing 10 posts"` above the list.
    - Disable the button when `limit` reaches 100, with the text `"That's all of them"`.
    - Use the cleanup arrow function so slow answers can't overwrite newer ones.
