# Mantine Book Tracker

This is a **guided activity**. Step by step, you'll build a small reading list app where you can add books, tick them off when you've finished them, edit them and delete them. The books are saved in Supabase using the client library, and the interface is built with Mantine.

By the end, the app uses all four CRUD operations:

- **Create**: add a book
- **Read**: show every book, newest first
- **Update**: tick a book as finished, and edit its title or author
- **Delete**: remove a book

Type the code out yourself rather than copying and pasting it. Read the explanation under each block before moving on.

Revisit [Supabase Client Library](../resources/supabase/supabase-client.md) and [Mantine UI](../resources/mantine/mantine.md) while you work. If you haven't done [Supabase Client CRUD](supabase-client-crud.md) yet, do that first.

## Set Up Supabase

!!! abstract "Instructions"
    1. Go to `https://supabase.com/dashboard` and create a new project called `book-tracker`.
    2. When it has finished setting up, open the **SQL Editor**, paste in the SQL below and click **Run**.
    3. Open the **Table Editor** and check that the `books` table has 3 rows.
    4. Click **Connect** at the top of the project (or go to **Project Settings → API Keys**) and copy the **Project URL** and the **Publishable key** (`sb_publishable_…`).

```sql
create table books (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now(),
    title text not null,
    author text not null,
    finished boolean not null default false
);

-- Keep things simple for learning: no Row Level Security
alter table books disable row level security;

-- Let the publishable key read, add, change and delete books
grant select, insert, update, delete on table books to anon;

insert into books (title, author, finished) values
    ('The Hobbit', 'J.R.R. Tolkien', true),
    ('Wonder', 'R.J. Palacio', false),
    ('Holes', 'Louis Sachar', false);
```

The `books` table has five columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `int8` | Filled in by Supabase. Used to pick one book to update or delete. |
| `created_at` | `timestamptz` | Filled in by Supabase. Used to sort newest first. |
| `title` | `text` | The book's title |
| `author` | `text` | Who wrote it |
| `finished` | `bool` | Starts as `false` |

!!! warning "About RLS"
    RLS is **off**, so **anyone with your publishable key can read and change this table**. That's fine for a practice project. **Never** do this with real or private data.

---

## Set Up Next.js and Mantine

!!! abstract "Instructions"
    Create the app and install Mantine and the Supabase client. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest book-tracker
    cd book-tracker
    npm install @mantine/core @mantine/hooks @supabase/supabase-js
    npm run dev
    ```

    Then make these three changes.

**1. Empty `app/globals.css`.** Delete everything inside it, so it doesn't fight with Mantine's styles.

**2. Replace `app/layout.tsx`** with this:

```tsx
// app/layout.tsx
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider>{children}</MantineProvider>
            </body>
        </html>
    );
}
```

This is the same layout as in [Mantine Form Inputs](mantine-form-inputs.md). `MantineProvider` must wrap the whole app so every Mantine component gets its styles.

**3. Connect to Supabase.** Create `.env.local` in the root of the project, next to `package.json`, with your own URL and key:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
```

Then **stop and restart** `npm run dev`, because env files are only read when the server starts.

Now create `app/lib/supabase.ts`:

```tsx
// app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
);

export type Book = {
    id: number;
    created_at: string;
    title: string;
    author: string;
    finished: boolean;
};
```

- `supabase` is the one client every file uses to talk to the database
- `Book` describes one row of the `books` table, with one property per column

---

## Read: Show the Books

Replace everything in `app/page.tsx` with this:

```tsx
// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Alert, Card, Container, Loader, Stack, Text, Title } from "@mantine/core";
import { supabase, Book } from "./lib/supabase";

const Home = () => {
    // The list of books, and whether it is still loading
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // READ: get every book, newest first
    const loadBooks = async () => {
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setBooks(data);
        }
        setLoading(false);
    };

    // Load the books once, when the page opens
    useEffect(() => {
        // Safe: loadBooks only sets state after the data arrives
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadBooks();
    }, []);

    return (
        <Container size="sm" py="xl">
            <Stack>
                <Title>Book Tracker</Title>

                {error && <Alert color="red" title="Something went wrong">{error}</Alert>}

                {loading && <Loader />}

                {!loading && books.length === 0 && <Text c="dimmed">No books yet.</Text>}

                {books.map((book) => (
                    <Card key={book.id} withBorder>
                        <Text fw={500}>{book.title}</Text>
                        <Text size="sm" c="dimmed">{book.author}</Text>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default Home;
```

How it works:

1. **Three states.** `books` holds the rows, `loading` is `true` until the first answer arrives, and `error` holds a message if something goes wrong.
2. **`loadBooks`** asks Supabase for every row in `books`, newest first. If there's an `error`, its message goes into the `error` state. Otherwise, the rows go into `books`.
3. **`useEffect(..., [])`** runs `loadBooks` once, when the page opens. The comment above `loadBooks()` stops ESLint from warning about it. It's safe here, because `loadBooks` only changes state *after* Supabase answers.
4. **`{error && ...}`** shows the red `Alert` only when `error` isn't an empty string. The `Loader` and the "No books yet" text work the same way.
5. **`books.map(...)`** turns each book into a `Card`, with `key={book.id}` so React can keep track of them.

**Check:** the page shows three cards, with **Holes** first. To test the error alert, change `"books"` to `"bookz"` for a moment, then change it back.

---

## Create: Add a Book

Add two states for the form, under the three you already have:

```tsx
// The "Add a book" form
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
```

Add an `addBook` function under `useEffect`:

```tsx
// CREATE: add a new book
const addBook = async () => {
    if (title.trim() === "" || author.trim() === "") {
        return;
    }

    const { error } = await supabase
        .from("books")
        .insert({ title: title.trim(), author: author.trim() });

    if (error) {
        setError(error.message);
        return;
    }

    setTitle("");
    setAuthor("");
    loadBooks();
};
```

Add the form to the page, just under the `Alert`:

```tsx
<Card withBorder>
    <Stack>
        <TextInput
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <TextInput
            label="Author"
            value={author}
            onChange={(event) => setAuthor(event.currentTarget.value)}
        />
        <Button onClick={addBook}>Add book</Button>
    </Stack>
</Card>
```

Finally, add `Button` and `TextInput` to the Mantine import at the top of the file.

How it works:

1. **Each `TextInput` is controlled.** Its `value` comes from state, and `onChange` puts every key press back into state.
2. **`.trim()`** removes spaces from the start and end. If either box is empty (or only spaces), `return` stops the function before anything is sent.
3. **`.insert({ ... })`** adds one row. The keys match the column names. `id`, `created_at` and `finished` are left out because Supabase fills them in.
4. **On success**, the boxes are emptied and `loadBooks()` runs again, so the new book appears at the top.

**Check:** add a book. It appears at the top of the list. Refresh the page and it's still there. Try clicking **Add book** with an empty title; nothing should happen.

---

## Update: Tick Off a Finished Book

Add a `toggleFinished` function under `addBook`:

```tsx
// UPDATE: tick or untick "finished"
const toggleFinished = async (book: Book) => {
    const { error } = await supabase
        .from("books")
        .update({ finished: !book.finished })
        .eq("id", book.id);

    if (error) {
        setError(error.message);
        return;
    }

    loadBooks();
};
```

Replace the inside of each book's `Card` with a `Checkbox`, and add `Checkbox` and `Group` to the Mantine import:

```tsx
{books.map((book) => (
    <Card key={book.id} withBorder>
        <Group justify="space-between">
            <Checkbox
                checked={book.finished}
                onChange={() => toggleFinished(book)}
                label={
                    <div>
                        <Text fw={500} td={book.finished ? "line-through" : undefined}>
                            {book.title}
                        </Text>
                        <Text size="sm" c="dimmed">{book.author}</Text>
                    </div>
                }
            />
        </Group>
    </Card>
))}
```

How it works:

1. **`.update({ finished: !book.finished })`** sets `finished` to the opposite of what it is now. `!` flips `true` to `false` and `false` to `true`.
2. **`.eq("id", book.id)`** picks which row to change. Without it, Supabase would refuse the update, because it would change every book.
3. **`checked={book.finished}`** ticks the box when the book is finished.
4. **`td={... ? "line-through" : undefined}`** crosses out the title of a finished book. `td` is Mantine's shorthand for `text-decoration`.
5. **`Group justify="space-between"`** puts the checkbox on the left. The buttons you add next will sit on the right.

**Check:** tick **Wonder**. Its title is crossed out. Refresh the page and it's still ticked.

---

## Delete: Remove a Book

Add a `deleteBook` function under `toggleFinished`:

```tsx
// DELETE: remove a book
const deleteBook = async (id: number) => {
    const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", id);

    if (error) {
        setError(error.message);
        return;
    }

    loadBooks();
};
```

Add a **Delete** button inside the `Group`, just after the `Checkbox`:

```tsx
<Group gap="xs">
    <Button variant="light" color="red" onClick={() => deleteBook(book.id)}>
        Delete
    </Button>
</Group>
```

How it works:

1. **`.delete().eq("id", id)`** removes the one row whose `id` matches.
2. **`onClick={() => deleteBook(book.id)}`** uses an arrow function, so `deleteBook` only runs when the button is clicked. If you wrote `onClick={deleteBook(book.id)}` instead, it would run as soon as the page loads and delete every book.
3. **The inner `Group`** will hold both the **Edit** and **Delete** buttons once you add the next step.

**Check:** add a test book, then delete it. Refresh the page; it's gone.

---

## Update: Edit a Book in a Modal

The last step lets you fix a typo in a title or author. Clicking **Edit** opens a `Modal` with the book's current values already filled in.

Add three more states for the modal:

```tsx
// The "Edit book" modal
const [editingBook, setEditingBook] = useState<Book | null>(null);
const [editTitle, setEditTitle] = useState("");
const [editAuthor, setEditAuthor] = useState("");
```

Add two functions under `toggleFinished`:

```tsx
// UPDATE: open the modal with the book's current values
const openEdit = (book: Book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
};

// UPDATE: save the new title and author
const saveEdit = async () => {
    if (editingBook === null) {
        return;
    }

    const { error } = await supabase
        .from("books")
        .update({ title: editTitle.trim(), author: editAuthor.trim() })
        .eq("id", editingBook.id);

    if (error) {
        setError(error.message);
        return;
    }

    setEditingBook(null);
    loadBooks();
};
```

Add an **Edit** button before the **Delete** button:

```tsx
<Button variant="light" onClick={() => openEdit(book)}>
    Edit
</Button>
```

Add the `Modal` at the bottom of the page, after the closing `</Stack>` and before `</Container>`. Add `Modal` to the Mantine import.

```tsx
<Modal opened={editingBook !== null} onClose={() => setEditingBook(null)} title="Edit book">
    <Stack>
        <TextInput
            label="Title"
            value={editTitle}
            onChange={(event) => setEditTitle(event.currentTarget.value)}
        />
        <TextInput
            label="Author"
            value={editAuthor}
            onChange={(event) => setEditAuthor(event.currentTarget.value)}
        />
        <Button onClick={saveEdit}>Save</Button>
    </Stack>
</Modal>
```

How it works:

1. **`editingBook`** is the book being edited, or `null` when nothing is being edited. It tells you which book to save **and** whether the modal should be open, so you don't need a separate `opened` state.
2. **`opened={editingBook !== null}`** shows the modal whenever a book is being edited. **`onClose`** sets it back to `null`, which hides it.
3. **`openEdit`** copies the book's title and author into `editTitle` and `editAuthor`, so the inputs start filled in.
4. **`saveEdit`** updates both columns for that one book with `.eq("id", editingBook.id)`, closes the modal and loads the books again.

**Check:** click **Edit** on **Holes**, change the author, then click **Save**. The card shows the new author. Refresh the page; the change was saved.

---

## The Finished Code

Compare your page with the finished version below. If something doesn't work, look for differences.

??? code "click to expand"
    ```tsx
    // app/page.tsx
    "use client";

    import { useEffect, useState } from "react";
    import {
        Alert,
        Button,
        Card,
        Checkbox,
        Container,
        Group,
        Loader,
        Modal,
        Stack,
        Text,
        TextInput,
        Title,
    } from "@mantine/core";
    import { supabase, Book } from "./lib/supabase";

    const Home = () => {
        // The list of books, and whether it is still loading
        const [books, setBooks] = useState<Book[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        // The "Add a book" form
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");

        // The "Edit book" modal
        const [editingBook, setEditingBook] = useState<Book | null>(null);
        const [editTitle, setEditTitle] = useState("");
        const [editAuthor, setEditAuthor] = useState("");

        // READ: get every book, newest first
        const loadBooks = async () => {
            const { data, error } = await supabase
                .from("books")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                setError(error.message);
            } else {
                setBooks(data);
            }
            setLoading(false);
        };

        // Load the books once, when the page opens
        useEffect(() => {
            // Safe: loadBooks only sets state after the data arrives
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadBooks();
        }, []);

        // CREATE: add a new book
        const addBook = async () => {
            if (title.trim() === "" || author.trim() === "") {
                return;
            }

            const { error } = await supabase
                .from("books")
                .insert({ title: title.trim(), author: author.trim() });

            if (error) {
                setError(error.message);
                return;
            }

            setTitle("");
            setAuthor("");
            loadBooks();
        };

        // UPDATE: tick or untick "finished"
        const toggleFinished = async (book: Book) => {
            const { error } = await supabase
                .from("books")
                .update({ finished: !book.finished })
                .eq("id", book.id);

            if (error) {
                setError(error.message);
                return;
            }

            loadBooks();
        };

        // UPDATE: open the modal with the book's current values
        const openEdit = (book: Book) => {
            setEditingBook(book);
            setEditTitle(book.title);
            setEditAuthor(book.author);
        };

        // UPDATE: save the new title and author
        const saveEdit = async () => {
            if (editingBook === null) {
                return;
            }

            const { error } = await supabase
                .from("books")
                .update({ title: editTitle.trim(), author: editAuthor.trim() })
                .eq("id", editingBook.id);

            if (error) {
                setError(error.message);
                return;
            }

            setEditingBook(null);
            loadBooks();
        };

        // DELETE: remove a book
        const deleteBook = async (id: number) => {
            const { error } = await supabase
                .from("books")
                .delete()
                .eq("id", id);

            if (error) {
                setError(error.message);
                return;
            }

            loadBooks();
        };

        return (
            <Container size="sm" py="xl">
                <Stack>
                    <Title>Book Tracker</Title>

                    {error && <Alert color="red" title="Something went wrong">{error}</Alert>}

                    <Card withBorder>
                        <Stack>
                            <TextInput
                                label="Title"
                                value={title}
                                onChange={(event) => setTitle(event.currentTarget.value)}
                            />
                            <TextInput
                                label="Author"
                                value={author}
                                onChange={(event) => setAuthor(event.currentTarget.value)}
                            />
                            <Button onClick={addBook}>Add book</Button>
                        </Stack>
                    </Card>

                    {loading && <Loader />}

                    {!loading && books.length === 0 && <Text c="dimmed">No books yet. Add one above!</Text>}

                    {books.map((book) => (
                        <Card key={book.id} withBorder>
                            <Group justify="space-between">
                                <Checkbox
                                    checked={book.finished}
                                    onChange={() => toggleFinished(book)}
                                    label={
                                        <div>
                                            <Text fw={500} td={book.finished ? "line-through" : undefined}>
                                                {book.title}
                                            </Text>
                                            <Text size="sm" c="dimmed">{book.author}</Text>
                                        </div>
                                    }
                                />
                                <Group gap="xs">
                                    <Button variant="light" onClick={() => openEdit(book)}>
                                        Edit
                                    </Button>
                                    <Button variant="light" color="red" onClick={() => deleteBook(book.id)}>
                                        Delete
                                    </Button>
                                </Group>
                            </Group>
                        </Card>
                    ))}
                </Stack>

                <Modal opened={editingBook !== null} onClose={() => setEditingBook(null)} title="Edit book">
                    <Stack>
                        <TextInput
                            label="Title"
                            value={editTitle}
                            onChange={(event) => setEditTitle(event.currentTarget.value)}
                        />
                        <TextInput
                            label="Author"
                            value={editAuthor}
                            onChange={(event) => setEditAuthor(event.currentTarget.value)}
                        />
                        <Button onClick={saveEdit}>Save</Button>
                    </Stack>
                </Modal>
            </Container>
        );
    };

    export default Home;
    ```

---

## Go Further

!!! abstract "Instructions"
    Your app works. Now add **at least two** of these on your own. There's no code given for these, so use what you learned above.

    - Ask `confirm("Delete this book?")` before deleting, and only delete if it returns `true`.
    - Show how many books you've finished, for example **1 of 3 finished**, using a `Badge` under the title.
    - Add a `SegmentedControl` with **All**, **To read** and **Finished** that filters the list.
    - Add a `rating` column (`int4`, default `0`) to the table in Supabase, then show it with Mantine's `Rating` component and save changes to it.
    - Stop the **Save** button in the modal from saving an empty title or author.
    - Show `loading` on the **Add book** button while the insert is running, so it can't be clicked twice.

    **Check:** run `npm run build` and fix any errors, then push your project to GitHub.

??? hint "Hint - Click to expand"
    For counts and filters, don't add a second state for the filtered list. Work it out from `books` with `.filter()` every time the component renders. For the rating, follow the same steps as `toggleFinished`: an `async` function, an `.update()` with `.eq("id", ...)`, an `error` check, then `loadBooks()`. For the button's loading state, add a `saving` state, set it to `true` before the insert and `false` after it.
