# Arrow Function Basics

These exercises practise turning regular functions into arrow functions, using block bodies and implicit returns, returning objects, and writing React components as arrow functions. They are repetitive on purpose: you'll write the same idea several ways, then again from memory, until the syntax comes without thinking.

Revisit [Arrow Functions](../resources/nextjs/arrow-functions.md) while you work.

## Setup

!!! abstract "Instructions"
    Create and run a new app called `activity-01`. Press **Enter** to accept every default question.

    ```bash
    npx create-next-app@latest activity-01
    cd activity-01
    npm run dev
    ```

    Paste this line at the bottom of `app/globals.css` so buttons and inputs are visible:

    ```css
    button, input, select { border: 1px solid; padding: 4px 8px; margin: 4px; }
    ```

    Each exercise goes in its own folder. For the first exercise, create `app/task1/page.tsx` using the starter below, then visit `http://localhost:3000/task1`. For the next exercise make `app/task2/page.tsx`, change `Task1` to `Task2` (in all three places), and visit `/task2`. Do the same for every exercise.

    **Every page starts with `"use client";` on line 1.**

??? code "click to expand"
    ```tsx
    "use client";

    const Task1 = () => {
        return (
            <main>
                <h1>Task 1</h1>
            </main>
        );
    };

    export default Task1;
    ```

!!! note
    If you see an error mentioning *"Client Component"*, add `"use client";` to line 1. If a page shows 404, check the folder name matches the URL and the file is called `page.tsx`.

## Block Bodies

!!! abstract "Instructions"
    Create `app/task1/page.tsx`. Paste the regular functions from the starter code in above the component.

    1. Rewrite each one as an arrow function with a block body (`=> { return … }`).
    2. Display the result of each in the page, e.g. `<p>{greet("Sam")}</p>`, `<p>{double(21)}</p>`, `<p>{add(3, 4)}</p>`.
    3. Write the component itself as an arrow function: `const Task1 = () => { … }`.

    **Check:** the page shows `Hello, Sam!`, `42` and `7`.

??? code "click to expand"
    ```tsx
    function greet(name: string) {
        return "Hello, " + name + "!";
    }

    function double(n: number) {
        return n * 2;
    }

    function add(a: number, b: number) {
        return a + b;
    }
    ```

??? hint "Hint - Click to expand"
    The word `function` and the name move: `function greet(...)` becomes `const greet = (...) =>`. The curly braces and the `return` stay exactly where they were. Don't forget the `;` after the closing brace, because the whole thing is now a `const` statement.

## Implicit Returns

!!! abstract "Instructions"
    Create `app/task2/page.tsx`. Copy your three arrow functions from the previous exercise and rewrite them with an implicit return: no `{ }` and no `return`.

    **Check:** you get the same output as before, and each function fits on one line.

??? hint "Hint - Click to expand"
    Delete the `{`, the word `return`, and the `}`. Whatever was after `return` now goes straight after the `=>`.

## Same Function, Three Ways

!!! abstract "Instructions"
    Create `app/task3/page.tsx`. Write each of these functions three times: as a function declaration, as an arrow with a block body, and as an arrow with an implicit return. Give each version a different name (e.g. `square1`, `square2`, `square3`).

    | Function | Takes | Returns |
    | --- | --- | --- |
    | `square` | a number | the number multiplied by itself |
    | `fullName` | `first` and `last` (strings) | `"first last"` |
    | `toCelsius` | a Fahrenheit number | `(f - 32) * 5 / 9` |
    | `shout` | a string | the string in UPPERCASE with `"!"` on the end |

    Display every version on the page (12 lines of output).

    **Check:** each group of three gives the same answer.

??? hint "Hint - Click to expand"
    For `shout`, strings have a `.toUpperCase()` method. For `fullName`, either join the strings with `+` (remember the space in the middle) or use a template literal with backticks and `${ }`.

## Returning Objects

!!! abstract "Instructions"
    Create `app/task4/page.tsx`.

    An arrow function with an implicit return can't return an object `{ }` straight away, because JavaScript reads the braces as a block body. Wrap the object in **parentheses**:

    ```tsx
    const makePoint = (x: number, y: number) => ({ x: x, y: y });
    ```

    1. Write `makeUser`, which takes `name` (string) and `age` (number) and returns `{ name: name, age: age }`. Write it twice: once with a block body and once with an implicit return.
    2. Write `makeProduct`, which takes `title` and `price` and returns `{ title: title, price: price, onSale: false }`. Again, write both versions.
    3. Store the results in variables and display their properties, e.g. `<p>{user.name} is {user.age}</p>`.

    **Think:** remove the `( )` from the implicit-return version. What does TypeScript say? Put them back afterwards.

??? hint "Hint - Click to expand"
    In the block body version the braces after `=>` are the function body, so you need `return` followed by the object. In the implicit version, the only braces are the object's own, and the `( )` around them tell JavaScript "this is a value, not a body".

## Components as Arrow Functions

!!! abstract "Instructions"
    Create `app/task5/page.tsx`. Paste in the components from the starter code, which are written as regular functions.

    1. Rewrite all three as arrow functions with a block body.
    2. Use them in your page: `<Header />`, `<Greeting name="Alex" />`, `<Greeting name="Jo" />`, `<Footer />`.
    3. Rewrite them again as arrow functions with an implicit return. You can't have two components with the same name in one file, so call these `Header2`, `Footer2` and `Greeting2`.
    4. Make a `Greeting3` that **destructures** its props. Destructuring means pulling `name` straight out of the props object in the brackets, so you can write `name` instead of `props.name`.

??? code "click to expand"
    ```tsx
    function Header() {
        return <h1>My Arrow Function Site</h1>;
    }

    function Footer() {
        return <p>© 2026 Me</p>;
    }

    function Greeting(props: { name: string }) {
        return <p>Welcome back, {props.name}!</p>;
    }
    ```

??? hint "Hint - Click to expand"
    Components follow exactly the same conversion as other functions. The props type stays attached to the parameter. For destructuring, the brackets change from `(props: { name: string })` to `({ name }: { name: string })`.

## Create Your Own

!!! abstract "Instructions"
    Create `app/task6/page.tsx`. Write these as implicit-return arrow functions and display the results:

    1. `areaOfRectangle(width, height)`
    2. `addGST(price)`: returns the price plus 10%
    3. `initials(first, last)`: returns e.g. `"J.S."`
    4. A component `PriceTag` that takes a `price` prop and renders `<p>Price: ${price}</p>`, used three times with different prices.

    In the `PriceTag` JSX the `$` is just a dollar sign printed on the page, and `{price}` is the part that shows the value. It isn't a template literal.

??? hint "Hint - Click to expand"
    `first[0]` gives the first letter of a string. Adding 10% is the same as multiplying by `1.1`. Every parameter needs a TypeScript type.

## From Memory

!!! abstract "Instructions"
    Without looking at your code, create `app/task7/page.tsx` and write five arrow functions of your own. At least one should return an object and at least one should be a component. Use them all on the page.
