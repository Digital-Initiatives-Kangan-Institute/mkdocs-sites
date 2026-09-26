# Attributes

HTML attributes provide extra information about an element and are written inside the opening tag.

They usually come in name-value pairs, where the name is the attribute and the value is what it’s set to. Attributes are used to change behaviour, add links, identify elements, or provide additional information to the browser.

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

When the user clicks the link, the browser navigates to `https://example.com`.

You can also use file names as the `href` value to link between pages on the same website. This is called an **internal link**.

For example, `index.html` could link to `about.html`, allowing the user to move between pages on the site.

<embed src="/tools/code#eyJ0aXRsZSI6IkVkaXRvciIsInBhZ2VzIjpbeyJuYW1lIjoiaW5kZXguaHRtbCIsImh0bWwiOiI8YSBocmVmPVwiYWJvdXQuaHRtbFwiPkdvIHRvIEFib3V0IHBhZ2U8L2E+In0seyJuYW1lIjoiYWJvdXQuaHRtbCIsImh0bWwiOiI8YSBocmVmPVwiaW5kZXguaHRtbFwiPkdvIGJhY2sgdG8gSG9tZSBwYWdlPC9hPiJ9XSwiY3NzIjoiIiwianMiOiIiLCJhY3RpdmVUYWIiOiJodG1sIiwiYWN0aXZlUGFnZSI6ImluZGV4Lmh0bWwifQ=="></embed>

# Image Tags

Images are added to a webpage using the `<img>` tag.

Unlike most HTML elements, the `<img>` tag does not wrap around content. Instead, it uses attributes to tell the browser which image to display and information about that image.

For example:
<embed src="/tools/code#eyJ0aXRsZSI6IkVkaXRvciIsInBhZ2VzIjpbeyJuYW1lIjoiaW5kZXguaHRtbCIsImh0bWwiOiI8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgXG4gIGFsdD1cIkEgY2FweWJhcmFcIiBcbiAgd2lkdGg9XCIyMDBweFwiPiJ9XSwiY3NzIjoiIiwianMiOiIiLCJhY3RpdmVUYWIiOiJodG1sIiwiYWN0aXZlUGFnZSI6ImluZGV4Lmh0bWwifQ=="></embed>

In this example:

* `src` tells the browser where the image file is located
* `alt` provides a text description of the image
* `width` provides tells the image to resize to the specified pixels (width)

The `alt` attribute is important because:

* it improves accessibility for screen readers
* it is displayed if the image cannot load
* it helps search engines understand the image

Just like **internal links**, you can use a local file name in the `src` attribute to display an image stored in the same project folder.

Example:

```html
<img src="mountain.jpg" alt="A mountain range">
```

In this example:

* `src="mountain.jpg"` tells the browser which image file to display
* `alt="A mountain range"` provides a text description of the image for accessibility and cases where the image cannot load


# Self-Closing Tags
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
```

These elements perform a specific function without containing content between opening and closing tags.

### Activity - Attributes

[Attempt Activity 3 - Attributes](../tasks/task-3-attributes.md){.md-button}