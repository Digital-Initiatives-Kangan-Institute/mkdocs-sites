# Functions, Parameters, Returns
For each of the tasks below, **copy** the code into **EdPy** and follow the instructions.

## Functions
!!! abstract "Instructions"
    Call the beeping function so that the Edison beeps 5 times.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    # beeping(num) will beep 'num' times
    def beeping(num):
        for i in range(num):
            Ed.PlayBeep()
            Ed.TimeWait(500, Ed.TIME_MILLISECONDS)

    # call the beeping function to make Edison beep 5 times    
    beeping(5)
    ```

## Parameters
!!! abstract "Instructions"
    Modify the code below so that the function is complete and working.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    # moves Edison forward by the parameter distance
    def move_forward():
        Ed.Drive(Ed.FORWARD, Ed.SPEED_3, distance)
        
    move_forward(5)
    ```

## Returns
!!! abstract "Instructions"
    Complete the code below as stated in the comments.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    # this function returns a number from one to six
    def get_number():
        return Ed.Random(1, 6)
        

    # beeping(num) will beep 'num' times
    def beeping(num):
        for i in range(num):
            Ed.PlayBeep()
            Ed.TimeWait(500, Ed.TIME_MILLISECONDS)

    #---------------
    # run get_number() and use the returned value in the beeping(num) function
    ```