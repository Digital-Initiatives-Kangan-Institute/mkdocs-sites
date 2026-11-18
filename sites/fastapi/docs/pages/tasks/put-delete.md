# Follow-up Tasks: FastAPI Movie API

In these tasks, you will create API endpoints for managing a small collection of movies.

You will practise:

- Selecting the correct HTTP method.
- Updating data using `PUT`.
- Using path parameters and request bodies together.
- Deleting data using `DELETE`.
- Handling resources that do not exist.
- Testing API endpoints using `/docs`.

## Task 1: Create the Movie API

Create a new FastAPI application with the following starting data:

```python
movies = [
    {"id": 1, "title": "The Matrix", "year": 1999},
    {"id": 2, "title": "Interstellar", "year": 2014},
    {"id": 3, "title": "The Martian", "year": 2015}
]
```

Create a Pydantic model called `Movie`.

It should contain:

```python
title: str
year: int
```

Create these GET endpoints:

```text
GET /movies
```

and:

```text
GET /movies/{movie_id}
```

The first endpoint should return all movies.

The second should return the movie matching the supplied ID.

If the movie cannot be found, return:

```text
404 Not Found
```

Test both endpoints using `/docs`.

## Task 2: Update a Movie

Create:

```text
PUT /movies/{movie_id}
```

Your endpoint should:

1. Receive the movie ID from the path.
2. Receive the new movie information in the request body.
3. Find the movie with the matching ID.
4. Update its `title` and `year`.
5. Return the updated movie.

Use your endpoint to update:

```text
PUT /movies/3
```

with this request body:

```json
{
  "title": "The Martian: Extended Edition",
  "year": 2015
}
```

After updating the movie, use:

```text
GET /movies/3
```

to confirm that the changes were successful.

Then try:

```text
PUT /movies/999
```

Record:

- The status code.
- The response body.
- Why this response was returned.

## Task 3: Delete a Movie

Create:

```text
DELETE /movies/{movie_id}
```

Your endpoint should:

1. Receive a movie ID from the path.
2. Find the movie with that ID.
3. Remove the movie from the `movies` list.
4. Return a message confirming the deletion.
5. Return `404 Not Found` if the movie does not exist.

Use:

```text
DELETE /movies/2
```

to delete the second movie.

Then use:

```text
GET /movies
```

to confirm that the movie has been removed.

Finally, try:

```text
DELETE /movies/2
```

again.

Record the status code and explain why the second DELETE request produces a different result.

## Task 4: Choose the Correct HTTP Method

For each operation, choose the most appropriate HTTP method.

Choose from:

```text
GET
POST
PUT
DELETE
```

Complete the following table:

| Operation | HTTP Method |
|---|---|
| Retrieve all movies | |
| Retrieve movie 3 | |
| Create a new movie | |
| Change the title of movie 3 | |
| Remove movie 3 | |

Then write the appropriate request for each of the following actions.

**Retrieve movie 1**

```text

```

**Update movie 1**

```text

```

**Delete movie 1**

```text

```

Answer:

> Why can the same path be used with different HTTP methods?

## Task 5: Test the Complete API

Use `/docs` to test your API.

Complete the following tests:

| Test | Method | Path | Expected Status |
|---|---|---|---|
| Retrieve all movies | GET | `/movies` | 200 |
| Retrieve an existing movie | GET | `/movies/1` | 200 |
| Update an existing movie | PUT | `/movies/1` | 200 |
| Update a missing movie | PUT | `/movies/999` | 404 |
| Delete an existing movie | DELETE | `/movies/1` | 200 |
| Delete the movie again | DELETE | `/movies/1` | 404 |

For the PUT request, use:

```json
{
  "title": "The Matrix Reloaded",
  "year": 2003
}
```

After completing your tests, answer the following questions:

1. What does an HTTP method tell the API?
2. What is the difference between `GET`, `POST`, `PUT` and `DELETE`?
3. Why does PUT require a request body in our API?
4. In `PUT /movies/3`, where does the movie ID come from?
5. Where do the new `title` and `year` values come from?
6. Why does DELETE not require a request body in our API?
7. What does `404 Not Found` tell the client?
8. Why does deleting the same movie twice produce different responses?
