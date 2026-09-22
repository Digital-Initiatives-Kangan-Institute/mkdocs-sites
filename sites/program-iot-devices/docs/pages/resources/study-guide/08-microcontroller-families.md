# Microcontroller Families

The previous section defined *what* a microcontroller is (a single chip integrating a CPU with RAM, flash storage, and I/O) and named the five microcontroller families used as reference points throughout this guide. None of those five is simply "better" than the others; each represents a different set of trade-offs between cost, performance, memory, wireless capability, and ease of use, which is why all five still exist and sell in volume today. This section goes through each one individually: what it actually is, and its concrete advantages and disadvantages, so "which microcontroller should be used" becomes a decision that can be reasoned about rather than a default fallen back on. Two more boards are covered alongside them for contrast, despite not being microcontrollers themselves: the **Arduino UNO Q/VENTUNO Q** hybrids (right after AVR) and the **Raspberry Pi** (right after RP2040), both included because they are easy to mistake for one, sharing a name or a maker with a real microcontroller in this list.

## ESP32
<p align="center"><img src="../../../../assets/study-guide/esp32-family.png" alt="ESP32 family overview: key features, and a side-by-side comparison of the original ESP32, S2, S3, C3, C6, H2 and P4 variants" width="700"></p>

A 32-bit microcontroller from Espressif, built around either a Tensilica Xtensa LX6/LX7 core or, on newer variants, a RISC-V core, and distinguished from most other families in this guide by having Wi-Fi and Bluetooth radios built directly into the chip rather than requiring a separate module. It typically runs at up to ~240 MHz with hundreds of kilobytes of RAM and megabytes of flash, generous enough headroom that a project rarely has to think as hard about memory as an 8-bit AVR build does. This is the main platform used throughout this guide, chosen specifically because its built-in wireless makes the full sense-to-cloud IoT pipeline (sensor reading, local logic, and a Wi-Fi upload) possible on a single, low-cost board.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| ESP32 (original) | The chip that established the family | General-purpose IoT projects needing both Wi-Fi and Bluetooth | Dual-core Xtensa LX6; Wi-Fi + classic Bluetooth/BLE | Proven, most mature software/library support | Older and less power-efficient than newer variants |
| ESP32-S2 | Wi-Fi-only variant with native USB | USB-connected devices that do not need Bluetooth | Single-core Xtensa LX7; Wi-Fi only, no Bluetooth; native USB | Native USB simplifies host connections; cheaper than S3 | No Bluetooth at all; single-core limits compute-heavy tasks |
| ESP32-S3 | Dual-core variant with AI/ML-oriented instructions | This guide's main build platform; edge-AI-adjacent projects | Dual-core Xtensa LX7; Wi-Fi + BLE; native USB; vector instructions | Best all-round performance and connectivity in the family | Costs more and draws more power than the smaller C3 |
| ESP32-C3 | Lower-cost RISC-V variant | Budget/compact builds | Single-core RISC-V; Wi-Fi + BLE; fewer pins than S3 | Cheapest and smallest full-featured variant | Single-core; fewer pins and peripherals than S3 |
| ESP32-C6 | RISC-V variant adding next-gen radios | Smart-home mesh networking | RISC-V core; Wi-Fi 6 + BLE + Zigbee/Thread | Future-proof radio support (Wi-Fi 6, Zigbee/Thread) | Newer, less mature ecosystem; higher cost than C3 |
| ESP32-H2 | Radio-focused variant with no Wi-Fi | Low-power mesh network nodes | RISC-V core; BLE + Zigbee/Thread; no Wi-Fi | Very low power draw for dedicated mesh nodes | No Wi-Fi at all, ruling out direct internet connectivity |
| ESP32-P4 | High-performance variant with no wireless radio at all | Demanding HMI/display, camera, and edge-AI processing, paired with a separate wireless chip if connectivity is needed | Dual-core RISC-V (up to ~400 MHz); no Wi-Fi/Bluetooth; MIPI-CSI/DSI camera and display interfaces; high-speed USB | Far more raw compute and display/camera I/O than any other ESP32 variant | No wireless at all, needs a companion chip (e.g. an ESP32-C6) over SDIO/SPI for any networking |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| Built-in Wi-Fi and Bluetooth mean an IoT/networked project needs no extra wireless hardware at all. | 3.3 V logic only; connecting a 5 V sensor or module (like the HC-SR04 in this guide) requires a voltage divider or level-shifter, an extra step and failure point. |
| Fast for a low-cost MCU, often dual-core, running up to ~240 MHz, with plenty of headroom for real work rather than just blinking an LED. | The Wi-Fi/Bluetooth radio draws meaningfully more idle current than a radio-less chip, which matters a great deal for battery-powered, sleep-most-of-the-time deployments (see the Electricity/Energy section). |
| Comparatively generous RAM and flash make it forgiving of less-optimised code, unlike the 8-bit families below. | Its ADC is comparatively noisy and non-linear near the extremes of its range compared to a dedicated precision ADC chip. |
| A rich peripheral set (I²C, SPI, UART, PWM, ADC, capacitive touch, and more) covers most project needs on one chip. | The Wi-Fi networking stack itself consumes a non-trivial amount of RAM and flash, which can crowd out application code on the smaller ESP32 variants. |
| Huge hobbyist and community support through the Arduino framework, plus a low unit cost. | Not typically the choice for safety-certified or hard-real-time industrial control, where STM32 or PIC parts with formal certification and support lifecycles are preferred. |

## AVR (Arduino Uno / ATmega328P)
<p align="center"><img src="../../../../assets/study-guide/avr-arduino-family.png" alt="Arduino & AVR microcontroller boards: ATmega328P (Uno/Nano), ATmega2560 (Mega), ATmega32U4 (Leonardo/Micro), and the ATtiny series compared" width="700"></p>

An 8-bit RISC microcontroller architecture originally developed by Atmel (acquired by Microchip in 2016), most widely known as the chip inside the classic Arduino Uno: the ATmega328P, running around 16 MHz with just 2 KB of RAM and 32 KB of flash. Despite those modest numbers, AVR remains in wide use because that scarcity is exactly what makes it an effective teaching platform: every byte of RAM and every instruction cycle matters, enforcing the same data-type and memory discipline that larger, more forgiving families let a beginner postpone learning. Of the five families compared in this guide, AVR is the simplest and most minimal, with no wireless radio, no advanced peripherals, and the smallest toolchain to learn, making it the natural starting point before moving to a more capable chip.

**Not to be confused with the Arduino UNO Q or VENTUNO Q.** Despite carrying the "Uno" name, the newer **Arduino UNO Q** and **Arduino VENTUNO Q** boards are *not* AVR chips at all: they are hybrid Linux + microcontroller boards, covered in their own subsection right after this one.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| ATmega328P (Uno / Nano) | The classic, most widely taught AVR chip | Teaching and small hobbyist projects | 8-bit; 16 MHz; 2 KB RAM; 32 KB flash; 14 digital pins | Huge community/library support; very cheap | Very limited RAM/flash for anything beyond simple projects |
| ATmega2560 (Mega) | Larger-pin-count, larger-memory AVR | Projects needing many I/O pins or multiple serial ports | 8-bit; 16 MHz; 8 KB RAM; 256 KB flash; 4 hardware serial ports | More pins, memory, and serial ports than the Uno | Larger, pricier board; still an 8-bit core underneath |
| ATmega32U4 (Leonardo / Micro) | AVR with native on-chip USB | USB HID devices (keyboard/mouse/serial emulation) | 8-bit; 16 MHz; ~2.5 KB RAM; 32 KB flash; on-chip USB | Native USB simplifies HID/serial projects, no extra chip needed | Less RAM than the 328P; USB bootloader quirks trip up beginners |
| ATtiny series (e.g. ATtiny85) | Minimal, low-pin-count AVR | Cost-sensitive, simple embedded tasks | 8-bit; very few pins; ≤8 KB flash | Extremely cheap and tiny footprint | Very few pins/memory; no easy USB, needs a separate programmer |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| About as simple and well-documented as microcontrollers get, with an enormous beginner-friendly ecosystem built around the Arduino IDE. | Extremely limited RAM and flash by modern standards: it is easy to run out of memory on anything beyond a fairly simple project, and the failure mode (silent corruption/crashes) can be hard to diagnose. |
| Native 5 V logic means many older sensors and modules (including 5 V-only ones) can be wired directly, with no level-shifting needed: the reverse of the ESP32's situation. | No wireless capability at all; any networked project needs a separate module (an ESP8266/ESP32 acting as a co-processor, for instance). |
| Very low cost, and low power draw in sleep modes for a chip with no radio to begin with. | The 8-bit core is slow for anything math-heavy or timing-critical compared to the 32-bit families. |
| A simple, predictable architecture that makes it an excellent teaching platform for understanding fundamentals before layering on complexity. | Only one hardware serial port, which becomes a real constraint once a project needs to talk to more than one serial device. |
| Deterministic, real-time behaviour: with no operating system, wireless stack, or complex peripherals competing for attention, its timing is simple and predictable, well suited to hard real-time control tasks. | Modern IoT workloads involving TLS/HTTPS, JSON parsing, or large data buffers are a poor fit for its memory budget. |

## Arduino UNO Q / VENTUNO Q
Despite carrying the Arduino "Uno" name, these are a different category of board: each pairs a Linux-capable Qualcomm processor with a separate STM32 microcontroller on the same board, running both a full Linux OS and real-time Arduino sketch code side by side, linked by a built-in RPC library. They belong on the microprocessor side of the microprocessor-vs-microcontroller distinction covered earlier in this guide, much like the Raspberry Pi does, rather than alongside the AVR chips above.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| Arduino UNO Q | Entry hybrid Linux + MCU board | General-purpose projects needing both Linux software and real-time Arduino control on one board | Qualcomm QRB2210 (quad-core Cortex-A53 @ 2.0 GHz, Adreno 702 GPU) running Debian Linux, paired with an STM32U585 (Cortex-M33 @ 160 MHz) running Zephyr/Arduino sketches; 2–4 GB LPDDR4 RAM; 16–32 GB eMMC; Wi-Fi 5 + Bluetooth 5.1 | Combines real Linux computing power with Arduino's familiar sketch-based real-time control on one board | Significantly more expensive and power-hungry than a plain AVR Uno; genuinely two systems to learn (Linux side and MCU side) |
| Arduino VENTUNO Q | High-end "Dual-Brain" edge-AI hybrid board | Edge AI, computer vision, local LLMs, and robotics/motor control needing both AI compute and deterministic real-time control | Qualcomm Dragonwing IQ8 (up to 40 TOPS AI compute) paired with an STM32H5 (Cortex-M33) running Zephyr/Arduino Core for sub-millisecond motor/CAN-FD/PWM control; 16 GB RAM; 64 GB expandable storage; M.2 NVMe and UNO Shield Header compatibility | Serious on-device AI performance alongside precise, low-latency hardware control, a genuine step beyond any single-chip microcontroller in this guide | The most expensive and power-hungry board in this entire guide by a wide margin; overkill for anything short of demanding AI/robotics work |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| Combines Arduino's familiar real-time sketch-based hardware control with real Linux computing power on a single board; no separate Raspberry Pi needed. | Significantly more expensive and power-hungry than a plain AVR Uno or even an ESP32; overkill for simple sense-and-act tasks. |
| Enables on-device AI/vision and dashboard-style software the plain AVR/STM32/ESP32/PIC families in this guide cannot run directly. | Two systems to learn and keep in sync: the Linux side and the real-time MCU side, via the built-in RPC bridge. |
| VENTUNO Q specifically adds serious on-device AI compute (up to 40 TOPS) alongside sub-millisecond motor/robotics control. | A young product line compared to the decades of AVR/STM32/PIC documentation and community example code. |

**Why this matters for board selection.** If a project just needs to read a sensor and blink an LED, a $5 AVR chip does that job better than either of these: cheaper, simpler, and using a fraction of the power. The UNO Q and VENTUNO Q exist for the opposite case: projects that need Arduino's familiar real-time hardware control *and* real Linux-side compute (running a local AI model, a web dashboard, or camera-vision pipeline) on the same board, without wiring a separate microcontroller to a separate Raspberry Pi.

## STM32
<p align="center"><img src="../../../../assets/study-guide/stm32-family.png" alt="STM32 microcontrollers: F0, F1, F4, F7/H7, L0/L4 and G0/G4 series compared, plus a Nucleo pinout example" width="700"></p>

A large family of 32-bit microcontrollers from STMicroelectronics built around the ARM Cortex-M architecture, spanning everything from small, inexpensive Cortex-M0 parts not far above an AVR in capability, up to high-performance Cortex-M7 parts with hardware floating-point units and substantial RAM. Rather than a single chip, STM32 is really a whole catalogue of parts sharing a common architecture and toolchain, which is precisely why it is chosen so often in industry: a design can move to a cheaper or more capable part within the same family as requirements change, without rewriting the software from scratch. This breadth, combined with long-term part availability and industrial-grade variants, is what makes STM32 a common choice for professional products rather than just hobbyist projects.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| STM32F0 series | Entry-level line | Simple, low-cost projects | Cortex-M0 | Cheapest entry point into the STM32 ecosystem | Limited performance and peripheral set |
| STM32F1 series | Original mainstream STM32 line | General hobbyist/professional use (e.g. "Blue Pill" boards) | Cortex-M3 | Mature, huge community and board availability | Older architecture, gradually superseded by newer lines |
| STM32F4 series | Performance line with hardware FPU | Mid-range hobbyist and professional projects | Cortex-M4 + hardware floating-point unit | Strong performance-to-price balance | Higher power draw than the L-series |
| STM32F7 / H7 series | Highest-performance line | Demanding, compute-heavy applications | Cortex-M7; most RAM/flash in the family | Best raw performance in the family | Most expensive; overkill for simple projects |
| STM32L0 / L4 series | Low-power line ("L" for low-power) | Battery-powered and energy-harvesting devices | Cortex-M0+/M4, power-optimised | Excellent battery life | Lower raw performance than F4/F7 |
| STM32G0 / G4 series | Newer mainstream/mixed-signal lines | General-purpose (G0) and motor-control (G4) applications | Cortex-M0+/M4 | Modern peripherals, good price/performance | Newer, smaller community than the F-series |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| An enormous range of individual parts means a project can pick almost exactly the RAM, flash, peripheral set, and performance level it needs, rather than over- or under-shooting. | No wireless capability built in, like AVR; any networked project needs an external radio module. |
| A very rich peripheral set: precise hardware timers, DMA (direct memory access), and on many parts hardware cryptographic acceleration or high-precision ADCs. | A noticeably steeper learning curve than Arduino-style development: HAL/register-level programming exposes far more of the underlying hardware than `pinMode()`/`digitalWrite()` do. |
| Many parts have 5 V-tolerant GPIO pins, easing interfacing with older 5 V hardware despite running 3.3 V logic internally. | The sheer number of part variants and pin layouts across the family can itself be a source of confusion when starting out. |
| Long-term part availability and industrial/extended-temperature-range variants make it a common choice for professional and industrial products with multi-year production runs. | Hobbyist community support and beginner tutorials are smaller than for Arduino or ESP32, though this has improved over time. |
| A mature, professional-grade toolchain (STM32CubeIDE, the HAL and CMSIS libraries). | Development boards and parts can cost more than an equivalent ESP32 or Arduino for hobbyist-scale projects. |

## RP2040 (Raspberry Pi Pico)
<p align="center"><img src="../../../../assets/study-guide/rp2040-pico-family.png" alt="Raspberry Pi Pico families: Pico, Pico H, Pico W, Pico WH, Pico 2, Pico 2 W and Pico 2 WH compared, with full pinout" width="700"></p>

A dual-core 32-bit ARM Cortex-M0+ microcontroller designed by the Raspberry Pi Foundation, first released in 2021 as the Foundation's first in-house silicon design rather than a board built around someone else's chip. Its standout feature is the **PIO (Programmable I/O)** peripheral: small, independently programmable hardware state machines that can generate or read custom digital protocols entirely in hardware, offloading work a CPU would otherwise have to do by "bit-banging" timing-critical signals in software. This makes RP2040 particularly well suited to projects driving unusual or high-speed digital protocols (custom sensor timing, addressable LED strips, and similar) that would tax a conventional microcontroller's CPU, while its dual-core Cortex-M0+ design keeps the base chip simple, cheap, and power-efficient for everything else.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| Raspberry Pi Pico | Base board, no radio | Non-networked projects, PIO-heavy tasks | Dual-core Cortex-M0+; no wireless | Cheapest option; full PIO flexibility | No wireless at all |
| Raspberry Pi Pico W | Adds a Wi-Fi radio (and, on newer SDKs, Bluetooth) | Networked IoT projects | Dual-core Cortex-M0+; Wi-Fi (+BLE on newer SDK versions) | Adds Wi-Fi at a low price premium | Slightly higher cost and power draw than the plain Pico |
| Pico H / Pico WH | Same chip as Pico/Pico W | Breadboard-ready prototyping | Same as Pico/Pico W, with pre-soldered headers | No soldering required to start prototyping | Bulkier and slightly pricier than the header-less versions |
| RP2350 (Pico 2) | Newer successor chip | Next-gen projects needing more performance/security | Dual-core Cortex-M33 (switchable to RISC-V); more RAM | More performance and security features than RP2040 | Newer, smaller ecosystem; higher cost |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| A capable dual-core chip at a very low price point, backed by strong official documentation and the wider Raspberry Pi community. | The base Pico has no wireless at all; only the separate **Pico W** variant adds Wi-Fi, so "does this board have Wi-Fi" has to be checked per-variant, not assumed. |
| The PIO peripheral can offload unusual or high-speed digital protocols (custom sensor timing, driving addressable LEDs, and similar) directly to hardware, freeing the CPU entirely for other work. | The PIO peripheral, while powerful, is a genuinely new skill to learn: it does not transfer directly to other microcontroller families the way GPIO or I²C code does. |
| Supports multiple development approaches on the same chip (the Arduino framework, a lower-level C/C++ SDK, and MicroPython), so the same hardware suits very different skill levels and project styles. | A younger ecosystem than AVR or STM32 means fewer years of accumulated example code and third-party libraries for less common peripherals. |
| A USB drag-and-drop bootloader makes flashing firmware simple, with no special programmer hardware required. | Its ADC, while adequate, offers no particular precision advantage over the ESP32's or a similarly-priced part's. |

## Raspberry Pi (single-board computer, not a microcontroller)
<p align="center"><img src="../../../../assets/study-guide/raspberry-pi-family.png" alt="Raspberry Pi families: Pi 5, Pi 4, Pi 3, Zero 2 W, Compute Modules, and Pico compared side by side" width="700"></p>

<p align="center"><img src="../../../../assets/study-guide/raspberry-pi-zero-family.png" alt="Raspberry Pi Zero family: original Zero, Zero W, Zero 2 W, and Zero 2 WH compared" width="700"></p>

The Raspberry Pi Foundation makes both the RP2040/Pico *microcontroller* covered above and the separate **Raspberry Pi** family, and the shared name causes constant confusion. A Raspberry Pi (including the compact **Pi Zero** line) is a full **microprocessor-based single-board computer**: it runs a complete Linux operating system from an SD card, needs external RAM and storage the way a desktop PC does (conceptually, even if physically compact), and boots up and shuts down rather than simply powering on into a single running program. This is exactly the microprocessor-vs-microcontroller distinction covered earlier in this guide: the Raspberry Pi sits on the microprocessor side of that line, while every other board in this section sits on the microcontroller side.

A credit-card-sized (or smaller, for the Zero line) single-board computer built around a Broadcom system-on-chip, running a full Linux operating system rather than a single dedicated program. First released in 2012 by the Raspberry Pi Foundation as a low-cost computer for teaching programming, it has since become one of the most widely used platforms in hobbyist electronics and IoT, largely because its GPIO pins let it interface with sensors, LEDs, and other components much like a microcontroller can, even though its underlying architecture is that of a genuine computer: a general-purpose CPU running a multitasking operating system from external storage, not a single-purpose chip. This overlap in what it *can be wired to* is exactly why it gets used in projects alongside true microcontrollers, despite being architecturally very different underneath, as covered in the Microprocessors vs. Microcontrollers section.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| Raspberry Pi Zero | The smallest, cheapest original Pi | Compact, low-budget embedded Linux projects | Single-core ARM11 ~1 GHz; 512 MB RAM; no wireless; mini HDMI/USB | Extremely cheap and tiny for a full Linux computer | Single-core and slow; no built-in wireless |
| Raspberry Pi Zero 2 W | Upgraded Zero with a quad-core chip and wireless | Compact IoT/Linux projects needing Wi-Fi/Bluetooth | Quad-core Cortex-A53 ~1 GHz; 512 MB RAM; Wi-Fi + Bluetooth | Much faster than the original Zero, same tiny form factor, adds wireless | Still only 512 MB RAM, limiting for heavy multitasking |
| Raspberry Pi 3 Model B/B+ | Older mainstream full-size Pi | General-purpose Linux computing and education | Quad-core Cortex-A53; 1 GB RAM; Wi-Fi + Bluetooth; full-size USB/Ethernet | Full desktop-like Linux experience at low cost | Superseded by faster Pi 4/5; limited RAM |
| Raspberry Pi 4 Model B | Major performance jump over the Pi 3 | Desktop replacement; more demanding IoT/edge computing | Quad-core Cortex-A72; up to 8 GB RAM; Gigabit Ethernet; USB 3.0; dual 4K HDMI | Real desktop-class performance in a tiny board | Runs hot under load (often needs active cooling); higher power draw |
| Raspberry Pi 5 | Newest generation, further performance increase | Demanding edge computing, robotics, media centres | Quad-core Cortex-A76; up to 8 GB RAM; PCIe support | Fastest Pi yet, with PCIe expansion options | Highest cost and power draw in the family; needs active cooling |

**Advantages and disadvantages (as a family, versus a true microcontroller):**

| Advantages | Disadvantages |
|---|---|
| Runs a full Linux OS, giving access to real software (web servers, databases, camera/vision libraries, scripting languages) that no microcontroller in this guide can run directly. | Draws far more power than a microcontroller, even sitting idle, ruling it out for most long-life battery-powered deployments. |
| Multi-core CPU performance, useful for compute-heavy tasks (image processing, machine learning inference) a microcontroller could not handle. | Boots in tens of seconds rather than milliseconds, and can suffer SD-card corruption if power is cut without shutting down cleanly, a real concern for field deployments. |
| Standard networking, USB, and (on the Pi 4/5) PCIe support built in, easing integration with off-the-shelf peripherals. | Far more expensive per unit than an AVR, PIC, or even an ESP32, especially once storage and a power supply are included. |
| Extensive official documentation and community, backed directly by the Raspberry Pi Foundation. | Overkill for simple sense-and-act tasks: using one just to blink an LED wastes most of what it offers, and its own GPIO pins are not as robustly protected as a purpose-built microcontroller's. |

**The practical difference this makes for a project.** A microcontroller like the ESP32 or Pico boots in milliseconds straight into its code and draws milliwatts sitting idle, ideal for a battery-powered sensor that wakes up, takes a reading, and goes back to sleep. A Raspberry Pi boots Linux in tens of seconds, draws watts even when idle, and is a full computer capable of running a web server, a database, or a camera-vision pipeline directly, ideal for a project that needs real computing power or a full OS's software ecosystem, at the cost of far higher power draw and a much slower start-up. Choosing between them is not about which is "better," but about whether a project needs a computer or a controller.

## PIC
<p align="center"><img src="../../../../assets/study-guide/pic-family.png" alt="PIC microcontrollers: PIC10/12, PIC16F, PIC18F, and PIC24/dsPIC33 families compared, with an example pinout" width="700"></p>

A large family of microcontrollers from Microchip Technology, spanning 8-, 16-, and 32-bit parts, with a particularly long history in industrial control and electronics-trade education. "PIC" originally stood for "Peripheral Interface Controller," dating back to a design first developed at General Instrument in the late 1970s and later acquired and expanded into today's family by Microchip. Architecturally, PIC parts use a Harvard architecture (separate memory paths for program instructions and data, rather than sharing one memory bus the way many other MCU families do) and a RISC-like instruction set built around single-cycle instruction execution, which was historically a real performance advantage at low clock speeds. Development is done through Microchip's own **MPLAB X IDE** and **XC compilers**, a toolchain with its own conventions distinct from the Arduino ecosystem covered elsewhere in this guide. Individual parts vary between 5 V and 3.3 V logic depending on the specific chip; it is worth checking a given part's datasheet before wiring it to other 3.3 V-only hardware.

**Common versions:**

| Version | Definition | Usage | Configuration | Advantage | Disadvantage |
|---|---|---|---|---|---|
| PIC10 / PIC12 series | Very small, low pin-count 8-bit parts | The simplest possible embedded tasks | 8-bit; minimal pins/memory | Extremely cheap, tiny package | Very limited functionality |
| PIC16F series | Classic mid-range 8-bit family (e.g. PIC16F877A) | Widely-taught trade/education projects | 8-bit; wide range of pin counts and peripherals | Huge legacy support and documentation in trade education | Dated architecture; banked memory can confuse newcomers |
| PIC18F series | Enhanced 8-bit family | Projects outgrowing PIC16F | 8-bit; more memory/peripherals than PIC16F | More capable than PIC16F while staying simple | Still limited by an 8-bit performance ceiling |
| PIC24F / PIC24H series | 16-bit family | Applications needing more performance/precision than 8-bit | 16-bit core | Better performance/precision than 8-bit PIC parts | Smaller ecosystem/community than PIC16F/18F |
| PIC32MX / PIC32MZ series | 32-bit, MIPS-based family | High-performance applications competing with ARM Cortex-M | 32-bit MIPS core | Competitive 32-bit performance | Steeper learning curve; less common in trade teaching |

**Advantages and disadvantages:**

| Advantages | Disadvantages |
|---|---|
| An enormous range of individual parts covers almost any budget or performance requirement, similar in spirit to STM32's breadth. | No wireless capability built in, the same as AVR and STM32. |
| Extremely well established in industrial and trade contexts, with mature supply chains and multi-decade product histories. | The MPLAB X IDE and XC compiler toolchain have different conventions from the Arduino ecosystem, adding a learning curve for anyone coming from Arduino-style development. |
| Many parts remain inexpensive at volume, and a number are available in easy-to-hand-solder through-hole packages, which matters in trade/education settings without SMD soldering equipment. | Documentation and community support skew toward professional/trade audiences rather than hobbyists, making beginner-friendly resources comparatively harder to find. |
| Long product lifecycles make it a common choice for products that need guaranteed part availability for years or decades. | Some smaller 8-bit PIC parts have architectural quirks (such as banked memory) that can trip up newcomers used to a simpler, flat memory model. |

**The pattern across all five.** No family above is disadvantage-free, and that is the point: an ESP32's wireless convenience costs it battery life and 5 V compatibility; an AVR's simplicity costs it memory and connectivity; STM32 and PIC's breadth and industrial pedigree cost ease of entry; the RP2040's PIO power costs a new skill to learn. Choosing a microcontroller for a real project means weighing these trade-offs against that specific project's actual constraints, not defaulting to whichever board is most familiar.
