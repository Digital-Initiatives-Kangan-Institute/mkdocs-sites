# Mantine Form Inputs

These exercises practise Mantine's form controls: text inputs, text areas, dropdowns, switches, checkboxes, radio buttons and segmented controls. Each one is a controlled input: its value lives in React state, so you can show it somewhere else on the page as you type.

Revisit [Mantine UI](../resources/mantine/mantine.md) and [Mantine Component Library](mantine-components.md) while you work. Every component has its own page on [mantine.dev](https://mantine.dev) listing its props.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `mantine-practice`. Press **Enter** to accept every default question. You will keep using this app for all of the Mantine tasks.

    ```bash
    npx create-next-app@latest mantine-practice
    cd mantine-practice
    npm install @mantine/core @mantine/hooks
    npm run dev
    ```

    1. Delete everything inside `app/globals.css` so it does not fight with Mantine's styles.
    2. Replace `app/layout.tsx` with the code below.
    3. Each exercise goes in its own folder: `app/inputs1/page.tsx`, `app/inputs2/page.tsx` and so on. Every page needs `"use client";` at the top.

??? code "click to expand"
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

## A Controlled Text Input

!!! abstract "Instructions"
    Create `app/inputs1/page.tsx`.

    1. Wrap the page in a `Container` with `size="sm"` and `py="xl"`, and put a `Stack` inside it.
    2. Add a `Title` that says **Event Sign-up**.
    3. Add a `TextInput` with the label **Full name** and a placeholder. Store its value in a `name` state.
    4. Under the input, show a `Text` that says `Hello, {name}!`. Show `Hello, stranger!` while the input is empty.
    5. Add `description="As it appears on your ID"` and `withAsterisk` to the input.
    6. **Check:** type in the input and watch the greeting update with every key press. Click the label and check the cursor jumps into the input.

??? code "click to expand"
    ```tsx
    "use client";

    import { useState } from "react";
    import { Container, Stack, Text, TextInput, Title } from "@mantine/core";

    const Inputs1 = () => {
        const [name, setName] = useState("");

        return (
            <Container size="sm" py="xl">
                <Stack>
                    {/* TODO: Title */}
                    {/* TODO: TextInput controlled by name */}
                    {/* TODO: greeting */}
                </Stack>
            </Container>
        );
    };

    export default Inputs1;
    ```

??? hint "Hint - Click to expand"
    A controlled input needs two props: `value` and `onChange`. Mantine's `TextInput` passes a normal change event to `onChange`, so read the text from `event.currentTarget.value`. Use a ternary or `||` for the "stranger" fallback.

## Text Areas and Dropdowns

!!! abstract "Instructions"
    Create `app/inputs2/page.tsx`. Build a **Feedback** form with:

    1. A `TextInput` labelled **Subject**.
    2. A `Select` labelled **Category** with the options **Bug**, **Feature request** and **Question**. Give it a placeholder and make it `clearable`.
    3. A `Textarea` labelled **Details** that grows as you type (between 3 and 8 rows).
    4. A `Card` with a border under the form that previews all three values as you type.
    5. Show the number of characters typed in the text area as `{count} / 500` underneath it, and stop the user typing more than 500 characters.
    6. **Check:** fill in all three fields and watch the preview. Clear the category with the ✕ and check the preview shows that nothing is selected.

??? hint "Hint - Click to expand"
    `Select` takes a `data` prop (an array of strings) and its `onChange` gives you the selected **string** (or `null` when cleared), not an event. That means its state type is `string | null`. For the text area, look for the `autosize`, `minRows` and `maxRows` props. The browser's own `maxLength` attribute works on Mantine inputs too.

## Switches, Checkboxes and Radio Buttons

!!! abstract "Instructions"
    Create `app/inputs3/page.tsx`. Build a **Notification settings** panel:

    1. A `Switch` labelled **Email notifications**.
    2. A `Radio.Group` labelled **How often?** with the options **Instantly**, **Daily** and **Weekly**. Put the three `Radio` buttons in a `Group` so they sit side by side.
    3. Disable the radio buttons while email notifications are switched off.
    4. A `Checkbox` labelled **I have read the privacy policy**.
    5. A **Save settings** `Button` that stays disabled until the checkbox is ticked.
    6. **Check:** use only the keyboard (**Tab**, **Space** and the arrow keys) to switch notifications on, choose **Weekly**, tick the checkbox and reach the button.

??? code "click to expand"
    ```tsx
    <Radio.Group label="How often?" value={/* TODO */} onChange={/* TODO */}>
        <Group mt="xs">
            <Radio value="instant" label="Instantly" />
            {/* TODO: Daily and Weekly */}
        </Group>
    </Radio.Group>
    ```

??? hint "Hint - Click to expand"
    `Switch` and `Checkbox` are on/off controls, so use `checked` (not `value`) and read `event.currentTarget.checked`. `Radio.Group` works like `Select`: its `onChange` hands you the chosen value as a string. Every Mantine input accepts a `disabled` prop.

## Segmented Controls

!!! abstract "Instructions"
    Create `app/inputs4/page.tsx`. A `SegmentedControl` is a row of buttons where exactly one is selected, which suits small settings like layout or view mode.

    1. Make an array of six made-up contact names and show each one in a `Card` with a border inside a `Stack`.
    2. Add a `SegmentedControl` above the list with the options **Compact** and **Comfortable**.
    3. When **Compact** is selected, use a small `gap` on the `Stack` and small `padding` on each card. When **Comfortable** is selected, use large ones.
    4. Add a second `SegmentedControl` with **A to Z** and **Z to A** that sorts the names.
    5. **Check:** switch between both settings and watch the list change. Use the arrow keys to move between the segments.

??? hint "Hint - Click to expand"
    `SegmentedControl` takes `data`, `value` and `onChange`, just like `Select`. If you want the value to be different from the text on screen, use objects in `data`: `{ label: "Compact", value: "compact" }`. Mantine sizes are the strings `"xs"`, `"sm"`, `"md"`, `"lg"` and `"xl"`. Sort a **copy** of the array (`[...names].sort()`), never the original.

## From Memory: Pizza Order Form

!!! abstract "Instructions"
    Without looking back, build `app/inputs5/page.tsx`:

    - A `TextInput` for the customer's name
    - A `Select` for the pizza (at least four choices)
    - A `SegmentedControl` for the size: **Small**, **Medium**, **Large**
    - A `Checkbox` for each of three extra toppings
    - A `Switch` for **Delivery**. When it is on, show a `Textarea` for the delivery address
    - A summary `Card` showing the whole order as it is built
    - A **Place order** `Button` that is disabled until a name and pizza are chosen
    - A **Start again** `Button` with `variant="outline"` that clears everything

??? hint "Hint - Click to expand"
    `Checkbox.Group` can manage several checkboxes with a single `string[]` state, the same way `Radio.Group` manages radios. Show the address field with `&&` so it only appears when delivery is on.
