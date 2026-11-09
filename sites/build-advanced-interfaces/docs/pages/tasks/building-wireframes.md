# Building Wireframes

!!! note "Before you start"
    Read the [Wireframing](../resources/design/wireframing.md) resource, and complete the [Planning User Flows](planning-user-flows.md) task first. The wireframes in this task are built from your **Ridgeline Climbing Gym** flows.

    You can wireframe in any tool you like, or on paper. [draw.io](https://app.diagrams.net/){target="_blank"} is recommended: it's free, runs in the browser and has a **Mockups** shape library with buttons, inputs and other UI elements. [Figma](https://www.figma.com/){target="_blank"} is another good choice.

    All wireframes are **mid-fidelity**: greyscale, real labels on headings and buttons, images as boxes with an X.

## Screen Inventory

!!! abstract "Instructions"
    Go through **every** Ridgeline user flow you drew and work out the full list of screens the app needs, counting each screen **once**.

    For each screen, decide:

    - the **route** it will live at, such as `/classes`
    - **who can see it**: anyone, logged-in climbers, or staff only
    - the **key content and controls** it needs, including every action from your flows that happens on it

??? question "Hint"
    Several of your flows probably share screens, such as the log in page and the timetable. Count each one only once.

    A single class has its own detail screen, but there are many classes. How could one route handle all of them? Think about how you would name a **dynamic route**.

## Mobile Wireframes: Booking a Class

!!! abstract "Instructions"
    Wireframe **every screen** in your "Book a Class" happy path flow at **mobile** size (a `375px` wide frame).

    Your wireframes should:

    - use the same header and navigation on every screen
    - show the timetable filter for beginner, intermediate and advanced
    - show the day, time, level and spots left for each class
    - include a visible button, link or input for **every** user action in your happy path flow
    - make the primary action on each screen obvious

??? question "Hint"
    The timetable is the most important screen in the app, so start there. What does a climber need to see to choose a class quickly? Which of those details matters most, and how will you make it stand out?

    How will the level filter work on a narrow screen? Consider tabs, a dropdown, or a row of chips. Which suits three options best?

??? tip "Hint - Click to expand"
    Build one class card first, then copy it for the rest. Most tools let you group shapes together so they move and copy as one.

## Desktop Wireframes

!!! abstract "Instructions"
    Wireframe the **timetable** screen at **desktop** size (a `1280px` wide frame).

    Add an annotation explaining what changed from the mobile version and why.

??? question "Hint"
    A desktop screen is more than three times wider than a phone. What will you do with the extra space? What happens to the navigation now that there is room for every link?

## Screen States

!!! abstract "Instructions"
    Draw these extra states:

    - **Timetable:** empty, when no classes match the filter
    - **Class Detail:** the class is full, so it can't be booked
    - **My Bookings:** empty, when the climber has no upcoming bookings

??? question "Hint"
    Look at the decision diamonds in your flows. Each one is a clue to a state you need.

    For each empty state, ask: what does the user need to know, and what should they do next? A button that helps them move on is better than a message on its own.

## Staff Screen

!!! abstract "Instructions"
    Wireframe the staff **add a class** form at desktop size, in its default state and in an **error state** showing what happens when it is filled in incorrectly.

??? question "Hint"
    Which input type suits each field? Think about a date, a time, a choice from a fixed list of levels, and a number. Where should each error message appear so the staff member knows exactly which field to fix?

## Annotate and Link

!!! abstract "Instructions"
    Add **numbered annotations** to at least **two** screens, explaining behaviour that can't be seen in the layout.

    Then link your mobile booking wireframes together into a **clickable prototype**, so each button that moves to another screen takes you there when clicked. Click through the happy path to check it works.

??? question "Hint"
    Rules from the brief make good annotations. What happens when a class reaches 10 people? Who is allowed to add classes?

??? tip "Hint - Click to expand"
    In draw.io, right-click a shape and choose **Edit Link** to link it to another page. In Figma, use the **Prototype** tab to connect frames.

## Review Against the Brief

!!! abstract "Instructions"
    Open your user flows and your wireframes side by side. Follow each flow step by step and find the matching screen and control in your wireframes.

    Check that:

    - every screen from your screen inventory has a wireframe
    - every user action in your flows has a visible button, link or input
    - every decision in your flows has a matching state, message or redirect
    - every requirement in the brief is shown on a screen or in an annotation

    Fix any gaps. If you find a screen that is missing from your flows, **add it to the flow too**.

??? question "Hint"
    Check the decisions you added to the booking flow. Logging in and creating an account both need screens that are easy to forget, because they aren't part of the happy path.

## A Second Scenario

!!! abstract "Instructions"
    Using your **Harbour Street Food Market** flows from the [Planning User Flows](planning-user-flows.md) task:

    - wireframe every screen in the customer ordering flow at **mobile** size
    - show how a **sold-out** item looks on the menu
    - wireframe the stall owner's orders screen at **desktop** size

??? question "Hint"
    A sold-out item still has to appear on the menu. How will you show that it can't be added, so the customer isn't left tapping a button that does nothing?

    Stall owners are busy cooking. On the orders screen, what is the most important information about each order, and how big should the "Ready" button be?
