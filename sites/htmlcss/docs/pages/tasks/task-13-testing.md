# Task 13 - Testing and Validation

!!! note "Working in VS Code"
    Most exercises in this task test the **Green Thumb Gardening** website. Download it in the first exercise, open the `green-thumb-gardening` folder in VS Code with `File` then `Open Folder...`, and keep fixing the same files as you work through the task. The website has problems hidden in it for you to find.

## Download the Website

!!! abstract "Instructions"
    **Using your web browser**, download and unzip the Green Thumb Gardening website, then open the `green-thumb-gardening` folder in VS Code.

    Open each page with **Live Preview** and click through the whole site. The client brief below describes what the website must do.

    [Download Green Thumb Gardening](../../assets/task-13-green-thumb-gardening.zip){.md-button}

    !!! quote "Client brief: Green Thumb Gardening"
        We're a local gardening business and we need a four-page website: a home page, a services page, an about us page and a contact page.

        The home page should welcome visitors, give our address, show our opening hours in a table, and link to the services page.

        The services page should show each of our services with a photo, a short description and the price.

        The about us page should tell our story, including the year we started, and introduce our gardeners.

        The contact page needs a form with fields for a name, an email address, a phone number and a message.

        Every page should have the same menu, and our logo should take people back to the home page.

??? question "Hint"
    Right-click the zip file and choose **Extract All** before you open the folder. VS Code cannot open files that are still inside a zip file.

## Validate a Page

!!! abstract "Instructions"
    **Using the W3C validator** (`https://validator.w3.org/`), check `index.html` for errors using **Validate by Direct Input**.

    Fix every error in VS Code, then validate the page again. Keep going until the validator reports no errors.

??? question "Hint"
    Open the page in VS Code, select everything with `Ctrl + A`, copy it, and paste it into the validator text box. Always start with the **first** error, because one mistake early in the page can cause extra errors further down. Common causes are closing tags that do not match their opening tags, and images without an `alt` attribute.

## Validate by File Upload

!!! abstract "Instructions"
    **Using the W3C validator**, check `services.html`, `about.html` and `contact.html`, this time using the **Validate by File Upload** tab.

    Fix every error and validate each page again until it reports no errors.

??? question "Hint"
    Choose the `.html` file itself, not the project folder. If an error says an element is not closed, look for an opening tag that is missing its closing tag a little further **up** the page than the line the validator shows.

## Validate the CSS

!!! abstract "Instructions"
    **Using the W3C CSS validator** (`https://jigsaw.w3.org/css-validator/`), check `style.css`. Fix every error and validate it again until it reports no errors.

??? question "Hint"
    The CSS validator has the same three tabs as the HTML validator. Common CSS errors are a missing semicolon, a number with no unit such as `px`, or a misspelled property name.

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
    **Using VS Code**, give the Green Thumb Gardening website an accessibility check.

    Every page must have:

    - the page language set
    - a clear, unique page title
    - headings in order: one `h1` first, then `h2` for sections, with no levels skipped
    - every image using a meaningful `alt` description
    - link text that describes where each link goes
    - every form input with a connected `label`

    Fix anything in this list that the pages do not yet meet.

??? question "Hint"
    Work through the pages one at a time and check the items above in order. Right-clicking an image in the browser and choosing **Inspect** is a quick way to check its alt text. Clicking a label in Live Preview should put the cursor in its field.

## Contrast Check

!!! abstract "Instructions"
    **Using the WebAIM Contrast Checker** (`https://webaim.org/resources/contrastchecker/`), check every text and background colour pair in `style.css`, including the navigation, header, footer and buttons.

    Change any colour that does not pass **WCAG AA** for normal text, then check it again.

??? question "Hint"
    Enter the text colour as the **foreground** and the background colour as the **background**, using their hex codes from the CSS. The colours stored in variables are at the top of the stylesheet, but some rules use a hex code directly. Remember to check hover and active styles too.

## Keyboard and Zoom Test

!!! abstract "Instructions"
    **Using your web browser**, test every page without using the mouse, then at 200% zoom.

    - press `Tab` repeatedly and check that every link and form field is reached, in order, with a visible outline
    - press `Enter` on a navigation link to check it works
    - zoom to 200% and check nothing is cut off or overlapping

    Fix any problems you find.

??? question "Hint"
    Click in the browser's address bar first, then start pressing `Tab`. Zoom in with `Ctrl` and `+`, and reset with `Ctrl` and `0`. If you cannot see which navigation link is selected, look at the `:focus` styles in the stylesheet.

## Security Check

!!! abstract "Instructions"
    **Using VS Code**, find and remove the information in the starter page that should **never** be published in a website's code.

    Then press `Ctrl + U` on each page of the Green Thumb Gardening website, and remove anything from its code that should not be published.

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

## Cross-Browser Test

!!! abstract "Instructions"
    **Using two different web browsers**, open the Green Thumb Gardening website in each one and check it against every sentence of the client brief.

    In **both** browsers:

    - click every navigation link and the logo on every page
    - check every image loads and every page is styled
    - check the opening hours table and the contact form look right

    Fix anything that does not work, then test it again in both browsers.

??? question "Hint"
    Choose browsers with different engines, such as Chrome and Firefox. To open a page in another browser, drag the `.html` file from your file explorer onto the browser window.

## Test the Second Website

!!! abstract "Instructions"
    **Using everything from this task**, test the **Harbour Swim School** website. Validate every page and the stylesheet, then complete an accessibility pass, a contrast check, a keyboard and zoom test, a security check and a cross-browser test. Fix every problem you find.

    [Download Harbour Swim School](../../assets/task-13-harbour-swim-school.zip){.md-button}

    !!! quote "Client brief: Harbour Swim School"
        We're a swim school and we need a four-page website: a home page, a lessons page, an about us page and a contact page.

        The home page should welcome visitors, give our address and phone number, show our pool opening hours in a table, and link to the lessons page.

        The lessons page should show each class with a photo, the age group and the price, and a timetable of class times in a table.

        The about us page should tell our story, including the year we opened, and introduce our coaches.

        The contact page needs a form with fields for a name, an email address, the swimmer's age, a choice of lesson and a message.

        Every page should have the same menu, and our logo should take people back to the home page.

??? question "Hint"
    Repeat each exercise in this task in the same order. Some problems are easy to see in the browser, such as a header with no background colour, while others only show up in the validators or when you use the keyboard.
