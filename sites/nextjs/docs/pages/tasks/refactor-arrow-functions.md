# Refactor with Arrow Functions

This is a **guided refactor**. You will take a working component written with traditional `function` syntax and convert it to arrow functions, then repeat the process on your own code.

!!! abstract "Instructions"
    Follow the guided refactor below, then apply the same changes to one of your own components. Your refactored code must:

    - Use arrow function syntax for event handlers and callbacks
    - Behave exactly the same as before
    - Be easier to read than the original

    Document three improvements you made. Push your work to GitHub.

    Revisit [Arrow Functions](../resources/nextjs/arrow-functions.md) while you work.

---

## Before: Traditional Functions

Here is a working todo list that uses the `function` keyword:

```tsx
"use client";

import { useState } from "react";

export default function TodoList() {
    const [items, setItems] = useState<string[]>(["Learn React"]);

    function addItem() {
        setItems([...items, "New item"]);
    }

    function removeItem(index: number) {
        setItems(items.filter((_, i) => i !== index));
    }

    return (
        <div>
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**What this file does in one sentence:** it shows a list of items with an Add button and a Remove button per item.

---

## After: Arrow Functions

```tsx
"use client";

import { useState } from "react";

export default function TodoList() {
    const [items, setItems] = useState<string[]>(["Learn React"]);

    const addItem = () => {
        setItems([...items, "New item"]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

Line by line, comparing before and after:

1. **`function addItem() { ... }` → `const addItem = () => { ... };`** — the function is now assigned to a `const`. This signals that `addItem` should not be reassigned, and it reads left-to-right: "addItem is a function that does...".
2. **`function removeItem(index: number) { ... }` → `const removeItem = (index: number) => { ... };`** — the parameter list moves between the parentheses after the arrow.
3. **`() => removeItem(index)`** — this inline arrow was already an arrow function. It stays the same: an arrow is required here because `removeItem` needs an argument, and the wrapper delays the call until the click happens.
4. **Behaviour unchanged** — `setItems([...items, "New item"])` still spreads the old array and appends a new item; `items.filter((_, i) => i !== index)` still removes the item at `index`.

The key rule: `function name(params) { body }` becomes `const name = (params) => { body };`.

---

## Why It Helps

- **Consistency** — event handlers, callbacks, and inline arrows all use the same `=>` style.
- **Clarity** — `const addItem = () => ...` reads like a definition, not a statement.
- **Safety** — a `const` cannot accidentally be reassigned later.

---

## Now You Try: Refactor Your Own Component

Pick one of your existing components (for example your interactive component) and repeat the refactor:

1. Find every `function handler(...) { ... }` used as an event handler or callback.
2. Convert each to `const handler = (...) => { ... };`.
3. Run the app and confirm nothing changed on screen.
4. Write down three improvements the refactor made.

??? hint "Hint - Click to expand"
    Only refactor functions you pass to JSX events or array methods like `.map` and `.filter`. The component itself (`export default function TodoList()`) can stay a regular function — arrow components are a style choice, not a requirement.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Arrow function** | Shorter syntax: `(params) => { body }` |
| **Traditional function** | `function name(params) { body }` |
| **Callback** | A function passed to another function to be called later |
| **Event handler** | A function that runs when an event happens |

---

## Summary

- Arrow functions use `=>` and are often assigned to `const`
- Converting is mechanical: move the name left of `=`, add `=>`, keep the body
- Refactoring should never change behaviour — test before and after
