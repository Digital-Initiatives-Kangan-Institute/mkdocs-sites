# Fetching Data

Fetching data from APIs is a core skill for building dynamic web applications. This page covers making requests and handling responses. For this course we use the `.then()` style, which is easier to read when you are still learning.

---

## What is Asynchronous Code?

Most of your code runs synchronously (one line after another). Network requests are different — they take time, and you cannot block the whole page while waiting.

**Asynchronous** code lets you start a request and continue running other code while waiting for the response.

---

## Fetch with .then()

`fetch()` returns a **promise**. You handle the result with `.then()` callbacks:

```typescript
fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Fetch failed:", error));
```

- `fetch()` starts the request
- The first `.then()` receives the response and parses it as JSON
- The second `.then()` receives the parsed data
- `.catch()` handles any errors

---

## Understanding JSON Responses

When you call an API, the response body is a string. You parse it with `.json()`:

```typescript
fetch("https://dummyjson.com/products/1")
    .then(response => response.json())
    .then(product => {
        console.log(product.title);   // "iPhone 9"
        console.log(product.price);   // 549
    });
```

---

## Displaying Useful Fields

APIs often return more data than you need. Select only the fields relevant to your UI:

```typescript
fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        products.forEach(product => {
            console.log(`${product.title} - $${product.price}`);
        });
    });
```

---

## Connecting to Different Endpoints

The same fetch pattern works for any REST API. Just change the URL and adjust the fields you display:

```typescript
// Products
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => console.log(data));

// Users
fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => console.log(data));

// Posts
fetch("https://dummyjson.com/posts")
    .then(res => res.json())
    .then(data => console.log(data));
```

---

## Why .then() for Beginners

You may see `async` and `await` used in examples online. They do the same thing as `.then()` but with different syntax:

```typescript
// async/await style (shown for reference only — not needed for this course)
async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data);
}
```

For now, stick with `.then()`. It keeps the flow of data visible in one chain, and you only need to learn one syntax while you are also learning React and TypeScript.

---

## Summary

- Asynchronous code handles operations that take time (like network requests)
- Use `fetch()` with `.then()` callbacks to handle the response
- Always parse the response with `.json()`
- Select only the fields you need to display
- The fetch pattern is the same regardless of endpoint
