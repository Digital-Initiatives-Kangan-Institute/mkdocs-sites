# Multi-Browser Testing

A website can work perfectly in one browser and break in another. **Multi-browser testing** means running the same test cases in several browsers and recording the results for each one.

---

## Why Test in More Than One Browser?

Each browser displays a web page using its own **engine** (see [How the Web Works](how-the-web-works.md#web-browsers)). Browsers can also be different versions, and a feature that works in the newest version may not work in an older one.

Because of this, a website can:

- display correctly in Chrome but show a broken layout in Firefox
- have a form that works in Edge but not in Safari
- show a different font or spacing in each browser

Testing in more than one browser finds these differences **before** visitors do.

***

## Choosing Browsers

| Browser | Engine | Notes |
|---|---|---|
| **Google Chrome** | Blink | The most widely used browser |
| **Microsoft Edge** | Blink | Built on the same engine as Chrome |
| **Mozilla Firefox** | Gecko | A different engine from Chrome and Edge |
| **Safari** | WebKit | Available on Apple devices |

!!! tip "Pick different engines"
    Chrome and Edge both use the Blink engine, so testing in both finds fewer differences than testing in Chrome and Firefox. Choose **at least two browsers with different engines**.

***

## Steps for Multi-Browser Testing

1. **Choose your browsers.** Use at least two browsers with different engines, such as Chrome and Firefox.
2. **Record the browser versions.** Write down the name and version of each browser before you start:
    - **Chrome**: type `chrome://version` in the address bar
    - **Edge**: type `edge://version` in the address bar
    - **Firefox**: type `about:support` in the address bar
3. **Use the same test cases.** Run the same test cases, in the same order, in every browser.
4. **Test the same version of the website.** Do not change the code part way through a test run.
5. **Record each result separately.** Enter a Pass or Fail in each browser's column. Do not copy one result across every column.
6. **Comment on every failure.** Record the page, what happened and what should have happened.

***

## Comparing the Results

Once you have run every test case, look at the pattern of results:

| Result pattern | What it means | What to do |
|---|---|---|
| Pass in every browser | The feature works across the browsers you tested | Nothing more to do for this test |
| Fail in one browser only | The problem is specific to that browser | Find out why, then check the test in every browser after the fix |
| Fail in every browser | The problem is in the website itself | Fix the code, then retest in every browser |

***

## Deciding Whether a Difference Is a Failure

Not every difference between browsers is a fault. Ask these questions:

- Can the visitor still read the content and use every link and button?
- Does the feature do what the client asked for?
- Is the difference only in spacing, font weight or rounded corners?

If the answer to the first two questions is **no**, record a **Fail**. If the difference is only cosmetic and the page is still clear and usable, record a **Pass** and add a comment describing the difference.

***

## Retesting After a Fix

After you fix a failure, retest that test case in **every** browser, not just the one where it failed. A fix for one browser can break another.

Record every fix, either as a `Fixed:` note in the Comments column of the test record, or in an amendment record as described in [Testing a Website](testing.md#feedback-and-amendments).

***

## Summary

- Each browser uses its own engine, so the same website can look or behave differently in each one
- Test in at least two browsers with different engines, and record each browser's version
- Run the same test cases, in the same order, on the same version of the website
- Record each result in its own browser column and comment on every failure
- A fail in only one browser points to a browser-specific problem. A fail in every browser points to a fault in the website itself
- Retest every fix in every browser

### Activity - Running Test Cases

[Attempt Activity 15 - Running Test Cases](../tasks/task-15-run-test-cases.md){.md-button}
