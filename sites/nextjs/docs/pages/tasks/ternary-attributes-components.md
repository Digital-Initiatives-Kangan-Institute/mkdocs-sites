# Ternaries for Attributes and Components

These exercises practise ternaries in attributes (`className`, `style`, `disabled`, `type`, `placeholder`), ternaries that choose which component to show, showing or hiding things with `? … : null` and with `&&`, and small arrow-function components that take props.

Revisit [Conditional Rendering](../resources/nextjs/conditional-rendering.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-04`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-04
    cd activity-04
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

## Functions as Props

A prop can be a function. That lets a child component run code that lives in its parent, such as changing the parent's state:

```tsx
<LoginButton onLogin={() => setIsLoggedIn(true)} />
```

Here the arrow function is the prop. `LoginButton` doesn't know what it does. It just calls it when the button is clicked. In TypeScript, `() => void` means "a function that takes nothing and returns nothing".

## Like Button

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Make a `liked` state (`false`) and a button that toggles it.
    2. Use a ternary for each of these on the button:
        - Text: `"♥ Liked"` / `"♡ Like"`
        - `className`: `"text-red-600"` / `"text-gray-500"` (Tailwind colour classes)
        - `style`: `fontWeight` of `"bold"` / `"normal"`
    3. Below the button, show `"You liked this post"` / `"You haven't liked this yet"`.
    4. Add a `likes` count. A click should add 1 if the post isn't liked yet, and take 1 away if it is. Put a ternary **inside** the updater function.

??? hint "Hint - Click to expand"
    `style` takes an object, so it has double braces: the outer pair means "JavaScript goes here" and the inner pair is the object. The ternary goes in the value of `fontWeight`. For the likes updater, the arrow function takes `prev` and returns either `prev - 1` or `prev + 1` depending on `liked`.

## Show and Hide

!!! abstract "Instructions"
    Create `app/task2/page.tsx`.

    1. Make a `showDetails` state and a button whose text is `"Hide details"` / `"Show details"`.
    2. Below it, show a paragraph of text only when `showDetails` is true, using `? <p>…</p> : null`.
    3. Do the same for a second section (`showRules`), this time with `&&`.
    4. Do it a third time (`showHint`), putting the JSX in a variable first and then using `{hint}` in the JSX.
    5. Try the `&&` gotcha. Add a `count` state starting at `0`, a **+1** button, and this line:

        ```tsx
        {count && <p>You have {count} items</p>}
        ```

        Look at the page before you click: a lonely `0` appears. Fix it so nothing shows when the count is zero, then write it a third way as a ternary.

??? hint "Hint - Click to expand"
    React shows the number `0` instead of nothing, because `0` is a value it can display. The left side of `&&` should be a true/false comparison, not a number.

## Swapping Components

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. Above your page component, write the `LoginButton` from the starter code, then:

    1. Write `LogoutButton` the same way (prop `onLogout`, text `"Log out"`).
    2. Write `WelcomeMessage`, which takes a `name` prop and shows `<h2>Welcome back, {name}!</h2>`.
    3. Write `GuestMessage`, which shows `<h2>Hello, guest. Please log in.</h2>`.
    4. In the page, keep an `isLoggedIn` state and use two ternaries to swap:
        - `WelcomeMessage` ↔ `GuestMessage`
        - `LogoutButton` ↔ `LoginButton`
    5. Pass arrow functions as the props, e.g. `onLogin={() => setIsLoggedIn(true)}`.

??? code "click to expand"
    ```tsx
    const LoginButton = ({ onLogin }: { onLogin: () => void }) => (
        <button onClick={onLogin}>Log in</button>
    );
    ```

## Form Feedback

!!! abstract "Instructions"
    Create `app/task4/page.tsx`.

    1. Make a `username` state with an input.
    2. Add these to the form:
        - The Submit button's `disabled` attribute: disabled when `username` is empty. This one is a condition, not a ternary, because the comparison is already `true` or `false`.
        - The button's text: `"Enter a username first"` / `` `Sign up as ${username}` ``
        - A character counter, `{username.length}/12`, that is red when over 12 and green otherwise
        - A message: `"Too long!"` when over 12, otherwise nothing
        - The input's `placeholder`, based on an `isGamer` checkbox: `"e.g. xX_Slayer_Xx"` / `"e.g. jsmith"`
    3. Add a `submitted` state that Submit sets to `true`. Use a ternary on the whole form to show either the form or `<p>Thanks, {username}!</p>`.

??? hint "Hint - Click to expand"
    A checkbox uses `checked={isGamer}` and reads `e.target.checked` in its `onChange`. The backticks in the button text let you drop a value into a string with `${ }`. For the "Too long!" message, either `&&` or `? … : null` works.

## Dark Mode

!!! abstract "Instructions"
    Create `app/task5/page.tsx`.

    1. Make a `dark` state.
    2. Wrap your page content in a `<div>` whose `style` uses ternaries for both `backgroundColor` (`"#111"` / `"#fff"`) and `color` (`"#eee"` / `"#111"`).
    3. The toggle button text should be `"☀️ Light mode"` / `"🌙 Dark mode"`.
    4. Do it again in a second `<div>`, this time using `className` with Tailwind classes instead of `style` (`bg-black text-white p-4` / `bg-white text-black p-4`).
    5. Do it a third time, with the whole style object chosen by a ternary and stored in a `theme` variable.

??? hint "Hint - Click to expand"
    For step 5, each side of the ternary is a complete object with both properties. Then the `<div>` uses `style={theme}`, with single braces because `theme` is already an object.

## Traffic Light

!!! abstract "Instructions"
    Create `app/task6/page.tsx`.

    1. Make a `light` state. Give it a TypeScript type so it can only be one of three values:

        ```tsx
        const [light, setLight] = useState<"red" | "yellow" | "green">("red");
        ```

    2. Show a circle: a `<div>` with `style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: light }}`.
    3. Show a message with a nested ternary: `"Stop"` / `"Slow down"` / `"Go"`.
    4. Add a **Next** button. Its handler puts a nested ternary inside the updater to cycle red → green → yellow → red.
    5. Add a pedestrian message: show `🚶 Walk` only when the light is red (use `&&`), and `✋ Don't walk` otherwise. Then rewrite those two lines as one ternary.

!!! warning "Apostrophes in JSX text"
    Typing `Don't` straight into JSX text gives a lint error, because ESLint worries the `'` is a typo. Write `Don&apos;t` instead. Apostrophes inside a `"string"` in `{ }` are fine.

??? hint "Hint - Click to expand"
    The updater receives `prev` and asks "is it red? then green. Otherwise, is it green? then yellow. Otherwise red." That is a two-level nested ternary.

## From Memory: Follow Button

!!! abstract "Instructions"
    Without looking at your earlier code, create `app/task7/page.tsx` with a social-media style Follow button:

    - Text: `"Follow"` / `"Following ✓"`
    - A different `className` or `style` when following
    - A follower count that goes up and down with the button
    - A `"Follows you"` badge that only shows if a `followsYou` constant is `true` (try it with both `true` and `false`)
    - An arrow-function component `ProfileCard` that takes `name` and `isVerified` props and puts a ✔️ next to the name only if the person is verified
