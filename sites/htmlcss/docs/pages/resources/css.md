# Styling with CSS

**CSS** (Cascading Style Sheets) controls how HTML content looks: colours, fonts, spacing, borders and layout. This page covers how to add CSS to a website, how CSS rules are written, and the properties you will use most often.

---

## Adding CSS to a Page

There are three ways to add CSS to HTML:

| Method | Where the CSS goes | When to use |
|---|---|---|
| **External stylesheet** | A separate `.css` file, linked in the `head` | **Almost always.** One file styles every page. |
| **Internal styles** | A `<style>` element in the `head` of one page | Quick tests on a single page |
| **Inline styles** | A `style` attribute on one element | Rarely; hard to maintain |

### External Stylesheets

An external stylesheet is a file, usually called `style.css`, that is connected to each page with a `<link>` element inside the `head`:

```html
<head>
  <meta charset="UTF-8">
  <title>Home | My Website</title>
  <link rel="stylesheet" href="style.css">
</head>
```

* `rel="stylesheet"` tells the browser the linked file is CSS
* `href` is the file path to the CSS file, just like a link or image path

When every page links to the same stylesheet, a change made **once** in `style.css` updates **every page**. This keeps the whole website consistent: the same colours, fonts and layout on every page.

!!! note "In the code editor"
    The code editor on this site has a separate **CSS** tab. Anything typed there is applied to every page in the editor automatically, just like an external stylesheet.

***

## CSS Syntax

CSS is made of **rules**. Each rule has a **selector** and one or more **declarations**.

```css
h1 {
  color: navy;
  font-size: 32px;
}
```

| Part | Example | Meaning |
|---|---|---|
| **Selector** | `h1` | Which elements the rule applies to |
| **Property** | `color` | What to change |
| **Value** | `navy` | What to change it to |
| **Declaration** | `color: navy;` | A property and value together |

Rules for writing CSS:

- Declarations go inside curly braces `{ }`
- A colon `:` separates the property from the value
- Every declaration ends with a semicolon `;`
- Comments are written as `/* like this */`

A missing semicolon or brace is the most common reason CSS "stops working". An IDE will usually highlight these mistakes.

***

## Selectors

Selectors choose which elements to style.

| Selector | Example | Selects |
|---|---|---|
| **Element** | `p` | Every `<p>` element |
| **Class** | `.price` | Every element with `class="price"` |
| **ID** | `#contact-form` | The one element with `id="contact-form"` |
| **Descendant** | `nav a` | Every `<a>` that is inside a `<nav>` |
| **Group** | `h1, h2, h3` | Every `h1`, `h2` and `h3` |
| **Class on an element** | `a.active` | Every `<a>` with `class="active"` |

Class selectors start with a **dot** (`.`) and ID selectors start with a **hash** (`#`). The dot or hash is only used in the CSS, not in the HTML attribute.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+UHJvZHVjdCBMaXN0PC9oMT5cblxuPHA+QWxsIHByaWNlcyBpbmNsdWRlIEdTVC48L3A+XG5cbjxkaXYgY2xhc3M9XCJwcm9kdWN0XCI+XG4gIDxoMz5XYXRlciBCb3R0bGU8L2gzPlxuICA8cCBjbGFzcz1cInByaWNlXCI+JDE1LjAwPC9wPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJwcm9kdWN0XCI+XG4gIDxoMz5MdW5jaCBCb3g8L2gzPlxuICA8cCBjbGFzcz1cInByaWNlXCI+JDIyLjAwPC9wPlxuPC9kaXY+XG5cbjxwIGlkPVwibm90ZVwiPkZyZWUgZGVsaXZlcnkgb24gb3JkZXJzIG92ZXIgJDUwLjwvcD4ifV0sICJjc3MiOiAiLyogZWxlbWVudCBzZWxlY3RvciAqL1xuaDEge1xuICBjb2xvcjogZGFya3NsYXRlYmx1ZTtcbn1cblxuLyogY2xhc3Mgc2VsZWN0b3I6IHN0eWxlcyBldmVyeSBwcm9kdWN0ICovXG4ucHJvZHVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi8qIGNsYXNzIHNlbGVjdG9yOiBzdHlsZXMgZXZlcnkgcHJpY2UgKi9cbi5wcmljZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogZ3JlZW47XG59XG5cbi8qIGlkIHNlbGVjdG9yOiBzdHlsZXMgb25lIGVsZW1lbnQgKi9cbiNub3RlIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
Try adding a third product in the HTML tab with the same classes. It is styled automatically. This is why **classes** are so useful for repeated content like products, menu items or team members.

***

## Colours

Colours can be written in several ways:

| Format | Example | Notes |
|---|---|---|
| **Name** | `red`, `teal`, `white` | 140 named colours are available |
| **Hex code** | `#2f5d50` | The most common format. `#` then six characters (0-9, a-f) for red, green and blue. |
| **RGB** | `rgb(47, 93, 80)` | Red, green and blue values from 0 to 255 |

Two properties set colour:

* `color` sets the **text** colour
* `background-color` sets the **background** colour

!!! warning "Contrast"
    Text must stand out clearly from its background. Light grey text on a white background, or yellow text on white, is hard to read for many people. See [Accessibility](accessibility.md) for how to check contrast.

***

## Text and Fonts

| Property | Example | Effect |
|---|---|---|
| `font-family` | `Arial, Helvetica, sans-serif` | The font. List backups in case the first is not installed, ending with a generic family (`serif` or `sans-serif`). |
| `font-size` | `18px`, `1.2rem` | Size of the text |
| `font-weight` | `bold` | Thickness of the text |
| `font-style` | `italic` | Italic text |
| `text-align` | `center`, `left`, `right` | Horizontal alignment |
| `text-decoration` | `none`, `underline` | Adds or removes underlines (often used to remove link underlines in a nav bar) |
| `line-height` | `1.6` | Space between lines of text |

`rem` sizes are relative to the browser's default text size, so they grow when a visitor increases their browser's text size. This makes `rem` a good choice for accessibility.

***

## The Box Model

Every element on a page is a rectangular **box**. The box model describes the space in and around each box:

| Layer | Property | Description |
|---|---|---|
| **Content** | `width`, `height` | The text or image itself |
| **Padding** | `padding` | Space **inside** the border, between the content and the border |
| **Border** | `border` | A line around the padding |
| **Margin** | `margin` | Space **outside** the border, pushing other elements away |

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwiYm94XCI+VGhpcyBib3ggaGFzIHBhZGRpbmcsIGEgYm9yZGVyIGFuZCBhIG1hcmdpbi48L2Rpdj5cbjxkaXYgY2xhc3M9XCJib3hcIj5TbyBkb2VzIHRoaXMgb25lLjwvZGl2PiJ9XSwgImNzcyI6ICIuYm94IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHR5ZWxsb3c7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkIG9yYW5nZTtcbiAgbWFyZ2luOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
Try changing the `padding` and `margin` values to see the difference between them.

Useful shorthand:

* `padding: 10px;` sets all four sides
* `padding: 10px 20px;` sets top and bottom to `10px`, left and right to `20px`
* `border: 1px solid #ccc;` sets width, style and colour at once
* `border-radius: 8px;` rounds the corners
* `margin: 0 auto;` centres a box that has a `width` or `max-width`

### Width and Images

* `max-width: 800px;` stops a box from growing wider than `800px`, but lets it shrink on small screens
* `img { max-width: 100%; }` stops images from overflowing their container, which is important on phones

***

## CSS Variables

When the same colour is used in many places, it can be stored in a **CSS variable** (also called a **custom property**). Variables are usually declared on `:root`, which means the whole page, and are used with `var()`.

```css
:root {
  --main-colour: #1e5f74;
  --accent-colour: #fcdab7;
}

header {
  background-color: var(--main-colour);
}

nav {
  background-color: var(--accent-colour);
}
```

To change the site's colour scheme, you only need to change the value once at the top of the stylesheet. Many templates use variables for this reason.

***

## Hover and Focus

A **pseudo-class** styles an element when it is in a particular state. They are written with a colon after the selector.

| Pseudo-class | Applies when |
|---|---|
| `:hover` | The mouse pointer is over the element |
| `:focus` | The element has been selected with the keyboard (the `Tab` key) or clicked |

Keyboard users do not use a mouse, so any style given to `:hover` should also be given to `:focus`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8YnV0dG9uPkhvdmVyIG92ZXIgbWU8L2J1dHRvbj4ifV0sICJjc3MiOiAiYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdGVhbDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDEycHggMjRweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbjpob3ZlcixcbmJ1dHRvbjpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWdyYXk7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
***

## Simple Layouts

By default, block elements such as headings, paragraphs and `div`s stack on top of each other. Two CSS tools can place them side by side.

### Flexbox

`display: flex` places the **children** of an element in a row. It is ideal for navigation bars.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCIjXCI+SG9tZTwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwiI1wiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCIjXCI+QWJvdXQgVXM8L2E+PC9saT5cbiAgICA8bGk+PGEgaHJlZj1cIiNcIj5Db250YWN0PC9hPjwvbGk+XG4gIDwvdWw+XG48L25hdj4ifV0sICJjc3MiOiAibmF2IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlNWY3NDtcbn1cblxubmF2IHVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxubmF2IGEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMTRweCAyMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxubmF2IGE6aG92ZXIsXG5uYXYgYTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMzNjNGE7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
* `list-style: none` removes the bullet points
* `justify-content: center` centres the items in the row
* `gap: 10px` adds space between the items

### Grid

`display: grid` arranges children into columns. It is ideal for a set of cards, such as products or team members.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwiY2FyZHNcIj5cbiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgYWx0PVwiQ2FweWJhcmEgcmVsYXhpbmcgYnkgYSBwb25kXCI+XG4gICAgPGgzPlBvbmQgVG91cjwvaDM+XG4gICAgPHAgY2xhc3M9XCJwcmljZVwiPiQyNS4wMDwvcD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgPGltZyBzcmM9XCJodHRwczovL2N5YmVyYmlsYnkuY29tL2NhcHliYXJhLmpwZ1wiIGFsdD1cIkNhcHliYXJhIHJlbGF4aW5nIGJ5IGEgcG9uZFwiPlxuICAgIDxoMz5TdW5zZXQgVG91cjwvaDM+XG4gICAgPHAgY2xhc3M9XCJwcmljZVwiPiQzMC4wMDwvcD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgPGltZyBzcmM9XCJodHRwczovL2N5YmVyYmlsYnkuY29tL2NhcHliYXJhLmpwZ1wiIGFsdD1cIkNhcHliYXJhIHJlbGF4aW5nIGJ5IGEgcG9uZFwiPlxuICAgIDxoMz5GYW1pbHkgVG91cjwvaDM+XG4gICAgPHAgY2xhc3M9XCJwcmljZVwiPiQ2MC4wMDwvcD5cbiAgPC9kaXY+XG48L2Rpdj4ifV0sICJjc3MiOiAiLmNhcmRzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxODBweCwgMWZyKSk7XG4gIGdhcDogMTZweDtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jYXJkIGltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLnByaWNlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
`repeat(auto-fit, minmax(180px, 1fr))` creates as many columns as will fit, each at least `180px` wide. Try resizing the preview to see the cards wrap onto new rows.

***

## Styling Tables and Forms

Tables and forms look plain by default. A few rules make them much easier to read and use.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dGFibGUgY2xhc3M9XCJob3Vyc1wiPlxuICA8dGhlYWQ+XG4gICAgPHRyPjx0aD5EYXk8L3RoPjx0aD5Ib3VyczwvdGg+PC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0cj48dGQ+V2Vla2RheXM8L3RkPjx0ZD45OjAwYW0gLSA1OjAwcG08L3RkPjwvdHI+XG4gICAgPHRyPjx0ZD5TYXR1cmRheTwvdGQ+PHRkPjEwOjAwYW0gLSAyOjAwcG08L3RkPjwvdHI+XG4gICAgPHRyPjx0ZD5TdW5kYXk8L3RkPjx0ZD5DbG9zZWQ8L3RkPjwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuXG48Zm9ybSBjbGFzcz1cImVucXVpcnlcIiBhY3Rpb249XCIjXCI+XG4gIDxsYWJlbCBmb3I9XCJuYW1lXCI+TmFtZTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmFtZVwiIG5hbWU9XCJuYW1lXCI+XG5cbiAgPGxhYmVsIGZvcj1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9sYWJlbD5cbiAgPHRleHRhcmVhIGlkPVwibWVzc2FnZVwiIG5hbWU9XCJtZXNzYWdlXCIgcm93cz1cIjRcIj48L3RleHRhcmVhPlxuXG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNlbmQ8L2J1dHRvbj5cbjwvZm9ybT4ifV0sICJjc3MiOiAiLmhvdXJzIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLmhvdXJzIHRoLFxuLmhvdXJzIHRkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogOHB4IDE0cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5ob3VycyB0aCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxZTVmNzQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmVucXVpcnkge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG4uZW5xdWlyeSBsYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmVucXVpcnkgaW5wdXQsXG4uZW5xdWlyeSB0ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5lbnF1aXJ5IGJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG4gIHBhZGRpbmc6IDEwcHggMjBweDtcbn0iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
* `border-collapse: collapse` joins the cell borders into single lines
* `display: block` on a `label` puts it on its own line above the input
* `width: 100%` makes inputs fill the width of the form
* `box-sizing: border-box` includes padding inside the width so inputs do not overflow

***

## The Cascade

The **C** in CSS stands for **Cascading**. When two rules style the same property on the same element, the browser has to choose one:

1. A **more specific** selector wins. An ID beats a class, and a class beats an element selector.
2. If both are equally specific, the rule written **later** in the stylesheet wins.

If a style is not being applied, check whether another rule is overriding it. The browser's **Developer Tools** (right-click an element and choose **Inspect**) show every rule applied to an element, with overridden ones crossed out.

---

## Summary

- Use one external stylesheet linked in the `head` of every page to keep the site consistent
- A CSS rule is a selector followed by declarations in curly braces: `property: value;`
- Element selectors use the tag name, class selectors start with `.` and ID selectors with `#`
- `color` sets text colour and `background-color` sets the background; always keep good contrast
- The box model is content, padding, border and margin
- CSS variables on `:root` store colours so they can be changed in one place
- Style `:hover` and `:focus` together so keyboard users see the same effects
- `display: flex` suits navigation bars; `display: grid` suits groups of cards

### Activity - Styling with CSS

[Attempt Activity 8 - Styling with CSS](../tasks/task-8-css.md){.md-button}
