# Choosing Arrows, Ternaries and if

The tasks on this site make you write arrow functions and ternaries over and over so the syntax sticks. In a real project you pick whichever tool makes the code easiest to read. This resource is a guide to making that choice.

---

## The Quick Guide

| Use | When | Example |
| --- | --- | --- |
| An arrow function | You're handing a function to something else to run later: `onClick`, `.map()`, `.filter()`, `.then()`, `useEffect` | `onClick={() => setStatus("adopted")}` |
| A ternary | You're choosing between **two** values or two bits of JSX | `pet.adopted ? "Adopted" : "Available"` |
| `&&` | It's "show this or show nothing" | `{pet.vaccinated && "Vaccinated"}` |
| An `if` | There are more than three options, you want to stop a function early, or you're **doing** something (like throwing an error) rather than choosing a value | `if (!res.ok) throw new Error("Failed")` |

***

## Arrow Functions

Use an arrow function whenever you **hand a function over** for someone else to call later:

```tsx
<button onClick={() => setCount(count + 1)}>Add</button>

products.map((product) => <li key={product.id}>{product.name}</li>);

useEffect(() => {
    // runs after the page appears
}, []);
```

You never call these yourself. React, the array method, or the Promise calls them at the right moment. See [Arrow Functions](arrow-functions.md).

***

## Ternaries

Use a ternary when you are **choosing between two things**:

```tsx
<p>{count === 1 ? "1 item" : `${count} items`}</p>

{isLoggedIn ? <LogoutButton /> : <LoginButton />}
```

A nested ternary is fine for **three** options that are mutually exclusive, such as loading / error / data:

```tsx
{loading ? (
    <p>Loading...</p>
) : error ? (
    <p>{error}</p>
) : (
    <ProductList products={products} />
)}
```

See [Conditional Rendering](conditional-rendering.md).

***

## && for Show or Hide

When the choice is "this or nothing", `&&` is shorter than a ternary with `null`:

```tsx
{saveError && <p style={{ color: "red" }}>{saveError}</p>}
```

Make sure the left side is `true` or `false`, not a number.

***

## if Statements

Reach for `if` when:

### There are four or more options

```tsx
const speciesEmoji = (species: string) => {
    if (species === "dog") return "🐶";
    if (species === "cat") return "🐱";
    if (species === "rabbit") return "🐰";
    return "🐾";
};
```

A four-level nested ternary would be much harder to read.

### You want to stop a function early

```tsx
const toggleAdopted = () => {
    if (!pet) return;   // nothing to update yet
    // ...
};
```

Nothing is being chosen here, so a ternary does not fit.

### You are doing something, not choosing a value

```tsx
.then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
})
```

### The whole page is different

When one state means the entire page looks different, an early `return` is simpler than wrapping everything in a ternary:

```tsx
if (submitted) {
    return <p>Thanks for signing up!</p>;
}

return (
    <form>{/* ... */}</form>
);
```

***

## Arrow Components vs Function Components

The tasks write components as arrow functions to give you extra practice:

```tsx
const PetCard = ({ pet }: { pet: Pet }) => {
    return <li>{pet.name}</li>;
};

export default PetCard;
```

Plenty of React code (including the Next.js documentation) uses the `function` keyword instead:

```tsx
export default function PetCard({ pet }: { pet: Pet }) {
    return <li>{pet.name}</li>;
}
```

Both work exactly the same. Pick one style and use it consistently within a project.

***

## Summary

- Arrow functions are for code you hand over to run later
- Ternaries choose between two values (or three, for loading / error / data)
- `&&` shows something or nothing
- `if` handles four or more options, early exits, throwing errors, and whole-page swaps
- Arrow components and `function` components behave the same; be consistent

### Activity - Pet Adoption Board

[Attempt Activity - Pet Adoption Board](../../tasks/pet-adoption-board.md){.md-button}
