# Mantine Equipment Loans

In this project you'll build an equipment loans app for a made-up school library, using Mantine for the whole interface. It brings together what you practised in the Mantine tasks:

- Form inputs and `useForm` validation
- Modals, notifications and loading states
- Tables, badges and filters
- Charts that update when the data changes
- Saving a setting in the browser with a Mantine hook

The loans are kept in React state, so they reset when you refresh. Only the display settings are saved.

Revisit [Mantine Form Inputs](mantine-form-inputs.md), [Mantine Form Validation](mantine-form-validation.md), [Mantine Modals and Notifications](mantine-feedback.md), [Mantine Tables and Filters](mantine-tables-filters.md) and [Mantine Charts](mantine-charts.md) while you work.

## Set Up the Project

!!! abstract "Instructions"
    1. Create a new app called `equipment-loans` and install Mantine:

        ```bash
        npx create-next-app@latest equipment-loans
        cd equipment-loans
        npm install @mantine/core @mantine/hooks @mantine/form @mantine/notifications @mantine/charts recharts
        ```

    2. Empty `app/globals.css`, then set up `app/layout.tsx` with `MantineProvider`, `Notifications` and all three stylesheets (`core`, `notifications` and `charts`).
    3. Create `app/types.ts` with the type and starting data below.
    4. Build the whole app in `app/page.tsx`. Move parts into their own components in `app/components/` once it gets long.

??? code "click to expand"
    ```tsx
    // app/types.ts
    export type LoanStatus = "On Loan" | "Returned" | "Overdue";

    export type Loan = {
        id: number;
        borrower: string;
        item: string;
        notes: string;
        status: LoanStatus;
        createdAt: string;
    };

    export const startingLoans: Loan[] = [
        { id: 1, borrower: "Sam Taylor", item: "Laptop 04", notes: "Charger included", status: "On Loan", createdAt: "2026-10-01T09:15:00" },
        { id: 2, borrower: "Priya Nair", item: "Camera 02", notes: "Spare battery", status: "Returned", createdAt: "2026-10-02T13:40:00" },
        { id: 3, borrower: "Alex Chen", item: "Tablet 11", notes: "Screen has a small scratch", status: "Overdue", createdAt: "2026-09-25T10:05:00" },
        { id: 4, borrower: "Jordan Lee", item: "Headphones 07", notes: "Includes the case", status: "On Loan", createdAt: "2026-10-05T15:30:00" },
    ];
    ```

## Part 1: The Loans Table

!!! abstract "Instructions"
    1. Put the loans in state, starting from `startingLoans`.
    2. Show them in a Mantine `Table` with the columns **Borrower**, **Item**, **Status**, **Date** and **Actions**, newest first.
    3. Show the status in a `Badge` that has both a colour and the status text: blue for **On Loan**, green for **Returned** and red for **Overdue**.
    4. Show the date in a readable format with `toLocaleDateString()`.
    5. Wrap the page in an `AppShell` with a header that shows the app name.
    6. **Check:** the newest loan is at the top and every badge matches its status.

??? hint "Hint - Click to expand"
    Sort a copy: `[...loans].sort(...)`. Comparing two ISO date strings with `b.createdAt.localeCompare(a.createdAt)` puts the newest first. `AppShell` needs a `header={{ height: 60 }}` prop, then an `AppShell.Header` and an `AppShell.Main`.

## Part 2: Adding a Loan

!!! abstract "Instructions"
    1. Add a **New loan** `Button` in the header that opens a `Modal` containing a form.
    2. Build the form with `useForm`:
        - **Borrower**: `TextInput`, 2 to 80 characters after trimming
        - **Item**: `Select` with at least six items to choose from, required
        - **Notes**: `Textarea`, optional, at most 300 characters
    3. Errors appear under each field when it is left and when the form is submitted.
    4. Saving adds a new loan with the status **On Loan** and the current date and time, closes the modal, resets the form and shows a green notification.
    5. Trim spaces off the borrower name and notes before saving.
    6. Use a fake save that waits one second. Show `loading` on the save button while it waits, so it cannot be clicked twice.
    7. **Check:** try to save an empty form, a borrower called `" A "`, then a valid loan. The valid loan should appear at the top of the table.

??? hint "Hint - Click to expand"
    `Date.now()` makes a simple unique `id`, and `new Date().toISOString()` gives the current date and time as a string. `useForm` has a `transformValues` option, or you can trim inside your submit function.

## Part 3: Editing and Deleting

!!! abstract "Instructions"
    1. Add an **Edit** button to each row that opens the same modal, filled with that loan's values and with a **Status** field added.
    2. The modal title says **New loan** or **Edit loan** depending on which button opened it.
    3. Saving an edit changes only that loan. Its `id` and `createdAt` stay the same.
    4. Add a **Delete** button to each row that opens a confirmation modal naming the borrower and the item.
    5. **Cancel** leaves the loan alone. **Delete** removes only that loan and shows a notification.
    6. **Check:** edit a loan's status to **Returned**, then delete a different loan. Every other loan stays exactly as it was.

??? hint "Hint - Click to expand"
    Keep an `editing` state that holds the loan being edited, or `null` for a new loan. Before opening the modal, call `form.setValues(...)` with the loan's values, or `form.reset()` for a new loan. Update one loan with `.map()` and a spread: `{ ...loan, ...changes }`.

## Part 4: Filters and Chart

!!! abstract "Instructions"
    1. Add a `SegmentedControl` above the table: **All**, **On Loan**, **Returned** and **Overdue**.
    2. When no loans match, show a message with a **Show all** button.
    3. Add a `BarChart` or `DonutChart` showing how many loans have each status.
    4. Show the same counts as text next to the chart, for example **On Loan: 2**.
    5. The chart always counts **all** loans, whatever the filter is set to.
    6. **Check:** filter to **Overdue**, then add a new loan. The table stays filtered, and the **On Loan** count goes up by one.

## Part 5: Display Settings

!!! abstract "Instructions"
    1. Add a **Settings** button in the header that opens a `Drawer`.
    2. Inside it, add a `SegmentedControl` for **Compact** or **Comfortable** table spacing.
    3. Save the setting with the `useLocalStorage` hook from `@mantine/hooks` under the key `"loan-spacing"`.
    4. Compact spacing sets the table's `verticalSpacing` to `"xs"`. Comfortable sets it to `"md"`.
    5. Add a **Reset settings** button that removes the saved value and goes back to **Comfortable**.
    6. **Check:** choose **Compact**, refresh the page, and the table should still be compact. Open DevTools (F12), find **Application → Local storage**, and change the saved value to `"giant"`. The app should fall back to **Comfortable** without breaking.

??? hint "Hint - Click to expand"
    `useLocalStorage({ key: "loan-spacing", defaultValue: "comfortable" })` returns `[value, setValue, removeValue]`, just like `useState` with an extra remove function. Check the value before using it: if it is not `"compact"` or `"comfortable"`, use `"comfortable"`. `Drawer` works the same way as `Modal`, with `opened` and `onClose`.

## Part 6: Polish and Test

!!! abstract "Instructions"
    1. Use the same variant for the same kind of action everywhere: `filled` for the main action, `outline` or `default` for secondary actions, and `red` for deleting.
    2. Use the app with the keyboard only: add a loan, edit it, delete it and change the spacing, without touching the mouse.
    3. Check that every input has a label, every error appears under its input, and every icon-only button has an `aria-label`.
    4. Run `npm run build` and fix any errors.
    5. Push the project to GitHub.
