# Follow-up Tasks: FastAPI Games API

Create a new FastAPI application for managing a small collection of video games.

Complete the following five tasks using the concepts from the POST, PUT and Request Bodies lesson.

## Create the Games API

Create a new Python file called:

```text
main.py
```

Create a FastAPI application with the following starting data:

```python
games = [
    {"id": 1, "title": "Minecraft", "price": 39.95},
    {"id": 2, "title": "Stardew Valley", "price": 19.95},
    {"id": 3, "title": "Rocket League", "price": 29.95}
]
```

Create these two GET endpoints:

```text
GET /games
```

This should return all games.

Also create:

```text
GET /games/{game_id}
```

This should return the game with the requested ID.

If the game cannot be found, return:

```text
404 Not Found
```

Test both endpoints using `/docs`.

## Create a Pydantic Model

The API is going to receive game information in request bodies.

Create a Pydantic model called:

```python
Game
```

The model should expect two fields:

| Field | Type |
|---|---|
| `title` | `str` |
| `price` | `float` |

Test your understanding by deciding which of the following JSON request bodies should match the model.

**Request A**

```json
{
  "title": "Portal 2",
  "price": 14.95
}
```

**Request B**

```json
{
  "title": "Portal 2",
  "price": "cheap"
}
```

**Request C**

```json
{
  "title": "Portal 2"
}
```

For each request, record whether you expect FastAPI to accept or reject it.

## Create a Game with POST

Create the following endpoint:

```text
POST /games
```

The endpoint should:

1. Receive a `Game` in the request body.
2. Create an ID for the new game.
3. Add the new game to the `games` list.
4. Return the newly created game.
5. Return the status code `201 Created`.

Use `/docs` to create:

```json
{
  "title": "Terraria",
  "price": 14.95
}
```

After creating the game, run:

```text
GET /games
```

Confirm that the new game appears in the list.

Then test the validation provided by Pydantic.

Try:

```json
{
  "title": "Terraria",
  "price": "banana"
}
```

Record the status code returned by FastAPI.

## Update a Game with PUT

Create:

```text
PUT /games/{game_id}
```

The endpoint needs information from **two places**:

```text
Path parameter → identifies which game to update
Request body   → contains the new game information
```

Use your `Game` Pydantic model for the request body.

Use the endpoint:

```text
PUT /games/2
```

with:

```json
{
  "title": "Stardew Valley Deluxe",
  "price": 24.95
}
```

The API should update game `2` and return the updated game.

Use:

```text
GET /games/2
```

to confirm that your changes were successful.

Your PUT endpoint should also return:

```text
404 Not Found
```

if the supplied game ID does not exist.

Test this using:

```text
PUT /games/999
```

## Test Your API

Use `/docs` to perform the following tests.

| Test | Method | Path | Expected Status |
|---|---|---|---|
| Retrieve all games | GET | `/games` | 200 |
| Retrieve game 1 | GET | `/games/1` | 200 |
| Create a game | POST | `/games` | 201 |
| POST with an invalid price | POST | `/games` | 422 |
| Update game 1 | PUT | `/games/1` | 200 |
| Update a missing game | PUT | `/games/999` | 404 |

For your POST test, create your own game.

For your PUT test, change the title and price of an existing game.

When you have finished testing, answer the following questions:

1. What information is contained in a request body?
2. What is the purpose of the `Game` Pydantic model?
3. Where does the `game_id` value come from in a PUT request?
4. Where do the new `title` and `price` values come from in a PUT request?
5. What is the difference between POST and PUT?
6. Why does FastAPI return `422` when `"banana"` is supplied as the price?
7. Why might a PUT request return `404`?
8. What does `201 Created` tell the client?
