# Event Loop
For each of the tasks below, **copy** the code into **EdPy** and follow the instructions.

## Squares
!!! abstract "Instructions"
    Below is the code to move for one side of a square. Use the event loop to make it draw a square indefinitely.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 10)
    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 90)
    ```


## Functions & Loops
!!! abstract "Instructions"
    Using the code from earlier, move the code that creates the sides of the square into a function. Call the function from a loop.

## Beeping
!!! abstract "Instructions"
    Using the code from earlier, add to the code so that the Edison beeps at half second intervals while driving in a square.

## Flashing Lights
!!! abstract "Instructions"
    Using the code from earlier, add to the function so that the LED lights flash every 300 milliseconds.

## Alternative Flashing
!!! abstract "Instructions"
    Using the code from earlier, make the LEDs flash alternately. That is when the left light is turned on, the right is turned off, and vice-versa.

## LED Function
!!! abstract "Instructions"
    Using the code from earlier, put the code that flashes the LEDs into a function and run from the function.
