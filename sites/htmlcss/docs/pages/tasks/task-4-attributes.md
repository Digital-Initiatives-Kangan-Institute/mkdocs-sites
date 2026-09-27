# Task 4 - Attributes

## Images - Basic Image

!!! abstract "Instructions"
    **Using the editor below**, add an image to the webpage using the `img` element.

    Use:

    - `https://cyberbilby.com/capybara.jpg` as the image source
    - `Capybara` as the alt text

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The image element uses the `img` tag. Images use the `src` attribute for the file location and the `alt` attribute for a description of the image.

## Image Sizes

!!! abstract "Instructions"
    **Using the editor below**, add the capybara image resized smaller than its original size.

    Use:

    - `https://cyberbilby.com/capybara.jpg` as the image source
    - `Capybara` as the alt text
    - the `width` attribute to display the image at `200` pixels wide

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The image element uses the `img` tag with `src` for the file location and `alt` for the description. The `width` attribute takes the size in pixels. Think about which opening tag all three attributes belong inside.

## Fix the Attributes

!!! abstract "Instructions"
    **Using the editor below**, fix the **three** mistakes in the attributes so the image and link both work.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aW1nIHNyYz1odHRwczovL2N5YmVyYmlsYnkuY29tL2NhcHliYXJhLmpwZyBhbHQ9XCJDYXB5YmFyYVwiIHdpZHRoPVwiMTUwXCI+XG5cbjxhPmh0dHBzOi8vdzMub3JnLzwvYT5cblxuPGltZyBzY3I9XCJodHRwczovL2N5YmVyYmlsYnkuY29tL2NhcHliYXJhLmpwZ1wiIGFsdD1cIkNhcHliYXJhIHNpdHRpbmcgaW4gdGhlIGdyYXNzXCI+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Check each attribute against the rules in the [Attributes](../resources/element-attributes.md#attribute-syntax) resource. Are all the values in quotes? Is each attribute name spelled correctly? Does the link have an attribute telling it where to go, and clickable text describing where it goes?

## Images - Multiple Images

!!! abstract "Instructions"
    **Using VS Code**, create a new `gallery.html` page and add `4` **local** images to the page

    Add appropriate alt text for all images.

    [Download Images](../../assets/task-3-attributes-food.zip){.md-button}

??? question "Hint"
    The `alt` attribute should describe the image content in a short sentence.

## Images in a Folder

!!! abstract "Instructions"
    **Using VS Code**, reorganise your gallery project so that the images are stored in their own folder.

    - create an `images` folder next to `gallery.html`
    - move all `4` images into the `images` folder
    - update the `src` of every image so they display again

??? question "Hint"
    As soon as the images move, the preview will show broken images, because the file paths are now wrong. The path needs the folder name, then a forward slash, then the file name. The [File Paths](../resources/element-attributes.md#file-paths) section of the resource explains relative paths.

## Descriptive Alt Text

!!! abstract "Instructions"
    **Using VS Code**, open your `gallery.html` page and rewrite the alt text for all `4` images.

    Give each image alt text that describes what is actually shown in the picture. Someone who cannot see the image should still understand it from your words alone.

??? question "Hint"
    Good alt text describes the content of the image in a short sentence. Avoid generic words like `image` or file names such as `photo1.jpg`. Describe what a person looking at the picture would see.

## External Links

!!! abstract "Instructions"
    **Using the editor below**, create a **link** that takes the user to `https://w3.org/` when clicked.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for links is `href`. Remember elements need an opening and closing tag.

## Internal Links

!!! abstract "Instructions"
    **Using the editor below**, create a **link** on both pages that allows the user to navigate between the two pages. The editor already has an `index.html` page and an `about.html` page. Use the page tabs to switch between them.

    Test your links by clicking them in the preview.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+SG9tZTwvaDE+In0sIHsibmFtZSI6ICJhYm91dC5odG1sIiwgImh0bWwiOiAiPGgxPkFib3V0PC9oMT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for links is `href`. For pages in the same folder, the value is just the other page's file name.

## Classes

!!! abstract "Instructions"
    **Using the editor below**, add a `class` attribute to the elements so the CSS (already written in the CSS tab) styles them:

    - give all **three** prices the class `price`
    - give the paragraph about delivery the class `note`

    When you are finished, the prices should turn green and bold, and the note should be italic.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+QmlrZSBBY2Nlc3NvcmllczwvaDI+XG5cbjxwPkhlbG1ldDwvcD5cbjxwPiQ1OS4wMDwvcD5cblxuPHA+QmlrZSBsb2NrPC9wPlxuPHA+JDM1LjAwPC9wPlxuXG48cD5XYXRlciBib3R0bGU8L3A+XG48cD4kMTIuMDA8L3A+XG5cbjxwPkZyZWUgZGVsaXZlcnkgb24gb3JkZXJzIG92ZXIgJDEwMC48L3A+In1dLCAiY3NzIjogIi5wcmljZSB7XG4gIGNvbG9yOiBncmVlbjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5ub3RlIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    The class attribute goes inside the opening tag of each element, just like `href` or `src`. In the HTML, the class name is written **without** the dot. The dot is only used in the CSS.

## IDs

!!! abstract "Instructions"
    **Using the editor below**, give the paragraph `Free bike service with every new bike.` an `id` of `special`, so that the CSS highlights it.

    Then explain in a sentence why an `id` is used here rather than a `class`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+VGhpcyBXZWVrPC9oMj5cbjxwPkFsbCBoZWxtZXRzIDIwJSBvZmYuPC9wPlxuPHA+RnJlZSBiaWtlIHNlcnZpY2Ugd2l0aCBldmVyeSBuZXcgYmlrZS48L3A+In1dLCAiY3NzIjogIiNzcGVjaWFsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZDtcbiAgcGFkZGluZzogMTBweDtcbn0iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    An `id` works like a class in the HTML, but the CSS uses a hash instead of a dot. Think about how many elements on a page are allowed to share the same `id`, compared with a class.
