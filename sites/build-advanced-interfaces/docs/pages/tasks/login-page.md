# Cafe Site Login

This is a **guided, line-by-line build** of a login page for the cafe owner, with client-side validation. It is a **simulated scenario** — there is no real backend, so validation happens entirely in the browser.

!!! abstract "Instructions"
    Build the login page below, then add the validation script. Your page must:

    - Be clearly for cafe staff (heading, e.g. "Cafe Owner Login")
    - Have **email** and **password** inputs, each with a `<label>`
    - Have a styled submit button and a link back to the cafe home page
    - Match the styling of your existing cafe site

    Your validation must:

    - Check the email is not empty
    - Check the password is not empty and is at least **8 characters**
    - Show error messages **on the page** (not browser alerts) near each input
    - Stop the form submitting until all fields are valid

    Push your work to GitHub. See the [Version Control](/version-control) site for help with committing and pushing.

---

## The Login Page

Create `login.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cafe Owner Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Cafe Owner Login</h1>
    </header>

    <section class="login">
        <form id="login-form" novalidate>
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
            <span class="error" id="email-error"></span>

            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <span class="error" id="password-error"></span>

            <button type="submit">Log in</button>
        </form>

        <a href="index.html">Back to home</a>
    </section>

    <script src="login.js"></script>
</body>
</html>
```

**What this file does in one sentence:** it shows a login form with email and password fields, ready for JavaScript validation.

Line by line:

1. **`<title>Cafe Owner Login</title>`** — the browser tab title.
2. **`<form id="login-form" novalidate>`** — the form. `id` lets JavaScript find it; `novalidate` turns off the browser's built-in validation so *your* JavaScript controls the messages.
3. **`<label for="email">Email</label>`** and **`<input type="email" id="email">`** — the label and input pair; `for` must match `id`.
4. **`<span class="error" id="email-error"></span>`** — an empty placeholder where the error message will appear.
5. **`<input type="password" id="password">`** — `type="password"` masks the typed characters.
6. **`<button type="submit">Log in</button>`** — submits the form (which the JavaScript will intercept).
7. **`<a href="index.html">Back to home</a>`** — links back to the cafe home page.
8. **`<script src="login.js"></script>`** — loads the validation script.

---

## Style the Login Page

Add these rules to `styles.css`:

```css
.login {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
}

.login label {
    display: block;
    margin-top: 1rem;
}

.login input {
    width: 100%;
    padding: 0.5rem;
}

.error {
    color: #d32f2f;
    font-size: 0.9rem;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #5d4037;
    color: #fff;
    border: none;
}
```

Line by line:

- **`.login { max-width: 400px; margin: 2rem auto; }`** — keeps the form narrow and centred.
- **`.login label { display: block; }`** — puts each label on its own line above its input.
- **`.login input { width: 100%; }`** — makes the inputs fill the form width.
- **`.error { color: #d32f2f; }`** — styles the error messages in red.
- **`button { ... }`** — styles the submit button to match the cafe theme.

---

## Add Input Validation

Create `login.js`:

```js
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

function validateEmail() {
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required.";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validatePassword() {
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required.";
        return false;
    }
    if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        return false;
    }
    passwordError.textContent = "";
    return true;
}

function validateForm(event) {
    const emailOk = validateEmail();
    const passwordOk = validatePassword();

    if (!emailOk || !passwordOk) {
        event.preventDefault();
    }
}

form.addEventListener("submit", validateForm);
```

**What this code does in one sentence:** it checks both fields when the form is submitted and shows a message next to any field that fails.

Line by line:

1. **`const form = document.getElementById("login-form");`** and the next four lines — find the form, the two inputs, and the two error `<span>`s.
2. **`function validateEmail() { ... }`** — checks the email field:
    - `emailInput.value` is whatever the visitor typed.
    - `.trim()` removes spaces from both ends, so `"   "` counts as empty.
    - If empty, set the error text and `return false` (validation failed).
    - Otherwise clear the error text and `return true` (validation passed).
3. **`function validatePassword() { ... }`** — same idea with two checks: not empty, and `.length >= 8`.
4. **`function validateForm(event) { ... }`** — runs both checks and stores the results in `emailOk` and `passwordOk`.
5. **`if (!emailOk || !passwordOk) { event.preventDefault(); }`** — `||` means "or". If *either* check failed, stop the form from submitting.
6. **`form.addEventListener("submit", validateForm);`** — runs `validateForm` when the form is submitted.

---

## Now You Try: Extra Rules

Add more validation rules yourself, repeating the same pattern:

- Email must contain an `@` and a `.`
- Password must contain at least one number

Each new rule is a new `if` inside the matching validator, with a message and `return false`.

??? hint "Hint - Click to expand"
    For the email format, add `if (!emailInput.value.includes("@")) { ... }`. For a number in the password, loop over the characters and check each one with `isNaN(char)` being false for a digit — or use a regular expression like `/\d/`. Keep the `return true` as the final line so all checks must pass.

---

## Key Vocabulary Recap

| Term | Meaning |
| :--- | :--- |
| **Validation** | Checking user input before accepting it |
| **`novalidate`** | Disables the browser's built-in validation |
| **`.trim()`** | Removes whitespace from both ends of a string |
| **`preventDefault`** | Stops the form's default submit action |
| **`.length`** | The number of characters in a string |

---

## Summary

- Pair every `<label for>` with a matching `<input id>`
- Put an empty `<span class="error">` next to each input for its message
- Each validator checks one field and returns `true` or `false`
- Only prevent submission when at least one check fails
