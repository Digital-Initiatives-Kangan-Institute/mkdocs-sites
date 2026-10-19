# Supabase Client CRUD

These exercises practise the four database operations with the Supabase client library: **Create**, **Read**, **Update** and **Delete**. They are repetitive on purpose. You will do each operation on three different tables, then do all four again from memory, until you can write `.select()`, `.insert()`, `.update()` and `.delete()` without looking them up.

Styling doesn't matter here. Plain HTML is fine.

Revisit [Supabase Client Library](../resources/supabase/supabase-client.md) while you work.

## Setup

!!! abstract "Instructions"
    **Create the Supabase project**

    1. Go to `https://supabase.com/dashboard` and create a new project called `crud-practice`.
    2. Wait for the project to finish setting up.

    **Build the tables yourself**

    Create the four tables below in the **Table Editor**. Match the column names and types exactly, because your code will rely on them. For each table:

    1. Click **New table** and type the table name.
    2. **Untick "Enable Row Level Security (RLS)".** Read the RLS warning below, then confirm.
    3. Leave the `id` and `created_at` columns that Supabase already added.
    4. Click **Add column** for each of the other columns. Set its name, type and default value. Open the column's settings (the cog icon) and untick **Is Nullable**, so the column must always have a value.
    5. Click **Save**.
    6. Add the sample rows with **Insert → Insert row**. Leave `id` and `created_at` empty, because Supabase fills them in.

    **`fruits`**

    | Column | Type | Default value |
    | --- | --- | --- |
    | `name` | `text` | none |
    | `colour` | `text` | none |

    | name | colour |
    | --- | --- |
    | Apple | red |
    | Banana | yellow |
    | Grape | purple |
    | Lime | green |

    **`songs`**

    | Column | Type | Default value |
    | --- | --- | --- |
    | `title` | `text` | none |
    | `artist` | `text` | none |
    | `rating` | `int4` | `3` |

    | title | artist | rating |
    | --- | --- | --- |
    | Paper Planes | The Weekenders | 4 |
    | Blue Sky | Sunny Days | 5 |
    | Slow Walk | The Turtles Club | 2 |

    **`todos`**

    | Column | Type | Default value |
    | --- | --- | --- |
    | `task` | `text` | none |
    | `done` | `bool` | `false` |

    | task | done |
    | --- | --- |
    | Buy milk | false |
    | Finish homework | true |
    | Walk the dog | false |

    **`movies`**

    | Column | Type | Default value |
    | --- | --- | --- |
    | `title` | `text` | none |
    | `year` | `int4` | none |
    | `watched` | `bool` | `false` |

    | title | year | watched |
    | --- | --- | --- |
    | Toy Story | 1995 | true |
    | Finding Nemo | 2003 | false |
    | Inside Out | 2015 | false |

    **Check:** the Table Editor shows all four tables, and every column name is lower case and matches the schema exactly.

    **Get your keys**

    Click **Connect** at the top of the project (or go to **Project Settings → API Keys**) and copy the **Project URL** and the **Publishable key** (`sb_publishable_…`).

    **Create the Next.js app**

    1. Create and run a new app called `crud-practice`. Press **Enter** to accept every default question.

        ```bash
        npx create-next-app@latest crud-practice
        cd crud-practice
        npm install @supabase/supabase-js
        npm run dev
        ```

    2. Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

        ```css
        button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
        ```

    3. Create `.env.local` in the root of the project, next to `package.json`, with your own URL and key. Then **stop and restart** `npm run dev`.

        ```bash
        NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
        ```

    4. Create `app/lib/supabase.ts` using the code below. Every page imports the client and types from this file.
    5. Each exercise goes in its own folder: `app/task1/page.tsx`, `app/task2/page.tsx` and so on. Visit `http://localhost:3000/task1` to see the first one.

    **Every page starts with `"use client";` on line 1.**

??? code "click to expand"
    ```tsx
    // app/lib/supabase.ts
    import { createClient } from "@supabase/supabase-js";

    export const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
    );

    export type Fruit = { id: number; name: string; colour: string };
    export type Song = { id: number; title: string; artist: string; rating: number };
    export type Todo = { id: number; task: string; done: boolean };
    export type Movie = { id: number; title: string; year: number; watched: boolean };
    ```

!!! warning "About RLS"
    RLS is **off** on these tables, which means **anyone with your publishable key can read and change them**. That's fine for practice tables full of made-up data. **Never** do this with real or private data.

!!! tip "Seeing `permission denied for table ...`?"
    Your publishable key hasn't been given access to the table. Open the **SQL Editor** and run `grant select, insert, update, delete on table <table_name> to anon;`, replacing `<table_name>` with your table's name.

---

## Read

### Read Fruits

!!! abstract "Instructions"
    Create `app/task1/page.tsx`.

    1. Add a `fruits` state that starts as an empty array.
    2. Write an `async` function called `loadFruits` that selects every row from the `fruits` table.
    3. If there is an `error`, `console.log` its message. Otherwise, put `data` into the `fruits` state.
    4. Call `loadFruits` inside a `useEffect` so it runs once when the page opens.
    5. Show each fruit's name in a `<li>`.

    **Check:** the page shows Apple, Banana, Grape and Lime.

??? code "click to expand"
    ```tsx
    "use client";

    import { useEffect, useState } from "react";
    import { supabase, Fruit } from "../lib/supabase";

    const Task1 = () => {
        const [fruits, setFruits] = useState<Fruit[]>([]);

        const loadFruits = async () => {
            // TODO: select every row from "fruits"
            // TODO: check error, then set the fruits state
        };

        useEffect(() => {
            // Safe: loadFruits only sets state after the data arrives
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadFruits();
        }, []);

        return (
            <main>
                <h1>Fruits</h1>
                <ul>
                    {/* TODO: map over fruits */}
                </ul>
            </main>
        );
    };

    export default Task1;
    ```

??? hint "Hint - Click to expand"
    Start with `supabase.from("fruits")`, then chain `.select("*")`. Put `await` in front and destructure the answer into `{ data, error }`. Use `.map()` to turn each fruit into a `<li>`, with `key={fruit.id}`.

### Read Songs

!!! abstract "Instructions"
    Create `app/task2/page.tsx`. Do the same as the last exercise, but for the `songs` table.

    1. Add a `songs` state, a `loadSongs` function and a `useEffect`.
    2. Show each song as `Paper Planes by The Weekenders (4 stars)`.

    **Check:** the page shows all three songs.

??? hint "Hint - Click to expand"
    This is the same code as Task 1 with different names. Change `Fruit` to `Song`, `"fruits"` to `"songs"`, and read `song.title`, `song.artist` and `song.rating` in the `<li>`.

### Read Todos

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. Do it again for the `todos` table.

    1. Add a `todos` state, a `loadTodos` function and a `useEffect`.
    2. Show each todo's task. Put `(done)` after the tasks that are done.

    **Check:** the page shows three tasks, and only **Finish homework** says `(done)`.

??? hint "Hint - Click to expand"
    Same pattern again. For the `(done)` text, use a ternary that checks `todo.done`, and show an empty string when it is false.

### Sorting and Filtering

!!! abstract "Instructions"
    Create `app/task4/page.tsx`. Load and show **three** lists on one page, each with its own state and its own load function:

    1. **Fruits A to Z**: every fruit, sorted by `name`, A to Z.
    2. **Best songs first**: every song, sorted by `rating`, highest first.
    3. **Still to do**: only the todos where `done` is `false`.

    You can call all three load functions inside the same `useEffect`.

    **Check:** the fruits are in alphabetical order, **Blue Sky** is the first song, and **Finish homework** is not in the todo list.

??? hint "Hint - Click to expand"
    Chain one more method after `.select("*")`. Sorting uses `.order()` with the column name and an `ascending` option of `true` or `false`. Filtering uses `.eq()` with the column name and the value it must equal.

---

## Create

### Add a Fruit

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. Copy your Task 1 page in as a starting point, and rename the component to `Task5`.

    1. Add two more states, `name` and `colour`, for two text inputs.
    2. Add an **Add fruit** button.
    3. When it is clicked, insert a new row into `fruits` using the two values.
    4. If it worked, empty both inputs and call `loadFruits()` again so the new fruit appears.
    5. If `name` or `colour` is empty, don't insert anything.

    **Check:** add **Mango** / **orange**. It appears in the list. Refresh the page and it is still there, because it was saved in Supabase.

??? code "click to expand"
    ```tsx
    const [name, setName] = useState("");
    const [colour, setColour] = useState("");

    const addFruit = async () => {
        // TODO: stop if name or colour is empty
        // TODO: insert into "fruits"
        // TODO: check error, empty the inputs, load the fruits again
    };
    ```

??? hint "Hint - Click to expand"
    `.insert()` takes an object whose keys match the column names: `name` and `colour`. You don't need `data` back this time, so you can destructure just `{ error }`. Leave out `id`, because Supabase fills it in. To empty an input, set its state back to `""`.

### Add a Song

!!! abstract "Instructions"
    Create `app/task6/page.tsx`, starting from your Task 2 page.

    1. Add inputs for `title`, `artist` and `rating`. Use `type="number"` for the rating input.
    2. Add an **Add song** button that inserts the new song, empties the inputs and loads the songs again.

    **Check:** add a song with a rating of `5`. It appears in the list with `(5 stars)`.

??? hint "Hint - Click to expand"
    Same steps as Task 5. An input's value is always text, even with `type="number"`, so turn the rating into a number with `Number(rating)` before you insert it, because the `rating` column is a whole number.

### Add a Todo

!!! abstract "Instructions"
    Create `app/task7/page.tsx`, starting from your Task 3 page.

    1. Add one input for the `task`, and an **Add** button.
    2. Insert the new todo, empty the input and load the todos again.
    3. Don't send `done`. Check in the Table Editor that Supabase set it to `false` for you.

    **Check:** add **Clean my room**. It appears in the list without `(done)`.

??? hint "Hint - Click to expand"
    The `done` column has a default value of `false`, so you can leave it out of the insert object, just like `id`.

---

## Update

!!! note "Why did my row move?"
    After you update a row, it may jump to the bottom of the list. Supabase doesn't keep rows in any order unless you ask for one. To keep the list still, add `.order("id", { ascending: true })` to your load function in each of these exercises.

### Rename a Fruit

!!! abstract "Instructions"
    Create `app/task8/page.tsx`, starting from your Task 1 page.

    1. Next to each fruit, add a **Rename** button.
    2. When it is clicked, ask for the new name with `prompt("New name?")`.
    3. If the user typed something, update that fruit's `name` in Supabase, then load the fruits again.

    **Check:** rename **Lime** to **Lemon**. Refresh the page and it still says Lemon.

??? code "click to expand"
    ```tsx
    const renameFruit = async (id: number) => {
        const newName = prompt("New name?");
        // TODO: stop if newName is empty or null
        // TODO: update the name of the fruit with this id
        // TODO: check error, load the fruits again
    };
    ```

??? hint "Hint - Click to expand"
    `.update()` takes an object with only the columns you want to change. Then chain `.eq()` to choose the row: the column is `"id"` and the value is the `id` passed in. In the button, wrap the call in an arrow function, `onClick={() => renameFruit(fruit.id)}`, so `renameFruit` only runs when the button is clicked.

### Tick Off a Todo

!!! abstract "Instructions"
    Create `app/task9/page.tsx`, starting from your Task 3 page.

    1. Put a checkbox in front of each todo. It is ticked when `todo.done` is `true`.
    2. When the checkbox is clicked, update that todo's `done` to the **opposite** of what it is now, then load the todos again.

    **Check:** tick **Buy milk**, then refresh the page. It is still ticked. Untick it and refresh again.

??? hint "Hint - Click to expand"
    Use `<input type="checkbox" checked={todo.done} onChange={...} />`. Pass the whole `todo` to your function so it can read the current value. The `!` operator flips a boolean, so the opposite of `todo.done` is `!todo.done`. Update with `.update()` and `.eq("id", ...)`, exactly like Task 8.

### Rate a Song

!!! abstract "Instructions"
    Create `app/task10/page.tsx`, starting from your Task 2 page.

    1. Next to each song, add a **+** button and a **-** button.
    2. **+** updates the song's `rating` to one more than it is now. **-** updates it to one less.
    3. Load the songs again after each update.
    4. **Extra:** don't let the rating go above 5 or below 1.

    **Check:** click **+** on **Slow Walk** until it reaches 5 stars, then refresh. It still says 5.

??? hint "Hint - Click to expand"
    You can write one function, `changeRating`, that takes the `song` and an `amount` (`1` or `-1`). The new rating is `song.rating + amount`. For the extra, use an `if` to `return` early when the new rating is out of range.

---

## Delete

### Delete a Fruit

!!! abstract "Instructions"
    Create `app/task11/page.tsx`, starting from your Task 1 page.

    1. Next to each fruit, add a **Delete** button.
    2. When it is clicked, delete that fruit from Supabase, then load the fruits again.

    **Check:** delete **Grape**. Refresh the page; it is gone. The Table Editor no longer shows it either.

??? code "click to expand"
    ```tsx
    const deleteFruit = async (id: number) => {
        // TODO: delete the fruit with this id
        // TODO: check error, load the fruits again
    };
    ```

??? hint "Hint - Click to expand"
    `.delete()` takes no arguments. Chain `.eq()` after it to choose the row, exactly like an update. Without `.eq()`, Supabase refuses the request, because it would delete every row.

### Delete a Song

!!! abstract "Instructions"
    Create `app/task12/page.tsx`, starting from your Task 2 page.

    1. Add a **Delete** button next to each song.
    2. Before deleting, ask `confirm("Delete this song?")`. Only delete if it returns `true`.
    3. Load the songs again afterwards.

    **Check:** click **Delete** and then **Cancel**. The song is still there. Click **Delete** and **OK**. It is gone.

??? hint "Hint - Click to expand"
    `confirm()` shows a box with **OK** and **Cancel** and gives back `true` or `false`. Use an `if` with it to `return` early before the delete runs.

### Clear Finished Todos

!!! abstract "Instructions"
    Create `app/task13/page.tsx`, starting from your Task 9 page (the one with checkboxes).

    1. Add one **Clear finished** button under the list.
    2. When it is clicked, delete **every** todo where `done` is `true` with a single query, then load the todos again.

    **Check:** tick two todos, click **Clear finished**, and only the unticked todos are left.

??? hint "Hint - Click to expand"
    `.eq()` doesn't have to use `id`. Any column works, so filter on the `done` column with the value `true`. That deletes all the matching rows at once.

---

## All Four From Memory

### Movie Watchlist

!!! abstract "Instructions"
    Create `app/task14/page.tsx` for the `movies` table. Try not to look back at your other pages.

    1. **Read**: show every movie as `Toy Story (1995)`, newest year first.
    2. **Create**: add a movie with a `title` input, a `year` number input and an **Add** button.
    3. **Update**: a checkbox in front of each movie that sets `watched`.
    4. **Delete**: a **Delete** button next to each movie.

    Load the movies again after every change.

    **Check:** add a movie, tick it, refresh the page, and it is still ticked. Then delete it.

??? hint "Hint - Click to expand"
    You need one load function and three change functions: add, toggle and delete. Every change function follows the same three steps: run a query on `supabase.from("movies")`, check `error`, then call the load function. Look at the cheat sheet in [Supabase Client Library](../resources/supabase/supabase-client.md) only if you're stuck.

### Your Own Table

!!! abstract "Instructions"
    1. In the Supabase **Table Editor**, create your own table with RLS turned off. Pick any topic: games, recipes, pets, books. Give it at least three columns besides `id`, including one `text`, one `int4` and one `bool`.
    2. Add a type for it to `app/lib/supabase.ts`.
    3. Create `app/task15/page.tsx` with all four operations: list, add, change, delete.

    **Check:** every operation still shows its change after you refresh the page.

??? hint "Hint - Click to expand"
    Column names in your code must match Supabase exactly, including capitals. If you see `permission denied`, see the tip in the Setup section. If you see `Could not find the table ... in the schema cache`, check the table name in `.from()`.
