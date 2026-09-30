# Elements

HTML is made up of **elements**, which are the basic building blocks of a webpage. This page explains how an element is written and introduces the most common text elements.

---

## Element Structure

Each element has three parts:

- An **opening tag**
- **Content** (the information shown on the page)
- A **closing tag**

You can think of HTML tags like quotation marks in writing. Quotation marks wrap around text to show it is a quote, and HTML tags wrap around content to define what it is and how it should appear on a webpage.

For example:

```html
<h1>Hello, world!</h1>
```

In this example:

- `<h1>` is the **opening tag**
- `Hello, world!` is the **content**
- `</h1>` is the **closing tag**

The forward slash (`/`) inside the closing tag tells the browser that the element has ended.

Together, these form an **element**.

!!! note
    Tag names are written in **lowercase**. Browsers will accept `<H1>`, but lowercase is the standard and is easier to read.

***

## Headings

Heading elements display titles and section headings. There are six levels, from `h1` (most important) to `h6` (least important).

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+SGVhZGluZyBsZXZlbCAxPC9oMT5cbjxoMj5IZWFkaW5nIGxldmVsIDI8L2gyPlxuPGgzPkhlYWRpbmcgbGV2ZWwgMzwvaDM+XG48aDQ+SGVhZGluZyBsZXZlbCA0PC9oND5cbjxoNT5IZWFkaW5nIGxldmVsIDU8L2g1PlxuPGg2PkhlYWRpbmcgbGV2ZWwgNjwvaDY+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
Rules for using headings well:

- Each page should have **one** `h1`, which describes what the whole page is about
- Use `h2` for the main sections of the page, and `h3` for sections inside an `h2`
- **Do not skip levels**, for example jumping from `h1` straight to `h4`
- Choose a heading level for its **meaning**, not its size. Size can be changed with CSS later.

Screen readers let people jump between headings, so a clear heading order makes a page easier to navigate for people with vision impairments.

***

## Paragraphs

Paragraph elements display blocks of text. The browser adds space above and below each paragraph automatically.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5UaGlzIGlzIHRoZSBmaXJzdCBwYXJhZ3JhcGggb2YgdGV4dC48L3A+XG48cD5UaGlzIGlzIHRoZSBzZWNvbmQgcGFyYWdyYXBoLiBJdCBzdGFydHMgb24gYSBuZXcgbGluZSB3aXRoIGEgZ2FwIGFib3ZlIGl0LjwvcD5cblxuPHA+RXh0cmEgICAgICBzcGFjZXMgICBhbmRcbmxpbmUgYnJlYWtzIGluIHlvdXIgY29kZVxuYXJlIGlnbm9yZWQgYnkgdGhlIGJyb3dzZXIuPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
Notice that the browser ignores extra spaces and line breaks inside your code. It collapses them into a single space. To control where lines break, use the elements below.

***

## Bold, Italic and Emphasis

These elements change how part of the text is displayed or read:

| Element | Displays as | Meaning |
|---|---|---|
| `<b>` | **Bold** | Draws attention to text without extra importance |
| `<strong>` | **Bold** | The text is **important** |
| `<i>` | *Italic* | Text in a different voice, such as a technical term or a name |
| `<em>` | *Italic* | The text is **emphasised**, as if you stressed it when speaking |

`<strong>` and `<em>` look the same as `<b>` and `<i>`, but they also carry **meaning**. Screen readers can change their tone of voice for `strong` and `em`, so they are the better choice when the words are genuinely important.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5UaGlzIHdvcmQgaXMgPGI+Ym9sZDwvYj4gYW5kIHRoaXMgd29yZCBpcyA8aT5pdGFsaWM8L2k+LjwvcD5cbjxwPjxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG92ZW4gaXMgaG90LjwvcD5cbjxwPkkgPGVtPnJlYWxseTwvZW0+IHdhbnQgdG8gZ28uPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
***

## Line Breaks and Horizontal Rules

Some elements do not have any content, so they only have an opening tag. These are called **empty elements** (or self-closing tags).

- `<br>` creates a **line break** inside a block of text, such as a street address
- `<hr>` creates a **horizontal rule**, a line that separates two sections of content

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5cbiAgNDIgRXhhbXBsZSBTdHJlZXQ8YnI+XG4gIE1lbGJvdXJuZSBWSUMgMzAwMFxuPC9wPlxuXG48aHI+XG5cbjxwPlRoaXMgcGFyYWdyYXBoIGlzIGJlbG93IHRoZSBob3Jpem9udGFsIHJ1bGUuPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
***

## Comments

A **comment** is a note written inside the code that is **not displayed** on the page. Comments are used to explain code, leave instructions for other developers, or mark sections of a page.

```html
<!-- This is a comment. The browser ignores it. -->
<p>This paragraph is displayed.</p>
```

- Comments start with `<!--` and end with `-->`
- They can span multiple lines
- Many templates use comments to explain where content should go

!!! warning
    Comments are hidden on the page, but **anyone can read them** by viewing the page source in their browser (`Ctrl + U` in most browsers). Never put passwords, private notes or personal information in comments.

***

## Common HTML Elements

| Element | Purpose |
|---|---|
| `<h1>` to `<h6>` | Headings |
| `<p>` | Paragraph |
| `<b>`, `<strong>` | Bold / important text |
| `<i>`, `<em>` | Italic / emphasised text |
| `<br>` | Line break |
| `<hr>` | Horizontal rule (section break) |
| `<a>` | Link to another page or website (see [Attributes](element-attributes.md)) |
| `<img>` | Image (see [Attributes](element-attributes.md)) |
| `<ul>`, `<ol>`, `<li>` | Lists (see [Nested Elements](nested-elements.md)) |

---

## Summary

- An element is made of an opening tag, content and a closing tag
- Use one `h1` per page, then `h2` and `h3` in order without skipping levels
- Paragraphs use `p`; the browser ignores extra spaces and line breaks in code
- `strong` and `em` add meaning as well as bold and italic styling
- `br` and `hr` are empty elements with no closing tag
- Comments (`<!-- -->`) are hidden on the page but visible in the page source

### Activity - Elements

[Attempt Activity 2 - Elements](../tasks/task-2-elements.md){.md-button}
