# Digital Output and Functions — In-Class Task

---

## Build the LED Circuit

!!! abstract "Instructions"
    Build the LED circuit and write a program that blinks it using a function.

    **Components required:**

    - ESP32-S3 development board
    - 1 × LED
    - 1 × 220 Ω resistor
    - Jumper wires
    - Breadboard

    **Requirements:**

    - Wire the LED to GPIO13 through the 220 Ω resistor.
    - Write a function that blinks the LED, and call it from `loop()`.
    - Give the function parameters so it can blink at different speeds.
    - Write a function that turns the LED on or off and returns its new state, and print that state to the Serial Monitor.

    **Check yourself:**

    - LED is wired to GPIO13 through the 220 Ω resistor
    - A parameterised function controls the blink speed, called from `loop()`
    - A second function returns the LED's new state and it's printed to the Serial Monitor

### Guided Questions

Answer these in your own words before moving on:

1. Why does the LED behave the same whether the blink logic is in `loop()` directly or inside a function?
2. What does `pinMode` do, and why do we only call it once, in `setup()`?
3. Why does a function need parameters if you want it to blink at different speeds?
4. Why does a function need a return type other than `void` if you want it to report back the LED's new state?

---

## Spot-the-Bug Worksheet

!!! abstract "Instructions"
    For each round, read the snippet and write down what's wrong **before** revealing the answer.

**Round 1:**

```cpp
void blinkLED() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}

void loop() {
  blinkLED;
}
```

??? hint "Answer — Click to expand"
    Missing parentheses when calling the function — it must be `blinkLED();`, not `blinkLED;`.

**Round 2:**

```cpp
void blinkLED(int pin, int onTime) {
  digitalWrite(pin, HIGH);
  delay(onTime);
  digitalWrite(pin, LOW);
  delay(onTime);
}

void loop() {
  blinkLED(13);
}
```

??? hint "Answer — Click to expand"
    `blinkLED` expects two arguments (`pin` and `onTime`), but only one was passed in — this won't compile.

**Round 3:**

```cpp
void blinkLED() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
  return true;
}
```

??? hint "Answer — Click to expand"
    `blinkLED()` is declared as `void`, meaning it shouldn't return a value — `return true;` won't compile. A `void` function can only use a bare `return;` (or no `return` at all).

**Round 4:**

```cpp
int ledPin = 13;

void blinkLED() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  blinkLED();
}
```

??? hint "Answer — Click to expand"
    `pinMode(ledPin, OUTPUT)` is missing from `setup()` — the code compiles and uploads, but the LED won't behave as an output correctly.

**Round 5:**

```cpp
void blinkLED(int pin, int onTime) {
  digitalWrite(pin, HIGH);
  delay(onTime);
  digitalWrite(pin, LOW);
  delay(onTime);
}

void loop() {
  blinkLED(500, 13);
}
```

??? hint "Answer — Click to expand"
    The arguments are in the wrong order — `pin` comes first and `onTime` second, but this call passes `500` as the pin and `13` as the delay. It compiles fine, but tries to blink pin 500 for 13 ms instead of blinking pin 13 for 500 ms.

**Round 6:**

```cpp
bool controlLED(bool turnOn) {
  digitalWrite(LED_PIN, turnOn);
}

void loop() {
  bool ledState = controlLED(true);
  Serial.println(ledState);
}
```

??? hint "Answer — Click to expand"
    `controlLED` is declared to return a `bool`, but it never uses a `return` statement — it needs `return turnOn;` at the end, otherwise `ledState` won't reliably hold the value it's meant to.

**Round 7:**

```cpp
void blinkLED(int pin, int onTime) {
  digitalWrite(pin, HIGH);
  delay(onTime);
  digitalWrite(pin, LOW);
  delay(onTime);
}

void loop() {
  blinkLed(13, 500);
}
```

??? hint "Answer — Click to expand"
    The function name is spelled `blinkLED` (capital LED) but called as `blinkLed` — C++ is case-sensitive, so this won't compile: `blinkLed` was never declared.

**Self-check:** How many did you spot correctly before looking?
