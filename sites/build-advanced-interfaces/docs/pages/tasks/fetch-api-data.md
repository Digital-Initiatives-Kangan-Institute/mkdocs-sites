# Cafe Recipes Page

This is a **guided, line-by-line build** of a recipes page that fetches data from an API and displays each recipe as a card. You will repeat one card-building pattern thirty times, once per recipe.

!!! abstract "Instructions"
    Build the recipes page below. Your page must:

    - Fetch from `https://dummyjson.com/recipes` and display all 30 recipes
    - Show each recipe as a card in a **vertical flex list** (single column)
    - For each recipe show: name, image, cuisine, difficulty, prep and cook time, rating, calories per serving, and servings
    - Not hardcode any recipe data — build the cards from the API response
    - Link the page from your other cafe pages

    Push your work to GitHub.

    Revisit [Events and the DOM](../resources/javascript/events-and-dom.md) and [Working with APIs and Fetch](../resources/architecture/apis-and-fetch.md) while you work.

---

## The Recipes Page

Create `recipes.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipes — The Daily Grind</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="recipes.html">Recipes</a>
    </nav>

    <header>
        <h1>Our Recipes</h1>
        <p>Make your favourites at home.</p>
    </header>

    <section id="recipes" class="recipe-list"></section>

    <script src="recipes.js"></script>
</body>
</html>
```

**What this file does in one sentence:** it provides an empty container that JavaScript will fill with recipe cards.

Line by line:

1. The `<nav>` now links to three pages, including `recipes.html`.
2. **`<section id="recipes" class="recipe-list"></section>`** — the empty container. The `id` lets JavaScript find it; the `class` lets CSS style the list. There is no recipe markup here — it will be built by JavaScript.

---

## Fetch and Display Recipes

Create `recipes.js`:

```js
const container = document.getElementById("recipes");

function createCard(recipe) {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h2>${recipe.name}</h2>
        <p>Cuisine: ${recipe.cuisine}</p>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p>Prep & cook: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
        <p>Rating: ${recipe.rating} / 5</p>
        <p>Calories: ${recipe.caloriesPerServing} per serving</p>
        <p>Servings: ${recipe.servings}</p>
    `;

    return card;
}

function onJson(data) {
    const recipes = data.recipes;
    recipes.forEach(recipe => {
        container.appendChild(createCard(recipe));
    });
}

function onFetch(response) {
    response.json().then(onJson);
}

function loadRecipes() {
    fetch("https://dummyjson.com/recipes").then(onFetch);
}

loadRecipes();
```

**What this code does in one sentence:** it fetches the recipe list from the API and appends one card per recipe to the container.

Line by line:

1. **`const container = document.getElementById("recipes");`** — finds the empty `<section>` from the HTML.
2. **`function createCard(recipe) { ... }`** — a function that builds one card for one recipe and returns it.
3. **`const card = document.createElement("div");`** — creates a new `<div>` in memory.
4. **`card.className = "recipe-card";`** — gives it a class so CSS can style it.
5. **`card.innerHTML = \`...\`;`** — fills the card with HTML. The backticks are a template literal; each `${recipe.field}` inserts a value from the recipe object.
6. **`${recipe.prepTimeMinutes + recipe.cookTimeMinutes}`** — adds the two time fields into one "Prep & cook" total.
7. **`return card;`** — hands the finished card back to whoever called the function.
8. **`function onJson(data) { ... }`** — runs after parsing. It reads `data.recipes` (the array of all 30 recipes) and calls `forEach` to run `createCard` once per recipe, appending each result with `container.appendChild(...)`.
9. **`function onFetch(response) { response.json().then(onJson); }`** — parses the response, then calls `onJson`.
10. **`function loadRecipes() { fetch("https://dummyjson.com/recipes").then(onFetch); }`** — starts the request.
11. **`loadRecipes();`** — calls the function immediately so the page loads the recipes as soon as the script runs.

The chain is: **loadRecipes → fetch → onFetch → response.json() → onJson → createCard × 30 → append**.

---

## Style the Cards

Add these rules to `styles.css`:

```css
.recipe-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 2rem;
}

.recipe-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
}

.recipe-card img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}
```

Line by line:

1. **`.recipe-list { display: flex; flex-direction: column; }`** — lays the cards out in a single vertical column.
2. **`gap: 16px;`** — adds space between the cards.
3. **`.recipe-card { ... }`** — draws a border and padding around each card.
4. **`.recipe-card img { max-width: 100%; }`** — keeps images from overflowing their cards.

---

## Now You Try: Another Endpoint

Repeat the same pattern with a different DummyJSON endpoint, such as:

- `https://dummyjson.com/products` → `{ products: [...] }`
- `https://dummyjson.com/posts` → `{ posts: [...] }`
- `https://dummyjson.com/users` → `{ users: [...] }`

Build a new page that fetches and displays cards. Change the URL, the field names, and the card contents — keep the `createCard`/`onJson`/`onFetch`/`loadRecipes` structure identical.

??? hint "Hint - Click to expand"
    Look at the API response first to learn the field names (open the URL in a browser). Then only three things change: the `fetch` URL, the fields inside the template literal in `createCard`, and whether `onJson` reads `data.products`, `data.posts`, or `data.users`.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **API** | A URL that returns data your page can use |
| **`fetch`** | Starts an HTTP request |
| **`response.json()`** | Parses the response body into an object |
| **Template literal** | Backtick strings that insert values with `${...}` |
| **`forEach`** | Runs a function once for each item in an array |

---

## Summary

- Use an empty container in the HTML and fill it from JavaScript
- One `createCard` function builds every card; `forEach` repeats it
- The fetch chain is: `fetch(...).then(onFetch)` → `response.json().then(onJson)` → build cards
- Flexbox with `flex-direction: column` stacks the cards vertically
