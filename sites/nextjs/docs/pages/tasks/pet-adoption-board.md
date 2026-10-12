# Pet Adoption Board

In this project you'll build a small pet adoption website that loads its pets from a Supabase database. It brings together what you practised in the earlier tasks:

- Arrow functions for event handlers and for the callbacks you pass to `.map()`, `.filter()`, `.then()` and `useEffect`
- Ternaries for choosing between two things, like loading or the list, or "Adopted" or "Available"
- `useState`, `useEffect` and `useParams`
- `fetch()` to Supabase's REST API using the publishable key, with no Supabase client library

It's also a chance to practise **choosing** the right tool. Not everything needs a ternary or an arrow function. Read [Choosing Arrows, Ternaries and if](../resources/nextjs/choosing-syntax.md) before Part 3.

Revisit [Supabase REST API with fetch](../resources/supabase/supabase-rest-api.md), [Dynamic Routes and useParams](../resources/nextjs/dynamic-routes.md) and [Handling Loading and Error States](../resources/nextjs/loading-error-states.md) while you work.

!!! note
    Styling still doesn't matter, so get it working first. If you finish early, you can make it look nice.

## Set Up Supabase

!!! abstract "Instructions"
    **Create the project**

    1. Go to `https://supabase.com/dashboard` and create a new project called `pet-adoption`. Save the database password somewhere, although you won't need it today.
    2. Wait for the project to finish setting up.

    **Build the `pets` table yourself**

    Create a table that matches this schema exactly, because your code will rely on these column names and types.

    | Column | Type | Required? | Default value | Notes |
    | --- | --- | --- | --- | --- |
    | `id` | `int8` | yes | identity (automatic) | Primary key. Supabase adds this column for you. |
    | `created_at` | `timestamptz` | yes | `now()` | Supabase adds this column for you. |
    | `name` | `text` | yes | none | The pet's name |
    | `species` | `text` | yes | none | e.g. `dog`, `cat`, `rabbit`, `guinea pig` |
    | `age` | `int4` | yes | none | Age in whole years. Use `0` for babies under 1. |
    | `adopted` | `bool` | yes | `false` | Has the pet found a home? |
    | `vaccinated` | `bool` | yes | `false` | |
    | `description` | `text` | no | none | Can be empty (null) |

    1. In the dashboard, open the **Table Editor** and click **New table**.
    2. Name it `pets`.
    3. **Untick "Enable Row Level Security (RLS)".** Supabase will warn you about this. Read the RLS warning below, then confirm.
    4. Leave the `id` and `created_at` columns that Supabase already added.
    5. Click **Add column** for each of the other columns. Set the name, the type and the default value. For a required column, open the column's settings (the cog icon) and untick **Is Nullable**, which means "this column must always have a value".
    6. Click **Save**.
    7. Add the sample pets below. Click **Insert → Insert row** for each one. Leave `id` and `created_at` empty, since Supabase fills those in.

    | name | species | age | adopted | vaccinated | description |
    | --- | --- | --- | --- | --- | --- |
    | Biscuit | dog | 3 | false | true | Loves tennis balls and belly rubs. |
    | Mittens | cat | 1 | true | true | Small, fluffy, and in charge. |
    | Thumper | rabbit | 2 | false | false | Enjoys carrots and zoomies. |
    | Rex | dog | 9 | false | true | A gentle old gentleman. |
    | Luna | cat | 4 | false | false | Quiet, curious, likes windowsills. |
    | Pickles | guinea pig | 0 | false | true | Squeaks when the fridge opens. |
    | Shadow | cat | 12 | true | true | Wise and sleepy. |
    | Ziggy | dog | 0 | false | false | A very excitable puppy. |

    **Check:** the Table Editor shows 8 rows, and every column name matches the schema exactly (all lower case).

    **Get your keys**

    Click **Connect** at the top of the project (or go to **Project Settings → API Keys**) and copy the **Project URL** and the **Publishable key** (`sb_publishable_…`).

    **Challenge (optional):** instead of clicking through the Table Editor, write SQL in the **SQL Editor** that creates the same table, turns off RLS and inserts the 8 rows. Look up `create table`, `alter table … disable row level security` and `insert into` in the Supabase docs.

!!! warning "About RLS"
    We've turned RLS **off** so we can focus on React, which means **anyone with your publishable key can read and change this table**. That's OK for a practice project full of made-up pets. **Never** do this with real or private data.

!!! danger
    Do **not** use the **secret** key (`sb_secret_…`). It skips every security rule and gives full control of your database. Anything in front-end code can be read by anyone who visits your site.

??? tip "Stuck? Show SQL that builds the table for you"
    Try the Table Editor first. If you can't get the table right, run this in the Supabase **SQL Editor**. It creates the table, turns off RLS, gives the publishable key access and adds the 8 pets. If a table called `pets` already exists, delete it first.

    ```sql
    create table pets (
        id bigint generated always as identity primary key,
        name text not null,
        species text not null,
        age int not null,
        adopted boolean not null default false,
        vaccinated boolean not null default false,
        description text,
        created_at timestamptz not null default now()
    );

    -- Keep things simple for learning: no Row Level Security
    alter table pets disable row level security;

    -- Let the publishable key read and update the table
    grant select, insert, update, delete on table pets to anon;

    insert into pets (name, species, age, adopted, vaccinated, description) values
        ('Biscuit', 'dog', 3, false, true, 'Loves tennis balls and belly rubs.'),
        ('Mittens', 'cat', 1, true, true, 'Small, fluffy, and in charge.'),
        ('Thumper', 'rabbit', 2, false, false, 'Enjoys carrots and zoomies.'),
        ('Rex', 'dog', 9, false, true, 'A gentle old gentleman.'),
        ('Luna', 'cat', 4, false, false, 'Quiet, curious, likes windowsills.'),
        ('Pickles', 'guinea pig', 0, false, true, 'Squeaks when the fridge opens.'),
        ('Shadow', 'cat', 12, true, true, 'Wise and sleepy.'),
        ('Ziggy', 'dog', 0, false, false, 'A very excitable puppy.');
    ```

## Set Up Next.js

!!! abstract "Instructions"
    1. Create and run a new app called `pet-adoption`. Press **Enter** to accept every default question.

        ```bash
        npx create-next-app@latest pet-adoption
        cd pet-adoption
        npm run dev
        ```

    2. Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

        ```css
        button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
        ```

    3. Create a file called `.env.local` in the root of the project, next to `package.json` (**not** inside `app/`), with your own URL and key:

        ```bash
        NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
        ```

        Then **stop and restart** `npm run dev`, because env files are only read when the server starts.

    4. Create `app/lib/supabase.ts` using the starter code below. Every page will import from this file, so you only write these things once.

    Every page you make in this project starts with `"use client";` on line 1.

??? code "click to expand"
    ```tsx
    // app/lib/supabase.ts
    export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

    // Every request to Supabase needs the key in an "apikey" header
    export const headers = {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
    };

    export type Pet = {
        id: number;
        name: string;
        species: string;
        age: number;
        adopted: boolean;
        vaccinated: boolean;
        description: string | null;
        created_at: string;
    };
    ```

![The page fetches from Supabase's REST API inside useEffect and gets back a JSON array of pets](../../assets/diagrams/project-request-flow.svg)

### Supabase REST cheat sheet

| What | URL (add to `SUPABASE_URL`) | Method |
| --- | --- | --- |
| All pets, sorted by name | `/rest/v1/pets?select=*&order=name.asc` | `GET` |
| One pet (id 3) | `/rest/v1/pets?select=*&id=eq.3` | `GET` |
| Update pet 3 | `/rest/v1/pets?id=eq.3` | `PATCH` |

Supabase always returns an **array**, even when you ask for one pet by id. One pet comes back as `[ { … } ]`, and a missing pet comes back as `[]`.

By the end of the project your files will look like this:

![The finished Pet Adoption Board file structure: .env.local at the root, and app containing lib/supabase.ts, components/PetCard.tsx, and pets with a list page and an [id] folder holding loading.tsx and the detail page](../../assets/diagrams/structure-pet-adoption.svg)

## Pets List Page

!!! abstract "Instructions"
    Create `app/pets/page.tsx` and visit `http://localhost:3000/pets`.

    1. State: `pets`, `loading` and `error`.
    2. In `useEffect`, fetch all pets, sorted by name. Pass `{ headers }` as the second argument to `fetch`, and check the response with an `if` before you read it:

        ```tsx
        fetch(`${SUPABASE_URL}/rest/v1/pets?select=*&order=name.asc`, { headers })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
        ```

        Then add `.then`, `.catch` and `.finally` the same way you did in the useEffect tasks. (An `async` arrow function works too, if you prefer it.)

    3. Show loading, error, empty and the list. A nested ternary works well here, because only one of them shows at a time.
    4. Create a `PetCard` component in `app/components/PetCard.tsx` that takes a `pet` prop. Each card shows:
        - The pet's name as a link to `/pets/[id]`
        - A species emoji: 🐶 dog, 🐱 cat, 🐰 rabbit, 🐾 anything else. That's four options, so write a small `speciesEmoji` function with `if` statements instead of a nested ternary.
        - The age: `"1 year old"` / `"3 years old"`, or `"Under 1 year old"` when the age is `0`
        - An `"Adopted 🏡"` / `"Available"` badge, with a different colour for each
        - `"💉 Vaccinated"`, but only if the pet is vaccinated
    5. Map over the pets and render a `PetCard` for each one.

    **Check:** all 8 pets show with the right labels. Break the URL for a moment (e.g. `petz`) to test your error state.

??? code "click to expand"
    ```tsx
    // app/components/PetCard.tsx
    import Link from "next/link";
    import { Pet } from "@/app/lib/supabase";

    // Four options, so if statements read better than a nested ternary
    export const speciesEmoji = (species: string) => {
        // TODO
    };

    export const ageText = (age: number) => {
        // TODO
    };

    const PetCard = ({ pet }: { pet: Pet }) => {
        return (
            <li>
                {/* TODO */}
            </li>
        );
    };

    export default PetCard;
    ```

??? hint "Hint - Click to expand"
    - Export `speciesEmoji` and `ageText` from `PetCard.tsx` so the detail page can reuse them later.
    - `ageText` needs an early `return` for age `0`, then a template literal with a plural ternary for everything else.
    - The badge colour is a ternary on the `style` (e.g. `backgroundColor`), and "Vaccinated" is a show-or-nothing job for `&&`.
    - The link's `href` is a template literal that puts `pet.id` after `/pets/`.
    - In the page, import with `import PetCard from "@/app/components/PetCard";` and `import { headers, Pet, SUPABASE_URL } from "@/app/lib/supabase";`.

## Filters

!!! abstract "Instructions"
    On the list page, add:

    1. A `status` state (starting as `"all"`) and three buttons: **All**, **Available** and **Adopted**. The active button is bold.
    2. A search box that filters by name. Make it case-insensitive by comparing `toLowerCase()` versions of both.
    3. A heading showing the count: `"Showing 3 pets"` / `"Showing 1 pet"`.
    4. If the filters match nothing, show `"No pets match your filters"` and a **Clear filters** button. This is a different message from the empty state, because here the database has pets and the filters are hiding them.

    Filter in JavaScript with `.filter()` on the `pets` array. You don't need to fetch again. The status check has three options, so it reads well as a small function with `if` statements that you pass to `.filter()`:

    ```tsx
    const matchesStatus = (pet: Pet) => {
        if (status === "available") return !pet.adopted;
        if (status === "adopted") return pet.adopted;
        return true; // "all"
    };
    ```

??? hint "Hint - Click to expand"
    - Chain two filters: the first takes `matchesStatus` by name, the second checks the search text with `.includes()`. Store the result in a `visible` variable and map over that instead of `pets`.
    - The filter controls and heading only make sense once the pets have loaded, so they belong in the "data" branch of your ternary. Wrap that branch in a fragment `<> </>`.
    - Inside the data branch, another ternary on `visible.length` chooses between the "No pets match" message and the list.
    - **Clear filters** is a handler that sets both the status and the search back to their starting values.

## Pet Detail Page

!!! abstract "Instructions"
    Create `app/pets/[id]/page.tsx`, plus a `loading.tsx` next to it.

    1. Get the id with `useParams<{ id: string }>()`.
    2. State: `pet` (`Pet | null`), `loading` and `error`.
    3. Fetch one pet, checking `res.ok` the same way as the list page:

        ```tsx
        fetch(`${SUPABASE_URL}/rest/v1/pets?select=*&id=eq.${params.id}`, { headers })
        ```

        You get back an **array**, so store `data[0] ?? null`.

    4. Show loading, error, not found, or the pet.
    5. Show everything about the pet. Reuse `speciesEmoji` and `ageText` by importing them from `PetCard.tsx`. If the description is empty, show `"No description yet"`.
    6. Add a `← Back to all pets` link.

    **Check:** click through from the list. Then try `/pets/999` (not found) and `/pets/abc`. The second one makes Supabase answer with `Error 400` because `abc` isn't a number, so your error state should show it. To see Supabase's full message, open the browser's **Network** tab and click the request.

??? hint "Hint - Click to expand"
    - The effect's dependency array should contain `params.id`.
    - The render is a three-level nested ternary: loading, error, `pet === null`, then the details in a fragment.
    - `pet.description` is `string | null`. A ternary on it chooses between the description and the fallback text.
    - Import the helpers with `import { ageText, speciesEmoji } from "@/app/components/PetCard";`.
    - Put the back link outside the ternary so it shows in every state.

## Adopt Button

!!! abstract "Instructions"
    On the detail page, add a button that changes the database. Clicking it sends a `PATCH` request that flips `adopted` between `true` and `false`:

    ```tsx
    fetch(`${SUPABASE_URL}/rest/v1/pets?id=eq.${pet.id}`, {
        method: "PATCH",
        headers: {
            ...headers,
            "Content-Type": "application/json",
            Prefer: "return=representation", // ask Supabase to send back the updated row
        },
        body: JSON.stringify({ adopted: !pet.adopted }),
    })
    ```

    1. Put the request in a click handler, `const toggleAdopted = () => { … }`. This fetch happens when the user clicks, so it goes in the handler, not in `useEffect`.
    2. When it succeeds, store the row Supabase sends back with `setPet(data[0])`. The page updates by itself.
    3. Add a `saving` state. While saving, disable the button and show `"Saving…"`. Otherwise the button says `` `Adopt ${pet.name}` `` or `"Mark as available"`.
    4. If the request fails, show the error under the button.

    **Check:** adopt a pet, then go back to the list. It should show as adopted there too. Look in the Supabase Table Editor as well.

??? hint "Hint - Click to expand"
    - Start the handler with `if (!pet) return;`. That stops the function early when there's nothing to update, which is a job for `if`, not a ternary.
    - Use a **separate** error state for saving (e.g. `saveError`), so a failed save doesn't replace the whole page with the load error.
    - Calling `setSaving(true)` straight away is fine here because it runs inside a click handler.
    - The button text is a nested ternary: saving first, then adopted or not.
    - The error under the button is a show-or-nothing job for `&&`.

## Final Checks

!!! abstract "Instructions"
    Before you call it done, go through your code and check each of these:

    1. The functions you hand to something else are arrow functions: your `onClick` handlers and the callbacks you pass to `.map()`, `.filter()`, `.then()` and `useEffect`.
    2. Each ternary chooses between two things (or three, for loading / error / list) and is easy to read. If one has four or more options, or it's doing something rather than choosing a value, rewrite it with `if`.
    3. You've used `&&` (not a ternary with `null`) for anything that's "show this or nothing".
    4. Every fetch shows a loading state and an error state. Test the error state by breaking the URL for a moment.
    5. The list page has an empty state, and the detail page has a "not found" state. Test it by visiting `/pets/999`.
    6. The detail page uses `useParams`.
    7. The publishable key comes from `.env.local`, and isn't typed straight into your components. Search your `app` folder for `sb_publishable`. There should be no matches.
    8. Running `npm run lint` in the terminal shows no errors.

## Stretch Goals

!!! abstract "Instructions"
    Pick any of these:

    1. **Species filter:** add a `<select>` with All / dog / cat / rabbit / other. Write a `matchesSpecies` function with `if` statements, like `matchesStatus`, where "other" means anything that isn't a dog, cat or rabbit.
    2. **Add a pet:** create `app/pets/new/page.tsx` with a form (name, species, age, vaccinated checkbox, description). `POST` it to `/rest/v1/pets`, then show a link to the new pet's page. Disable the button until a name is typed in.
    3. **Stats:** on the list page, show `"5 of 8 pets still need a home"`, or `"Every pet has a home! 🎉"` when none are available.
    4. **Sort:** add a dropdown to sort by name or by age. Change the `order=` part of the URL (e.g. `order=age.asc`) and fetch again when it changes, by putting the sort value in the effect's dependency array.
    5. **Delete:** add a delete button on the detail page using `method: "DELETE"`. Ask first with `if (!confirm("Are you sure?")) return;`. After deleting, show `"Pet deleted"` and a link back.

??? hint "Hint - Click to expand"
    - **Add a pet:** the `POST` request looks like the `PATCH` one, without `?id=eq.` in the URL and with all the form values in the body. Once the pet is added the whole page is different, so an early `return` inside an `if (created)` is simpler than wrapping everything in a ternary. `app/pets/new` is a normal folder, so it wins over `app/pets/[id]` for the URL `/pets/new`.
    - **Sort:** add the sort state to the URL with a template literal, and to the dependency array. Remember to set `loading` back to `true` in the dropdown's change handler.

## Troubleshooting

| You see | Likely cause |
| --- | --- |
| `Invalid API key` / `No API key found` | `.env.local` is in the wrong place, has a typo, or you didn't restart `npm run dev`. |
| `Error 404`, and the Network tab shows a request to `localhost:3000/rest/v1/pets` | The env variable isn't being read, so the Supabase URL is empty. Check `.env.local` and restart `npm run dev`. |
| `permission denied for table pets` | Your project hasn't given the publishable key access to the table. Run the `grant` line from the SQL in the Set Up Supabase section, or ask your teacher. |
| `relation "public.pets" does not exist` | The table wasn't created, or it has a different name (check for capitals). Look in the Table Editor. |
| `Error 400` on `/pets/abc` | Expected: `abc` isn't a number. The Network tab shows Supabase's full message. |
| The list loads but the detail page is always "not found" | Check that you're using `data[0]`, and that the filter is `id=eq.${params.id}`. |
| A column is missing or always empty | The column name in Supabase doesn't match the schema. Names are case-sensitive. |
| ``encountered URL data `useParams()` … outside of `<Suspense>` `` | You forgot `app/pets/[id]/loading.tsx`. |
| The adopt button works but the page doesn't change | Did you add `Prefer: return=representation` and use `data[0]`? |
