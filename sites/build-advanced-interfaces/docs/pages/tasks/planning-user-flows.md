# Planning User Flows

!!! note "Before you start"
    Read the [User Flow Diagrams](../resources/design/user-flow-diagrams.md) resource first.

    You can draw your flows in any diagramming tool, or on paper. [draw.io](https://app.diagrams.net/){target="_blank"} is recommended: it's free, runs in the browser and has all of the flowchart shapes you need. Keep your Ridgeline flows handy, as you'll use them again in the [Building Wireframes](building-wireframes.md) task.

## The Scenario

!!! quote "Client brief: Ridgeline Climbing Gym"
    Hi, we're Ridgeline, an indoor rock climbing gym. Right now people book our classes by phone, so we'd like a simple web app to handle it.

    People should be able to see our class timetable and filter it by level: beginner, intermediate or advanced. Each class shows the day, time, level and how many spots are left.

    You need an account to book a class. Classes have a maximum of 10 people, so once a class is full nobody else can book it.

    Climbers should be able to see their upcoming bookings and cancel one if their plans change.

    Our staff need to log in to add new classes to the timetable.

## Users and Goals

!!! abstract "Instructions"
    Read the Ridgeline brief and identify each type of user and what they need to do.

    - identify the **two** types of user
    - think of the **goals** each one has, phrased as user stories: "As a ..., I want to ... so that ..."

    Each goal you find here becomes a user flow in the exercises below.

??? question "Hint"
    Look for every word in the brief that describes a **person**. One type of user books classes. Who else uses the app, and what do they need to do?

## Happy Path: Booking a Class

!!! abstract "Instructions"
    Draw the **happy path** for this goal: a climber who is **already logged in** books a **beginner** class that **has spots left**.

    Your diagram should:

    - start with an oval and end with an oval once the booking is confirmed
    - use rectangles for screens and rounded rectangles for user actions
    - include the step where the user filters the timetable
    - include a small legend explaining your shapes

    There should be **no decisions** in this diagram. It is the path where everything goes right.

??? question "Hint"
    Picture yourself using the app on your phone. Which screen do you see first, and what do you tap to filter it? After you book, how does the app tell you it worked?

    Alternate between screens and actions: a screen, then what the user does on it, then the next screen.

## Adding Decisions

!!! abstract "Instructions"
    Make a copy of your happy path and add decisions so it also handles these situations:

    - the user is not logged in
    - the user doesn't have an account yet
    - the class is full

    Each decision should be a diamond with a yes or no question, and each arrow leaving a diamond should be labelled. There should be **no dead ends**.

??? question "Hint"
    For each situation, ask **"at which step would the app first know about this?"** Does the app need to know whether someone is logged in before they can look at the timetable, or only when they try to book?

    After a user logs in or creates an account, should they start again from the timetable, or carry on booking the class they picked?

## Cancelling a Booking

!!! abstract "Instructions"
    Draw the flow for a climber cancelling one of their upcoming bookings. Include a confirmation step, so a booking can't be cancelled by accident.

??? question "Hint"
    Where does the climber go to find their bookings? What should happen if they tap Cancel and then change their mind at the confirmation step?

## Adding a Class

!!! abstract "Instructions"
    Draw the flow for a staff member logging in and adding a new class to the timetable. Include what happens when the form is filled in incorrectly.

??? question "Hint"
    What information does a class need before it can appear on the timetable? Look back at what the brief says each class shows. What should the staff member see if they leave something out?

## Review Your Flows

!!! abstract "Instructions"
    Look over your flows with a classmate and talk through each other's work using the checklist below. Fix any issues you find in your own flows.

    - every flow has a start, at least one end, and a legend
    - every decision is a yes or no question with labelled arrows
    - there are no dead ends
    - screens use real page names, and actions use specific verbs
    - every requirement in the brief appears somewhere in a flow

??? question "Hint"
    Go through the brief one sentence at a time and point to where each requirement appears in the flows. Any sentence you can't point to is a missing step or decision.

## A Second Scenario

!!! abstract "Instructions"
    Repeat the process on your own for this client:

    - identify the users and their goals
    - draw the flow for a customer placing an order, including any decisions
    - draw the flow for a stall owner marking an order as ready

    !!! quote "Client brief: Harbour Street Food Market"
        We run a weekend street food market and the queues get really long, so we'd like an app where customers can order ahead.

        Customers should be able to pick a stall, look at its menu and add items to a cart. They don't need an account, but they must enter their name and mobile number when they order so we can text them when their food is ready.

        Some items sell out during the day. Sold-out items should still show on the menu, but they can't be added to the cart.

        Stall owners log in to see their orders and mark an order as ready, which sends the customer the text.

??? question "Hint"
    Where in the customer's flow could something stop them? Think about what happens when they try to add a sold-out item, and what happens if they forget to enter their mobile number.
