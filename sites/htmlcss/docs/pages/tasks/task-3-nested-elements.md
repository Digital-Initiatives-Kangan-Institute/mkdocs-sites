# Task 3 - Nested Elements

## Bold Text

!!! abstract "Instructions"
    **Using the editor below**, create a **paragraph** with a sentence inside, then **bold** one word within the paragraph.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The tag name for the **paragraph** element is called `p` and **bold** is `b`. Remember elements need an opening and closing tag.

## Emphasis in a Paragraph

!!! abstract "Instructions"
    **Using the editor below**, write a paragraph of two sentences. Mark one word as **important** and **emphasise** a different word.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Both `strong` and `em` nest inside the `p`, wrapped around a single word. Close each one before the paragraph's closing tag.

## Lists

!!! abstract "Instructions"
    **Using the editor below**, create a **list** with `3` items.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The tag name for the **unordered list** element is called `ul` and **list items** are `li`. Remember elements need an opening and closing tag.

## Shopping List

!!! abstract "Instructions"
    **Using the editor below**, add a heading `Shopping List` and an unordered list containing `5` items you would buy at a supermarket.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICIifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The heading sits above the list, not inside it. Each of the `5` items is its own `li`, and all of them sit inside a single `ul`.

## Ordered Lists

!!! abstract "Instructions"
    **Using the editor below**, turn the steps into a **numbered** list.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+SG93IHRvIEJvb2sgYSBTZXJ2aWNlPC9oMj5cblxuQ2hvb3NlIHRoZSBzZXJ2aWNlIHlvdSBuZWVkXG5QaWNrIGEgZGF5IGFuZCB0aW1lXG5FbnRlciB5b3VyIGNvbnRhY3QgZGV0YWlsc1xuUHJlc3MgdGhlIEJvb2sgTm93IGJ1dHRvbiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    A numbered list uses `ol` instead of `ul`. The items inside still use `li`. You do not need to type the numbers; the browser adds them.

## Fix the Nesting

!!! abstract "Instructions"
    **Using the editor below**, fix the code so that every element is closed in the correct order.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5PdXIgPGI+YmVzdC1zZWxsaW5nPC9wPjwvYj4gaXRlbSBpcyB0aGUgbW91bnRhaW4gYmlrZS48L3A+XG5cbjx1bD5cbiAgPGxpPkhlbG1ldHNcbiAgPGxpPkJpa2UgbGlnaHRzPC9saT5cbjwvdWw+PC9saT4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    The last element opened should be the first element closed. Read each line and check that no two elements overlap. There should be exactly one closing tag for every opening tag.

## Nested Lists

!!! abstract "Instructions"
    **Using VS Code**, create a page containing a list with sub-lists inside it.

    This builds on the list you made above. Your page must include:

    - an unordered list with `2` category items
    - a nested list with `2` items inside each category

??? question "Hint"
    The nested list sits inside its parent list item, after the category text, so the order is category text first, then the inner list, then the parent item's closing tag. All lists use `ul` and all items use `li`.

## Menu Categories

!!! abstract "Instructions"
    **Using VS Code**, create a new `menu.html` page for a restaurant menu using nested lists.

    Your page must include:

    - a main heading `Menu`
    - an unordered list with `3` categories: `Starters`, `Mains` and `Desserts`
    - a nested list of `3` dishes inside each category
    - the name of one dish in each category in **bold** as the chef's recommendation

??? question "Hint"
    This repeats the Nested Lists exercise with one more category and one more level of nesting: the bold element nests inside a list item, which is inside a nested list. Indent each level so you can see which element is inside which.

## Grouping with Containers

!!! abstract "Instructions"
    **Using the editor below**, group each product's heading, description and price inside its own container element.

    The CSS tab already adds a border to every container, so when you have finished there should be **three** separate boxes in the preview.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDM+Um9hZCBCaWtlPC9oMz5cbjxwPkxpZ2h0d2VpZ2h0IGZyYW1lIGZvciBmYXN0IHJpZGluZy48L3A+XG48cD4kODk5LjAwPC9wPlxuXG48aDM+TW91bnRhaW4gQmlrZTwvaDM+XG48cD5TdHJvbmcgc3VzcGVuc2lvbiBmb3Igcm91Z2ggdHJhY2tzLjwvcD5cbjxwPiQxLDA5OS4wMDwvcD5cblxuPGgzPktpZHMgQmlrZTwvaDM+XG48cD5UcmFpbmluZyB3aGVlbHMgaW5jbHVkZWQuPC9wPlxuPHA+JDI0OS4wMDwvcD4ifV0sICJjc3MiOiAiZGl2IHtcbiAgYm9yZGVyOiAycHggc29saWQgdGVhbDtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn0iLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    The general-purpose container element is called `div`. Each product needs one `div` that opens before its heading and closes after its price.

## Team Members

!!! abstract "Instructions"
    **Using VS Code**, create a new `team.html` page with a heading `Meet the Team` and a container for each of `3` team members.

    Each team member's container must include:

    - their name as a heading
    - their job title in a paragraph
    - a short description of them in a paragraph

??? question "Hint"
    This repeats the Grouping with Containers exercise. Work on one team member first, check it in Live Preview, then copy that container twice and change the text. Think about which heading level suits the names when `Meet the Team` is the main heading.
