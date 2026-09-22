# Glossary
| Term | Meaning |
|---|---|
| AC / DC | Alternating Current (periodically reverses direction, mains power) vs. Direct Current (constant polarity, batteries, USB, and every microcontroller's internal supply) |
| ADC | Analogue-to-Digital Converter, hardware that turns a continuous voltage into a discrete number (resolution varies by chip: 10-bit/0–1023 on AVR, 12-bit/0–4095 on ESP32 and RP2040) |
| Arc flash | An explosive electrical discharge across an air gap, a real mains-voltage hazard |
| AVR | The 8-bit microcontroller architecture used in classic Arduino boards (Uno, Nano, Mega), low RAM/flash, 5 V logic, no built-in wireless |
| Bandwidth (test equipment) | The highest frequency an instrument such as an oscilloscope can accurately capture without distorting the reading |
| CAT rating | A measurement-category rating (CAT I–IV) on a multimeter/test instrument describing which part of an electrical installation it is safe to connect to |
| Colour code | The coloured bands printed on a resistor encoding its resistance value and tolerance, read in place of a printed number |
| CV / CC mode | Constant-Voltage / Constant-Current, a bench power supply's two operating modes; it holds voltage steady in CV mode, or clamps current at a set limit (CC mode) to protect a circuit during a fault |
| dBm | Decibels relative to one milliwatt, the logarithmic amplitude unit a spectrum analyser typically displays, useful because RF signal power spans an enormous range |
| Debounce | Filtering out a mechanical switch's rapid, spurious HIGH/LOW transitions right after it is pressed or released |
| DMM | Digital Multimeter, a handheld/bench instrument measuring voltage, current, resistance and continuity |
| Duty cycle | The proportion of time a PWM signal spends "on" during each cycle; this is what determines the effective average voltage |
| GPIO | General Purpose Input/Output, a microcontroller pin configurable as a digital input or output |
| Harvard architecture | A CPU design with separate memory paths for program instructions and data (used by PIC microcontrollers), as opposed to sharing one memory bus for both |
| I²C | A two-wire (SDA/SCL) protocol allowing one microcontroller to talk to multiple peripheral devices over a shared bus |
| Li-ion / LiPo | Lithium-ion / Lithium-polymer, rechargeable battery chemistries with high energy density, requiring a dedicated protection/charging circuit to handle safely |
| Microcontroller | A single chip integrating a CPU with RAM, flash storage, and I/O, e.g. the ESP32, an AVR ATmega, an STM32, an RP2040, or a PIC |
| Microprocessor | A CPU alone, requiring separate external RAM/storage/I-O chips to function |
| MicroPython | A stripped-down Python interpreter that runs directly on a microcontroller (e.g. the RP2040/Pico), trading some speed/memory efficiency for simpler syntax and fast prototyping |
| MOSFET | A voltage-controlled transistor that switches current using its gate voltage rather than a base current, drawing near-zero current once switched, the common choice for PWM-driven motor/LED switching |
| NiMH | Nickel-Metal Hydride, a rechargeable battery chemistry, lower energy density than Li-ion but more tolerant of abuse |
| Ohm's Law | `V = I × R`, voltage equals current multiplied by resistance |
| Parallel circuit | Components wired across the same two points, sharing the same voltage while current splits between them |
| PCB | Printed Circuit Board, the manufactured, soldered board used in a real product instead of a breadboard |
| PIC | Originally "Peripheral Interface Controller", a microcontroller family from Microchip, spanning 8/16/32-bit parts, widely used in industrial and electronics-trade contexts, typically programmed in MPLAB X with the XC compilers |
| PIO | Programmable I/O, a small, independently-programmable hardware state-machine peripheral unique to the RP2040, used to implement custom digital protocols in hardware |
| PWM | Pulse-Width Modulation, switching a pin on/off rapidly to simulate a variable voltage (used internally by `analogWrite()`) |
| Raspberry Pi | A family of Linux-capable single-board computers (microprocessor-based, not microcontrollers) from the Raspberry Pi Foundation, including the compact Pi Zero line |
| RBW (Resolution Bandwidth) | A spectrum analyser setting controlling how finely it can separate two closely-spaced frequencies; narrower RBW gives more precision at the cost of sweep speed |
| RP2040 | The dual-core ARM microcontroller chip used in the Raspberry Pi Pico / Pico W |
| RP2350 | The newer successor chip to the RP2040, used in the Raspberry Pi Pico 2, a faster dual-core Cortex-M33 (switchable to RISC-V) with more RAM |
| Rust | A systems programming language offering C/C++-level performance with compile-time memory-safety guarantees, with growing but less mature support for embedded microcontrollers |
| Sampling | Taking a discrete reading of a continuously-varying real-world quantity at a specific point in time |
| Sentinel value | A special "not found" / "invalid" placeholder value returned by a lookup, which must be checked before being used in a comparison |
| Series circuit | Components wired end-to-end along a single path, sharing the same current while voltage splits across them |
| Solder bridge | An unwanted short circuit caused by excess solder connecting two adjacent pads |
| SPI | Serial Peripheral Interface, a four-wire (MOSI/MISO/SCLK/CS) protocol, faster than I²C but requiring a dedicated chip-select line per device |
| STM32 | A family of ARM Cortex-M microcontrollers from STMicroelectronics, common in industrial and professional embedded design |
| True-RMS | A measurement mode that calculates a signal's actual RMS voltage regardless of waveform shape, as opposed to a cheaper average-responding meter that assumes a clean sine wave |
| UNO Q / VENTUNO Q | Hybrid Linux + microcontroller boards from Arduino, pairing a Qualcomm Linux processor with a separate STM32 MCU on one board, despite the "Uno" name, not AVR chips |
| Voltage divider / logic-level converter | Circuitry that safely steps a higher-voltage signal (e.g. 5 V) down into a lower-voltage pin's rated range (e.g. 3.3 V) |
