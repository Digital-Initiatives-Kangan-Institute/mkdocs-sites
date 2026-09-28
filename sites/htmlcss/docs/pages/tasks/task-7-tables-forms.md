# Task 7 - Tables and Forms

## Basic Table

!!! abstract "Instructions"
    **Using the editor below**, create a table with:

    - 2 column headings
    - 2 rows of data

    Use the following data:

    | Name | Department |
    |------|------|
    | Alex | IT |
    | Sam | Design |

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    A table uses `table` for the whole table, `tr` for each row, `th` for heading cells and `td` for data cells. The heading row is the first row.

## Fix the Table

!!! abstract "Instructions"
    **Using the editor below**, fix the table so that every row has the correct number of cells and the columns line up. The heading row should use heading cells.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8dGFibGU+XG4gIDx0cj5cbiAgICA8dGQ+U2VydmljZTwvdGQ+XG4gICAgPHRkPlByaWNlPC90ZD5cbiAgPC90cj5cbiAgPHRyPlxuICAgIDx0ZD5TbWFsbCBkb2cgd2FzaDwvdGQ+XG4gICAgPHRkPiQ0MDwvdGQ+XG4gIDwvdHI+XG4gIDx0cj5cbiAgICA8dGQ+TGFyZ2UgZG9nIHdhc2g8L3RkPlxuICA8L3RyPlxuICA8dGQ+TmFpbCB0cmltPC90ZD5cbiAgPHRkPiQxNTwvdGQ+XG48L3RhYmxlPiJ9XSwgImNzcyI6ICJ0aCwgdGQgeyBib3JkZXI6IDFweCBzb2xpZCAjOTk5OyBwYWRkaW5nOiA2cHggMTBweDsgfSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    Count the cells in each row. Every cell must be inside a `tr`. The price for the large dog wash is `$55`. Which element makes a heading cell instead of a data cell?

## Timetable

!!! abstract "Instructions"
    **Using VS Code**, create a timetable of your classes with:

    - 2 column headings
    - 2 rows of data

??? question "Hint"
    The first row should usually contain heading cells using `<th>`.

## Opening Hours Table

!!! abstract "Instructions"
    **Using the editor below**, create a table of opening hours for **Riverside Bike Repairs**. The table must:

    - have two columns: `Day` and `Hours`
    - have a row for **every** day of the week
    - put the heading row inside `thead` and the day rows inside `tbody`

    Use these hours: Monday to Friday `8:00am - 5:30pm`, Saturday `9:00am - 1:00pm`, Sunday `Closed`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+T3BlbmluZyBIb3VyczwvaDI+In1dLCAiY3NzIjogInRhYmxlIHsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgfVxudGgsIHRkIHsgYm9yZGVyOiAxcHggc29saWQgIzk5OTsgcGFkZGluZzogNnB4IDEycHg7IHRleHQtYWxpZ246IGxlZnQ7IH1cbnRoIHsgYmFja2dyb3VuZC1jb2xvcjogI2VlZTsgfSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
??? question "Hint"
    The table needs eight rows in total: one heading row and seven day rows. `thead` wraps around the heading row only, and `tbody` wraps around all the others. Each row has two cells.

## Price List Table

!!! abstract "Instructions"
    **Using VS Code**, create a new `prices.html` page with a table of prices for **Paws and Claws Pet Grooming**.

    - three columns: `Service`, `Description` and `Price`
    - at least `4` services (make up the details)
    - a `thead` and a `tbody`
    - a heading above the table

??? question "Hint"
    This repeats the Opening Hours Table with three columns instead of two. Every row, including the heading row, needs three cells.

## Simple Login Form

!!! abstract "Instructions"
    **Using the editor below**, create a form containing:

    - an email input
    - a password input
    - a login button

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Use the `type` attribute to change the behaviour of each `<input>` element. The form's contents all sit inside a single `form` element.

## Connect the Labels

!!! abstract "Instructions"
    **Using the editor below**, connect each label to its input so that clicking the label text moves the cursor into the box.

    Test it by clicking each label in the preview.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8Zm9ybT5cbiAgPGxhYmVsPkZpcnN0IG5hbWU8L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIj5cblxuICA8bGFiZWw+UGhvbmU8L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRlbFwiPlxuXG4gIDxsYWJlbD5FbWFpbDwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwiZW1haWxcIj5cbjwvZm9ybT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Each input needs an `id`, and each label needs a `for` attribute with the **same value** as its input's `id`. Every `id` on the page must be different.

## Feedback Form

!!! abstract "Instructions"
    **Using VS Code**, create a form containing:

    - a name input
    - an email input
    - a larger box for typing feedback over several lines
    - a submit button
    - a label connected to every field

??? question "Hint"
    Longer messages use the `textarea` element rather than an `input`. Unlike `input`, `textarea` has a closing tag. Connect each label to its field with matching `for` and `id` values.

## Contact Form

!!! abstract "Instructions"
    **Using the editor below**, build a contact form for **Green Thumb Gardening**. The form must include:

    - a `Name` field
    - an `Email` field that uses the email input type
    - a `Message` field that is `5` rows tall
    - a label connected to every field
    - a `name` attribute on every field
    - all three fields **required**
    - a submit button that says `Send Message`
    - the form set so it does not send anywhere yet

    Test the form by pressing the button with the fields empty.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+Q29udGFjdCBVczwvaDI+XG48cD5IYXZlIGEgcXVlc3Rpb24gYWJvdXQgeW91ciBnYXJkZW4/IFNlbmQgdXMgYSBtZXNzYWdlLjwvcD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    This repeats the Feedback Form with extra attributes. `required` is added to the opening tag with no value. `rows` sets the height of a `textarea`. Setting the form's `action` to a hash symbol keeps it on the page. The button's text goes between its opening and closing tags.

## Checkbox Form

!!! abstract "Instructions"
    **Using VS Code**, create a form with:

    - 3 checkbox options
    - a label for each checkbox
    - a submit button

??? question "Hint"
    Checkbox inputs use the `checkbox` type. For checkboxes, the label usually goes **after** the input, but it still connects using `for` and `id`.

## Choice Form

!!! abstract "Instructions"
    **Using the editor below**, create a form that asks the user to pick one option from a group.

    Your form must contain:

    - a question (for example, preferred contact method)
    - 3 radio options the user can choose between, each with a label
    - a submit button

    Test that only one option can be selected at a time.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Radio inputs use `<input type="radio">`. To make the options behave as a single group where only one can be selected, each input in the group shares the same `name` attribute value, but each has a different `id`.

## Dropdown Form

!!! abstract "Instructions"
    **Using VS Code**, create a form for **Riverside Bike Repairs** that includes:

    - a name input
    - a dropdown menu where the visitor chooses a service: `Puncture repair`, `Brake adjustment`, `Full service`
    - a label for each field
    - a submit button

??? question "Hint"
    A dropdown uses the `select` element, and each choice inside it is an `option`. The label connects to the `select` the same way it connects to an `input`.

## Booking Form

!!! abstract "Instructions"
    **Using VS Code**, create a booking form containing:

    - a name input
    - a date input for the booking day
    - a number input for the number of guests
    - a submit button
    - a label describing each input

??? question "Hint"
    The `type` attribute changes the behaviour of each `<input>` element. Two of the types you need are named in this exercise's requirements. Each `<label>` connects to the input it describes.

## Grouped Login Form

!!! abstract "Instructions"
    **Using VS Code**, rebuild the Simple Login Form from earlier in this task, but better organised.

    This repeats the same email input, password input, and login button, but this time wrap each label and input pair inside its own container element so the related pieces stay grouped together. Make sure every label is connected to its input.

??? question "Hint"
    The container element used for grouping is called `div`. Each `div` wraps around one label and input pair, which keeps the structure clear and makes the form easier to style later.
