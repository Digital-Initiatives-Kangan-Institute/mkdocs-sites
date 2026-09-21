# Laboratory Test Equipment

Everything in the Electricity section (voltage, current, resistance, power) is only ever knowable in a real circuit by *measuring* it, and `Serial.print()` can only report what a microcontroller itself has already been able to read. Laboratory test equipment exists to answer the questions neither of those can: what is actually happening electrically at a point in a circuit the microcontroller is not even connected to, how a signal behaves as a shape over time rather than a single sampled number, and whether a circuit is truly doing what it is meant to rather than just appearing to.

<p align="center"><img src="../../../../assets/study-guide/02-lab-equipment.png" alt="Four bench instruments, power supply, oscilloscope, spectrum analyser, signal generator, and why an oscilloscope shows more about the buzzer's tone() output than a printed frequency number can" width="700"></p>

None of these instruments are needed for the basic sensor/microcontroller builds covered earlier in this guide. But "what each one is called" is the least useful thing to memorise about them; the questions that actually matter are **how each is used, when it should be reached for instead of something else, and why it reveals something a simple sensor reading or a `Serial.print()` cannot.**

## Digital multimeter (DMM)
<p align="center"><img src="../../../../assets/study-guide/dmm.png" alt="Digital multimeter: display indicators, rotary switch guide, how to measure DC/AC voltage, resistance and continuity, and safety tips" width="700"></p>

**Digital multimeter** is a handheld or bench instrument that measures voltage, current, resistance, and (usually) continuity, using one probe pair and one dial or set of buttons to select the measurement mode. It is built around an internal analogue-to-digital converter, the same fundamental concept as the ADC covered in the Microcontrollers section, packaged as a standalone precision instrument rather than a chip peripheral.

**Operating procedure.**

The function (V, Ω, A) and the correct terminal for that function must be set *before* the probes touch the circuit. Current measurement in particular requires moving the red lead to a separate current-rated terminal; measuring current with the leads still in the voltage terminals creates a short circuit through the meter. A range at or above the expected value should be selected, or auto-ranging used if the meter supports it. For a resistance or continuity check, the circuit must be de-energised first: a DMM measures resistance by pushing its own small test current through the component, and an external voltage already present would corrupt or invalidate the reading.

**Other things a DMM can typically measure, beyond the basics:**

- **Diode test mode:** a dedicated setting that displays a semiconductor junction's forward voltage drop directly (roughly 0.6–0.7 V for a silicon diode, ~2 V for an LED), rather than a resistance value, which would be misleading across a diode's non-linear behaviour.
- **Continuity mode:** a fast audible beep when resistance is near zero, for quickly confirming a wire or trace is intact without reading an exact number.
- **Capacitance and frequency:** many modern DMMs also measure a capacitor's value directly, or a signal's frequency, extending into territory that would otherwise need a dedicated LCR meter or frequency counter.

**AC voltage: true-RMS vs. average-responding.**

Cheaper DMMs estimate an AC voltage's RMS (root-mean-square, the "effective" value that matters for power calculations) by assuming the signal is a clean sine wave, a shortcut that gives an accurate answer for mains power but a *wrong* one for any non-sinusoidal signal, such as the square wave from `tone()` or a PWM output. A **true-RMS** meter calculates the actual RMS value mathematically regardless of waveform shape, which matters directly here: measuring a PWM-dimmed LED's voltage on a cheap average-responding meter would give a misleading number, while an oscilloscope (see below) or a true-RMS meter would not.

**When to use it.**

The DMM is the everyday, first-reach-for instrument, suited to questions such as: is this wire actually carrying 5 V; was this joint actually soldered, or is it open-circuit; is this resistor actually 220 Ω, or were the colour bands misread. It answers single-number questions about a circuit's static state. *Concrete example:* to verify this guide's LED resistor is genuinely a 220 Ω part, set the DMM to resistance mode, touch the probes across the resistor (removed from or unpowered in the circuit), and confirm the display reads close to 220 Ω, cross-checking the colour-band reading covered in the Schematic Symbols section.

**Why it is not enough on its own.** A DMM gives a single number, sampled slowly, with no sense of how that value is changing moment to moment. It cannot show a waveform's *shape*, which is the gap the next three instruments fill.

## Power supply
<p align="center"><img src="../../../../assets/study-guide/power-supply.png" alt="Power supply: types (linear, switching, DC-DC), front/back panel layout, specifications, and how it converts AC to DC" width="700"></p>

**Power supply** is a bench (or "linear"/"lab") instrument that provides a controlled, precisely adjustable voltage and current to a circuit under test, in place of a battery or USB port. Unlike a fixed-voltage source, its output voltage and its maximum current can each be dialled to a specific value and changed at will, and both are independently protected: the voltage stays regulated regardless of what the circuit draws (within the supply's limits), while the current limit prevents a fault or a short circuit from drawing more than the operator has decided is safe. This combination, a known, repeatable voltage plus a hard current ceiling, is what makes it a test instrument rather than just another way to power a board.

**Operating procedure.**

Set the desired output voltage, and set a **current limit** below the level that would damage the circuit under test. The current limit is the safety feature: if the circuit draws more than that limit (from a short circuit or a fault), the supply clamps the current rather than letting it spike.

**Reading the display.**

Most bench supplies show two figures at once: the voltage and current *set points* dialled in, and the actual voltage and current the circuit is presently drawing. A small indicator (often labelled CV or CC) shows which mode the supply is actually operating in at that instant. This is how a steady, well-behaved circuit is distinguished from one that has hit its current limit: a healthy circuit shows a steady set voltage with current tracking the load, while a shorted or overloaded one shows the CC indicator lit, current pinned at the set limit, and voltage sagging below the set point. Watching that indicator switch from CV to CC the moment a short is introduced is a direct, visible confirmation that the protection is working.

**Constant-voltage vs. constant-current mode.**

A bench supply runs in one of two modes at any moment, switching automatically between them: in **constant-voltage (CV)** mode it holds the set voltage steady and lets current vary with what the circuit draws (the normal case); in **constant-current (CC)** mode, triggered the instant the circuit tries to draw more than the set current limit, it holds current fixed at that limit and lets voltage drop instead, which is what protects the circuit (and the supply) during a short circuit rather than either being damaged.

**Types of power supply**

A **linear** supply regulates voltage by dissipating the excess as heat: simple and very low-noise, but bulky and inefficient. A **switching** supply (SMPS) instead switches at high frequency to regulate voltage far more efficiently, in a smaller package, at the cost of some electrical noise on its output. A **DC-DC converter** takes one DC voltage and converts it to another (5 V down to 3.3 V, for instance), the same job a phone charger's internal circuitry or an Arduino's onboard regulator performs.

**Remote sensing (four-wire connection).**

At higher currents, the resistance of the supply leads themselves causes a real voltage drop between the supply's output terminals and the circuit under test, so the voltage the circuit actually receives can be measurably lower than what the supply's display reports at its own terminals. A four-wire (Kelvin) remote-sensing connection uses a second, separate pair of thin wires to measure the voltage directly at the load and feed that measurement back to the supply, which then raises its own output until the voltage *at the load*, not at its terminals, matches the set point. This matters far more for high-current bench testing than for the low-current microcontroller builds in this guide, but it is a standard feature on better bench supplies precisely because lead resistance becomes a real source of error as current increases.

**Ripple and noise.**

Every power supply's output carries some small, unwanted variation on top of its nominal DC voltage: ripple left over from the AC-to-DC conversion process, worse on a linear supply's raw rectified output before regulation, plus a different, higher-frequency noise from a switching supply's fast internal switching. For most microcontroller and sensor work this is negligible, but it becomes relevant for noise-sensitive analogue measurements (an ADC reading right at the edge of its resolution, for instance), where a supply's specified ripple/noise figure (typically a few millivolts peak-to-peak) can be the difference between a clean reading and a jittery one.

**When to use it.**

During prototyping and testing, before a circuit is trusted to run from a battery, it supplies an exact, stable voltage and allows deliberate testing of behaviour at the edges of a component's rated range (for example, what happens at 3.3 V versus at 3.6 V) without risking a real battery or a real fault current. *Concrete example:* powering an ESP32 build from a bench supply set to exactly 3.3 V with the current limit set just above its expected draw (a few hundred mA) means an accidental short from a slipped jumper wire trips the current limit harmlessly, rather than risking the board the way a USB port's much higher, unlimited current capability would.

**Why a single number cannot replace it.**

A power supply's benefit is not a reading; it is *control*. A `Serial.print()` on a USB-powered board confirms the board is running; it reveals nothing about how that same circuit would behave on a slightly different or slightly noisier voltage, which is the condition a real battery-powered deployment will eventually meet.

## Oscilloscope
<p align="center"><img src="../../../../assets/study-guide/oscilloscope.png" alt="Oscilloscope: basic display, key measurements, controls overview, triggering, and common waveforms" width="700"></p>

**An oscilloscope** is an instrument that displays a signal's **voltage plotted against time**, drawing a continuously updating graph on its screen rather than reporting a single number. Where a DMM collapses a signal down to one static value, an oscilloscope shows the actual shape of that voltage as it changes, moment to moment, revealing exactly how fast it rises or falls, how clean or distorted it is, and whether it is behaving the way the circuit's design assumes it should. This is the instrument reached for whenever the *question itself* is about behaviour over time rather than a fixed reading.

**Operating procedure.**

Connect a probe (with its ground clip attached to the circuit's ground) to the point of interest, then set the vertical scale (volts/division) and horizontal scale (time/division) so the waveform fills the screen usefully. A trigger setting tells the scope when to "start drawing," so a repeating signal appears as a stable picture instead of a smear.

**Bandwidth and sample rate.**

An oscilloscope's **bandwidth** is the highest frequency it can capture without significantly distorting the reading. Using a scope with too little bandwidth for a fast signal makes real edges look artificially slow and rounded. Its **sample rate** (how many voltage readings it takes per second) is a direct, concrete example of the discrete sampling concept covered in the Math/Signal Processing section: a scope is simply a very fast sampler, and too low a sample rate for a given signal produces the same kind of misleading, aliased result that reading a DHT22 faster than its own sampling rate does.

**Probes: x1 vs. x10.**

A basic x1 probe passes the signal straight through unchanged. An **x10 probe** deliberately attenuates (reduces) the signal by a factor of 10 before it reaches the scope, which sounds counterproductive, but it also presents a much higher impedance to the circuit under test, disturbing the measured signal far less. Most real-world probing defaults to x10 for this reason, with the scope's display scaled back up by 10× automatically.

**Multiple channels.**

A scope with two or more input channels can display several signals on the same time axis simultaneously, essential for checking that two signals are correctly timed *relative to each other*, such as the SDA (data) and SCL (clock) lines of an I²C bus driving something like an OLED display; a single-channel view could show each line looking fine on its own while missing that they are misaligned in time relative to one another.

**When to use it.**

Whenever a signal's actual *shape* over time needs to be seen: a clean square wave versus a distorted one, how fast a voltage rises or falls, a glitch that only happens once every few seconds, or whether two signals (like a clock and a data line) are timed correctly relative to each other.

**Why it shows something a single number cannot.**

A passive buzzer driven with `tone(pin, frequency)` generates a square wave at a chosen frequency. In a simulator, the only feedback available is the numeric frequency value in the code and a simulated sound; on a real physical board, the actual tone the buzzer produces can be heard, a genuine step up from simulation. But even hearing the real tone does not show the *signal* itself. An oscilloscope connected to the buzzer's pin reveals that square wave directly: its exact voltage swing, how sharp its edges are, and whether it is a clean, consistent wave or one with glitches, none of which a `Serial.print()` of a single frequency number, or listening alone, can reveal, because neither carries any concept of *voltage shape over time*.

## Spectrum analyser
<p align="center"><img src="../../../../assets/study-guide/spectrum-analyser.png" alt="Spectrum analyser: display example, key measurements, trace types, front panel controls, and typical applications" width="700"></p>

A spectrum analyser is an instrument that displays a signal's **frequency content**: which frequencies are present within it, and how strong each one is, plotted as amplitude against frequency rather than an oscilloscope's voltage against time. A real-world signal that looks like a single clean tone on an oscilloscope's time-domain trace can actually be a mix of several frequencies layered on top of one another; a spectrum analyser takes that same signal and re-expresses it in the frequency domain, so each individual frequency component shows up as its own separate spike on the display. This is the instrument reached for whenever the question is about *which* frequencies are present, rather than how a signal's voltage changes moment to moment.

**Operating procedure.**

Connect it to the signal, set the frequency span of interest (e.g. 0 Hz to 5 MHz), and read the resulting plot: a single sharp spike means a pure tone; multiple spikes mean multiple frequencies are present.

**Amplitude in dBm, and resolution bandwidth.**

A spectrum analyser typically plots amplitude in **dBm** (decibels relative to one milliwatt) rather than a linear voltage scale, because signal power in real-world RF work spans an enormous range that a logarithmic scale represents far more usefully. Its **resolution bandwidth (RBW)** setting controls how finely it can separate two closely-spaced frequencies. A narrower RBW resolves close frequencies more precisely but takes longer to sweep across a given span, the same precision-vs-speed tradeoff that recurs throughout measurement instruments.

**When to use it.**

When the question concerns frequency content rather than timing: whether a radio transmitter is emitting only on its intended frequency or leaking energy onto adjacent ones (interference), or whether a "clean" sine wave from a signal generator actually contains unwanted harmonics. *Concrete example:* the ESP32's Wi-Fi radio is required to transmit only within its allocated 2.4 GHz channel. A spectrum analyser is the instrument a compliance/EMC test lab uses to confirm a real product's radio does not leak energy into neighbouring channels or interfere with other devices, the kind of regulatory check that happens long before a Wi-Fi-enabled product is legally allowed to be sold.

**Why an oscilloscope alone cannot answer this.**

A distorted sine wave and a clean one can sometimes look deceptively similar on an oscilloscope's time-domain trace, especially if the distortion is subtle. A spectrum analyser makes that distortion obvious immediately, because a perfectly clean tone shows as one spike, and any distortion shows up as extra spikes (harmonics) that would be far harder to notice on an oscilloscope trace.

## Signal generator
<p align="center"><img src="../../../../assets/study-guide/signal-generator.png" alt="Signal generator: output waveforms, key output parameters, modulation options, connection diagram, and typical setup" width="700"></p>

**A signal generator** is an instrument that produces a controlled test waveform (a sine, square, or other shape) at a chosen frequency and amplitude, fed into a circuit under test. Where the other three instruments in this section all *measure* something already present in a circuit, a signal generator is the one that supplies the input in the first place: a known, precisely defined signal whose effect on a circuit can then be observed with an oscilloscope or spectrum analyser. This is the instrument reached for whenever a circuit needs to be exercised with a specific, repeatable test signal rather than whatever it happens to be doing on its own.

**Operating procedure.**

Select the waveform shape, frequency, and amplitude/offset, then connect its output to the input of the circuit under test.

**Modulation and sweep.**

Beyond a single fixed tone, most signal generators can also **modulate** their output, varying its amplitude (AM), frequency (FM), or phase (PM) over time to mimic a real communications signal, or **sweep** smoothly across a range of frequencies automatically, which is how a circuit's frequency response (whether it behaves the same at 100 Hz as at 10 kHz, for example) gets characterised without manually resetting the frequency by hand hundreds of times.

**Output impedance matching.**

A signal generator's output is typically rated at a specific impedance (commonly 50 Ω for RF work). Feeding it into a circuit with a mismatched impedance can partially reflect the signal back into the generator, distorting both the delivered amplitude and the reading, which is why matching source and load impedance is a standard checklist item before trusting an RF measurement, not just an academic detail.

**When to use it.**

Whenever a known, repeatable input is needed to judge what a circuit under test does *to* that input: for example, feeding a clean 1 kHz sine wave into an amplifier circuit, then using an oscilloscope on the output to see whether the circuit amplified it cleanly or distorted it. *Concrete example:* a signal generator can substitute for a real potentiometer or sensor during development, feeding a microcontroller's ADC input a known, precisely controlled voltage to confirm the code's `map()` and threshold logic behave correctly, before wiring up the real physical sensor.

**Why it matters as a pair with the other three.**

A signal generator is normally used *together* with an oscilloscope and/or spectrum analyser, not alone: the generator supplies a known input, and the other instrument shows what happened to it on the way through the circuit. Used together, this is how a technician verifies that a circuit does what it is supposed to, rather than merely "seems to work."

**The general principle underneath all four instruments:**

A DMM answers "what is the value right now," while an oscilloscope, spectrum analyser, and signal generator exist because a single number is often not enough. A circuit's behaviour over time, or across frequencies, or in response to a known test input, can reveal problems (or confirm correctness) that a static reading simply cannot show.
