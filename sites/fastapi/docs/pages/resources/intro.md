# Introduction to APIs with FastAPI

## Lesson overview

In this lesson, you will learn what an API is and how software applications use APIs to communicate. You will then build and test a simple API using Python and FastAPI.

By the end of the lesson, you will have created an API that can:

- return a welcome message
- return a list of products
- return one product using its ID
- accept a new product as JSON
- return an error when a product cannot be found

## Learning outcomes

By the end of this lesson, you should be able to:

1. Explain what an API is.
2. Describe the API request and response process.
3. Identify common HTTP methods.
4. Explain endpoints, paths, parameters, JSON and status codes.
5. Create a simple API using FastAPI.
6. Test an API using FastAPI's interactive documentation.
7. Use path parameters, query parameters and request bodies.
8. Return JSON responses from an API.

## Required knowledge

Before starting this lesson, you should understand:

- basic Python syntax
- variables
- lists and dictionaries
- functions
- basic terminal or command-line use

You do not need previous experience with APIs, HTTP, databases or FastAPI.

## Required software

You will need:

- Python
- FastAPI
- Uvicorn
- Visual Studio Code or another Python editor
- a web browser

Install FastAPI and Uvicorn by running:

```bash
pip install fastapi uvicorn
```

## 1. What is an API?

API stands for **Application Programming Interface**.

An API allows different software applications to communicate with each other. One application sends a request, and another application processes the request and returns a response.

A useful analogy is a restaurant:

- the customer is the client application
- the order is the request
- the waiter is the API
- the kitchen is the system or service
- the meal is the response

The customer does not enter the kitchen and prepare the meal. The waiter provides a controlled way for the customer to communicate with the kitchen.

```text
Client
   |
   | Request
   v
API
   |
   | Performs work
   v
System or data
   |
   | Response
   v
Client
```

For example, a weather application might send this request:

```text
GET /weather/melbourne
```

The API might return:

```json
{
  "city": "Melbourne",
  "temperature": 21,
  "condition": "Sunny"
}
```

The application receives data without needing to know how the weather system stores or processes it.

## 2. HTTP requests and responses

Web APIs commonly communicate using HTTP.

The basic process is:

```text
Client sends an HTTP request
             |
             v
API receives the request
             |
             v
API runs some code
             |
             v
API sends an HTTP response
             |
             v
Client receives the data
```

### Common HTTP methods

| Method | Typical purpose | Example |
|---|---|---|
| `GET` | Retrieve information | Get all products |
| `POST` | Create something | Add a product |
| `PUT` | Replace something | Replace a product |
| `PATCH` | Change part of something | Change a product's price |
| `DELETE` | Remove something | Delete a product |

These methods are often connected to CRUD operations.

| CRUD operation | HTTP method |
|---|---|
| Create | `POST` |
| Read | `GET` |
| Update | `PUT` or `PATCH` |
| Delete | `DELETE` |

## 3. Create your first FastAPI application

Create a new file named `main.py`.

Add the following code:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Hello API"}
```

Open a terminal in the same folder and run:

```bash
uvicorn main:app --reload
```

Open the following address in your browser:

```text
http://127.0.0.1:8000
```

You should see:

```json
{
  "message": "Hello API"
}
```

The following line creates an endpoint that responds to a `GET` request:

```python
@app.get("/")
```

The `/` is the path of the endpoint.

The Python dictionary returned by the function is converted to JSON:

```python
return {"message": "Hello API"}
```

## 4. Create a products endpoint

An **endpoint** is a location or operation made available by an API.

Add this code below your first endpoint:

```python
@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Laptop", "price": 1200},
        {"id": 2, "name": "Keyboard", "price": 80},
        {"id": 3, "name": "Mouse", "price": 40}
    ]
```

Open:

```text
http://127.0.0.1:8000/products
```

This endpoint has three important parts:

```text
HTTP method: GET
Path:        /products
Response:    JSON
```

## 5. Test the API using interactive documentation

FastAPI automatically generates interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

To test an endpoint:

1. Select `GET /products`.
2. Select **Try it out**.
3. Select **Execute**.
4. Examine the request URL.
5. Examine the response body.
6. Examine the response status code.

The `/docs` page is mainly for developers to explore and test the API.

## 6. Use a path parameter

A path parameter places a variable inside the URL path.

Add this endpoint:

```python
@app.get("/products/{product_id}")
def get_product(product_id: int):
    return {
        "id": product_id,
        "name": "Example Product"
    }
```

Test these requests in `/docs`:

```text
GET /products/1
GET /products/20
```

In this path, `{product_id}` is a variable:

```text
/products/{product_id}
```

The following type hint tells FastAPI that the value must be an integer:

```python
product_id: int
```

Try entering `hello` as the product ID. FastAPI should reject the request because `hello` is not an integer.

## 7. Use a query parameter

A query parameter sends additional information after a `?` in the URL.

Add this endpoint:

```python
@app.get("/search")
def search_products(category: str = "all"):
    return {
        "category": category
    }
```

Test:

```text
/search?category=laptops
```

A path parameter commonly identifies a particular resource:

```text
/products/7
```

A query parameter commonly filters, searches, sorts or modifies a request:

```text
/products?category=laptops
```

## 8. Use POST and a request body

A `POST` request is commonly used to create something.

First, import `BaseModel` and define a product model:

```python
from pydantic import BaseModel


class Product(BaseModel):
    name: str
    price: float
```

Add a `POST` endpoint:

```python
@app.post("/products")
def create_product(product: Product):
    return {
        "message": "Product created",
        "product": product
    }
```

Open `/docs`, select `POST /products`, and submit this JSON request body:

```json
{
  "name": "Gaming Mouse",
  "price": 79.95
}
```

FastAPI checks the request body against the `Product` model.

Try submitting invalid data:

```json
{
  "name": "Gaming Mouse",
  "price": "banana"
}
```

The request should fail because `banana` is not a valid price.

## 9. Build an in-memory products API

Replace the contents of `main.py` with the following complete program:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class Product(BaseModel):
    name: str
    price: float


products = [
    {"id": 1, "name": "Laptop", "price": 1200},
    {"id": 2, "name": "Keyboard", "price": 80},
    {"id": 3, "name": "Mouse", "price": 40}
]


@app.get("/")
def home():
    return {"message": "Welcome to the Products API"}


@app.get("/products")
def get_products():
    return products


@app.get("/products/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )


@app.post("/products", status_code=201)
def create_product(product: Product):
    new_product = {
        "id": len(products) + 1,
        "name": product.name,
        "price": product.price
    }

    products.append(new_product)
    return new_product
```

Use `/docs` to test:

```text
GET  /
GET  /products
GET  /products/1
GET  /products/999
POST /products
```

After adding a product, run `GET /products` again and check that the new product appears.

## 10. HTTP status codes

An HTTP status code tells the client what happened when the API processed a request.

| Status code | Meaning |
|---|---|
| `200` | The request was successful |
| `201` | A resource was created |
| `400` | The request was invalid |
| `404` | The requested resource was not found |
| `422` | The request data failed validation |
| `500` | An error occurred on the server |

A useful way to group status codes is:

```text
2xx = successful request
4xx = problem with the client's request
5xx = problem on the server
```

## 11. Student activity: Computer Store API

Create an API for a fictional computer equipment store.

Use this starting data:

```python
products = [
    {"id": 1, "name": "Gaming Laptop", "price": 1899},
    {"id": 2, "name": "Mechanical Keyboard", "price": 149},
    {"id": 3, "name": "27-inch Monitor", "price": 399}
]
```

### Task 1: Welcome endpoint

Create:

```text
GET /
```

It should return:

```json
{
  "message": "Welcome to the Store API"
}
```

### Task 2: Return all products

Create:

```text
GET /products
```

It should return the complete product list.

### Task 3: Return one product

Create:

```text
GET /products/{product_id}
```

It should return the product with the matching ID.

### Task 4: Handle a missing product

If the product does not exist, return status code `404` with an appropriate message.

### Task 5: Create a product

Create:

```text
POST /products
```

The endpoint should accept a product name and price as JSON, create a new ID, add the product to the list and return the new product.

### Task 6: Test the API

Use `/docs` to test every endpoint with both valid and invalid data.

Record the HTTP method, path and status code for each test.

| Test | HTTP method | Path | Expected status |
|---|---|---|---|
| Welcome message | `GET` | `/` | `200` |
| All products | `GET` | `/products` | `200` |
| Existing product | `GET` | `/products/1` | `200` |
| Missing product | `GET` | `/products/999` | `404` |
| Create valid product | `POST` | `/products` | `201` |
| Create invalid product | `POST` | `/products` | `422` |

## 12. Extension challenge

If you complete the main activity, add these endpoints:

```text
PUT    /products/{product_id}
DELETE /products/{product_id}
```

Your completed API should have:

```text
GET     /products
GET     /products/{product_id}
POST    /products
PUT     /products/{product_id}
DELETE  /products/{product_id}
```

For each endpoint, identify the related CRUD operation.

## 13. Where is the database?

The current API stores its products in a Python list:

```text
Client
  |
  v
FastAPI
  |
  v
Python list
```

This data exists only in the application's memory. If the FastAPI application stops and restarts, any products added through `POST` will be lost.

A later version could use a database:

```text
Client
  |
  v
FastAPI
  |
  v
Business logic
  |
  v
PostgreSQL or Supabase
```

FastAPI can provide a controlled layer between the client application and the database. This layer can validate data, apply business rules and decide which operations clients are allowed to perform.

## Knowledge check

Answer the following questions in your own words:

1. What does API stand for?
2. What is an API endpoint?
3. What does `GET` normally do?
4. What does `POST` normally do?
5. What data format did the lesson use for requests and responses?
6. What is a path parameter?
7. What is a query parameter?
8. What does HTTP status code `404` mean?
9. What happens if FastAPI expects an integer but receives text?
10. What is available at `/docs`?
11. Why might an application use an API rather than connect directly to a database?
12. What happens to the current product data when the FastAPI application restarts?

## Exit task

Explain the following process to another student:

```text
Client
   |
   | HTTP request
   v
FastAPI endpoint
   |
   | Calls a Python function
   v
Application logic
   |
   | JSON response
   v
Client
```

Your explanation should use the terms:

- client
- request
- endpoint
- HTTP method
- Python function
- response
- JSON
