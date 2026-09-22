# Electricity and Energy Fundamentals

Every microcontroller, sensor, and component elsewhere in this guide is, underneath the code, an electrical device, and none of it works, or fails, for reasons software alone can explain. A GPIO pin driving too much current, an LED wired without protection, a battery-powered device running flat faster than expected: these are all electrical problems first, and only appear as "bugs" second. This section covers the small handful of physical quantities (voltage, current, resistance, power, and energy) on which everything else in electronics is built, and the one equation, Ohm's Law, that ties the first three together.

<p align="center"><img src="../../../../assets/study-guide/04-ohms-law-led-circuit.png" alt="Ohm's Law triangle (V = I × R) and the LED + 220 ohm resistor circuit, showing how the resistor limits current to a safe level" width="700"></p>

**The three quantities, one at a time.** Before combining them into Ohm's Law, it is worth examining voltage, current, and resistance individually: what each one physically is, and why calculating it matters rather than simply connecting components and observing the result.

## Voltage (V, measured in volts)
The "electrical pressure" pushing current around a circuit; more precisely, the difference in electrical potential energy between two points, which drives charge to flow from one to the other. It is always measured *between* two points (much like water pressure only makes sense as a difference between two points in a pipe), never as an absolute quantity on its own. **Why calculate it:** every component has a voltage it is designed for and a maximum it can survive. Too little voltage and it will not work properly; too much and it can be destroyed. Before wiring a circuit, the voltage a component will actually see must be known, not just the voltage the supply nominally provides, since other components in the circuit can change that.

***Example:*** an ESP32 GPIO pin outputs about 3.3 V when driven HIGH. If two identical 220 Ω resistors are wired in series across that pin to ground, they act as a voltage divider, and by symmetry each resistor drops half the voltage, so the point between them sits at:

$$
V = \frac{V_{supply}}{2}
$$

$$
V = \frac{3.3\,\text{V}}{2} = 1.65\,\text{V}
$$

not the full 3.3 V. Skipping that calculation and assuming "it is connected to the 3.3 V pin, so it must be 3.3 V there" would be an avoidable design mistake.
## Current (I, measured in amps, A, often milliamps, mA)
The rate of flow of electric charge through a component, analogous to the flow rate of water through a pipe (litres per second) rather than the pressure driving it.

**Why calculate it:**

Current is what actually does work (lighting an LED, spinning a motor) and what generates heat, and every component, and every microcontroller GPIO pin, has a maximum current it can safely handle before it overheats or is destroyed. Current is calculated to confirm it stays under that limit before power is applied, not after something has already failed, by rearranging Ohm's Law:

$$
I = \frac{V}{R}
$$

***Example:*** the ESP32's datasheet typically limits a single GPIO pin to around 40 mA maximum. The 220 Ω LED resistor calculation worked through below arrives at:

$$
I = \frac{V_R}{R}
$$

$$
I = \frac{1.3\,\text{V}}{220\,\Omega} \approx 6\,\text{mA}
$$

comfortably under that limit, which is the point of calculating rather than guessing.
## Resistance (R, measured in ohms, Ω)
A component's opposition to current flow: how much a given voltage across it is "resisted" into a smaller current than it would otherwise be.

**Why calculate it:**

Resistance is usually the one quantity that can be *chosen* when designing a circuit (by picking a resistor value), specifically to control what current results from a known voltage. This is the LED-protection role a resistor plays in the circuit above.

***Example:*** if a component needs to be limited to no more than 10 mA from a 5 V supply, rearranging Ohm's Law gives the minimum resistance required:

$$
R = \frac{V}{I}
$$

$$
R = \frac{5\,\text{V}}{0.01\,\text{A}} = 500\,\Omega
$$

## Power (P, measured in watts, W)
The rate at which a component converts electrical energy into another form (heat, light, motion) at a given instant. Unlike voltage or current alone, power indicates how much energy per second is involved, which determines how hot something gets, how bright it is, or how quickly a battery drains. It is calculated as:

$$
P = V \times I
$$

voltage multiplied by current.

**Why calculate it:**

Every component also has a maximum power rating, separate from its voltage and current ratings. A resistor, for instance, is rated in watts for how much heat it can dissipate before it is damaged, and it is entirely possible for both the voltage and current across a component to individually look "fine" while the power (their product) is still too high for the part to survive. Power is also the figure that directly determines battery life for a field-deployed device (see below).

***Example:*** the LED + 220 Ω resistor circuit above runs at 1.3 V across the resistor and ≈6 mA through it, so the resistor dissipates:

$$
P = V \times I
$$

$$
P = 1.3\,\text{V} \times 0.006\,\text{A} \approx 7.8\,\text{mW}
$$

That is trivially far under a typical resistor's 250 mW or 500 mW rating, so this component choice never even needs to be checked in practice. It is precisely the check a technician runs before trusting a design that pushes closer to a component's limit.

## Ohm's Law
Ohm's Law ties three of these quantities together. Voltage equals current multiplied by resistance:

$$
V = I \times R
$$

***Example:*** the 220 Ω LED resistor carrying its ~6 mA:

$$
V = I \times R
$$

$$
V = 0.006\,\text{A} \times 220\,\Omega \approx 1.32\,\text{V}
$$

matching the ~1.3 V worked out a different way in the LED derivation below; either direction, Ohm's Law agrees with itself.

It can be rearranged depending on which quantity is unknown. Solving for current:

$$
I = \frac{V}{R}
$$

***Example:*** that same 1.3 V across the 220 Ω resistor:

$$
I = \frac{V}{R}
$$

$$
I = \frac{1.3\,\text{V}}{220\,\Omega} \approx 6\,\text{mA}
$$

Or solving for resistance:

$$
R = \frac{V}{I}
$$

***Example:*** limiting a component to 10 mA from a 5 V supply:

$$
R = \frac{V}{I}
$$

$$
R = \frac{5\,\text{V}}{0.01\,\text{A}} = 500\,\Omega
$$

A simple way to remember the three rearrangements is the triangle in the diagram above: covering whichever quantity is unknown reveals the operation needed from the other two (side-by-side means multiply; one above the other means divide). This law does not change depending on what chip is on the board: it governs the LED circuit whether the pin driving it is an ESP32 GPIO, an Uno GPIO, or an STM32 GPIO; only the numbers plugged in change.

**Series vs. parallel circuits.** These are the two basic ways to connect more than one component together, and Ohm's Law behaves differently in each.

## Series Circuit
Components connected end-to-end, one after another, so the *same current* flows through all of them (there is only one path), while the supply voltage *splits* across them (this is the voltage-divider behaviour used in the resistor calculation above, and in the HC-SR04 voltage divider covered later in this guide). If one component in a series chain fails open (like an old-style string of Christmas lights), the whole chain stops conducting, because there is no other path for current to take.

<p align="center"><img src="../../../../assets/study-guide/series-circuit.png" alt="Series circuit: same current through every component, supply voltage splits across them, and one open component stops the whole chain" width="700"></p>

**Applying Ohm's Law to a series circuit.** Because every component sees the *same* current in series, Ohm's Law is first applied to the pair's combined resistance to find that shared current, then applied again to each resistor individually to find its own share of the voltage. Take two 220 Ω resistors in series across a 3.3 V supply, their combined resistance is 440 Ω, so:

$$
I = \frac{V}{R_{series}}
$$

$$
I = \frac{3.3\,\text{V}}{440\,\Omega} \approx 7.5\,\text{mA}
$$

That same current of ≈7.5 mA flows through both resistors, so each one's share of the voltage is:

$$
V_1 = I \times R_1
$$

$$
V_1 = 0.0075\,\text{A} \times 220\,\Omega \approx 1.65\,\text{V}
$$

$$
V_2 = I \times R_2
$$

$$
V_2 = 0.0075\,\text{A} \times 220\,\Omega \approx 1.65\,\text{V}
$$

As a check, those two voltages add back up to the full supply voltage:

$$
V_1 + V_2 \approx 1.65\,\text{V} + 1.65\,\text{V} = 3.3\,\text{V}
$$

the same 1.65 V split already seen in the Voltage example above, arrived at here from the opposite direction (via current, rather than by symmetry alone).

## Parallel Circuit
Components connected side-by-side across the same two points, so they all see the *same voltage*, while the supply current *splits* between them, in proportion to how much current each branch draws. If one parallel branch fails open, the others keep working unaffected, because each has its own independent path back to the supply. This is why a house's wall sockets are wired in parallel: unplugging (or losing) one appliance does not cut power to the others.

<p align="center"><img src="../../../../assets/study-guide/parallel-circuit.png" alt="Parallel circuit: same voltage across every branch, supply current splits between them, and one open branch leaves the others working" width="700"></p>

***Example:*** two 220 Ω resistors in series present a combined resistance to the supply of:

$$
R_{series} = 220\,\Omega + 220\,\Omega = 440\,\Omega
$$

resistances simply add in series. The same two resistors in parallel present:

$$
R_{parallel} = \frac{220\,\Omega \times 220\,\Omega}{220\,\Omega + 220\,\Omega} = 110\,\Omega
$$

Parallel resistance is always *less* than the smallest individual resistor, because adding a parallel path always gives current an easier overall route. Recognising which arrangement a circuit uses is the first step before Ohm's Law can even be applied correctly to it.

**Applying Ohm's Law to a parallel circuit.** Because every branch sees the *same* voltage in parallel, Ohm's Law is applied separately to each branch to find its own current, then the branch currents are added for the total drawn from the supply. Take those same two 220 Ω resistors in parallel, now across a 3.3 V supply:

$$
I_1 = \frac{V}{R_1} = \frac{3.3\,\text{V}}{220\,\Omega} \approx 15\,\text{mA}
$$

$$
I_2 = \frac{V}{R_2} = \frac{3.3\,\text{V}}{220\,\Omega} \approx 15\,\text{mA}
$$

$$
I_{total} = I_1 + I_2 \approx 30\,\text{mA}
$$

As a check, the same answer comes from treating the pair as their single combined resistance instead:

$$
I_{total} = \frac{V}{R_{parallel}} = \frac{3.3\,\text{V}}{110\,\Omega} \approx 30\,\text{mA}
$$

That is two different routes through Ohm's Law, giving one answer either way.

## Alternating and Direct Current
Every voltage and current calculation so far in this guide has assumed one particular kind of electricity. There are two:

<p align="center"><img src="../../../../assets/study-guide/ac-vs-dc.png" alt="AC vs DC: waveforms, circuit symbols, common sources, typical voltage values, and common applications for each" width="700"></p>

## DC (Direct Current)
The current that flows in one direction only, at a voltage that stays at a constant level (or at least a constant polarity) over time.

**What produces it:** a battery, a USB port, a solar panel, and every microcontroller's internal supply rail are all DC. Plotting its voltage against time gives a flat, unchanging line (or a fairly flat one, in practice).

**Why electronics run on it:** a microcontroller's transistors, an LED, and a logic-level GPIO pin all depend on current flowing one consistent way to work at all. DC is the "native" electricity of digital electronics.

***Example:*** the ESP32 boards used throughout this guide run at a steady 3.3 V DC, sourced from a USB port's 5 V DC stepped down by an onboard regulator.

## AC (Alternating Current)
The current that periodically reverses direction, with a voltage that swings back and forth (typically in a smooth sine-wave shape) rather than holding a constant polarity.

**What produces it:** mains electricity is AC. In Australia, that is 230 V AC switching direction 50 times a second (50 Hz).

**Why mains power uses AC rather than DC:** AC voltage can be stepped up and down efficiently with a transformer, which makes it practical to transmit electricity over long distances at very high voltage (to keep transmission losses low) and then step it back down to a safe level near where it is actually used. DC historically could not do this as efficiently.

***Example:*** the wall socket a USB charger plugs into supplies 230 V AC; the charger's job is entirely to convert that into the steady 5 V DC a phone, laptop, or an ESP32 board actually need.

**Why the distinction matters practically.**

A microcontroller itself always runs on DC internally. There is no such thing as an "AC-powered" chip. Anything plugged into mains needs a power supply or adapter in between to do the AC-to-DC conversion, smoothing AC's constantly-reversing voltage into the flat DC electronics require (this is the kind of smoothing job a capacitor, covered in the Schematic Symbols section, is well suited to). This is also why the mains-voltage hazards covered later in this guide (electric shock, arc flash, fire) are specifically AC hazards, and why a low-voltage, DC-powered build, running from USB or battery, never exposes anyone to them directly.

**Why a 220 Ω resistor is such a common default for an LED on a 3.3 V board.** It is often quoted simply as "a safe choice," with no derivation offered. Here is the derivation Ohm's Law actually provides: an LED has almost no resistance of its own once it starts conducting, and it has a roughly fixed "forward voltage drop" (around 2 V for a typical LED) regardless of how much current flows through it. If an LED were connected directly across a 3.3 V supply with nothing else in the circuit, there would be nothing to limit the current. It would spike far beyond what the LED can survive, destroying it almost instantly. Placing a 220 Ω resistor in series does the limiting: the supply voltage splits across the two components in series, so if the LED takes its ~2 V, the *remaining* ~1.3 V appears across the resistor. Ohm's Law then gives the current:

$$
I = \frac{1.3\,\text{V}}{220\,\Omega} \approx 6\,\text{mA}
$$

That is a safe, controlled value.

**The same calculation on a 5 V board.** An Arduino Uno or a 5 V-logic PIC drives that same LED from 5 V instead of 3.3 V. Redo the same two steps:

$$
V_R = V_{supply} - V_f
$$

$$
V_R = 5\,\text{V} - 2\,\text{V} = 3\,\text{V}
$$

$$
I = \frac{V_R}{R}
$$

$$
I = \frac{3\,\text{V}}{220\,\Omega} \approx 13.6\,\text{mA}
$$

That is noticeably more current from the same resistor, simply because there is more supply voltage to drop across it. A resistor value that is "safe" on one board is not automatically safe, or automatically optimal, on another. The calculation has to be redone for the actual supply voltage of the board in use, on any microcontroller family.

**Why this stopped being a purely theoretical concern once builds moved onto physical hardware.** In the simulator, wiring the LED directly across the supply with no resistor produces an unrealistically bright (or "wrong-looking") simulated LED; nothing is actually lost, and fixing the circuit and re-running costs nothing. On the physical breadboard, the same mistake can destroy a real LED in an instant, because there is now a real, finite current with nowhere else to go. Ohm's Law stops being an explanation for why simulated software behaves a certain way and becomes the reason a physical component survives or fails, and that is just as true when wiring an Uno, an STM32 Nucleo, or a Pico as it is an ESP32.

**Power and energy for a field-deployed device.** Power (above) is an instantaneous rate; **energy** is that power sustained over time. This is what a battery's capacity, in mAh or Wh, actually measures. A USB-powered development board runs permanently from that supply, whether in a simulator or on a real bench, so power draw is never a real constraint during development; the board does not run out of power mid-build even if the code is inefficient. A real, battery-powered IoT device deployed in the field has no such luxury: it has a fixed, finite amount of stored energy, and every component that draws current (a Wi-Fi radio transmitting, an LED left on, a sensor polled too frequently) shortens how long the device can run before its battery is exhausted. This is why real embedded/IoT engineering has to actively manage power, using sleep modes between readings, transmitting only periodically instead of continuously, and choosing low-power components, considerations a USB-powered development setup never forces a developer to confront. Power budgeting is also where microcontroller choice becomes a real design decision rather than a preference: an RP2040 or STM32 with no radio on-die typically draws far less idle current than an ESP32 with its Wi-Fi/Bluetooth radio powered up, which is why a battery-critical sensor node might deliberately choose a radio-less MCU and add only the specific low-power radio module it needs (e.g. LoRa) rather than defaulting to an ESP32 for convenience.

**Choosing a battery chemistry for a field-deployed device.** "Battery" is not one thing: the chemistry matters as much as the mAh number printed on it.

## Alkaline (AA/AAA)
<p align="center"><img src="../../../../assets/study-guide/alkaline.png" alt="Alkaline battery: internal construction, specifications, discharge curve, advantages/limitations, and storage safety" width="700"></p>

Cheap, widely available, non-rechargeable, and forgiving to handle, but with a comparatively low energy density and a voltage that droops steadily as it discharges (a fresh cell is ~1.5 V; a "flat" one might still read over 1 V but can no longer deliver useful current). Suited to low-current, non-critical, easily accessed devices.

## Li-ion / LiPo (Lithium-ion / Lithium-polymer)
<p align="center"><img src="../../../../assets/study-guide/li-ion-lipo.png" alt="Li-ion/LiPo: construction, specifications, how charging/discharging works, discharge curve, and common applications" width="700"></p>

Rechargeable, with high energy density (more capacity for the same size/weight), and holds a comparatively flat voltage until it is nearly depleted, which is why these are the default choice for compact, rechargeable IoT devices. The tradeoff is real risk if mishandled: over-discharging, over-charging, physically damaging, or short-circuiting a LiPo cell can cause it to swell, catch fire, or vent, which is why LiPo-powered products should always include a dedicated protection/charging circuit (undervoltage, overvoltage, and overcurrent cutoffs), never just bare wires to the cell.

## NiMH (Nickel-Metal Hydride)
<p align="center"><img src="../../../../assets/study-guide/nimh.png" alt="NiMH: construction, specifications, how it works, discharge characteristics, and common sizes/voltages" width="700"></p>

Rechargeable like a standard AA/AAA form factor, with lower energy density than Li-ion but far more tolerant of abuse (over-discharge, physical handling): a reasonable middle ground where Li-ion's energy density is not worth its handling risk.

**Why this choice matters beyond "how long does it last."** The right chemistry depends on the device's actual constraints: physical size and weight (Li-ion wins), safety and simplicity (alkaline or NiMH win), rechargeability (rules out alkaline), and how the device will be handled and by whom (a consumer product handled by the public needs a chemistry, and a protection circuit, far more forgiving of misuse than a sensor node an engineer installs once and never touches again).
