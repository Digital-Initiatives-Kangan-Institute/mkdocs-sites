# Testing a Website

Testing checks that a website works correctly, looks right, is accessible and secure, and meets every client requirement before and after it goes live. This page covers testing methods, how to write and record test cases, and how to act on feedback.

---

## Why Test?

A page that looks fine on your computer might:

- look different, or break, in another browser
- have a link that goes to the wrong page
- be missing content the client asked for
- be unusable for someone using a keyboard or screen reader
- reveal information in its source code that should be private

Testing finds these problems **before** visitors and clients do.

***

## Testing Methods

| Method | What is checked | How |
|---|---|---|
| **Functional testing** | Everything works: every link, the logo link, navigation, form fields and buttons | Click every link and use every form field on every page |
| **Requirements (content) testing** | The site includes everything the client asked for | Go through the requirements list one item at a time and check each is met |
| **Cross-browser testing** | The site looks and works the same in different browsers and browser versions | Open the site in at least two different browsers, such as Chrome and Firefox |
| **Consistency testing** | Every page uses the same layout, colours, fonts, header, navigation and footer | Click through every page and compare them |
| **Accessibility testing** | The site meets WCAG (alt text, contrast, keyboard access, titles, zoom) | Use the accessibility checks below |
| **Security testing** | The site uses HTTPS and does not expose private information | Check the address bar and view the page source |
| **Validation** | The HTML and CSS follow W3C standards | Use the [W3C validator](w3c.md#the-w3c-validator) |
| **Responsive testing** | The site works on different screen sizes | Resize the browser window, or use Developer Tools device mode (`F12`, then the phone and tablet icon) |
| **Peer / user testing** | Someone other than the developer can use the site | Ask another person to test the site and record what they find |

!!! tip "Why a peer?"
    Developers know how their own site is *meant* to work, so they often miss problems. A fresh pair of eyes follows the site the way a real visitor would.

***

## Cross-Browser Testing

Different browsers use different **engines** to display pages (see [How the Web Works](how-the-web-works.md#web-browsers)), so test in browsers that use **different engines**, for example:

- **Google Chrome** or **Microsoft Edge** (Blink)
- **Mozilla Firefox** (Gecko)
- **Safari** (WebKit), if you have access to an Apple device

Test the same things in each browser and note any differences. Record the **browser name and version** in your test results.

***

## Accessibility Checks

These checks can be done by anyone, with no special tools:

| Check | How to test |
|---|---|
| **Text contrast** | Is all text easy to read against its background? Check doubtful colours with a contrast checker. |
| **Alt text** | Right-click each image and choose **Inspect**. The Developer Tools open with the `img` element highlighted. Check it has a meaningful `alt` attribute. |
| **Keyboard access** | Click in the address bar, then press `Tab` repeatedly. Every link and form field should be reached in order, with a visible focus outline. |
| **Page titles** | Look at the browser tab on each page. Does each one show a clear, different title? |
| **Zoom** | Press `Ctrl` and `+` until the zoom reaches 200%. Is all content still readable and usable, with nothing cut off or overlapping? |
| **Headings** | Is there one `h1` per page, with headings in order? |
| **Form labels** | Click each label. Does the cursor move into its field? |

***

## Security Checks

| Check | How to test |
|---|---|
| **HTTPS** | The address starts with `https://` and the browser shows a padlock icon |
| **No sensitive information in the code** | Press `Ctrl + U` to view the page source. Read it, including comments, for passwords, private notes, personal details or unfinished work. |
| **Files** | Only the files the website needs have been published, with no private documents or backups |

***

## Test Cases

A **test case** is one specific thing to check, written so anyone can follow it and decide whether it **passes** or **fails**.

Good test cases are:

- **specific**: "Clicking the logo goes to the Home page", not "the logo works"
- **testable**: the answer is clearly pass or fail
- **linked to requirements**: each client requirement has at least one test case

### Test Records

Test results are recorded in a **test record** (or test plan), usually a table like this:

| No. | Test Case | Chrome | Firefox | Comments |
|---|---|---|---|---|
| 1 | Every page has a navigation bar | Pass | Pass | |
| 2 | Every navigation link goes to the correct page | Pass | Fail | Contact link opens a "404 Not Found" page in both browsers when clicked from the Services page. |
| 3 | Clicking the logo returns to the Home page | Pass | Pass | |
| 4 | All images have alt text | Fail | Fail | The second image on the Services page has no alt attribute. |
| 5 | The address starts with `https://` and shows a padlock | Pass | Pass | |

When a test **fails**, the comment should be descriptive enough for the developer to find and fix the problem: **which page**, **what happened**, and **what should have happened**.

***

## Feedback and Amendments

After testing, and after showing the site to the client, you will receive **feedback**: problems to fix or changes the client wants. Each change you make is called an **amendment**.

Record every amendment in an **amendment record**:

| Feedback Received | Amendment Made | Date |
|---|---|---|
| Contact link on the Services page is broken | Fixed the `href` from `Contact.html` to `contact.html` | 12/03/2026 |
| Second image on the Services page has no alt text | Added `alt="Dental hygienist cleaning a patient's teeth"` | 12/03/2026 |
| Client would like the phone number in the footer | Added the phone number to the footer on all four pages | 13/03/2026 |

The process is a cycle:

1. **Test** the site, or receive feedback
2. **Record** the problem or request
3. **Amend** the code
4. **Re-test** to confirm the fix worked and did not break anything else
5. **Re-publish** the updated site

Once all amendments are complete, the client confirms the site meets their requirements with a final **sign-off**.

---

## Summary

- Testing checks function, requirements, consistency, accessibility, security and standards
- Test in at least two browsers that use different engines, and record the browser versions
- Accessibility checks include contrast, alt text, keyboard access with `Tab`, page titles and 200% zoom
- Security checks include HTTPS and viewing the page source (`Ctrl + U`) for private information
- Test cases are specific, testable, and linked to the client's requirements
- Record failures descriptively, record every amendment with the date, and re-test after each fix

### Activity - Testing and Validation

[Attempt Activity 12 - Testing and Validation](../tasks/task-12-testing.md){.md-button}
