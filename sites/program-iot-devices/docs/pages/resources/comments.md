# Comments

---

## Why Use Comments?

Comments are notes written **for humans** — the compiler ignores them completely. They don't affect how your program runs or how much memory it uses.

Comments help you and others **understand** your code. Without them, even your own code becomes confusing after a few weeks:

![Side-by-side comparison showing the benefit of comments in code](../../assets/image-4.png)

### Main reasons to use comments:

| Reason | Example |
|--------|---------|
| Explain **why** something is done | `// Wait 2 sec for sensor to stabilise` |
| Describe your **project** at the top | `// Smart fan that turns on above 30°C` |
| Label **pin connections** | `// Pin 9 → fan motor via transistor` |
| Explain **formulas** | `// TMP36 formula: C = (V - 0.5) * 100` |
| Temporarily **disable** code for testing | `// digitalWrite(LED, HIGH);` |

---

## Two Types of Comments

### Single-Line Comment `//`

Everything after `//` on that line is ignored:

```cpp
// This entire line is a comment
int ledPin = 13;   // This part after // is a comment, the code before it still runs
```

### Multi-Line Comment `/* */`

Everything between `/*` and `*/` is ignored — can span many lines:

```cpp
/* This is a
   multi-line comment.
   It can span as many lines as you need.
   Great for longer explanations. */
```

**Comparison:**

| | Single-Line `//` | Multi-Line `/* */` |
|--|---|---|
| **Syntax** | `// comment` | `/* comment */` |
| **Spans multiple lines?** | No — one line only | Yes |
| **Best for** | Short notes next to code | Project headers, long explanations |
| **Can be nested?** | Yes | No — `/* /* */ */` causes an error |

---

## Using Comments to Disable Code (Commenting Out)

A very useful technique — instead of **deleting** code you're not sure about, you "comment it out" to temporarily disable it. The compiler **skips** anything inside a comment, so the code is turned off but still there — you can bring it back instantly by removing the comment markers.

**How it works:**

```cpp
// This line runs:
digitalWrite(LED, HIGH);

// This line does NOT run (it's commented out):
// digitalWrite(LED, LOW);
```

### When to use commenting out:

| Situation | What to do |
|-----------|------------|
| **Debugging** — find which line causes a bug | Comment out lines one by one until the bug disappears |
| **Testing** — try different approaches | Comment out version A, uncomment version B |
| **Save code for later** | Keep old code as reference while trying something new |

**Debugging example:**

Your LED isn't working. Comment out sections to isolate the problem:

```cpp
void loop() {
    int val = 12;

    // Step 1: Comment out everything, test just the LED
    digitalWrite(LED, HIGH);
    delay(500);
    digitalWrite(LED, LOW);
    delay(500);

    // Step 2: If LED works above, uncomment these one by one to find the bug
    // if (val > 500) {
    //     digitalWrite(LED, HIGH);
    // } else {
    //     digitalWrite(LED, LOW);
    // }
}
```

If the LED blinks in Step 1, the wiring is fine — the bug is in your `if` logic.

> **Tip:** In the IDE, you can quickly comment/uncomment selected lines with the shortcut **Ctrl + /** (Windows) or **Cmd + /** (Mac).

---

## Comment Best Practices

Follow these rules to write comments that are actually **helpful**, not just clutter:

### 1. Explain WHY, not WHAT

The code already shows *what* it does. Your comment should explain *why* it does it:

```cpp
// ✗ BAD — states the obvious (we can already see i + 1)
i = i + 1;  // Add 1 to i

// ✓ GOOD — explains the purpose
i = i + 1;  // Move to next sensor in the array
```

```cpp
// ✗ BAD — repeats the code
delay(2000);  // delay 2000 milliseconds

// ✓ GOOD — explains the reason
delay(2000);  // wait for sensor to stabilise after power-on
```

### 2. Comment complex formulas

If someone can't understand a line just by reading it, add a comment:

```cpp
// ✓ GOOD — you won't remember this formula next week
float celsius = (voltage - 0.5) * 100;  // TMP36 sensor formula: C = (V - 0.5) * 100

// ✓ GOOD — explains a non-obvious calculation
int distance = duration * 0.034 / 2;  // speed of sound = 0.034 cm/μs, divide by 2 for round trip
```

### 3. Label pin assignments at the top

Group all pin definitions together with comments describing the physical wiring:

```cpp
// ✓ GOOD — easy to see wiring at a glance
const int LED_RED   = 3;   // Red LED — RGB module pin 1
const int LED_GREEN = 5;   // Green LED — RGB module pin 2
const int LED_BLUE  = 6;   // Blue LED — RGB module pin 3
const int BUZZER    = 8;   // Piezo buzzer — positive leg
const int TEMP_SENSOR = A0; // TMP36 — middle pin (Vout)
```

### 4. Use section dividers for long sketches

Organise your code into labeled sections so it's easy to navigate:

```cpp
// ===== PIN DEFINITIONS =====
const int LED_PIN = 13;
const int BUTTON_PIN = 2;

// ===== GLOBAL VARIABLES =====
int buttonCount = 0;
bool ledState = false;

// ===== SETUP =====
void setup() { ... }

// ===== MAIN LOOP =====
void loop() { ... }

// ===== HELPER FUNCTIONS =====
void blinkLED() { ... }
void readSensor() { ... }
```

### 5. Don't over-comment obvious code

Too many comments are just as bad as no comments — they create clutter and make code harder to read:

```cpp
// ✗ BAD — every line doesn't need a comment
int x = 5;           // set x to 5
pinMode(13, OUTPUT);  // set pin 13 as output
delay(1000);          // wait 1000 milliseconds

// ✓ GOOD — comment only what adds value
int retryCount = 5;               // max retries before giving up
pinMode(BUZZER_PIN, OUTPUT);
delay(1000);                       // allow sensor warm-up time
```

### 6. Keep comments up to date

When you change code, update the comments too. Wrong comments are worse than no comments:

```cpp
// ✗ BAD — comment says pin 13 but code uses pin 9
int ledPin = 9;  // LED connected to pin 13

// ✓ GOOD — comment matches the code
int ledPin = 9;  // LED connected to pin 9
```

### 7. Use TODO comments for unfinished work

Mark things you plan to fix or add later so you don't forget:

```cpp
// TODO: add error handling for sensor disconnect
float temp = readTemperature();

// TODO: replace delay with millis() for non-blocking timing
delay(1000);
```
