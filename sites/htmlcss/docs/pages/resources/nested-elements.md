# Nested Elements
## Nesting

HTML elements can be **nested** inside one another to create structure and meaning in a webpage. This means an element can contain other elements as its **children**, forming a hierarchy that browsers use to understand how content is related and should be displayed.

For example, a paragraph element can contain a bold element to emphasize part of the text.

```html
<p>This is a <b>bold</b> word inside a paragraph.</p>
```

In this case, the `<b>` element is **nested** inside the `<p>` element, so only the word `bold` is emphasized while still remaining part of the same paragraph.

Nesting is how most webpages are built. Things like menus, cards, forms, and layouts are all just layers of nested elements.

### Unordered Lists

An **unordered list** is used to group related items together when the order does not matter. Unordered lists use the `<ul>` element, and each item inside the list uses an `<li>` (list item) element.

For example:

<embed src="/tools/code#eyJ0aXRsZSI6IkVkaXRvciIsInBhZ2VzIjpbeyJuYW1lIjoiaW5kZXguaHRtbCIsImh0bWwiOiI8dWw+XG4gICAgPGxpPktleWJvYXJkPC9saT5cbiAgICA8bGk+TW91c2U8L2xpPlxuICAgIDxsaT5Nb25pdG9yPC9saT5cbjwvdWw+In1dLCJjc3MiOiIiLCJqcyI6IiIsImFjdGl2ZVRhYiI6Imh0bWwiLCJhY3RpdmVQYWdlIjoiaW5kZXguaHRtbCJ9"></embed>

This creates a bulleted list of items.

Lists are commonly used for:

- navigation menus
- groups of links
- steps where the order is not important

Because lists contain **list items** inside them, unordered lists are another example of **nesting**.

You can also nest lists inside other lists to create subcategories or grouped information.

For example:

<embed src="/tools/code#eyJ0aXRsZSI6IkVkaXRvciIsInBhZ2VzIjpbeyJuYW1lIjoiaW5kZXguaHRtbCIsImh0bWwiOiI8dWw+XG4gICAgPGxpPldlYiBUZWNobm9sb2dpZXNcbiAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPkhUTUw8L2xpPlxuICAgICAgICAgICAgPGxpPkNTUzwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgPC9saT5cblxuICAgIDxsaT5Ub29sczwvbGk+XG48L3VsPiJ9XSwiY3NzIjoiIiwianMiOiIiLCJhY3RpdmVUYWIiOiJodG1sIiwiYWN0aXZlUGFnZSI6ImluZGV4Lmh0bWwifQ=="></embed>

In this example:

* the second `<ul>` is nested inside the first list
* the nested list belongs to the `Web Technologies` item
* this creates a parent-and-child structure in the content


### Activity - Nested Elements

[Attempt Activity 2 - Nested Elements](../tasks/task-2-nested-elements.md){.md-button}