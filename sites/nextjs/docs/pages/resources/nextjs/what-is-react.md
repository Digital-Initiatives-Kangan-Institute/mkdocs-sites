# What is React

Next.js is built on top of React, so understanding React fundamentals is essential before diving into the framework.

---

## What is React?

React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called **components**.

React was created by Facebook and is maintained by Meta and a community of developers. It is one of the most widely used front-end libraries in the industry.

---

## Why Components?

In traditional web development, you might build a page as one large HTML file. As the page grows, it becomes harder to manage and reuse parts of it.

React solves this by breaking the UI into components:

```
Page
 ├── NavBar
 ├── HeroBanner
 ├── ProductList
 │    ├── ProductCard
 │    ├── ProductCard
 │    └── ProductCard
 └── Footer
```

Each component is responsible for one piece of the interface. Components can be reused, combined, and tested independently.

---

## What Does a React Component Look Like?

A React component is a JavaScript function that returns JSX — a syntax that looks like HTML but lives inside JavaScript:

```tsx
function Greeting() {
    return <h1>Hello, welcome!</h1>;
}
```

You use components like custom HTML tags:

```tsx
function Page() {
    return (
        <div>
            <Greeting />
            <Greeting />
        </div>
    );
}
```

The `<Greeting />` tag renders whatever that component returns.

---

## Components with Props

Components can accept **props** (short for properties) to make them flexible:

```tsx
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

function Page() {
    return (
        <div>
            <Greeting name="Alice" />
            <Greeting name="Bob" />
        </div>
    );
}
```

The same component renders different content based on the props passed to it.

---

## JSX — JavaScript XML

Describing a UI as HTML-like markup is much easier to read than the equivalent nested JavaScript function calls, which is the point of JSX: you write what the interface should look like, and the compiler turns it into regular JavaScript.

JSX looks like HTML but has a few key differences:

```tsx
// HTML: class="container"
// JSX:  className="container"
<div className="container">

// Embed JavaScript with curly braces {}
<h1>{user.name}</h1>

// Self-closing tags must end with />
<img src="photo.jpg" alt="A photo" />
```

Under the hood, JSX is converted into regular JavaScript function calls. You can write React without JSX, but JSX is the standard approach.

---

## React vs a Framework

React itself is a **library** — it handles the view layer (the UI). It does not include:

- Routing
- Data fetching
- Server-side rendering
- File-based structure

Frameworks like **Next.js** build on top of React and add these features. When you write a Next.js app, you are still writing React components — Next.js just provides the structure around them.

---

## A Simple React Component in Next.js

```tsx
export default function WelcomeBanner() {
    return (
        <section>
            <h2>Welcome to My Site</h2>
            <p>Built with React and Next.js.</p>
        </section>
    );
}
```

This is a valid React component that works inside a Next.js app. Understanding this pattern is the foundation for everything that follows.

---

## Summary

- React is a UI library based on composable, reusable **components**
- Components are functions that return JSX (HTML-like syntax)
- Props let you pass data into components
- JSX uses `className` instead of `class` and curly braces `{}` for JavaScript
- React handles the UI layer — Next.js adds routing, data fetching, and more
