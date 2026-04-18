# For Loops
Complete the following tasks using `for` loops.

## Random Movements
!!! abstract "Instructions"
    Generate `5` random numbers between `1` and `4` (_inclusive_). Make the Edison perform a different movement / action based on the generated number:

    | Random Number | Movement / Action |
    | - | - |
    | 1 | Move forwards `10cm` |
    | 2 | Move backwards `10cm` |
    | 3 | Spin left |
    | 4 | Spin right |

## Random Guessing
!!! abstract "Instructions"
    Make a number guessing game. Generate a number between `1` and `10`. Use the `triangle` and `round` buttons for input.

    1. The Edison will generate a random number between `1` and `10`.
    2. The user will press the `triangle` button a number of times to guess the number.
    3. Pressing the `round` button will end their guess.
    4. If the user is `correct`, beep the Edison `twice`.
    5. If the user is `incorrect`, beep the Edison `once`.

## Random Beeping
!!! abstract "Instructions"
    Using the code you wrote from the previous task, use `Ed.PlayMyBeep(8000)` to beep the amount of times of the randomly generated number. You _must_ use a `for` loop for this.