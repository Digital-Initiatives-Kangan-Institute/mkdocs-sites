# Tailwind CSS

This is a **guided, line-by-line build** of styles using Tailwind utility classes. You will style a card, then a button, then a navigation bar, then assemble them into a landing page — repeating the same utilities each time.

!!! abstract "Instructions"
    Create a Next.js app with Tailwind, then build the guided examples below and one page of your own. Your work must:

    - Use Tailwind utility classes (no custom CSS files)
    - Style at least a **card**, a **button**, and a **navigation bar**
    - Use at least one `hover:` variant and one responsive prefix (`sm:`/`md:`/`lg:`)
    - Assemble everything into a single landing page

    Push your work to GitHub.

    Revisit the [Tailwind CSS](../resources/tailwind/tailwind.md) resource while you work.

---

## Create an App with Tailwind

```bash
npx create-next-app@latest tailwind-practice --tailwind
```

The `--tailwind` flag makes `create-next-app` install and configure Tailwind automatically. Then:

```bash
cd tailwind-practice
npm run dev
```

---

## The Core Idea

Tailwind styles elements by adding utility classes to the `className` attribute:

```tsx
<p className="text-gray-600">Hello</p>
```

- `text-gray-600` makes the text a muted grey.
- Each class does one small thing; you compose several to build up a style.

---

## Style a Card

Replace `app/page.tsx` with a card:

```tsx
export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
                <h2 className="text-xl font-bold text-gray-900">Latte</h2>
                <p className="mt-2 text-gray-600">Smooth espresso with steamed milk.</p>
            </div>
        </main>
    );
}
```

Line by line:

1. **`<main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">`** — a full-height flex container that centres its child:
    - `flex` turns on flexbox
    - `min-h-screen` makes it at least as tall as the viewport
    - `items-center justify-center` centres the child both ways
    - `bg-gray-50 p-6` sets a light background and padding
2. **`<div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">`** — the card itself:
    - `max-w-sm` caps the width
    - `rounded-lg` rounds the corners
    - `border border-gray-200` adds a light grey border
    - `bg-white p-6 shadow` gives a white background, padding, and a drop shadow
3. **`<h2 className="text-xl font-bold text-gray-900">`** — large, bold, dark heading.
4. **`<p className="mt-2 text-gray-600">`** — a top margin and muted text.

---

## Repeat the Pattern: A Button

Style a button with the same colour and spacing ideas:

```tsx
export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <button className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
                Save
            </button>
        </main>
    );
}
```

Line by line:

1. **`rounded`** — rounded corners.
2. **`bg-indigo-500`** — indigo background.
3. **`px-4 py-2`** — horizontal and vertical padding.
4. **`text-white`** — white text.
5. **`hover:bg-indigo-600`** — a `hover:` variant: the background darkens only when the mouse is over the button.

The pattern repeats: **colour + padding + rounding**, just like the card.

---

## Repeat the Pattern Again: A Navigation Bar

Build a navigation bar **yourself** using the utilities you have used. Requirements:

- A dark background (`bg-gray-900`)
- A site name on the left, bold and white
- Links on the right in a horizontal row (`flex` + `gap-4`)
- Links turn white on hover (`hover:text-white`)

Write it from memory, then check the hint.

??? code "Check your work — click to expand"
    ```tsx
    <nav className="flex items-center justify-between bg-gray-900 px-6 py-4">
        <span className="text-lg font-bold text-white">My Site</span>
        <div className="flex gap-4">
            <a className="text-gray-300 hover:text-white" href="/">Home</a>
            <a className="text-gray-300 hover:text-white" href="/about">About</a>
            <a className="text-gray-300 hover:text-white" href="/contact">Contact</a>
        </div>
    </nav>
    ```

Line by line of the pattern:

- `flex items-center justify-between` — puts the name and links on opposite ends, vertically centred.
- `bg-gray-900 px-6 py-4` — dark background with padding.
- `text-gray-300 hover:text-white` — muted links that brighten on hover.

---

## Assemble a Landing Page

Now combine a nav, a hero, and three cards into one page. Use a responsive grid for the cards:

```tsx
export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <nav className="flex items-center justify-between bg-gray-900 px-6 py-4">
                <span className="text-lg font-bold text-white">My Site</span>
                <div className="flex gap-4">
                    <a className="text-gray-300 hover:text-white" href="/">Home</a>
                    <a className="text-gray-300 hover:text-white" href="/about">About</a>
                </div>
            </nav>

            <section className="px-6 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
                <p className="mt-4 text-gray-600">This page is styled entirely with Tailwind.</p>
                <button className="mt-6 rounded bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600">
                    Get started
                </button>
            </section>

            <section className="grid gap-4 px-6 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
                    <h2 className="text-xl font-bold text-gray-900">Fast</h2>
                    <p className="mt-2 text-gray-600">Styled in seconds with utilities.</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
                    <h2 className="text-xl font-bold text-gray-900">Responsive</h2>
                    <p className="mt-2 text-gray-600">Add a prefix and it adapts.</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
                    <h2 className="text-xl font-bold text-gray-900">Consistent</h2>
                    <p className="mt-2 text-gray-600">The same classes every time.</p>
                </div>
            </section>
        </main>
    );
}
```

Line by line, focusing on the new parts:

1. **`<section className="grid gap-4 px-6 md:grid-cols-3">`** — a grid with a gap. `md:grid-cols-3` means: on screens `md` and up, use **three columns**; below that, one column.
2. Each card repeats the exact card classes from earlier: `rounded-lg border border-gray-200 bg-white p-6 shadow`.
3. The hero repeats the button classes: `rounded bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600`.

Notice how the page is assembled from patterns you already practised — that is the repetition doing its job.

---

## Now You Try: Your Own Page

Build a page of your own (an about page, a pricing section, a product grid). Requirements:

- Reuse the card, button, and nav patterns from above
- Include at least one `hover:` variant and one responsive prefix
- No custom CSS — only Tailwind utility classes

??? hint "Hint - Click to expand"
    Start by copying the landing page structure, then change the colours and content. Change `bg-indigo-500` to another colour (e.g. `bg-emerald-500`) to see the `name-shade` system in action. Change `md:grid-cols-3` to `md:grid-cols-2` to see the grid respond.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Utility class** | A single-purpose style class (e.g. `p-4`) |
| **`className`** | The JSX attribute for applying classes (React's version of `class`) |
| **Variant** | A conditional prefix like `hover:` or `md:` |
| **Responsive prefix** | `sm:`/`md:`/`lg:` apply styles at breakpoints |
| **`name-shade`** | Tailwind's colour naming (e.g. `indigo-500`) |

---

## Summary

- Tailwind styles elements with utility classes in `className`
- Colour + padding + rounding is the repeating core pattern
- `hover:` adds state styles; `md:`/`lg:` add responsiveness
- Build once as patterns, then reuse them across the whole page
