# Build Your Own Webapp

This is an open-ended project. You choose the topic and build a complete webapp with Next.js. There is no starter code and no guided steps — the challenge is to plan and build it yourself, drawing on everything from the previous tasks.

!!! abstract "Instructions"
    Build a webapp on any topic you like. It could be a shop, a recipe collection, a review board, a blog, a portfolio, a photo gallery, a team directory — anything you want to make.

    Your app must combine all of the following:

    - **React components** — build the UI from components and reuse at least a few of them
    - **Client components** — use the `"use client"` directive wherever you need hooks or event handlers
    - **Static routes** — at least two fixed pages (for example a home page and an about page)
    - **A dynamic route** — at least one, where you read the parameter from the URL and use it inside a fetch call
    - **Browser fetching** — load data using the built-in `fetch` function
    - **A Supabase database** — store your content in Supabase and fetch it through its PostgREST REST API

    You will present your app in the next class, so prepare to demo it and talk through how it works.

---

## Requirements in Detail

Read this list before you start, and again before you submit.

### React components

Split your UI into components — a card, a navigation bar, a list, a form, whatever your topic needs. Reuse at least one component in several places with different props.

### Client components

Any page or component that uses state, effects, or event handlers must be a client component — add `"use client"` as the very first line. Your data-fetching pages will need it.

### Static routes

Include fixed pages such as `/` and `/about`. A static route is just a folder with a `page.tsx` file inside it.

### A dynamic route used in a fetch

Include a dynamic route — a folder with square brackets in its name, such as `[id]`. Read the value from the URL and use it in your request, so that page loads the one matching record rather than everything in the table.

### Browser fetching

Use `fetch` directly to load your data — not a Supabase helper library. Handle loading, success, and error states so the page never just sits there blank.

### Supabase via PostgREST

Supabase automatically exposes each of your tables through a REST API called **PostgREST**. You call that URL with `fetch`, sending your Supabase anon key in the request headers.

Row Level Security (RLS) is **not required** for this task — your tables can be publicly readable. If you enable RLS and write a policy that still lets your app read the data, that earns extra credit.

---

## Helpful Resources

Revisit these pages while you work:

- [Introduction to Supabase](../resources/supabase/intro-to-supabase.md)
- [Content Management with Supabase](../resources/supabase/cms-with-supabase.md)
- [Fetching Data](../resources/nextjs/fetching-data.md)
- [useState and useEffect](../resources/nextjs/usestate-useeffect.md)
- [Routing](../resources/nextjs/routing.md)
- [Components and Layouts](../resources/nextjs/components-layouts.md)
- [Client and Server Components](../resources/nextjs/client-server-components.md)

The **API** section of the Supabase dashboard shows your project's PostgREST URL, your keys, and example requests — copy your project's details from there when wiring up the fetch.

---

## Stretch Goals

- Enable Row Level Security with a read policy
- Add a second table and a relationship between them
- Add create or update flows (a form that inserts rows into Supabase)
- Use `useParams` instead of the `params` prop in the dynamic route
- Style the app with Tailwind or Mantine
