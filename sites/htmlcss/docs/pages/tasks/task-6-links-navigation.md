# Task 6 - Links and Navigation

## External Links

!!! abstract "Instructions"
    **Using VS Code**, create a new `index.html` page that links out to an external website.

    This repeats what you practised in Task 4. Your page must include:

    - a paragraph introducing your favourite website
    - a link to that website using its full address (starting with `https://`)

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for the destination is `href`. Remember elements need an opening and closing tag, with the clickable text in between.

## Internal Links

!!! abstract "Instructions"
    **Using VS Code**, create `index.html` and `about.html` pages that link to each other.

    This repeats what you practised in Task 4. Each page must include:

    - a paragraph saying which page you are on
    - a link that takes the user to the other page

??? question "Hint"
    The tag name for the **link** element is called `a` and the **attribute** for the destination is `href`. For pages in the same folder, the attribute value is just the file name of the other page.

## Links Inside Text

!!! abstract "Instructions"
    **Using the editor below**, turn the words `browse our services` into a link to `services.html`, so the link sits inside the sentence.

    Then click it in the preview to check it works.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+V2VsY29tZTwvaDE+XG48cD5OZXcgdG8gUGF3cyBhbmQgQ2xhd3M/IFRha2UgYSBtb21lbnQgdG8gYnJvd3NlIG91ciBzZXJ2aWNlcyBiZWZvcmUgeW91IGJvb2suPC9wPiJ9LCB7Im5hbWUiOiAic2VydmljZXMuaHRtbCIsICJodG1sIjogIjxoMT5PdXIgU2VydmljZXM8L2gxPlxuPHA+V2FzaGluZywgY2xpcHBpbmcgYW5kIG5haWwgdHJpbW1pbmcuPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    The `a` element can be nested inside a `p`, just like `b` or `strong`. Only the words that should be clickable go between the opening and closing link tags.

## Descriptive Link Text

!!! abstract "Instructions"
    **Using the editor below**, rewrite each `click here` link so that the link text describes where the link goes.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8cD5UbyBzZWUgb3VyIHByaWNlcywgPGEgaHJlZj1cInByaWNlcy5odG1sXCI+Y2xpY2sgaGVyZTwvYT4uPC9wPlxuPHA+Rm9yIG91ciBvcGVuaW5nIGhvdXJzLCA8YSBocmVmPVwiaG91cnMuaHRtbFwiPmNsaWNrIGhlcmU8L2E+LjwvcD5cbjxwPlRvIHNlbmQgdXMgYSBtZXNzYWdlLCA8YSBocmVmPVwiY29udGFjdC5odG1sXCI+Y2xpY2sgaGVyZTwvYT4uPC9wPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    Imagine the links are read out on their own, without the rest of the sentence. Would someone know where each one goes? Move the link so it wraps the words that describe the destination.

## Email Links

!!! abstract "Instructions"
    **Using the editor below**, add a link that opens the visitor's email program to send an email to `hello@pawsandclaws.example`.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDI+Q29udGFjdCBVczwvaDI+XG48cD5TZW5kIHVzIGFuIGVtYWlsOjwvcD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Email links use the `a` element like any other link. The `href` value starts with `mailto:` followed by the email address, with no space in between.

## Navigation Menu

!!! abstract "Instructions"
    **Using VS Code**, create `index.html`, `about.html`, and `contact.html` pages. Add the same navigation menu to all three pages so the user can reach every page from every page.

    This combines the lists from Task 3 with the links from Task 4. Each page must include:

    - a `nav` element containing a list with `3` items, one for each page
    - a link inside each list item pointing to that page
    - a paragraph saying which page you are on

??? question "Hint"
    The tag name for the **unordered list** element is called `ul`, **list items** are `li`, and **links** are `a`. Think about which element sits inside which: the `nav` wraps the list, and each list item wraps around its link.

## Four-Page Navigation

!!! abstract "Instructions"
    **Using the editor below**, add a navigation menu to **all four** pages so that every page links to every other page. The editor has four pages; use the page tabs to switch between them.

    Test every link on every page by clicking it in the preview.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aDE+SG9tZTwvaDE+In0sIHsibmFtZSI6ICJzZXJ2aWNlcy5odG1sIiwgImh0bWwiOiAiPGgxPlNlcnZpY2VzPC9oMT4ifSwgeyJuYW1lIjogImFib3V0Lmh0bWwiLCAiaHRtbCI6ICI8aDE+QWJvdXQgVXM8L2gxPiJ9LCB7Im5hbWUiOiAiY29udGFjdC5odG1sIiwgImh0bWwiOiAiPGgxPkNvbnRhY3Q8L2gxPiJ9XSwgImNzcyI6ICIiLCAianMiOiAiIiwgImFjdGl2ZVRhYiI6ICJodG1sIiwgImFjdGl2ZVBhZ2UiOiAiaW5kZXguaHRtbCJ9"></embed>
??? question "Hint"
    This repeats the Navigation Menu exercise with one more page. Write the navigation once on the Home page, check every link works, then copy the whole `nav` onto the other three pages. A four-page site has sixteen links to test in total.

## Highlight the Current Page

!!! abstract "Instructions"
    **Using the editor below**, add the class `active` to the correct link on **each** page so the current page is highlighted in the navigation. The CSS is already written.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPjwvbGk+XG4gIDwvdWw+XG48L25hdj5cbjxoMT5Ib21lPC9oMT4ifSwgeyJuYW1lIjogInNlcnZpY2VzLmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPjwvbGk+XG4gIDwvdWw+XG48L25hdj5cbjxoMT5TZXJ2aWNlczwvaDE+In0sIHsibmFtZSI6ICJjb250YWN0Lmh0bWwiLCAiaHRtbCI6ICI8bmF2PlxuICA8dWw+XG4gICAgPGxpPjxhIGhyZWY9XCJpbmRleC5odG1sXCI+SG9tZTwvYT48L2xpPlxuICAgIDxsaT48YSBocmVmPVwic2VydmljZXMuaHRtbFwiPlNlcnZpY2VzPC9hPjwvbGk+XG4gICAgPGxpPjxhIGhyZWY9XCJjb250YWN0Lmh0bWxcIj5Db250YWN0PC9hPjwvbGk+XG4gIDwvdWw+XG48L25hdj5cbjxoMT5Db250YWN0PC9oMT4ifV0sICJjc3MiOiAibmF2IHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgZGlzcGxheTogZmxleDsgZ2FwOiA4cHg7IHBhZGRpbmc6IDA7IH1cbm5hdiBhIHsgcGFkZGluZzogOHB4IDE0cHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgYm9yZGVyOiAxcHggc29saWQgdGVhbDsgfVxubmF2IGEuYWN0aXZlIHsgYmFja2dyb3VuZC1jb2xvcjogdGVhbDsgY29sb3I6IHdoaXRlOyB9IiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    Each page gets the class on a **different** link: the one that points to the page you are on. The class attribute goes in the opening tag of the `a` element.

## Image Links

!!! abstract "Instructions"
    **Using VS Code**, create a new `index.html` page containing an image that acts as a link.

    This combines the images from Task 4 with links. Your page must include:

    - an image using `https://cyberbilby.com/capybara.jpg` as the image source with `Capybara` as the alt text
    - the image wrapped so that clicking it takes the user to `https://w3.org/`

??? question "Hint"
    One element needs to wrap around the other here. Ask yourself which element is the clickable one, and which element is the content being clicked. Remember the image uses `src` and `alt`, while the link uses `href`.

## Logo Link

!!! abstract "Instructions"
    **Using the editor below**, add a logo to the `header` of **both** pages, using `https://cyberbilby.com/capybara.jpg` at `80` pixels wide. Clicking the logo on either page must take the visitor to the **Home** page.

    Give the logo alt text that suits a business called **Capybara Tours**.

<embed src="/tools/code#eyJ0aXRsZSI6ICJFZGl0b3IiLCAicGFnZXMiOiBbeyJuYW1lIjogImluZGV4Lmh0bWwiLCAiaHRtbCI6ICI8aGVhZGVyPlxuICA8IS0tIGxvZ28gZ29lcyBoZXJlIC0tPlxuPC9oZWFkZXI+XG48aDE+SG9tZTwvaDE+XG48cD48YSBocmVmPVwidG91cnMuaHRtbFwiPlNlZSBvdXIgdG91cnM8L2E+PC9wPiJ9LCB7Im5hbWUiOiAidG91cnMuaHRtbCIsICJodG1sIjogIjxoZWFkZXI+XG4gIDwhLS0gbG9nbyBnb2VzIGhlcmUgLS0+XG48L2hlYWRlcj5cbjxoMT5PdXIgVG91cnM8L2gxPlxuPHA+Q2xpY2sgdGhlIGxvZ28gdG8gZ28gYmFjayB0byB0aGUgSG9tZSBwYWdlLjwvcD4ifV0sICJjc3MiOiAiIiwgImpzIjogIiIsICJhY3RpdmVUYWIiOiAiaHRtbCIsICJhY3RpdmVQYWdlIjogImluZGV4Lmh0bWwifQ=="></embed>
??? question "Hint"
    This repeats the Image Links exercise, but the link goes to a page on the same site instead of an external website. Think about which file name is always the home page.

## Mini Website

!!! abstract "Instructions"
    **Using VS Code**, build a small three-page website using everything you have learned so far.

    Create `index.html`, `about.html`, and `contact.html` pages, each with the full document structure and its own `title`. Every page must include:

    - a `header` with a logo image that links to the home page
    - the same navigation menu, with the current page given the class `active`
    - a paragraph with a sentence about the site, including one **bold** word
    - a `footer` with a copyright line

    On the home page only, add a sentence containing a link to the `about.html` page.

??? question "Hint"
    Work through each page one at a time. Start by getting the header and navigation working on all three pages, then add the content, then the footer. If something does not display correctly, check that every element has its opening and closing tag and every attribute is spelled correctly. Click every link on every page before you finish.
