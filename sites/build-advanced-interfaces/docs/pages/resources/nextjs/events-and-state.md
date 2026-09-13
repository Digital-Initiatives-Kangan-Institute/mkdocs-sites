# Events and State

Interactive web applications respond to user actions. In Next.js/React, you use **events** to detect actions and **state** to track changes.

Both events and state require a **client component**. Add `"use client"` as the first line of any file that uses them (see [Client and Server Components](client-server-components.md)).

---

## Event Handling in React

Events are how the browser tells your code what the user did. A `<button>` on its own renders but does nothing when clicked — attaching an `onClick` handler is what connects a user action to your code.

React uses camelCase event names passed as props:

```tsx
"use client";

export default function Button() {
    function handleClick() {
        console.log("Button clicked!");
    }

    return <button onClick={handleClick}>Click me</button>;
}
```

Common events:

| Event | Trigger |
|---|---|
| `onClick` | Mouse click |
| `onChange` | Input value changes |
| `onSubmit` | Form submission |
| `onMouseEnter` | Mouse enters element |

---

## What is State?

State is data that can change over time. It exists because a plain JavaScript variable is reset on every render and would never update the screen — React does not watch ordinary variables. Change state through its setter, though, and React re-renders the component to reflect the new value.

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increase</button>
        </div>
    );
}
```

- `useState(0)` creates a state variable called `count` with an initial value of `0`
- `setCount` is the function used to update the value
- When `setCount` is called, the component re-renders with the new value

---

## Building Interactive Components

Small interactive components are great practice. Here are common examples:

### Counter

```tsx
const [count, setCount] = useState(0);
```

### Toggle

```tsx
const [isOn, setIsOn] = useState(false);

function toggle() {
    setIsOn(!isOn);
}
```

### Filter

```tsx
const [search, setSearch] = useState("");

let filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
);
```

### Favourites

```tsx
const [favourites, setFavourites] = useState<string[]>([]);

function toggleFavourite(id: string) {
    if (favourites.includes(id)) {
        setFavourites(favourites.filter(f => f !== id));
    } else {
        setFavourites([...favourites, id]);
    }
}
```

---

## Events and State Together

Events trigger state changes, and state changes update the UI:

```tsx
"use client";

export default function ToggleMessage() {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setVisible(!visible)}>
                Toggle
            </button>
            {visible && <p>Now you see me!</p>}
        </div>
    );
}
```

---

## Arrow Functions in Event Handlers

Arrow functions are commonly used for inline event handlers:

```tsx
<button onClick={() => setCount(count + 1)}>Add</button>
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

---

## Summary

- Events like `onClick` let you respond to user actions
- `useState` creates state that persists across renders
- Changing state with the setter function triggers a re-render
- Combine events and state to build interactive components
- Arrow functions provide concise syntax for event handlers
