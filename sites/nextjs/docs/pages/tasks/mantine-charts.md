# Mantine Charts

These exercises use the `@mantine/charts` package to turn data into bar, donut and line charts. You will count values from an array, keep a chart up to date as the data changes, and show the same numbers as text so everyone can read them.

Revisit [Mantine UI](../resources/mantine/mantine.md) and the [Mantine charts documentation](https://mantine.dev/charts/getting-started/) while you work.

## Setup

!!! abstract "Instructions"
    Keep using your `mantine-practice` app from [Mantine Form Inputs](mantine-form-inputs.md). Mantine's charts are built on a library called Recharts, so install both:

    ```bash
    npm install @mantine/charts recharts
    ```

    In `app/layout.tsx`, import `@mantine/charts/styles.css` on the line after `@mantine/core/styles.css`.

    Each exercise goes in its own folder: `app/chart1/page.tsx`, `app/chart2/page.tsx` and so on.

## Your First Bar Chart

!!! abstract "Instructions"
    Create `app/chart1/page.tsx`. Use this made-up data about how many coffees were sold each day:

    ```tsx
    const sales = [
        { day: "Mon", coffees: 42 },
        { day: "Tue", coffees: 38 },
        { day: "Wed", coffees: 51 },
        { day: "Thu", coffees: 47 },
        { day: "Fri", coffees: 63 },
    ];
    ```

    1. Show the data in a `BarChart` that is `300` pixels high.
    2. Use `day` along the bottom and draw one series for `coffees`, labelled **Coffees sold**, in `"teal.6"`.
    3. Add a `Title` above the chart that says what it shows.
    4. Turn on `withBarValueLabel` so each bar shows its number.
    5. **Check:** hover over a bar to see the tooltip.

??? code "click to expand"
    ```tsx
    <BarChart
        h={300}
        data={sales}
        dataKey={/* TODO: which field goes along the bottom? */}
        series={[/* TODO: { name, label, color } */]}
    />
    ```

??? hint "Hint - Click to expand"
    `dataKey` is the name of the field used for the labels along the bottom. Each item in `series` names a field in your data that holds the numbers. Mantine colours are written as a colour name and a shade, like `"teal.6"`. `withBarValueLabel` only shows the numbers when the chart also has a `valueFormatter` prop, a function that turns each number into the text to display.

## Counting Before Charting

!!! abstract "Instructions"
    Create `app/chart2/page.tsx`. Charts need **counts**, but data usually arrives as a list of separate items. Start with this list of made-up help desk requests:

    ```tsx
    type HelpRequest = { id: number; title: string; status: "Open" | "In Progress" | "Closed" };

    const startingRequests: HelpRequest[] = [
        { id: 1, title: "Printer jammed", status: "Open" },
        { id: 2, title: "Password reset", status: "Closed" },
        { id: 3, title: "New laptop", status: "In Progress" },
        { id: 4, title: "Projector bulb", status: "Open" },
        { id: 5, title: "Wi-Fi drops out", status: "Open" },
        { id: 6, title: "Install software", status: "Closed" },
    ];
    ```

    1. Write a `countByStatus` function that takes a status and returns how many requests have it.
    2. Build a `chartData` array with one object per status, for example `{ status: "Open", count: 3 }`.
    3. Show `chartData` in a `BarChart`.
    4. Next to the chart, show the same numbers as a `List`, for example **Open: 3**.
    5. Stop the y-axis showing decimal numbers like 2.5, since you cannot have half a request.
    6. **Check:** the chart and the list show 3 Open, 1 In Progress and 2 Closed.

??? hint "Hint - Click to expand"
    `.filter()` followed by `.length` counts items that match. Build `chartData` by mapping over an array of the three status names. Settings for the y-axis go in the `yAxisProps` prop as an object; look for `allowDecimals`.

## Charts That Update

!!! abstract "Instructions"
    Create `app/chart3/page.tsx`. Copy your page from `chart2` and put the requests in state.

    1. Show the requests in a list. Each one has a `Select` for its status that updates that request in state.
    2. Add a `TextInput` and **Add request** button that adds a new request with the status **Open**.
    3. Add a **Delete** button to each request.
    4. The chart and the text counts update straight away after every change.
    5. Add a `SegmentedControl` that filters the **list** by status. The chart must keep counting **all** requests, whatever the filter is set to.
    6. **Check:** set the filter to **Closed**, then change a closed request to **Open**. It should leave the list, and the chart should show one more Open and one less Closed.

??? hint "Hint - Click to expand"
    Calculate `chartData` from the full `requests` state on every render, not from the filtered list. To update one request, `.map()` over the array and return a changed copy (`{ ...request, status: newStatus }`) for the one with the matching `id`.

## Donut Charts

!!! abstract "Instructions"
    Create `app/chart4/page.tsx`. Copy your page from `chart3`.

    1. Add a `DonutChart` beside the bar chart, using the same counts.
    2. Each slice needs a `name`, a `value` and a `color`. Use one colour per status and use the same colours as the `Badge` for each status in your list.
    3. Turn on `withLabels` and show the total number of requests in the middle with `chartLabel`.
    4. Place the two charts side by side with a `SimpleGrid` of 2 columns.
    5. **Check:** delete every Closed request. Its slice should disappear and the total should drop.

??? hint "Hint - Click to expand"
    `DonutChart` takes `data` as an array of `{ name, value, color }` objects, with no `dataKey` or `series`. Keep the status colours in one object and use it for both the badges and the slices so they always match.

## A Line Chart From an API

!!! abstract "Instructions"
    Create `app/chart5/page.tsx`.

    1. Fetch `https://dummyjson.com/products?limit=20&select=title,price,rating`.
    2. Show a `Loader` while loading and an `Alert` if the request fails.
    3. Draw a `LineChart` with the product number (1 to 20) along the bottom and two series: **price** and **rating**.
    4. Give the line chart a legend with `withLegend`.
    5. Under the chart, add a `Table` of the same data so the numbers can be read without the chart.
    6. **Check:** hover over the chart and compare the tooltip with the table row.

??? hint "Hint - Click to expand"
    Product titles are too long for the bottom axis, so `.map()` the products into new objects with a short label such as `` `#${index + 1}` ``. `LineChart` uses `dataKey` and `series` the same way `BarChart` does.

## From Memory: Class Results

!!! abstract "Instructions"
    Without looking back, build `app/chart6/page.tsx`:

    - A list of at least eight made-up students, each with a name and a result of **Not Yet**, **Satisfactory** or **Merit**
    - A form to add a student, with a `Select` for the result
    - A `Select` on each student to change their result, and a delete button
    - A bar chart and a donut chart of how many students have each result
    - The counts shown as text as well
    - A filter on the list that does not change the charts
