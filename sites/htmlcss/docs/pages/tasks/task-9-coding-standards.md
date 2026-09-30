# Task 9 - Coding Standards

In this task you will find and fix code that does not follow the [coding standards](../resources/coding-standards.md). Each standard is practised on its own first, then all together. Work through the exercises in order.

## Fix the Indentation

!!! abstract "Instructions"
    **Using the editor below**, the code has no indentation at all. Indent every child element **two spaces** further than its parent.

    The page should look exactly the same in the preview when you are finished. Only the code changes.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuPHVsPlxuPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuPGxpPjxhIGhyZWY9XCJwbGFudHMuaHRtbFwiPlBsYW50czwvYT48L2xpPlxuPGxpPjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPjwvbGk+XG48L3VsPlxuPC9uYXY+XG48bWFpbj5cbjxzZWN0aW9uPlxuPGgxPkdyZWVuIExlYWYgTnVyc2VyeTwvaDE+XG48cD5JbmRvb3IgcGxhbnRzLCBvdXRkb29yIHBsYW50cyBhbmQgZ2FyZGVuIGFkdmljZS48L3A+XG48dWw+XG48bGk+T3BlbiA3IGRheXM8L2xpPlxuPGxpPkZyZWUgbG9jYWwgZGVsaXZlcnk8L2xpPlxuPC91bD5cbjwvc2VjdGlvbj5cbjwvbWFpbj4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
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
    **Using the editor below**, rewrite the code so that every **tag name**, **attribute name** and **class name** follows the coding standards.

    Do not change the text shown on the page. When the class name is fixed, the opening hours will turn blue, because the CSS tab is already written for the correct class name.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8SDE+SGFyYm91ciBCb29rczwvSDE+XG48UD5TZWNvbmQtaGFuZCBib29rcywgYm91Z2h0IGFuZCBzb2xkLjwvUD5cbjxJTUcgU1JDPVwiaHR0cHM6Ly9jeWJlcmJpbGJ5LmNvbS9jYXB5YmFyYS5qcGdcIiBBTFQ9XCJIYXJib3VyIEJvb2tzIHNob3AgZnJvbnRcIiBXSURUSD1cIjIwMFwiPlxuPFVMIENMQVNTPVwiT3BlbmluZ0hvdXJzXCI+XG4gIDxMST5Nb25kYXkgdG8gRnJpZGF5OiA5OjAwYW0gLSA1OjAwcG08L0xJPlxuICA8TEk+U2F0dXJkYXk6IDEwOjAwYW0gLSAyOjAwcG08L0xJPlxuPC9VTD5cbjxQPjxBIEhSRUY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0IHVzPC9BPiB0byBzZWxsIHlvdXIgYm9va3MuPC9QPiJ9XSwgImNzcyI6ICIub3BlbmluZy1ob3VycyB7XG4gIGNvbG9yOiAjMWU1Zjc0O1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Three things need to change, and two things must stay the same.

    **Change to lowercase:**

    - **Tag names**, for example `<TITLE>` becomes `<title>`
    - **Attribute names**, for example `TARGET="_blank"` becomes `target="_blank"`
    - **Class names**, which follow the same rules as file names: lowercase, with a hyphen between words. For example, `class="PriceList"` becomes `class="price-list"`

    **Leave exactly as they are:**

    - The **text** between the tags. `<H2>About Us</H2>` becomes `<h2>About Us</h2>`, **not** `<h2>about us</h2>`
    - Attribute **values** such as `alt` text and web addresses

    Check the **CSS** tab to confirm what the class name should be.

## Close the Tags

!!! abstract "Instructions"
    **Using the editor below**, the code has **four** problems with closing tags. Find and fix all four.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+U3Vuc2V0IFN1cmYgU2Nob29sPC9oMT5cbjxwPkxlYXJuIHRvIHN1cmYgd2l0aCBxdWFsaWZpZWQgaW5zdHJ1Y3RvcnMuXG48cD5MZXNzb25zIHJ1biA8c3Ryb25nPmV2ZXJ5IHdlZWtlbmQ8L3A+PC9zdHJvbmc+XG48dWw+XG4gIDxsaT5CZWdpbm5lciBsZXNzb25zXG4gIDxsaT5Qcml2YXRlIGxlc3NvbnM8L2xpPlxuPC91bD5cbjxwPkJvb2sgbm93IGF0IHRoZSA8ZW0+YmVhY2ggaHV0PC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
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
    **Using the editor below**, replace the `div` elements with the correct **semantic elements**.

    - **One** `div` should stay a `div`. Work out which one, and why.
    - Once the `div` elements are replaced, update the selectors in the **CSS** tab so the page looks the same as it did before.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gIDxoMT5IYXJib3VyIEJvb2tzPC9oMT5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwibmF2XCI+XG4gIDxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT5cbiAgPGEgaHJlZj1cImJvb2tzLmh0bWxcIj5Cb29rczwvYT5cbiAgPGEgaHJlZj1cImNvbnRhY3QuaHRtbFwiPkNvbnRhY3Q8L2E+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm1haW5cIj5cbiAgPGgyPk5ldyBBcnJpdmFsczwvaDI+XG4gIDxkaXYgY2xhc3M9XCJib29rLWNhcmRcIj5cbiAgICA8aDM+VGhlIFJpdmVyIFJvYWQ8L2gzPlxuICAgIDxwPiQ4LjAwPC9wPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XG4gIDxwPiZjb3B5OyAyMDI2IEhhcmJvdXIgQm9va3M8L3A+XG48L2Rpdj4ifV0sICJjc3MiOiAiLmhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxZTVmNzQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweCAyMHB4O1xufVxuXG4ubmF2IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZGFiNztcbiAgcGFkZGluZzogNXB4IDIwcHg7XG59XG5cbi5tYWluIHtcbiAgcGFkZGluZzogMCAyMHB4O1xufVxuXG4uYm9vay1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcbiAgcGFkZGluZzogMTBweDtcbiAgd2lkdGg6IDIwMHB4O1xufVxuXG4uZm9vdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlNWY3NDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG59IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
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
    **Using the editor below**, move every style into the **CSS** tab and remove all the `style` attributes from the HTML.

    - The page must look exactly the same when you are finished
    - Paragraphs that share the same styles should share **one** class

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDEgc3R5bGU9XCJjb2xvcjogZGFya2dyZWVuOyB0ZXh0LWFsaWduOiBjZW50ZXJcIj5HcmVlbiBMZWFmIE51cnNlcnk8L2gxPlxuPHAgc3R5bGU9XCJjb2xvcjogIzMzMzMzMzsgZm9udC1zaXplOiAxOHB4XCI+UGxhbnRzIGZvciBldmVyeSBob21lIGFuZCBnYXJkZW4uPC9wPlxuPHAgc3R5bGU9XCJjb2xvcjogIzMzMzMzMzsgZm9udC1zaXplOiAxOHB4XCI+VmlzaXQgdXMgc2V2ZW4gZGF5cyBhIHdlZWsuPC9wPlxuPHAgc3R5bGU9XCJjb2xvcjogd2hpdGU7IGJhY2tncm91bmQtY29sb3I6IGRhcmtncmVlbjsgcGFkZGluZzogMTBweFwiPlNwcmluZyBzYWxlIG5vdyBvbiE8L3A+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Moving a style takes three steps:

    1. Give the element a `class` that describes **what it is**
    2. Create a rule for that class in the **CSS** tab and move the styles into it
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
    **Using the editor below**, the page uses **six** obsolete tags and attributes. Replace every one of them with CSS in the **CSS** tab (or with the correct modern HTML element), so the page looks the same without them.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICA8dGl0bGU+SG9tZSB8IFN1bnNldCBTdXJmIFNjaG9vbDwvdGl0bGU+XG48L2hlYWQ+XG48Ym9keSBiZ2NvbG9yPVwiI2ZmZjhlMVwiPlxuICA8Y2VudGVyPjxoMT5TdW5zZXQgU3VyZiBTY2hvb2w8L2gxPjwvY2VudGVyPlxuICA8cD48Zm9udCBjb2xvcj1cIm5hdnlcIj5TdXJmIGxlc3NvbnMgZm9yIGFsbCBhZ2VzPC9mb250PjwvcD5cbiAgPHAgYWxpZ249XCJjZW50ZXJcIj5MZXNzb25zIGV2ZXJ5IFNhdHVyZGF5IGFuZCBTdW5kYXkuPC9wPlxuICA8cD48c3RyaWtlPiQ2MCBwZXIgbGVzc29uPC9zdHJpa2U+IE5vdyAkNTAgcGVyIGxlc3NvbjwvcD5cbiAgPHA+PGJpZz5Cb29rIHRvZGF5ITwvYmlnPjwvcD5cbjwvYm9keT5cbjwvaHRtbD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
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
    **Using the editor below**, add comments to the code so another developer could find their way around it quickly.

    - Add a comment above each **main area** of the page
    - Add one comment that explains what the logo does
    - Do not comment every line

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aGVhZGVyPlxuICA8YSBocmVmPVwiaW5kZXguaHRtbFwiPlxuICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jeWJlcmJpbGJ5LmNvbS9jYXB5YmFyYS5qcGdcIiBhbHQ9XCJHcmVlbiBMZWFmIE51cnNlcnkgaG9tZVwiIHdpZHRoPVwiODBcIj5cbiAgPC9hPlxuPC9oZWFkZXI+XG5cbjxuYXY+XG4gIDx1bD5cbiAgICA8bGk+PGEgaHJlZj1cImluZGV4Lmh0bWxcIj5Ib21lPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJwbGFudHMuaHRtbFwiPlBsYW50czwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwiY29udGFjdC5odG1sXCI+Q29udGFjdDwvYT48L2xpPlxuICA8L3VsPlxuPC9uYXY+XG5cbjxtYWluPlxuICA8c2VjdGlvbj5cbiAgICA8aDE+V2VsY29tZSB0byBHcmVlbiBMZWFmIE51cnNlcnk8L2gxPlxuICAgIDxwPkluZG9vciBwbGFudHMsIG91dGRvb3IgcGxhbnRzIGFuZCBnYXJkZW4gYWR2aWNlLjwvcD5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uPlxuICAgIDxoMj5GaW5kIFVzPC9oMj5cbiAgICA8YWRkcmVzcz5cbiAgICAgIDggRmVybiBTdHJlZXQ8YnI+XG4gICAgICBHcmVlbnZhbGUgVklDIDM5OTlcbiAgICA8L2FkZHJlc3M+XG4gIDwvc2VjdGlvbj5cbjwvbWFpbj5cblxuPGZvb3Rlcj5cbiAgPHA+JmNvcHk7IDIwMjYgR3JlZW4gTGVhZiBOdXJzZXJ5PC9wPlxuPC9mb290ZXI+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Comments start with `<!--` and end with `-->`, and go on the line **above** the code they describe. A good comment says what an area is for in a few words. It should not just repeat the code.

    | Helpful comment | Not helpful |
    |---|---|
    | `<!-- Staff photos and short descriptions -->` | `<!-- div -->` |
    | `<!-- Booking form, sent to the front desk -->` | `<!-- form starts here -->` |

    For the logo, explain what happens when a visitor **clicks** it.

    The preview should not change at all, because comments are never displayed.

## Name the Standard

!!! abstract "Instructions"
    Each snippet below breaks at least one coding standard. **Without using an editor**, write down for each snippet:

    - which coding standard it breaks
    - how you would fix it

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

    Write each answer like the example below, which is **not** one of the snippets:

    | Snippet | Standard broken | Fix |
    |---|---|---|
    | `<b>Sale <i>now</b></i>` | Closing tags | Close the `i` before the `b`: `<b>Sale <i>now</i></b>` |

    If a snippet breaks two standards, give both, and a fix for each.

## Spot the Bugs

!!! abstract "Instructions"
    **Using the editor below**, this page breaks the coding standards in **at least ten** places. Find and fix as many as you can.

    Keep a list of each problem you fix and the standard it broke.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8RElWIGNsYXNzPVwidG9wXCI+XG48Q0VOVEVSPjxpbWcgc3JjPVwiaHR0cHM6Ly9jeWJlcmJpbGJ5LmNvbS9jYXB5YmFyYS5qcGdcIiBhbHQ9XCJNb3VudGFpbiBWaWV3IE1vdGVsIGxvZ29cIiB3aWR0aD1cIjgwXCI+PC9DRU5URVI+XG48SDE+TW91bnRhaW4gVmlldyBNb3RlbDwvSDE+XG48L0RJVj5cbjxkaXYgY2xhc3M9XCJtZW51XCI+XG48YSBocmVmPVwiaW5kZXguaHRtbFwiPkhvbWU8L2E+XG48YSBocmVmPVwiT3VyIFJvb21zLmh0bWxcIj5Sb29tczwvYT5cbjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPlxuPC9kaXY+XG48cCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweFwiPlF1aWV0IHJvb21zIHdpdGggdmlld3Mgb2YgdGhlIHJhbmdlcy5cbjxwPkNoZWNrLWluIGZyb20gPHN0cm9uZz4yOjAwcG08L3A+PC9zdHJvbmc+XG48Zm9udCBjb2xvcj1cImdyZWVuXCI+RnJlZSBwYXJraW5nIGZvciBndWVzdHM8L2ZvbnQ+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
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

    Record each problem in a list like this example, which is **not** from this page:

    | Line | Problem | Standard |
    |---|---|---|
    | 14 | The `table` has a `style` attribute | Keep styling in CSS |

    Check the link addresses too. A file name with spaces or capital letters, such as `href="Price List.html"`, breaks the naming rules and should be `price-list.html`. Remember to rename the file to match as well, or the link will break.

## Spot the Bugs Again

!!! abstract "Instructions"
    **Using the editor below**, this website has **two** pages, and both of them break the coding standards. This time you are not told how many problems there are.

    Fix every problem on both pages, and make sure the two pages are **consistent** with each other.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aGVhZGVyPlxuPGgxPlRpZGFsIEFxdWFyaXVtPC9oMT5cbjwvaGVhZGVyPlxuPGRpdj5cbjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT5cbjxhIGhyZWY9XCJhYm91dC5odG1sXCI+QWJvdXQ8L2E+XG48L2Rpdj5cbjxtYWluPlxuPGgyPldlbGNvbWU8L2gyPlxuPHA+TWVldCB0aGUgc2VhIGNyZWF0dXJlcyBvZiB0aGUgc291dGhlcm4gY29hc3QuXG48cCBhbGlnbj1cImNlbnRlclwiPk9wZW4gZGFpbHkgZnJvbSA5OjAwYW0uPC9wPlxuPC9tYWluPiJ9LCB7Im5hbWUiOiAiYWJvdXQuaHRtbCIsICJodG1sIjogIjxIRUFERVI+XG48aDE+VGlkYWwgQXF1YXJpdW08L2gxPlxuPC9IRUFERVI+XG48bmF2PlxuPGEgaHJlZj1cImluZGV4Lmh0bWxcIj5Ib21lPC9hPlxuPGEgaHJlZj1cImFib3V0Lmh0bWxcIj5BYm91dDwvYT5cbjwvbmF2PlxuPG1haW4+XG48aDIgc3R5bGU9XCJjb2xvcjogdGVhbFwiPkFib3V0IFVzPC9oMj5cbjxwPlRpZGFsIEFxdWFyaXVtIGZpcnN0IG9wZW5lZCBpbiA8ZW0+MTk5ODwvcD48L2VtPlxuPC9tYWluPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    Switch between the pages using the page tabs above the code. Work in two steps:

    1. Fix each page on its own, using the checklist from **Spot the Bugs**
    2. Then compare the two pages side by side

    Areas that appear on every page, such as the header, navigation and footer, should be marked up **the same way** on every page. For example, if one page uses `<footer>` and another uses `<div class="footer">` for the same area, the `div` is the one to fix.

## Review Your Mini Website

!!! abstract "Instructions"
    **Using VS Code**, open your Mini Website from Task 6 (which you styled in Task 8) and review **every page** against the coding standards.

    Record what you find in a table like this, then fix each problem:

    | Page | Problem | Standard | Fix |
    |---|---|---|---|
    | | | | |

??? question "Hint"
    Use the same checklist as **Spot the Bugs**, on one page at a time.

    VS Code can help you find some problems quickly. Press `Ctrl + Shift + F` to search **every file** in your project, and search for:

    - `style=` to find inline styles
    - `<div` to check each `div` should really be a `div`
    - `<font`, `<center` and `bgcolor` to find obsolete code

    A row in your table might look like this:

    | Page | Problem | Standard | Fix |
    |---|---|---|---|
    | `about.html` | `<IMG SRC=...>` written in capitals | Lowercase tags | Changed to `<img src=...>` |

## Swap and Review

!!! abstract "Instructions"
    Swap Mini Websites with a classmate and review **their** code against the coding standards, using the same table as the previous exercise. Give them your table when you are finished.

    Then use the table your classmate gives you to fix any problems they found in **your** website.

??? question "Hint"
    Reviewing someone else's code is how code is checked in the workplace. Good feedback says **which page**, **what the problem is**, and **which standard** it breaks, so the other developer can find it straight away.

    | Vague feedback | Specific feedback |
    |---|---|
    | "Your code is messy." | "`contact.html`: the links inside the `ul` are not indented (Indentation)." |
    | "Fix your tags." | "`index.html`: the second `p` inside `main` is never closed (Closing tags)." |

    Keep your feedback about the **code**, not the person, and mention something they did well too.

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

    When you are finished, check your own page against every section of the [Coding Standards](../resources/coding-standards.md) page before showing it to your teacher.

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
