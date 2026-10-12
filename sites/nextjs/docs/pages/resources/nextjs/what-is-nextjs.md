# What is Next.js

This resource introduces Next.js, explains how it relates to React, and walks you through creating and running your first Next.js application.

---

## What is Next.js?

**Next.js** is a popular **web development framework** built on top of **React** that helps you create fast, modern websites and applications. React focuses on building user interfaces. Next.js adds the features you need to build a complete website from start to finish.

When you write a Next.js app you are still writing React components. Next.js provides the structure around them: pages, routing, data loading, and a build system.

***

## Library vs Framework

React is a **library**. You call it when you need it, and you decide how the rest of the project is organised.

Next.js is a **framework**. It decides how your project is organised (which folders hold pages, how URLs are created, how the app is built) and calls your code at the right time.

| | React | Next.js |
|---|---|---|
| What it is | A UI library | A framework built on React |
| Builds components | Yes | Yes (it uses React) |
| Routing | Not included | Built in, based on folders |
| Server rendering | Not included | Built in |
| Project structure | Up to you | Defined by the framework |

***

## Next.js Features

Here are some key features of Next.js:

- **File-based routing**: pages are created automatically from your project folders, so you don't need to set up routing manually
- **Built-in frontend and backend support**: you can build both the website and server logic in the same project without extra setup
- **Easy data handling**: built-in ways to load and use data from APIs or databases
- **Optimised performance by default**: automatic improvements so your site loads quickly without extra configuration
- **Built-in styling support**: works out of the box with modern styling tools like Tailwind CSS
- **Simple deployment**: can be deployed to platforms like Vercel or Cloudflare with minimal configuration

For beginners, this means you don't have to set up everything from scratch. Next.js gives you a structured way to build real-world web apps quickly, whether you're creating a simple website or something more advanced like a dashboard or online service.

***

## Creating a Next.js Application

1. **Open a terminal** in the folder where you would like to store your project.

2. **Run** the following command:

    ```bash
    npx create-next-app@latest my-app
    ```

3. **Replace** `my-app` with the name of your app. The name must follow these rules:

    - No spaces (use dashes `-`)
    - No uppercase letters (all lowercase)
    - Keep it short (e.g. `my-app`, not `my-really-long-app-name-for-my-project`)

4. **When prompted** to use the **recommended defaults**, select `Yes, use recommended defaults`. This installs the recommended setup, including:

    - TypeScript language support
    - ESLint (checks your code for common mistakes)
    - Tailwind CSS
    - The App Router (the `app/` folder)

5. **Change into** the new project folder:

    ```bash
    cd my-app
    ```

!!! note
    The questions `create-next-app` asks change slightly between versions. As long as TypeScript and the App Router are enabled, your project will match the examples on this site.

***

## Running a Next.js Application

From inside your project folder, start the development server:

```bash
npm run dev
```

- The terminal prints a local URL, usually `http://localhost:3000`
- Open that URL in your browser to see your app
- The dev server watches your files, so saving a change refreshes the page automatically
- Press `Ctrl + C` in the terminal to stop the server

!!! note "Make buttons and inputs visible"
    Many tasks on this site do not care about styling. The default Next.js styles make buttons and inputs hard to see, so paste this line at the bottom of `app/globals.css` in each practice app:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

***

## Your First Page

Open `app/page.tsx` and replace its contents with:

```tsx
export default function HomePage() {
    return (
        <main>
            <h1>Hello, Next.js!</h1>
            <p>This is my first page.</p>
        </main>
    );
}
```

Save the file and look at the browser. The page updates straight away.

- `app/page.tsx` is the home page, shown at `/`
- `export default` tells Next.js which component to render for this page
- The function returns **JSX**, which looks like HTML but lives inside TypeScript

***

## Summary

- Next.js is a framework built on top of the React library
- It adds file-based routing, data loading, server rendering, and a build system
- Create a new app with `npx create-next-app@latest my-app` and accept the recommended defaults
- Start the dev server with `npm run dev` and visit `http://localhost:3000`
- `app/page.tsx` is the home page of your app
