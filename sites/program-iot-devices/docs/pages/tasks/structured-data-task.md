# Structured Data — In-Class Task

---

## Non-blocking Motion-Event Logger

!!! abstract "Instructions"
    Build a non-blocking motion-event logger that stores every detected event as a struct record kept sorted by timestamp, shows how many events have been logged on an LED, and looks up a per-zone alert threshold by name from a small key-value struct table.

    **Scenario:** A workshop bench station watches a PIR sensor covering one named zone ("bench"). Each time motion is newly detected (not on every pass while it stays present), the event is logged as one struct record — a timestamp and a simulated intensity reading taken from a potentiometer at that instant — inserted so the log always stays in timestamp order. An LED lights whenever the zone's logged intensity exceeds an alert threshold looked up by the zone's name from a small table, rather than a hard-coded number. A button lets staff print the full log to Serial on demand.

    **Components required:**

    - ESP32-S3 development board
    - 1 × PIR sensor
    - 1 × potentiometer
    - 1 × push button (`INPUT_PULLUP`) — print log on demand
    - 1 × LED (alert indicator)
    - 1 × 220 Ω resistor
    - Jumper wires, breadboard

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO3 --- PIR["PIR Sensor"]
        PIR --- GND1["GND"]

        ESP32 -- GPIO1 --- Pot["Potentiometer Wiper"]

        ESP32 -- GPIO5 --- Btn["Print Button"]
        Btn --- GND2["GND"]

        ESP32 -- GPIO9 --- R1["220 Ω Resistor"]
        R1 --- Anode1["Alert LED Anode (+)"]
        Anode1 --- Cathode1["Alert LED Cathode (−)"]
        Cathode1 --- GND3["GND"]
    ```

    **Requirements:**

    - Define `struct Event { unsigned long timestamp; int intensity; };` and declare `const int MAX_EVENTS = 10;`, `Event events[MAX_EVENTS];`, and `int event_count`.
    - Edge-detect the PIR reading (track a `lastMotionState`) so a new event is logged only on the transition from no-motion to motion — not on every pass while motion continues.
    - On a newly detected event: read the potentiometer, call `log_event()` to build one `Event` record with `millis()` and the reading, append it (guarded against exceeding `MAX_EVENTS`), then run an insertion step that swaps the whole record leftward past any earlier event with a **larger** timestamp — the log must stay sorted by timestamp after every single insert, not re-sorted from scratch.
    - Define `struct ZoneThreshold { String zone; int limit; };` and a small table (at least one entry, `{"bench", <a chosen limit>}`). Write `int get_threshold(String zone)` that linearly searches the table and returns the matching `limit`, or `-1` if the zone isn't found.
    - In `loop()`, light the alert LED whenever the most recently logged event's `intensity` exceeds `get_threshold("bench")` — check the sentinel before trusting the lookup.
    - Edge-detect the button so a fresh press calls `print_log()`, printing every stored event's `timestamp` and `intensity` in order.
    - Do not use `delay()` anywhere in `loop()` — the PIR and button must both be read every single pass.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/473961269590110209](https://wokwi.com/projects/473961269590110209)

### Questions

- Why does `log_event()` need to hold the newly-built `Event` record in a temporary variable before the insertion loop, rather than writing straight into `events[event_count]` and shifting other records around it?
- What would happen to the logged data if the PIR reading were used directly (`if (motionDetected)`) instead of edge-detected against `lastMotionState`?
- Why does `get_threshold()` need to return a sentinel value like `-1` for an unrecognised zone name, rather than just returning `0`?
- Why does `log_event()` need to check `event_count` against `MAX_EVENTS` before writing, rather than trusting the array is always big enough?
- In `print_log()`, why does the loop condition need to be `i < event_count` rather than `i < MAX_EVENTS`?
- Why can't `delay()`-based code be used anywhere in this program's `loop()`?

---

## Spot-the-Bug Worksheet

!!! abstract "Instructions"
    For each round, read the snippet and write down what's wrong **before** revealing the answer.

**Round 1:**

```cpp
struct Event {
  unsigned long timestamp;
  int intensity;
}

Event events[MAX_EVENTS];
```

??? hint "Answer — Click to expand"
    The struct definition is missing its trailing semicolon after the closing brace. `struct Event { ... };` needs a `;` immediately after `}` — without it, the compiler fails trying to parse what follows as part of the same declaration.

**Round 2:**

```cpp
struct ZoneThreshold {
  String zone;
  int limit;
};

int get_threshold(String zone) {
  for (int i = 0; i < NUM_ZONES; i++) {
    if (thresholds[i].zone == zone) {
      return thresholds[i].limit;
    }
  }
}
```

??? hint "Answer — Click to expand"
    There's no `return` after the loop for the case where no zone matches — the function falls off the end without a defined sentinel value, so callers have nothing reliable to check for "zone not found." It needs a `return -1;` (or similar sentinel) after the loop.

**Round 3:**

```cpp
void loop() {
  bool motionDetected = digitalRead(pirPin) == HIGH;

  if (motionDetected) {
    log_event();
  }
}
```

??? hint "Answer — Click to expand"
    There's no edge detection — `log_event()` is called on *every single pass* of `loop()` for as long as motion stays detected, flooding the array with dozens of near-identical entries for what was really one event, and quickly exhausting `MAX_EVENTS`. It needs to compare against a stored `lastMotionState` and only log on the rising edge.

**Round 4:**

```cpp
void log_event(unsigned long t, int intensity) {
  events[event_count] = {t, intensity};
  event_count++;

  int i = event_count - 1;
  while (i > 0 && events[i - 1].timestamp > events[i].timestamp) {
    events[i] = events[i - 1];
    i--;
  }
}
```

??? hint "Answer — Click to expand"
    There's no check against `MAX_EVENTS` before writing to `events[event_count]`. Once `event_count` reaches the array's capacity, this writes past the end of the array — a guard such as `if (event_count >= MAX_EVENTS) return;` is needed at the top of the function.

**Round 5:**

```cpp
struct Event {
  unsigned long timestamp;
  int intensity;
};

Event a = {1000, 512};
Event b = {1000, 512};

if (a == b) {
  Serial.println("Duplicate event");
}
```

??? hint "Answer — Click to expand"
    C++ does not automatically define `==` for a user-defined struct — comparing two struct variables directly with `==` does not compile (or does not compare field values as intended) unless `operator==` is explicitly written for that struct. Each field needs to be compared individually instead: `if (a.timestamp == b.timestamp && a.intensity == b.intensity)`.

**Round 6:**

```cpp
int get_threshold(String zone) {
  for (int i = 0; i <= NUM_ZONES; i++) {
    if (thresholds[i].zone == zone) return thresholds[i].limit;
  }
  return -1;
}
```

??? hint "Answer — Click to expand"
    The loop condition should be `i < NUM_ZONES`, not `i <= NUM_ZONES`. As written, the loop also checks `thresholds[NUM_ZONES]` — one slot past the end of the array — which is out of bounds.

**Round 7:**

```cpp
void print_log() {
  for (int i = 0; i < event_count; i++) {
    Serial.print(events[i].timestamp);
    Serial.print(" ");
    Serial.println(events[i].limit);
  }
}
```

??? hint "Answer — Click to expand"
    `events[i]` is an `Event`, whose fields are `timestamp` and `intensity` — it has no `limit` field (that field belongs to the unrelated `ZoneThreshold` struct). This is a compile error, and the fix is to print `events[i].intensity` instead.
