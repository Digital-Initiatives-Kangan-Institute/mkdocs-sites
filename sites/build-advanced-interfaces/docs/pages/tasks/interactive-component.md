# Interactive Component

This is a **guided, line-by-line build** of components that respond to user input. You will build a counter, then a toggle, then a third feature of your own — each one repeats the same three ingredients: **state**, an **event handler**, and an **`onClick`**.

!!! abstract "Instructions"
    Work through the two guided components below, then build a third interactive feature yourself. For every component:

    - Use `useState` for at least one state variable
    - Use at least one event handler (`onClick`, `onChange`, etc.)
    - Make a visible change on screen when the user interacts
    - Start the file with `"use client"`

    Push your work to GitHub.

    Revisit [Events and State](../resources/nextjs/events-and-state.md) and [Client and Server Components](../resources/nextjs/client-server-components.md) while you work.

---

## The Counter

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
            <button onClick={increment}>Add one</button>
        </div>
    );
}
```

**What this file does in one sentence:** it shows a number that goes up by one each time the button is clicked.

Line by line:

1. **`"use client";`** — this file uses state and an event handler, so it must run in the browser. The directive must be the first line.
2. **`import { useState } from "react";`** — imports the `useState` hook.
3. **`export default function Counter() { ... }`** — the component definition.
4. **`const [count, setCount] = useState(0);`** — creates a piece of state called `count` starting at `0`. `setCount` is the only way to change it.
5. **`function increment() { setCount(count + 1); }`** — an event handler. It reads the current `count`, adds one, and passes the result to `setCount`. Changing state makes React re-render with the new value.
6. **`<p>Count: {count}</p>`** — `{count}` embeds the current state into the JSX.
7. **`<button onClick={increment}>Add one</button>`** — attaches the handler to the button. Note it is `onClick={increment}`, **not** `onClick={increment()}` — you pass the function, you do not call it.

---

## Repeat the Pattern: A Toggle

The same three ingredients in a new shape:

```tsx
"use client";

import { useState } from "react";

export default function Toggle() {
    const [isOn, setIsOn] = useState(false);

    function flip() {
        setIsOn(!isOn);
    }

    return (
        <div>
            <p>The switch is {isOn ? "on" : "off"}.</p>
            <button onClick={flip}>Flip</button>
        </div>
    );
}
```

**What this file does in one sentence:** it flips a switch between "on" and "off" each time the button is clicked.

Line by line:

1. **`const [isOn, setIsOn] = useState(false);`** — state starts as `false` (the switch is off).
2. **`function flip() { setIsOn(!isOn); }`** — `!isOn` is "the opposite of the current value". If it is on, turn it off; if off, turn it on.
3. **`{isOn ? "on" : "off"}`** — a **ternary**: if `isOn` is true show "on", otherwise show "off".
4. **`<button onClick={flip}>Flip</button>`** — same `onClick` pattern as the counter.

Notice the repeating shape in both components:

| Ingredient | Counter | Toggle |
|---|---|---|
| State | `const [count, setCount] = useState(0)` | `const [isOn, setIsOn] = useState(false)` |
| Handler | `function increment()` | `function flip()` |
| Update | `setCount(count + 1)` | `setIsOn(!isOn)` |
| Trigger | `onClick={increment}` | `onClick={flip}` |

---

## Now You Try: A Third Feature

Build a third interactive component **yourself**, repeating the same pattern. Choose one:

- A **"like" button** that counts likes
- A **text input** that updates a heading as you type (use `onChange` instead of `onClick`)
- A **list** where a button adds an item each click
- A **counter** with two buttons: add and subtract

Requirements: `"use client"` at the top, one `useState`, one handler, one visible change.

??? hint "Hint - Click to expand"
    Copy the counter's skeleton and change three things: the state's starting value, what the handler does, and what the JSX shows. For the text input version, replace the `<button>` with `<input value={...} onChange={e => setText(e.target.value)} />`.

---

## Full Flow: What Happens on a Click

1. The page renders and shows `Count: 0`.
2. The visitor clicks **Add one**.
3. React calls `increment`.
4. `increment` calls `setCount(1)`.
5. React notices the state changed and **re-renders** the component.
6. The page now shows `Count: 1`.
7. Every further click repeats steps 2–6 with the new value.

---

## Common Beginner Pitfalls

1. **Calling the handler instead of passing it** — `onClick={increment()}` runs the function immediately on render and breaks. Use `onClick={increment}`.

2. **Mutating state directly** — never write `count = count + 1` or `count++`. State only changes through `setCount`, otherwise React does not know to re-render.

3. **Missing `"use client"`** — a component using `useState` without the directive will fail.

4. **Forgetting the current value** — `setCount(count + 1)` uses the latest `count`. Writing `setCount(1)` twice would always set `1` instead of counting up.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **State** | Memory that persists between renders; changing it re-renders the UI |
| **`useState`** | The hook that creates state; returns `[value, setter]` |
| **Event handler** | A function that runs when an event (like a click) happens |
| **`onClick`** | The JSX prop that attaches a handler to an element |
| **Re-render** | What React does when state changes to update the screen |

---

## Summary

- `useState(initialValue)` returns a value and its setter
- Change state only with the setter, never by direct assignment
- Pass handlers as `onClick={handler}`, not `onClick={handler()}`
- Every interactive feature repeats the same pattern: state + handler + event
