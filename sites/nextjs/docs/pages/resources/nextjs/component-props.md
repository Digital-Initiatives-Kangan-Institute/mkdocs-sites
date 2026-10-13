# Component Props

When you build your own component, **props** are how you pass your own parameters into it, the same way you pass arguments into a function. This resource covers props on interactive (client) components: combining props with state, optional props with default values, the `children` prop, sending changes back to the parent with function props, and what a server component is allowed to pass to a client component.

---

## Props Are Parameters

You write props like HTML attributes, and the component receives them as one object:

```tsx
<Counter label="Likes" start={5} step={2} />
```

```tsx
type CounterProps = {
    label: string;
    start: number;
    step: number;
};

const Counter = ({ label, start, step }: CounterProps) => {
    // label is "Likes", start is 5, step is 2
};
```

- Strings can be written in quotes: `label="Likes"`
- Everything else goes in curly braces: numbers `start={5}`, booleans `disabled={true}`, arrays `tags={["a", "b"]}`, objects, and functions
- The `type` lists every prop the component accepts, so TypeScript warns you about a missing or misspelled prop

***

## Props vs State

Props and state are both data a component uses, but they come from different places:

| | Props | State |
|---|---|---|
| Who sets it | The **parent** that uses the component | The component **itself** |
| Can the component change it? | No, props are read-only | Yes, with its setter |
| Purpose | Configure the component from outside | Remember what changes inside it |
| Example | `label`, `start`, `step` | the current `count` |

A component should never try to change its own props:

```tsx
// INCORRECT - props are read-only
step = step + 1;
```

***

## Props and State Together

A reusable interactive component usually takes props to configure it, and keeps its own state for what changes:

```tsx
"use client";

import { useState } from "react";

type CounterProps = {
    label: string;
    start: number;
    step: number;
};

const Counter = ({ label, start, step }: CounterProps) => {
    const [count, setCount] = useState(start);

    return (
        <div>
            <p>{label}: {count}</p>
            <button onClick={() => setCount((prev) => prev + step)}>+{step}</button>
            <button onClick={() => setCount(start)}>Reset</button>
        </div>
    );
};

export default Counter;
```

```tsx
<Counter label="Likes" start={0} step={1} />
<Counter label="Points" start={100} step={10} />
<Counter label="Goals" start={0} step={6} />
```

- `useState(start)` uses a prop as the **starting** value of the state
- Each `<Counter />` on the page has its **own** separate state; clicking one doesn't change the others
- `step` is read every time a button is clicked, so it changes how the component behaves

!!! note "A prop only sets the starting value"
    `useState(start)` reads `start` once, when the component first appears. If the parent later passes a different `start`, the count doesn't change. That's usually what you want for a starting value.

***

## Optional Props and Default Values

Mark a prop optional with `?` in the type, and give it a default value in the destructuring with `=`:

```tsx
type CounterProps = {
    label: string;
    start?: number;
    step?: number;
};

const Counter = ({ label, start = 0, step = 1 }: CounterProps) => {
    // ...
};
```

```tsx
<Counter label="Likes" />                  // start is 0, step is 1
<Counter label="Points" step={10} />       // start is 0, step is 10
<Counter label="Lives" start={3} step={-1} />
```

Use defaults for the "normal" setting, so the component is quick to use and only needs extra props when it should behave differently.

***

## Boolean Props

A boolean prop written on its own means `true`:

```tsx
<Counter label="Likes" compact />            // compact is true
<Counter label="Likes" compact={false} />    // compact is false
<Counter label="Likes" />                    // compact is undefined (use a default)
```

Inside the component, use a ternary or `&&` to change what it shows:

```tsx
const Counter = ({ label, compact = false }: CounterProps) => (
    <div style={{ padding: compact ? 4 : 16 }}>
        {!compact && <h3>{label}</h3>}
        {/* ... */}
    </div>
);
```

***

## The children Prop

Anything you put **between** a component's opening and closing tags arrives as a special prop called `children`:

```tsx
<Card title="Today's special">
    <p>Pumpkin soup with crusty bread.</p>
    <button>Order</button>
</Card>
```

```tsx
type CardProps = {
    title: string;
    children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => (
    <section style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
        <h2>{title}</h2>
        {children}
    </section>
);
```

- `React.ReactNode` is the type for anything React can display: text, elements, other components
- `children` lets you build **wrapper** components (cards, panels, modals) that don't need to know what's inside them
- Layouts use exactly the same idea: `layout.tsx` receives each page as `children`

***

## Sending Changes Back to the Parent

Props only flow **down**, from parent to child. When a child needs to tell its parent something changed, the parent passes a **function** as a prop, and the child calls it:

```tsx
// The child: reports every change through onChange
"use client";

type QuantityPickerProps = {
    value: number;
    onChange: (newValue: number) => void;
};

const QuantityPicker = ({ value, onChange }: QuantityPickerProps) => (
    <div>
        <button onClick={() => onChange(value - 1)} disabled={value === 0}>−</button>
        <span>{value}</span>
        <button onClick={() => onChange(value + 1)}>+</button>
    </div>
);

export default QuantityPicker;
```

```tsx
// The parent: owns the state and passes it down
"use client";

import { useState } from "react";
import QuantityPicker from "./QuantityPicker";

const OrderPage = () => {
    const [coffees, setCoffees] = useState(0);
    const [muffins, setMuffins] = useState(0);

    const total = coffees * 4.5 + muffins * 3;

    return (
        <main>
            <p>Coffee</p>
            <QuantityPicker value={coffees} onChange={setCoffees} />
            <p>Muffin</p>
            <QuantityPicker value={muffins} onChange={setMuffins} />
            <h2>Total: ${total.toFixed(2)}</h2>
        </main>
    );
};

export default OrderPage;
```

- The **parent** owns the state, because the parent needs it (for the total)
- The child receives the current `value` and an `onChange` function as props
- `(newValue: number) => void` is the type for "a function that takes a number and returns nothing"
- The setter `setCoffees` already has the right shape, so it can be passed straight in

This pattern is called **lifting state up**: when two components need the same data, move the state up to their closest shared parent and pass it down as props.

### Naming function props

By convention, function props start with `on`: `onChange`, `onSelect`, `onDelete`, `onLogin`. The handler functions in the parent that you pass to them often start with `handle`:

```tsx
const handleDelete = (id: number) => { /* ... */ };

<TodoItem todo={todo} onDelete={handleDelete} />
```

***

## Server Components and Client Component Props

A server component (no `"use client"`) can use a client component and pass it props, with one rule: **the props must be data, not functions**.

```tsx
// app/page.tsx  (a server component)
import Counter from "./Counter";   // a client component

export default function HomePage() {
    return (
        <main>
            <Counter label="Likes" start={5} />    {/* fine: a string and a number */}
        </main>
    );
}
```

Data props travel from the server to the browser as text, so strings, numbers, booleans, `null`, arrays and plain objects all work. Functions can't be turned into text, so this fails:

```tsx
// INCORRECT - app/page.tsx has no "use client"
<QuantityPicker value={1} onChange={(n) => console.log(n)} />
```

Next.js shows an error saying that event handlers or functions **cannot be passed to Client Component props**. There are two fixes:

- Add `"use client"` to the parent, so both components run in the browser (as in the `OrderPage` example above), or
- Move the function **inside** the client component, so the server only passes data

| Passing from a server component to a client component | Allowed? |
|---|---|
| `label="Likes"`, `start={5}`, `compact` | Yes |
| `pets={petsArray}`, `user={userObject}` | Yes |
| `<Card>` with JSX `children` | Yes |
| `onChange={...}`, `onClick={...}`, any function | No |

***

## Summary

- Props are parameters you pass into your own components, typed with a `type` or `interface`
- Props come from the parent and are read-only; state belongs to the component and can change
- A prop can set the starting value of state, and each copy of the component keeps its own state
- Mark optional props with `?` and give them defaults with `=` in the destructuring
- `children` is whatever you put between the component's tags; type it as `React.ReactNode`
- To send changes up, the parent passes a function prop (like `onChange`) and owns the state
- A server component can pass data props to a client component, but not functions

### Activity - Building Reusable Client Components

[Attempt Activity - Building Reusable Client Components](../../tasks/reusable-client-components.md){.md-button}
