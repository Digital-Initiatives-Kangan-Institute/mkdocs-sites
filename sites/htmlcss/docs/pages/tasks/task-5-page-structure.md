# Task 5 - Page Structure

## Document Structure

!!! abstract "Instructions"
    **Using VS Code**, create a new `index.html` page **without** using the Emmet shortcut. Type out the full document structure yourself.

    Your page must include:

    - the doctype
    - an `html` element with the language set to English
    - a `head` containing the character set, the viewport setting and a `title`
    - a `body` containing a heading and a paragraph

    When you are finished, compare it with the structure Emmet creates to check you have not missed anything.

??? question "Hint"
    The [Page Structure](../resources/page-structure.md#the-html-document) resource lists every part in order. Remember that only the content inside `body` is displayed on the page. Check the browser tab in Live Preview to see your `title`.

## Page Titles

!!! abstract "Instructions"
    **Using VS Code**, create `index.html`, `services.html` and `contact.html` pages for a business called **Green Thumb Gardening**, each with the full document structure.

    Give every page its own title using the pattern `Page Name | Business Name`, for example `Home | Green Thumb Gardening`.

??? question "Hint"
    Build `index.html` first, then copy it twice and rename the copies. The only thing that needs to change in the `head` of each copy is the `title`. Open each page and check the browser tab shows the right title.

## Article Page

!!! abstract "Instructions"
    **Using VS Code**, create a new `article.html` page shaped like a short article.

    Your page must include:

    - one main heading for the article title
    - two section headings
    - a paragraph of text under each section heading

??? question "Hint"
    The main title uses the `h1` element and section headings use `h2`. Paragraphs use `p`. Each element needs its opening and closing tag.

## Emphasised Words

!!! abstract "Instructions"
    **Using VS Code**, extend your article page from the previous exercise.

    This repeats what you practised in Task 2. You must:

    - apply **bold** to one important word in the first paragraph
    - apply _italics_ to one word in the second paragraph

??? question "Hint"
    The tag name for the **bold** element is called `b` and the **italic** element is called `i`. These elements nest inside the paragraph, wrapped around just the single word.

## Section Breaks

!!! abstract "Instructions"
    **Using VS Code**, extend your article page again by adding a visual break between the two sections.

    Add a thematic break element between the end of the first section and the start of the second section heading.

??? question "Hint"
    The thematic break element is called `hr`. It is a self-closing tag, so it does not need a closing tag, just the single tag on its own line.

## Semantic Layout

!!! abstract "Instructions"
    **Using the editor below**, organise the page content into the correct **semantic** layout elements.

    - the business name belongs in a `header`
    - the list of links belongs in a `nav`
    - the welcome and services content belongs in `main`, with each part in its own `section`
    - the copyright line belongs in a `footer`

    The CSS tab colours each area so you can see when it is working.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+R3JlZW4gVGh1bWIgR2FyZGVuaW5nPC9oMT5cblxuPHVsPlxuICA8bGk+PGEgaHJlZj1cImluZGV4Lmh0bWxcIj5Ib21lPC9hPjwvbGk+XG4gIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gIDxsaT48YSBocmVmPVwiY29udGFjdC5odG1sXCI+Q29udGFjdDwvYT48L2xpPlxuPC91bD5cblxuPGgyPldlbGNvbWU8L2gyPlxuPHA+TG9jYWwgZ2FyZGVuZXJzIGtlZXBpbmcgeW91ciB5YXJkIGdyZWVuIGFsbCB5ZWFyIHJvdW5kLjwvcD5cblxuPGgyPldoYXQgV2UgRG88L2gyPlxuPHA+TGF3biBtb3dpbmcsIGhlZGdlIHRyaW1taW5nIGFuZCBnYXJkZW4gZGVzaWduLjwvcD5cblxuPHA+JmNvcHk7IDIwMjYgR3JlZW4gVGh1bWIgR2FyZGVuaW5nPC9wPiJ9XSwgImNzcyI6ICJoZWFkZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU3ZDMyOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDEwcHg7IH1cbm5hdiB7IGJhY2tncm91bmQtY29sb3I6ICNjOGU2Yzk7IHBhZGRpbmc6IDVweCAxMHB4OyB9XG5tYWluIHsgYm9yZGVyOiAycHggZGFzaGVkICMyZTdkMzI7IHBhZGRpbmc6IDEwcHg7IG1hcmdpbjogMTBweCAwOyB9XG5zZWN0aW9uIHsgYmFja2dyb3VuZC1jb2xvcjogI2YxZjhlOTsgbWFyZ2luOiAxMHB4IDA7IHBhZGRpbmc6IDVweCAxMHB4OyB9XG5mb290ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMWI1ZTIwOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDEwcHg7IH0iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    Each semantic element wraps around its content, just like a `div`. There is one `header`, one `nav`, one `main` and one `footer`. The two `section` elements go **inside** `main`.

## Address and Footer

!!! abstract "Instructions"
    **Using the editor below**, finish the page:

    - add a section with the heading `Find Us` and the address below, marked up with the address element and a line break after each line
    - replace `(c)` in the footer with the copyright **symbol**

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bWFpbj5cbiAgPHNlY3Rpb24+XG4gICAgPGgyPldlbGNvbWU8L2gyPlxuICAgIDxwPkxvY2FsIGdhcmRlbmVycyBrZWVwaW5nIHlvdXIgeWFyZCBncmVlbiBhbGwgeWVhciByb3VuZC48L3A+XG4gIDwvc2VjdGlvbj5cblxuICA8IS0tIEFkZCB0aGUgRmluZCBVcyBzZWN0aW9uIGhlcmU6XG4gICAgICAgR3JlZW4gVGh1bWIgR2FyZGVuaW5nXG4gICAgICAgOCBGZXJuIFN0cmVldFxuICAgICAgIFNoZXBwYXJ0b24gVklDIDM2MzAgLS0+XG48L21haW4+XG5cbjxmb290ZXI+XG4gIDxwPihjKSAyMDI2IEdyZWVuIFRodW1iIEdhcmRlbmluZzwvcD5cbjwvZm9vdGVyPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    The element for contact details is called `address`, and line breaks use `br`. The copyright symbol is a **character entity**: it starts with an ampersand, ends with a semicolon, and the word in the middle is short for copyright. See [Special Characters](../resources/page-structure.md#special-characters).

## Full Page Layout

!!! abstract "Instructions"
    **Using VS Code**, open your three Green Thumb Gardening pages from the Page Titles exercise and give **every** page the same layout:

    - a `header` containing the business name
    - a `nav` containing a list of links to all three pages
    - a `main` containing a heading and paragraph for that page
    - a `footer` containing a copyright line using the copyright symbol

    Only the `title` and the content inside `main` should be different on each page.

??? question "Hint"
    Finish the layout on `index.html` first and check it in Live Preview. Then copy the `header`, `nav` and `footer` onto the other two pages, so they are exactly the same everywhere.

## Working from a Template

!!! abstract "Instructions"
    **Using VS Code**, create a new file called `template.html` and paste in the code below. This is a template for a business called **Paws and Claws Pet Grooming**.

    Read every comment, then use the template to create `index.html` and `services.html`, making each change the comments ask for.

??? code "click to expand"
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- EDIT: change the title for each page, e.g. "Services | Paws and Claws" -->
      <title>Page Name | Paws and Claws</title>
    </head>
    <body>

      <!-- HEADER: keep the same on every page -->
      <header>
        <h1>Paws and Claws Pet Grooming</h1>
      </header>

      <!-- NAVIGATION: keep the same on every page -->
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
        </ul>
      </nav>

      <!-- MAIN: EDIT - replace the placeholder with the page content.
           Home page: a heading "Welcome" and a paragraph about the business.
           Services page: a heading "Our Services" and a list of 3 services. -->
      <main>
        <h2>Page Heading</h2>
        <p>Page content goes here.</p>
      </main>

      <!-- FOOTER: keep the same on every page.
           EDIT: use the copyright symbol instead of (c) -->
      <footer>
        <p>(c) 2026 Paws and Claws Pet Grooming</p>
      </footer>

    </body>
    </html>
    ```

??? question "Hint"
    Look for every comment containing the word `EDIT`. Those are the only parts you should change. Once both pages are finished, the comments can stay in the code; they are not shown on the page.
