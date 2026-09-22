# Reading Inputs and Selection — In-Class Task

---

## Two-Button LED Control System

!!! abstract "Instructions"
    Build a two-button LED control system that reads digital inputs and uses `if / else if / else` to decide what to do.

    **Scenario:** A small control panel has a red button and a green button. Pressing the red button should light the red LED only; pressing the green button should light the green LED only; if neither is pressed, both LEDs stay off.

    **Components required:**

    - ESP32-S3 development board
    - 2 × push buttons
    - 2 × LEDs (red, green)
    - 2 × 220 Ω resistors
    - Jumper wires

    **Wiring:**

    ```mermaid
    flowchart LR
        ESP32["ESP32-S3"]

        ESP32 -- GPIO4 --- RedButton["Red Button"]
        RedButton --- GND1["GND"]

        ESP32 -- GPIO5 --- GreenButton["Green Button"]
        GreenButton --- GND2["GND"]

        ESP32 -- GPIO6 --- R1["220 Ω Resistor"]
        R1 --- RedAnode["Red LED Anode (+)"]
        RedAnode --- RedCathode["Red LED Cathode (−)"]
        RedCathode --- GND3["GND"]

        ESP32 -- GPIO13 --- R2["220 Ω Resistor"]
        R2 --- GreenAnode["Green LED Anode (+)"]
        GreenAnode --- GreenCathode["Green LED Cathode (−)"]
        GreenCathode --- GND4["GND"]
    ```

    **Requirements:**

    - Configure both buttons as `INPUT_PULLUP` and both LEDs as `OUTPUT`.
    - Read both buttons every loop with `digitalRead()`.
    - Use `if / else if / else` so exactly one outcome happens per loop: red pressed → red LED on, green off; green pressed → green LED on, red off; neither pressed → both off.
    - Print which branch ran to the Serial Monitor.
    - Add a short `delay()` after each reading to debounce the buttons.

    **Open this Wokwi simulation:** [https://wokwi.com/projects/472054525585822721](https://wokwi.com/projects/472054525585822721)

### Questions

Answer these in your own words before moving on:

1. Why does `INPUT_PULLUP` make "pressed" read `LOW` instead of `HIGH`?
2. What would go wrong if you checked the two buttons using two separate `if` statements instead of one `if / else if`?
3. Why does adding `delay(50)` after reading a button count as debouncing?
4. In `if / else if / else`, if both buttons happened to read `LOW` at the same instant, which branch would run, and why?

---

## Spot-the-Bug Worksheet

!!! abstract "Instructions"
    For each round, read the snippet and write down what's wrong **before** revealing the answer.

**Round 1:**

```cpp
void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState = LOW) {
    digitalWrite(LED_PIN, HIGH);
  }
}
```

??? hint "Answer — Click to expand"
    `=` is assignment, not comparison — this sets `buttonState` to `LOW` (always true) instead of checking it. It should be `if (buttonState == LOW)`.

**Round 2:**

```cpp
void setup() {
  pinMode(BUTTON_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    digitalWrite(LED_PIN, HIGH);
  }
}
```

??? hint "Answer — Click to expand"
    `BUTTON_PIN` is set to plain `INPUT` instead of `INPUT_PULLUP` — with nothing holding the pin HIGH when released, it floats and gives unreliable readings instead of reliably reading LOW only when pressed.

**Round 3:**

```cpp
void loop() {
  int redButton = digitalRead(redButtonPin);
  int greenButton = digitalRead(greenButtonPin);

  if (redButton == LOW) {
    digitalWrite(redLED, HIGH);
  }
  if (greenButton == LOW) {
    digitalWrite(greenLED, HIGH);
  }
}
```

??? hint "Answer — Click to expand"
    Neither LED is ever turned back `LOW` when its button is released — there's no `else` branch, so once a button is pressed its LED stays on forever.

**Round 4:**

```cpp
void loop() {
  int motionDetected = digitalRead(PIR_PIN);
  bool afterHours = true;

  if (motionDetected == HIGH || afterHours) {
    digitalWrite(BUZZER_PIN, HIGH);
  } else {
    digitalWrite(BUZZER_PIN, LOW);
  }
}
```

??? hint "Answer — Click to expand"
    Using `||` (OR) means the buzzer sounds if *either* condition is true — since `afterHours` is always `true` here, the buzzer fires constantly regardless of motion. The scenario calls for both conditions together, so it should be `&&` (AND).

**Round 5:**

```cpp
void loop() {
  int temperature = analogRead(TEMP_PIN);

  if (temperature > 0) {
    Serial.println("Cold");
  } else if (temperature > 20) {
    Serial.println("Warm");
  } else if (temperature > 35) {
    Serial.println("Hot");
  }
}
```

??? hint "Answer — Click to expand"
    The conditions are ordered broadest-first — `temperature > 0` matches almost every reading, so the `"Warm"` and `"Hot"` branches can never be reached. The most specific/narrow condition should be checked first.

**Round 6:**

```cpp
void loop() {
  int potValue = analogRead(potPin);
  int brightness = map(potValue, 0, 4095, 0, 255);
  digitalWrite(ledPin, brightness);
}
```

??? hint "Answer — Click to expand"
    `digitalWrite()` only accepts `HIGH` or `LOW` — a variable brightness value needs `analogWrite(ledPin, brightness)` to produce PWM output.
