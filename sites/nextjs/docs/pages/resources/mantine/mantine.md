# Mantine UI

Mantine is a fully-featured React component library that gives you production-ready building blocks for your interface. It ships as an npm package with hooks, form handling, notifications, and much more.

---

## What is Mantine?

Mantine provides over 100 components and hooks built with accessibility and developer experience in mind. Key characteristics:

- **Drop-in components** — install the package and use components immediately
- **Themeable** — customise colours, spacing, typography, and more through `MantineProvider`
- **Accessible** — components follow WAI-ARIA standards out of the box
- **All-in-one** — includes hooks, form management, modals, notifications, and rich text editing

---

## Setting Up Mantine

Install the core package and hooks:

```bash
npm install @mantine/core @mantine/hooks
```

Additional optional packages:

```bash
npm install @mantine/form @mantine/notifications @mantine/modals
```

Wrap your app with `MantineProvider`:

```tsx
// app/layout.tsx
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
```

!!! note
    Always import `@mantine/core/styles.css` to apply the default styling.

---

## Using Components

Import and use components directly:

```tsx
import { Button } from "@mantine/core";

export default function Page() {
    return (
        <div>
            <Button variant="filled">Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button color="red">Delete</Button>
        </div>
    );
}
```

---

## Available Component Types

Mantine includes components for most UI needs:

| Category | Components |
|---|---|
| Actions | Button, ActionIcon, Menu |
| Forms | TextInput, Select, Checkbox, Radio, Textarea, NumberInput |
| Data Display | Card, Table, Badge, Avatar, Timeline, Accordion |
| Layout | Modal, Drawer, Container, Grid, Stack, Group |
| Navigation | NavLink, Pagination, Tabs, Stepper, Breadcrumbs |
| Feedback | Alert, Notification, Tooltip, Skeleton, LoadingOverlay |

---

## Component Libraries and Design

Component libraries speed up UI work, but good design choices are still needed:

- Choose the right component for the task (card vs table vs list)
- Maintain consistent spacing with `Stack` and `Group` layout components
- Use appropriate variants (`outline` for secondary actions, filled for primary)
- Keep accessibility in mind — Mantine gives you a good foundation but you still need to provide labels and alt text

---

## Replacing Plain UI with Mantine

Before (plain HTML elements):

```tsx
<button onClick={handleSave}>Save</button>
<div className="my-card">
    <h3>Product Name</h3>
</div>
```

After (Mantine components):

```tsx
import { Button, Card, Text, Title } from "@mantine/core";

<Button onClick={handleSave}>Save</Button>
<Card shadow="sm" padding="lg">
    <Title order={3}>Product Name</Title>
</Card>
```

---

## Key Differences from Other Libraries

- **npm package** — not copied into your project, installed as a dependency
- **Built-in hooks** — `@mantine/hooks` provides `useDisclosure`, `useToggle`, `useDebouncedValue`, and more
- **CSS resets included** — styles are applied globally through `@mantine/core/styles.css`
- **Rich theming** — use `MantineProvider` to set colours, fonts, and spacing globally

---

## Summary

- Install Mantine with `npm install @mantine/core @mantine/hooks`
- Wrap your app in `MantineProvider` and import `@mantine/core/styles.css`
- Import components from `@mantine/core` and use props like `variant` to customise
- Provides buttons, cards, forms, modals, tables, notifications, and more
- Components give you a good starting point but design decisions are still yours
