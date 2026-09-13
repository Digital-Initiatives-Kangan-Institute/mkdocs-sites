# Cafe Site Enhancements

This is a **guided, line-by-line build** of JavaScript interactions for your cafe site. You will repeat one core pattern — find an element, write a handler, listen for an event — across several features.

!!! abstract "Instructions"
    Work through the two guided examples below, then add a third interaction of your own. Every interaction must use:

    - An **event** (such as a button click or form submit)
    - A **function** that responds to the event
    - At least one **variable**

    Push your updated site to GitHub.

    Revisit [Events and the DOM](../resources/javascript/events-and-dom.md) while you work.

---

## Your First JavaScript Interaction

Add a button to a page that changes a heading when clicked. First the HTML:

```html
<button id="change-text">Change the heading</button>
<h2 id="heading">Original text</h2>

<script src="script.js"></script>
```

Then create `script.js`:

```js
const button = document.getElementById("change-text");
const heading = document.getElementById("heading");

function changeHeading() {
    heading.textContent = "The heading changed!";
}

button.addEventListener("click", changeHeading);
```

**What this code does in one sentence:** when the button is clicked, it replaces the heading's text.

Line by line:

1. **`const button = document.getElementById("change-text");`** — finds the button in the page by its `id` and stores it in a variable.
2. **`const heading = document.getElementById("heading");`** — finds the heading the same way.
3. **`function changeHeading() { ... }`** — the function that responds to the click.
4. **`heading.textContent = "The heading changed!";`** — changes the text inside the heading element.
5. **`button.addEventListener("click", changeHeading);`** — tells the browser "when `button` is clicked, run `changeHeading`". Note it is `changeHeading`, not `changeHeading()` — you pass the function, you do not call it.

The three ingredients of every interaction: **find the element** (lines 1–2), **decide what changes** (lines 3–5), **say when to run it** (line 7).

---

## Repeat the Pattern: Make the Review Form Work

Now use the same three ingredients to make your Reviews form functional. The HTML (from the cafe website):

```html
<form id="review-form">
    <label for="name">Your name</label>
    <input type="text" id="name" name="name">

    <label for="comment">Your review</label>
    <textarea id="comment" name="comment" rows="4"></textarea>

    <button type="submit">Submit review</button>
</form>

<div id="reviews"></div>

<script src="script.js"></script>
```

Add this to `script.js`:

```js
const form = document.getElementById("review-form");
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const reviews = document.getElementById("reviews");

function addReview(event) {
    event.preventDefault();

    const name = nameInput.value;
    const comment = commentInput.value;

    const review = document.createElement("div");
    review.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;

    reviews.appendChild(review);

    form.reset();
}

form.addEventListener("submit", addReview);
```

**What this code does in one sentence:** when the form is submitted, it adds the visitor's review to the page without reloading.

Line by line:

1. **`const form = document.getElementById("review-form");`** — finds the form.
2. **`const nameInput = ...`, `const commentInput = ...`, `const reviews = ...`** — find the two inputs and the output container.
3. **`function addReview(event) { ... }`** — the handler. `event` is the submit event object the browser passes in.
4. **`event.preventDefault();`** — stops the browser's default behaviour (reloading the page) so the review stays on screen.
5. **`const name = nameInput.value;`** — reads whatever the visitor typed into the name input.
6. **`const comment = commentInput.value;`** — reads the review text.
7. **`const review = document.createElement("div");`** — creates a brand-new `<div>` element in memory.
8. **`review.innerHTML = \`<strong>${name}</strong><p>${comment}</p>\`;`** — fills the new `<div>` with HTML. The backticks and `${...}` are a template literal that inserts the values.
9. **`reviews.appendChild(review);`** — adds the new element into the reviews container so it appears on screen.
10. **`form.reset();`** — clears the inputs ready for the next review.
11. **`form.addEventListener("submit", addReview);`** — the same listen pattern, but for the form's `submit` event instead of `click`.

Same three ingredients as before, one new twist: `event.preventDefault()` keeps the page from reloading.

---

## Now You Try: A Third Interaction

Add a third interaction to your cafe site **yourself**. Ideas:

- A **like counter** that increases when a button is clicked
- A **dark mode** toggle that switches a class on the body
- A **show/hide** button that toggles a section's visibility

Requirements: find an element, write a handler, listen for an event. Write it from memory before checking the hint.

??? hint "Hint - Click to expand"
    Copy the first example's shape and change three things: which element you find, what the handler does, and which event you listen for. For a counter, keep a `let count = 0;` variable and do `count = count + 1;` inside the handler before updating the element's text.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **`getElementById`** | Finds a single element by its `id` |
| **Event** | Something the user does (click, submit, keypress) |
| **Event handler** | A function that runs when an event happens |
| **`addEventListener`** | Attaches a handler to an element for a specific event |
| **`preventDefault`** | Stops the browser's default action (like reloading) |

---

## Summary

- Every interaction is: find the element → write a handler → listen for an event
- Pass functions to `addEventListener` without calling them
- `event.preventDefault()` stops a form from reloading the page
- Read inputs with `.value` and change content with `.textContent` or `.innerHTML`
