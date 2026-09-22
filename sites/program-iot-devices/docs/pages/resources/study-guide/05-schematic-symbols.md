# Schematic Symbols and Documentation

Every circuit built so far in this guide has been described in words and pictures specific to one build, "GPIO18 to a 220 Ω resistor to an LED to GND." That works for a handful of components on one breadboard, but it does not scale, and it is not how the wider electronics industry documents a circuit. This section covers the standardised alternative: schematic diagrams, the universal symbols they are built from, and why real documentation practice separates *what connects to what* from *where it physically sits*, a distinction worth understanding before reading someone else's circuit, or handing off one's own.

<p align="center"><img src="../../../../assets/study-guide/03-schematic-vs-breadboard.png" alt="This guide's component-to-pin wiring diagrams compared with a formal schematic using standard IEC-style symbols for a resistor, LED/diode, battery and ground" width="700"></p>

A **schematic diagram** represents a circuit's *electrical connections* using standardised, universally recognised symbols, completely independent of how the components are physically arranged on a bench or a board. This is different from every wiring diagram covered so far in this guide, which is instead drawn as a physical component-to-pin description (e.g. "GPIO18 → 220 Ω resistor → LED → GND").

**Why a technician reads a schematic before wiring a real circuit, rather than working from a written description:** a schematic is unambiguous and language-independent: its symbols mean the same thing to any trained reader anywhere, regardless of how the physical board ends up laid out, and regardless of which microcontroller family the schematic happens to be built around. A written description ("connect the resistor to the LED, then to ground") can be interpreted several different ways, especially once a circuit has more than a handful of components; a schematic cannot.

**Standard symbols worth recognising:** mapped onto a circuit built earlier in this guide (the LED + resistor circuit), plus a few more industry-standard components worth being able to read even where they have not come up yet.

## Resistor
<p align="center"><img src="../../../../assets/study-guide/resistor.png" alt="Resistor: circuit symbols, Ohm's Law, power dissipation, and how to read a 4-band colour code" width="700"></p>

Drawn as a **zigzag** line (older US-style convention) or a plain rectangle (newer IEC/European convention); both represent the same component.

**Resistor** is a component that opposes current flow by a fixed amount (measured in ohms, Ω).

**Why it is used:**

Almost always to *limit current* to a safe level for whatever it is in series with (see the LED + 220 Ω example in the Electricity section above), or to set a specific voltage at a point in a circuit (a voltage divider).

**When to use one:**

Any time something downstream, such as an LED, a transistor's base, or a sensor's input pin, needs less current or a lower voltage than the supply can otherwise deliver. **Reading a real resistor's value:** most through-hole resistors do not have their ohm value printed as text at all; instead they carry 4 (or 5) coloured bands. Reading a 4-band resistor: the first two bands are significant digits, the third is a multiplier (how many zeros to add, as a power of ten), and the fourth is a tolerance (how far the actual value may vary from the printed value, gold = ±5%, silver = ±10%).

***Example:*** red–red–brown–gold reads as digits "2, 2," multiplier ×10, giving `22 × 10 = 220 Ω`, ±5%, the same LED-protection resistor used earlier in this guide. Being able to read that band sequence allows a resistor's value to be verified without needing a multimeter.

<p align="center"><img src="../../../../assets/study-guide/resistor-band-colour-code.png" alt="Resistor colour code: full 4-band and 5-band colour tables, worked examples, and how to tell which end to read from" width="700"></p>

## LED / diode
<p align="center"><img src="../../../../assets/study-guide/diode-led.png" alt="Diode/LED: circuit symbols, forward vs reverse bias, common diode types, and worked current-limiting-resistor examples" width="700"></p>

Drawn as a triangle pointing toward a flat bar, which represents the direction current is allowed to flow (only one way). For an LED specifically, two small arrows point *away* from the symbol to show that it emits light.

**LED / diode** is a component that allows current to flow in one direction only, blocking it in the other. An LED is a diode that also emits light when forward current flows through it.

**Why it is used:**

A plain (non-light-emitting) diode protects other components from current flowing the wrong way, for example across a relay coil or motor, absorbing the brief reverse-voltage spike generated when it is switched off.

**When to use one:**

Wherever a circuit could see current pushed backward that should not be there (motor/relay/inductive loads), or, as an LED, wherever a simple, low-power visual indicator is needed.

## Capacitor
<p align="center"><img src="../../../../assets/study-guide/capacitor.png" alt="Capacitor: circuit symbols, construction, capacitance and energy formulas, and the RC time constant" width="700"></p>

Drawn as **two parallel lines** (a plain capacitor) or two parallel lines with one curved (an electrolytic/polarised capacitor, where the curved line is the negative terminal; getting this polarity backward on a real electrolytic capacitor can cause it to fail, sometimes violently, so the symbol's polarity marking matters).

**Capacitor** is a component that stores electrical energy in an electric field between two conductive plates, charging up when voltage is applied and releasing that stored charge back into the circuit when the voltage drops.

**Why it is used:**

Most commonly for **decoupling/smoothing**: placed close to a chip's power pins, a capacitor absorbs brief voltage dips and spikes caused by the chip suddenly drawing more or less current (the kind of noise a Wi-Fi radio keying on and off can cause), keeping the supply voltage stable. It is also used for **timing** (charging at a predictable rate through a resistor) and for **filtering** (blocking DC while passing AC signals, or the reverse).

**When to use one:**

A decoupling capacitor is standard practice next to almost any microcontroller or sensor's power pins in a real design. Many simple breadboard builds get away without one because USB power is already comparatively clean and the builds are short and low-current, not because the need disappears.

## Transistor (BJT)
<p align="center"><img src="../../../../assets/study-guide/transistor.png" alt="Transistor (BJT): terminals, NPN/PNP structure, how base current controls collector current, and common configurations" width="700"></p>

Drawn as **three angled lines** meeting a vertical bar, usually inside a circle, with an arrow on one lead showing current direction.

**Transistor (BJT)** is a component with three terminals (base, collector, emitter) that uses a small *current* fed into the base to control a much larger current flowing between the other two: effectively an electronically-controlled switch or amplifier, with no moving parts.

**Why it is used:**

a microcontroller's GPIO pin can typically only source a few tens of milliamps, nowhere near enough to directly drive a motor, a solenoid, a relay coil, or a high-power LED strip. A transistor lets that same small, safe GPIO signal switch a much larger current from a separate, appropriately rated power supply, without exposing the microcontroller pin to that larger current directly.

**When to use one:**

Any time a microcontroller needs to control something that draws more current than a GPIO pin can safely supply. This is the role an integrated "driver" chip or module (such as a motor driver board) is playing whenever a motor or relay is driven from a microcontroller's GPIO pin.

## MOSFET
<p align="center"><img src="../../../../assets/study-guide/mosfet.png" alt="MOSFET: circuit symbols, how gate voltage switches drain-source current, operating modes, and common applications" width="700"></p>

Drawn similarly to a BJT but with the base terminal relabelled "gate," often shown separated from the other two terminals by a small gap (representing that it is electrically insulated from them), sometimes with an extra line depicting the internal channel.

**MOSFET** is a second, more common kind of transistor that uses **voltage** on its gate terminal, rather than a BJT's base *current*, to switch a much larger current between its other two terminals (drain and source). Because the gate is insulated, it draws almost no current once charged to the switching voltage, unlike a BJT's base, which needs continuous current to stay on.

**Why it is used:**

that voltage-controlled, near-zero-current gate makes a MOSFET more efficient to drive directly from a GPIO pin, especially when switching rapidly, which is the PWM signal from `analogWrite()` performing motor-speed or LED-brightness control. MOSFETs also generally handle higher currents with lower resistive losses (and therefore less waste heat) than an equivalently priced BJT.

**When to use one:**

A MOSFET is the default choice in most modern designs for switching a load with PWM (motor speed control, LED dimming at real power levels). A BJT is still chosen where its current-driven behaviour or specific voltage characteristics suit the circuit better, but a MOSFET is what a motor driver module or solid-state relay is very likely built from internally.

## Battery / power source
<p align="center"><img src="../../../../assets/study-guide/battery-power-source.png" alt="Battery/power source: circuit symbols, key specifications, how a cell works, common chemistries, and series vs parallel connections" width="700"></p>

Drawn as a **pair of parallel lines of different lengths** (a long thin line for positive, a short thick line for negative), often repeated to show a multi-cell battery.

**Battery / power source** is a source of a (roughly) fixed DC voltage.

**Why/when it is used:**

Wherever a circuit needs power and is not tethered to USB or mains, the obvious choice for anything portable or field-deployed, at the cost of the finite-energy tradeoffs covered in the Electricity/Energy section above.

## Ground / earth
<p align="center"><img src="../../../../assets/study-guide/ground-earth.png" alt="Ground/earth: circuit symbols, its role in a simple circuit, common connections, and why ground loops are avoided" width="700"></p>

Drawn as a set of **horizontal lines** of decreasing length, representing the circuit's common reference point (0 V).

**Why/when it is used:**

Every circuit needs one shared 0 V reference point that all voltage measurements are made relative to. Without a common ground, "3.3 V" is meaningless, because voltage is always a difference between two points, not an absolute quantity.

A real technician's documentation set typically pairs a schematic (what connects to what, electrically) with a separate physical layout or assembly drawing (where components actually sit on a board). The wiring diagrams used earlier in this guide are much closer to that second kind of drawing than to a schematic. This split matters more, not less, once a design moves beyond a breadboard: an STM32 or PIC datasheet-driven design, or any board headed for manufacture as a PCB, is documented with a formal schematic first and a physical layout second. The schematic is what a manufacturer, a colleague, or a datasheet cross-reference actually reads, regardless of which microcontroller family the board is built around.
