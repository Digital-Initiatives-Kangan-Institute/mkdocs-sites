# Running Test Cases

A **test case** is one specific check on a website. It has steps to follow and an **expected result**. Anyone can run a test case: follow the steps, compare what happens with the expected result, and record whether it **passed** or **failed**.

This page explains how to run test cases and how to record the results in the test record template.

---

## Example Test Record

The table below is an **example only**. It shows how results from two browsers can be recorded. Your Test Record sheet will have different test cases.

| No. | Test Case | Browser 1 (Chrome) | Browser 2 (Firefox) | Comments |
|---|---|---|---|---|
| TC-01 | Menu on Home page: open the Home page. The menu shows links to Home, Services, About Us and Contact. | Pass | Pass | |
| TC-02 | Logo returns to Home: on the Services page, click the logo. The Home page opens. | Pass | Pass | |
| TC-03 | Menu layout: open the Home page. The menu links sit in one row across the top of the page. | Pass | Fail | Home page: in Firefox the menu links are stacked in a column. They should sit in one row across the top. |
| TC-04 | Opening hours: open the Home page. The Opening Hours table shows the days and hours. | Pass | Pass | |

### What Each Column Means

| Column | What goes in it | Example from the table above |
|---|---|---|
| **No.** | The test case ID. Use it to refer to a test in conversation or in a fix note. | `TC-03` is the menu layout test |
| **Test Case** | The test case name, then the steps to follow and the expected result. Read this column before you run the test. | Menu layout: open the Home page. The menu links sit in one row across the top of the page. |
| **Browser 1 (Chrome)** | **Pass** or **Fail** for the first browser. The heading shows the browser name and version, such as `Chrome 131`. | TC-03 is a Pass in Chrome, because the menu links sat in one row. |
| **Browser 2 (Firefox)** | **Pass** or **Fail** for the second browser, from the same steps in the same order. | TC-03 is a Fail in Firefox, because the menu links were stacked in a column. |
| **Comments** | Left blank for a Pass. For a Fail, the page, the actual result and the expected result, so the developer can find and fix the problem. | Home page: in Firefox the menu links are stacked in a column. They should sit in one row across the top. |

!!! note "Comparing the browser columns"
    Reading across a row shows whether the browsers behave differently. TC-03 passes in Chrome but fails in Firefox, which points to a problem in Firefox, or to something in the website that Firefox handles differently.

Test records vary in detail. The activity template in this course is simpler than some, with no actual result column, so record any information it lacks in the Comments column.

***

## Running a Test Case

Follow these steps for every test case:

1. **Read the test case.** Find the steps and the expected result.
2. **Follow the steps exactly** in the browser.
3. **Compare** what happened with the expected result.
4. **Record Pass** if they match, or **Fail** if they do not.
5. **Comment on every Fail.** Say which page, what happened and what should have happened.

Run the test cases in the same order in every browser, so that the results can be compared fairly.

***

## Clear and Unclear Test Cases

Some test cases are easier to run than others:

| Unclear | Clear |
|---|---|
| The logo works | On the Services page, click the logo. The Home page opens. |
| The menu is fine | Open the Home page. The menu shows links to Home, Services, About Us and Contact. |
| The form works | On the Contact page, the form has fields for name, email address, phone number and message. |

If a test case is unclear, look at the website and decide what it is asking. If you still cannot tell, ask the person who gave you the test record before you record a result.

***

## Recording Failures

When a test **fails**, write a comment that a developer can act on. Include:

- **which page** the problem is on
- **what happened**
- **what should have happened**

| Poor comment | Useful comment |
|---|---|
| Picture broken | About Us page: the photo at the top shows a broken image icon. It should show a photo of the team. |
| Link doesn't work | Services page: the Contact link in the menu shows a "Page not found" message. It should open contact.html. |

***

## Summary

- A test case has a **number**, a **name** with steps and an expected result, and a **Pass** or **Fail** for each browser
- Follow the steps exactly, then compare what happened with the expected result
- Run the test cases in the same order in every browser
- Comment on every Fail with the page, what happened and what should have happened

### Activity - Running Test Cases

[Attempt Activity 15 - Running Test Cases](../tasks/task-15-run-test-cases.md){.md-button}

### Activity - Peer Testing

[Attempt Activity 16 - Peer Testing](../tasks/task-16-peer-testing.md){.md-button}
