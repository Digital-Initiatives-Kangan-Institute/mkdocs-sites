# Mantine Tables and Filters

These exercises practise showing lists of data with Mantine: tables, badges, cards in a grid, tabs, and filters that narrow down what is shown. You will use product data from DummyJSON.

Revisit [Mantine UI](../resources/mantine/mantine.md) and [Arrays with map and filter](arrays-map-filter.md) while you work.

## Setup

!!! abstract "Instructions"
    Keep using your `mantine-practice` app from [Mantine Form Inputs](mantine-form-inputs.md). If you have not made it yet, follow the Setup steps on that page first.

    Every exercise uses this URL, which asks for 30 products and only the fields you need:

    ```text
    https://dummyjson.com/products?limit=30&select=title,category,price,stock,availabilityStatus
    ```

    Each exercise goes in its own folder: `app/table1/page.tsx`, `app/table2/page.tsx` and so on.

??? code "click to expand"
    ```tsx
    type Product = {
        id: number;
        title: string;
        category: string;
        price: number;
        stock: number;
        availabilityStatus: string;
    };
    ```

## A Basic Table

!!! abstract "Instructions"
    Create `app/table1/page.tsx`.

    1. Fetch the products in a `useEffect` and store them in state. Show a `Loader` while they load.
    2. Show them in a Mantine `Table` with the columns **Product**, **Category**, **Price** and **Stock**.
    3. Build the table from `Table.Thead`, `Table.Tbody`, `Table.Tr`, `Table.Th` and `Table.Td`.
    4. Show the price with a dollar sign and two decimal places.
    5. Add a `Table.Caption` that says how many products are shown.
    6. Turn on the `striped` and `highlightOnHover` props.
    7. **Check:** make the browser window narrow. Wrap the table in `Table.ScrollContainer` with a `minWidth` of `600` so it scrolls sideways instead of squashing.

??? code "click to expand"
    ```tsx
    <Table striped highlightOnHover>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Product</Table.Th>
                {/* TODO: other headings */}
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {/* TODO: one Table.Tr per product */}
        </Table.Tbody>
    </Table>
    ```

??? hint "Hint - Click to expand"
    Each `Table.Tr` inside `.map()` needs a `key`. `price.toFixed(2)` gives two decimal places. `Table.Th`, `Table.Td` and the rest create real `<th>`, `<td>` and `<tr>` elements, so screen readers can read the table properly.

## Status Badges

!!! abstract "Instructions"
    Create `app/table2/page.tsx`. Copy your table from `table1` and add a **Status** column.

    1. Show `availabilityStatus` in a `Badge` with `variant="light"`.
    2. Choose the badge colour from the status: green for **In Stock**, yellow for **Low Stock** and red for **Out of Stock**. Use grey for anything else.
    3. Keep the status words inside the badge, so the status is still clear to someone who cannot see colour.
    4. Make the **Stock** number red with `c="red"` when it is below 10.
    5. **Check:** scroll through the table and check that every row has a badge with the right colour.

??? hint "Hint - Click to expand"
    An object works well as a lookup table: `const statusColours: Record<string, string> = { "In Stock": "green", ... }`. Then `statusColours[product.availabilityStatus] ?? "gray"` handles statuses you didn't list.

## Filtering With a Segmented Control

!!! abstract "Instructions"
    Create `app/table3/page.tsx`. Copy your table from `table2`.

    1. Add a `SegmentedControl` above the table with **All**, **In Stock**, **Low Stock** and **Out of Stock**.
    2. Filter the products shown in the table by the selected status. **All** shows everything.
    3. Do not change the products state when filtering. Work out a new `shownProducts` array from it each time the page renders.
    4. When no products match, hide the table and show a `Text` saying **No products match this filter** with a **Show all** button (`variant="subtle"`) that sets the filter back to **All**.
    5. Update the table caption so it says, for example, **Showing 4 of 30 products**.
    6. **Check:** click each filter. None of the first 30 products are out of stock, so **Out of Stock** should show your no-match message. Use **Show all** to get back.

??? hint "Hint - Click to expand"
    `const shownProducts = filter === "All" ? products : products.filter(...)`. Because it is calculated from state on every render, it never gets out of date and you do not need a second `useState`.

## Search and a Second Filter

!!! abstract "Instructions"
    Create `app/table4/page.tsx`. Copy your page from `table3`.

    1. Add a `TextInput` labelled **Search** that filters by product title, ignoring upper and lower case.
    2. Add a `Select` labelled **Category** whose options are built from the categories in the data, with no duplicates.
    3. All three filters (status, search and category) work together.
    4. Add a **Clear filters** button that resets all three. Disable it when no filters are set.
    5. **Check:** search for `a`, choose a category and a status, then clear everything.

??? hint "Hint - Click to expand"
    `[...new Set(products.map((p) => p.category))]` gives a list of categories without duplicates. Chain `.filter()` calls, one per filter, or put all three checks inside a single `.filter()` with `&&`.

## Cards, Grids and Tabs

!!! abstract "Instructions"
    Create `app/table5/page.tsx`. Show the same products two different ways.

    1. Add `Tabs` with two tabs: **Table** and **Cards**.
    2. The **Table** panel shows your table from `table2`.
    3. The **Cards** panel shows one `Card` per product inside a `SimpleGrid`: 1 column on small screens, 2 on medium and 3 on large.
    4. Each card shows the title with `Title order={3}`, the category in dimmed `Text`, the price, and the status badge.
    5. Put the status filter from `table3` **above** the tabs so it works for both views.
    6. **Check:** filter to **Low Stock**, then switch between the tabs. Both should show the same products. Use the arrow keys to move between the tabs.

??? hint "Hint - Click to expand"
    `Tabs` needs a `defaultValue`, then a `Tabs.List` of `Tabs.Tab` buttons and one `Tabs.Panel` per tab with a matching `value`. `SimpleGrid` takes responsive `cols` as an object: `{ base: 1, sm: 2, lg: 3 }`. Dimmed text is `c="dimmed"`.

## From Memory: User Directory Table

!!! abstract "Instructions"
    Without looking back, build `app/table6/page.tsx` from `https://dummyjson.com/users?limit=30&select=firstName,lastName,email,role,age`:

    - A table with **Name**, **Email**, **Role** and **Age** columns, with loading and error states
    - The role shown as a coloured `Badge` with its text
    - A `SegmentedControl` filter for the roles, with **All**
    - A search box that matches first or last name
    - A no-match message with a way back to everything
    - A caption that counts the users shown
