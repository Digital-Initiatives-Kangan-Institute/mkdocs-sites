# TypeScript Types for Data

Almost every bug in a data-driven app comes from the shape of the data: a property spelled wrong, a value that might be missing, a number that's actually a string. TypeScript catches these before your code runs, if you describe your data with **types**. This resource builds on the basics in [Project Structure and TypeScript](project-structure.md).

---

## Basic Types

| Type | Example values |
|---|---|
| `string` | `"Biscuit"`, `""` |
| `number` | `3`, `4.5`, `-1` |
| `boolean` | `true`, `false` |
| `null` | `null` (deliberately empty) |
| `undefined` | `undefined` (not set) |
| `string[]` | `["a", "b"]` (an array of strings) |

TypeScript usually works out the type for you (this is called **inference**):

```typescript
let name = "Biscuit";   // TypeScript knows this is a string
name = 3;               // Error: Type 'number' is not assignable to type 'string'
```

You add types yourself mainly for **function parameters**, **props**, **state that starts empty**, and **data from an API**, because TypeScript can't guess those.

***

## Object Types

Describe an object with a `type` (or an `interface`; they do the same job here):

```typescript
type Pet = {
    id: number;
    name: string;
    adopted: boolean;
};

const pet: Pet = { id: 1, name: "Biscuit", adopted: false };
```

TypeScript now checks every use of `pet`. Writing `pet.nmae` is an error before you even save.

### Optional properties

A `?` after the name means the property might not be there:

```typescript
type Pet = {
    id: number;
    name: string;
    nickname?: string;   // string or undefined
};
```

### Nullable values

`| null` means the value might be deliberately empty, like a database column that allows no value:

```typescript
type Pet = {
    description: string | null;
};
```

***

## Union Types

The `|` symbol means "or". A union of exact values limits a property to a fixed list:

```typescript
type Species = "dog" | "cat" | "rabbit";
type Status = "loading" | "error" | "ready";

const s: Species = "dog";      // fine
const t: Species = "dragon";   // Error: '"dragon"' is not assignable to type 'Species'
```

Unions are great for anything with a fixed set of options: filter buttons, user roles, traffic-light colours.

***

## Nested Types

Real API data often has objects inside objects. Describe each level, then put them together:

```typescript
type Address = {
    city: string;
    state: string;
    postalCode: string;
};

type Company = {
    name: string;
    title: string;
};

type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    company: Company;
};
```

Read nested values with dots: `user.address.city`, `user.company.title`.

***

## Typing API Responses

Look at the real data first: visit the API URL in your browser. Many APIs wrap the list in an outer object, so you need a type for the wrapper as well as for each item. For example, `https://dummyjson.com/users` returns:

```json
{
    "users": [ { "id": 1, "firstName": "Emily", ... } ],
    "total": 208,
    "skip": 0,
    "limit": 30
}
```

```typescript
type UsersResponse = {
    users: User[];
    total: number;
    skip: number;
    limit: number;
};

fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data: UsersResponse) => setUsers(data.users));
```

You only need to describe the fields you actually use. Leaving the rest out is fine.

!!! warning "Types don't check the real data"
    A type is a promise **you** make about the data. TypeScript believes it but can't check it while the app runs. If the API sends `"age": "34"` and your type says `number`, TypeScript won't notice. That's why you look at the real data before writing the type.

***

## Typing Props and State

### Props

```tsx
type UserCardProps = {
    user: User;
    onSelect: (id: number) => void;   // a function prop
    children?: React.ReactNode;       // optional JSX inside the component
};

const UserCard = ({ user, onSelect }: UserCardProps) => (
    <button onClick={() => onSelect(user.id)}>{user.firstName}</button>
);
```

- `(id: number) => void` means "a function that takes a number and returns nothing"
- `React.ReactNode` is the type for anything React can display

### State

Add a type when the starting value doesn't tell TypeScript enough:

```tsx
const [users, setUsers] = useState<User[]>([]);           // empty array of users
const [selected, setSelected] = useState<User | null>(null); // nothing selected yet
const [filter, setFilter] = useState<"all" | "admins">("all");
```

Without `<User[]>`, an empty `[]` has the type `never[]`, and adding a user to it is an error.

***

## Handling Values That Might Be Missing

When a value might be `null` or `undefined`, TypeScript makes you check before using it:

```tsx
const [selected, setSelected] = useState<User | null>(null);

selected.firstName;   // Error: 'selected' is possibly 'null'
```

Four ways to handle it:

```tsx
// 1. An if (narrowing): after the check, TypeScript knows it's a User
if (selected) {
    console.log(selected.firstName);
}

// 2. A ternary in JSX
{selected ? <p>{selected.firstName}</p> : <p>No one selected</p>}

// 3. Optional chaining ?. : gives undefined instead of crashing
<p>{selected?.firstName}</p>

// 4. ?? : a fallback value
<p>{pet.description ?? "No description yet"}</p>
```

***

## Sharing Types Between Files

Put types in their own file and export them, so every page uses the same definition:

```typescript
// app/types.ts
export type User = { /* ... */ };
export type UsersResponse = { /* ... */ };
```

```tsx
import type { User, UsersResponse } from "@/app/types";
```

`import type` makes it clear you're only importing types, not code.

***

## Avoid any

`any` switches TypeScript off for a value. Everything is allowed, so nothing is checked:

```typescript
const data: any = await res.json();
data.usres.map(...);   // no error until the app crashes
```

Write a real type instead. If you truly don't know the type yet, use `unknown`, which forces you to check before using it. This is why `catch (err)` gives you `unknown` and you write `err instanceof Error ? err.message : "Something went wrong"`.

***

## Reading TypeScript Errors

TypeScript errors appear as red underlines in VS Code (hover to read them), in the terminal, and in the browser's error overlay. The common ones:

| Error message | What it means |
|---|---|
| `Property 'nmae' does not exist on type 'Pet'` | A typo, or the type is missing that property |
| `Type 'string' is not assignable to type 'number'` | You gave a value of the wrong type |
| `'user' is possibly 'null'` / `'undefined'` | Check the value exists before using it |
| `Argument of type 'never[]'...` / `type 'never'` | An empty `useState([])` needs a type: `useState<User[]>([])` |
| `Property 'x' is missing in type ... but required` | An object or a component's props is missing a required field |
| `Parameter 'x' implicitly has an 'any' type` | Add a type to the function parameter |

Read the **last** part of a long error first; it usually names the exact property or value at fault.

***

## Summary

- Describe data with `type` (or `interface`); use `?` for optional and `| null` for nullable properties
- Union types like `"dog" | "cat"` limit a value to a fixed list
- Build nested types level by level, and type an API's wrapper object as well as its items
- Look at the real data before writing its type; TypeScript can't check data while the app runs
- Type props (including function props) and any state that starts empty or `null`
- Handle missing values with `if`, a ternary, `?.` or `??`
- Avoid `any`; read the end of an error message first

### Activity - TypeScript Types for Data

[Attempt Activity - Typing Your Data](../../tasks/typescript-types.md){.md-button}
