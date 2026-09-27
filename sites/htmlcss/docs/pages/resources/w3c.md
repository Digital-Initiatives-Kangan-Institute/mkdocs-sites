# W3C

The **World Wide Web Consortium (W3C)** is the organisation that sets the standards for the web. This page explains what the W3C does, why web standards matter, and how to check your code against them with the W3C validator.

---

## What is the W3C?

The **World Wide Web Consortium (W3C)** is an international organisation responsible for developing and maintaining the official standards and specifications for the web, including **HTML** and **CSS**. It was founded in 1994 by **Sir Tim Berners-Lee**, the inventor of the World Wide Web.

The purpose of the W3C is to:

- **develop web standards**: the official rules for how web technologies such as HTML and CSS should work
- ensure web technologies work **consistently** across different browsers and devices
- make the web **accessible** to everyone, including people with disabilities, through guidelines such as the **Web Content Accessibility Guidelines (WCAG)**
- keep the web **open**, so anyone can build for it and use it without needing permission or special software
- provide free tools, such as the **HTML and CSS validators**, to help developers check their work

Members of the W3C include browser makers, technology companies, universities and government organisations, who work together to agree on each standard.

***

## Why Web Standards Matter

Without shared standards, every browser could interpret HTML differently, and developers would have to build a separate version of their site for each browser. Following W3C standards means:

- your pages display **consistently** in all modern browsers
- your pages work on phones, tablets and computers
- your pages work with **assistive technology** such as screen readers
- your code is easier for other developers to read and maintain
- your site is more likely to keep working as browsers are updated

***

## W3C Resources

You can access the W3C site at [https://www.w3.org](https://www.w3.org). From there, you can navigate to different sections such as HTML, CSS, and accessibility standards which are found under `Standards & groups` and `W3C standards & drafts`.

As you will see, W3C is not just responsible for the HTML, CSS, and Web Content Accessibility Standards.

- [HTML Specification](https://www.w3.org/TR/html/)
- [CSS Specification](https://www.w3.org/TR/CSS2/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)

***

## The W3C Validator

**Validation** is checking that code follows the official standards. The W3C provides free validators:

| Validator | Checks | Address |
|---|---|---|
| **Markup Validation Service** | HTML | [https://validator.w3.org/](https://validator.w3.org/) |
| **CSS Validation Service** | CSS | [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/) |

A browser will often display a page even when the code has mistakes, so errors can go unnoticed. The validator finds them, for example:

- missing closing tags
- elements nested in the wrong order
- attributes that are misspelled or missing (such as a missing `alt` on an image)
- duplicate `id` values
- a missing `<!DOCTYPE html>`, `lang` or `title`

### Validating a Page

The validator can check a page in three ways:

| Tab | Use |
|---|---|
| **Validate by URI** | Enter the address of a page that is already published online |
| **Validate by File Upload** | Upload an `.html` file from your computer |
| **Validate by Direct Input** | Paste the code straight into a text box |

To validate by direct input:

1. Go to [https://validator.w3.org/](https://validator.w3.org/)
2. Select the **Validate by Direct Input** tab
3. Open your HTML file in your IDE, select all the code (`Ctrl + A`) and copy it (`Ctrl + C`)
4. Paste it into the text box and click **Check**
5. Read the results. **Errors** must be fixed. **Warnings** are suggestions worth reviewing.
6. Fix the problems in your IDE, then validate again until no errors remain

!!! tip "Fix the first error first"
    One mistake early in the page, such as a missing closing tag, can cause many other errors further down. Fix the first error, re-validate, and you may find several others disappear.

---

## Summary

- The W3C develops the standards for the web, including HTML, CSS and WCAG
- Its purpose is to keep the web consistent, accessible and open to everyone
- Following standards makes pages work consistently across browsers and devices
- The W3C validators check HTML and CSS code against the standards
- Fix validator errors starting from the first one, then re-validate

### Activity - Testing and Validation

[Attempt Activity 11 - Testing and Validation](../tasks/task-11-testing.md){.md-button}
