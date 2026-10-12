# Dynamic Routes with useParams

These exercises practise dynamic route folders like `app/books/[id]/page.tsx`, reading the URL with `useParams`, using `.find()` to get one item, ternaries for "not found" and for details on the page, and linking between list and detail pages.

Revisit [Dynamic Routes and useParams](../resources/nextjs/dynamic-routes.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-08`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-08
    cd activity-08
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    In these exercises, pages go in named folders like `app/books` and `app/movies` instead of `app/task1`. **Every page starts with `"use client";` on line 1.**

    Create `app/data.ts` with the shared data below.

??? code "click to expand"
    ```tsx
    // app/data.ts
    export type Book = {
        id: number;
        title: string;
        author: string;
        year: number;
        available: boolean;
        rating: number; // 1 to 5
    };

    export const books: Book[] = [
        { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, available: true, rating: 5 },
        { id: 2, title: "Dune", author: "Frank Herbert", year: 1965, available: false, rating: 4 },
        { id: 3, title: "Matilda", author: "Roald Dahl", year: 1988, available: true, rating: 4 },
        { id: 4, title: "Holes", author: "Louis Sachar", year: 1998, available: false, rating: 3 },
    ];

    export type Movie = {
        id: number;
        title: string;
        year: number;
        rating: "G" | "PG" | "M" | "MA15+";
        watched: boolean;
    };

    export const movies: Movie[] = [
        { id: 1, title: "Toy Story", year: 1995, rating: "G", watched: true },
        { id: 2, title: "Spirited Away", year: 2001, rating: "PG", watched: false },
        { id: 3, title: "The Matrix", year: 1999, rating: "M", watched: true },
        { id: 4, title: "Mad Max: Fury Road", year: 2015, rating: "MA15+", watched: false },
    ];

    export type Student = {
        id: number;
        name: string;
        mark: number;
    };

    export const students: Student[] = [
        { id: 101, name: "Aisha", mark: 82 },
        { id: 102, name: "Ben", mark: 47 },
        { id: 103, name: "Chloe", mark: 66 },
    ];
    ```

!!! warning "Every [id] folder needs a loading.tsx"
    Whenever you make a `[something]/page.tsx` that uses `useParams`, make a `loading.tsx` next to it. Without it, Next.js shows an error about `useParams()` being used outside of `<Suspense>`.

    ```tsx
    // app/books/[id]/loading.tsx
    const Loading = () => <p>Loading…</p>;

    export default Loading;
    ```

## Books List

!!! abstract "Instructions"
    Create `app/books/page.tsx`.

    1. Import `Link` from `"next/link"` and `books` from `"@/app/data"`.
    2. Map over the books. Each one is a link to its detail page, built with a template literal: `` href={`/books/${book.id}`} ``.
    3. Next to each title, use ternaries for `"✅ Available"` / `"❌ On loan"`.
    4. Add a `"Classic"` label, but only for books written before 1950.

## Book Detail Page

!!! abstract "Instructions"
    Create `app/books/[id]/page.tsx` **and** `app/books/[id]/loading.tsx`.

    1. Get the id from the URL with `useParams<{ id: string }>()`.
    2. Find the book with `.find()` and an arrow function. Remember `params.id` is a string, so convert it with `Number()` before comparing.
    3. `book` might be `undefined` (try visiting `/books/99`), so use a ternary for the whole page: the book details, or `"Sorry, no book with id …"`.
    4. Show the author, the year and `"Available to borrow"` / `"Currently on loan"`.
    5. Add a `← Back to books` link that shows in every case.

    **Check:** click each book from `/books`, then try `/books/99` and `/books/banana`.

??? hint "Hint - Click to expand"
    A ternary branch can only return one element, but the book details are a heading and several paragraphs. Wrap them in a fragment `<> </>`. Put the back link **outside** the ternary so it always shows.

    ![How /books/2 becomes useParams { id: "2" }, then a book from find, then a ternary](../../assets/diagrams/08-url-to-params.svg)

## Fancier Detail Page

!!! abstract "Instructions"
    Still in `app/books/[id]/page.tsx`:

    1. Show the rating as stars: `"★".repeat(book.rating) + "☆".repeat(5 - book.rating)`.
    2. Add a label using a nested ternary: 5 = `"Must read"`, 4 = `"Great"`, anything else = `"Good"`.
    3. Show `"Published X years ago"`, with a ternary for "year" / "years".
    4. Add **← Previous** and **Next →** links. Show each one only if that book exists.
    5. Add a `borrowed` state and a button that toggles between `"Borrow"` / `"Return"`. Disable it if the book isn't `available`, with the text `"Not available"`. The button only changes what the page shows; the data in `data.ts` stays the same.

??? hint "Hint - Click to expand"
    `new Date().getFullYear()` gives the current year. To find the previous and next books, use `.find()` twice more, looking for the ids one below and one above the current one. Each result might be `undefined`, so `&&` works well for showing the links.

## Movies

!!! abstract "Instructions"
    Build the same pattern again, from memory as much as you can:

    - `app/movies/page.tsx`: lists all movies as links. Use ternaries to show `"👀 Watched"` / `"📌 Watchlist"`.
    - `app/movies/[id]/page.tsx`: shows one movie, or `"Movie not found"`. Don't forget its `loading.tsx`!

    On the detail page, add:

    1. A ternary that shows a ⚠️ warning for `"MA15+"` movies only: `"You must be 15+ to watch this"`.
    2. A nested ternary describing the rating: `"G"` → `"Everyone"`, `"PG"` → `"Parental guidance"`, `"M"` → `"Mature audiences"`, `"MA15+"` → `"15 and over only"`.
    3. A **Mark as watched** / **Mark as unwatched** toggle button (local state starting from `movie.watched`).

??? hint "Hint - Click to expand"
    If you call `useState(movie.watched)` you'll get an error, because `movie` might be `undefined`. Use one more ternary to give a fallback starting value when there's no movie.

## Different Param Name

!!! abstract "Instructions"
    You choose the name in the square brackets, and it becomes the property name in `useParams`.

    1. Create `app/students/page.tsx`, which lists students as links to `/students/101` and so on.
    2. Create `app/students/[studentId]/page.tsx` (and its `loading.tsx`). This time read `params.studentId`, and give `useParams` the matching type.
    3. Show the student's name, mark, `"Competent"` / `"Not Yet Competent"`, and a grade with a nested ternary.
    4. Show `"Student not found"` for unknown ids.

    **Think:** rename the folder to `[sid]` but leave the code as `params.studentId`. What happens? Change it back.

## Detail Page with fetch

!!! abstract "Instructions"
    This exercise uses `useParams`, `useEffect`, `fetch` and the four states together.

    1. Create `public/books.json` with the same 4 books as JSON (copy the array from `data.ts` and put double quotes around all the keys).
    2. Create `app/library/page.tsx`, which fetches `/books.json` in `useEffect` and lists the books as links to `/library/[id]`. Show loading and error states with ternaries.
    3. Create `app/library/[id]/page.tsx` (and its `loading.tsx`):
        - Get `id` with `useParams`
        - In `useEffect`, fetch `/books.json`, then use `.find()` to get the matching book
        - Store it in a `book` state (`useState<Book | null>(null)`)
        - Use `[params.id]` as the effect's dependency array
        - Render four states: loading, error, not found (`book === null`) and the book

??? hint "Hint - Click to expand"
    `.find()` gives `undefined` when nothing matches, but your state holds `Book | null`. The `??` operator means "if the thing on the left is `undefined` (or `null`), use the thing on the right instead", so you can turn the `.find()` result into `null` before storing it.

## From Memory: Your Own Data

!!! abstract "Instructions"
    Without looking, make up your own data (recipes, games, footy players, cars, anything you like) with at least 4 items. Each item needs an `id`, a name, one boolean and one number. Then build:

    - `app/<things>/page.tsx`: a list page with links and at least two ternaries per item
    - `app/<things>/[id]/page.tsx` + `loading.tsx`: a detail page with `useParams`, a "not found" ternary, a nested ternary and a toggle button
