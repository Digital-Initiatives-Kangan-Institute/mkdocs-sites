# Introduction to Supabase

Supabase is an open-source platform that provides a database, authentication, and APIs. It can serve as the backend for your web application, including acting as a **headless CMS** — a content management system where the content lives separately from the front end and is delivered through an API.

---

## What is Supabase?

Supabase is built on top of PostgreSQL (a relational database) and provides:

- A hosted database with a web-based management interface
- Auto-generated REST APIs for your data
- Real-time subscriptions
- Authentication (email, OAuth)
- File storage

---

## Projects, Tables, and Records

### Projects

A Supabase project is a container for your database. Each project gets its own URL and API keys.

### Tables

Tables store your data in rows and columns, like a spreadsheet:

```
Products table:
┌────┬──────────┬───────┬──────────────┐
│ id │  title   │ price │  category    │
├────┼──────────┼───────┼──────────────┤
│ 1  │ Latte    │ 4.50  │ Hot Drinks   │
│ 2  │ Muffin   │ 3.00  │ Food         │
│ 3  │ Espresso │ 3.50  │ Hot Drinks   │
└────┴──────────┴───────┴──────────────┘
```

### Records

Each row in a table is called a record. Records contain the actual data.

---

## Content Models

A content model defines what data your app needs and how it is structured. Before building, plan your tables:

| Table | Fields |
|---|---|
| products | id, title, description, price, image_url, category |
| categories | id, name, slug |
| posts | id, title, body, author, created_at |

---

## How a Front End Reads Supabase Data

Supabase provides client libraries to connect your front end:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://your-project.supabase.co",
    "your-anon-key"
);

async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) console.error(error);
    return data;
}
```

- `createClient` connects to your project
- `.from("table").select("*")` fetches all records from a table
- Results come back as an array of records

---

## Permissions, Keys, and Safe Setup

Supabase uses two types of keys:

- **Publishable key** (`sb_publishable_…`, called the **anon** key in older projects): safe to use in front-end code, and respects Row Level Security
- **Secret key** (`sb_secret_…`, called the **service_role** key in older projects): full database access, never expose it in front-end code

Row Level Security (RLS) controls which records a user can see or modify. Always enable RLS on tables that hold real data.

---

## Client Library or fetch?

The example above uses the `@supabase/supabase-js` client library. Supabase also exposes every table as a plain **REST API**, so you can read and write data with the built-in `fetch` function and no extra packages. The tasks on this site use `fetch`, because it is the same skill you use for every other API.

See [Supabase REST API with fetch](supabase-rest-api.md) for the full guide.

---

## Summary

- Supabase provides a database, auto-generated API, and authentication
- Data is organised into tables with fields (columns) and records (rows)
- Plan your content model before building tables
- Use the client library to connect your front end
- Use the publishable (anon) key in your app and keep the secret (service role) key private
- Enable Row Level Security on tables

### Activity - Supabase as a CMS

[Attempt Activity - Supabase as a CMS](../../tasks/supabase-cms.md){.md-button}
