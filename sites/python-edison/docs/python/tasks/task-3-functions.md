# Functions
For each of the tasks below, **copy** the code into **EdPy** and follow the instructions.

## Beeping
!!! abstract "Instructions"
    Complete the code below so that the Edison beeps 3 times.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed
    Ed.EdisonVersion = Ed.V3
    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    def beep_three():
        Ed.PlayBeep()
        Ed.TimeWait(500, Ed.TIME_MILLISECONDS)
        Ed.PlayBeep()
        Ed.TimeWait(500, Ed.TIME_MILLISECONDS)
        Ed.PlayBeep()
        Ed.TimeWait(500, Ed.TIME_MILLISECONDS)
    ```

## Run Function
!!! abstract "Instructions"
    Complete the code below so that it executes the function as intended.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    def drive_square():
        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 90)
        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 90)
        
    drive_square()
    ```

## Triangles
!!! abstract "Instructions"
    Fix the code below to draw two triangles.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    def triangle():
        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 15)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 120)
        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 15)
        
    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 120)
    Ed.Drive(Ed.FORWARD, Ed.SPEED_3, 15)
    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_3, 120)

    triangle()
    triangle()
    ```

## Drawing a Square
!!! abstract "Instructions"
    Create a function called `forward_left()`.  This functions moves the Edison 10cm forwards and then spins to the left 90 degrees. 

    Create a second function called `draw_square()`. Draw square will use `forward_left()` to draw a square. 

    Make the Edison travel in a square. 