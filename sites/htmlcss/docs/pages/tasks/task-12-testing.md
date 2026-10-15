# Task 12 - Testing and Validation

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

## Validate a Page

!!! abstract "Instructions"
    **Using the W3C validator**, check the home page of your Paws and Claws website from Task 11 for errors.

    - Go to `https://validator.w3.org/`
    - Validate your page by direct input (paste in the full contents of the file)
    - Write down each error and warning the validator reports

??? question "Hint"
    Use the `Validate by Direct Input` tab on the validator site. Open your page file in VS Code, select everything, copy it, and paste it into the validator text box.

## Fix and Re-validate

!!! abstract "Instructions"
    **Using VS Code**, fix every error the validator found in your page, then validate it again.

    Keep fixing and re-validating until the validator reports no errors, then repeat the process for your remaining pages.

??? question "Hint"
    Always start with the first error, because one mistake early in the page can cause extra errors further down. Common causes are missing closing tags and attribute values without quotes.

## Validate by File Upload

!!! abstract "Instructions"
    **Using the W3C validator**, repeat the validation process for every page of your Riverside Bike Repairs website, this time using the **Validate by File Upload** tab.

    Record the number of errors for each page before and after fixing them.

??? question "Hint"
    This repeats the two exercises above with a different way of giving the validator your code. Choose the `.html` file itself, not the project folder.

## Validate the CSS

!!! abstract "Instructions"
    **Using the W3C CSS validator** (`https://jigsaw.w3.org/css-validator/`), check the `style.css` file of both websites. Fix any errors and re-validate.

??? question "Hint"
    The CSS validator has the same three tabs as the HTML validator. Common CSS errors are a missing semicolon, a missing closing curly brace, or a misspelled property name.

## Find the Errors

!!! abstract "Instructions"
    **Using VS Code**, find and fix the **six** problems in the starter page that a validator or accessibility check would find.

??? code "click to expand"
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <h1>Riverside Bike Repairs</h1>
      <h3>Our Workshop</h3>
      <img src="https://cyberbilby.com/capybara.jpg">
      <p>Book a service <a href="contact.html">here</a>.</p>

      <form action="#">
        <label>Email</label>
        <input type="email" id="email">
      </form>
    </body>
    </html>
    ```

??? question "Hint"
    Check the page against the [Accessible HTML Checklist](../resources/accessibility.md#accessible-html-checklist). Look at the `html` element, the `head`, the heading levels, the image, the link text and the form label.

## Accessibility Pass

!!! abstract "Instructions"
    **Using VS Code**, give your Paws and Claws website an accessibility check.

    Every page must have:

    - the page language set
    - a clear, unique page title
    - headings in order: one `h1` first, then `h2` for sections, with no levels skipped
    - every image using a meaningful `alt` description
    - link text that describes where each link goes
    - every form input with a connected `label`

    Fix anything in this list that your pages do not yet meet.

??? question "Hint"
    Work through the pages one at a time and check the items above in order. Right-clicking an image in the browser and choosing **Inspect** is a quick way to check its alt text.

## Contrast Check

!!! abstract "Instructions"
    **Using the WebAIM Contrast Checker** (`https://webaim.org/resources/contrastchecker/`), check every text and background colour combination used in your Paws and Claws stylesheet, including the navigation, header, footer and buttons.

    Record each pair of colours and whether it passes **WCAG AA** for normal text. Change any colours that fail.

??? question "Hint"
    Enter the text colour as the **foreground** and the background colour as the **background**, using their hex codes from your CSS. If you used CSS variables, the colour values are all at the top of your stylesheet. Remember to check hover and active styles too.

## Keyboard and Zoom Test

!!! abstract "Instructions"
    **Using your web browser**, test every page of your Paws and Claws website without using the mouse, then at 200% zoom.

    - press `Tab` repeatedly and check that every link and form field is reached, in order, with a visible outline
    - press `Enter` on a navigation link to check it works
    - zoom to 200% and check nothing is cut off or overlapping

    Record any problems you find and fix them.

??? question "Hint"
    Click in the browser's address bar first, then start pressing `Tab`. Zoom in with `Ctrl` and `+`, and reset with `Ctrl` and `0`. If the focus outline cannot be seen on your navigation links, look at your `:focus` styles.

## Security Check

!!! abstract "Instructions"
    **Using VS Code**, find and remove the information in the starter page that should **never** be published in a website's code.

    Then press `Ctrl + U` on each page of your own websites and check the source code for the same kinds of problems.

??? code "click to expand"
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Home | Green Thumb Gardening</title>
    </head>
    <body>
      <!-- TODO: ask Dave about the price increase before launch -->
      <h1>Green Thumb Gardening</h1>
      <p>Local gardeners keeping your yard green all year round.</p>

      <!-- FTP login for the web server: greenthumb / Garden2026! -->
      <p>Call us on 03 9000 1234.</p>

      <!-- Staff home address: 22 Maple Court, Shepparton -->
    </body>
    </html>
    ```

??? question "Hint"
    Comments are hidden on the page but anyone can read them in the page source. Think about which comments contain passwords, private notes, personal information or unfinished work. The business phone number is meant to be public.

## Cross-Browser Test Record

!!! abstract "Instructions"
    **Using a document or spreadsheet**, create a test record for your Paws and Claws website and test it in **two** different browsers.

    - record the name and version of each browser
    - write at least `10` test cases, covering navigation, page content, accessibility and security
    - make sure every requirement from your Task 10 requirements list has at least one test case
    - record **Pass** or **Fail** for each test case in each browser, with a descriptive comment for every failure

??? question "Hint"
    The [Test Records](../resources/testing.md#test-records) section shows the layout of a test record. Choose browsers with different engines, such as Chrome and Firefox. Each test case should be one specific thing that clearly passes or fails, such as "Clicking the logo returns to the Home page".

## Peer Testing

!!! abstract "Instructions"
    **Working with a classmate**, swap test records and websites. Test your classmate's website in two browsers using **their** test record, and fill in the results.

    Then write a paragraph of feedback describing any problems you found, with enough detail that the developer can find and fix them.

??? question "Hint"
    Test the site the way a real visitor would, and do not assume anything works until you have tried it. A good failure comment says which page, what happened, and what should have happened.

## Amendment Record

!!! abstract "Instructions"
    **Using a document or spreadsheet**, create an amendment record with the columns `Feedback Received`, `Amendment Made` and `Date`.

    Record every problem from your classmate's feedback and your own test results, fix each one in your website, and record the change you made. Then re-test every item to check the fix worked.

??? question "Hint"
    The [Feedback and Amendments](../resources/testing.md#feedback-and-amendments) section shows an example amendment record. Describe exactly what you changed, for example which file and which attribute, not just "fixed it".

## Test the Second Website

!!! abstract "Instructions"
    **Using everything from this task**, test your Riverside Bike Repairs website: validate every page and the stylesheet, complete an accessibility pass, a contrast check, a keyboard and zoom test and a security check, create a cross-browser test record, and record and fix every problem in an amendment record.

??? question "Hint"
    Repeat each exercise in this task in the same order. You can reuse your Paws and Claws test record as a starting point, but update the test cases to match the Riverside Bike Repairs requirements.
