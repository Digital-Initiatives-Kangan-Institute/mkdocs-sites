# Task 11 - Build a Website

In this task you will build the **Paws and Claws Pet Grooming** website that you planned in Task 10, one step at a time. Then you will build the **Riverside Bike Repairs** website on your own, repeating the same process.

## Gather the Assets

!!! abstract "Instructions"
    **Using your web browser**, collect the images you need for the Paws and Claws website:

    - a logo (you can create a simple one yourself)
    - a photo for each of at least `4` grooming services
    - a photo for each of at least `2` groomers

    Only use images you have made yourself, or that come from a website that allows free reuse, such as Unsplash or Pexels. Keep a note of where each image came from.

??? question "Hint"
    Images found through a search engine are protected by copyright and cannot be used without permission. The [Copyright and Images](../resources/legislation.md#copyright-and-images) section explains what you can use. Rename each image with a short, lowercase, hyphenated name that describes it, such as `nail-trim.jpg`.

## Set Up the Project

!!! abstract "Instructions"
    **Using VS Code**, create a project folder called `paws-and-claws` with this structure:

    ```
    paws-and-claws/
    ├── index.html
    ├── services.html
    ├── about.html
    ├── contact.html
    ├── style.css
    └── images/
    ```

    Move all your images into the `images` folder, then open the project folder in VS Code.

??? question "Hint"
    Create the folder and open it in VS Code first, then create the files with the Explorer panel. Check every file name matches your sitemap exactly, in lowercase.

## Build the Home Page Layout

!!! abstract "Instructions"
    **Using VS Code**, build the layout that every page will share in `index.html`. Use the template below as a starting point, and follow the comments.

    Your finished layout must include:

    - the full document structure with the title `Home | Paws and Claws`
    - a link to `style.css`
    - a `header` with your logo, wrapped in a link to the home page
    - a `nav` with links to all four pages, with the home link marked `active`
    - a `footer` with a copyright line using the copyright symbol

??? code "click to expand"
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- TODO: page title -->
      <!-- TODO: link to style.css -->
    </head>
    <body>

      <header>
        <!-- TODO: logo image, wrapped in a link to the home page -->
      </header>

      <nav>
        <!-- TODO: list of links to all four pages -->
      </nav>

      <main>
        <!-- Page content goes here -->
      </main>

      <footer>
        <!-- TODO: copyright line -->
      </footer>

    </body>
    </html>
    ```

??? question "Hint"
    Look back at the Logo Link and Four-Page Navigation exercises in Task 6. The logo's `src` must include the `images` folder in its path.

## Create the Other Pages

!!! abstract "Instructions"
    **Using VS Code**, copy the layout from `index.html` into `services.html`, `about.html` and `contact.html`.

    On each page:

    - change the `title` to match the page
    - move the `active` class to the correct navigation link
    - leave the `header`, `nav` and `footer` otherwise identical

    Then click every navigation link and the logo on every page to check they all work.

??? question "Hint"
    With four pages, there are twenty links to test: four navigation links and one logo on each page. If a link fails, compare its `href` with the actual file name in the Explorer.

## Home Page Content

!!! abstract "Instructions"
    **Using VS Code**, add the home page content inside `main`. Make up suitable text for the business:

    - a main heading welcoming visitors, and a welcome paragraph
    - a `Find Us` section with the salon's address
    - an `Opening Hours` section with the hours in a table, using `thead` and `tbody`
    - a sentence containing a link to the services page

??? question "Hint"
    Put each part in its own `section` with an `h2` heading. The address element and line breaks keep the address on separate lines. Look back at the Opening Hours Table exercise in Task 7.

## Services Page Content

!!! abstract "Instructions"
    **Using VS Code**, add the services page content inside `main`:

    - a main heading and a short introduction paragraph
    - a container for **each** service, containing its image, name, description and price
    - descriptive alt text on every image
    - the same class on every service container, and a class on every price

??? question "Hint"
    Build one service container completely, check it in Live Preview, then copy it for each other service and change the details. Look back at the Grouping with Containers and Classes exercises.

## About Us Page Content

!!! abstract "Instructions"
    **Using VS Code**, add the about us page content inside `main`:

    - a main heading
    - an `Our Story` section with at least two paragraphs, including the year the salon opened
    - a `Meet the Team` section with a container for each groomer, containing their photo, name, job title and a short description

??? question "Hint"
    This repeats the Team Members exercise from Task 3, with a photo added to each container. Choose alt text that describes each photo, such as the person's name and what they are doing.

## Contact Page Content

!!! abstract "Instructions"
    **Using VS Code**, add the contact page content inside `main`:

    - a main heading and a paragraph inviting visitors to get in touch
    - a form with labelled `Name`, `Email` and `Message` fields
    - the email field using the email input type, and the message field as a larger box
    - a submit button that says `Send Message`
    - the form set so it does not send anywhere yet

??? question "Hint"
    This repeats the Contact Form exercise from Task 7. Check every label is connected by clicking it in Live Preview.

## Style the Website

!!! abstract "Instructions"
    **Using VS Code**, style the whole site in `style.css`:

    - store the site's colours in CSS variables
    - style the header, navigation bar (with hover, focus and active styles) and footer
    - centre the `main` area with a maximum width
    - style the opening hours table
    - lay out the services and team members as grids of cards
    - style the contact form

    Every page must use the same colours, fonts and layout.

??? question "Hint"
    Work through the exercises in Task 8 in order, applying each one to this site. Keep related rules together in the stylesheet with a comment above each group, for example `/* Navigation */`, so you can find them later.

## Check Against the Requirements

!!! abstract "Instructions"
    **Using your requirements list from Task 10**, check the finished website against every requirement, one line at a time. Mark each one as met or not met.

    Fix anything that is not met, then check again.

??? question "Hint"
    Open the site in Live Preview and look at each page as you go, rather than relying on memory. If a requirement says "every page", check it on all four pages.

## Build a Second Website

!!! abstract "Instructions"
    **Using VS Code**, build the **Riverside Bike Repairs** website from the brief and plan you made in Task 10, on your own.

    Repeat the same process as the Paws and Claws website:

    - gather copyright-free images
    - set up the project folder
    - build the shared layout, then create the other pages
    - add the content for each page
    - style the site with a single stylesheet
    - check it against your requirements list

??? question "Hint"
    Follow the steps of this task in the same order. This brief includes a repairs **table** and extra form fields that the Paws and Claws site did not have, so check your requirements list carefully. For the phone number field, look at the input types in the [Tables and Forms](../resources/tables-forms.md#input-types) resource.
