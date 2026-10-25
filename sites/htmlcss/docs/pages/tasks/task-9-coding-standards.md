# Task 9 - Coding Standards

In this task you will find and fix code that does not follow the [coding standards](../resources/coding-standards.md). Each standard is practised on its own first, then all together. Work through the exercises in order.

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

## Fix the Indentation

!!! abstract "Instructions"
    **Using VS Code**, paste the starter code into `index.html`. The code has no indentation at all. Indent every child element **two spaces** further than its parent.

    The page should look exactly the same in Live Preview when you are finished. Only the code changes.

??? code "click to expand"
    ```html
    <nav>
    <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="plants.html">Plants</a></li>
    <li><a href="contact.html">Contact</a></li>
    </ul>
    </nav>
    <main>
    <section>
    <h1>Green Leaf Nursery</h1>
    <p>Indoor plants, outdoor plants and garden advice.</p>
    <ul>
    <li>Open 7 days</li>
    <li>Free local delivery</li>
    </ul>
    </section>
    </main>
    ```

??? question "Hint"
    Work from the outside in. Every time you go **inside** another element, move two spaces further to the right. When you come back out, move back two spaces, so each closing tag lines up with its own opening tag.

    For example, this `ol` list sits inside a `section`, so the `ol` moves in two spaces, and each `li` inside the `ol` moves in two more:

    ```html
    <section>
      <ol>
        <li>Wash</li>
        <li>Rinse</li>
      </ol>
    </section>
    ```

    Elements that sit **side by side**, like the two `li` elements, have the **same** indentation as each other.

## Indentation in VS Code

!!! abstract "Instructions"
    **Using VS Code**, create two files called `hours.html` and `hours-auto.html`, and paste the code below into both of them.

    - In `hours.html`, fix the indentation **by hand**
    - In `hours-auto.html`, let **VS Code** fix the indentation for you

    Compare the two files. Did you and VS Code indent the code the same way?

??? code "click to expand"
    ```html
    <header>
    <h1>Harbour Books</h1>
    </header>
    <main>
    <section>
    <h2>Opening Hours</h2>
    <table>
    <tr>
    <th>Day</th>
    <th>Hours</th>
    </tr>
    <tr>
    <td>Monday to Friday</td>
    <td>9:00am - 5:00pm</td>
    </tr>
    </table>
    </section>
    </main>
    ```

??? question "Hint"
    Right-click inside the file and choose **Format Document**, or press `Shift + Alt + F`. If VS Code asks which formatter to use, choose the one it suggests.

    When you indent by hand, remember that a table has more levels of nesting than a list: the `tr` goes inside the `table`, and the `th` and `td` cells go inside the `tr`. Each level moves in another two spaces. For example, a table with one row and one cell looks like this:

    ```html
    <table>
      <tr>
        <td>Saturday</td>
      </tr>
    </table>
    ```

    Take the table in the exercise one row at a time.

## Lowercase Tags

!!! abstract "Instructions"
    **Using VS Code**, rewrite the code so that every **tag name**, **attribute name** and **class name** follows the coding standards.

    Do not change the text shown on the page. When the class name is fixed, the opening hours will turn blue, because `style.css` is already written for the correct class name.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <H1>Harbour Books</H1>
    <P>Second-hand books, bought and sold.</P>
    <IMG SRC="https://cyberbilby.com/capybara.jpg" ALT="Harbour Books shop front" WIDTH="200">
    <UL CLASS="OpeningHours">
      <LI>Monday to Friday: 9:00am - 5:00pm</LI>
      <LI>Saturday: 10:00am - 2:00pm</LI>
    </UL>
    <P><A HREF="contact.html">Contact us</A> to sell your books.</P>
    ```

    `style.css`

    ```css
    .opening-hours {
      color: #1e5f74;
    }
    ```

??? question "Hint"
    Three things need to change, and two things must stay the same.

    **Change to lowercase:**

    - **Tag names**, for example `<TITLE>` becomes `<title>`
    - **Attribute names**, for example `TARGET="_blank"` becomes `target="_blank"`
    - **Class names**, which follow the same rules as file names: lowercase, with a hyphen between words. For example, `class="PriceList"` becomes `class="price-list"`

    **Leave exactly as they are:**

    - The **text** between the tags. `<H2>About Us</H2>` becomes `<h2>About Us</h2>`, **not** `<h2>about us</h2>`
    - Attribute **values** such as `alt` text and web addresses

    Check `style.css` to confirm what the class name should be.

## Close the Tags

!!! abstract "Instructions"
    **Using VS Code**, find and fix the **four** problems with closing tags in the starter code.

??? code "click to expand"
    ```html
    <h1>Sunset Surf School</h1>
    <p>Learn to surf with qualified instructors.
    <p>Lessons run <strong>every weekend</p></strong>
    <ul>
      <li>Beginner lessons
      <li>Private lessons</li>
    </ul>
    <p>Book now at the <em>beach hut</p>
    ```

??? question "Hint"
    Go through the code one opening tag at a time and find its closing tag. There are two kinds of mistakes to look for.

    **A missing closing tag.** In the example below the `h2` is never closed, so the browser does not know where the heading ends:

    ```html
    <h2>Our Team
    <p>Meet the staff.</p>
    ```

    **Tags closed in the wrong order.** Think of elements as boxes inside boxes: you have to close the **inside** box before the **outside** box.

    ```html
    <p>Call <em>today</p></em>   <!-- wrong: the p is closed before the em inside it -->
    <p>Call <em>today</em></p>   <!-- right: the em is closed first -->
    ```

    Empty elements such as `<br>` and `<img>` never have a closing tag, so do not count those.

## Replace the Divs

!!! abstract "Instructions"
    **Using VS Code**, replace the `div` elements with the correct **semantic elements**.

    - **One** `div` should stay a `div`. Work out which one, and why.
    - Once the `div` elements are replaced, update the selectors in `style.css` so the page looks the same as it did before.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <div class="header">
      <h1>Harbour Books</h1>
    </div>

    <div class="nav">
      <a href="index.html">Home</a>
      <a href="books.html">Books</a>
      <a href="contact.html">Contact</a>
    </div>

    <div class="main">
      <h2>New Arrivals</h2>
      <div class="book-card">
        <h3>The River Road</h3>
        <p>$8.00</p>
      </div>
    </div>

    <div class="footer">
      <p>&copy; 2026 Harbour Books</p>
    </div>
    ```

    `style.css`

    ```css
    .header {
      background-color: #1e5f74;
      color: white;
      padding: 10px 20px;
    }

    .nav {
      background-color: #fcdab7;
      padding: 5px 20px;
    }

    .main {
      padding: 0 20px;
    }

    .book-card {
      border: 1px solid #cccccc;
      padding: 10px;
      width: 200px;
    }

    .footer {
      background-color: #1e5f74;
      color: white;
      padding: 10px 20px;
    }
    ```

??? question "Hint"
    For each `div`, look at what is inside it and ask: **what is this area of the page for?** Then choose the semantic element whose name describes it:

    | The area holds... | Use |
    |---|---|
    | The logo and site name at the top | `header` |
    | The main navigation links | `nav` |
    | The main content of the page | `main` |
    | Copyright and contact details at the bottom | `footer` |

    For example, a `div` at the bottom of a page holding a phone number becomes a `footer`:

    ```html
    <!-- Before -->
    <div class="bottom">
      <p>Phone 03 9000 1234</p>
    </div>

    <!-- After -->
    <footer>
      <p>Phone 03 9000 1234</p>
    </footer>
    ```

    Keep a `div` when the content is just a **group** with no matching semantic element, such as a box around one product or one staff member.

    Once the class is gone, a CSS rule such as `.bottom` no longer matches anything. Select the element by its **name** instead, with no full stop in front: `footer { ... }`.

## Move the Styles

!!! abstract "Instructions"
    **Using VS Code**, move every style into a new `style.css` file linked to the page, and remove all the `style` attributes from the HTML.

    - The page must look exactly the same when you are finished
    - Paragraphs that share the same styles should share **one** class

??? code "click to expand"
    ```html
    <h1 style="color: darkgreen; text-align: center">Green Leaf Nursery</h1>
    <p style="color: #333333; font-size: 18px">Plants for every home and garden.</p>
    <p style="color: #333333; font-size: 18px">Visit us seven days a week.</p>
    <p style="color: white; background-color: darkgreen; padding: 10px">Spring sale now on!</p>
    ```

??? question "Hint"
    Moving a style takes three steps:

    1. Give the element a `class` that describes **what it is**
    2. Create a rule for that class in `style.css` and move the styles into it
    3. Delete the `style` attribute from the HTML

    For example:

    ```html
    <!-- Before -->
    <p style="color: grey; font-style: italic">Prices include GST.</p>

    <!-- After -->
    <p class="note">Prices include GST.</p>
    ```

    ```css
    .note {
      color: grey;
      font-style: italic;
    }
    ```

    The styles themselves do not change, they just move. Put each one on its own line and end each line with a semicolon.

    - There is only one heading, so it can use an **element selector** (such as `h1`) instead of a class
    - Two of the paragraphs have **identical** styles, so give them the **same** class
    - Name classes for their **purpose**, such as `note` or `warning`, not their look, such as `grey-text`

## Replace the Obsolete Tags

!!! abstract "Instructions"
    **Using VS Code**, find the **six** obsolete tags and attributes in the starter page. Replace every one of them with CSS in a new `style.css` file (or with the correct modern HTML element), so the page looks the same without them.

??? code "click to expand"
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Home | Sunset Surf School</title>
    </head>
    <body bgcolor="#fff8e1">
      <center><h1>Sunset Surf School</h1></center>
      <p><font color="navy">Surf lessons for all ages</font></p>
      <p align="center">Lessons every Saturday and Sunday.</p>
      <p><strike>$60 per lesson</strike> Now $50 per lesson</p>
      <p><big>Book today!</big></p>
    </body>
    </html>
    ```

??? question "Hint"
    Work through them one at a time. For each obsolete tag or attribute:

    1. Work out what it did to the **look** of the page
    2. Find the CSS property that does the same job in the obsolete tags table on the [Coding Standards](../resources/coding-standards.md#obsolete-tags-and-attributes) page
    3. Remove the obsolete code and add a CSS rule instead

    For example, `bgcolor` on a table sets its background colour. It is replaced by the CSS `background-color` property:

    ```html
    <!-- Before -->
    <table bgcolor="#eeeeee">

    <!-- After -->
    <table>
    ```

    ```css
    table {
      background-color: #eeeeee;
    }
    ```

    When an obsolete **tag** wraps around content, such as `<center>...</center>`, delete both the opening and closing tags but **keep the content**, then style the element that is left behind.

    The crossed-out price is different: it has a **meaning**, not just a look. It is content that has been removed, and HTML has the `del` element for that. For example: `<p>Meeting on <del>Monday</del> Tuesday</p>`.

## Add Comments

!!! abstract "Instructions"
    **Using VS Code**, add comments to the code so another developer could find their way around it quickly.

    - Add a comment above each **main area** of the page
    - Add one comment that explains what the logo does
    - Do not comment every line

??? code "click to expand"
    ```html
    <header>
      <a href="index.html">
        <img src="https://cyberbilby.com/capybara.jpg" alt="Green Leaf Nursery home" width="80">
      </a>
    </header>

    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="plants.html">Plants</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>

    <main>
      <section>
        <h1>Welcome to Green Leaf Nursery</h1>
        <p>Indoor plants, outdoor plants and garden advice.</p>
      </section>

      <section>
        <h2>Find Us</h2>
        <address>
          8 Fern Street<br>
          Greenvale VIC 3999
        </address>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Green Leaf Nursery</p>
    </footer>
    ```

??? question "Hint"
    Comments start with `<!--` and end with `-->`, and go on the line **above** the code they describe. A good comment says what an area is for in a few words. It should not just repeat the code.

    | Helpful comment | Not helpful |
    |---|---|
    | `<!-- Staff photos and short descriptions -->` | `<!-- div -->` |
    | `<!-- Booking form, sent to the front desk -->` | `<!-- form starts here -->` |

    For the logo, explain what happens when a visitor **clicks** it.

    Live Preview should not change at all, because comments are never displayed.

## Name the Standard

!!! abstract "Instructions"
    **Using VS Code**, paste the snippets below into a new `index.html` file and fix each one so it follows the coding standards.

    Some snippets break **more than one** standard.

```html
<!-- 1 -->
<div class="menu"><a href="index.html">Home</a></div>

<!-- 2 -->
<P>Welcome to our shop!</P>

<!-- 3 -->
<p style="color: red">Call us today</p>

<!-- 4 -->
<center>Open 7 days</center>

<!-- 5 -->
<p>Now <em>open</p></em>

<!-- 6 -->
<ul>
<li>Coffee</li>
<li>Tea</li>
</ul>

<!-- 7 -->
<a HREF="About Us.html">About</a>
```

??? question "Hint"
    Ask these questions about each snippet:

    - Is the code indented?
    - Are the tag names and attribute names lowercase?
    - Is every tag closed, and closed in the right order?
    - Is a `div` being used where a semantic element belongs?
    - Is there a `style` attribute?
    - Is it an obsolete tag or attribute?
    - Do any file names in links break the file naming rules?

    For example, `<b>Sale <i>now</b></i>` breaks the **Closing tags** standard, and is fixed by closing the `i` before the `b`: `<b>Sale <i>now</i></b>`.

## Spot the Bugs

!!! abstract "Instructions"
    **Using VS Code**, fix the starter page below. It breaks the coding standards in **at least ten** places. Find and fix as many as you can.

??? code "click to expand"
    ```html
    <DIV class="top">
    <CENTER><img src="https://cyberbilby.com/capybara.jpg" alt="Mountain View Motel logo" width="80"></CENTER>
    <H1>Mountain View Motel</H1>
    </DIV>
    <div class="menu">
    <a href="index.html">Home</a>
    <a href="Our Rooms.html">Rooms</a>
    <a href="contact.html">Contact</a>
    </div>
    <p style="font-size: 20px">Quiet rooms with views of the ranges.
    <p>Check-in from <strong>2:00pm</p></strong>
    <font color="green">Free parking for guests</font>
    ```

??? question "Hint"
    Rather than reading the code once from top to bottom, go through it **several times**, looking for one standard each time:

    1. Indentation
    2. Lowercase tags and attributes
    3. Closing tags
    4. Semantic elements
    5. Comments
    6. Styling in CSS
    7. Obsolete tags and attributes
    8. File names in links

    Check the link addresses too. A file name with spaces or capital letters, such as `href="Price List.html"`, breaks the naming rules and should be `price-list.html`. Remember to rename the file to match as well, or the link will break.

## Spot the Bugs Again

!!! abstract "Instructions"
    **Using VS Code**, fix the two-page website below. Both pages break the coding standards. This time you are not told how many problems there are.

    Fix every problem on both pages, and make sure the two pages are **consistent** with each other.

??? code "click to expand"
    `index.html`

    ```html
    <header>
    <h1>Tidal Aquarium</h1>
    </header>
    <div>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    </div>
    <main>
    <h2>Welcome</h2>
    <p>Meet the sea creatures of the southern coast.
    <p align="center">Open daily from 9:00am.</p>
    </main>
    ```

    `about.html`

    ```html
    <HEADER>
    <h1>Tidal Aquarium</h1>
    </HEADER>
    <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    </nav>
    <main>
    <h2 style="color: teal">About Us</h2>
    <p>Tidal Aquarium first opened in <em>1998</p></em>
    </main>
    ```

??? question "Hint"
    Create both pages in the same folder and open each one in its own VS Code tab. Work in two steps:

    1. Fix each page on its own, using the checklist from **Spot the Bugs**
    2. Then compare the two pages side by side

    Areas that appear on every page, such as the header, navigation and footer, should be marked up **the same way** on every page. For example, if one page uses `<footer>` and another uses `<div class="footer">` for the same area, the `div` is the one to fix.

## Write It Right

!!! abstract "Instructions"
    **Using VS Code**, build a new home page for a local library called **Northside Library**, following **every** coding standard from the start.

    Your page must include:

    - a header with the library's name
    - a navigation bar with links to `index.html`, `books.html` and `contact.html`
    - a main area with a welcome section and an opening hours section
    - a footer with a copyright line
    - comments labelling each main area
    - all styling in a linked `style.css` file


??? question "Hint"
    It is much easier to follow the standards while you write than to fix the code afterwards. A good order to work in is:

    1. Create the project folder with `index.html` and `style.css`
    2. Write the page structure first, including the `title` and the `link` to `style.css` in the `head`
    3. Add the four empty semantic areas (`header`, `nav`, `main` and `footer`), each with a comment above it, for example:

        ```html
        <!-- Main navigation -->
        <nav>
        </nav>
        ```

    4. Fill in each area one at a time, indenting as you go. When you press `Enter` between an opening and closing tag, VS Code indents the new line for you.
    5. Put every style in `style.css`, never in a `style` attribute
    6. Finish with **Format Document**, then check the page against every section of the [Coding Standards](../resources/coding-standards.md) page

## Review Your Library Page

!!! abstract "Instructions"
    **Using VS Code**, review your Northside Library `index.html` and `style.css` from the **Write It Right** exercise against **every** coding standard, and fix every problem you find.

??? question "Hint"
    Use the same checklist as **Spot the Bugs**, one file at a time.

    VS Code can help you find some problems quickly. Press `Ctrl + Shift + F` to search **every file** in your project, and search for:

    - `style=` to find inline styles
    - `<div` to check each `div` should really be a `div`
    - `<font`, `<center` and `bgcolor` to find obsolete code

