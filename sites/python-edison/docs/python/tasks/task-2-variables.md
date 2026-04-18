# Task 2 - Variables
For each of the tasks below, **copy** the code into **EdPy** and follow the instructions.

## Fixing Code
!!! abstract "Instructions"
    The code below doesn't quite work. Add a variable to line 12 to make it work.

??? example "Code - Click to expand"
    ```py
    #-------------Setup----------------

    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    length = 10

    Ed.Drive(Ed.FORWARD, speed, length)
    import Ed


    Ed.EdisonVersion = Ed.V3
    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    song=Ed.TuneString(23, "c4,d6,e7,g4,f2")


    while True: 
        Ed.PlayBeep() 
        Ed.LeftLed(Ed.OFF) 
        Ed.RightLed(Ed.ON) 
        
    #    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 350) 
    #    Ed.TimeWait(20, Ed.TIME_MILLISECONDS) 
    #    Ed.PlayBeep() 
    #    Ed.LeftLed(Ed.ON) 
    #    Ed.RightLed(Ed.OFF) 
    #    Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 350) 
    #    Ed.TimeWait(20, Ed.TIME_MILLISECONDS) 
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 90)
        Ed.PlayBeep()  
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep()  
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
    ```

??? tip "Hint - Click to expand"
    The name of the variable has to match something on line 13.

## Variable Names
!!! abstract "Instructions"
    Complete the code below. Read the code and use the variable names to determine what to do:

??? example "Code - Click to expand"
    ```py
    import Ed

    Ed.EdisonVersion = Ed.V3

    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM
    #--------Your code below-----------

    length_1 = 9
    length_2 = 5
    length_3 = length_1 + length_2

    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, sum)
    Ed.TimeWait(length_2, Ed.TIME_SECONDS)
    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, difference)
    Ed.TimeWait(length_2, Ed.TIME_SECONDS)
    Ed.Drive(Ed.FORWARD, Ed.SPEED_5, product)
    import Ed

    Ed.EdisonVersion = Ed.V3
    Ed.DistanceUnits = Ed.CM
    Ed.Tempo = Ed.TEMPO_MEDIUM

    #--------Your code below-----------

    song=Ed.TuneString(23, "c4,d6,e7,g4,f2")


    while True: 
        Ed.PlayBeep() 
        Ed.LeftLed(Ed.OFF) 
        Ed.RightLed(Ed.ON) 
        
    #    Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 350) 
    #    Ed.TimeWait(20, Ed.TIME_MILLISECONDS) 
    #    Ed.PlayBeep() 
    #    Ed.LeftLed(Ed.ON) 
    #    Ed.RightLed(Ed.OFF) 
    #    Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 350) 
    #    Ed.TimeWait(20, Ed.TIME_MILLISECONDS) 
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_LEFT, Ed.SPEED_5, 90)
        Ed.PlayBeep()  
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 20)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep() 
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
        Ed.Drive(Ed.FORWARD, 10, 10)
        Ed.Drive(Ed.SPIN_RIGHT, Ed.SPEED_5, 90)
        Ed.PlayBeep()  
        Ed.PlayTune(song)
    #    while Ed.ReadMusicEnd() == Ed.MUSIC_NOT_FINISHED:
    #        pass
    ```

## Square Driving
!!! abstract "Instructions"
    Using variables to set the `length`, `angle` and `speed` – create a program that moves the Edison in a _square_.