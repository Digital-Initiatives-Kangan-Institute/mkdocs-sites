# FastAPI Database Connection with Supabase PostgreSQL

In the previous lessons, we created API endpoints that stored data in Python lists.

For example:

```python
students = [
    {"id": 1, "name": "Alex", "course": "Programming"},
    {"id": 2, "name": "Jordan", "course": "Networking"}
]
```

This works while our application is running, but it is not suitable for storing application data permanently.

In this lesson, we will connect FastAPI directly to a PostgreSQL database hosted in Supabase.

Our application will change from:

```text
Client
   |
   | HTTP
   v
FastAPI
   |
   v
Python List
```

to:

```text
Client
   |
   | HTTP
   v
FastAPI
   |
   | SQL
   v
Supabase PostgreSQL
```

The focus of this lesson is the connection between FastAPI, SQL and PostgreSQL.

We will use direct SQL and will not introduce database models or ORM yet.

---

## Learning Outcomes

By the end of this lesson, you should be able to:

- explain why an API may use a database
- explain the role of PostgreSQL in a FastAPI application
- connect FastAPI to a Supabase PostgreSQL database
- protect database credentials using environment variables
- execute SQL from Python
- retrieve database records using SELECT
- add database records using INSERT
- modify database records using UPDATE
- remove database records using DELETE
- use parameterised SQL
- connect HTTP methods with SQL database operations

---

## Why Use a Database?

Previously, information was stored in a Python list:

```python
students = [
    {"id": 1, "name": "Alex", "course": "Programming"}
]
```

There is a major problem with this approach.

If the FastAPI application stops, any new data stored in memory is lost.

A database stores the information separately from the FastAPI application.

```text
FastAPI Application
       |
       v
PostgreSQL Database
       |
       v
Permanent Data
```

Stopping and restarting FastAPI does not remove the records stored in PostgreSQL.

---

## What is Supabase?

Supabase provides several backend services, including a hosted PostgreSQL database.

Because Supabase uses PostgreSQL, our FastAPI application can connect directly to the database.

For this lesson, we are not using the Supabase REST API.

Instead:

```text
FastAPI
   |
   | PostgreSQL Connection
   v
Supabase
   |
   v
PostgreSQL Database
```

This allows us to see exactly how FastAPI sends SQL to a database.

---

## Example Database

Our Supabase database will contain a `students` table.

```sql
CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL
);
```

Add some sample data:

```sql
INSERT INTO students (name, course)
VALUES
('Alex', 'Programming'),
('Jordan', 'Networking'),
('Taylor', 'Cyber Security');
```

The table should now contain:

```text
id | name   | course
---|--------|----------------
1  | Alex   | Programming
2  | Jordan | Networking
3  | Taylor | Cyber Security
```

---

## PostgreSQL Connection Information

To connect to PostgreSQL, an application requires connection information.

This normally includes:

```text
Host
Port
Database
Username
Password
```

Supabase provides these database connection details.

A database password should not be written directly into our Python code.

Avoid:

```python
password = "mypassword123"
```

Instead, we can store sensitive information in environment variables.

---

## Creating a .env File

Create a file called:

```text
.env
```

Store the database connection string inside it:

```env
DATABASE_URL=postgresql://username:password@host:5432/postgres
```

Replace these values with the connection information provided for your Supabase database.

The `.env` file should not normally be stored in a public Git repository.

Add it to `.gitignore`:

```text
.env
```

---

## Installing the Required Packages

We will use Psycopg to connect Python to PostgreSQL.

Install the required packages:

```bash
pip install "psycopg[binary]" python-dotenv
```

Psycopg allows Python to communicate with PostgreSQL.

`python-dotenv` allows Python to read values from a `.env` file.

---

## Loading the Database Connection String

In `main.py`:

```python
import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
```

This:

```python
load_dotenv()
```

loads the values from `.env`.

We can then access our database connection string with:

```python
os.getenv("DATABASE_URL")
```

---

## Creating a Database Connection

Import Psycopg:

```python
import psycopg
```

A connection can be created using:

```python
psycopg.connect(DATABASE_URL)
```

We can use a context manager to automatically manage the connection:

```python
with psycopg.connect(DATABASE_URL) as conn:

    # Database operations go here
```

When the block finishes, the database connection is cleaned up.

---

## Database Cursors

A database cursor allows Python to send commands to PostgreSQL.

For example:

```python
with psycopg.connect(DATABASE_URL) as conn:

    with conn.cursor() as cur:

        cur.execute(
            "SELECT * FROM students"
        )
```

The command:

```python
cur.execute()
```

sends SQL to PostgreSQL.

In this example, PostgreSQL receives:

```sql
SELECT *
FROM students;
```

---

## Returning Records as Dictionaries

FastAPI can easily convert Python dictionaries into JSON.

Psycopg can return database records as dictionaries.

Import:

```python
from psycopg.rows import dict_row
```

Then:

```python
with psycopg.connect(
    DATABASE_URL,
    row_factory=dict_row
) as conn:
```

A database row can now look like:

```python
{
    "id": 1,
    "name": "Alex",
    "course": "Programming"
}
```

FastAPI can return this as JSON.

---

## Creating the FastAPI Application

Our starting code is:

```python
import os

import psycopg

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from psycopg.rows import dict_row

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

app = FastAPI()
```

We can now add endpoints to the application.

---

## GET All Students

Create:

```text
GET /students
```

Add:

```python
@app.get("/students")
def get_students():

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                SELECT id, name, course
                FROM students
                """
            )

            students = cur.fetchall()

    return students
```

The important SQL is:

```sql
SELECT id, name, course
FROM students;
```

The complete process is:

```text
GET /students
      |
      v
FastAPI
      |
      v
SELECT
      |
      v
PostgreSQL
      |
      v
Database Rows
      |
      v
FastAPI
      |
      v
JSON
```

---

## fetchall()

The command:

```python
cur.fetchall()
```

retrieves all rows produced by the query.

The response could look like:

```json
[
    {
        "id": 1,
        "name": "Alex",
        "course": "Programming"
    },
    {
        "id": 2,
        "name": "Jordan",
        "course": "Networking"
    }
]
```

---

## GET a Single Student

Create:

```text
GET /students/{student_id}
```

For example:

```text
GET /students/2
```

Our SQL needs a `WHERE` condition:

```sql
SELECT id, name, course
FROM students
WHERE id = 2;
```

The FastAPI endpoint is:

```python
@app.get("/students/{student_id}")
def get_student(student_id: int):

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                SELECT id, name, course
                FROM students
                WHERE id = %s
                """,
                (student_id,)
            )

            student = cur.fetchone()

    if student is None:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student
```

---

## Parameterised SQL

Notice:

```python
cur.execute(
    """
    SELECT id, name, course
    FROM students
    WHERE id = %s
    """,
    (student_id,)
)
```

The SQL and the value are supplied separately.

This is called a parameterised query.

Avoid building SQL with user input like this:

```python
sql = f"SELECT * FROM students WHERE id = {student_id}"
```

Parameterised queries are safer because user input is not inserted directly into the SQL statement.

This helps protect the application against SQL injection.

---

## fetchone()

When we expect a single database record, we can use:

```python
cur.fetchone()
```

If a matching record exists, the row is returned.

If it does not exist:

```python
None
```

is returned.

We can then use:

```python
if student is None:
```

to return:

```text
404 Not Found
```

---

## Adding Data with POST

We can now create:

```text
POST /students
```

For this lesson, we will use simple FastAPI parameters rather than creating a model.

This allows us to concentrate on SQL and database operations.

Our endpoint will receive:

```text
name
course
```

and use them in an SQL `INSERT`.

---

## INSERT

The SQL needed to create a student is:

```sql
INSERT INTO students (name, course)
VALUES ('Morgan', 'Web Development');
```

Because the values will come from the API request, we will use a parameterised query.

---

## Creating the POST Endpoint

```python
@app.post("/students", status_code=201)
def create_student(
    name: str,
    course: str
):

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                INSERT INTO students (name, course)
                VALUES (%s, %s)
                RETURNING id, name, course
                """,
                (name, course)
            )

            new_student = cur.fetchone()

    return new_student
```

Test it through Swagger UI.

FastAPI will display fields where values for `name` and `course` can be entered.

For example:

```text
name = Morgan
course = Web Development
```

---

## RETURNING

PostgreSQL supports:

```sql
RETURNING
```

For example:

```sql
INSERT INTO students (name, course)
VALUES ('Morgan', 'Web Development')
RETURNING id, name, course;
```

This means:

> Insert the record and then return the new database record.

This is useful because the database generates the student's `id`.

---

## Updating Data with PUT

We can also update an existing student.

The SQL operation is:

```sql
UPDATE students
SET name = 'Morgan',
    course = 'Cyber Security'
WHERE id = 4;
```

Our FastAPI endpoint needs:

```text
student_id
name
course
```

---

## Creating the PUT Endpoint

```python
@app.put("/students/{student_id}")
def update_student(
    student_id: int,
    name: str,
    course: str
):

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                UPDATE students
                SET name = %s,
                    course = %s
                WHERE id = %s
                RETURNING id, name, course
                """,
                (
                    name,
                    course,
                    student_id
                )
            )

            updated_student = cur.fetchone()

    if updated_student is None:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return updated_student
```

We are again using parameters rather than inserting values directly into the SQL.

---

## Deleting Data

The SQL command for deleting a record is:

```sql
DELETE FROM students
WHERE id = 4;
```

Our DELETE endpoint only needs to know which student should be removed.

---

## Creating the DELETE Endpoint

```python
@app.delete("/students/{student_id}")
def delete_student(student_id: int):

    with psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row
    ) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                DELETE FROM students
                WHERE id = %s
                RETURNING id, name, course
                """,
                (student_id,)
            )

            deleted_student = cur.fetchone()

    if deleted_student is None:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return deleted_student
```

The deleted record is returned so we can see which student was removed.

---

## Connecting HTTP Methods to SQL

There is a useful relationship between common API operations and SQL.

| HTTP Method | SQL | Purpose |
|---|---|---|
| GET | SELECT | Read data |
| POST | INSERT | Create data |
| PUT | UPDATE | Update data |
| DELETE | DELETE | Delete data |

We can also connect this with CRUD:

| CRUD | SQL | HTTP |
|---|---|---|
| Create | INSERT | POST |
| Read | SELECT | GET |
| Update | UPDATE | PUT |
| Delete | DELETE | DELETE |

---

## Testing the API

Start FastAPI:

```bash
fastapi dev main.py
```

Open:

```text
http://127.0.0.1:8000/docs
```

You should have:

```text
GET     /students
GET     /students/{student_id}
POST    /students
PUT     /students/{student_id}
DELETE  /students/{student_id}
```

Try the following sequence:

```text
1. GET all students

2. POST a new student

3. GET the new student

4. PUT changes to the student

5. GET the student again

6. DELETE the student

7. GET the student again
```

The final GET should produce:

```text
404 Not Found
```

Check the Supabase table after each operation and observe how the data changes.

---

## Our Application So Far

The important part of this lesson is that we can see each layer clearly:

```text
HTTP Request
      |
      v
FastAPI Endpoint
      |
      v
SQL Statement
      |
      v
Psycopg
      |
      v
Supabase PostgreSQL
```

For example:

```text
POST /students
      |
      v
create_student()
      |
      v
INSERT INTO students ...
      |
      v
PostgreSQL
```

Nothing is hiding the SQL from us.

---

## Key Points

In this lesson:

- Supabase hosted our PostgreSQL database
- FastAPI provided our API endpoints
- Psycopg connected Python to PostgreSQL
- `.env` protected our database connection details
- GET used SELECT
- POST used INSERT
- PUT used UPDATE
- DELETE used DELETE
- `fetchall()` retrieved multiple rows
- `fetchone()` retrieved a single row
- parameterised SQL safely passed values to PostgreSQL
- `RETURNING` allowed PostgreSQL to return changed records

We deliberately used direct SQL:

```text
FastAPI
   |
   v
SQL
   |
   v
PostgreSQL
```

This gives us a clear understanding of how an API communicates with a relational database.

In the next lesson, we will look at another approach called an Object Relational Mapper.
