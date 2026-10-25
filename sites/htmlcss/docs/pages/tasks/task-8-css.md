# Task 8 - Styling with CSS

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

## Text Colour

!!! abstract "Instructions"
    **Using VS Code**, write a rule in `style.css` that makes every `h1` heading `darkgreen`.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h1>Green Thumb Gardening</h1>
    <p>Local gardeners keeping your yard green all year round.</p>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    A CSS rule starts with a selector, which for headings is the tag name. The property that changes text colour is called `color`. Remember the curly braces, the colon and the semicolon.

## Background Colour

!!! abstract "Instructions"
    **Using VS Code**, give the whole page (`body`) a light background colour of `#f1f8e9`, and give every paragraph the text colour `#333333`.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h1>Green Thumb Gardening</h1>
    <p>Lawn mowing, hedge trimming and garden design.</p>
    <p>Serving the local area since 2010.</p>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    This needs **two** rules, one for each selector. The background property is called `background-color`. Hex colour values start with a `#`.

## Fonts

!!! abstract "Instructions"
    **Using VS Code**, style the text so that:

    - headings use the font `Arial`, with `Helvetica` and `sans-serif` as backups
    - paragraphs use the font `Georgia`, with `serif` as a backup
    - paragraphs are `18px` in size with a line height of `1.6`
    - the `h1` is centred

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h1>Riverside Bike Repairs</h1>
    <h2>Our Services</h2>
    <p>We fix flat tyres, brakes, gears and chains for all types of bikes.</p>
    <h2>Contact Us</h2>
    <p>Visit our workshop or give us a call to book a service.</p>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Use `font-family`, `font-size`, `line-height` and `text-align`. A list of fonts is separated with commas. You can style both heading levels in one rule by grouping the selectors with a comma.

## Link the Stylesheet

!!! abstract "Instructions"
    **Using VS Code**, create the three pages of the Capybara Tours Mini Website from the starter code, all in the same folder. Then add an external stylesheet.

    - create a `style.css` file in the same folder as your pages
    - link it in the `head` of **every** page
    - add rules to `style.css` to change the background colour of the page and the colour of the headings

    Open each page in Live Preview to check the styles apply everywhere. Keep this folder, because you will style the whole site at the end of this task.

??? code "click to expand"
    `index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Home | Capybara Tours</title>
    </head>
    <body>
      <header>
        <a href="index.html"><img src="https://cyberbilby.com/capybara.jpg" alt="Capybara Tours logo" width="80"></a>
      </header>
      <nav>
        <ul>
          <li><a href="index.html" class="active">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <main>
        <h1>Welcome to Capybara Tours</h1>
        <p>Meet the <b>friendliest</b> animals in the wetlands.</p>
        <img src="https://cyberbilby.com/capybara.jpg" alt="A capybara relaxing by the water">
        <p>New here? <a href="about.html">Find out about our tours</a>.</p>
      </main>
      <footer>
        <p>&copy; 2026 Capybara Tours</p>
      </footer>
    </body>
    </html>
    ```

    `about.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>About Us | Capybara Tours</title>
    </head>
    <body>
      <header>
        <a href="index.html"><img src="https://cyberbilby.com/capybara.jpg" alt="Capybara Tours logo" width="80"></a>
      </header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html" class="active">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <main>
        <h1>About Us</h1>
        <p>Our guides have been running <b>small</b> group tours since 2015.</p>
      </main>
      <footer>
        <p>&copy; 2026 Capybara Tours</p>
      </footer>
    </body>
    </html>
    ```

    `contact.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Contact | Capybara Tours</title>
    </head>
    <body>
      <header>
        <a href="index.html"><img src="https://cyberbilby.com/capybara.jpg" alt="Capybara Tours logo" width="80"></a>
      </header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html" class="active">Contact</a></li>
        </ul>
      </nav>
      <main>
        <h1>Contact</h1>
        <p>Call us to <b>book</b> your tour today.</p>
      </main>
      <footer>
        <p>&copy; 2026 Capybara Tours</p>
      </footer>
    </body>
    </html>
    ```

??? question "Hint"
    The `link` element goes inside the `head`, and needs a `rel` attribute saying it is a stylesheet and an `href` with the file name. If one page is not styled, compare its `head` with a page that works.

## Class Selectors

!!! abstract "Instructions"
    **Using VS Code**, write CSS so that:

    - every element with the class `price` is bold and the colour `#2e7d32`
    - every element with the class `product` has a `1px` solid grey border and `10px` of padding

    The classes are already in the HTML.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <div class="product">
      <h3>Lawn Mowing</h3>
      <p class="price">$45.00</p>
    </div>
    <div class="product">
      <h3>Hedge Trimming</h3>
      <p class="price">$60.00</p>
    </div>
    <div class="product">
      <h3>Garden Design</h3>
      <p class="price">$150.00</p>
    </div>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Class selectors start with a dot, followed by the class name. The `border` shorthand takes a width, a style and a colour. Bold text uses `font-weight`.

## Add Classes and Style Them

!!! abstract "Instructions"
    **Using VS Code**, repeat the previous exercise, but this time **you** add the classes too.

    - add a class of `staff` to each team member's container, and a class of `role` to each job title
    - style `.staff` with a background colour, padding and a margin below each one
    - style `.role` in italics

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h2>Meet the Team</h2>
    <div>
      <h3>Priya</h3>
      <p>Head Groomer</p>
      <p>Priya has been grooming dogs for over ten years.</p>
    </div>
    <div>
      <h3>Tom</h3>
      <p>Grooming Assistant</p>
      <p>Tom loves making every pet look their best.</p>
    </div>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Add the `class` attributes in `index.html` first, without a dot. Then write the rules in `style.css`, with a dot. Italic text uses `font-style`, and the space below a box is `margin-bottom`.

## Padding, Border and Margin

!!! abstract "Instructions"
    **Using VS Code**, style the `.card` box so that it has:

    - `20px` of space **inside** the border
    - a `2px` solid border in any colour
    - `30px` of space **outside** the border
    - rounded corners

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <div class="card">
      <h3>Full Bike Service</h3>
      <p>Brakes, gears, chain and tyres all checked and adjusted.</p>
    </div>
    <div class="card">
      <h3>Puncture Repair</h3>
      <p>Fixed while you wait.</p>
    </div>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Space inside the border is `padding`, and space outside is `margin`. Rounded corners use `border-radius`. Try changing each value to see which space it controls.

## CSS Variables

!!! abstract "Instructions"
    **Using VS Code**, use the CSS variables already stored in `style.css` so that:

    - the `header` and `footer` backgrounds use `--main-colour`
    - the `nav` background uses `--accent-colour`
    - the text in the header and footer uses `--light-text`

    Then change the value of `--main-colour` once, and watch both the header and footer update.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <header><h1>Paws and Claws</h1></header>
    <nav><p>Home | Services | Contact</p></nav>
    <main><p>Professional pet grooming.</p></main>
    <footer><p>&copy; 2026 Paws and Claws</p></footer>
    ```

    `style.css`

    ```css
    :root {
      --main-colour: #5e35b1;
      --accent-colour: #d1c4e9;
      --light-text: #ffffff;
    }

    /* Write your CSS below */
    ```

??? question "Hint"
    A variable is used as a value with the `var()` function, with the variable name inside the brackets. Both `header` and `footer` can share one rule by grouping the selectors.

## Navigation Bar

!!! abstract "Instructions"
    **Using VS Code**, turn the navigation list into a horizontal navigation bar:

    - remove the bullet points and the list's default padding
    - place the links in a row, centred
    - give the links padding, remove their underline, and make them white on a dark background
    - change the link background colour when hovered **or** focused
    - give the `active` link a different background colour

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <nav>
      <ul>
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Style the list with `list-style`, `display: flex` and `justify-content`. Style the links using the descendant selector `nav a`, with `display: block`, `padding`, `color` and `text-decoration`. Hover and focus use the pseudo-classes `:hover` and `:focus`, grouped with a comma. The active link can be selected with the element name and class together.

## Style a Table

!!! abstract "Instructions"
    **Using VS Code**, style the opening hours table so that:

    - the cell borders join into single lines
    - every cell has a `1px` border and padding
    - the heading cells have a dark background with white text
    - the text in every cell is left aligned

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <table class="hours">
      <thead>
        <tr><th>Day</th><th>Hours</th></tr>
      </thead>
      <tbody>
        <tr><td>Monday - Friday</td><td>8:00am - 5:30pm</td></tr>
        <tr><td>Saturday</td><td>9:00am - 1:00pm</td></tr>
        <tr><td>Sunday</td><td>Closed</td></tr>
      </tbody>
    </table>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    `border-collapse` goes on the table itself. Both `th` and `td` need the border and padding, so group them. Then write a separate rule just for `th`.

## Style a Form

!!! abstract "Instructions"
    **Using VS Code**, style the contact form so that:

    - the form is no wider than `450px`
    - each label sits on its own line above its field, in bold, with space above it
    - the inputs and textarea fill the width of the form and have padding
    - the button has a background colour, white text, padding and no border
    - the button changes colour when hovered or focused

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <form class="contact-form" action="#">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">

      <label for="email">Email</label>
      <input type="email" id="email" name="email">

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5"></textarea>

      <button type="submit">Send Message</button>
    </form>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Use descendant selectors starting with `.contact-form`. Labels need `display: block` to go on their own line. For the fields, `width: 100%` together with `box-sizing: border-box` stops the padding making them overflow.

## Card Layout

!!! abstract "Instructions"
    **Using VS Code**, lay out the services as a grid of cards:

    - the `.services` container becomes a grid with columns at least `200px` wide that wrap onto new rows
    - there is a gap between the cards
    - each `.service` card has a border, padding and centred text
    - images never overflow their card
    - the `.price` is bold

    Resize the Live Preview panel to check the cards wrap.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <div class="services">
      <div class="service">
        <img src="https://cyberbilby.com/capybara.jpg" alt="Capybara being brushed">
        <h3>Brush and Fluff</h3>
        <p>A full brush-out to remove loose fur.</p>
        <p class="price">$30.00</p>
      </div>
      <div class="service">
        <img src="https://cyberbilby.com/capybara.jpg" alt="Capybara after a bath">
        <h3>Wash and Dry</h3>
        <p>A gentle wash with pet-safe shampoo.</p>
        <p class="price">$45.00</p>
      </div>
      <div class="service">
        <img src="https://cyberbilby.com/capybara.jpg" alt="Capybara having its nails trimmed">
        <h3>Nail Trim</h3>
        <p>Quick and stress-free nail care.</p>
        <p class="price">$15.00</p>
      </div>
    </div>
    ```

    `style.css`

    ```css
    /* Write your CSS below */
    ```

??? question "Hint"
    Use `display: grid` with `grid-template-columns` and the `repeat`, `auto-fit` and `minmax` functions shown in the [Grid](../resources/css.md#grid) section of the resource, plus `gap`. For the images, use `max-width` inside the card.

## Style the Mini Website

!!! abstract "Instructions"
    **Using VS Code**, open the `style.css` file of the Capybara Tours Mini Website from the **Link the Stylesheet** exercise and style the whole site:

    - store your colours in CSS variables at the top of the file
    - style the `header` and `footer` with a background colour and padding
    - turn the navigation into a horizontal bar, with hover, focus and active styles
    - limit the width of the `main` area and centre it on the page
    - make sure images can never overflow the page

    Every page should look the same apart from its content.

??? question "Hint"
    This repeats everything in this task on a real multi-page site. To centre a box, give it a `max-width` and set its left and right margins to `auto`. Check each page in Live Preview after every change, and check that text has strong contrast against its background.
