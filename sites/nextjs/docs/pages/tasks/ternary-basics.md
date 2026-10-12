# Ternary Basics

These exercises practise rewriting `if / else` as a ternary, using a ternary in three places (in a variable, directly in JSX, and inside an arrow function), and nested ternaries, including when *not* to use them.

Revisit [Conditional Rendering](../resources/nextjs/conditional-rendering.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-03`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-03
    cd activity-03
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …), starting from the starter below. **Every page starts with `"use client";` on line 1.**

??? code "click to expand"
    ```tsx
    "use client";

    import { useState } from "react";

    const Task1 = () => {
        return (
            <main>
                <h1>Task 1</h1>
            </main>
        );
    };

    export default Task1;
    ```

## The Three Places

Unless an exercise says otherwise, write each ternary all three ways:

```tsx
// A. Stored in a variable, then used in JSX
const message = isLoggedIn ? "Welcome back!" : "Please log in";
return <p>{message}</p>;

// B. Directly inside the JSX
return <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>;

// C. Inside an arrow function you call from the JSX
const getMessage = (loggedIn: boolean) => (loggedIn ? "Welcome back!" : "Please log in");
return <p>{getMessage(isLoggedIn)}</p>;
```

## Logged In or Logged Out

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Make an `isLoggedIn` state (starting `false`) and a **Toggle login** button.
    2. First, write it the long way. Use `if / else` (above the `return`) to set a `message` variable to either `"Welcome back!"` or `"Please log in"`, and show it.
    3. Now show the same message using A, B and C. You should end up with four `<p>`s that always agree.

??? hint "Hint - Click to expand"
    For the `if / else` version, declare the variable with `let` first (without a value), then assign it inside each branch. The ternary versions can use `const`, because they produce the value in one go.

## Even or Odd

!!! abstract "Instructions"
    Create `app/task2/page.tsx`.

    1. Make a `num` state starting at `0`, with **+1** and **−1** buttons. Use arrow-function handlers.
    2. Show `"Even"` or `"Odd"` using A, B and C.

??? hint "Hint - Click to expand"
    The remainder operator `%` gives what's left over after dividing. `num % 2 === 0` is `true` for even numbers.

## More Number Checks

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. Copy across the `num` state and buttons from the previous exercise, then add the checks below. Write each one three ways (A, B, C):

    1. `"Positive or zero"` / `"Negative"`
    2. `"Big number"` (more than 10) / `"Small number"`
    3. `"Lucky 7!"` / `"Not lucky"` (when `num === 7`)
    4. `"You've hit the limit"` (when `num >= 20`) / `"Keep going"`

    That's 12 ternaries. Writing the same shape over and over is how it sticks.

## Age Checker

!!! abstract "Instructions"
    Create `app/task4/page.tsx`.

    1. Make an `age` state starting at `0`, and a number input:

        ```tsx
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        ```

    2. Show these with ternaries. Pick any of A, B or C, but use each style at least once:
        - `"You can vote"` / `"Too young to vote"` (18+)
        - `"You can get your L plates"` / `"Not old enough to drive yet"` (16+)
        - `"Adult"` / `"Minor"` (18+)

## Plurals

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. Words change depending on the number: `1 apple`, but `2 apples`.

    1. Make an `apples` state starting at `0`, with **+1** and **−1** buttons.
    2. Show the count followed by `"apple"` or `"apples"`, chosen with a ternary.
    3. Do the same for `cats` / `cat`, `boxes` / `box` and `people` / `person`, each with its own state and buttons.
    4. Write one reusable arrow function `plural(count, singular, pluralWord)` and use it for all four.
    5. One more ternary: show `"none"` instead of `"0 apples"` when `apples === 0`.

??? hint "Hint - Click to expand"
    The question in the ternary is "is the count exactly 1?". The `plural` function has three parameters and an implicit return; its body is a single ternary using those parameters.

## Nested Ternaries

!!! abstract "Instructions"
    Create `app/task6/page.tsx`. Sometimes you have more than two options, and you can chain ternaries. Read the nested ternaries section of [Conditional Rendering](../resources/nextjs/conditional-rendering.md) first.

    1. Make a `temp` state with a number input.
    2. Use a nested ternary to show:
        - 30 or more → `"Hot 🔥"`
        - 20 or more → `"Warm 🌤️"`
        - 10 or more → `"Cool 🍃"`
        - anything else → `"Cold ❄️"`
    3. Do it three ways: A (variable), B (inside the JSX) and C (arrow function).
    4. Write a fourth version as an arrow function that uses `if` statements and early `return`s.
    5. Add a `mark` state (0 to 100) with an input, and a nested ternary that shows `"Distinction"` (80+), `"Credit"` (65+), `"Competent"` (50+) or `"Not Yet Competent"`.

    **Think:** which version is easiest to read? Nested ternaries are fine for two or three options. Past that, a function with `if`s is often clearer.

??? hint "Hint - Click to expand"
    A nested ternary stops at the first condition that is true, so check the **highest** temperature first. Spread it over several lines, with each `:` starting a new line, so you can read it.

    ![A nested ternary checks num > 100, then num > 10, and stops at the first yes](../../assets/diagrams/03-nested-ternary.svg)

## From Memory: Password Strength

!!! abstract "Instructions"
    Without looking at your earlier code, create `app/task7/page.tsx` with a password strength checker. It has an input for a password and shows:

    - `"Too short"` if it's shorter than 6 characters
    - `"OK"` if it's 6 to 9 characters
    - `"Strong"` if it's 10 or more

    Also add a button labelled `"Show"` / `"Hide"` that switches the input between `type="password"` and `type="text"`.

??? hint "Hint - Click to expand"
    `password.length` gives the number of characters. You need a second state (a boolean) for whether the password is visible. A ternary can choose the input's `type` attribute as well as the button's text.
