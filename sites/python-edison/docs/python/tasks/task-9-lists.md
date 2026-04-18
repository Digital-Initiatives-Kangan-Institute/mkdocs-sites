# Lists

## wat
!!! abstract "Instructions"
    Fix the code below so it functions correctly.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3
    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    # beeps num times
    def beep_times(num):
        count = 0
        for x in range(num):
            Ed.PlayBeep()
            Ed.TimeWait(300, Ed.TIME_MILLISECONDS)
            

    beeps = Ed.List(4, [4, 3, 2, 1])

    # this loop will beep for the value in each list index
    for x in range(3):
        beep_times(x)
        
        Ed.PlayMyBeep(16000)
    ```