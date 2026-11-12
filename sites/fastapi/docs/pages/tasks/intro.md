# Follow-up Tasks: FastAPI Books API

## Create the API and Book Data

Create a new Python file named `main.py`.

Create a FastAPI application and add the following list:

```python
books = [
    {"id": 1, "title": "Python Basics", "price": 39.95},
    {"id": 2, "title": "Web Development", "price": 49.95},
    {"id": 3, "title": "Learning APIs", "price": 29.95}
]
```

Create the following endpoint:

```text
GET /
```

It should return:

```json
{
  "message": "Welcome to the Books API"
}
```

Run the API and test the endpoint using `/docs`.

## Retrieve Books

Create an endpoint that returns all books:

```text
GET /books
```

Create another endpoint that uses a path parameter to return one book:

```text
GET /books/{book_id}
```

For example:

```text
GET /books/2
```

should return:

```json
{
  "id": 2,
  "title": "Web Development",
  "price": 49.95
}
```

If the book does not exist, return a `404` status code and an appropriate error message.

## Use a Query Parameter

Create the following endpoint:

```text
GET /search
```

Add a query parameter named `title`.

For example:

```text
GET /search?title=Python
```

The endpoint should return the value supplied by the client:

```json
{
  "title": "Python"
}
```

Test the endpoint with at least three different title values.

## Add a New Book

Create a Pydantic model named `Book`.

The model should contain:

```python
title: str
price: float
```

Create the following endpoint:

```text
POST /books
```

The endpoint should:

1. Accept a book in the request body.
2. Generate an ID for the new book.
3. Add the book to the `books` list.
4. Return the new book.
5. Return a `201` status code.

Test the endpoint with:

```json
{
  "title": "Introduction to Databases",
  "price": 44.95
}
```

## Test the API

Use `/docs` to complete the following tests:

| Test | Method | Path | Expected Status |
|---|---|---|---|
| Welcome message | GET | `/` | 200 |
| Return all books | GET | `/books` | 200 |
| Return an existing book | GET | `/books/1` | 200 |
| Request a missing book | GET | `/books/999` | 404 |
| Submit a query parameter | GET | `/search?title=Python` | 200 |
| Create a valid book | POST | `/books` | 201 |
| Create a book with `"banana"` as its price | POST | `/books` | 422 |

For each test, record:

- The request URL
- The response status code
- The response body

Answer the following questions:

1. What is the difference between a path parameter and a query parameter?
2. Why does requesting `/books/999` return `404`?
3. Why does using `"banana"` as the price return `422`?
4. What happens to books added using POST when the API is restarted?
