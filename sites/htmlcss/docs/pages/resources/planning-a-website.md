# Planning a Website

Good websites are planned before any code is written. This page covers working out what the client needs, creating a **sitemap**, and confirming the plan before development starts.

---

## Client Requirements

A **client** is the person or business the website is being built for. **Client requirements** are the things the client needs the website to have or do. They usually come from a **brief**: an email, document or meeting where the client describes what they want.

Before planning, read the brief closely and pull out every requirement. Look for:

| Look for | Example |
|---|---|
| **Pages** the client asks for | "a home page, a services page and a contact page" |
| **Content** for each page | "the home page should show our address and phone number" |
| **How content should be displayed** | "prices shown in a table", "a photo of each staff member" |
| **Features** | "a form so customers can send us a message" |
| **Navigation** | "visitors should be able to get to every page from every page" |
| **Branding** | logo, colours, fonts, a template to follow |
| **Limits** | "the form doesn't need to work yet", deadlines, budget |

Write the requirements as a **list**, one requirement per line. This list becomes a checklist to build from and to test against at the end.

!!! tip "Every word matters"
    Requirements are often hidden in the middle of a sentence. "The home page should have our opening hours **in a table** and **a link to the services page**" contains three separate requirements: opening hours, displayed in a table, and a link to the services page. Missing one means the site does not meet the brief.

If anything in the brief is unclear, **ask the client** rather than guessing.

***

## Sitemaps

A **sitemap** is a plan of all the pages on a website and how they are connected.

### Purpose of a Sitemap

A sitemap is used to:

- plan the **hierarchy** (structure) of the website before development starts
- make sure every page the client asked for is included
- plan the **navigation**: which pages link to which
- show the client the structure so they can approve it before work begins
- give the development team a shared plan to work from
- help **search engines** find and index every page (XML sitemaps)

### Reading a Visual Sitemap

A visual sitemap looks like an upside-down tree. The **home page** is at the top, the main pages sit below it, and any sub-pages sit below those.

```
                        ┌──────────────┐
                        │     Home     │
                        │  index.html  │
                        └──────┬───────┘
          ┌────────────────────┼────────────────────┐
  ┌───────┴───────┐    ┌───────┴───────┐    ┌───────┴───────┐
  │   Services    │    │   About Us    │    │    Contact    │
  │ services.html │    │  about.html   │    │ contact.html  │
  └───────┬───────┘    └───────────────┘    └───────────────┘
      ┌───┴──────────┐
 ┌────┴─────┐  ┌─────┴─────┐
 │ Pricing  │  │ Bookings  │
 └──────────┘  └───────────┘
```

Each box is a page. Adding the **file name** to each box helps when building the site, and a short note of the **content** for each page makes the plan even clearer.

***

## Types of Sitemaps

| Type | What it is | Who it is for | Tools to create it |
|---|---|---|---|
| **Visual sitemap** (hierarchical sitemap) | A diagram of boxes and lines showing every page and how pages relate, like the tree above | Clients, designers and developers during **planning** | Diagramming tools such as **draw.io (diagrams.net)**, **Lucidchart**, **Microsoft Visio**, **Figma / FigJam**, **Miro**, **Canva**, SmartArt in **Word** or **PowerPoint**, or pen and paper |
| **XML sitemap** | A file named `sitemap.xml` listing the address of every page in a format computers can read | **Search engines** such as Google and Bing, so they can find and index every page | Written by hand in a text editor or IDE, or made with an **XML sitemap generator** website, or created automatically by a content management system plugin |
| **HTML sitemap** | A normal webpage on the site that lists links to every page | **Visitors**, to find pages on large websites | Written in HTML using an IDE, like any other page |

Some people also use **flowcharts** or **user flow diagrams** to show the path a visitor takes to complete a task, such as finding a product and then contacting the business. These are made with the same diagramming tools as visual sitemaps.

### An XML Sitemap Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/index.html</loc>
  </url>
  <url>
    <loc>https://www.example.com/services.html</loc>
  </url>
</urlset>
```

### Creating a Visual Sitemap with draw.io

**draw.io** (also called **diagrams.net**) is a free, browser-based diagramming tool.

1. Go to [https://app.diagrams.net/](https://app.diagrams.net/)
2. Choose where to save the diagram (for example **Device**) and create a **Blank Diagram**
3. Drag a **rectangle** shape onto the page and double-click it to type the page name, for example `Home (index.html)`
4. Add a rectangle for each of the other pages below it
5. Hover over a shape and drag from one of its blue arrows to another shape to connect them with a line
6. Use `File` then `Export as` then `PNG` to save the sitemap as an image

***

## What to Consider When Creating a Sitemap

| Consideration | Questions to ask |
|---|---|
| **Client requirements** | Does the sitemap include every page the client asked for? |
| **Purpose of the site** | What is the website for? What must visitors be able to do? |
| **Target audience** | Who will use the site, and what will they be looking for? |
| **Content** | What content belongs on each page? Is anything repeated or missing? |
| **Hierarchy** | Which pages are main pages, and which are sub-pages? |
| **Navigation** | How will visitors move between pages? Which pages appear in the navigation bar? |
| **Depth** | Can every page be reached in a few clicks? Keeping the site shallow (few levels) makes it easier to use. |
| **Page names and file names** | Are page names short and clear? Do the file names follow naming rules? |
| **Growth** | Could more pages be added later without redesigning the structure? |

***

## Planning Navigation

The sitemap guides the navigation:

- The **top-level pages** (directly under Home) usually become the links in the **navigation bar**
- **Home** is usually the first link, and the **logo** usually links to Home as well
- Sub-pages are linked from their parent page
- Some links are also placed **inside the content**, for example a sentence on the home page that links to the services page

***

## Wireframes

A **wireframe** is a simple sketch of the layout of a single page: where the header, navigation, headings, images and footer go. Where a sitemap shows *which* pages exist, a wireframe shows *what goes where* on one page. Wireframes are usually drawn with boxes and lines, without colours or real images.

***

## Confirming the Plan

Before building, show the requirements list and sitemap to the client (or your supervisor) and **confirm they are correct**. Changing a plan is quick; changing a finished website takes much longer.

In a workplace, this confirmation is often recorded as a **sign-off**: the client or supervisor signs and dates the plan to show they approve it. Keep a record of any changes the client asks for.

---

## Summary

- Read the client brief closely and list every requirement, including how content should be displayed
- A sitemap plans the hierarchy and navigation of a website before development
- Visual sitemaps are for planning with clients; XML sitemaps are for search engines; HTML sitemaps are for visitors
- Visual sitemaps can be made with tools such as draw.io, Lucidchart, Visio, Figma, Canva or pen and paper
- Consider requirements, audience, content, hierarchy, navigation, depth and naming when creating a sitemap
- Confirm the plan with the client before building

### Activity - Planning a Website

[Attempt Activity 10 - Planning a Website](../tasks/task-10-planning.md){.md-button}
