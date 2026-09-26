# Task 4 - Tables and Forms

## Task 1 - Tables

### Basic Table

!!! abstract "Instructions"
    **Using VS Code**, create a table with:

    - 2 column headings
    - 2 rows of data

    Use the following data:

    | Name | Department |
    |------|------|
    | Alex | IT |
    | Sam | Design |


??? question "Hint"
    Use:

    ```
    - `<table>` for the table
    - `<tr>` for rows
    - `<th>` for headings
    - `<td>` for data cells
    ```

### Timetable

!!! abstract "Instructions"
    **Using VS Code**, create a timetable with:

    - 2 column headings
    - 2 rows of data

??? question "Hint"
    The first row should usually contain heading cells using `<th>`.

## Task 2 - Forms

### Simple Login Form

!!! abstract "Instructions"
    **Using VS Code**, create a form containing:

    - an email input
    - a password input
    - a login button

??? question "Hint"
    Use the `type` attribute to change the behaviour of each `<input>` element.

### Feedback Form

!!! abstract "Instructions"
    **Using VS Code**, create a form containing:

    - a name input
    - an email input
    - a text input for feedback
    - a submit button

??? question "Hint"
    Use `<label>` elements to describe each input field.

### Checkbox Form

!!! abstract "Instructions"
    **Using VS Code**, create a form with:

    - 3 checkbox options
    - a submit button

??? question "Hint"
    Checkbox inputs use:

    ```html
    <input type="checkbox">
    ```

## Choice Form

!!! abstract "Instructions"
    **Using VS Code**, create a form that asks the user to pick one option from a group.

    Your form must contain:

    - a question (for example, preferred contact method)
    - 3 radio options the user can choose between
    - a submit button

??? question "Hint"
    Radio inputs use `<input type="radio">`. To make the options behave as a single group where only one can be selected, each input in the group shares the same `name` attribute value.

## Booking Form

!!! abstract "Instructions"
    **Using VS Code**, create a booking form containing:

    - a name input
    - a date input for the booking day
    - a number input for the number of guests
    - a submit button
    - a label describing each input

??? question "Hint"
    The `type` attribute changes the behaviour of each `<input>` element — two of the types you need are named in this exercise's requirements. Each `<label>` sits next to the input it describes.

## Grouped Login Form

!!! abstract "Instructions"
    **Using VS Code**, rebuild the Simple Login Form from earlier in this task, but better organised.

    This repeats the same email input, password input, and login button — but this time wrap each label and input pair inside its own container element so the related pieces stay grouped together.

??? question "Hint"
    The container element used for grouping is called `div`. Each `div` wraps around one label and input pair, which keeps the structure clear and makes the form easier to style later.
