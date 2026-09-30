# Task 8 - Styling with CSS

## Text Colour

!!! abstract "Instructions"
    **Using the editor below**, open the **CSS** tab and write a rule that makes every `h1` heading `darkgreen`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+R3JlZW4gVGh1bWIgR2FyZGVuaW5nPC9oMT5cbjxwPkxvY2FsIGdhcmRlbmVycyBrZWVwaW5nIHlvdXIgeWFyZCBncmVlbiBhbGwgeWVhciByb3VuZC48L3A+In1dLCAiY3NzIjogIi8qIFdyaXRlIHlvdXIgQ1NTIGJlbG93ICovIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiY3NzIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    A CSS rule starts with a selector, which for headings is the tag name. The property that changes text colour is called `color`. Remember the curly braces, the colon and the semicolon.

## Background Colour

!!! abstract "Instructions"
    **Using the editor below**, give the whole page (`body`) a light background colour of `#f1f8e9`, and give every paragraph the text colour `#333333`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+R3JlZW4gVGh1bWIgR2FyZGVuaW5nPC9oMT5cbjxwPkxhd24gbW93aW5nLCBoZWRnZSB0cmltbWluZyBhbmQgZ2FyZGVuIGRlc2lnbi48L3A+XG48cD5TZXJ2aW5nIHRoZSBsb2NhbCBhcmVhIHNpbmNlIDIwMTAuPC9wPiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    This needs **two** rules, one for each selector. The background property is called `background-color`. Hex colour values start with a `#`.

## Fonts

!!! abstract "Instructions"
    **Using the editor below**, style the text so that:

    - headings use the font `Arial`, with `Helvetica` and `sans-serif` as backups
    - paragraphs use the font `Georgia`, with `serif` as a backup
    - paragraphs are `18px` in size with a line height of `1.6`
    - the `h1` is centred

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+Uml2ZXJzaWRlIEJpa2UgUmVwYWlyczwvaDE+XG48aDI+T3VyIFNlcnZpY2VzPC9oMj5cbjxwPldlIGZpeCBmbGF0IHR5cmVzLCBicmFrZXMsIGdlYXJzIGFuZCBjaGFpbnMgZm9yIGFsbCB0eXBlcyBvZiBiaWtlcy48L3A+XG48aDI+Q29udGFjdCBVczwvaDI+XG48cD5WaXNpdCBvdXIgd29ya3Nob3Agb3IgZ2l2ZSB1cyBhIGNhbGwgdG8gYm9vayBhIHNlcnZpY2UuPC9wPiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Use `font-family`, `font-size`, `line-height` and `text-align`. A list of fonts is separated with commas. You can style both heading levels in one rule by grouping the selectors with a comma.

## Link the Stylesheet

!!! abstract "Instructions"
    **Using VS Code**, open your Mini Website from Task 6 and add an external stylesheet.

    - create a `style.css` file in the same folder as your pages
    - link it in the `head` of **every** page
    - add rules to `style.css` to change the background colour of the page and the colour of the headings

    Open each page in Live Preview to check the styles apply everywhere.

??? question "Hint"
    The `link` element goes inside the `head`, and needs a `rel` attribute saying it is a stylesheet and an `href` with the file name. If one page is not styled, compare its `head` with a page that works.

## Class Selectors

!!! abstract "Instructions"
    **Using the editor below**, write CSS so that:

    - every element with the class `price` is bold and the colour `#2e7d32`
    - every element with the class `product` has a `1px` solid grey border and `10px` of padding

    The classes are already in the HTML.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwicHJvZHVjdFwiPlxuICA8aDM+TGF3biBNb3dpbmc8L2gzPlxuICA8cCBjbGFzcz1cInByaWNlXCI+JDQ1LjAwPC9wPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicHJvZHVjdFwiPlxuICA8aDM+SGVkZ2UgVHJpbW1pbmc8L2gzPlxuICA8cCBjbGFzcz1cInByaWNlXCI+JDYwLjAwPC9wPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicHJvZHVjdFwiPlxuICA8aDM+R2FyZGVuIERlc2lnbjwvaDM+XG4gIDxwIGNsYXNzPVwicHJpY2VcIj4kMTUwLjAwPC9wPlxuPC9kaXY+In1dLCAiY3NzIjogIi8qIFdyaXRlIHlvdXIgQ1NTIGJlbG93ICovIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiY3NzIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    Class selectors start with a dot, followed by the class name. The `border` shorthand takes a width, a style and a colour. Bold text uses `font-weight`.

## Add Classes and Style Them

!!! abstract "Instructions"
    **Using the editor below**, repeat the previous exercise, but this time **you** add the classes too.

    - add a class of `staff` to each team member's container, and a class of `role` to each job title
    - style `.staff` with a background colour, padding and a margin below each one
    - style `.role` in italics

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+TWVldCB0aGUgVGVhbTwvaDI+XG48ZGl2PlxuICA8aDM+UHJpeWE8L2gzPlxuICA8cD5IZWFkIEdyb29tZXI8L3A+XG4gIDxwPlByaXlhIGhhcyBiZWVuIGdyb29taW5nIGRvZ3MgZm9yIG92ZXIgdGVuIHllYXJzLjwvcD5cbjwvZGl2PlxuPGRpdj5cbiAgPGgzPlRvbTwvaDM+XG4gIDxwPkdyb29taW5nIEFzc2lzdGFudDwvcD5cbiAgPHA+VG9tIGxvdmVzIG1ha2luZyBldmVyeSBwZXQgbG9vayB0aGVpciBiZXN0LjwvcD5cbjwvZGl2PiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Add the `class` attributes in the HTML tab first, without a dot. Then write the rules in the CSS tab, with a dot. Italic text uses `font-style`, and the space below a box is `margin-bottom`.

## Padding, Border and Margin

!!! abstract "Instructions"
    **Using the editor below**, style the `.card` box so that it has:

    - `20px` of space **inside** the border
    - a `2px` solid border in any colour
    - `30px` of space **outside** the border
    - rounded corners

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICA8aDM+RnVsbCBCaWtlIFNlcnZpY2U8L2gzPlxuICA8cD5CcmFrZXMsIGdlYXJzLCBjaGFpbiBhbmQgdHlyZXMgYWxsIGNoZWNrZWQgYW5kIGFkanVzdGVkLjwvcD5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgPGgzPlB1bmN0dXJlIFJlcGFpcjwvaDM+XG4gIDxwPkZpeGVkIHdoaWxlIHlvdSB3YWl0LjwvcD5cbjwvZGl2PiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Space inside the border is `padding`, and space outside is `margin`. Rounded corners use `border-radius`. Try changing each value to see which space it controls.

## CSS Variables

!!! abstract "Instructions"
    **Using the editor below**, the colours are already stored in CSS variables. Use the variables so that:

    - the `header` and `footer` backgrounds use `--main-colour`
    - the `nav` background uses `--accent-colour`
    - the text in the header and footer uses `--light-text`

    Then change the value of `--main-colour` once, and watch both the header and footer update.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aGVhZGVyPjxoMT5QYXdzIGFuZCBDbGF3czwvaDE+PC9oZWFkZXI+XG48bmF2PjxwPkhvbWUgfCBTZXJ2aWNlcyB8IENvbnRhY3Q8L3A+PC9uYXY+XG48bWFpbj48cD5Qcm9mZXNzaW9uYWwgcGV0IGdyb29taW5nLjwvcD48L21haW4+XG48Zm9vdGVyPjxwPiZjb3B5OyAyMDI2IFBhd3MgYW5kIENsYXdzPC9wPjwvZm9vdGVyPiJ9XSwgImNzcyI6ICI6cm9vdCB7XG4gIC0tbWFpbi1jb2xvdXI6ICM1ZTM1YjE7XG4gIC0tYWNjZW50LWNvbG91cjogI2QxYzRlOTtcbiAgLS1saWdodC10ZXh0OiAjZmZmZmZmO1xufVxuXG4vKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    A variable is used as a value with the `var()` function, with the variable name inside the brackets. Both `header` and `footer` can share one rule by grouping the selectors.

## Navigation Bar

!!! abstract "Instructions"
    **Using the editor below**, turn the navigation list into a horizontal navigation bar:

    - remove the bullet points and the list's default padding
    - place the links in a row, centred
    - give the links padding, remove their underline, and make them white on a dark background
    - change the link background colour when hovered **or** focused
    - give the `active` link a different background colour

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCIgY2xhc3M9XCJhY3RpdmVcIj5Ib21lPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJzZXJ2aWNlcy5odG1sXCI+U2VydmljZXM8L2E+PC9saT5cbiAgICA8bGk+PGEgaHJlZj1cImFib3V0Lmh0bWxcIj5BYm91dCBVczwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwiY29udGFjdC5odG1sXCI+Q29udGFjdDwvYT48L2xpPlxuICA8L3VsPlxuPC9uYXY+In1dLCAiY3NzIjogIi8qIFdyaXRlIHlvdXIgQ1NTIGJlbG93ICovIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiY3NzIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    Style the list with `list-style`, `display: flex` and `justify-content`. Style the links using the descendant selector `nav a`, with `display: block`, `padding`, `color` and `text-decoration`. Hover and focus use the pseudo-classes `:hover` and `:focus`, grouped with a comma. The active link can be selected with the element name and class together.

## Style a Table

!!! abstract "Instructions"
    **Using the editor below**, style the opening hours table so that:

    - the cell borders join into single lines
    - every cell has a `1px` border and padding
    - the heading cells have a dark background with white text
    - the text in every cell is left aligned

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dGFibGUgY2xhc3M9XCJob3Vyc1wiPlxuICA8dGhlYWQ+XG4gICAgPHRyPjx0aD5EYXk8L3RoPjx0aD5Ib3VyczwvdGg+PC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0cj48dGQ+TW9uZGF5IC0gRnJpZGF5PC90ZD48dGQ+ODowMGFtIC0gNTozMHBtPC90ZD48L3RyPlxuICAgIDx0cj48dGQ+U2F0dXJkYXk8L3RkPjx0ZD45OjAwYW0gLSAxOjAwcG08L3RkPjwvdHI+XG4gICAgPHRyPjx0ZD5TdW5kYXk8L3RkPjx0ZD5DbG9zZWQ8L3RkPjwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    `border-collapse` goes on the table itself. Both `th` and `td` need the border and padding, so group them. Then write a separate rule just for `th`.

## Style a Form

!!! abstract "Instructions"
    **Using the editor below**, style the contact form so that:

    - the form is no wider than `450px`
    - each label sits on its own line above its field, in bold, with space above it
    - the inputs and textarea fill the width of the form and have padding
    - the button has a background colour, white text, padding and no border
    - the button changes colour when hovered or focused

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybSBjbGFzcz1cImNvbnRhY3QtZm9ybVwiIGFjdGlvbj1cIiNcIj5cbiAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lPC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJuYW1lXCIgbmFtZT1cIm5hbWVcIj5cblxuICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCI+XG5cbiAgPGxhYmVsIGZvcj1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9sYWJlbD5cbiAgPHRleHRhcmVhIGlkPVwibWVzc2FnZVwiIG5hbWU9XCJtZXNzYWdlXCIgcm93cz1cIjVcIj48L3RleHRhcmVhPlxuXG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNlbmQgTWVzc2FnZTwvYnV0dG9uPlxuPC9mb3JtPiJ9XSwgImNzcyI6ICIvKiBXcml0ZSB5b3VyIENTUyBiZWxvdyAqLyIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImNzcyIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Use descendant selectors starting with `.contact-form`. Labels need `display: block` to go on their own line. For the fields, `width: 100%` together with `box-sizing: border-box` stops the padding making them overflow.

## Card Layout

!!! abstract "Instructions"
    **Using the editor below**, lay out the services as a grid of cards:

    - the `.services` container becomes a grid with columns at least `200px` wide that wrap onto new rows
    - there is a gap between the cards
    - each `.service` card has a border, padding and centred text
    - images never overflow their card
    - the `.price` is bold

    Resize the preview to check the cards wrap.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwic2VydmljZXNcIj5cbiAgPGRpdiBjbGFzcz1cInNlcnZpY2VcIj5cbiAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgYWx0PVwiQ2FweWJhcmEgYmVpbmcgYnJ1c2hlZFwiPlxuICAgIDxoMz5CcnVzaCBhbmQgRmx1ZmY8L2gzPlxuICAgIDxwPkEgZnVsbCBicnVzaC1vdXQgdG8gcmVtb3ZlIGxvb3NlIGZ1ci48L3A+XG4gICAgPHAgY2xhc3M9XCJwcmljZVwiPiQzMC4wMDwvcD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZXJ2aWNlXCI+XG4gICAgPGltZyBzcmM9XCJodHRwczovL2N5YmVyYmlsYnkuY29tL2NhcHliYXJhLmpwZ1wiIGFsdD1cIkNhcHliYXJhIGFmdGVyIGEgYmF0aFwiPlxuICAgIDxoMz5XYXNoIGFuZCBEcnk8L2gzPlxuICAgIDxwPkEgZ2VudGxlIHdhc2ggd2l0aCBwZXQtc2FmZSBzaGFtcG9vLjwvcD5cbiAgICA8cCBjbGFzcz1cInByaWNlXCI+JDQ1LjAwPC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlcnZpY2VcIj5cbiAgICA8aW1nIHNyYz1cImh0dHBzOi8vY3liZXJiaWxieS5jb20vY2FweWJhcmEuanBnXCIgYWx0PVwiQ2FweWJhcmEgaGF2aW5nIGl0cyBuYWlscyB0cmltbWVkXCI+XG4gICAgPGgzPk5haWwgVHJpbTwvaDM+XG4gICAgPHA+UXVpY2sgYW5kIHN0cmVzcy1mcmVlIG5haWwgY2FyZS48L3A+XG4gICAgPHAgY2xhc3M9XCJwcmljZVwiPiQxNS4wMDwvcD5cbiAgPC9kaXY+XG48L2Rpdj4ifV0sICJjc3MiOiAiLyogV3JpdGUgeW91ciBDU1MgYmVsb3cgKi8iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJjc3MiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Use `display: grid` with `grid-template-columns` and the `repeat`, `auto-fit` and `minmax` functions shown in the [Grid](../resources/css.md#grid) section of the resource, plus `gap`. For the images, use `max-width` inside the card.

## Style Your Mini Website

!!! abstract "Instructions"
    **Using VS Code**, open the `style.css` file of your Mini Website from Task 6 and style the whole site:

    - store your colours in CSS variables at the top of the file
    - style the `header` and `footer` with a background colour and padding
    - turn the navigation into a horizontal bar, with hover, focus and active styles
    - limit the width of the `main` area and centre it on the page
    - make sure images can never overflow the page

    Every page should look the same apart from its content.

??? question "Hint"
    This repeats everything in this task on a real multi-page site. To centre a box, give it a `max-width` and set its left and right margins to `auto`. Check each page in Live Preview after every change, and check that text has strong contrast against its background.
