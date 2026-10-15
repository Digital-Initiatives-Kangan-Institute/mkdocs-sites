# Task 5 - Page Structure

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

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

    This repeats what you practised in Task 1. You must:

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
    **Using VS Code**, organise the page content into the correct **semantic** layout elements.

    - the business name belongs in a `header`
    - the list of links belongs in a `nav`
    - the welcome and services content belongs in `main`, with each part in its own `section`
    - the copyright line belongs in a `footer`

    The starter `style.css` colours each area so you can see when it is working.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h1>Green Thumb Gardening</h1>

    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>

    <h2>Welcome</h2>
    <p>Local gardeners keeping your yard green all year round.</p>

    <h2>What We Do</h2>
    <p>Lawn mowing, hedge trimming and garden design.</p>

    <p>&copy; 2026 Green Thumb Gardening</p>
    ```

    `style.css`

    ```css
    header { background-color: #2e7d32; color: white; padding: 10px; }
    nav { background-color: #c8e6c9; padding: 5px 10px; }
    main { border: 2px dashed #2e7d32; padding: 10px; margin: 10px 0; }
    section { background-color: #f1f8e9; margin: 10px 0; padding: 5px 10px; }
    footer { background-color: #1b5e20; color: white; padding: 10px; }
    ```

??? question "Hint"
    Each semantic element wraps around its content, just like a `div`. There is one `header`, one `nav`, one `main` and one `footer`. The two `section` elements go **inside** `main`.

## Address and Footer

!!! abstract "Instructions"
    **Using VS Code**, finish the page:

    - add a section with the heading `Find Us` and the address below, marked up with the address element and a line break after each line
    - replace `(c)` in the footer with the copyright **symbol**

??? code "click to expand"
    ```html
    <main>
      <section>
        <h2>Welcome</h2>
        <p>Local gardeners keeping your yard green all year round.</p>
      </section>

      <!-- Add the Find Us section here:
           Green Thumb Gardening
           8 Fern Street
           Shepparton VIC 3630 -->
    </main>

    <footer>
      <p>(c) 2026 Green Thumb Gardening</p>
    </footer>
    ```

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
