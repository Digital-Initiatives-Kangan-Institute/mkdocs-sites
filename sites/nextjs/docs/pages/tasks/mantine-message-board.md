# Mantine Message Board

In this project you'll build a small message board where anyone can post a message and read what everyone else has posted. The messages are saved in a Supabase database, and the whole interface is built with Mantine. It introduces two libraries at once: **Mantine** for the interface, and the **Supabase client library** (`@supabase/supabase-js`) for talking to the database.

The app only needs two of the four CRUD operations:

- **Create**: post a new message
- **Read**: show every message, newest first

You do not need to edit or delete messages.

In the Pet Adoption Board you talked to Supabase with `fetch()` and its REST API. The client library does the same requests for you: you call methods like `.from()`, `.select()` and `.insert()` instead of building URLs and headers yourself.

You won't need every Mantine component you have learned. Part of the job is choosing the ones that suit each part of the page.

Revisit [Mantine UI](../resources/mantine/mantine.md), [Introduction to Supabase](../resources/supabase/intro-to-supabase.md), [Mantine Form Validation](mantine-form-validation.md) and [Mantine Modals and Notifications](mantine-feedback.md) while you work.

## Set Up Supabase

!!! abstract "Instructions"
    **Create the project**

    1. Go to `https://supabase.com/dashboard` and create a new project called `message-board`.
    2. Wait for the project to finish setting up.

    **Build the `messages` table**

    Create a table that matches this schema exactly, because your code will rely on these column names and types.

    | Column | Type | Required? | Default value | Notes |
    | --- | --- | --- | --- | --- |
    | `id` | `int8` | yes | identity (automatic) | Primary key. Supabase adds this column for you. |
    | `created_at` | `timestamptz` | yes | `now()` | When the message was posted. Supabase adds this column for you. |
    | `author` | `text` | yes | none | The name of the person posting |
    | `topic` | `text` | yes | `'General'` | One of `General`, `Question`, `Event` or `Help` |
    | `body` | `text` | yes | none | The message itself |

    1. In the dashboard, open the **Table Editor** and click **New table**.
    2. Name it `messages`.
    3. **Untick "Enable Row Level Security (RLS)".** Read the RLS warning below, then confirm.
    4. Leave the `id` and `created_at` columns that Supabase already added.
    5. Add the `author`, `topic` and `body` columns. For each one, open the column's settings (the cog icon) and untick **Is Nullable**.
    6. Click **Save**.
    7. Add these sample messages with **Insert → Insert row**. Leave `id` and `created_at` empty.

    | author | topic | body |
    | --- | --- | --- |
    | Sam Taylor | General | Welcome to the message board! Say hello. |
    | Priya Nair | Question | Does anyone know when the library opens on Saturday? |
    | Alex Chen | Event | Board games in the common room on Friday at 3pm. |
    | Jordan Lee | Help | I left a blue water bottle in Room 204. |

    **Check:** the Table Editor shows 4 rows, and every column name matches the schema exactly (all lower case).

    **Get your keys**

    Click **Connect** at the top of the project (or go to **Project Settings → API Keys**) and copy the **Project URL** and the **Publishable key** (`sb_publishable_…`).

!!! warning "About RLS"
    RLS is **off** so you can focus on the app, which means **anyone with your publishable key can read and add messages**, whether they use your app, the client library or `fetch`. That's fine for a practice project. **Never** do this with real or private data.

!!! danger
    Do **not** use the **secret** key (`sb_secret_…`) in front-end code. Anything in front-end code can be read by anyone who visits your site.

??? tip "Stuck? Show SQL that builds the table for you"
    Try the Table Editor first. If you can't get the table right, run this in the Supabase **SQL Editor**. It creates the table, turns off RLS, lets the publishable key read and add messages, and inserts the sample rows. If a table called `messages` already exists, delete it first.

    ```sql
    create table messages (
        id bigint generated always as identity primary key,
        created_at timestamptz not null default now(),
        author text not null,
        topic text not null default 'General',
        body text not null
    );

    -- Keep things simple for learning: no Row Level Security
    alter table messages disable row level security;

    -- The publishable key can read and add messages, but not change or delete them
    grant select, insert on table messages to anon;

    insert into messages (author, topic, body) values
        ('Sam Taylor', 'General', 'Welcome to the message board! Say hello.'),
        ('Priya Nair', 'Question', 'Does anyone know when the library opens on Saturday?'),
        ('Alex Chen', 'Event', 'Board games in the common room on Friday at 3pm.'),
        ('Jordan Lee', 'Help', 'I left a blue water bottle in Room 204.');
    ```

## Set Up Next.js and Mantine

!!! abstract "Instructions"
    1. Create a new app called `message-board` and install Mantine:

        ```bash
        npx create-next-app@latest message-board
        cd message-board
        npm install @mantine/core @mantine/hooks @mantine/form @mantine/notifications @supabase/supabase-js
        ```

    2. Empty `app/globals.css`, then set up `app/layout.tsx` with `MantineProvider`, `Notifications`, and the `core` and `notifications` stylesheets. Copy the layout from [Mantine Form Inputs](mantine-form-inputs.md) and the notifications setup from [Mantine Modals and Notifications](mantine-feedback.md).
    3. Create `.env.local` in the root of the project, next to `package.json`, with your own URL and key:

        ```bash
        NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
        ```

        Then **stop and restart** `npm run dev`, because env files are only read when the server starts.

    4. Create `app/lib/supabase.ts` using the starter code below. It creates one Supabase client that every file imports, so the URL and key live in a single place.
    5. Build the board in `app/page.tsx`, starting with `"use client";`. Move parts into `app/components/` once the page gets long, for example a `MessageCard` and a `MessageForm`.

??? code "click to expand"
    ```tsx
    // app/lib/supabase.ts
    import { createClient } from "@supabase/supabase-js";

    export const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
    );

    export const TOPICS = ["General", "Question", "Event", "Help"];

    export type Message = {
        id: number;
        created_at: string;
        author: string;
        topic: string;
        body: string;
    };
    ```

### Supabase client cheat sheet

Every query starts with `supabase.from("messages")`, then chains the methods you need. You `await` the whole chain.

| Method | What it does | REST equivalent |
| --- | --- | --- |
| `.select("*")` | Read rows | `GET` with `?select=*` |
| `.order("column", { ascending: false })` | Sort the rows, newest first when used on `created_at` | `&order=created_at.desc` |
| `.insert({ ... })` | Add a row | `POST` with a JSON body |
| `.select()` after `.insert()` | Send back the row that was saved | `Prefer: return=representation` |
| `.single()` | Return one object instead of an array | none |

Every query gives back an object with two properties: `data` (the rows, or `null` if it failed) and `error` (`null` if it worked). The client **does not throw** when a query fails, so always check `error` yourself.

## Part 1: Reading Messages

!!! abstract "Instructions"
    1. Add `messages`, `loading` and `error` states.
    2. In a `useEffect`, load all messages, newest first, with the Supabase client. Check the `error` it gives back, and put its `message` in your `error` state if there is one.
    3. While loading, show a `Loader` or a few `Skeleton` blocks shaped like a message.
    4. If the request fails, show a red `Alert` with the error and a **Try again** button.
    5. If there are no messages, show a short message such as **No messages yet. Be the first to post!**
    6. Show each message in a `Card` with:
        - The author's name, and an `Avatar` with their initials
        - The topic in a `Badge`, with a different colour for each topic
        - The message body
        - The date and time it was posted, in a readable format
    7. Put the cards in a `Stack` inside a `Container`, with a `Title` for the board at the top.
    8. **Check:** the four sample messages show, newest at the top. Change the table name to `messagez` for a moment to test your error alert.

??? code "click to expand"
    ```tsx
    // app/components/MessageCard.tsx
    import { Avatar, Badge, Card, Group, Text } from "@mantine/core";
    import { Message } from "../lib/supabase";

    type Props = { message: Message };

    const MessageCard = ({ message }: Props) => {
        // TODO: work out the initials and the badge colour

        return (
            <Card withBorder padding="lg" radius="md">
                {/* TODO: avatar, author, badge, body, date */}
            </Card>
        );
    };

    export default MessageCard;
    ```

??? hint "Hint - Click to expand"
    `useEffect` can't take an `async` function directly, so write an `async` function inside it (or above it, so **Try again** can call it too) and call that. Destructure the result: `const { data, error } = await ...`. For the initials, `.split(" ")` the name, take the first letter of each part with `.map()`, then `.join("")`. A lookup object such as `Record<string, string>` maps each topic to a badge colour. `new Date(message.created_at).toLocaleString()` turns the database date into something readable.

## Part 2: Posting a Message

!!! abstract "Instructions"
    1. Build a form with `useForm` that has:
        - **Name**: `TextInput`, 2 to 40 characters after trimming
        - **Topic**: `Select` using the four topics, starting on **General**
        - **Message**: `Textarea`, 1 to 500 characters after trimming, that grows as you type
    2. Show the number of characters typed under the message box, for example **42 / 500**.
    3. Errors appear under each field when it is left and when the form is submitted.
    4. On submit, trim the name and message, then insert the new message with the Supabase client and ask for the saved row back.
    5. While the request is running, show `loading` on the **Post** button so it cannot be clicked twice.
    6. If the post works, add the new message to the **top** of the list without reloading the page, reset the form, and show a green notification.
    7. If the post fails, show a red notification and do **not** reset the form, so the user keeps what they typed.
    8. **Check:** post a message, then refresh the page. It should still be there, because it was saved in Supabase. Check the Table Editor too.
    9. **Check:** try to post an empty form and a name that is only spaces. Nothing should be sent.

??? code "click to expand"
    ```tsx
    const form = useForm({
        mode: "controlled",
        initialValues: { author: "", topic: "General", body: "" },
        validate: {
            // TODO: one rule per field
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        // TODO: set saving, insert into "messages", check error, add the returned message to state
    };
    ```

??? hint "Hint - Click to expand"
    Chain `.select()` and `.single()` after `.insert()` to get the saved row back as one object, including its new `id` and `created_at`. Put it at the front of your state with a spread: the new message first, then `...messages`. Because the client returns `error` instead of throwing, use an `if` to choose between the success and failure paths, and turn the loading state off in both. `mode: "controlled"` lets you read `form.values.body.length` for the character count.

## Part 3: Choose Your Extras

!!! abstract "Instructions"
    Pick **at least three** of these and add them to your board. Choose the Mantine components you think suit each one best.

    - Wrap the page in an `AppShell` with a header showing the board's name
    - Put the post form in a `Modal` opened by a **New message** button in the header, and close it after a successful post
    - Filter the list by topic with a `SegmentedControl` or `Tabs`, with an **All** option
    - Add a search box that shows only messages whose body or author contains the search text, ignoring upper and lower case
    - Show how many messages there are for each topic, using badges or a small chart
    - Add a **Refresh** button with an `ActionIcon` and a `Tooltip` that loads the messages again
    - Show only 5 messages at a time with `Pagination`
    - Remember the author's name in the browser with `useLocalStorage` from `@mantine/hooks`, so the name field is already filled in next time
    - Show "2 minutes ago" style times instead of the full date

    When a filter or search matches nothing, show a message with a way to clear it.

??? hint "Hint - Click to expand"
    Work out the filtered list from your `messages` state on every render instead of storing it in a second state. That way a new post shows up straight away, even while a filter is on. For pagination, `.slice()` the filtered list using the current page number.

## Part 4: Polish and Test

!!! abstract "Instructions"
    1. Use the same button variant for the same kind of action everywhere: `filled` for the main action and `outline`, `light` or `default` for the rest.
    2. Use the board with the keyboard only: post a message and use each of your extras without touching the mouse.
    3. Check that every input has a label, every error appears under its input, and every icon-only button has an `aria-label`.
    4. Make the browser narrow and check the board still works on a phone-sized screen.
    5. Run `npm run build` and fix any errors.
    6. Push the project to GitHub.
