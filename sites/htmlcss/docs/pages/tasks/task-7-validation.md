# Task 7 - Validation

## Validate a Page

!!! abstract "Instructions"
    **Using the W3C validator**, check one of the pages from your Task 5 website for errors.

    - Go to `https://validator.w3.org/`
    - Validate your page by direct input (paste in the full contents of the file)
    - Write down each error and warning the validator reports

??? question "Hint"
    Use the `Validate by Direct Input` tab on the validator site. Open your page file in VS Code, select everything, copy it, and paste it into the validator text box.

## Fix and Re-validate

!!! abstract "Instructions"
    **Using VS Code**, fix every error the validator found in your page, then validate it again.

    Keep fixing and re-validating until the validator reports no errors, then repeat the process for your remaining Task 5 pages.

??? question "Hint"
    Always start with the first error — one mistake early in the page can cause extra errors further down. Common causes are missing closing tags and attribute values without quotes.

## Accessibility Pass

!!! abstract "Instructions"
    **Using VS Code**, give your Task 5 website an accessibility check using what you learned from the W3C resource.

    Every page must have:

    - headings in order — one `h1` first, then `h2` for sections, with no levels skipped
    - every image using a meaningful `alt` description
    - every form input (if any) with a `label` describing it

    Fix anything in this list that your pages do not yet meet.

??? question "Hint"
    Work through the pages one at a time and check the three items above in order. If your Task 5 pages have no headings yet, add them first — heading order is the quickest win for screen reader users.
