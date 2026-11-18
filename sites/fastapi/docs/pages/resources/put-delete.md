# FastAPI: PUT, DELETE and HTTP Methods

## Learning Outcomes

By the end of this lesson, you will be able to:

- Explain the purpose of common HTTP methods.
- Choose an appropriate HTTP method for an API operation.
- Use `PUT` to update an existing resource.
- Combine a path parameter with a request body.
- Use `DELETE` to remove a resource.
- Return `404 Not Found` when a resource does not exist.
- Test PUT and DELETE endpoints using `/docs`.

## 1. HTTP Methods

When a client sends a request to an API, the request contains an **HTTP method**.

The HTTP method tells the server what type of action the client wants to perform.

So far we have worked with:

```text
GET
POST
PUT
```

In this lesson, we will also introduce:

```text
DELETE
```

These methods have different purposes.

| HTTP Method | Purpose | Example |
|---|---|---|
| `GET` | Retrieve data | Get a product |
| `POST` | Create new data | Add a product |
| `PUT` | Update existing data | Change a product |
| `DELETE` | Remove data | Delete a product |

A useful way to remember them is:

```text
GET     → Read
POST    → Create
PUT     → Update
DELETE  → Delete
```

Consider a product API.

To retrieve all products:

```text
GET /products
```

To create a new product:

```text
POST /products
```

To update product `2`:

```text
PUT /products/2
```

To delete product `2`:

```text
DELETE /products/2
```

The path can be similar while the HTTP method changes the action being requested.

For example:

```text
GET    /products/2
PUT    /products/2
DELETE /products/2
```

These all refer to product `2`, but they ask the API to perform different actions.

## 2. HTTP Methods and Data

Different HTTP methods may need different information from the client.

For example:

```text
GET /products/2
```

only needs to know which product we want.

The product ID comes from the **path parameter**.

A PUT request normally needs more information:

```text
PUT /products/2
```

It needs to know:

1. Which product should be updated?
2. What should the new product data be?

We can provide the ID in the path:

```text
/products/2
```

and the new data in the request body:

```json
{
  "name": "Gaming Laptop Pro",
  "price": 2199.00
}
```

DELETE is different:

```text
DELETE /products/2
```

The API only needs to know which product should be removed.

For our API, no request body is required.

## 3. Our Product Data

We will continue using our product API.

```python
products = [
    {"id": 1, "name": "Gaming Laptop", "price": 1899.00},
    {"id": 2, "name": "Mechanical Keyboard", "price": 149.95},
    {"id": 3, "name": "27-inch Monitor", "price": 399.00}
]
```

Our Pydantic model is:

```python
class Product(BaseModel):
    name: str
    price: float
```

Remember that the model describes the structure of product data sent in a request body.

```text
Product
│
├── name  → str
└── price → float
```

We will use this model when updating products.

## 4. Updating Data with PUT

`PUT` is used to update an existing resource.

Suppose product `2` currently contains:

```json
{
  "id": 2,
  "name": "Mechanical Keyboard",
  "price": 149.95
}
```

We want to change it to:

```json
{
  "id": 2,
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

Our request is:

```text
PUT /products/2
```

with this request body:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

Notice that the ID is not included in the request body.

The ID comes from:

```text
/products/2
```

The updated values come from:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

We therefore have:

```text
Path parameter
      ↓
Which product?

PUT /products/2

Request body
      ↓
What should the new values be?

{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

## 5. Creating the PUT Endpoint

We can create our endpoint using:

```python
@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):
```

Notice that the function has two parameters:

```python
product_id: int
```

and:

```python
product: Product
```

They come from different places.

```text
product_id
    ↓
Path parameter

product
    ↓
Request body
```

Now we can find the requested product:

```python
@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):

    for existing_product in products:

        if existing_product["id"] == product_id:
            existing_product["name"] = product.name
            existing_product["price"] = product.price

            return existing_product
```

The loop searches through the products:

```python
for existing_product in products:
```

This checks whether we have found the correct product:

```python
if existing_product["id"] == product_id:
```

Then:

```python
existing_product["name"] = product.name
existing_product["price"] = product.price
```

updates the product using the values from the request body.

## 6. Handling an Unknown Product

What happens if the client sends:

```text
PUT /products/999
```

There is no product with ID `999`.

Our API should tell the client that the requested resource could not be found.

We can use:

```python
raise HTTPException(
    status_code=404,
    detail="Product not found"
)
```

The completed endpoint becomes:

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

The client now receives:

```text
404 Not Found
```

when the product does not exist.

## 7. Testing PUT

Open:

```text
/docs
```

Find:

```text
PUT /products/{product_id}
```

Select **Try it out**.

Enter:

```text
2
```

for the product ID.

Enter:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

for the request body.

Execute the request.

The response should contain:

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

to check that the product has changed.

Also try:

```text
PUT /products/999
```

What status code do you receive?

## 8. Introducing DELETE

Sometimes we don't want to retrieve, create or update something.

We want to **remove it**.

For this we can use the `DELETE` HTTP method.

For example:

```text
DELETE /products/2
```

means:

> Delete product 2.

Unlike our PUT request, we don't need new product information.

We only need to identify the product that should be deleted.

Therefore, we can use a path parameter:

```python
@app.delete("/products/{product_id}")
def delete_product(product_id: int):
```

There is no:

```python
product: Product
```

because this endpoint doesn't need a product request body.

## 9. Finding the Product to Delete

First, we need to locate the requested product.

We can use the same pattern that we used for PUT:

```python
@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    for product in products:

        if product["id"] == product_id:
```

The loop:

```python
for product in products:
```

looks through each product.

The condition:

```python
if product["id"] == product_id:
```

checks whether we have found the product requested by the client.

## 10. Removing the Product

Python lists provide a `remove()` method.

For example:

```python
products.remove(product)
```

This removes the selected product from the list.

Our endpoint becomes:

```python
@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    for product in products:

        if product["id"] == product_id:

            products.remove(product)

            return {
                "message": "Product deleted"
            }
```

If the client sends:

```text
DELETE /products/2
```

the API finds product `2` and removes it from the list.

The response is:

```json
{
  "message": "Product deleted"
}
```

## 11. Handling a Missing Product

DELETE has the same problem as PUT.

What if we try:

```text
DELETE /products/999
```

Product `999` doesn't exist.

We can use `HTTPException` again:

```python
@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    for product in products:

        if product["id"] == product_id:

            products.remove(product)

            return {
                "message": "Product deleted"
            }

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )
```

Now the API returns:

```text
404 Not Found
```

when the requested product cannot be found.

## 12. Testing DELETE

Open:

```text
/docs
```

Find:

```text
DELETE /products/{product_id}
```

Select **Try it out**.

Enter:

```text
3
```

for the product ID.

Execute the request.

You should receive:

```json
{
  "message": "Product deleted"
}
```

Now run:

```text
GET /products
```

Product `3` should no longer appear.

Next, try deleting it again:

```text
DELETE /products/3
```

Because the product has already been deleted, you should now receive:

```text
404 Not Found
```

## 13. Comparing PUT and DELETE

PUT and DELETE both operate on an existing resource.

For example:

```text
PUT    /products/2
DELETE /products/2
```

But they perform different actions.

| Method | Action | Path Parameter | Request Body |
|---|---|---|---|
| `PUT` | Update a product | Yes | Yes |
| `DELETE` | Remove a product | Yes | No |

PUT needs a request body because we have to tell the API what the new values should be.

DELETE only needs the ID because the API already knows which product should be removed.

## 14. The Four HTTP Methods

Our API can now perform four important operations.

### GET

Retrieve data:

```text
GET /products
GET /products/2
```

### POST

Create new data:

```text
POST /products
```

Request body:

```json
{
  "name": "Webcam",
  "price": 89.95
}
```

### PUT

Update existing data:

```text
PUT /products/2
```

Request body:

```json
{
  "name": "RGB Mechanical Keyboard",
  "price": 169.95
}
```

### DELETE

Remove existing data:

```text
DELETE /products/2
```

No product request body is required.

## 15. HTTP Methods at a Glance

| Method | Main Purpose | Path Example | Body? | Typical Successful Status |
|---|---|---|---|---|
| `GET` | Retrieve | `/products/2` | No | `200 OK` |
| `POST` | Create | `/products` | Yes | `201 Created` |
| `PUT` | Update | `/products/2` | Yes | `200 OK` |
| `DELETE` | Delete | `/products/2` | No | `200 OK` |

The method and path work together.

Consider:

```text
GET    /products/2
PUT    /products/2
DELETE /products/2
```

The path:

```text
/products/2
```

identifies the same resource.

The HTTP method tells the API what we want to **do** with that resource.

## 16. Our API So Far

Our product API can now support:

```text
GET    /products
GET    /products/{product_id}
POST   /products
PUT    /products/{product_id}
DELETE /products/{product_id}
```

These endpoints allow the client to:

```text
GET
 ↓
Retrieve products

POST
 ↓
Create products

PUT
 ↓
Update products

DELETE
 ↓
Remove products
```

Together, these methods provide the main operations needed to manage our product data.

## 17. Practice Tasks

### Task 1: Update a Product

Use:

```text
PUT /products/1
```

with:

```json
{
  "name": "Gaming Laptop Pro",
  "price": 2299.00
}
```

Then use:

```text
GET /products/1
```

to confirm the change.

### Task 2: Test PUT Error Handling

Try:

```text
PUT /products/999
```

with:

```json
{
  "name": "Unknown Product",
  "price": 100
}
```

Record:

- The status code.
- The response body.
- Why the API returned this response.

### Task 3: Delete a Product

Use:

```text
DELETE /products/2
```

Then use:

```text
GET /products
```

Confirm that product `2` is no longer present.

### Task 4: Delete the Product Again

Send:

```text
DELETE /products/2
```

again.

Record:

- The status code.
- The response body.
- Why the result is different from the first DELETE request.

### Task 5: Identify the HTTP Method

Choose the most appropriate HTTP method for each action.

| Action | HTTP Method |
|---|---|
| Retrieve all products | |
| Retrieve product 3 | |
| Create a new product | |
| Change product 3 | |
| Remove product 3 | |

Choose from:

```text
GET
POST
PUT
DELETE
```

## 18. Check Your Understanding

1. What does an HTTP method tell the server?
2. Which HTTP method is used to retrieve data?
3. Which HTTP method is used to create new data?
4. Which HTTP method is used to update existing data?
5. Which HTTP method is used to remove data?
6. Why does PUT normally need a request body?
7. Why doesn't our DELETE endpoint need a request body?
8. In `PUT /products/3`, where does the product ID come from?
9. Where do the updated name and price come from?
10. What does `products.remove(product)` do?
11. Why might PUT return `404 Not Found`?
12. Why might DELETE return `404 Not Found`?
13. What is the difference between `GET /products/2` and `DELETE /products/2`?

## Summary

HTTP methods describe the **action** that a client wants the API to perform.

The four methods we have used are:

```text
GET     → retrieve
POST    → create
PUT     → update
DELETE  → delete
```

The method and path work together:

```text
GET    /products/2
PUT    /products/2
DELETE /products/2
```

All three requests refer to product `2`, but the HTTP method tells the API what should happen to that product.

PUT combines two important concepts:

```text
Path parameter → which resource?
Request body   → what are the new values?
```

DELETE is simpler:

```text
Path parameter → which resource should be removed?
```

If the requested resource doesn't exist, our API can use:

```python
raise HTTPException(
    status_code=404,
    detail="Product not found"
)
```

Our API can now retrieve, create, update and delete product data using appropriate HTTP methods.
