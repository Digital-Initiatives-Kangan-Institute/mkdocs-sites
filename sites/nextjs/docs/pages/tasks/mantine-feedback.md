# Mantine Modals and Notifications

These exercises practise the components that tell the user what is happening: loaders and skeletons while data loads, alerts when something goes wrong, modals that ask "are you sure?", and notifications that pop up after an action.

Revisit [Mantine UI](../resources/mantine/mantine.md) and [useEffect and Loading States](useeffect-loading-states.md) while you work.

## Setup

!!! abstract "Instructions"
    Keep using your `mantine-practice` app from [Mantine Form Inputs](mantine-form-inputs.md). Install the notifications package:

    ```bash
    npm install @mantine/notifications
    ```

    Then update `app/layout.tsx`:

    1. Import `@mantine/notifications/styles.css` on the line **after** `@mantine/core/styles.css`.
    2. Import `Notifications` from `@mantine/notifications`.
    3. Add `<Notifications />` inside `MantineProvider`, just before `{children}`.

    Each exercise goes in its own folder: `app/feedback1/page.tsx`, `app/feedback2/page.tsx` and so on.

## Loading, Error and Empty States

!!! abstract "Instructions"
    Create `app/feedback1/page.tsx`. Fetch todos from `https://dummyjson.com/todos?limit=10` and show them in a `Stack` of `Card` components.

    1. Add `todos`, `loading` and `error` states, and load the data in a `useEffect`.
    2. While loading, show three `Skeleton` blocks the same height as a card.
    3. Check `response.ok` and throw an error if it is `false`.
    4. If the request fails, show a red `Alert` with the title **Could not load todos**, the error message, and a **Try again** `Button` that runs the fetch again.
    5. If the request works but there are no todos, show a `Text` that says **Nothing to do**.
    6. Show each completed todo with a green `Badge` that says **Done**, and each unfinished todo with a grey `Badge` that says **To do**.
    7. **Check:** change the URL to `https://dummyjson.com/http/500` to see your error alert. Click **Try again** after fixing the URL in your code. Add `&skip=1000` to the end of the URL to get an empty list and see the empty message.

??? code "click to expand"
    ```tsx
    "use client";

    import { useEffect, useState } from "react";
    import { Alert, Badge, Button, Card, Container, Group, Skeleton, Stack, Text, Title } from "@mantine/core";

    type Todo = { id: number; todo: string; completed: boolean };

    const Feedback1 = () => {
        const [todos, setTodos] = useState<Todo[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        const loadTodos = async () => {
            // TODO: reset error, set loading, fetch, check response.ok, save todos
        };

        useEffect(() => {
            loadTodos();
        }, []);

        return (
            <Container size="sm" py="xl">
                <Title order={1} mb="md">Todos</Title>
                {/* TODO: skeletons, error alert, empty message, list */}
            </Container>
        );
    };

    export default Feedback1;
    ```

??? hint "Hint - Click to expand"
    Use `try`/`catch`/`finally` so `loading` goes back to `false` whether the request worked or not. `Skeleton` takes a `height` prop. `Array.from({ length: 3 })` gives you something to `.map()` over for the three skeletons. Use a ternary to choose the badge's `color` and text.

## A Confirmation Modal

!!! abstract "Instructions"
    Create `app/feedback2/page.tsx`. Start with this list of made-up rooms in state:

    ```tsx
    const startingRooms = ["Meeting Room A", "Meeting Room B", "Training Lab", "Library Pod", "Board Room"];
    ```

    1. Show each room in a `Group` with its name and a **Delete** `Button` (`color="red"`, `variant="light"`).
    2. Use the `useDisclosure` hook from `@mantine/hooks` to control a `Modal`.
    3. Clicking **Delete** remembers which room was chosen and opens the modal.
    4. The modal's title is **Delete room?** and its body names the room, for example **Training Lab will be removed.**
    5. The modal has a **Cancel** button (`variant="default"`) and a **Delete** button (`color="red"`) in a `Group` aligned to the right.
    6. **Cancel**, the ✕ button, pressing **Escape** and clicking outside the modal all close it without deleting anything.
    7. **Delete** removes only that room and closes the modal.
    8. **Check:** open the modal with the keyboard only. Focus should move into the modal, **Tab** should stay inside it, and focus should return to the button you pressed when it closes.

??? code "click to expand"
    ```tsx
    const [opened, { open, close }] = useDisclosure(false);
    const [selected, setSelected] = useState<string | null>(null);

    // ...

    <Modal opened={opened} onClose={close} title="Delete room?" centered>
        {/* TODO: message and buttons */}
    </Modal>
    ```

??? hint "Hint - Click to expand"
    A `Modal` only needs `opened` and `onClose` to work; `useDisclosure` gives you both. Use `.filter()` to remove the selected room. Put `data-autofocus` on the **Cancel** button so a quick **Enter** does not delete by accident.

## Notifications

!!! abstract "Instructions"
    Create `app/feedback3/page.tsx`. Copy your rooms page from `feedback2`.

    1. After a room is deleted, show a green notification with the title **Room deleted** and the room's name as the message.
    2. Add a `TextInput` and an **Add room** button. After a room is added, show a blue notification.
    3. If the user tries to add an empty name or a name that already exists, show a red notification that explains the problem and does **not** close by itself.
    4. Add an **Undo** button to the "Room deleted" notification's message that puts the room back and hides the notification.
    5. **Check:** delete three rooms quickly. The notifications should stack, then close by themselves after a few seconds.

??? hint "Hint - Click to expand"
    Import `notifications` (small n) from `@mantine/notifications` and call `notifications.show({ title, message, color })`. `autoClose: false` keeps a notification open. `message` can be JSX, so a `Button` can go inside it. Give the notification an `id`, then `notifications.hide(id)` closes it.

## Deleting From an API

!!! abstract "Instructions"
    Create `app/feedback4/page.tsx`. Combine everything from this page.

    1. Load the first 8 todos from `https://dummyjson.com/todos?limit=8` with skeletons and an error alert.
    2. Each todo has a **Delete** button that opens a confirmation modal naming the todo.
    3. Confirming sends `fetch` with `method: "DELETE"` to `https://dummyjson.com/todos/{id}`.
    4. While the delete request is running, the modal's **Delete** button shows `loading` and the modal cannot be closed.
    5. If the request works, remove the todo from the list, close the modal and show a green notification.
    6. If the request fails, keep the modal open, keep the todo in the list and show a red notification.
    7. **Check:** delete a todo. Then change the URL to `https://dummyjson.com/http/500` and delete another; it must stay in the list.

??? hint "Hint - Click to expand"
    DummyJSON pretends to delete: it sends back the todo with `isDeleted: true` but nothing really changes on the server, which is why you remove it from your own state. `Modal` has `closeOnClickOutside`, `closeOnEscape` and `withCloseButton` props that you can set to `false` while a request is running.

## From Memory: Contact List

!!! abstract "Instructions"
    Without looking back, build `app/feedback5/page.tsx`:

    - Load users from `https://dummyjson.com/users?limit=10&select=firstName,lastName,email`
    - Show skeletons while loading, an error alert with **Try again**, and a message when there are no users
    - Show each user in a `Card` with their name and email
    - A **Remove** button on each card opens a confirmation modal that names the user
    - Removing a user shows a notification with an **Undo** button
    - The whole page works with the keyboard alone
