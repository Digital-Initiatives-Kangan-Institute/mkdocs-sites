# Nested Elements

HTML elements can be placed inside one another to build up a page. This page explains nesting, lists, and the container elements used to group content.

---

## Nesting

HTML elements can be **nested** inside one another to create structure and meaning in a webpage. This means an element can contain other elements as its **children**, forming a hierarchy that browsers use to understand how content is related and should be displayed.

For example, a paragraph element can contain a bold element to emphasise part of the text.

```html
<p>This is a <b>bold</b> word inside a paragraph.</p>
```

In this case, the `<b>` element is **nested** inside the `<p>` element, so only the word `bold` is emphasised while still remaining part of the same paragraph.

Nesting is how most webpages are built. Things like menus, cards, forms, and layouts are all just layers of nested elements.

### Parents and Children

| Term | Meaning |
|---|---|
| **Parent** | The element that contains another element (`p` in the example above) |
| **Child** | The element inside the parent (`b` in the example above) |
| **Siblings** | Elements that share the same parent |

### Closing in the Right Order

Nested elements must be closed in the **reverse order** they were opened. The last element opened is the first one closed.

```html
<!-- Correct: b is opened last, so it is closed first -->
<p>This is <b>correct</b>.</p>

<!-- Incorrect: the tags overlap -->
<p>This is <b>incorrect.</p></b>
```

### Indentation

Indent child elements (usually with 2 or 4 spaces) so it is easy to see which element is inside which. Browsers ignore the indentation, but it makes your code much easier to read and fix.

***

## Unordered Lists

An **unordered list** is used to group related items together when the order does not matter. Unordered lists use the `<ul>` element, and each item inside the list uses an `<li>` (list item) element.

For example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dWw+XG4gICAgPGxpPktleWJvYXJkPC9saT5cbiAgICA8bGk+TW91c2U8L2xpPlxuICAgIDxsaT5Nb25pdG9yPC9saT5cbjwvdWw+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
This creates a bulleted list of items.

Lists are commonly used for:

- navigation menus
- groups of links
- features or items where the order is not important

Because lists contain **list items** inside them, unordered lists are another example of **nesting**.

***

## Ordered Lists

An **ordered list** is used when the order of the items **does** matter, such as steps in instructions or a top 10. Ordered lists use the `<ol>` element and are numbered automatically.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+TWFraW5nIFRvYXN0PC9oMj5cbjxvbD5cbiAgICA8bGk+UHV0IHRoZSBicmVhZCBpbiB0aGUgdG9hc3RlcjwvbGk+XG4gICAgPGxpPlB1c2ggdGhlIGxldmVyIGRvd248L2xpPlxuICAgIDxsaT5XYWl0IGZvciB0aGUgdG9hc3QgdG8gcG9wIHVwPC9saT5cbiAgICA8bGk+QWRkIGJ1dHRlcjwvbGk+XG48L29sPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
If you add, remove or move an item, the numbers update automatically.

***

## Nested Lists

You can also nest lists inside other lists to create subcategories or grouped information.

For example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dWw+XG4gICAgPGxpPldlYiBUZWNobm9sb2dpZXNcbiAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPkhUTUw8L2xpPlxuICAgICAgICAgICAgPGxpPkNTUzwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgPC9saT5cblxuICAgIDxsaT5Ub29sczwvbGk+XG48L3VsPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
In this example:

* the second `<ul>` is nested inside the first list
* the nested list belongs to the `Web Technologies` item
* the nested list sits **inside** the `<li>`, before its closing `</li>` tag
* this creates a parent-and-child structure in the content

***

## Grouping with Containers

Sometimes you need to group several elements together so they can be treated as one unit, for example a product with its picture, name and price. The `<div>` (division) element is a general-purpose **container** used for this.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2PlxuICAgIDxoMz5CbHVlIFNuZWFrZXJzPC9oMz5cbiAgICA8cD5MaWdodHdlaWdodCBydW5uaW5nIHNob2VzLjwvcD5cbiAgICA8cD4kODkuMDA8L3A+XG48L2Rpdj5cblxuPGRpdj5cbiAgICA8aDM+UmVkIFNuZWFrZXJzPC9oMz5cbiAgICA8cD5Db21mb3J0YWJsZSBldmVyeWRheSBzaG9lcy48L3A+XG4gICAgPHA+JDc1LjAwPC9wPlxuPC9kaXY+In1dLCAiY3NzIjogImRpdiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
On its own, a `div` does not change how content looks. It becomes useful when combined with **CSS** (see [Styling with CSS](css.md)), which can give each group a border, background colour or layout. The CSS tab in the example above adds a border around each `div`.

`<span>` is the inline version of `<div>`. It wraps a few words inside a line of text, for example `<p>Price: <span>$5.00</span></p>`.

---

## Summary

- Nesting places elements inside other elements, creating parents and children
- Close nested elements in the reverse order they were opened
- Indent child elements to make code readable
- `ul` creates a bulleted list, `ol` creates a numbered list, and each item is an `li`
- A nested list goes inside an `li`, before its closing tag
- `div` groups related elements into a block; `span` wraps words inside a line

### Activity - Nested Elements

[Attempt Activity 3 - Nested Elements](../tasks/task-3-nested-elements.md){.md-button}
