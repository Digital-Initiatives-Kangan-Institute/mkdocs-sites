# Task 6 - Links and Navigation

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

## External Links

!!! abstract "Instructions"
    **Using VS Code**, create a new `index.html` page that links out to an external website.

    This repeats what you practised in Task 4. Your page must include:

    - a paragraph introducing your favourite website
    - a link to that website using its full address (starting with `https://`)

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for the destination is `href`. Remember elements need an opening and closing tag, with the clickable text in between.

## Internal Links

!!! abstract "Instructions"
    **Using VS Code**, create `index.html` and `about.html` pages that link to each other.

    This repeats what you practised in Task 4. Each page must include:

    - a paragraph saying which page you are on
    - a link that takes the user to the other page

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for the destination is `href`. For pages in the same folder, the attribute value is just the file name of the other page.

## Links Inside Text

!!! abstract "Instructions"
    **Using VS Code**, turn the words `browse our services` into a link to `services.html`, so the link sits inside the sentence.

    Then click it in Live Preview to check it works.

??? code "click to expand"
    `index.html`

    ```html
    <h1>Welcome</h1>
    <p>New to Paws and Claws? Take a moment to browse our services before you book.</p>
    ```

    `services.html`

    ```html
    <h1>Our Services</h1>
    <p>Washing, clipping and nail trimming.</p>
    ```

??? question "Hint"
    The `a` element can be nested inside a `p`, just like `b` or `strong`. Only the words that should be clickable go between the opening and closing link tags.

## Descriptive Link Text

!!! abstract "Instructions"
    **Using VS Code**, rewrite each `click here` link so that the link text describes where the link goes.

??? code "click to expand"
    ```html
    <p>To see our prices, <a href="prices.html">click here</a>.</p>
    <p>For our opening hours, <a href="hours.html">click here</a>.</p>
    <p>To send us a message, <a href="contact.html">click here</a>.</p>
    ```

??? question "Hint"
    Imagine the links are read out on their own, without the rest of the sentence. Would someone know where each one goes? Move the link so it wraps the words that describe the destination.

## Email Links

!!! abstract "Instructions"
    **Using VS Code**, add a link that opens the visitor's email program to send an email to `hello@pawsandclaws.example`.

??? code "click to expand"
    ```html
    <h2>Contact Us</h2>
    <p>Send us an email:</p>
    ```

??? question "Hint"
    Email links use the `a` element like any other link. The `href` value starts with `mailto:` followed by the email address, with no space in between.

## Navigation Menu

!!! abstract "Instructions"
    **Using VS Code**, create `index.html`, `about.html`, and `contact.html` pages. Add the same navigation menu to all three pages so the user can reach every page from every page.

    This combines the lists from Task 2 with the links from Task 4. Each page must include:

    - a `nav` element containing a list with `3` items, one for each page
    - a link inside each list item pointing to that page
    - a paragraph saying which page you are on

??? question "Hint"
    The tag name for the **unordered list** element is called `ul`, **list items** are `li`, and **links** are `a`. Think about which element sits inside which: the `nav` wraps the list, and each list item wraps around its link.

## Four-Page Navigation

!!! abstract "Instructions"
    **Using VS Code**, add a navigation menu to **all four** pages so that every page links to every other page. Create all four pages from the starter code in the same folder.

    Test every link on every page by clicking it in Live Preview.

??? code "click to expand"
    `index.html`

    ```html
    <h1>Home</h1>
    ```

    `services.html`

    ```html
    <h1>Services</h1>
    ```

    `about.html`

    ```html
    <h1>About Us</h1>
    ```

    `contact.html`

    ```html
    <h1>Contact</h1>
    ```

??? question "Hint"
    This repeats the Navigation Menu exercise with one more page. Write the navigation once on the Home page, check every link works, then copy the whole `nav` onto the other three pages. A four-page site has sixteen links to test in total.

## Highlight the Current Page

!!! abstract "Instructions"
    **Using VS Code**, add the class `active` to the correct link on **each** page so the current page is highlighted in the navigation. The CSS is already written in `style.css`.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <h1>Home</h1>
    ```

    `services.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <h1>Services</h1>
    ```

    `contact.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <h1>Contact</h1>
    ```

    `style.css`

    ```css
    nav ul { list-style: none; display: flex; gap: 8px; padding: 0; }
    nav a { padding: 8px 14px; text-decoration: none; border: 1px solid teal; }
    nav a.active { background-color: teal; color: white; }
    ```

??? question "Hint"
    Each page gets the class on a **different** link: the one that points to the page you are on. The class attribute goes in the opening tag of the `a` element.

## Image Links

!!! abstract "Instructions"
    **Using VS Code**, create a new `index.html` page containing an image that acts as a link.

    This combines the images from Task 4 with links. Your page must include:

    - an image using `https://cyberbilby.com/capybara.jpg` as the image source with `Capybara` as the alt text
    - the image wrapped so that clicking it takes the user to `https://w3.org/`

??? question "Hint"
    One element needs to wrap around the other here. Ask yourself which element is the clickable one, and which element is the content being clicked. Remember the image uses `src` and `alt`, while the link uses `href`.

## Logo Link

!!! abstract "Instructions"
    **Using VS Code**, add a logo to the `header` of **both** pages, using `https://cyberbilby.com/capybara.jpg` at `80` pixels wide. Clicking the logo on either page must take the visitor to the **Home** page.

    Give the logo alt text that suits a business called **Capybara Tours**.

??? code "click to expand"
    `index.html`

    ```html
    <header>
      <!-- logo goes here -->
    </header>
    <h1>Home</h1>
    <p><a href="tours.html">See our tours</a></p>
    ```

    `tours.html`

    ```html
    <header>
      <!-- logo goes here -->
    </header>
    <h1>Our Tours</h1>
    <p>Click the logo to go back to the Home page.</p>
    ```

??? question "Hint"
    This repeats the Image Links exercise, but the link goes to a page on the same site instead of an external website. Think about which file name is always the home page.

## Mini Website

!!! abstract "Instructions"
    **Using VS Code**, build a small three-page website using everything you have learned so far.

    Create `index.html`, `about.html`, and `contact.html` pages, each with the full document structure and its own `title`. Every page must include:

    - a `header` with a logo image that links to the home page
    - the same navigation menu, with the current page given the class `active`
    - a paragraph with a sentence about the site, including one **bold** word
    - a `footer` with a copyright line

    On the home page only, add a sentence containing a link to the `about.html` page.

??? question "Hint"
    Work through each page one at a time. Start by getting the header and navigation working on all three pages, then add the content, then the footer. If something does not display correctly, check that every element has its opening and closing tag and every attribute is spelled correctly. Click every link on every page before you finish.
