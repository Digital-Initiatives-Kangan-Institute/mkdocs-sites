# Tables and Forms

HTML provides elements for displaying structured data and collecting user input. Two of the most common ways to do this are with **tables** and **forms**.

Tables are used to organise information into rows and columns, while forms allow users to enter and submit data.

## Tables

A table is used to display structured data (such as schedules, timetables, statistics) in rows and columns.

Tables are created using the `<table>` element. Inside the table:

* `<tr>` creates a table row
* `<th>` creates a heading cell
* `<td>` creates a standard data cell

For example:
<embed src="https://code.cyberbilby.com/#eyJ0aXRsZSI6IkVkaXRvciIsInBhZ2VzIjpbeyJuYW1lIjoiaW5kZXguaHRtbCIsImh0bWwiOiI8dGFibGU+XG4gICAgPHRyPlxuICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgIDx0aD5Sb2xlPC90aD5cbiAgICA8L3RyPlxuXG4gICAgPHRyPlxuICAgICAgICA8dGQ+QWxleDwvdGQ+XG4gICAgICAgIDx0ZD5EZXNpZ25lcjwvdGQ+XG4gICAgPC90cj5cblxuICAgIDx0cj5cbiAgICAgICAgPHRkPkpvcmRhbjwvdGQ+XG4gICAgICAgIDx0ZD5EZXZlbG9wZXI8L3RkPlxuICAgIDwvdHI+XG48L3RhYmxlPiJ9XSwiY3NzIjoiIiwianMiOiIiLCJhY3RpdmVUYWIiOiJodG1sIiwiYWN0aXZlUGFnZSI6ImluZGV4Lmh0bWwifQ=="></embed>

In this example:

* the first row contains table headings
* the second and third rows contain data
* each row contains cells aligned into columns

## Forms

Forms are used to collect input from users.

A form is created using the `<form>` element, which contains different types of input elements such as text boxes, buttons, checkboxes, and dropdown menus.

Example:

```html
<form>
    <label>Name</label>
    <input type="text">

    <button>Submit</button>
</form>
```

In this example:

* `<form>` creates the form container
* `<label>` describes the input field
* `<input>` creates a text box
* `<button>` creates a clickable button

### Input Types

The `type` attribute changes the behaviour of an input element.

Example:

```html
<input type="text">
<input type="email">
<input type="password">
```

Common input types include:

* `text` → standard text input
* `email` → email address input
* `password` → hides typed characters
* `number` → numeric input
* `checkbox` → selectable checkbox
* `radio` → single-choice selection
* `date` → date picker

### Labels

Labels are used to describe form inputs so users understand what information should be entered.

Example:

```html
<label>Email</label>
<input type="email">
```

Labels improve:

* accessibility
* readability
* usability

Without labels, forms can become difficult to understand.

### Grouping Form Elements

Form elements are often grouped using container elements such as `<div>` to keep related inputs together.

Example:

```html
<form>
    <div>
        <label>Email</label>
        <input type="email">
    </div>

    <div>
        <label>Password</label>
        <input type="password">
    </div>

    <button>Login</button>
</form>
```

This creates a clearer structure and makes forms easier to style later using CSS.

### Activity - Tables and Forms

[Attempt Activity 4 - Tables and Forms](../tasks/task-4-tables-forms.md){.md-button}