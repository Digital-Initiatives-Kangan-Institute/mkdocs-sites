# Page Structure

Every complete HTML page follows the same basic structure. This page explains the parts every HTML document needs, and the **semantic** elements used to lay out a page into a header, navigation, main content and footer.

---

## The HTML Document

A complete HTML page looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home | My Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>Welcome to My Website</h1>
  <p>Everything inside the body is shown on the page.</p>

</body>
</html>
```

| Part | Purpose |
|---|---|
| `<!DOCTYPE html>` | Tells the browser the file is a modern HTML document. Always the very first line. |
| `<html lang="en">` | The **root** element that wraps everything else. `lang="en"` tells browsers and screen readers the page is in English. |
| `<head>` | Information **about** the page. Nothing in the head is displayed in the page itself. |
| `<meta charset="UTF-8">` | Sets the character encoding so symbols and letters from all languages display correctly |
| `<meta name="viewport" ...>` | Makes the page scale properly on phones and tablets |
| `<title>` | The text shown on the **browser tab**, in bookmarks and in search results |
| `<link rel="stylesheet">` | Connects a CSS file to the page (see [Styling with CSS](css.md)) |
| `<body>` | Everything that is **displayed** on the page |

!!! tip "Shortcut"
    In VS Code, open an empty `.html` file, type `!` and press `Tab`. This creates the full document structure for you (an **Emmet** shortcut).

***

## Page Titles

Every page on a website should have its **own** title that describes that page. A common pattern is the page name followed by the site name:

```html
<title>Home | Bright Smile Dental</title>
<title>Services | Bright Smile Dental</title>
<title>Contact | Bright Smile Dental</title>
```

Clear page titles help visitors tell open tabs apart, and help screen reader users know which page they are on. When you copy a page to create a new one, remember to change the title.

***

## Semantic Layout Elements

Most websites share the same layout on every page: a header with the logo, a navigation bar, the main content, and a footer at the bottom. HTML has **semantic** elements for each of these areas. *Semantic* means the element name describes the meaning of its content.

| Element | Purpose |
|---|---|
| `<header>` | The top area of the page, usually containing the logo and site name |
| `<nav>` | The main navigation links |
| `<main>` | The main content of the page. Only one per page. |
| `<section>` | A group of related content inside the page, usually with its own heading |
| `<footer>` | The bottom area of the page, usually containing copyright and contact details |
| `<address>` | Contact information such as a street address |

The example below shows a page laid out with semantic elements. The CSS tab adds colours so you can see each area.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICA8dGl0bGU+SG9tZSB8IEJyaWdodCBTbWlsZSBEZW50YWw8L3RpdGxlPlxuPC9oZWFkPlxuPGJvZHk+XG5cbiAgPGhlYWRlcj5cbiAgICA8aDE+QnJpZ2h0IFNtaWxlIERlbnRhbDwvaDE+XG4gIDwvaGVhZGVyPlxuXG4gIDxuYXY+XG4gICAgPHVsPlxuICAgICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuICAgICAgPGxpPjxhIGhyZWY9XCJzZXJ2aWNlcy5odG1sXCI+U2VydmljZXM8L2E+PC9saT5cbiAgICA8L3VsPlxuICA8L25hdj5cblxuICA8bWFpbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMj5XZWxjb21lPC9oMj5cbiAgICAgIDxwPkZyaWVuZGx5IGZhbWlseSBkZW50aXN0cnkgaW4gdGhlIGhlYXJ0IG9mIHRvd24uPC9wPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgyPkZpbmQgVXM8L2gyPlxuICAgICAgPGFkZHJlc3M+XG4gICAgICAgIDEyIE1vbGFyIFN0cmVldDxicj5cbiAgICAgICAgR2VlbG9uZyBWSUMgMzIyMFxuICAgICAgPC9hZGRyZXNzPlxuICAgIDwvc2VjdGlvbj5cbiAgPC9tYWluPlxuXG4gIDxmb290ZXI+XG4gICAgPHA+JmNvcHk7IDIwMjYgQnJpZ2h0IFNtaWxlIERlbnRhbDwvcD5cbiAgPC9mb290ZXI+XG5cbjwvYm9keT5cbjwvaHRtbD4ifSwgeyJuYW1lIjogInNlcnZpY2VzLmh0bWwiLCAiaHRtbCI6ICI8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICA8dGl0bGU+U2VydmljZXMgfCBCcmlnaHQgU21pbGUgRGVudGFsPC90aXRsZT5cbjwvaGVhZD5cbjxib2R5PlxuXG4gIDxoZWFkZXI+XG4gICAgPGgxPkJyaWdodCBTbWlsZSBEZW50YWw8L2gxPlxuICA8L2hlYWRlcj5cblxuICA8bmF2PlxuICAgIDx1bD5cbiAgICAgIDxsaT48YSBocmVmPVwiaW5kZXguaHRtbFwiPkhvbWU8L2E+PC9saT5cbiAgICAgIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPC91bD5cbiAgPC9uYXY+XG5cbiAgPG1haW4+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDI+T3VyIFNlcnZpY2VzPC9oMj5cbiAgICAgIDxwPkNoZWNrLXVwcywgY2xlYW5pbmcgYW5kIHdoaXRlbmluZy48L3A+XG4gICAgPC9zZWN0aW9uPlxuICA8L21haW4+XG5cbiAgPGZvb3Rlcj5cbiAgICA8cD4mY29weTsgMjAyNiBCcmlnaHQgU21pbGUgRGVudGFsPC9wPlxuICA8L2Zvb3Rlcj5cblxuPC9ib2R5PlxuPC9odG1sPiJ9XSwgImNzcyI6ICJoZWFkZXIsIGZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxZTVmNzQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweCAyMHB4O1xufVxuXG5uYXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNkYWI3O1xuICBwYWRkaW5nOiA1cHggMjBweDtcbn1cblxubWFpbiB7XG4gIHBhZGRpbmc6IDAgMjBweDtcbn0iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
Notice that the `header`, `nav` and `footer` are **exactly the same** on both pages. Only the content inside `main` and the `title` change. Keeping these areas consistent means visitors always know where they are and how to get around.

Semantic elements do not change how the page looks on their own, but they:

- help **screen readers** jump straight to the navigation or main content
- help **search engines** understand the page
- make the code easier for developers to read than a page made only of `div` elements

***

## Special Characters

Some characters have a special meaning in HTML, or are not on the keyboard. These are written as **character entities**, which start with `&` and end with `;`.

| Entity | Displays as | Use |
|---|---|---|
| `&copy;` | © | Copyright symbol in a footer |
| `&amp;` | & | Ampersand |
| `&lt;` | < | Less-than sign (so it is not read as a tag) |
| `&gt;` | > | Greater-than sign |
| `&nbsp;` | (space) | A space that will not break onto a new line |

***

## Working from a Template

In a workplace, you will often be given a **template**: a starting page that already has the structure, header, navigation, footer and stylesheet set up. Templates usually include **comments** explaining which parts to change.

To create a new page from a template:

1. Copy the template file and rename it, for example `services.html`
2. Change the `<title>` to describe the new page
3. Update anything the comments tell you to change, such as which navigation link is highlighted
4. Replace the content inside `<main>` with the content for the new page
5. Leave the `header`, `nav` and `footer` the same so every page stays consistent

Read every comment in a template before you start. They are written by another developer to tell you exactly where each piece of content belongs.

---

## Summary

- Every page starts with `<!DOCTYPE html>` and has an `html` element with a `head` and a `body`
- The `head` holds information about the page, such as `meta` tags, the `title` and stylesheet links
- Every page needs its own descriptive `title`, shown on the browser tab
- Use `header`, `nav`, `main`, `section` and `footer` to lay out a page
- Keep the header, navigation and footer the same on every page
- Use `&copy;` for the copyright symbol
- When working from a template, read the comments and only change what they tell you to

### Activity - Page Structure

[Attempt Activity 5 - Page Structure](../tasks/task-5-page-structure.md){.md-button}
