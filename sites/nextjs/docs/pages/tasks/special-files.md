# Using Special Files

These exercises practise the files Next.js treats specially: a custom 404 page with `not-found.tsx` and `notFound()`, crash pages with `error.tsx`, nested layouts for one section of a site, `loading.tsx`, and page titles with `metadata`.

Revisit [Special Files](../resources/nextjs/special-files.md) and [Routing](../resources/nextjs/routing.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `special-files`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest special-files
    cd special-files
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Create `app/data.ts` with the shared data below. Unlike earlier tasks, **not every page is a client component** here: each exercise says whether to add `"use client"`.

??? code "click to expand"
    ```tsx
    // app/data.ts
    export type Recipe = {
        id: number;
        name: string;
        minutes: number;
        vegetarian: boolean;
    };

    export const recipes: Recipe[] = [
        { id: 1, name: "Pancakes", minutes: 20, vegetarian: true },
        { id: 2, name: "Spaghetti bolognese", minutes: 45, vegetarian: false },
        { id: 3, name: "Veggie curry", minutes: 40, vegetarian: true },
        { id: 4, name: "Fish tacos", minutes: 30, vegetarian: false },
    ];
    ```

## A Site to Work With

!!! abstract "Instructions"
    Build a small site first, using what you already know. These are **server components** (no `"use client"`).

    1. Replace `app/page.tsx` with a home page that has a heading and a short welcome.
    2. Create `app/about/page.tsx` with a heading and a paragraph.
    3. Create `app/recipes/page.tsx` that lists every recipe as a link to `/recipes/1`, `/recipes/2` and so on.
    4. Create `app/recipes/[id]/page.tsx` as an `async` server component that reads the id with `await params`, finds the recipe, and shows its name, time and `"Vegetarian"` / `"Contains meat"`. For now, show `"Recipe not found"` with a ternary when it doesn't exist.
    5. Add links to Home, About and Recipes in the `<body>` of `app/layout.tsx`, above `{children}`.

??? hint "Hint - Click to expand"
    The dynamic page's `params` prop is a Promise holding an object with an `id` string. The [Routing](../resources/nextjs/routing.md) resource shows the shape. Convert the id with `Number()` before comparing it with the recipe ids.

## A Custom 404 Page

!!! abstract "Instructions"
    1. Visit `/banana`. This is Next.js's built-in 404 page.
    2. Create `app/not-found.tsx` with a heading, a friendly message and a link back home. Visit `/banana` again.
    3. Visit `/recipes/99`. Notice you get your ternary's "Recipe not found" message, **not** the 404 page. Why?
    4. In `app/recipes/[id]/page.tsx`, replace the ternary with a call to `notFound()` when the recipe doesn't exist. Visit `/recipes/99` again.
    5. Create `app/recipes/not-found.tsx` with a message specific to recipes and a link back to `/recipes`. Which 404 page does `/recipes/99` show now? Which does `/banana` show?

??? hint "Hint - Click to expand"
    `/recipes/99` matches the `[id]` folder, so as far as Next.js knows, the page exists. `notFound()` comes from `next/navigation`. Once it's called, the code after it doesn't run, so you no longer need the ternary: an `if` is enough. The closest `not-found.tsx` to the page wins.

## Crash Pages

!!! abstract "Instructions"
    1. Create `app/crash/page.tsx` as a **client** component with a `broken` state (starting `false`) and a **Break the page** button that sets it to `true`. During render, if `broken` is true, `throw new Error("The page broke!")`.
    2. Click the button. Read the development overlay, then close it. What does the page show?
    3. Create `app/error.tsx`. Show a heading, the error's message, and a **Try again** button that calls `reset`. Click **Break the page** again.
    4. Notice your navigation links from the layout still work. Why?
    5. Add a second button, **Break in handler**, whose `onClick` throws an error directly. Does `error.tsx` catch it? Write your answer as a comment.

??? code "click to expand"
    ```tsx
    // app/error.tsx
    "use client";

    export default function Error({ error, reset }: { error: Error; reset: () => void }) {
        return (
            <main>
                {/* TODO: heading, the error message, and a Try again button */}
            </main>
        );
    }
    ```

??? hint "Hint - Click to expand"
    The throw belongs **above the `return`**, inside an `if`. `error.tsx` only catches errors thrown while a page renders; the table in the [Special Files](../resources/nextjs/special-files.md) resource shows what it does and doesn't catch. The layout sits outside the error boundary, so it keeps rendering.

## A Nested Layout

!!! abstract "Instructions"
    1. Create `app/recipes/layout.tsx`. It wraps `{children}` in a `<section>` with:
        - a `"Recipe book"` heading
        - links to **All recipes** and **Quick meals**
        - a footer line showing how many recipes there are
    2. Create `app/recipes/quick/page.tsx` that lists only recipes under 30 minutes.
    3. Visit `/recipes`, `/recipes/1`, `/recipes/quick` and `/about`. Which pages show the recipe layout? Which show the root layout?
    4. Create `app/recipes/error.tsx` with a recipe-specific error message. Temporarily add a throw to `app/recipes/quick/page.tsx`. Which error page appears, and is the recipe layout still visible?

??? hint "Hint - Click to expand"
    A nested layout receives `children` the same way the root layout does, but it must **not** include `<html>` or `<body>`. Import `recipes` from `@/app/data` to count them. Remember to remove the test throw afterwards.

## Loading States

!!! abstract "Instructions"
    1. Create `app/slow/page.tsx` as an `async` server component that waits two seconds before returning, then shows `"Finally loaded!"`.
    2. Visit `/slow`. What do you see while you wait?
    3. Create `app/slow/loading.tsx` with a loading message. Visit `/slow` again.
    4. Navigate to `/slow` using a link from the home page rather than typing the URL. Is the loading message the same?

??? hint "Hint - Click to expand"
    An `async` component can `await` a Promise that resolves after a delay, made with `new Promise((resolve) => setTimeout(resolve, 2000))`.

## Page Titles

!!! abstract "Instructions"
    1. Look at the browser tab's title on any page. Find where it comes from in `app/layout.tsx` and change it to your site's name.
    2. Export a `metadata` object from `app/about/page.tsx` with the title `"About"`. Check the tab.
    3. Give `/recipes` and `/recipes/quick` their own titles.
    4. Try exporting `metadata` from `app/crash/page.tsx`. Read the error, then remove it. Why doesn't it work there?

??? hint "Hint - Click to expand"
    `metadata` is a plain object with a `title` and, optionally, a `description`. It only works in server components, and the crash page starts with `"use client"`.

## From Memory: Movie Site

!!! abstract "Instructions"
    Without looking back, build a small movie site in a new folder, `app/movies/`, with your own data in `app/data.ts`:

    - A list page and an `async` `[id]` detail page that calls `notFound()` for unknown ids
    - A `not-found.tsx` just for movies
    - A nested `layout.tsx` with movie navigation
    - An `error.tsx` just for movies, tested with a temporary throw
    - A `metadata` title on the list page
