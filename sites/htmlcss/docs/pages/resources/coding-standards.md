# Coding Standards

**Coding standards** are agreed rules for how code should be written. Browsers are very forgiving and will often display a page even when the code is messy or out of date, but code that simply "works" is not the same as good code. This page covers the basic coding techniques web developers follow so their HTML is easy to read, easy to maintain, accessible and up to date.

---

## Why Coding Standards Matter

The code below breaks almost every rule on this page, but the browser still displays it. Looking at the preview alone, you would not know anything was wrong.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8RElWIENMQVNTPVwiVG9wXCI+XG48Q0VOVEVSPjxIMT5CcmlnaHQgU21pbGUgRGVudGFsPC9IMT48L0NFTlRFUj5cbjwvRElWPlxuPGRpdj5cbjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT5cbjxhIGhyZWY9XCJzZXJ2aWNlcy5odG1sXCI+U2VydmljZXM8L2E+XG48L2Rpdj5cbjxwIHN0eWxlPVwiY29sb3I6IG5hdnk7IGZvbnQtc2l6ZTogMThweFwiPkZyaWVuZGx5IGZhbWlseSBkZW50aXN0cnkuXG48Zm9udCBjb2xvcj1cInRlYWxcIj5Ob3cgb3BlbiBTYXR1cmRheXM8L2ZvbnQ+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
Following coding standards means:

- code is **easy to read**, for you and for other developers
- code is **easy to update**, because everything is where people expect it to be
- a team's code is **consistent**, even when several developers work on the same website
- pages work well with **screen readers** and **search engines**
- pages **pass validation** against the W3C standards and keep working as browsers are updated

In a workplace, coding standards are usually written down in an organisation's **coding standards** or **style guide** document, and code is checked against them when it is reviewed.

***

## Indentation

Indent child elements inside their parent, usually with **2 or 4 spaces**, and use the same amount everywhere. Indentation shows which element is inside which (see [Nested Elements](nested-elements.md#indentation)).

Without indentation:

```html
<nav>
<ul>
<li><a href="index.html">Home</a></li>
<li><a href="services.html">Services</a></li>
</ul>
</nav>
```

With indentation:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
  </ul>
</nav>
```

!!! tip "Let the IDE do it"
    In VS Code, right-click in a file and choose **Format Document** (or press `Shift + Alt + F`) to fix the indentation of the whole file.

***

## Lowercase Tags and Attributes

Write all tag names and attribute names in **lowercase** (see [Elements](elements.md)). Browsers accept `<H1>` or `<IMG SRC="...">`, but lowercase is the standard, and mixing cases makes code harder to read.

| Avoid | Use |
|---|---|
| `<BODY>`, `<H1>`, `<P>` | `<body>`, `<h1>`, `<p>` |
| `<IMG SRC="logo.png" ALT="Logo">` | `<img src="logo.png" alt="Logo">` |

The same goes for names you create yourself. File names, `class` names and `id` names should be lowercase, with hyphens instead of spaces, for example `our-team.html` and `class="price-list"` (see [Development Environment](development-environment.md#file-naming-rules)).

***

## Closing Tags

Close **every** element that has a closing tag, and close elements in the **reverse order** they were opened: the last element opened is the first one closed (see [Nested Elements](nested-elements.md#closing-in-the-right-order)).

```html
<!-- Wrong: the p is never closed, and strong is closed in the wrong order -->
<p>Now open <strong>Saturdays
<p>Book online today.</strong>

<!-- Right -->
<p>Now open <strong>Saturdays</strong></p>
<p>Book online today.</p>
```

**Empty elements** such as `<img>`, `<br>`, `<hr>`, `<meta>` and `<link>` have no content, so they do not have a closing tag (see [Attributes](element-attributes.md#self-closing-tags)).

***

## Semantic Elements

Use **semantic elements** for the main areas of a page instead of `div` elements (see [Page Structure](page-structure.md#semantic-layout-elements)). A `div` tells the browser nothing about its content, while a semantic element describes what the content is.

| Avoid | Use |
|---|---|
| `<div class="top">` | `<header>` |
| `<div class="menu">` | `<nav>` |
| `<div class="content">` | `<main>` |
| `<div class="bottom">` | `<footer>` |

Semantic elements help screen reader users jump straight to the navigation or the main content, help search engines understand the page, and make the code easier for developers to follow. Keep `div` for grouping content that has no semantic element of its own, such as a card on a menu page.

***

## Comments

Use comments to label the **main sections** of each page, and to explain anything that is not obvious (see [Elements](elements.md#comments)).

```html
<!-- Header: logo links back to the home page -->
<header>
  ...
</header>

<!-- Main navigation -->
<nav>
  ...
</nav>
```

Good comments are short and useful. There is no need to comment every line. Remember that anyone can read comments in the page source, so **never** put passwords, private notes or personal information in them.

***

## Keep Styling in CSS

HTML is for **structure and content**, and CSS is for **presentation**. Put all styling in an **external stylesheet**, not in `style` attributes on individual elements (see [Styling with CSS](css.md#adding-css-to-a-page)).

Inline style:

```html
<p style="color: navy; font-size: 18px">Friendly family dentistry.</p>
```

External stylesheet:

```html
<p class="intro">Friendly family dentistry.</p>
```

```css
/* style.css */
.intro {
  color: navy;
  font-size: 18px;
}
```

With inline styles, changing the colour means finding and editing every element on every page. With an external stylesheet, one change in `style.css` updates the whole website.

***

## Obsolete Tags and Attributes

Early versions of HTML, before CSS existed, included tags and attributes that changed how content **looked**. When CSS was introduced, the **W3C** moved all presentation into CSS and removed these from the HTML standard. They are now **obsolete**: some browsers still display them so that very old websites keep working, but they should never be used in new code.

| Obsolete | What it did | Use instead |
|---|---|---|
| `<font>` | Changed the colour, size or font of text | CSS `color`, `font-size` and `font-family` |
| `<center>` | Centred content | CSS `text-align: center` |
| `<big>` | Made text bigger | CSS `font-size` |
| `<strike>` | Crossed out text | `<del>` for deleted content, or CSS `text-decoration: line-through` |
| `<marquee>` | Made text scroll across the screen | Avoid. Moving content is an accessibility problem. |
| `bgcolor` attribute | Set a background colour | CSS `background-color` |
| `align` attribute | Aligned text or images | CSS `text-align`, or a layout such as flexbox |

The [W3C validator](w3c.md#the-w3c-validator) reports obsolete tags as errors, for example: *The font element is obsolete. Use CSS instead.*

!!! note "Finding old code"
    You will still see these tags in old tutorials and on old websites. If you come across them when updating a website, replace them with CSS.

***

## Before and After

Here is the code from the start of this page, rewritten to follow the coding standards.

```html
<!-- Header -->
<header>
  <h1>Bright Smile Dental</h1>
</header>

<!-- Main navigation -->
<nav>
  <a href="index.html">Home</a>
  <a href="services.html">Services</a>
</nav>

<main>
  <p class="intro">Friendly family dentistry.</p>
  <p class="notice">Now open Saturdays</p>
</main>
```

```css
/* style.css */
header {
  text-align: center;
}

.intro {
  color: navy;
  font-size: 18px;
}

.notice {
  color: teal;
}
```

| Problem in the original | Coding standard |
|---|---|
| No indentation | Indentation |
| `<DIV CLASS="Top">`, `<CENTER>`, `<H1>` in capitals | Lowercase tags and attributes |
| The first `<p>` is never closed | Closing tags |
| `div` elements used for the header and navigation | Semantic elements |
| No comments marking the sections | Comments |
| `style` attribute on the paragraph | Keep styling in CSS |
| `<center>` and `<font>` tags | Obsolete tags |

***

## Checking Your Code

- **Format** each file in your IDE so the indentation is consistent
- **Validate** each page with the [W3C validator](w3c.md#the-w3c-validator) and fix every error
- **Review** your code against your organisation's coding standards before it goes to the client
- Ask a **peer** to read your code. Someone else will often spot problems you have missed.

---

## Summary

- Coding standards are agreed rules that keep code readable, consistent, accessible and up to date
- Indent child elements consistently, and write tags, attributes and names in lowercase
- Close every element that has a closing tag, in the reverse order it was opened
- Use semantic elements such as `header`, `nav`, `main` and `footer` instead of `div` for the main areas of a page
- Use short comments to label the main sections of each page, and never put private information in them
- Keep all styling in an external CSS stylesheet rather than inline `style` attributes
- Obsolete tags such as `<font>` and `<center>` were removed from HTML and replaced by CSS; never use them
