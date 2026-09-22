# Deployment Environments and Their Impact on IoT Devices

Every sensor, circuit, and wireless link discussed so far in this guide has an implicit assumption baked in: that it is sitting somewhere comfortable, indoors, at room temperature, out of the rain, away from vibration and dust. "IoT" as a name literally means putting these devices *out* in the world, and the world is rarely that considerate. The same PIR sensor, the same DHT22, the same ESP32 board behaves identically as a piece of electronics no matter where it ends up, but "identically as a piece of electronics" and "identically reliable in practice" are two very different claims, and this section is about the gap between them.

<p align="center"><img src="../../../../assets/study-guide/10-deployment-environments.png" alt="Five deployment contexts for the same kind of sensor, desk, greenhouse, cold-chain warehouse, industrial/data centre, and outdoor weather station, each with a different dominant environmental factor" width="700"></p>

This section covers a range of real-world deployment contexts: HVAC systems, greenhouse/agricultural automation, cold-chain/warehouse monitoring, data-centre climate monitoring, and outdoor weather stations.

**The core idea: the sensor's principle of operation never changes, but its real-world reliability depends entirely on where it is deployed.** A DHT22 measures temperature and humidity the same way no matter where it sits, but *how well* it can do that job, and how long its hardware survives doing it, depends heavily on its surroundings:

- **On a desk**, in a stable, climate-controlled room, the baseline case most builds start in, whether running in a simulator or wired up on a real board. Nothing environmental interferes with the reading.
- **In a greenhouse**, high humidity and condensation can affect a sensor's accuracy over time, or, in a real (non-simulated) deployment, cause slow corrosion of exposed contacts.
- **In a cold-chain warehouse**, sustained temperature extremes can push a sensor's readings outside its rated accuracy range, or stress the microcontroller's own components beyond their intended operating range.
- **In an industrial setting or data centre**, dust and airborne particulates can accumulate on sensors or clog moving parts (fans, for instance), vibration from nearby machinery can loosen physical connections over time, and unreliable industrial power supplies can cause power interruptions that a device needs to gracefully recover from.
- **Outdoors at a weather station**, direct sun, wind, rain, and much wider daily temperature swings than an indoor deployment ever experiences all come into play simultaneously.

**Environment can also influence *which* microcontroller a real deployment chooses**, not just how it is enclosed. An industrial or automotive-adjacent deployment might specifically choose an STM32 part rated for an extended industrial temperature range (many are rated to −40 °C to +85 °C or wider) over a consumer-grade board never characterised or guaranteed outside a much narrower comfortable range; a battery-powered outdoor sensor node might avoid an ESP32 specifically because of its radio's power draw (see the Electricity/Energy section above), preferring a lower-power MCU paired with a purpose-built low-power radio instead.

When answering a question on this topic, the strongest answers name a *specific* environmental factor and explain its *specific* mechanism of effect on a *specific* sensor or device, not just a general statement that "the environment matters."
