# Attributes

HTML attributes provide extra information about an element and are written inside the opening tag. This page covers the attributes used for links, images, file paths and identifying elements.

---

## Attribute Syntax

Attributes come in **name-value pairs**, where the name is the attribute and the value is what it is set to.

```html
<a href="https://example.com">Visit Example</a>
```

| Part | Example |
|---|---|
| Attribute **name** | `href` |
| Attribute **value** | `"https://example.com"` |

Rules for writing attributes:

- Attributes always go inside the **opening tag**, never the closing tag
- Put an `=` between the name and value, with no spaces around it
- Wrap the value in **double quotes**
- Separate multiple attributes with a **space**

Attributes are used to change behaviour, add links, identify elements, or provide additional information to the browser.

***

## Links

The `href` attribute is used in an **anchor** (`a`) element to define where a link should take the user.

Example:

```html
<a href="https://example.com">Visit Example</a>
```

In this example:

* `<a>` creates the link element
* `href` specifies the destination
* `Visit Example` is the clickable text displayed on the webpage

When the user clicks the link, the browser navigates to `https://example.com`. A link to another website, using its full address, is called an **external link**.

You can also use file names as the `href` value to link between pages on the same website. This is called an **internal link**.

For example, `index.html` could link to `about.html`, allowing the user to move between pages on the site. The example below has two pages. Click the link in the preview to move between them.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8YSBocmVmPVwiYWJvdXQuaHRtbFwiPkdvIHRvIEFib3V0IHBhZ2U8L2E+In0sIHsibmFtZSI6ICJhYm91dC5odG1sIiwgImh0bWwiOiAiPGEgaHJlZj1cImluZGV4Lmh0bWxcIj5HbyBiYWNrIHRvIEhvbWUgcGFnZTwvYT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
Links are covered in more detail in [Links and Navigation](links-navigation.md).

***

## Images

Images are added to a webpage using the `<img>` tag.

Unlike most HTML elements, the `<img>` tag does not wrap around content. Instead, it uses attributes to tell the browser which image to display and information about that image.

For example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgXG4gIGFsdD1cIkEgY2FweWJhcmFcIiBcbiAgd2lkdGg9XCIyMDBcIj4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
In this example:

* `src` (source) tells the browser where the image file is located
* `alt` (alternative text) provides a text description of the image
* `width` tells the browser to resize the image to the specified number of pixels wide

The `height` attribute works the same way as `width`. If you only set one of them, the browser keeps the image in proportion so it does not look stretched.

### Alt Text

The `alt` attribute is important because:

* it improves **accessibility**, as screen readers read it aloud to people who cannot see the image
* it is displayed if the image cannot load
* it helps search engines understand the image

Good alt text describes what is **shown** in the image, in a short sentence:

| Alt text | Quality |
|---|---|
| `alt="image"` | Poor: does not describe anything |
| `alt="IMG_2041.jpg"` | Poor: a file name is not a description |
| `alt="Dog"` | Okay: very general |
| `alt="Golden retriever puppy sitting on the grass"` | Good: describes what a sighted person would see |

If an image is **only decoration** and adds no information, use an empty value (`alt=""`) so screen readers skip it. Never leave the `alt` attribute out completely.

***

## File Paths

Just like **internal links**, you can use a local file name in the `src` attribute to display an image stored in your project folder. The value is called a **file path**, and it tells the browser where to find the file **relative to the current page**.

Given this directory structure:

```
my-website/
├── index.html
├── about.html
└── images/
    ├── logo.png
    └── mountain.jpg
```

| From `index.html`, to... | File path |
|---|---|
| `about.html` (same folder) | `about.html` |
| `mountain.jpg` (inside the `images` folder) | `images/mountain.jpg` |
| `logo.png` (inside the `images` folder) | `images/logo.png` |

Example:

```html
<img src="images/mountain.jpg" alt="Snow-covered mountain range at sunrise">
```

In this example:

* `images/` tells the browser to look inside the `images` folder
* `mountain.jpg` is the file inside that folder
* `alt` provides a text description of the image for accessibility and cases where the image cannot load

!!! warning "Relative paths, not your computer's paths"
    Never use a path that points to your own computer, such as `C:\Users\alex\Desktop\mountain.jpg`. It works on your computer only. Once the site is published, visitors will see a broken image. Always use **relative** paths like `images/mountain.jpg`.

***

## Identifying Elements with class and id

Two attributes can be added to **any** element to give it a name. These names are mostly used by CSS to style specific elements.

| Attribute | Rule | Example use |
|---|---|---|
| `class` | Can be used on **many** elements. An element can have several classes separated by spaces. | Every product card on a page: `class="product"` |
| `id` | Must be **unique**. Only one element on a page can have a particular `id`. | A single form field, or a section you want to link to: `id="email"` |

```html
<p class="price">$5.00</p>
<p class="price">$7.50</p>

<form id="contact-form"></form>
```

Class and id names should be lowercase with hyphens instead of spaces, like file names.

***

## Self-Closing Tags

Most HTML elements have:

* an opening tag
* content
* a closing tag

Example:

```html
<p>This is a paragraph.</p>
```

However, some elements do not contain content and therefore do not need a closing tag. These are commonly called **self-closing tags** or **void elements**.

The `<img>` tag is an example of this because the image itself is provided through attributes rather than inner content.

Example:

```html
<img src="landscape.jpg" alt="Mountain landscape">
```

Other common self-closing tags include:

```html
<br>
<hr>
<input>
<meta>
<link>
```

These elements perform a specific function without containing content between opening and closing tags.

---

## Summary

- Attributes are name-value pairs written in the opening tag, with the value in double quotes
- `href` sets where a link goes; external links use a full address, internal links use a file name
- `img` needs `src` for the file and `alt` for a description; `width` and `height` resize it
- Good alt text describes what the image shows
- File paths are relative to the current page, for example `images/logo.png`
- `class` can be reused on many elements; `id` must be unique on the page
- Void elements such as `img`, `br`, `hr` and `input` have no closing tag

### Activity - Attributes

[Attempt Activity 4 - Attributes](../tasks/task-4-attributes.md){.md-button}
