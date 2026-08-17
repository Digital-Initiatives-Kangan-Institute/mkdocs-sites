# Week 2: Arduino Digital Output and Functions Activity

## Overview

This comprehensive worksheet covers seven tasks progressing from basic function concepts to complex capstone projects. Students learn three function types through practical ESP32-S3 projects.

![Circuit Diagram](../../assets/week-2/Image-2.png)

## Learning Objectives

Students will learn three function types:

1. **Functions without parameters** — reusable blocks that behave identically each time
2. **Functions with parameters** — flexible code that adapts based on inputs
3. **Functions with return values** — functions that send data back to the caller

## Task Breakdown

### Tasks 1–4: Core Concepts
Each task introduces a function type individually:

- **Task 1**: Use a `beep()` function to create SOS patterns
- **Task 2**: Implement `showColor()` for RGB LED cycling
- **Task 3**: Demonstrate `controlLED()` returning LED state as a boolean
- **Task 4**: Create an LED chase sequence using `lightLED()`

### Task 5: Debugging Worksheet
Eight debugging scenarios covering common mistakes:

- Missing type declarations
- Mismatched argument counts
- Incorrect return statements
- And more!

### Tasks 6–7: Integration Projects
Combining all three function types:

- **Task 6**: Build a traffic light system with warnings and pedestrian displays
- **Task 7** (Capstone): Create a music box with note sequencing, visual feedback, and state tracking

## Key Design Principle

!!! note "Code Reuse"
    The activity emphasizes code reuse: "no repeated `digitalWrite`/`delay` blocks" appears throughout the checklist, reinforcing that functions eliminate copy-paste duplication.
