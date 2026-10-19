# Supabase Client Library

The Supabase client library (`@supabase/supabase-js`) is an npm package that talks to your Supabase database for you. Instead of building URLs and headers for `fetch`, you call methods like `.select()`, `.insert()`, `.update()` and `.delete()`.

This resource covers the four **CRUD** operations: **C**reate, **R**ead, **U**pdate and **D**elete.

---

## Installing and Connecting

Install the package in your Next.js project:

```bash
npm install @supabase/supabase-js
```

Put your Project URL and publishable key in `.env.local`, in the root of the project next to `package.json`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
```

Then create one client in `app/lib/supabase.ts` that every page imports:

```tsx
// app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
);
```

- `createClient` connects to your project using the URL and key
- `export const supabase` lets any page use it with `import { supabase } from "../lib/supabase";`
- **Stop and restart** `npm run dev` after changing `.env.local`

!!! danger
    Only ever use the **publishable** key (`sb_publishable_…`). The **secret** key (`sb_secret_…`) must never go in front-end code.

***

## The Pattern Every Query Follows

Every query has the same shape:

```tsx
const { data, error } = await supabase
    .from("fruits")   // 1. which table
    .select("*");     // 2. what to do
```

1. **`.from("table")`** picks the table
2. A method says what to do: `.select()`, `.insert()`, `.update()` or `.delete()`
3. **`await`** waits for the answer, so the function must be `async`
4. The answer is an object with **`data`** (the rows) and **`error`** (`null` if it worked)

If something goes wrong, the client does **not** stop your code with an error. It just puts the problem in `error` and carries on, so always check `error` yourself:

```tsx
if (error) {
    console.log(error.message);
}
```

***

## Read (select)

Get every row from a table:

```tsx
const { data, error } = await supabase
    .from("fruits")
    .select("*");
```

`data` is an array of rows, for example `[{ id: 1, name: "Apple" }, { id: 2, name: "Banana" }]`.

### Sorting and filtering

Chain more methods after `.select()`:

```tsx
// Sorted A to Z by name
const { data, error } = await supabase
    .from("fruits")
    .select("*")
    .order("name", { ascending: true });

// Only rows where colour equals "red"
const { data, error } = await supabase
    .from("fruits")
    .select("*")
    .eq("colour", "red");
```

| Method | Meaning |
| --- | --- |
| `.order("name", { ascending: true })` | Sort A to Z, smallest first |
| `.order("name", { ascending: false })` | Sort Z to A, largest first |
| `.eq("column", value)` | Equals |
| `.neq("column", value)` | Not equal |
| `.gt("column", value)` | Greater than |
| `.lt("column", value)` | Less than |

### Loading data when the page opens

`useEffect` cannot take an `async` function directly, so write the `async` function first, then call it inside `useEffect`:

```tsx
const [fruits, setFruits] = useState<Fruit[]>([]);

const loadFruits = async () => {
    const { data, error } = await supabase.from("fruits").select("*");

    if (error) {
        console.log(error.message);
    } else {
        setFruits(data);
    }
};

useEffect(() => {
    // Safe: loadFruits only sets state after the data arrives
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFruits();
}, []);
```

Because `loadFruits` is its own function, you can call it again after adding, changing or deleting a row to refresh the list.

The two comment lines stop ESLint from warning *"Calling setState synchronously within an effect"*. That warning doesn't apply here, because `loadFruits` only changes state after `await` brings back the answer.

***

## Create (insert)

Add a new row by passing an object. The keys must match the column names:

```tsx
const { error } = await supabase
    .from("fruits")
    .insert({ name: "Mango", colour: "orange" });
```

- Leave out `id` and `created_at`; Supabase fills them in
- Any column with a default value (such as `false`) can be left out too

***

## Update (update + eq)

Change a row by passing the new values, then say **which** row with `.eq()`:

```tsx
const { error } = await supabase
    .from("fruits")
    .update({ name: "Green Apple" })
    .eq("id", 1);
```

- `.update({ ... })` lists only the columns you want to change
- `.eq("id", 1)` picks the row whose `id` is `1`

!!! warning
    Always add a filter like `.eq("id", ...)` to an update. Without it, Supabase refuses the request, because it would change every row in the table.

***

## Delete (delete + eq)

Remove a row by saying which one with `.eq()`:

```tsx
const { error } = await supabase
    .from("fruits")
    .delete()
    .eq("id", 1);
```

The same warning applies: always filter a delete, or it is refused.

***

## Cheat Sheet

| Operation | Code |
| --- | --- |
| Read all | `supabase.from("t").select("*")` |
| Read sorted | `supabase.from("t").select("*").order("col", { ascending: true })` |
| Read filtered | `supabase.from("t").select("*").eq("col", value)` |
| Create | `supabase.from("t").insert({ col: value })` |
| Update | `supabase.from("t").update({ col: value }).eq("id", id)` |
| Delete | `supabase.from("t").delete().eq("id", id)` |

Every one of these is `await`ed and gives back `{ data, error }`.

***

## Client Library vs fetch

Both do exactly the same thing. The client library builds the `fetch` request for you.

| Operation | Client library | REST API with fetch |
| --- | --- | --- |
| Read | `.select("*")` | `GET /rest/v1/fruits?select=*` |
| Create | `.insert({ ... })` | `POST` with a JSON body |
| Update | `.update({ ... }).eq("id", 1)` | `PATCH /rest/v1/fruits?id=eq.1` |
| Delete | `.delete().eq("id", 1)` | `DELETE /rest/v1/fruits?id=eq.1` |

See [Supabase REST API with fetch](supabase-rest-api.md) for the `fetch` version.

***

## Troubleshooting

| You see | Likely cause |
| --- | --- |
| `Invalid API key` | `.env.local` is in the wrong place, has a typo, or you didn't restart `npm run dev` |
| `permission denied for table ...` | The publishable key hasn't been given access. Run `grant select, insert, update, delete on table <name> to anon;` in the SQL Editor |
| `relation "public.<name>" does not exist` | The table name in `.from()` doesn't match Supabase (check for capitals and spelling) |
| `DELETE requires a WHERE clause` | You forgot `.eq(...)` after `.delete()` or `.update()` |
| The list doesn't change after a button click | You didn't load the data again after the change |

***

## Summary

- Install `@supabase/supabase-js` and create one client in `app/lib/supabase.ts`
- Every query starts with `supabase.from("table")` and is `await`ed
- `.select()` reads, `.insert()` creates, `.update()` changes, `.delete()` removes
- Always filter updates and deletes with `.eq("id", ...)`
- The client returns `{ data, error }` and keeps running when something fails, so always check `error`
- Load the data again after every change so the page shows the latest rows

### Activity - Supabase Client CRUD

[Attempt Activity - Supabase Client CRUD](../../tasks/supabase-client-crud.md){.md-button}

### Activity - Mantine Book Tracker

[Attempt Activity - Mantine Book Tracker](../../tasks/mantine-book-tracker.md){.md-button}
