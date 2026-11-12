# FastAPI: POST, PUT and Request Bodies

## So Far

In the previous lesson, we used `GET` to request information from an API.

For example:

```text
GET /products
```

could return:

```json
[
  {
    "id": 1,
    "name": "Gaming Laptop",
    "price": 1899
  }
]
```

The client asks for information and the server sends it back.

But what if the client wants to send information **to** the server?

For example:

> Add a new product called "USB-C Dock" that costs $129.95.

For this we need to send data as part of our HTTP request.

## The Request Body

HTTP requests can contain a **body**.

The body contains data that the client sends to the API.

For example:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

For our API, the body will contain JSON.

A request might therefore look conceptually like:

```text
POST /products

{
  "name": "USB-C Dock",
  "price": 129.95
}
```

There are two important parts.

This part:

```text
POST /products
```

tells the API **what we want to do and where**.

The JSON:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

provides the **data needed to do it**.

## Where Does Data Go?

We have now encountered three common ways of supplying information to an API.

**Path parameter**

```text
/products/3
```

The value `3` forms part of the path.

**Query parameter**

```text
/search?category=laptops
```

The value appears after `?`.

**Request body**

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

The data is sent inside the HTTP request.

A request body is particularly useful when we need to send several pieces of related data.

For example, a product might need both a name and a price.

## Introducing Pydantic

When a client sends data to our API, we need some way of describing **what that data should look like**.

For example, suppose our API expects this JSON:

```json
{
  "name": "Mechanical Keyboard",
  "price": 149.95
}
```

Our API needs to know:

- Which fields should be present?
- What are the names of those fields?
- What type of data should each field contain?

For this, FastAPI works with a Python library called **Pydantic**.

Pydantic allows us to create a Python class that describes the structure of the data we expect to receive.

We start by importing `BaseModel`:

```python
from pydantic import BaseModel
```

We can then create our own model:

```python
class Product(BaseModel):
    name: str
    price: float
```

This is called a **Pydantic model**.

The model describes what a product should look like.

| Field | Python Type | Example |
|---|---|---|
| `name` | `str` | `"Mechanical Keyboard"` |
| `price` | `float` | `149.95` |

The following JSON matches our model:

```json
{
  "name": "Mechanical Keyboard",
  "price": 149.95
}
```

The `name` contains text, which matches:

```python
name: str
```

The `price` contains a number, which matches:

```python
price: float
```

### The Model Is Not the Product

It is important to understand that this:

```python
class Product(BaseModel):
    name: str
    price: float
```

does not create a product.

Instead, it defines the **structure that a product must follow** when data is sent to our API.

Think of the model as a description or template:

```text
Product
│
├── name  → must be text
│
└── price → must be a number
```

The actual product data will arrive in the HTTP request body:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

FastAPI can then use the `Product` model to understand and check that data.

### Using the Model in an Endpoint

We can use our model as a parameter in a FastAPI endpoint:

```python
@app.post("/products")
def create_product(product: Product):
    return product
```

The important part is:

```python
product: Product
```

This tells FastAPI:

> The request body for this endpoint should match the `Product` model.

If the client sends:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

FastAPI converts the request body into a `Product` object.

Inside our Python function we can then access its values:

```python
product.name
```

and:

```python
product.price
```

For example:

```python
@app.post("/products")
def create_product(product: Product):

    return {
        "product_name": product.name,
        "product_price": product.price
    }
```

Sending:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

would return:

```json
{
  "product_name": "USB-C Dock",
  "product_price": 129.95
}
```

The process is:

```text
JSON request body
       ↓
Pydantic Product model
       ↓
FastAPI endpoint
       ↓
product.name
product.price
```

This allows our Python code to work with the data sent by the client.

## Pydantic and Validation

Pydantic does more than describe our data.

It also helps FastAPI **validate** incoming data.

Validation means checking whether the data follows the rules we have defined.

Consider our model:

```python
class Product(BaseModel):
    name: str
    price: float
```

This tells FastAPI that it expects:

```text
name  → string
price → number
```

This request is valid:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

But what happens if the client sends:

```json
{
  "name": "USB-C Dock",
  "price": "banana"
}
```

The model says:

```python
price: float
```

but `"banana"` cannot be used as a number.

FastAPI will reject the request.

You will normally receive:

```text
422 Unprocessable Entity
```

Our endpoint function does not need to manually check whether `"banana"` is a valid number.

FastAPI and Pydantic perform this validation for us.

### Missing Data

Pydantic can also detect when required information is missing.

Our model requires both:

```python
name: str
price: float
```

Try sending:

```json
{
  "name": "USB-C Dock"
}
```

The `price` field is missing.

Because our model says that `price` is required, FastAPI will reject the request.

Again, you should see:

```text
422 Unprocessable Entity
```

### Try It Yourself

Using `/docs`, experiment with the following request bodies.

**Valid request**

```json
{
  "name": "Wireless Mouse",
  "price": 79.95
}
```

**Incorrect price**

```json
{
  "name": "Wireless Mouse",
  "price": "expensive"
}
```

**Missing price**

```json
{
  "name": "Wireless Mouse"
}
```

For each request, record:

| Request | Accepted? | Status Code |
|---|---|---|
| Valid product | | |
| Incorrect price | | |
| Missing price | | |

### Why Are We Using Pydantic?

Without a model, our API would need to do much more work to determine whether incoming data is correct.

With Pydantic, we can describe our expected data using Python type hints:

```python
class Product(BaseModel):
    name: str
    price: float
```

FastAPI can then use this model to:

1. Understand the expected request body.
2. Read the JSON sent by the client.
3. Check that required fields are present.
4. Check that values are suitable for the expected data types.
5. Make the values available to our endpoint as a Python object.

The important idea to remember is:

> **The JSON request body contains the data. The Pydantic model describes what that data should look like.**

## POST

`POST` is commonly used when we want to **create a new resource**.

For our store API, we want:

```text
POST /products
```

The client will send the new product in the request body.

Start with some existing products:

```python
products = [
    {"id": 1, "name": "Gaming Laptop", "price": 1899.00},
    {"id": 2, "name": "Mechanical Keyboard", "price": 149.95},
    {"id": 3, "name": "27-inch Monitor", "price": 399.00}
]
```

We already have our Pydantic model:

```python
class Product(BaseModel):
    name: str
    price: float
```

Now create the endpoint:

```python
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

Notice:

```python
product: Product
```

This tells FastAPI that the request body should match our `Product` model.

The client does not provide an ID.

Our API creates the ID:

```python
"id": len(products) + 1
```

It then takes the values from the request body:

```python
"name": product.name,
"price": product.price
```

and creates a new product.

Finally:

```python
products.append(new_product)
```

adds the new product to our list.

## Testing POST

Open:

```text
/docs
```

Find:

```text
POST /products
```

Select **Try it out**.

Enter:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

Execute the request.

You should receive the newly created product:

```json
{
  "id": 4,
  "name": "USB-C Dock",
  "price": 129.95
}
```

The response status should be:

```text
201 Created
```

Now run:

```text
GET /products
```

The new product should appear in the list.

## Why Use 201?

A successful `GET` will normally return:

```text
200 OK
```

When we successfully create something using `POST`, we can return:

```text
201 Created
```

This gives the client more information about what happened.

The request didn't simply succeed. It resulted in something new being created.

We specified this when we created the endpoint:

```python
@app.post("/products", status_code=201)
```

## PUT

We can now create products.

But what happens when a product already exists and needs to be changed?

For example, we might currently have:

```json
{
  "id": 2,
  "name": "Mechanical Keyboard",
  "price": 149.95
}
```

Perhaps its name and price should now be:

```json
{
  "id": 2,
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

We don't want to create another product.

We want to **update the existing product**.

For this we can use `PUT`.

```text
PUT /products/2
```

The path identifies **which product** we want to update.

The request body contains **the new product data**.

## Combining a Path Parameter and a Request Body

Our PUT request needs two different sources of information.

From the URL:

```text
PUT /products/2
```

we get the product ID:

```text
product_id = 2
```

From the request body:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

we get the updated product information.

The request can be thought of as:

```text
PUT /products/2
      ↑
      Which product?

{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
      ↑
      What should the new values be?
```

Our endpoint can therefore receive both:

```python
@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):
```

Here:

```python
product_id: int
```

comes from the **path**.

And:

```python
product: Product
```

comes from the **request body**.

This is an important distinction.

```text
Path parameter → identifies the product
Request body   → contains the new product data
```

## Updating the Product

We can search through our products:

```python
@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):

    for existing_product in products:

        if existing_product["id"] == product_id:

            existing_product["name"] = product.name
            existing_product["price"] = product.price

            return existing_product
```

The loop:

```python
for existing_product in products:
```

looks through the products.

Then:

```python
if existing_product["id"] == product_id:
```

checks whether we have found the requested product.

Once we find it:

```python
existing_product["name"] = product.name
existing_product["price"] = product.price
```

replaces the existing values with the values from the request body.

For example:

```text
PUT /products/2
```

with:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

updates product `2`.

## Testing PUT

Open:

```text
/docs
```

Find:

```text
PUT /products/{product_id}
```

Select **Try it out**.

For `product_id`, enter:

```text
2
```

For the request body, enter:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

Execute the request.

The API should return:

```json
{
  "id": 2,
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

Now use:

```text
GET /products/2
```

to confirm that the product has changed.

## What If the Product Doesn't Exist?

The client could request:

```text
PUT /products/999
```

But product `999` doesn't exist.

We can use `HTTPException`:

```python
from fastapi import HTTPException
```

Then complete the endpoint:

```python
@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):

    for existing_product in products:

        if existing_product["id"] == product_id:

            existing_product["name"] = product.name
            existing_product["price"] = product.price

            return existing_product

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )
```

If the loop finishes without finding the requested ID, the API returns:

```text
404 Not Found
```

## POST vs PUT

POST and PUT can both contain a request body.

The main difference is **what we are asking the API to do with the data**.

| Method | Purpose | Example |
|---|---|---|
| `GET` | Retrieve something | `GET /products/2` |
| `POST` | Create something new | `POST /products` |
| `PUT` | Update something that exists | `PUT /products/2` |

Consider these two requests.

**POST**

```text
POST /products
```

```json
{
  "name": "Wireless Mouse",
  "price": 79.95
}
```

This means:

> Create a new product using this data.

**PUT**

```text
PUT /products/2
```

```json
{
  "name": "Wireless Mouse Pro",
  "price": 99.95
}
```

This means:

> Update product 2 using this data.

## The Complete API

Your application can now support:

```text
GET  /products
GET  /products/{product_id}
POST /products
PUT  /products/{product_id}
```

Each method has a different purpose:

```text
GET
 ↓
Retrieve data

POST
 ↓
Create new data

PUT
 ↓
Update existing data
```

POST and PUT can both use a **request body** to send JSON data to the API.

## Practice Tasks

### Task 1: Create a Product

Use:

```text
POST /products
```

to create:

```json
{
  "name": "Webcam",
  "price": 89.95
}
```

Use:

```text
GET /products
```

to confirm that the product was added.

### Task 2: Test Request Body Validation

Attempt to create:

```json
{
  "name": "Webcam",
  "price": "expensive"
}
```

Record:

- The status code.
- The error returned by the API.
- Why you think the request was rejected.

Then try:

```json
{
  "name": "Webcam"
}
```

Record what happens when the required `price` field is missing.

### Task 3: Update a Product

Use:

```text
PUT /products/1
```

to change the first product to:

```json
{
  "name": "Gaming Laptop Pro",
  "price": 2199.00
}
```

Use:

```text
GET /products/1
```

to confirm your change.

### Task 4: Test a Missing Product

Try:

```text
PUT /products/999
```

with:

```json
{
  "name": "Mystery Product",
  "price": 100
}
```

Record:

- The status code.
- The response body.
- Why the API returned this response.

### Task 5: Create Your Own Requests

Create two new products using POST.

Then update one of those products using PUT.

Use the GET endpoints to demonstrate that your changes have occurred.

## Check Your Understanding

1. What is a request body?
2. What format are we using for our request bodies?
3. What is a Pydantic model?
4. Does the `Product` model create an actual product?
5. What does `name: str` mean in our Pydantic model?
6. What does `price: float` mean?
7. What does FastAPI do if required data is missing from the request body?
8. Why might FastAPI return `422`?
9. What is the difference between POST and PUT?
10. In `PUT /products/3`, where does the `3` come from?
11. In a PUT request, where do the new `name` and `price` values come from?
12. What does status code `201` mean?
13. Why could a PUT request return `404`?

## Summary

You now have three important HTTP methods:

```text
GET   → retrieve data
POST  → create new data
PUT   → update existing data
```

POST and PUT introduce an important new concept: **the request body**.

The request body allows a client to send structured JSON data to the API.

For example:

```json
{
  "name": "USB-C Dock",
  "price": 129.95
}
```

Pydantic allows us to describe what we expect that data to look like:

```python
class Product(BaseModel):
    name: str
    price: float
```

The key relationship is:

```text
JSON request body
       ↓
Pydantic model
       ↓
FastAPI validates the data
       ↓
Endpoint receives the data
       ↓
Python code uses the data
```

The **JSON request body contains the data**, while the **Pydantic model describes what that data should look like**.

POST uses that data to create something new:

```text
POST /products
```

PUT uses that data to update something that already exists:

```text
PUT /products/2
```

Together, GET, POST and PUT allow our API to retrieve, create and update data.
