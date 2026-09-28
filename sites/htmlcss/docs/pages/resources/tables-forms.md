# Tables and Forms

HTML provides elements for displaying structured data and collecting user input. Two of the most common ways to do this are with **tables** and **forms**.

Tables are used to organise information into rows and columns, while forms allow users to enter and submit data.

---

## Tables

A table is used to display structured data (such as schedules, timetables, opening hours, price lists or statistics) in rows and columns.

Tables are created using the `<table>` element. Inside the table:

* `<tr>` creates a table **row**
* `<th>` creates a **heading** cell (bold and centred by default)
* `<td>` creates a standard **data** cell

For example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dGFibGU+XG4gICAgPHRyPlxuICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgIDx0aD5Sb2xlPC90aD5cbiAgICA8L3RyPlxuXG4gICAgPHRyPlxuICAgICAgICA8dGQ+QWxleDwvdGQ+XG4gICAgICAgIDx0ZD5EZXNpZ25lcjwvdGQ+XG4gICAgPC90cj5cblxuICAgIDx0cj5cbiAgICAgICAgPHRkPkpvcmRhbjwvdGQ+XG4gICAgICAgIDx0ZD5EZXZlbG9wZXI8L3RkPlxuICAgIDwvdHI+XG48L3RhYmxlPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
In this example:

* the first row contains table headings
* the second and third rows contain data
* each row contains cells aligned into columns

!!! note "Counting cells"
    Every row should have the **same number of cells**. If the table has two columns, every `tr` needs exactly two `th` or `td` cells inside it, otherwise the columns will not line up.

### Table Head and Body

Larger tables can be split into a **head** and a **body**:

* `<thead>` wraps the row of headings
* `<tbody>` wraps the rows of data

This makes the table's structure clear to browsers and screen readers, and makes it easier to style the heading row differently with CSS.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+TGlicmFyeSBPcGVuaW5nIEhvdXJzPC9oMj5cbjx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD5EYXk8L3RoPlxuICAgICAgICAgICAgPHRoPkhvdXJzPC90aD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPk1vbmRheSB0byBGcmlkYXk8L3RkPlxuICAgICAgICAgICAgPHRkPjk6MDBhbSAtIDY6MDBwbTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5TYXR1cmRheTwvdGQ+XG4gICAgICAgICAgICA8dGQ+MTA6MDBhbSAtIDQ6MDBwbTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5TdW5kYXk8L3RkPlxuICAgICAgICAgICAgPHRkPkNsb3NlZDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+In1dLCAiY3NzIjogInRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbn1cblxudGgsIHRkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbnRoIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdGVhbDtcbiAgY29sb3I6IHdoaXRlO1xufSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
By default, tables have no borders. The CSS tab in the example above adds borders, spacing and a coloured heading row (see [Styling with CSS](css.md)).

!!! warning "Tables are for data, not layout"
    Only use tables for information that naturally fits into rows and columns. Do not use a table to position things on a page, such as placing pictures side by side. That is a job for CSS.

***

## Forms

Forms are used to collect input from users, for example a contact form, a login form or a booking form.

A form is created using the `<form>` element, which contains different types of input elements such as text boxes, buttons, checkboxes, and dropdown menus.

Example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8bGFiZWwgZm9yPVwibmFtZVwiPk5hbWU8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmFtZVwiIG5hbWU9XCJuYW1lXCI+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbjwvZm9ybT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
In this example:

* `<form>` creates the form container
* `<label>` describes the input field
* `<input>` creates a text box
* `<button>` creates a clickable button

***

## Labels

Labels describe form inputs so users understand what information should be entered.

A label should be **connected** to its input. To do this:

1. give the input an `id`
2. give the label a `for` attribute with the **same value** as the input's `id`

```html
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

When a label and input are connected:

* screen readers read out the label when the input is selected
* clicking the label text places the cursor in the input, giving a bigger target to click
* the form is easier to understand and use

Try clicking the word **Email** in the preview below. The cursor jumps into the box because the label is connected.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIj5cbjwvZm9ybT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
Without labels, forms can become difficult to understand, and some users cannot use them at all.

***

## Input Types

The `type` attribute changes the behaviour of an input element.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8cD5cbiAgICAgICAgPGxhYmVsIGZvcj1cInRcIj5UZXh0PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0XCI+XG4gICAgPC9wPlxuICAgIDxwPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZVwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZVwiPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgICAgPGxhYmVsIGZvcj1cInBcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBcIj5cbiAgICA8L3A+XG4gICAgPHA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJuXCI+TnVtYmVyPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD1cIm5cIj5cbiAgICA8L3A+XG4gICAgPHA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJkXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZFwiPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiY1wiPkNoZWNrYm94PC9sYWJlbD5cbiAgICA8L3A+XG48L2Zvcm0+In1dLCAiY3NzIjogIiIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
Common input types include:

| Type | Use |
|---|---|
| `text` | Standard single-line text, such as a name |
| `email` | An email address. The browser checks it contains an `@`. |
| `password` | Hides the typed characters |
| `number` | Numbers only, with up and down arrows |
| `tel` | A phone number (shows a number keypad on phones) |
| `date` | A date picker |
| `checkbox` | A box that can be ticked on or off. Several can be ticked. |
| `radio` | One choice from a group. Only one in the group can be selected. |

Using the right type helps visitors. On a phone, `type="email"` shows a keyboard with an `@` key, and `type="tel"` shows a number pad.

### Radio Button Groups

Radio buttons that belong to the same question must share the **same `name`** value. This is how the browser knows only one of them can be selected at a time.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8cD5QcmVmZXJyZWQgY29udGFjdCBtZXRob2Q6PC9wPlxuXG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYnktZW1haWxcIiBuYW1lPVwiY29udGFjdFwiIHZhbHVlPVwiZW1haWxcIj5cbiAgICA8bGFiZWwgZm9yPVwiYnktZW1haWxcIj5FbWFpbDwvbGFiZWw+XG5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJieS1waG9uZVwiIG5hbWU9XCJjb250YWN0XCIgdmFsdWU9XCJwaG9uZVwiPlxuICAgIDxsYWJlbCBmb3I9XCJieS1waG9uZVwiPlBob25lPC9sYWJlbD5cbjwvZm9ybT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
***

## Text Areas

An `input` only allows **one line** of text. For longer answers, such as a message or feedback, use a `<textarea>`. Unlike `input`, a textarea has a closing tag.

The `rows` attribute sets how many lines tall the box is.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8bGFiZWwgZm9yPVwibWVzc2FnZVwiPk1lc3NhZ2U8L2xhYmVsPlxuICAgIDx0ZXh0YXJlYSBpZD1cIm1lc3NhZ2VcIiBuYW1lPVwibWVzc2FnZVwiIHJvd3M9XCI1XCI+PC90ZXh0YXJlYT5cbjwvZm9ybT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
***

## Dropdown Menus

A `<select>` element creates a dropdown list. Each choice is an `<option>`.

```html
<label for="service">Service</label>
<select id="service" name="service">
    <option>Check-up</option>
    <option>Cleaning</option>
    <option>Whitening</option>
</select>
```

***

## Buttons and Submitting

A form needs a button to send it. `<button type="submit">` creates a button that **submits** the form. The text between the tags is shown on the button, so make it clear, for example `Send Message` or `Book Now`.

### The name Attribute

When a form is submitted, each input's `name` becomes the label for the data that is sent. Every input that collects information should have a `name`.

| Attribute | Used by |
|---|---|
| `id` | The `label` (through `for`) and CSS |
| `name` | The data sent when the form is submitted |

It is common, and perfectly fine, to give `id` and `name` the same value.

### Required Fields

The `required` attribute stops the form from submitting until the field has been filled in. It has no value; just add the word to the opening tag.

```html
<input type="email" id="email" name="email" required>
```

Try pressing the button in the preview below without filling in the box.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybSBhY3Rpb249XCIjXCI+XG4gICAgPGxhYmVsIGZvcj1cInlvdXItbmFtZVwiPk5hbWU8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwieW91ci1uYW1lXCIgbmFtZT1cInlvdXItbmFtZVwiIHJlcXVpcmVkPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2VuZDwvYnV0dG9uPlxuPC9mb3JtPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
### Where the Data Goes

The `form` element has two attributes that control what happens when it is submitted:

* `action`: the address the data is sent to, usually a program on a web server
* `method`: how the data is sent, usually `post` for forms

HTML on its own **cannot** process or store what a visitor types. Making a form actually send an email or save to a database needs a program running on a web server, which is beyond a simple website. While a site is being built, it is common to set `action="#"` so the form displays and can be tested, but does not send anywhere yet.

```html
<form action="#" method="post">
    ...
</form>
```

***

## Grouping Form Elements

Form elements are often grouped using container elements such as `<div>` to keep each label and its input together.

Example:

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW4tZW1haWxcIj5FbWFpbDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImxvZ2luLWVtYWlsXCIgbmFtZT1cImVtYWlsXCI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW4tcGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImxvZ2luLXBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCI+XG4gICAgPC9kaXY+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Mb2dpbjwvYnV0dG9uPlxuPC9mb3JtPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
This creates a clearer structure, places each field on its own line, and makes forms easier to style later using CSS.

---

## Summary

- Tables use `table`, `tr`, `th` and `td`; `thead` and `tbody` separate the heading row from the data
- Every row in a table should have the same number of cells
- Only use tables for data that fits into rows and columns
- Forms use `form`, `label`, `input`, `textarea`, `select` and `button`
- Connect every label to its input by matching the label's `for` to the input's `id`
- Choose the right input `type`, and use `textarea` for longer messages
- `name` identifies the data when submitted; `required` makes a field compulsory
- A form needs a server-side program to actually send data

### Activity - Tables and Forms

[Attempt Activity 7 - Tables and Forms](../tasks/task-7-tables-forms.md){.md-button}
