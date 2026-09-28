# Links and Navigation

Links are what turn separate webpages into a **website**. This page covers the different kinds of links, navigation menus, and using images as links.

---

## Types of Links

| Type | Where it goes | Example `href` |
|---|---|---|
| **External link** | A page on another website | `https://www.w3.org/` |
| **Internal link** | Another page on the same website | `about.html` |
| **Email link** | Opens the visitor's email program | `mailto:hello@example.com` |
| **Phone link** | Starts a phone call on a mobile device | `tel:0390001234` |
| **Page anchor** | A section on the same page | `#opening-hours` |

External links must include the full address, including `https://`. Without it, the browser thinks you are linking to a file on your own site.

```html
<a href="https://www.w3.org/">W3C</a>          <!-- external -->
<a href="about.html">About Us</a>             <!-- internal -->
<a href="mailto:hello@example.com">Email us</a> <!-- email -->
```

### Opening Links in a New Tab

The `target="_blank"` attribute opens a link in a new browser tab. It is sometimes used for external links so the visitor does not leave your site.

```html
<a href="https://www.w3.org/" target="_blank">W3C (opens in a new tab)</a>
```

Use it sparingly, and tell the visitor the link opens a new tab. Unexpected new tabs can be confusing, particularly for screen reader users.

***

## Page Anchors

A **page anchor** is a link that jumps to a particular **section on the same page** instead of opening a different page. Page anchors are useful on long pages, for example a list of links at the top of the page that jumps to each section, or a **Back to top** link at the end of each section.

A page anchor has two parts:

1. Give the section you want to jump to an `id` (see [Attributes](element-attributes.md#identifying-elements-with-class-and-id))
2. Create a link whose `href` is a `#` followed by that `id`

```html
<a href="#opening-hours">Opening Hours</a>   <!-- the link -->

<section id="opening-hours">                 <!-- where the link jumps to -->
  <h2>Opening Hours</h2>
</section>
```

Click the links in the preview to jump between the sections.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8YSBocmVmPVwiI3NlcnZpY2VzXCI+U2VydmljZXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNvcGVuaW5nLWhvdXJzXCI+T3BlbmluZyBIb3VyczwvYT4gfFxuICA8YSBocmVmPVwiI2NvbnRhY3RcIj5Db250YWN0PC9hPlxuPC9uYXY+XG5cbjxoMSBpZD1cInRvcFwiPkJyaWdodCBTbWlsZSBEZW50YWw8L2gxPlxuXG48c2VjdGlvbiBpZD1cInNlcnZpY2VzXCI+XG4gIDxoMj5TZXJ2aWNlczwvaDI+XG4gIDxwPkNoZWNrLXVwcywgY2xlYW5pbmcgYW5kIHdoaXRlbmluZy48L3A+XG4gIDxwPjxhIGhyZWY9XCIjdG9wXCI+QmFjayB0byB0b3A8L2E+PC9wPlxuPC9zZWN0aW9uPlxuXG48c2VjdGlvbiBpZD1cIm9wZW5pbmctaG91cnNcIj5cbiAgPGgyPk9wZW5pbmcgSG91cnM8L2gyPlxuICA8cD5Nb25kYXkgdG8gRnJpZGF5LCA4OjAwYW0gdG8gNTowMHBtLjwvcD5cbiAgPHA+PGEgaHJlZj1cIiN0b3BcIj5CYWNrIHRvIHRvcDwvYT48L3A+XG48L3NlY3Rpb24+XG5cbjxzZWN0aW9uIGlkPVwiY29udGFjdFwiPlxuICA8aDI+Q29udGFjdDwvaDI+XG4gIDxwPlBob25lIDAzIDkwMDAgMTIzNC48L3A+XG4gIDxwPjxhIGhyZWY9XCIjdG9wXCI+QmFjayB0byB0b3A8L2E+PC9wPlxuPC9zZWN0aW9uPiJ9XSwgImNzcyI6ICJzZWN0aW9uIHtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMWU1Zjc0O1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
The `id` in the `href` must match the element's `id` exactly, including capital letters, and each `id` can only be used **once** on a page.

You can also jump to a section on **another page** by adding the `#` and `id` to the end of the file name:

```html
<a href="about.html#our-team">Meet our team</a>
```

***

## Links Inside Text

Links can sit inside a paragraph, just like bold or italic text. The link text should describe **where the link goes**.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5XYW50IHRvIGtub3cgbW9yZT8gPGEgaHJlZj1cImFib3V0Lmh0bWxcIj5SZWFkIGFib3V0IG91ciBoaXN0b3J5PC9hPi48L3A+In0sIHsibmFtZSI6ICJhYm91dC5odG1sIiwgImh0bWwiOiAiPGgxPk91ciBIaXN0b3J5PC9oMT5cbjxwPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+QmFjayB0byBIb21lPC9hPjwvcD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
| Link text | Quality |
|---|---|
| `Click here` | Poor: does not say where the link goes |
| `Read about our history` | Good: describes the destination |

Screen reader users often bring up a list of every link on a page. A list of "click here" links is meaningless, but descriptive link text makes sense on its own.

***

## Navigation Menus

A **navigation menu** (or **navigation bar**) is a group of links to the main pages of a website. It is usually built from an **unordered list of links**, placed inside a `nav` element:

- `nav` marks the area as the site's navigation
- `ul` groups the links as a list
- each `li` holds one `a` link

The example below has three pages sharing the same navigation. Click the links in the preview to move between the pages.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPjwvbGk+XG4gIDwvdWw+XG48L25hdj5cblxuPGgxPkhvbWU8L2gxPlxuPHA+V2VsY29tZSB0byBvdXIgd2Vic2l0ZS48L3A+In0sIHsibmFtZSI6ICJzZXJ2aWNlcy5odG1sIiwgImh0bWwiOiAiPG5hdj5cbiAgPHVsPlxuICAgIDxsaT48YSBocmVmPVwiaW5kZXguaHRtbFwiPkhvbWU8L2E+PC9saT5cbiAgICA8bGk+PGEgaHJlZj1cInNlcnZpY2VzLmh0bWxcIj5TZXJ2aWNlczwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwiY29udGFjdC5odG1sXCI+Q29udGFjdDwvYT48L2xpPlxuICA8L3VsPlxuPC9uYXY+XG5cbjxoMT5TZXJ2aWNlczwvaDE+XG48cD5IZXJlIGlzIHdoYXQgd2Ugb2ZmZXIuPC9wPiJ9LCB7Im5hbWUiOiAiY29udGFjdC5odG1sIiwgImh0bWwiOiAiPG5hdj5cbiAgPHVsPlxuICAgIDxsaT48YSBocmVmPVwiaW5kZXguaHRtbFwiPkhvbWU8L2E+PC9saT5cbiAgICA8bGk+PGEgaHJlZj1cInNlcnZpY2VzLmh0bWxcIj5TZXJ2aWNlczwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwiY29udGFjdC5odG1sXCI+Q29udGFjdDwvYT48L2xpPlxuICA8L3VsPlxuPC9uYXY+XG5cbjxoMT5Db250YWN0PC9oMT5cbjxwPkdldCBpbiB0b3VjaCB3aXRoIHVzLjwvcD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
Good navigation:

- appears on **every page** in the **same place**
- links to **every** main page, including the page you are currently on
- uses the **same order** and wording on every page
- uses short, clear labels such as `Home`, `Services`, `About Us`, `Contact`

### Highlighting the Current Page

It helps visitors to see which page they are on. A common approach is to add a **class** such as `active` to the link for the current page, then style that class with CSS.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCIgY2xhc3M9XCJhY3RpdmVcIj5Ib21lPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJzZXJ2aWNlcy5odG1sXCI+U2VydmljZXM8L2E+PC9saT5cbiAgPC91bD5cbjwvbmF2PlxuPGgxPkhvbWU8L2gxPiJ9LCB7Im5hbWUiOiAic2VydmljZXMuaHRtbCIsICJodG1sIjogIjxuYXY+XG4gIDx1bD5cbiAgICA8bGk+PGEgaHJlZj1cImluZGV4Lmh0bWxcIj5Ib21lPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJzZXJ2aWNlcy5odG1sXCIgY2xhc3M9XCJhY3RpdmVcIj5TZXJ2aWNlczwvYT48L2xpPlxuICA8L3VsPlxuPC9uYXY+XG48aDE+U2VydmljZXM8L2gxPiJ9XSwgImNzcyI6ICJuYXYgdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDA7XG59XG5cbm5hdiBhIHtcbiAgcGFkZGluZzogOHB4IDE0cHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxubmF2IGEuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdGVhbDtcbiAgY29sb3I6IHdoaXRlO1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
Notice that the navigation is identical on both pages **except** for which link has `class="active"`. When you create a new page, move the class to that page's link.

***

## Image Links

Any element that sits inside an `a` element becomes clickable, including images. To make an image into a link, **wrap** the `img` inside the `a`.

The most common image link is a **logo** in the header that takes the visitor back to the home page. This is such a common pattern that visitors expect it on every website.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aGVhZGVyPlxuICA8YSBocmVmPVwiaW5kZXguaHRtbFwiPlxuICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jeWJlcmJpbGJ5LmNvbS9jYXB5YmFyYS5qcGdcIiBhbHQ9XCJDYXB5YmFyYSBUb3VycyBsb2dvXCIgd2lkdGg9XCI4MFwiPlxuICA8L2E+XG48L2hlYWRlcj5cbjxoMT5Ib21lPC9oMT5cbjxwPjxhIGhyZWY9XCJ0b3Vycy5odG1sXCI+U2VlIG91ciB0b3VyczwvYT48L3A+In0sIHsibmFtZSI6ICJ0b3Vycy5odG1sIiwgImh0bWwiOiAiPGhlYWRlcj5cbiAgPGEgaHJlZj1cImluZGV4Lmh0bWxcIj5cbiAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgYWx0PVwiQ2FweWJhcmEgVG91cnMgbG9nb1wiIHdpZHRoPVwiODBcIj5cbiAgPC9hPlxuPC9oZWFkZXI+XG48aDE+VG91cnM8L2gxPlxuPHA+Q2xpY2sgdGhlIGxvZ28gdG8gcmV0dXJuIHRvIHRoZSBob21lIHBhZ2UuPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
For an image link, the `alt` text is read out as the link text, so it should describe the image **or** where the link goes, for example `alt="Capybara Tours logo"` or `alt="Capybara Tours home"`.

***

## Linking to Files in Folders

Internal links use the same **relative file paths** as images (see [Attributes](element-attributes.md#file-paths)).

```
my-website/
├── index.html
├── services.html
└── documents/
    └── price-list.pdf
```

| From `index.html` to... | `href` |
|---|---|
| `services.html` | `services.html` |
| `price-list.pdf` | `documents/price-list.pdf` |

A link that points to a file that does not exist, or has a spelling mistake, is called a **broken link**. The visitor sees a **404 Not Found** error. Always click every link to test it after creating it.

***

## Planning Navigation

Before building the navigation, decide which pages the site needs and how they connect. This is done with a **sitemap** (see [Planning a Website](planning-a-website.md)). The top level pages in the sitemap usually become the links in the navigation bar.

---

## Summary

- External links use a full address; internal links use a relative file path
- Page anchors use `href="#id"` to jump to the element with that `id` on the same page
- Link text should describe where the link goes, never just "click here"
- Navigation menus are a `ul` of links inside a `nav` element
- Keep the navigation identical on every page, and highlight the current page with a class such as `active`
- Wrap an `img` inside an `a` to create an image link, such as a logo that returns to the home page
- Test every link to avoid broken links (404 errors)

### Activity - Links and Navigation

[Attempt Activity 6 - Links and Navigation](../tasks/task-6-links-navigation.md){.md-button}
