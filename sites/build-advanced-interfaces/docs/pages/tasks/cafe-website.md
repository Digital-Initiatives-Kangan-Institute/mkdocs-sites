# Cafe Website

This is a **guided, line-by-line build** of a three-page cafe website. You will repeat one core pattern — the HTML document structure — on every page, because repetition is how the structure becomes second nature.

!!! abstract "Instructions"
    Build the Home, Menu, and Reviews pages below in order. Each page is shown in full first, then explained line by line. After the Menu page you will repeat the structure again to build the Reviews page.

    Your finished site must have:

    - Three linked pages (Home, Menu, Reviews)
    - A heading, a welcome paragraph, and at least one image on Home
    - At least four menu items, each with a name, description, and price
    - A review form with a text input, a number input, a textarea, and a submit button
    - One external stylesheet using element, class, and ID selectors

    Push your site to GitHub. See the [Version Control](/version-control) site for help with staging, committing, and pushing.

---

## Set Up the Project Structure

Create a folder called `cafe-site` with these files:

```text
cafe-site/
├── index.html
├── menu.html
├── reviews.html
└── styles.css
```

All three HTML pages will link to the same `styles.css`.

---

## The Home Page

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Daily Grind</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="reviews.html">Reviews</a>
    </nav>

    <header class="hero">
        <h1>The Daily Grind</h1>
        <p>Your neighbourhood cafe for coffee, food, and good company.</p>
        <img src="cafe.jpg" alt="Inside our cafe">
    </header>

    <section>
        <h2>Welcome</h2>
        <p>Come in for a coffee, stay for the atmosphere.</p>
    </section>

    <footer id="footer">
        <p>The Daily Grind</p>
    </footer>
</body>
</html>
```

**What this file does in one sentence:** it is the home page, with navigation, a hero banner, a welcome section, and a footer.

Line by line:

1. **`<!DOCTYPE html>`** — tells the browser this is an HTML5 document. Every page starts with it.
2. **`<html lang="en">`** — the root element; `lang="en"` declares the page's language.
3. **`<head>`** — holds page metadata, not visible content.
4. **`<meta charset="UTF-8">`** — sets the character encoding so text displays correctly.
5. **`<meta name="viewport" ...>`** — makes the page responsive on phones.
6. **`<title>The Daily Grind</title>`** — the text shown on the browser tab.
7. **`<link rel="stylesheet" href="styles.css">`** — connects the external stylesheet to this page.
8. **`<nav>`** — the navigation. Three `<a>` links point at the three pages; `href` is the file name.
9. **`<header class="hero">`** — the banner. `class="hero"` lets CSS target it later.
10. **`<h1>`** — the main heading (the cafe name).
11. **`<img src="cafe.jpg" alt="Inside our cafe">`** — an image. `src` is the file, `alt` describes it for screen readers.
12. **`<section>`** — a content block with an `<h2>` heading and a paragraph.
13. **`<footer id="footer">`** — the page footer. `id="footer"` lets CSS target this single element.

---

## A Shared Stylesheet

Create `styles.css`. It uses all three selector types:

```css
/* Element selector — styles every element of this type */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    color: #333;
}

nav {
    background: #5d4037;
    padding: 1rem;
}

nav a {
    color: #fff;
    margin-right: 1rem;
    text-decoration: none;
}

/* Class selector — styles any element with class="hero" */
.hero {
    background: #f5e6d3;
    padding: 2rem;
    text-align: center;
}

.hero img {
    max-width: 100%;
    height: auto;
}

section {
    padding: 2rem;
}

/* ID selector — styles the single element with id="footer" */
#footer {
    background: #5d4037;
    color: #fff;
    text-align: center;
    padding: 1rem;
}
```

Line by line:

1. **`body { ... }`** — an *element selector* (no dot or hash). It styles every `<body>`.
2. **`font-family: Arial, sans-serif;`** — sets the font, with a fallback if Arial is missing.
3. **`margin: 0;`** — removes the browser's default margin around the page.
4. **`nav { ... }`** — styles every `<nav>` with a dark background and padding.
5. **`nav a { ... }`** — a *descendant selector*: it styles only `<a>` elements inside `<nav>`.
6. **`.hero { ... }`** — a *class selector* (starts with `.`). It targets `class="hero"`.
7. **`.hero img { ... }`** — styles images inside `.hero`, keeping them from overflowing.
8. **`#footer { ... }`** — an *ID selector* (starts with `#`). It targets the single `id="footer"` element.

Three selector types, three purposes: **element** for broad rules, **class** for reusable rules, **ID** for one unique element.

---

## Repeat the Pattern: The Menu Page

Create `menu.html`. Notice it repeats the same document structure, and the menu item repeats the same card structure four times:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu — The Daily Grind</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="reviews.html">Reviews</a>
    </nav>

    <header>
        <h1>Our Menu</h1>
    </header>

    <section class="menu">
        <div class="menu-item">
            <h2>Latte</h2>
            <p>Smooth espresso with steamed milk.</p>
            <p class="price">$4.50</p>
        </div>

        <div class="menu-item">
            <h2>Cappuccino</h2>
            <p>Espresso with foamed milk.</p>
            <p class="price">$5.00</p>
        </div>

        <div class="menu-item">
            <h2>Flat White</h2>
            <p>Strong espresso with velvety milk.</p>
            <p class="price">$4.80</p>
        </div>

        <div class="menu-item">
            <h2>Croissant</h2>
            <p>Buttery and flaky.</p>
            <p class="price">$3.50</p>
        </div>
    </section>

    <footer id="footer">
        <p>The Daily Grind</p>
    </footer>
</body>
</html>
```

**What this file does in one sentence:** it lists four menu items, each built from the same repeated structure.

Line by line, focusing on the new parts:

1. **`<title>Menu — The Daily Grind</title>`** — a different title for this page's tab.
2. **`<section class="menu">`** — a container for all the items.
3. **`<div class="menu-item">`** — one item. The `<div>` groups the item's name, description, and price.
4. **`<h2>Latte</h2>`** — the item name.
5. **`<p>Smooth espresso with steamed milk.</p>`** — the description.
6. **`<p class="price">$4.50</p>`** — the price, marked with a class so it can be styled separately.
7. The next three `<div class="menu-item">` blocks **repeat the exact same structure** with different content.

Add these rules to `styles.css`:

```css
.menu-item {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
}

.price {
    font-weight: bold;
    color: #5d4037;
}
```

- `.menu-item` draws a border and padding around each item.
- `.price` makes the price bold and cafe-brown.

---

## Repeat the Pattern Again: The Reviews Page

Now build `reviews.html` **yourself** by repeating the document structure a third time. It must include:

- The same `<head>` and stylesheet link
- The same `<nav>` with three links
- A heading
- A `<form>` containing:
    - A text input for the reviewer's name, with a `<label>`
    - A number input for a rating out of 5, with a `<label>`
    - A `<textarea>` for the comment, with a `<label>`
    - A submit button
- A section below the form for reviews to appear
- The same footer

Write it from memory first, then check the hint.

??? code "Check your work — click to expand"
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reviews — The Daily Grind</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <nav>
            <a href="index.html">Home</a>
            <a href="menu.html">Menu</a>
            <a href="reviews.html">Reviews</a>
        </nav>

        <header>
            <h1>Leave a Review</h1>
        </header>

        <section>
            <form id="review-form">
                <label for="name">Your name</label>
                <input type="text" id="name" name="name">

                <label for="rating">Rating out of 5</label>
                <input type="number" id="rating" name="rating" min="1" max="5">

                <label for="comment">Your review</label>
                <textarea id="comment" name="comment" rows="4"></textarea>

                <button type="submit">Submit review</button>
            </form>

            <h2>What our customers say</h2>
            <div id="reviews"></div>
        </section>

        <footer id="footer">
            <p>The Daily Grind</p>
        </footer>
    </body>
    </html>
    ```

Key points about the form:

- **`<label for="name">`** matches **`<input id="name">`** — the `for` and `id` must match so clicking the label focuses the input.
- **`<input type="number" min="1" max="5">`** — restricts the rating to a number between 1 and 5.
- **`<textarea rows="4">`** — a multi-line text box.
- **`<button type="submit">`** — submits the form. The form does not need to work yet.

---

## Now You Try: A Fourth Page

Add an About page (`about.html`) entirely **yourself**. Repeat the document structure a fourth time, add it to every page's `<nav>`, and style a heading with a new class selector. This repetition is what makes the structure stick.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Document structure** | The standard `<!DOCTYPE>` → `<html>` → `<head>` + `<body>` skeleton |
| **Element selector** | CSS that targets a tag name (e.g. `nav`) |
| **Class selector** | CSS that targets `class="..."` (e.g. `.hero`) |
| **ID selector** | CSS that targets `id="..."` (e.g. `#footer`) |
| **`<label for>`** | Ties a label to an input via matching `id` |

---

## Summary

- Every page repeats the same document structure; only the content changes
- Link pages together with `<a href="file.html">`
- Use element, class, and ID selectors for different purposes
- Forms pair `<label for>` with `<input id>`
