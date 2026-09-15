# Lists, Arrays and Loops Activity

---

## Task 1 — LED Chaser Using an Array and a For Loop

!!! abstract "Instructions"
    **Scenario:** A control panel needs a 4-LED "chaser" light — a sweeping indicator like a loading bar — driven entirely by an array of pin numbers and a `for` loop, so adding a fifth LED later means changing the array, not rewriting the sequence logic.

    **Components:** ESP32-S3 development board, 4× LED, 4× 220 Ω resistor, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO4 --- R1["220 Ω Resistor"]
        R1 --- Anode1["LED 1 Anode (+)"]
        Anode1 --- Cathode1["LED 1 Cathode (−)"]
        Cathode1 --- GND1["GND"]

        ESP32 -- GPIO5 --- R2["220 Ω Resistor"]
        R2 --- Anode2["LED 2 Anode (+)"]
        Anode2 --- Cathode2["LED 2 Cathode (−)"]
        Cathode2 --- GND2["GND"]

        ESP32 -- GPIO6 --- R3["220 Ω Resistor"]
        R3 --- Anode3["LED 3 Anode (+)"]
        Anode3 --- Cathode3["LED 3 Cathode (−)"]
        Cathode3 --- GND3["GND"]

        ESP32 -- GPIO7 --- R4["220 Ω Resistor"]
        R4 --- Anode4["LED 4 Anode (+)"]
        Anode4 --- Cathode4["LED 4 Cathode (−)"]
        Cathode4 --- GND4["GND"]
    ```

    Declare `const int ledPins[4] = {4, 5, 6, 7};` and `const unsigned long STEP_INTERVAL = 150;`. Track `int currentIndex = 0`, `int direction = 1`, and `unsigned long previousStepMillis = 0`. Write `led_chaser()` so that every `STEP_INTERVAL` ms — checked with `millis()`, never `delay()` — it turns off the LED at `currentIndex`, then, if `currentIndex + direction` would fall outside the array (below `0` or above `3`), flips `direction` between `1` and `-1` before advancing `currentIndex` by `direction` and turning that LED on. This makes the chaser sweep to one end of the array, reverse, sweep back to the other end, and keep bouncing back and forth continuously rather than restarting from index 0 every cycle. Call `led_chaser()` from `loop()` every pass — the `millis()` check inside it decides when a step actually happens. `setup()` must still use a `for` loop over `ledPins` to configure every pin as `OUTPUT` — no pin number should appear hard-coded anywhere outside the array.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473652460611573761](https://wokwi.com/projects/473652460611573761)

    **Check yourself:**

    - No `delay()` anywhere; stepping is timed with `millis()` and `STEP_INTERVAL`
    - Exactly one LED is lit at any moment
    - Reaching either end of `ledPins[]` reverses `direction`, so the chaser bounces back and forth instead of restarting from index 0
    - No pin number is hard-coded anywhere outside `ledPins[]`

---

## Task 2 — Burst-Sampling a Button Panel

!!! abstract "Instructions"
    **Scenario:** A workshop wants to quickly test a panel of 3 buttons at once. For each button in turn, the board should read it 10 times in rapid succession and print the whole burst — a first, brute-force look at how "noisy" each switch's signal actually is before worrying about doing anything smarter with it.

    **Components:** ESP32-S3 development board, 3× push button (`INPUT_PULLUP`), jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO12 --- Btn1["Button 1"]
        Btn1 --- GND1["GND"]

        ESP32 -- GPIO13 --- Btn2["Button 2"]
        Btn2 --- GND2["GND"]

        ESP32 -- GPIO14 --- Btn3["Button 3"]
        Btn3 --- GND3["GND"]
    ```

    Declare `const int buttonPins[3] = {12, 13, 14};` and `const int MAX_READINGS = 10;`, with a reusable `int readings[MAX_READINGS];` and `int reading_count`. Write `capture_all_buttons()` with an **outer** `for` loop that walks each button in `buttonPins[]`, and an **inner** `for` loop that bursts-samples the current button 10 times (5 ms apart), resetting `reading_count` to 0 at the start of every button and storing each sample at `readings[reading_count]` before incrementing it. After each button's inner loop finishes, print all `reading_count` captured samples for that button, labelled with its pin number. Call `capture_all_buttons()` from `loop()`, with a 2-second gap between full sweeps.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473651805811447809](https://wokwi.com/projects/473651805811447809)

---

## Task 3 — Debouncing a Single Button, Properly

!!! abstract "Instructions"
    **Scenario:** A single button controls one LED, but a plain `digitalRead()` check makes the LED flicker unpredictably the instant the button is pressed or released — the mechanical contacts are bouncing. Fix it using the "wait for the reading to settle" technique, not by taking a burst of samples.

    **Components:** ESP32-S3 development board, 1× push button (`INPUT_PULLUP`), 1× LED, 1× 220 Ω resistor, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO4 --- Btn["Button"]
        Btn --- GND1["GND"]

        ESP32 -- GPIO5 --- R1["220 Ω Resistor"]
        R1 --- Anode1["LED Anode (+)"]
        Anode1 --- Cathode1["LED Cathode (−)"]
        Cathode1 --- GND2["GND"]
    ```

    Track three pieces of state: `int lastButtonReading` (the raw `digitalRead()` from the previous pass), `unsigned long debounceStart` (when that raw reading last changed), and `int buttonState` (the debounced, trusted state). On every pass of `loop()`: read the pin; if the raw reading differs from `lastButtonReading`, record `millis()` into `debounceStart`. Separately, if `millis() - debounceStart` has exceeded `DEBOUNCE_TIME` (50 ms) **and** the raw reading differs from `buttonState`, update `buttonState` and toggle the LED only on that transition. Update `lastButtonReading` at the end of every pass. No `delay()` anywhere.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473653428507075585](https://wokwi.com/projects/473653428507075585)

    **Check yourself:**

    - `debounceStart` is reset every time the *raw* reading changes, not every pass
    - The LED only toggles once the reading has stayed stable for `DEBOUNCE_TIME`, and only on a genuine change of `buttonState`
    - `millis()` is used for all timing; there is no `delay()` anywhere in `loop()`
    - Pressing and releasing the button quickly toggles the LED cleanly once per press, with no flicker

---

## Task 4 — Parallel Arrays: Debounced Button/LED Pairs, Non-Blocking Cycles

!!! abstract "Instructions"
    **Scenario:** Extend Task 3's debounce technique across 3 independent button/LED pairs at once, and wrap the whole check in a repeating, non-blocking test cycle — so one button bouncing never delays reading the other two, and nothing in the program ever blocks.

    **Components:** ESP32-S3 development board, 3× push button (`INPUT_PULLUP`), 3× LED, 3× 220 Ω resistor, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO12 --- Btn1["Button 1"]
        Btn1 --- GND1["GND"]
        ESP32 -- GPIO4 --- R1["220 Ω Resistor"]
        R1 --- Anode1["LED 1 Anode (+)"]
        Anode1 --- Cathode1["LED 1 Cathode (−)"]
        Cathode1 --- GND2["GND"]

        ESP32 -- GPIO13 --- Btn2["Button 2"]
        Btn2 --- GND3["GND"]
        ESP32 -- GPIO5 --- R2["220 Ω Resistor"]
        R2 --- Anode2["LED 2 Anode (+)"]
        Anode2 --- Cathode2["LED 2 Cathode (−)"]
        Cathode2 --- GND4["GND"]

        ESP32 -- GPIO14 --- Btn3["Button 3"]
        Btn3 --- GND5["GND"]
        ESP32 -- GPIO6 --- R3["220 Ω Resistor"]
        R3 --- Anode3["LED 3 Anode (+)"]
        Anode3 --- Cathode3["LED 3 Cathode (−)"]
        Cathode3 --- GND6["GND"]
    ```

    Declare parallel arrays `const int buttonPins[3] = {12, 13, 14};` and `const int ledPins[3] = {4, 5, 6};` — index `i` pairs one button with one LED. Give each pair its own debounce state using per-index arrays: `int lastButtonReading[3]`, `unsigned long debounceStart[3]`, and `bool buttonState[3]`, following exactly the same per-button logic as Task 3 but inside a `for` loop over all 3 pairs. Whenever a pair's debounced state changes to pressed, drive its matching LED on (and off on release). Wrap the whole check in a `millis()`-gated timer (`CYCLE_INTERVAL = 1000`) so a full pass over all 3 pairs happens once a second, not every single loop iteration — but keep the debounce timing itself checked every pass, independent of the cycle gate.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473326289925248001](https://wokwi.com/projects/473326289925248001)

    **Check yourself:**

    - `buttonPins[]` and `ledPins[]` are parallel arrays — index `i` always refers to the same pair in both
    - Each pair has its own debounce state (`lastButtonReading[i]`, `debounceStart[i]`, `buttonState[i]`), not one shared set of variables
    - Debouncing one pair never delays or blocks debouncing the others
    - No `delay()` anywhere; the cycle gate uses `millis()` and `CYCLE_INTERVAL`

---

## Task 5 — Arrays: A Two-Song Melody Selector

!!! abstract "Instructions"
    **Scenario:** Build a simple 2-button music box: pressing Button 1 or Button 2 plays a different short tune on a buzzer, note by note, without blocking the rest of the program. Each song's notes and their durations live in a 2-D array, one row per song.

    **Components:** ESP32-S3 development board, 2× push button (`INPUT_PULLUP`), 1× passive buzzer, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO12 --- Btn1["Button 1"]
        Btn1 --- GND1["GND"]

        ESP32 -- GPIO13 --- Btn2["Button 2"]
        Btn2 --- GND2["GND"]

        ESP32 -- GPIO7 --- Buzzer["Passive Buzzer"]
        Buzzer --- GND3["GND"]
    ```

    Declare `const int NUM_SONGS = 2;` and `const int NUM_NOTES = 8;`, then `int melodies[NUM_SONGS][NUM_NOTES]` and `int noteDurations[NUM_SONGS][NUM_NOTES]` holding two short 8-note tunes of your choosing (use named note constants like `NOTE_C4 = 262`, not raw frequency numbers). Track `int currentSong`, `int currentNote`, `bool songPlaying`, and `unsigned long noteStartTime`. On a plain `digitalRead()` press of either button (debouncing isn't the focus here — that's Task 6), start that song: set `currentSong`, reset `currentNote` to 0, and call `tone()` for the first note. In `loop()`, use `millis()` to check whether the current note's duration has elapsed; if so, move to `melodies[currentSong][currentNote]` for the next note (`currentNote++`), or stop the buzzer once `currentNote` reaches `NUM_NOTES`. No `delay()` — the buttons must stay readable while a song plays.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473653874488503297](https://wokwi.com/projects/473653874488503297)

    **Check yourself:**

    - `melodies[][]` and `noteDurations[][]` are indexed consistently as `[song][note]` everywhere
    - The correct song's row is selected by `currentSong`, and playback advances through `currentNote` from 0 up to (not including) `NUM_NOTES`
    - Note timing uses `millis()`, not `delay()` — both buttons are still readable while a song plays
    - Pressing the other button mid-song correctly switches to the new song

---

## Task 6 — Combine: Debounced Two-Song Melody Selector

!!! abstract "Instructions"
    **Scenario:** Task 5's plain button reads occasionally restart a song twice from one press, or miss a press entirely — switch bounce again. Fix it by adding Task 3's proper debounce technique, now as per-button arrays sized for the 2 buttons (as in Task 4), so a song only ever starts on a genuine, settled press.

    **Components:** Same as Task 5.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO12 --- Btn1["Button 1"]
        Btn1 --- GND1["GND"]

        ESP32 -- GPIO13 --- Btn2["Button 2"]
        Btn2 --- GND2["GND"]

        ESP32 -- GPIO7 --- Buzzer["Passive Buzzer"]
        Buzzer --- GND3["GND"]
    ```

    Add `int lastButtonReading[2]`, `unsigned long debounceStart[2]`, and `int buttonState[2]` — one entry per button. Replace Task 5's plain `digitalRead()` checks with the settle-based debounce logic from Task 3/4, applied in a `for` loop over both buttons. Only call `startSong(button)` when a button's debounced state has just transitioned to pressed — never on a raw, unsettled reading.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473653874488503297](https://wokwi.com/projects/473653874488503297)

    **Check yourself:**

    - Debounce state (`lastButtonReading[]`, `debounceStart[]`, `buttonState[]`) is a separate array entry per button, not shared
    - `startSong()` is only called on a debounced press-edge, never on every raw `LOW` reading
    - The melody playback logic from Task 5 (note timing via `millis()`) is unchanged
    - Rapidly pressing a button doesn't restart or glitch the song mid-press

---

## Task 7 — Spot-the-Bug Worksheet (Extension)

!!! abstract "Instructions"
    For each round, read the snippet and write down what's wrong **before** revealing the answer.

**Round 1:**

```cpp
const int MAX_READINGS = 10;
int readings[MAX_READINGS];

void capture_burst() {
  for (int i = 0; i <= MAX_READINGS; i++) {
    readings[i] = digitalRead(buttonPin);
    delay(5);
  }
}
```

??? hint "Answer — Click to expand"
    The condition should be `i < MAX_READINGS`, not `i <= MAX_READINGS`. As written, the loop runs 11 times against a 10-element array, so `readings[10]` writes one slot past the end of the array — undefined behaviour that can silently corrupt nearby memory.

**Round 2:**

```cpp
int reading_count = 0;
int readings[10];

void capture_burst() {
  for (int i = 0; i < 10; i++) {
    readings[reading_count] = digitalRead(buttonPin);
    delay(5);
  }
}
```

??? hint "Answer — Click to expand"
    `reading_count` is never incremented inside the loop — every iteration overwrites index 0 instead of filling the array. It needs `reading_count++;` after each sample is stored.

**Round 3:**

```cpp
int lastButtonReading = HIGH;
unsigned long debounceStart = 0;

void loop() {
  int reading = digitalRead(buttonPin);
  debounceStart = millis();

  if (millis() - debounceStart >= 50 && reading != buttonState) {
    buttonState = reading;
  }
  lastButtonReading = reading;
}
```

??? hint "Answer — Click to expand"
    `debounceStart` is reset to `millis()` on *every* pass, not only when the raw reading actually changes — so `millis() - debounceStart` is always close to 0 and the 50 ms settle check can never pass. It should only update `debounceStart` inside an `if (reading != lastButtonReading)` check.

**Round 4:**

```cpp
const int buttonPins[3] = {12, 13, 14};
const int ledPins[3] = {4, 5, 6};

void update_pairs() {
  for (int i = 0; i < 3; i++) {
    bool pressed = digitalRead(buttonPins[i]) == LOW;
    digitalWrite(ledPins[0], pressed);
  }
}
```

??? hint "Answer — Click to expand"
    `ledPins[0]` is hard-coded inside the loop instead of using the loop's own index `i`. As written, every button's state overwrites the same LED (LED 1), and LEDs 2 and 3 never respond to their matching buttons. It should be `digitalWrite(ledPins[i], pressed);`.

**Round 5:**

```cpp
const int NUM_SONGS = 2;
const int NUM_NOTES = 8;
int melodies[NUM_SONGS][NUM_NOTES];

void set_note(int note, int song, int frequency) {
  melodies[note][song] = frequency;
}
```

??? hint "Answer — Click to expand"
    `melodies` was declared `[NUM_SONGS][NUM_NOTES]` — song first, note second — but `set_note()` writes `melodies[note][song]`, the axes reversed. Since `NUM_SONGS` is only 2, any `note` value of 2 or higher used as the first index writes out of bounds. It needs to match the declared order: `melodies[song][note] = frequency;`.

**Round 6:**

```cpp
const int NUM_BUTTONS = 4;
int debounceStart[NUM_BUTTONS];
int buttonState[NUM_BUTTONS];

void setup() {
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);
  }
}
```

??? hint "Answer — Click to expand"
    `debounceStart[]` should be `unsigned long`, not `int` — it's meant to hold the return value of `millis()`, which is an `unsigned long` that overflows a plain `int` after about 24 days of uptime (and can already exceed `int`'s range much sooner). Comparisons like `millis() - debounceStart[i]` will silently misbehave once that happens.

**Round 7:**

```cpp
void update_cycle() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousCycleMillis >= CYCLE_INTERVAL) {
    for (int i = 0; i < NUM_PAIRS; i++) {
      buttonStates[i] = digitalRead(buttonPins[i]) == LOW;
      digitalWrite(ledPins[i], buttonStates[i]);
    }
  }
}
```

??? hint "Answer — Click to expand"
    `previousCycleMillis` is never updated inside the `if` block. Once the interval first elapses, `currentMillis - previousCycleMillis` keeps growing and stays past `CYCLE_INTERVAL` forever, so the block runs on *every single pass* from then on instead of once per interval. It needs `previousCycleMillis = currentMillis;` inside the `if`.

---

## Questions

Answer these in your own words before moving on:

1. Why does a `for` loop over a collection need `i < count` rather than `i <= count`, when `count` is the number of items currently stored (not the array's declared capacity)?
2. Why must `buttonPins[]` and `ledPins[]` (or any pair of parallel arrays) always be read and written at the same index, rather than one array's index ever drifting from the other's?
3. Task 2 debounces by burst-sampling; Task 3 onward debounces by waiting for the reading to settle. What's the practical downside of the burst-sampling approach that the settle-based one avoids?
4. In a 2-D array like `melodies[NUM_SONGS][NUM_NOTES]`, why does the order of the two indices matter, even though `melodies[song][note]` and `melodies[note][song]` would allocate the same total amount of memory?
5. Why does giving each button its own entry in a debounce array (rather than one shared set of debounce variables) matter once there's more than one button to read?
6. Why is an array's size fixed at declaration in C++, and what problem does keeping a separate counter like `reading_count` (distinct from the array's declared capacity) solve?
