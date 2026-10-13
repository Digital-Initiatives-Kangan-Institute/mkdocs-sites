# Building Reusable Client Components

These exercises practise building your own interactive components and passing your own parameters into them as props. You'll combine props with state, add optional props with default values, build wrapper components with `children`, send changes back to the parent with function props, and find out what a server component can and can't pass to a client component.

Revisit [Component Props](../resources/nextjs/component-props.md), [Components and Layouts](../resources/nextjs/components-layouts.md) and [Events and State](../resources/nextjs/events-and-state.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `reusable-components`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest reusable-components
    cd reusable-components
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Put every component you build in `app/components/` (for example `app/components/Counter.tsx`), and each exercise's page in its own folder (`app/task1/page.tsx`, `app/task2/page.tsx`, …). Components and pages that use state or events start with `"use client";` on line 1.

## A Counter with Props

!!! abstract "Instructions"
    Create `app/components/Counter.tsx` and `app/task1/page.tsx`.

    1. Write a `CounterProps` type with three props: `label` (string), `start` (number) and `step` (number).
    2. Build the `Counter` component. It shows the label and the current count, uses `start` as the starting value of its state, and has a **+** button that adds `step`, a **−** button that takes `step` away, and a **Reset** button that goes back to `start`.
    3. On the page, use the counter **three** times with different props:
        - `Likes`, starting at `0`, going up by `1`
        - `Points`, starting at `100`, going up by `10`
        - `Lives`, starting at `3`, going up by `1`
    4. Click each counter. Does clicking one change the others? Write the answer and the reason as a comment at the bottom of the page.
    5. Show the step on the buttons, e.g. `+10` / `−10`.

??? code "click to expand"
    ```tsx
    // app/components/Counter.tsx
    "use client";

    import { useState } from "react";

    type CounterProps = {
        // TODO: label, start, step
    };

    const Counter = ({ label, start, step }: CounterProps) => {
        // TODO: state that starts at `start`

        return (
            <div>
                {/* TODO: label, count, and the three buttons */}
            </div>
        );
    };

    export default Counter;
    ```

??? hint "Hint - Click to expand"
    Pass the `start` prop to `useState` as the starting value. Strings can be passed as `label="Likes"`, but numbers need curly braces, like `start={100}`. Use an updater function (`prev => …`) with `step` for the + and − buttons.

## Optional Props and Defaults

!!! abstract "Instructions"
    Improve your `Counter` and create `app/task2/page.tsx`.

    1. Make `start` and `step` **optional** in the type, with defaults of `0` and `1`.
    2. Add two more optional props:
        - `min` (number): the count can't go below it. Disable the **−** button when it's reached.
        - `max` (number): the count can't go above it. Disable the **+** button when it's reached. If no `max` is given, there's no upper limit.
    3. Add an optional boolean prop `compact`. When it's on, hide the label and the Reset button.
    4. On the page, use the counter at least **five** times, showing off different combinations, including:
        - `<Counter label="Likes" />` with no other props
        - a counter with `min={0}` and `max={10}`
        - a `compact` counter
    5. Check the page from task 1 still works without changes.

??? hint "Hint - Click to expand"
    Defaults go in the destructuring with `=`. A `max` with no default is `undefined` when it isn't passed, so the disabled check needs to handle that: "is there a max, **and** has the count reached it?" Writing `compact` on its own is the same as `compact={true}`, and `&&` hides things when it's on.

## Rating Stars

!!! abstract "Instructions"
    Create `app/components/Rating.tsx` and `app/task3/page.tsx`. Build a clickable star rating.

    1. Props: `label` (string), `max` (optional number, default `5`) and `initial` (optional number, default `0`).
    2. Show `max` stars as buttons. Stars up to the current rating show ★; the rest show ☆.
    3. Clicking a star sets the rating to that star's number. Clicking the current rating again sets it back to `0`.
    4. Show `"3 out of 5"` (or `"Not rated"` when the rating is `0`) under the stars.
    5. On the page, use it for three things, e.g. a movie (out of 5), a restaurant (out of 10, starting at 7) and a book (out of 3).

??? hint "Hint - Click to expand"
    To make a list of `max` stars, create an array of that length and map over it: `Array.from({ length: max }, (_, i) => i + 1)` gives `[1, 2, 3, 4, 5]` when `max` is 5. Each star compares its own number with the rating in a ternary. The click handler for a star needs that star's number, so wrap it in an arrow function.

## A Card with children

!!! abstract "Instructions"
    Create `app/components/Card.tsx` and `app/task4/page.tsx`.

    1. Build a `Card` component with a `title` prop, an optional `colour` prop (default `"#ddd"`) used for its border, and a `children` prop.
    2. The card shows the title as a heading, then whatever `children` it receives.
    3. On the page, use three cards with **different** content inside:
        - one with a paragraph of text
        - one with your `Counter` inside it
        - one with your `Rating` inside it
    4. Add an optional boolean prop `collapsible`. When it's on, the card has a **Show** / **Hide** button next to the title that hides or shows its children. Which props and state does the card now have?

??? hint "Hint - Click to expand"
    The `children` prop is typed as `React.ReactNode`. Put `{children}` in the JSX where the content should appear. For `collapsible`, the card needs its own `open` state, so it becomes a client component. The button only shows when `collapsible` is on, which is a job for `&&`.

## Sending Changes Back to the Page

!!! abstract "Instructions"
    Create `app/components/QuantityPicker.tsx` and `app/task5/page.tsx`. This time the **page** owns the state, and the component reports changes back up.

    1. The `QuantityPicker` takes two props: `value` (number) and `onChange` (a function that takes the new number and returns nothing). It has **no state of its own**.
    2. It shows **−**, the value, and **+**. Clicking a button calls `onChange` with the new value. The **−** button is disabled at `0`.
    3. On the page, keep a separate state for three menu items (e.g. coffee $4.50, muffin $3.00, juice $5.00), and render a `QuantityPicker` for each.
    4. Below them, show the number of items and the total price with two decimal places.
    5. Add a **Clear order** button on the page that sets every quantity back to `0`. Why does this work, even though the button isn't inside any `QuantityPicker`?

??? hint "Hint - Click to expand"
    The function prop's type looks like `(newValue: number) => void`. Because each state setter already takes one value, you can pass the setter straight in as the `onChange` prop. `.toFixed(2)` formats a number with two decimal places. The "Sending Changes Back to the Parent" section of [Component Props](../resources/nextjs/component-props.md) explains why the page can reset the pickers.

## A List of Items with Props

!!! abstract "Instructions"
    Create `app/components/TodoItem.tsx` and `app/task6/page.tsx`. Combine everything: data props, function props and `.map()`.

    1. The page keeps a `todos` state: an array of `{ id, text, done }` with three todos to start.
    2. `TodoItem` takes a `todo` prop and two function props: `onToggle` and `onDelete`, each taking the todo's `id`.
    3. `TodoItem` shows the text (with a strike-through when done), a checkbox that calls `onToggle`, and a ❌ button that calls `onDelete`.
    4. The page writes `handleToggle` and `handleDelete` and passes them down to every `TodoItem` it renders.
    5. Show `"2 of 3 done"` above the list.

??? hint "Hint - Click to expand"
    The page owns the array, so the page does the updating. Toggling uses `.map()` with a ternary and spread; deleting uses `.filter()`, the same as in [Arrays with map and filter](arrays-map-filter.md). Each `TodoItem` needs a `key` when you map over the todos.

## Server Pages and Client Components

!!! abstract "Instructions"
    Find out what a server component can pass to a client component.

    1. Create `app/task7/page.tsx` **without** `"use client"`. Use your `Counter` and `Rating` in it with data props. Does it work?
    2. Now add a `QuantityPicker` to the same page with `value={1}` and an `onChange` that logs the new value. Read the error in the browser and the terminal, and copy the main line of it into a comment.
    3. Fix it **one** way: add `"use client"` to the page, so it can hold the state and pass a real setter. Check it works.
    4. Remove `"use client"` again and fix it **another** way: create `app/components/OrderLine.tsx`, a client component that holds its own quantity state and renders the `QuantityPicker` inside it. The server page then only passes data, such as the item's name and price, to `OrderLine`.
    5. In a comment, explain why the second fix works.

??? hint "Hint - Click to expand"
    Props sent from a server component to a client component travel to the browser as text. Strings, numbers, arrays and objects can be turned into text; functions can't. In the second fix, the function is created **inside** a client component, so it never has to travel from the server.

## From Memory: Your Own Component Library

!!! abstract "Instructions"
    Without looking back, create `app/task8/page.tsx` and build **three** new reusable components of your own. Each must:

    - live in its own file in `app/components/`
    - have a typed props object with at least one **optional prop with a default**
    - be used at least **twice** on the page with different props

    Between them, the three components must include:

    - a component that keeps its own state, set up from a prop (e.g. a `Toggle` with an `initiallyOn` prop)
    - a component that uses `children` (e.g. an `Alert` with a `type` of `"info"` / `"warning"` / `"error"`)
    - a component that reports changes to the page with an `on…` function prop (e.g. a `ColourPicker` whose chosen colour changes the page's background)
