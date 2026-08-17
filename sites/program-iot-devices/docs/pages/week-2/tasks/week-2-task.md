# Week 2: Digital Output and Functions Task

## Overview
Students build an LED circuit on an ESP32-S3 and practice writing functions with parameters and return values.

## Requirements

### Hardware Setup
- Connect an LED to GPIO13 with a 220Ω resistor
- Ensure proper polarity (long leg to power through resistor, short leg to ground)

### Programming Requirements
- Create a blink function with speed parameters
- Build a function that toggles the LED and reports its state via Serial Monitor

## Core Concepts

The guided questions address fundamental programming principles:

- Function encapsulation versus inline code
- The purpose of `pinMode()` initialization in `setup()`
- Why parameters enable flexible function behavior
- How return types allow functions to communicate results back to callers

## Common Mistakes (Bug Rounds)

The worksheet covers seven typical errors:

1. **Missing parentheses** when invoking functions
2. **Argument mismatch** — passing fewer arguments than declared
3. **Return type conflicts** — returning values from `void` functions
4. **Missing initialization** — omitting `pinMode()` setup
5. **Argument order errors** — swapping parameter positions
6. **Missing return statements** — declaring a return type but not using it
7. **Case sensitivity** — misspelling function names

!!! tip "Learning from Mistakes"
    Each bug demonstrates how C++ enforces strict syntax rules and the importance of careful function design.

## Checklist

- [ ] Hardware circuit built and tested
- [ ] Blink function with speed parameter implemented
- [ ] Toggle function with return value implemented
- [ ] Serial Monitor output verified
- [ ] All common mistakes understood
- [ ] Code review completed
