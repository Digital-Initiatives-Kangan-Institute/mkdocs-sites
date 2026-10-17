# Mantine Form Validation

These exercises use the `@mantine/form` package to check what the user types before it is sent anywhere. You will add rules to each field, show error messages under the right input, stop the user submitting twice, and keep their input when something goes wrong.

Revisit [Mantine UI](../resources/mantine/mantine.md) and the [use-form documentation](https://mantine.dev/form/use-form/) while you work.

## Setup

!!! abstract "Instructions"
    Keep using your `mantine-practice` app from [Mantine Form Inputs](mantine-form-inputs.md). If you have not made it yet, follow the Setup steps on that page first. Then install the form package:

    ```bash
    npm install @mantine/form
    ```

    Each exercise goes in its own folder: `app/form1/page.tsx`, `app/form2/page.tsx` and so on.

## Your First useForm

!!! abstract "Instructions"
    Create `app/form1/page.tsx`. Build a **Join the club** form using `useForm` instead of `useState`.

    1. Create a form with `useForm`. Use `mode: "uncontrolled"` and give it `initialValues` for `name` and `email`, both empty strings.
    2. Add a `TextInput` for each field. Connect each one with `key={form.key("name")}` and `{...form.getInputProps("name")}` (change `"name"` to `"email"` for the second one).
    3. Wrap the inputs in a `<form>` and pass your submit function through `form.onSubmit(...)`.
    4. When the form is submitted, show the submitted values in an `Alert` below the form.
    5. **Check:** fill in both fields and submit. The page must not reload, and the alert should show your values.

??? code "click to expand"
    ```tsx
    "use client";

    import { useState } from "react";
    import { Alert, Button, Container, Stack, TextInput, Title } from "@mantine/core";
    import { useForm } from "@mantine/form";

    type ClubForm = { name: string; email: string };

    const Form1 = () => {
        const [submitted, setSubmitted] = useState<ClubForm | null>(null);

        const form = useForm<ClubForm>({
            // TODO: mode and initialValues
        });

        const handleSubmit = (values: ClubForm) => {
            // TODO: save values to state
        };

        return (
            <Container size="sm" py="xl">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <Title order={1}>Join the club</Title>
                        {/* TODO: two TextInputs */}
                        <Button type="submit">Join</Button>
                    </Stack>
                </form>
                {/* TODO: Alert showing submitted values */}
            </Container>
        );
    };

    export default Form1;
    ```

??? hint "Hint - Click to expand"
    `form.getInputProps("name")` returns an object with the `value`/`defaultValue`, `onChange`, `onBlur` and `error` props an input needs, and the `...` spread passes them all at once. `form.onSubmit` already calls `preventDefault()` for you.

## Adding Validation Rules

!!! abstract "Instructions"
    Create `app/form2/page.tsx`. Copy your form from `form1` and add a `validate` object to `useForm` with these rules:

    | Field | Rule | Error message |
    | --- | --- | --- |
    | name | 2 to 50 characters after trimming spaces | Name must be 2 to 50 characters |
    | email | Looks like an email address | Enter a valid email address |
    | age | A number from 16 to 99 | Age must be between 16 and 99 |

    1. Add an `age` field using `NumberInput`.
    2. Add `withAsterisk` to every required input.
    3. Add `noValidate` to the `<form>` so the browser's own pop-ups don't get in the way of Mantine's messages.
    4. **Check:** submit the empty form. A red error should appear under every field and nothing should be submitted.
    5. **Check:** type a name that is only spaces, and a name with 51 characters. Both should be rejected.
    6. Add `validateInputOnBlur: true` to `useForm`. **Check:** each field now shows its error as soon as you leave it.

??? code "click to expand"
    ```tsx
    validate: {
        name: (value) => (/* TODO: test the trimmed length */ ? "Name must be 2 to 50 characters" : null),
        email: (value) => /* TODO */,
        age: (value) => /* TODO */,
    },
    ```

??? hint "Hint - Click to expand"
    Each rule is a function that receives the field's value and returns an error **string** when the value is wrong, or `null` when it is fine. Use `.trim().length` for the name. For the email, `/^\S+@\S+\.\S+$/.test(value)` is a simple check. `NumberInput` gives you a `number` or an empty string `""`, so your initial value and type for `age` need to allow both.

## Errors on Every Kind of Input

!!! abstract "Instructions"
    Create `app/form3/page.tsx`. Build a **Report a problem** form with:

    1. A `TextInput` for **Title** (5 to 120 characters after trimming).
    2. A `Textarea` for **Description** (10 to 2000 characters after trimming).
    3. A `Select` for **Area** with the options **Hardware**, **Software** and **Network**. One must be chosen.
    4. A `Radio.Group` for **Impact**: **Low**, **Medium** or **High**. One must be chosen.
    5. A `Checkbox` labelled **I have tried restarting** that must be ticked.
    6. A **Reset** button with `variant="outline"` that clears the form and all of its errors.
    7. **Check:** submit the empty form and check that every control shows its own error, including the radio group and the checkbox.
    8. **Check:** press **Tab** through the form with the errors showing. The error text should sit directly under each control.

??? hint "Hint - Click to expand"
    A checkbox stores `true`/`false`, so connect it with `form.getInputProps("tried", { type: "checkbox" })`. A `Select` that has nothing chosen holds `null`. `form.reset()` puts every field back to its `initialValues` and clears the errors.

## Saving Without Double Submits

!!! abstract "Instructions"
    Create `app/form4/page.tsx`. Copy your form from `form3`. You will pretend to send it to a server that takes two seconds to answer and sometimes fails.

    1. Add this helper above your component. It waits two seconds, then fails if the title contains the word `fail`:

        ```tsx
        const fakeSave = (title: string) =>
            new Promise<void>((resolve, reject) =>
                setTimeout(() => (title.includes("fail") ? reject(new Error("Server unavailable")) : resolve()), 2000)
            );
        ```

    2. Make your submit function `async` and `await fakeSave(values.title)` inside a `try`/`catch`/`finally`.
    3. Add a `saving` state. While it is `true`, give the submit button the `loading` prop so it shows a spinner and cannot be clicked again.
    4. When the save works, show a green `Alert` that says **Report sent** and reset the form.
    5. When the save fails, show a red `Alert` with the error message. Do **not** reset the form, so the user keeps everything they typed.
    6. Make each alert disappear when the user submits again.
    7. **Check:** submit a valid report and click the button several times quickly. Only one save should happen.
    8. **Check:** put `fail` in the title and submit. Your text should still be in every field. Remove `fail` and submit again; it should work.

??? hint "Hint - Click to expand"
    Set `saving` to `true` before the `await` and back to `false` in `finally`, so it resets whether the save worked or not. Keep a `status` state such as `"idle" | "success" | "error"` and an `errorMessage` state to decide which alert to show.

## Server Errors on a Field

!!! abstract "Instructions"
    Create `app/form5/page.tsx`. Sometimes the server rejects one field even when the browser rules pass, for example a username that is already taken.

    1. Build a **Create account** form with **Username** and **Password** (`PasswordInput`) fields and sensible length rules.
    2. Add a fake check that waits one second and rejects the usernames `admin`, `root` and `test`, ignoring upper and lower case.
    3. When a username is rejected, use `form.setFieldError` to show **That username is taken** under the username field.
    4. **Check:** try `Admin`. The error should appear under the username, and the password should still be filled in.

??? hint "Hint - Click to expand"
    `form.setFieldError("username", "That username is taken")` shows an error exactly like a validation rule would. Compare with `.toLowerCase()` and `.includes()` on an array of taken names.

## From Memory: Event Booking Form

!!! abstract "Instructions"
    Without looking back, build `app/form6/page.tsx` with `useForm`:

    - **Name** (2 to 80 characters after trimming), **Email**, and **Tickets** (`NumberInput`, 1 to 6)
    - **Session** `Select` with three session times, one required
    - **Dietary requirements** `Textarea` that is optional but limited to 300 characters
    - Errors shown when a field is left, and on submit
    - A two second fake save with a loading button, success and error alerts, and input kept on failure
    - A **Reset** button that clears everything
