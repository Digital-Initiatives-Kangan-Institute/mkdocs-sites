# Task 4 - Attributes

!!! note "Working in VS Code"
    Every exercise in this task is done in **VS Code**. For each exercise, create a new folder, open it in VS Code with `File` then `Open Folder...`, and create an `index.html` file (plus any other files named in the starter code). Check your work with **Live Preview**.

## Images - Basic Image

!!! abstract "Instructions"
    **Using VS Code**, add an image to the webpage using the `img` element.

    Use:

    - `https://cyberbilby.com/capybara.jpg` as the image source
    - `Capybara` as the alt text

??? question "Hint"
    The image element uses the `img` tag. Images use the `src` attribute for the file location and the `alt` attribute for a description of the image.

## Image Sizes

!!! abstract "Instructions"
    **Using VS Code**, add the capybara image resized smaller than its original size.

    Use:

    - `https://cyberbilby.com/capybara.jpg` as the image source
    - `Capybara` as the alt text
    - the `width` attribute to display the image at `200` pixels wide

??? question "Hint"
    The image element uses the `img` tag with `src` for the file location and `alt` for the description. The `width` attribute takes the size in pixels. Think about which opening tag all three attributes belong inside.

## Fix the Attributes

!!! abstract "Instructions"
    **Using VS Code**, fix the **three** mistakes in the attributes so the image and link both work.

??? code "click to expand"
    ```html
    <img src=https://cyberbilby.com/capybara.jpg alt="Capybara" width="150">

    <a>https://w3.org/</a>

    <img scr="https://cyberbilby.com/capybara.jpg" alt="Capybara sitting in the grass">
    ```

??? question "Hint"
    Check each attribute against the rules in the [Attributes](../resources/element-attributes.md#attribute-syntax) resource. Are all the values in quotes? Is each attribute name spelled correctly? Does the link have an attribute telling it where to go, and clickable text describing where it goes?

## Images - Multiple Images

!!! abstract "Instructions"
    **Using VS Code**, create a new `gallery.html` page and add `4` **local** images to the page

    Add appropriate alt text for all images.

    [Download Images](../../assets/task-3-attributes-food.zip){.md-button}

??? question "Hint"
    The `alt` attribute should describe the image content in a short sentence.

## Images in a Folder

!!! abstract "Instructions"
    **Using VS Code**, reorganise your gallery project so that the images are stored in their own folder.

    - create an `images` folder next to `gallery.html`
    - move all `4` images into the `images` folder
    - update the `src` of every image so they display again

??? question "Hint"
    As soon as the images move, Live Preview will show broken images, because the file paths are now wrong. The path needs the folder name, then a forward slash, then the file name. The [File Paths](../resources/element-attributes.md#file-paths) section of the resource explains relative paths.

## Descriptive Alt Text

!!! abstract "Instructions"
    **Using VS Code**, open your `gallery.html` page and rewrite the alt text for all `4` images.

    Give each image alt text that describes what is actually shown in the picture. Someone who cannot see the image should still understand it from your words alone.

??? question "Hint"
    Good alt text describes the content of the image in a short sentence. Avoid generic words like `image` or file names such as `photo1.jpg`. Describe what a person looking at the picture would see.

## External Links

!!! abstract "Instructions"
    **Using VS Code**, create a **link** that takes the user to `https://w3.org/` when clicked.

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for links is `href`. Remember elements need an opening and closing tag.

## Internal Links

!!! abstract "Instructions"
    **Using VS Code**, create a **link** on both pages that allows the user to navigate between the two pages. Create both `index.html` and `about.html` in the same folder, using the starter code.

    Test your links by clicking them in Live Preview.

??? code "click to expand"
    `index.html`

    ```html
    <h1>Home</h1>
    ```

    `about.html`

    ```html
    <h1>About</h1>
    ```

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for links is `href`. For pages in the same folder, the value is just the other page's file name.

## Classes

!!! abstract "Instructions"
    **Using VS Code**, add a `class` attribute to the elements so the CSS (already written in `style.css`) styles them:

    - give all **three** prices the class `price`
    - give the paragraph about delivery the class `note`

    When you are finished, the prices should turn green and bold, and the note should be italic.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h2>Bike Accessories</h2>

    <p>Helmet</p>
    <p>$59.00</p>

    <p>Bike lock</p>
    <p>$35.00</p>

    <p>Water bottle</p>
    <p>$12.00</p>

    <p>Free delivery on orders over $100.</p>
    ```

    `style.css`

    ```css
    .price {
      color: green;
      font-weight: bold;
    }

    .note {
      font-style: italic;
    }
    ```

??? question "Hint"
    The class attribute goes inside the opening tag of each element, just like `href` or `src`. In the HTML, the class name is written **without** the dot. The dot is only used in the CSS.

## IDs

!!! abstract "Instructions"
    **Using VS Code**, give the paragraph `Free bike service with every new bike.` an `id` of `special`, so that the CSS highlights it.

??? code "click to expand"
    `index.html`

    ```html
    <link rel="stylesheet" href="style.css">

    <h2>This Week</h2>
    <p>All helmets 20% off.</p>
    <p>Free bike service with every new bike.</p>
    ```

    `style.css`

    ```css
    #special {
      background-color: gold;
      padding: 10px;
    }
    ```

??? question "Hint"
    An `id` works like a class in the HTML, but the CSS uses a hash instead of a dot. Think about how many elements on a page are allowed to share the same `id`, compared with a class.
