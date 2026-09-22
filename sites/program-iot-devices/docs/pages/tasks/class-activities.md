# Independent Practice — IoT Programming Introduction

---

## Activity 1 — Quick Code Write: Say Hello

!!! abstract "Instructions"
    The simplest possible "write it yourself" task — no LED, no lesson notes open. Just variables, `setup()`, and Serial.

    1. Declare a `String` variable holding your own name.
    2. In `setup()`, start Serial at `115200` and print `"Hi, I'm <your name>!"` using your variable (not the text typed twice).
    3. Upload and confirm your name shows up correctly in the Serial Monitor.

    **Open this Wokwi simulation to create variable:** [https://wokwi.com/projects/470564412054187009](https://wokwi.com/projects/470564412054187009)

    **Check yourself:**
    - Program compiles and uploads
    - Serial Monitor is set to `115200` baud and shows your message
    - The name in the message comes from the variable, not typed directly into the print

??? hint "Hint — Click to expand"
    Use `Serial.print()` or `Serial.println()` to output text. Remember to put `Serial.begin(115200)` in `setup()` first.

---

## Activity 2 — Data Type Matching

!!! abstract "Instructions"
    On paper or in a shared doc, match each value below to its correct data type as fast as you can. Give yourself 3 minutes for all eight, then check your answers.

    ```
    25        22.5      "sensor"     true
    'A'       255        99999        3.14
    ```

    Types to choose from: `int`, `float`, `double`, `String`, `bool`, `char`, `byte`, `long`

??? hint "Answer key — Click to expand"
    - `25` → `int`
    - `22.5` → `float`
    - `"sensor"` → `String`
    - `true` → `bool`
    - `'A'` → `char`
    - `255` → `byte` (smallest type that fits — `int` also technically works, but `byte` is the better choice)
    - `99999` → `long`
    - `3.14` → `double`

---

## Activity 3 — Variable or Constant?

!!! abstract "Instructions"
    On paper or in a doc with two columns headed **Variable** and **Constant**.

    Sort each scenario into the correct column, and write a one-sentence reason for each:

    1. Pin number the LED is connected to
    2. Current temperature sensor reading
    3. Board's reference voltage (e.g. 3.3V)
    4. Number of times a button has been pressed
    5. Maximum PWM speed value
    6. Current value from `analogRead()`

??? hint "Answer key — Click to expand"
    - **Constant:** pin number, reference voltage, max PWM speed — these are fixed values that should never change once set.
    - **Variable:** temperature reading, button press count, `analogRead()` value — these change while the program runs.

---

## Activity 4 — Start-Up + Blink

!!! abstract "Instructions"
    Type every line yourself — no copy-pasting from the lesson notes.

    **Open this Wokwi simulation to build alongside:** [https://wokwi.com/projects/470567521110438913](https://wokwi.com/projects/470567521110438913)

    Work through these steps on your own, pausing to self-check after each one before moving to the next:

    1. Declare `ledPin` (set to `13`) and `deviceName`.
        - *Self-check: did you use a variable for the pin instead of typing `13` directly wherever it's needed?*
    2. Write `setup()` — start Serial, set pin mode, print a start-up message.
        - *Self-check: does your message print your `deviceName` variable, not typed text?*
    3. Write `loop()` — blink the LED with Serial prints for `"LED: ON"` / `"LED: OFF"`.
        - *Self-check: does the Serial Monitor output match the LED blinking in real time?*
    4. Upload and open the Serial Monitor to confirm it all works.

    **Then, on your own:** change `deviceName` to your own name and the blink interval to 250 ms. Upload and confirm.

??? hint "Hint — Click to expand"
    Use `pinMode(ledPin, OUTPUT)` in `setup()` before using `digitalWrite()`. Remember that `Serial.println()` adds a newline while `Serial.print()` does not.

---

## Activity 5 — Spot-the-Bug Worksheet

!!! abstract "Instructions"
    For each round, read the snippet, write down what's wrong **before** revealing the answer.

### Round 1

```cpp
int ledPin = 13
pinMode(ledPin, OUTPUT);
```

??? hint "Answer — Click to expand"
    Missing semicolon after `13`.

### Round 2

```cpp
void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
}
```

??? hint "Answer — Click to expand"
    Not a syntax error — `setup()` always runs first regardless of where it's written in the file, so this actually still works. The real question to ask yourself: what *would* break if `pinMode` were missing entirely?

### Round 3

```cpp
const int BUTTON_PIN = 2;
BUTTON_PIN = 3;
```

??? hint "Answer — Click to expand"
    Reassigning a `const` — this won't compile.

### Round 4

```cpp
digitalWrite(ledPin, LOW);  // Turn LED ON
```

??? hint "Answer — Click to expand"
    Comment doesn't match the code — `LOW` turns the LED off, not on.

**Self-check:** How many did you spot correctly before looking?

---

## Exit Ticket

!!! abstract "Instructions"
    Answer on paper or in a shared doc:

    1. In your own words, what's the difference between `setup()` and `loop()`?
    2. Give one example of when you'd use a **constant** instead of a **variable**.
