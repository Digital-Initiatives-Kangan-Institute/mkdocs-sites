# Code and Callouts

Reference page for checking code blocks, line numbers, and admonitions.

---

## Code Blocks

Fenced blocks below render with line numbers and a copy button. Gutter numbers should align exactly with code lines.

```html
<h1>Hello, world!</h1>
<p>This is a paragraph.</p>
<a href="https://example.com">Visit Website</a>
```

```css
.card {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
```

```javascript
function greet(name) {
  console.log("Hello, " + name);
}

greet("World");
```

```bash
./serve.sh
```

```python
def greet(name):
    print(f"Hello, {name}")

greet("World")
```

---

## Admonitions

!!! note
    A plain note callout. Check the title bar and body spacing.

!!! note "Custom Title"
    A note with a custom title. Body text should be easy to scan.

!!! abstract "Instructions"
    An instruction-style callout used at the top of task exercises.

??? code "click to expand"
    ```html
    <h1>Starter structure</h1>
    ```

??? hint "Hint - Click to expand"
    A hint with guiding text. It names the technique without giving away full code.

??? tip "Hint - Click to expand"
    An alternative hint style. Check that icons and colours differ from `hint`.

??? question "Hint"
    Another hint style used on some task pages.

---

## Summary

- Code blocks are flat with a thin outline and aligned gutters
- Inline code stays compact inside paragraphs
- Each admonition type is visually distinct but consistent
