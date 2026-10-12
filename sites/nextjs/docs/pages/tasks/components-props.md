# Components

This is a **guided, line-by-line build** of reusable components. You will build one component, reuse it several times with different props, then build a second component — repeating the same "build once, reuse many" pattern.

!!! abstract "Instructions"
    Build the guided components below, then build one of your own. Your work must:

    - Define at least two components, each in its own file inside `components/`
    - Pass **props** into each component
    - Reuse each component at least **three times** with different props
    - Assemble the components into a page

    Push your work to GitHub.

    Revisit [What is React](../resources/nextjs/what-is-react.md) and [Components and Layouts](../resources/nextjs/components-layouts.md) while you work.

---

## Your First Component

Create `components/Greeting.tsx`:

```tsx
export default function Greeting() {
    return <h2>Hello, welcome to our site!</h2>;
}
```

**What this file does in one sentence:** it defines a small, reusable heading component.

Line by line:

1. **`export default function Greeting() { ... }`** — defines the component as a function. `export default` lets other files import it.
2. **`return <h2>...</h2>`** — returns the JSX to render.

---

## Reuse It Three Times

Now use the component in `app/page.tsx`:

```tsx
import Greeting from "../components/Greeting";

export default function HomePage() {
    return (
        <main>
            <Greeting />
            <Greeting />
            <Greeting />
        </main>
    );
}
```

Line by line:

1. **`import Greeting from "../components/Greeting";`** — imports the component. The path `../components/Greeting` goes up from `app/` and into `components/`.
2. **`<Greeting />`** — uses the component like a custom HTML tag. Each `<Greeting />` prints the same heading.
3. Using it **three times** is the repetition that proves the point: define once, reuse many.

---

## Pass Props

Reuse is more useful when each instance can show different content. Update `components/Greeting.tsx` to accept a **prop**:

```tsx
interface GreetingProps {
    name: string;
}

export default function Greeting({ name }: GreetingProps) {
    return <h2>Hello, {name}!</h2>;
}
```

Line by line:

1. **`interface GreetingProps { name: string; }`** — describes the prop this component expects: a `name` that is a string.
2. **`export default function Greeting({ name }: GreetingProps)`** — the component receives the prop, **destructured** out of its props object, and typed with the interface.
3. **`<h2>Hello, {name}!</h2>`** — `{name}` inserts the prop value into the JSX.

Then pass a different value each time in `app/page.tsx`:

```tsx
import Greeting from "../components/Greeting";

export default function HomePage() {
    return (
        <main>
            <Greeting name="Alice" />
            <Greeting name="Bob" />
            <Greeting name="Charlie" />
        </main>
    );
}
```

Line by line:

- Each `<Greeting name="..." />` supplies a different `name` prop.
- The same component renders three different greetings. That is the whole point of props.

---

## Repeat the Pattern: A Card Component

Now build a second component the same way, with two props. Create `components/Card.tsx`:

```tsx
interface CardProps {
    title: string;
    description: string;
}

export default function Card({ title, description }: CardProps) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
```

Line by line:

1. **`interface CardProps { title: string; description: string; }`** — the component now expects **two** props.
2. **`{ title, description }`** — destructures both props at once.
3. **`<div style={{ ... }}>`** — a container styled inline with a border and padding.
4. **`<h3>{title}</h3>`** and **`<p>{description}</p>`** — display the two props.

Use it three times in `app/page.tsx`:

```tsx
import Card from "../components/Card";
import Greeting from "../components/Greeting";

export default function HomePage() {
    return (
        <main>
            <Greeting name="Alice" />
            <Card title="Latte" description="Smooth espresso with steamed milk." />
            <Card title="Cappuccino" description="Espresso with foamed milk." />
            <Card title="Croissant" description="Buttery and flaky." />
        </main>
    );
}
```

Notice the repeated pattern: the same `<Card>` three times, only the prop values change.

---

## Repeat It Again: Your Own Component

Build a third component **yourself**, from scratch. Choose one:

- A **Button** with `label` and `color` props
- A **Badge** with `text` prop
- An **Avatar** with `name` and `image` props

Requirements:

- Its own file in `components/`
- At least one prop, typed with an interface
- Reused **three times** in `app/page.tsx` with different props

Write it from memory before checking the hint.

??? hint "Hint - Click to expand"
    Follow the Card's exact shape: `interface XProps { ... }`, `export default function X({ ... }: XProps)`, return JSX that displays the props. Then import it and use it three times with different values. If you get stuck, copy Card and change the prop names and the JSX.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Component** | A reusable function that returns JSX |
| **Props** | Inputs passed into a component to customise it |
| **Interface** | TypeScript's description of a prop's shape |
| **Destructuring** | Pulling values out of an object with `{ name }` |
| **Reuse** | Using one component many times with different props |

---

## Summary

- Define a component once in `components/`, then import and reuse it
- Props make each use different: `<Greeting name="Alice" />`
- Type props with an interface: `{ name }: GreetingProps`
- The pattern is always: define → type props → reuse with different values
