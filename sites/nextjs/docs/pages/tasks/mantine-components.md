# Mantine Component Library

This is a **guided, line-by-line build** using the Mantine component library. You will set it up, add your first component, then combine several components into a mini interface — repeating the same "import and use a component" pattern each time.

!!! abstract "Instructions"
    Set up Mantine in your Next.js app, then build the guided examples below and one mini interface of your own. Your interface must:

    - Use at least **three different** Mantine component types
    - Apply components consistently (same variant and colour for similar actions)
    - Be polished — good spacing and alignment

    Prepare a short explanation of why you chose each component. Push your work to GitHub.

    Revisit the [Mantine UI](../resources/mantine/mantine.md) resource while you work.

---

## Set Up Mantine

Install the packages:

```bash
npm install @mantine/core @mantine/hooks
```

Then replace `app/layout.tsx`:

```tsx
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <MantineProvider>{children}</MantineProvider>
            </body>
        </html>
    );
}
```

Line by line:

1. **`import "@mantine/core/styles.css";`** — loads Mantine's default styling. Without it the components render but look unstyled.
2. **`import { MantineProvider } from "@mantine/core";`** — imports the provider that makes Mantine components work.
3. **`<MantineProvider>{children}</MantineProvider>`** — wraps every page so all routes can use Mantine.

---

## Your First Component

Replace a plain page with a Mantine button:

```tsx
"use client";

import { Button } from "@mantine/core";

export default function Page() {
    return (
        <main>
            <Button variant="filled" color="indigo">Save</Button>
            <Button variant="outline" color="indigo">Cancel</Button>
        </main>
    );
}
```

**What this file does in one sentence:** it renders two styled buttons using Mantine.

Line by line:

1. **`"use client";`** — Mantine interactive components use React state and events under the hood, so the file is a client component.
2. **`import { Button } from "@mantine/core";`** — imports just the one component you need.
3. **`<Button variant="filled" color="indigo">Save</Button>`** — a primary button; `variant` and `color` are **props** that change its appearance.
4. **`<Button variant="outline" color="indigo">Cancel</Button>`** — a secondary button. Keeping primary actions `filled` and secondary actions `outline` is a consistency rule.

The pattern to repeat: **import the component, then use it like a custom HTML tag with props**.

---

## Repeat the Pattern: A Mini Interface

Now use the same import-and-use pattern with several components:

```tsx
"use client";

import { Alert, Button, Card, Group, Stack, Text, TextInput, Title } from "@mantine/core";

export default function MiniInterface() {
    return (
        <Stack gap="md">
            <Title order={2}>My Mini Interface</Title>

            <TextInput label="Your name" placeholder="Type your name" />

            <Group>
                <Button variant="filled" color="indigo">Save</Button>
                <Button variant="outline" color="indigo">Cancel</Button>
            </Group>

            <Card shadow="sm" padding="lg">
                <Text>This is a card. It groups related content.</Text>
            </Card>

            <Alert title="Note" color="blue">
                This is an alert. It draws attention to a message.
            </Alert>
        </Stack>
    );
}
```

**What this file does in one sentence:** it composes a small interface from five different Mantine components.

Line by line:

1. **`import { Alert, Button, Card, Group, Stack, Text, TextInput, Title } from "@mantine/core";`** — imports everything the page uses in one line.
2. **`<Stack gap="md">`** — a vertical layout that adds consistent spacing between children. `gap="md"` sets the gap size.
3. **`<Title order={2}>`** — a heading. `order` controls the HTML level (2 = `<h2>`).
4. **`<TextInput label="Your name" placeholder="Type your name" />`** — a labelled input, replacing a manual `<label>` + `<input>` pair.
5. **`<Group>`** — a horizontal layout for the two buttons, keeping them side by side.
6. **`<Card shadow="sm" padding="lg">`** — a container with a subtle shadow and padding, for grouping related content.
7. **`<Alert title="Note" color="blue">`** — a coloured callout for a message.

Each component follows the same pattern you already used with `<Button>`: import, then use with props.

---

## Now You Try: Your Own Interface

Build a mini interface of your own with at least **three** component types. Ideas:

- A sign-up form (`TextInput`, `PasswordInput`, `Button`)
- A product grid (`Card`, `Text`, `Title`, `Badge`)
- A feedback page (`Alert`, `Textarea`, `Button`)

Keep primary actions `variant="filled"` and secondary actions `variant="outline"`. Write one sentence explaining why you chose each component.

??? hint "Hint - Click to expand"
    Start from the `<Stack>` and add components inside it. Use `<Group>` to place buttons side by side. If a component needs a prop you are unsure about, check the [Mantine documentation](https://mantine.dev) — every component page lists its props.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Component library** | A collection of ready-made UI components installed as a package |
| **Props** | Inputs that change a component's behaviour or appearance (e.g. `variant`, `color`) |
| **`MantineProvider`** | The wrapper that makes Mantine available to the whole app |
| **Variant** | A visual style of a component (e.g. `filled`, `outline`, `subtle`) |

---

## Summary

- Install `@mantine/core` and `@mantine/hooks`, then wrap the app in `MantineProvider`
- Always import `@mantine/core/styles.css`
- Import each component and use it like a custom tag with props
- Keep styling consistent: same variants and colours for the same kinds of actions
