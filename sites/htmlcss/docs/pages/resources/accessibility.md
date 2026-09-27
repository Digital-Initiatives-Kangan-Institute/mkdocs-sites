# Accessibility

**Web accessibility** means building websites that everyone can use, including people with disabilities. This page explains the **Web Content Accessibility Guidelines (WCAG)** and the practical steps that make a simple website accessible.

---

## Why Accessibility Matters

Around **1 in 5 Australians** live with disability. People use the web in many different ways:

| Situation | How they might use the web |
|---|---|
| Blind or low vision | A **screen reader** that reads the page aloud, or zooming in to enlarge text |
| Colour blindness | May not be able to tell certain colours apart |
| Limited movement in hands | A **keyboard** only (no mouse), or voice control |
| Deaf or hard of hearing | Captions and transcripts for videos and audio |
| Cognitive or learning disability | Clear, simple language and consistent layouts |

Accessibility also helps people who are not disabled: someone using a phone in bright sunlight, someone with a broken arm, or an older person whose eyesight is changing.

In Australia, the **Disability Discrimination Act 1992** makes it unlawful to discriminate against people with disability, and this applies to websites. See [Legislation and Procedures](legislation.md).

***

## WCAG

The **Web Content Accessibility Guidelines (WCAG)** are published by the **W3C** as part of its **Web Accessibility Initiative (WAI)**.

The purpose of WCAG is to provide an **international standard** for making web content accessible to people with disabilities. It gives developers a clear set of testable rules (called **success criteria**) to check a website against.

WCAG is used by governments and organisations around the world, including Australian government websites, as the benchmark for an accessible website.

### The Four Principles (POUR)

WCAG is organised around four principles. Content must be:

| Principle | Meaning | Examples |
|---|---|---|
| **Perceivable** | Everyone must be able to see, hear or otherwise take in the content | Alt text on images, good colour contrast, captions on videos |
| **Operable** | Everyone must be able to use the controls and navigation | Everything works with a keyboard, links are clear, no content that flashes |
| **Understandable** | Content and controls must be easy to understand | Clear language, consistent navigation, labelled form fields |
| **Robust** | Content must work with different browsers and assistive technology | Valid HTML that follows W3C standards |

### Conformance Levels

Each WCAG success criterion has a level:

| Level | Meaning |
|---|---|
| **A** | The minimum. Without these, some people cannot use the site at all. |
| **AA** | The standard most organisations and governments aim for. Includes colour contrast requirements. |
| **AAA** | The highest level. Not always possible for every type of content. |

Most websites should aim to meet **WCAG Level AA**.

***

## Accessible HTML Checklist

Most accessibility comes from writing good HTML. The table below lists practical steps for a simple website.

| Check | How | See |
|---|---|---|
| Every image has **alt text** | Add a descriptive `alt` attribute to every `img` (use `alt=""` for decoration) | [Attributes](element-attributes.md#alt-text) |
| The page language is set | `<html lang="en">` | [Page Structure](page-structure.md) |
| Every page has a clear **title** | A descriptive `<title>` on every page | [Page Structure](page-structure.md#page-titles) |
| **Headings** are in order | One `h1`, then `h2`, `h3` without skipping levels | [Elements](elements.md#headings) |
| **Semantic elements** are used | `header`, `nav`, `main`, `footer` | [Page Structure](page-structure.md#semantic-layout-elements) |
| Link text is **descriptive** | Never just "click here" | [Links and Navigation](links-navigation.md#links-inside-text) |
| Every form input has a **label** | `label for` matches the input `id` | [Tables and Forms](tables-forms.md#labels) |
| Tables have **heading cells** | Use `th` for the heading row | [Tables and Forms](tables-forms.md) |
| Navigation is **consistent** | Same menu in the same place on every page | [Links and Navigation](links-navigation.md) |

***

## Colour Contrast

**Contrast** is the difference in brightness between text and its background. Low contrast text is hard or impossible to read for people with low vision, and for anyone looking at a screen in bright light.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cCBjbGFzcz1cInBvb3JcIj5Qb29yIGNvbnRyYXN0OiBsaWdodCBncmV5IHRleHQgb24gd2hpdGU8L3A+XG48cCBjbGFzcz1cInBvb3IyXCI+UG9vciBjb250cmFzdDogeWVsbG93IHRleHQgb24gd2hpdGU8L3A+XG48cCBjbGFzcz1cImdvb2RcIj5Hb29kIGNvbnRyYXN0OiBkYXJrIHRleHQgb24gYSBsaWdodCBiYWNrZ3JvdW5kPC9wPlxuPHAgY2xhc3M9XCJnb29kMlwiPkdvb2QgY29udHJhc3Q6IHdoaXRlIHRleHQgb24gYSBkYXJrIGJhY2tncm91bmQ8L3A+In1dLCAiY3NzIjogInAge1xuICBwYWRkaW5nOiAxMnB4O1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4ucG9vciAgeyBjb2xvcjogI2NjY2NjYzsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgfVxuLnBvb3IyIHsgY29sb3I6ICNmNWU2NjM7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cbi5nb29kICB7IGNvbG9yOiAjMjIyMjIyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJmYWY2OyB9XG4uZ29vZDIgeyBjb2xvcjogI2ZmZmZmZjsgYmFja2dyb3VuZC1jb2xvcjogIzFlNWY3NDsgfSIsICJqcyI6ICIiLCAiYWN0aXZlVGFiIjogImh0bWwiLCAiYWN0aXZlUGFnZSI6ICJpbmRleC5odG1sIn0="></embed>
WCAG Level AA requires a contrast ratio of at least **4.5 to 1** for normal text, and **3 to 1** for large text. You can check two colours with a free tool such as the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/): enter the text colour and background colour as hex codes and it reports whether they pass.

Also, **never use colour alone** to show meaning. For example, "fields marked in red are required" does not work for someone who cannot see red. Add text or a symbol as well.

***

## Keyboard Access

Some people cannot use a mouse and move around a page with the keyboard:

- `Tab` moves forward to the next link, button or form field
- `Shift + Tab` moves backwards
- `Enter` follows a link or presses a button
- `Space` ticks a checkbox

Every link and form field should be reachable with `Tab`, in a sensible order, and you should always be able to **see** which item is selected (the **focus** outline). Using real `a`, `button` and `input` elements makes this work automatically. Never remove the focus outline with CSS without replacing it with another visible style.

***

## Zoom and Text Size

People with low vision often zoom in to make text bigger. A page should still work, with no text cut off or overlapping, when zoomed to **200%** (`Ctrl` and `+` in most browsers, `Ctrl` and `0` to reset).

Using `max-width` rather than fixed widths, `max-width: 100%` on images, and `rem` for font sizes helps pages zoom well.

---

## Summary

- Accessibility means everyone, including people with disabilities, can use a website
- WCAG is the W3C's international standard for accessible web content; most sites aim for Level AA
- The four principles are Perceivable, Operable, Understandable and Robust
- Use alt text, page titles, ordered headings, labels, descriptive links and semantic elements
- Text must have strong contrast with its background (at least 4.5 to 1 for normal text)
- Every link and field must work with the keyboard, and the page must still work at 200% zoom

### Activity - Testing and Validation

[Attempt Activity 11 - Testing and Validation](../tasks/task-11-testing.md){.md-button}
