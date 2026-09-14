# Structured Data Activity

---

## Task 1 — LED Sequence Driven by an Array of `Step` Structs

!!! abstract "Instructions"
    **Scenario:** A control panel's LED sequence needs per-step timing — some LEDs should flash briefly, others should hold longer — so a plain pin array (which assumes every step has the same duration) is no longer enough. Pair each pin with its own duration in one record.

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

    Define `struct Step { int pin; int duration; };` and declare `Step sequence[4] = {{4,100},{5,200},{6,100},{7,400}};`. Write `run_sequence()` using a `for` loop over `sequence` that turns each step's LED on for its own `duration` (using `.pin` and `.duration`, not a second array), then off, before moving to the next. `setup()` must configure every pin as `OUTPUT` using a `for` loop over `sequence` — no pin number may appear hard-coded outside the struct array.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473652460611573761](https://wokwi.com/projects/473652460611573761)

    **Check yourself:**

    - `Step` struct has exactly `pin` and `duration` fields, and the trailing semicolon after the struct definition is present
    - `sequence` is declared as an array of `Step`, not two parallel arrays
    - `run_sequence()` reads each step's own duration via `.duration` — steps are not all the same length
    - `setup()` configures pins with a `for` loop over `sequence`, not hard-coded `pinMode()` calls

---

## Task 2 — Logging DHT22 Readings as an Array of `Reading` Structs

!!! abstract "Instructions"
    **Scenario:** A greenhouse log needs each temperature/humidity capture labelled with what it is, not just a bare number — a printed list of unlabelled floats is useless a day later.

    **Components:** ESP32-S3 development board, DHT22 sensor, 10 kΩ resistor, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO4 --- DATA["DHT22 DATA"]
        DATA --- R["10 kΩ Resistor"]
        R --- V33["3.3V"]
    ```

    Define `struct Reading { String sensor; float value; String unit; };`. Declare `const int NUM_READINGS = 6;` and `Reading readings[NUM_READINGS];`. In `setup()`, alternate calls to `dht.readTemperature()` and `dht.readHumidity()` (2000 ms apart, guarded with `isnan()` — retry the same slot on a failed read) to fill the array, storing `"temperature"`/`"C"` or `"humidity"`/`"%"` in each record's `sensor`/`unit` fields alongside its `value`. Print every stored record afterwards using its field names, not index numbers, in the output text.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473956741868447745](https://wokwi.com/projects/473956741868447745)

    **Check yourself:**

    - `Reading` struct groups `sensor`, `value`, and `unit` together as named fields
    - A failed `isnan()` read is retried into the same slot, not counted as a stored reading
    - The printed output shows each record's `sensor` name and `unit`, not just a bare number
    - Exactly `NUM_READINGS` valid records end up stored, alternating temperature and humidity

---

## Task 3 — Min, Max and Average Over a Struct Array's `value` Field

!!! abstract "Instructions"
    **Scenario:** A workshop needs the minimum, maximum, and average of a burst of potentiometer readings — but each stored record must still carry a label, so the scan needs to reach *into* each struct's `value` field rather than scanning a bare array of numbers.

    **Components:** ESP32-S3 development board, potentiometer, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO1 --- Pot["Potentiometer Wiper"]
    ```

    Reuse `struct Reading { String sensor; float value; String unit; };` from Task 2. Declare `const int NUM_READINGS = 10;` and `Reading readings[NUM_READINGS];`. In `setup()`, use a `for` loop to fill the array: each iteration builds one record with `sensor = "pot"`, `value = analogRead(potPin)`, `unit = "raw"`, waiting 300 ms between samples. After the capture loop, use a **single** `for` loop to compute the minimum, maximum, and running sum of `readings[i].value` together — initialise `minVal`/`maxVal` from `readings[0].value`, not `0`. Print all three results.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473955613809115137](https://wokwi.com/projects/473955613809115137)

    **Check yourself:**

    - `readings[]` is an array of `Reading` structs, each one built with `sensor`/`value`/`unit` set together
    - `minVal`/`maxVal` are initialised from `readings[0].value`, not `0`
    - A single `for` loop computes min, max, and sum by reading `readings[i].value` each pass
    - The average uses floating-point division

---

## Task 4 — Insertion Sort: Keeping a Struct Log Ordered by Timestamp on Every Insert

!!! abstract "Instructions"
    **Scenario:** A bench logger must always display its potentiometer readings in time order as they're logged — sorting the whole array from scratch after every single button press wastes work when only the newest entry could ever be out of place.

    **Components:** ESP32-S3 development board, potentiometer, 1× push button (`INPUT_PULLUP`), jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO1 --- Pot["Potentiometer Wiper"]

        ESP32 -- GPIO4 --- LogBtn["Log Button"]
        LogBtn --- GND1["GND"]
    ```

    Define `struct Reading { unsigned long timestamp; int value; };`. Declare `const int MAX_READINGS = 15;`, `Reading readings[MAX_READINGS];`, and `int reading_count`. Edge-detect the button (a fresh press, not held) to call `log_reading()`: append `{millis(), analogRead(potPin)}` at `readings[reading_count]`, guarded against overflowing `MAX_READINGS`, increment `reading_count`, then run an insertion step — a `while` loop that swaps the new record left past any earlier record with a **larger** timestamp — so the array stays sorted by `timestamp` after every single insert. Print the full log after each press.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473961662656267265](https://wokwi.com/projects/473961662656267265)

    **Check yourself:**

    - Each button press (edge-detected) appends exactly one new record, guarded against exceeding `MAX_READINGS`
    - The insertion step swaps the whole `Reading` struct (both fields together) — never just the timestamp or just the value
    - The `while` loop stops as soon as the new record's correct position is found, not after checking every entry
    - Printing the log after several presses always shows ascending timestamp order

---

## Task 5 — Simulated Dictionary: Looking Up a Per-Sensor Threshold by Name

!!! abstract "Instructions"
    **Scenario:** A monitoring bench needs to look up an alarm threshold by sensor name (`"temperature"`, `"humidity"`, `"light"`) rather than by a numeric index staff would have to memorise — a small name-keyed lookup table, searched by name instead of position.

    **Components:** ESP32-S3 development board, potentiometer (used to simulate a selectable sensor reading), LED (alarm indicator), 220 Ω resistor, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO1 --- Pot["Potentiometer Wiper"]

        ESP32 -- GPIO5 --- R1["220 Ω Resistor"]
        R1 --- Anode1["Alarm LED Anode (+)"]
        Anode1 --- Cathode1["Alarm LED Cathode (−)"]
        Cathode1 --- GND1["GND"]
    ```

    Define `struct Threshold { String sensor; float limit; };` and declare a `const int NUM_THRESHOLDS = 3;` array initialised with at least `{"temperature", 700.0}`, `{"humidity", 500.0}`, `{"light", 300.0}` (raw ADC-scale placeholder limits). Write `float get_threshold(String sensor)` that linearly searches the array and returns the matching `limit`, or `-1.0` if no entry matches. In `loop()`, read the potentiometer, look up `get_threshold("temperature")`, and light the alarm LED whenever the reading exceeds it. Also call `get_threshold("pressure")` (a sensor **not** in the table) once in `setup()` and print a clear "not found" message when the sentinel comes back — don't let a missing key silently pass through as a usable number.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473958323838595073](https://wokwi.com/projects/473958323838595073)

    **Check yourself:**

    - `Threshold` struct pairs a `String` key with a numeric `limit`
    - `get_threshold()` walks the array with a `for` loop comparing `.sensor` to the requested key
    - A key that isn't in the table returns the sentinel (`-1.0`), and the caller explicitly checks for it before using the result
    - The alarm LED lights only when the potentiometer reading exceeds the looked-up threshold

---

## Task 6 — Melody Playback From an Array of `Note` Structs

!!! abstract "Instructions"
    **Scenario:** A simple alert tune needs to be defined as data, not as a long sequence of individually hard-coded `tone()`/`delay()` calls — so adding or changing a note later means editing one array entry, not restructuring the whole function.

    **Components:** ESP32-S3 development board, passive buzzer, jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO8 --- Buzzer["Passive Buzzer +"]
        Buzzer --- GND1["GND"]
    ```

    Define `struct Note { int frequency; int duration; };` and declare a `Note melody[5]` array of your choosing (frequencies in Hz, durations in ms — at least one repeated frequency to show it's data-driven, not five unique hard-coded calls). Write `play_melody()` using a `for` loop over `melody` that calls `tone(buzzerPin, melody[i].frequency, melody[i].duration)` then waits `melody[i].duration + 50` ms (a short gap) before the next note, and finishes with `noTone(buzzerPin)`. Trigger `play_melody()` once from `setup()`.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/471515514429761537](https://wokwi.com/projects/471515514429761537)

    **Check yourself:**

    - `Note` struct groups `frequency` and `duration` together as one record
    - `melody[]` is declared as data (an array of `Note`), not five separate `tone()` calls written out by hand
    - `play_melody()` uses a `for` loop reading `.frequency`/`.duration` from each element
    - `noTone()` is called once the loop finishes, and `tone()`/`noTone()` are used — never `digitalWrite()` — on the passive buzzer

---

## Task 7 — Non-blocking Struct-Based Logging Station With Threshold Lookup

!!! abstract "Instructions"
    **Scenario:** Build a bench monitoring station: pressing a Log button records the current potentiometer reading as a sorted, timestamped struct record and flashes a confirmation LED; the OLED always shows the running count, min, max, and average of the log, plus whether the latest reading is above or below a name-looked-up alarm threshold. Nothing may block — the button must be read every single pass, even mid-flash.

    **Components:** ESP32-S3 development board, potentiometer, 1× push button (`INPUT_PULLUP`), 1× LED (confirmation/alarm flash), 1× 220 Ω resistor, SSD1306 OLED display (128×64, I²C), jumper wires.

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO1 --- Pot["Potentiometer Wiper"]

        ESP32 -- GPIO4 --- LogBtn["Log Button"]
        LogBtn --- GND1["GND"]

        ESP32 -- GPIO10 --- R1["220 Ω Resistor"]
        R1 --- Anode1["LED Anode (+)"]
        Anode1 --- Cathode1["LED Cathode (−)"]
        Cathode1 --- GND2["GND"]

        ESP32 -- GPIO8 --- OLEDSDA["OLED SDA"]
        ESP32 -- GPIO9 --- OLEDSCL["OLED SCL"]
        OLEDSDA --- OLED["SSD1306 OLED"]
        OLEDSCL --- OLED
        OLED --- GND3["GND"]
    ```

    **Program requirements — this task combines every concept from this week with the non-blocking pattern and single-pass scan from previous weeks:**

    1. **Struct log:** `struct Reading { unsigned long timestamp; int value; };`, stored in `Reading readings[MAX_READINGS]` with `reading_count`, guarded against overflow.
    2. **Insertion sort on insert:** `log_reading()` appends the new record then bubbles it left by timestamp, as in Task 4 — never a full re-sort.
    3. **Single-pass scan:** `compute_stats()` recalculates min, max, and average over `readings[i].value` in one `for` loop (as in Task 3), called after every new log.
    4. **Threshold lookup:** a `Threshold thresholds[]` key-value struct array (as in Task 5) and `get_threshold("pot")` returning the alarm limit for this station.
    5. **Non-blocking confirmation/alarm flash:** `start_flash()` turns the LED on and records `millis()`; `update_flash()` — called every pass — turns it off once 150 ms have elapsed. No `delay()`.
    6. **Display:** `update_display()` shows count, min, max, average, and whether the latest reading is above or below the looked-up threshold. Redraws on change, or at least every 2000 ms heartbeat.
    7. The button is edge-detected and read every pass, independent of the flash or display timing.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473962280394557441](https://wokwi.com/projects/473962280394557441)

    **Check yourself:**

    - Every logged reading is one `Reading` struct appended and then insertion-sorted by timestamp, guarded against exceeding `MAX_READINGS`
    - `compute_stats()` scans `readings[i].value` in a single pass, initialised from `readings[0].value`
    - `get_threshold()` returns a sentinel for an unknown key, and the caller checks it before using the result
    - The confirmation/alarm LED uses `millis()` (not `delay()`), turning off after 150 ms
    - The OLED shows count/min/max/average and the threshold comparison, redrawing on change or at least every 2000 ms
    - The button is still readable — and a fresh press still registers — while the flash is active

---

## Task 8 — Spot-the-Bug Worksheet (Extension)

!!! abstract "Instructions"
    For each round, read the snippet and write down what's wrong **before** revealing the answer.

**Round 1:**

```cpp
struct Reading {
  String sensor;
  float value;
}

Reading r = {"temperature", 23.6};
```

??? hint "Answer — Click to expand"
    The struct definition is missing its trailing semicolon after the closing brace — `struct Reading { ... };` needs a `;` right after `}`. Without it, the compiler treats what follows as part of the same declaration and fails to compile.

**Round 2:**

```cpp
struct Reading {
  String sensor;
  float value;
  String unit;
};

Reading r = {23.6, "temperature", "C"};
```

??? hint "Answer — Click to expand"
    The initializer list's values are in the wrong order for the declared field order (`sensor`, then `value`, then `unit`). As written, `r.sensor` ends up holding `23.6` converted to a string-like value and `r.value` ends up holding `"temperature"` — the fields are filled positionally, not by matching type or name, so the initializer values must be listed in the exact same order the struct declares its fields.

**Round 3:**

```cpp
struct Reading {
  unsigned long timestamp;
  int value;
};

Reading readings[10];
int reading_count = 0;

void log_reading(unsigned long t, int v) {
  readings[reading_count].timestamp = t;
  readings[reading_count].value = v;
}
```

??? hint "Answer — Click to expand"
    `reading_count` is never incremented inside `log_reading()` — every call overwrites index 0's fields instead of appending a new record. It needs `reading_count++;` after both fields are stored.

**Round 4:**

```cpp
float get_threshold(String sensor) {
  for (int i = 0; i < NUM_THRESHOLDS; i++) {
    if (thresholds[i].sensor == sensor) {
      return thresholds[i].limit;
    }
  }
}

void loop() {
  float t = get_threshold("pressure");   // "pressure" is not in the table
  if (analogRead(potPin) > t) {
    digitalWrite(alarmPin, HIGH);
  }
}
```

??? hint "Answer — Click to expand"
    `get_threshold()` has no `return` for the "not found" case — if the loop finishes without a match, the function falls off the end without returning a defined sentinel value, so the caller has nothing reliable to check and the comparison against `t` uses garbage. It needs a sentinel `return -1.0;` after the loop, and the caller must check for it (e.g. `if (t < 0) { ...handle missing key... }`) before using it in the alarm comparison.

**Round 5:**

```cpp
struct Reading {
  unsigned long timestamp;
  int value;
};

Reading readings[MAX_READINGS];
int reading_count = 0;

void log_reading(unsigned long t, int v) {
  if (reading_count >= MAX_READINGS) return;
  readings[reading_count] = {t, v};
  reading_count++;

  int i = reading_count - 1;
  while (i > 0 && readings[i - 1].timestamp > readings[i].timestamp) {
    readings[i] = readings[i - 1];
    i--;
  }
}
```

??? hint "Answer — Click to expand"
    Inside the insertion-sort `while` loop, only `readings[i] = readings[i - 1]` is assigned — the original new record (which was sitting at the starting index before the loop began) is never saved into a temporary first, so it's overwritten and effectively lost as soon as the first swap happens, rather than being placed into its correct final slot. The new record needs to be held in a temporary `Reading` variable before the loop, and written into place (`readings[i] = temp;`) once the loop finds where it belongs.

**Round 6:**

```cpp
struct Reading {
  String sensor;
  float value;
};

Reading a = {"temperature", 23.6};
Reading b = {"temperature", 23.6};

if (a == b) {
  Serial.println("Readings match");
}
```

??? hint "Answer — Click to expand"
    C++ does not automatically generate an `==` comparison for a user-defined struct — comparing two struct variables directly with `==` is a compile error (or, in some setups, compares raw memory rather than field values) unless `operator==` is explicitly defined for that struct. Each field must be compared individually instead, e.g. `if (a.sensor == b.sensor && a.value == b.value)`.

**Round 7:**

```cpp
struct Threshold {
  String sensor;
  float limit;
};

const int NUM_THRESHOLDS = 3;
Threshold thresholds[NUM_THRESHOLDS] = {
  {"temperature", 28.0},
  {"humidity", 70.0},
};
```

??? hint "Answer — Click to expand"
    The array is declared to hold 3 elements (`NUM_THRESHOLDS = 3`) but only 2 are initialised. The third element, `thresholds[2]`, is default-constructed (an empty `String` key and `0.0` limit) rather than a real entry — a search for a valid sensor name will never match it, but it silently occupies a slot and could be mistaken for real data if the array is looped over blindly. Either add the missing third entry or set `NUM_THRESHOLDS` to match the number of entries actually provided.

---

## Questions

Answer these in your own words before moving on:

1. What is the advantage of a `struct` record over two parallel arrays holding the same data, in terms of the bugs it makes impossible?
2. Why does a struct definition need a trailing semicolon after its closing brace, when a function definition does not?
3. Why is a linear search over a small key-value struct array an acceptable stand-in for a dictionary on a microcontroller, when it would not scale well for a table of thousands of entries?
4. Why must a lookup function like `get_threshold()` return a sentinel value for "not found," and what must every caller do with that return value before using it?
5. In an insertion sort performed on every new record, why does only the newly-inserted record ever need to move, rather than re-checking the whole array?
6. Why can't two struct variables be compared directly with `==` in C++ the way two `int` variables can?
