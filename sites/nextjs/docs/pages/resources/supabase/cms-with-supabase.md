# Content Management with Supabase

Beyond storing data, Supabase can function as a **headless CMS**. In a headless CMS, the content management backend is decoupled from the front-end presentation — content lives in the database and is delivered through an API. This means you can manage the content your front end displays without needing to redeploy your application.

---

## CMS Concepts

A CMS separates content from code. Content authors can update text, images, and data without touching the codebase. Your front end reads this content and displays it.

With Supabase as a CMS:

- Content lives in database tables
- Editors update content through the Supabase dashboard
- Your app fetches content through the API
- Changes appear immediately without redeploying

---

## Reading CMS Content in Your App

```typescript
const { data: articles } = await supabase
    .from("articles")
    .select("title, body, author, published_at")
    .order("published_at", { ascending: false });
```

This fetches articles ordered by publication date. The front end renders whatever content is currently in the database.

---

## Displaying CMS-Style Content

Use the fetched data to build your UI:

```tsx
{articles.map(article => (
    <article key={article.id}>
        <h2>{article.title}</h2>
        <p className="byline">By {article.author} on {article.published_at}</p>
        <p>{article.body}</p>
    </article>
))}
```

The same component works for any number of articles — the content is driven by the database.

---

## Create and Update Workflows

A full CMS needs create and update capabilities. Two approaches:

### Dashboard-Based (Recommended)

Content managers edit data directly in the Supabase dashboard. No code required — the front end just reads the data.

### Form-Based

Build forms in your app to create and update records:

```typescript
const { error } = await supabase
    .from("articles")
    .insert({ title: "New Article", body: "Content here..." });

const { error } = await supabase
    .from("articles")
    .update({ title: "Updated Title" })
    .eq("id", 1);
```

---

## Planning a CMS Data Model

Before building tables, identify what content your app needs:

```
Cafe Site:
├── menu_items (title, description, price, category, image)
├── specials (title, description, valid_until)
├── testimonials (customer_name, quote, rating)
└── about (history_text, image_url, opening_hours)
```

---

## How the Front End Uses Supabase Data

The general pattern:

1. Create a Supabase client in your app
2. Write a function to fetch data from a table
3. Call the function (via `useEffect` or a button)
4. Store the result in state (`useState`)
5. Render the data in your components

---

## Summary

- Supabase can act as a CMS: edit content in the database, display it in the front end
- Dashboards offer a no-code way to manage content
- Forms in your app enable custom create/update workflows
- Plan your content model (tables and fields) before building
- Front-end changes are driven by database content, not code deploys
