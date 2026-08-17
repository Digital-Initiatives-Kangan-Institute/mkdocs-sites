# Arduino Digital Output and Functions

## Key Concepts

**Digital Output** sends HIGH (on) or LOW (off) signals from a microcontroller to devices like LEDs, buzzers, and displays.

**Functions** are reusable code blocks that avoid repetition and improve organization. This guide covers:

- **Built-in functions**: `pinMode()`, `digitalWrite()`, `delay()`
- **User-defined functions**: created by programmers for specific tasks
- **Parameters**: allow functions to behave differently based on input values
- **Return values**: functions can send results back to calling code

## Practical Components

### LED
Emits light when current flows through it correctly (anode to cathode). Requires a current-limiting resistor to prevent burnout.

![LED Component](../../assets/week-2/LED.png)

### RGB LED
Three independent LEDs (red, green, blue) that mix colors through additive color mixing. Can be common cathode or common anode configuration.

![RGB LED Component](../../assets/week-2/RGB.png)

### Buzzer
Converts electrical energy to sound vibration. Active buzzers have fixed pitch; passive buzzers require frequency control via `tone()`.

![Buzzer Component](../../assets/week-2/buzzer.png)

### OLED Display (SSD1306)
Screen with individually live pixels, communicating via I²C protocol using just two wires (SDA/SCL). Requires `Adafruit_SSD1306` and `Adafruit_GFX` libraries.

![OLED Display Component](../../assets/week-2/OLED.png)

## Key Limitation

!!! warning "Blocking Operations"
    `delay()` pauses the program for a specified number of milliseconds, but causes blocking—the microcontroller cannot perform other tasks during the pause.
