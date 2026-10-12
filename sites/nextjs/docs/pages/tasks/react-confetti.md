# React Confetti

This is a **guided, line-by-line build** using the `react-confetti` package. You will trigger confetti on a button click, then wire it into a meaningful moment in your own app.

!!! abstract "Instructions"
    Install `react-confetti`, build the guided example below, then integrate confetti into a real feature of your app. Your integration must:

    - Show confetti only after the user completes something (form submitted, quiz correct, counter reaches a target)
    - Use `useState` to control whether confetti is shown
    - Have a way to dismiss or restart it

    Push your work to GitHub.

---

## Install the Package

```bash
npm install react-confetti
```

This downloads the package into `node_modules/` and records it in `package.json`.

---

## The Guided Example

```tsx
"use client";

import { useState } from "react";
import Confetti from "react-confetti";

export default function Celebration() {
    const [celebrate, setCelebrate] = useState(false);

    function startParty() {
        setCelebrate(true);
    }

    return (
        <div>
            <button onClick={startParty}>Celebrate!</button>
            {celebrate && (
                <Confetti
                    recycle={false}
                    numberOfPieces={200}
                />
            )}
        </div>
    );
}
```

**What this file does in one sentence:** it bursts confetti across the screen when the visitor clicks the button.

Line by line:

1. **`"use client";`** — `react-confetti` reads the browser's window size, so the component must run in the browser.
2. **`import { useState } from "react";`** — imports state to control whether confetti shows.
3. **`import Confetti from "react-confetti";`** — imports the `<Confetti>` component as the default export.
4. **`const [celebrate, setCelebrate] = useState(false);`** — starts `false`: no confetti until the user earns it.
5. **`function startParty() { setCelebrate(true); }`** — the button handler turns confetti on.
6. **`<button onClick={startParty}>Celebrate!</button>`** — the trigger.
7. **`{celebrate && ( <Confetti ... /> )}`** — renders confetti only while `celebrate` is `true`.
8. **`recycle={false}`** — tells the animation to finish once and stop, rather than looping forever.
9. **`numberOfPieces={200}`** — how many pieces of confetti fall.

The pattern is the same one from the interactive component: **state → handler → `onClick` → visible change**.

---

## Repeat the Pattern: Make It Meaningful

Confetti should celebrate a real achievement, not just any click. Here is the same idea tied to a counter reaching a target:

```tsx
"use client";

import { useState } from "react";
import Confetti from "react-confetti";

export default function GoalCounter() {
    const [score, setScore] = useState(0);
    const [won, setWon] = useState(false);

    function addPoint() {
        const next = score + 1;
        setScore(next);
        if (next >= 5) {
            setWon(true);
        }
    }

    function restart() {
        setScore(0);
        setWon(false);
    }

    return (
        <div>
            <p>Score: {score} / 5</p>
            <button onClick={addPoint}>Add point</button>

            {won && <Confetti recycle={false} numberOfPieces={300} />}
            {won && <button onClick={restart}>Play again</button>}
        </div>
    );
}
```

Line by line:

1. **`const [score, setScore] = useState(0);`** — state for the score.
2. **`const [won, setWon] = useState(false);`** — a second piece of state for "has the goal been reached".
3. **`function addPoint() { ... }`** — adds a point, then checks `if (next >= 5)` to flip `won` to `true`.
4. **`function restart() { setScore(0); setWon(false); }`** — resets both values, which hides the confetti and allows another round.
5. **`{won && <Confetti ... />}`** — confetti appears only when the goal is reached, not on every click.
6. **`{won && <button onClick={restart}>Play again</button>}`** — a way to dismiss and restart.

---

## Now You Try: Your Own Trigger

Wire confetti into one of your existing features. Choose a scenario (or invent one):

- Confetti fires after a form is submitted successfully
- Confetti fires when a quiz score is above a threshold
- Confetti fires after completing a multi-step process

Requirements: `useState` controls the confetti, and there is a way to dismiss or restart it.

??? hint "Hint - Click to expand"
    Add a boolean state like `won` or `submitted`. Set it to `true` at the success moment, and render `{won && <Confetti recycle={false} />}`. To dismiss, provide a button that sets the state back to `false`. Check the [react-confetti documentation](https://www.npmjs.com/package/react-confetti) for props like `gravity`, `colors`, and `run`.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Package** | Reusable code installed from npm |
| **Default import** | `import Confetti from "react-confetti"` — the package's main export |
| **Props** | Inputs to a component (e.g. `recycle`, `numberOfPieces`) |
| **Conditional render** | `{won && <Confetti />}` — render only when a condition is true |

---

## Summary

- Install packages with `npm install <name>`
- `react-confetti` needs `"use client"` because it reads browser window size
- Use a boolean state to turn confetti on and off
- `recycle={false}` makes it finish once instead of looping
- Trigger confetti on a real achievement, not a bare click
