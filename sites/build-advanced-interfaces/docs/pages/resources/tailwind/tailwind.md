# Tailwind CSS

Tailwind is a **utility-first CSS framework**. Instead of writing CSS rules in a separate stylesheet, you add small utility classes directly to your JSX elements.

---

## What is Tailwind?

Traditional CSS writes a rule once and applies a class name:

```css
.button {
    background-color: #3f51b5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
}
```

```html
<button class="button">Save</button>
```

Tailwind inverts this: each class is a tiny, single-purpose style, and you compose them on the element:

```html
<button class="bg-indigo-500 text-white px-4 py-2 rounded">Save</button>
```

- `bg-indigo-500` — indigo background
- `text-white` — white text
- `px-4 py-2` — horizontal and vertical padding
- `rounded` — rounded corners

The advantage: you style directly in the markup, with no separate CSS file and no naming decisions.

---

## Setting Up Tailwind in Next.js

The easiest way is to let `create-next-app` do it:

```bash
npx create-next-app@latest my-app --tailwind
```

Or, when the prompt asks "Would you like to use Tailwind CSS?", answer **Yes**.

`create-next-app` installs Tailwind and configures your `globals.css` automatically — there is nothing else to set up.

---

## How Utility Classes Work

Each class maps to roughly one CSS property:

| Class | What it does |
|---|---|
| `p-4` | Padding on all sides (1rem) |
| `px-4` | Padding left and right only |
| `py-2` | Padding top and bottom only |
| `m-4` / `mt-2` | Margin (all / top only) |
| `text-white` | White text colour |
| `text-xl` | Extra-large font size |
| `font-bold` | Bold text |
| `bg-gray-100` | Light grey background |
| `rounded` | Rounded corners |
| `flex` | `display: flex` |
| `gap-4` | Gap between flex/grid children |
| `items-center` | `align-items: center` |
| `justify-between` | `justify-content: space-between` |
| `border` | 1px border |
| `shadow` | Box shadow |

---

## Colours

Colours follow a `name-shade` pattern: `bg-indigo-500`, `text-gray-900`, `border-red-300`. Lower numbers are lighter, higher numbers are darker:

```
bg-gray-100   (very light)
bg-gray-500   (mid)
bg-gray-900   (very dark)
```

---

## Hover and Responsive Variants

Prefix a class with `hover:` to apply it only on hover:

```html
<button class="bg-indigo-500 hover:bg-indigo-600">Save</button>
```

Prefix with `sm:`, `md:`, or `lg:` to apply at a breakpoint:

```html
<div class="grid md:grid-cols-2 lg:grid-cols-3">...</div>
```

- On small screens: one column (default)
- On `md` screens and up: two columns
- On `lg` screens and up: three columns

---

## Example: A Card

```tsx
<div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
    <h2 className="text-xl font-bold text-gray-900">Latte</h2>
    <p className="mt-2 text-gray-600">Smooth espresso with steamed milk.</p>
</div>
```

Line by line:

- `max-w-sm` — caps the card width
- `rounded-lg` — larger rounded corners
- `border border-gray-200` — a light grey border
- `bg-white p-6 shadow` — white background, padding, and a drop shadow
- `text-xl font-bold text-gray-900` — large, bold, dark heading
- `mt-2 text-gray-600` — a small top margin and muted text colour

---

## Summary

- Tailwind is utility-first: style with small classes directly in the markup
- `create-next-app --tailwind` sets everything up
- Colours use `name-shade` (e.g. `bg-indigo-500`)
- `hover:` and `sm:`/`md:`/`lg:` prefixes add states and responsiveness
- Compose classes to build up a complete style, e.g. `bg-white p-6 rounded-lg shadow`
