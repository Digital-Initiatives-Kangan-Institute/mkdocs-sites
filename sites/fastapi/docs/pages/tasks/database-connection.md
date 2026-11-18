# FastAPI Database Connection Tasks

In these tasks, you will connect a FastAPI application directly to a PostgreSQL database hosted in Supabase.

You will work with two related tables:

```text
courses
   1
   |
   | has many
   |
   *
students
```

You will progressively build an API that can:

```text
GET     → SELECT
POST    → INSERT
PUT     → UPDATE
DELETE  → DELETE
```

For these tasks, do not use an ORM.

Your FastAPI application should communicate directly with PostgreSQL using Psycopg and SQL.

---

## Database Setup

Before starting the FastAPI tasks, create the required tables and sample data.

Open the SQL Editor in Supabase and execute the following SQL.

### Create the Tables

```sql
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course_id INTEGER NOT NULL,

    CONSTRAINT fk_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
);
```

The database contains a one-to-many relationship:

```text
courses
--------------------------------
id              Primary Key
name


students
--------------------------------
id              Primary Key
name
course_id       Foreign Key
```

The relationship is:

```text
courses.id
    |
    |
    +-------- students.course_id
```

One course can have many students.

Each student belongs to one course.

---

## Insert Course Data

Add the following courses:

```sql
INSERT INTO courses (name)
VALUES
    ('Programming'),
    ('Networking'),
    ('Cyber Security'),
    ('Web Development');
```

Check the data:

```sql
SELECT id, name
FROM courses
ORDER BY id;
```

You should have:

```text
id | name
---|------------------
1  | Programming
2  | Networking
3  | Cyber Security
4  | Web Development
```

---

## Insert Student Data

Add the following students:

```sql
INSERT INTO students (name, course_id)
VALUES
    ('Alex Morgan', 1),
    ('Jordan Lee', 2),
    ('Taylor Singh', 3),
    ('Casey Nguyen', 4),
    ('Sam Wilson', 1),
    ('Jamie Chen', 2),
    ('Morgan Patel', 3),
    ('Riley Brown', 4);
```

Check the data:

```sql
SELECT id, name, course_id
FROM students
ORDER BY id;
```

You should have eight students.

Notice that the `students` table stores:

```text
course_id
```

rather than the course name.

For example:

```text
Alex Morgan → course_id 1
```

The corresponding record in `courses` tells us that:

```text
course_id 1 → Programming
```

---

## Task 1: Connect FastAPI to PostgreSQL

Create a FastAPI project that connects directly to your Supabase PostgreSQL database.

Install the required packages:

```bash
pip install fastapi "uvicorn[standard]" "psycopg[binary]" python-dotenv
```

Create:

```text
.env
```

Store your database connection string:

```env
DATABASE_URL=your_database_connection_string
```

Do not place your database password directly inside `main.py`.

Your application will need:

```python
import os

import psycopg

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from psycopg.rows import dict_row
```

Load your `.env` file:

```python
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
```

Create the FastAPI application:

```python
app = FastAPI()
```

### Create a Database Test Endpoint

Create:

```text
GET /database
```

The endpoint should connect to PostgreSQL and execute:

```sql
SELECT current_database();
```

Return the database name.

Test the endpoint using Swagger UI.

Run:

```bash
fastapi dev main.py
```

Open:

```text
http://127.0.0.1:8000/docs
```

Your endpoint should demonstrate that the following connection is working:

```text
FastAPI
   |
   v
Psycopg
   |
   v
Supabase PostgreSQL
```

---

## Task 2: Retrieve Courses

Create:

```text
GET /courses
```

The endpoint should retrieve all available courses.

Use:

```sql
SELECT id, name
FROM courses
ORDER BY id;
```

Your solution should use:

```python
dict_row
```

and:

```python
fetchall()
```

The API should return JSON similar to:

```json
[
    {
        "id": 1,
        "name": "Programming"
    },
    {
        "id": 2,
        "name": "Networking"
    },
    {
        "id": 3,
        "name": "Cyber Security"
    },
    {
        "id": 4,
        "name": "Web Development"
    }
]
```

### Questions

1. What does `fetchall()` return?
2. Why is `dict_row` useful when creating an API?
3. Which line of code sends the SQL statement to PostgreSQL?
4. Why does the API return JSON rather than a PostgreSQL table?

---

## Task 3: Retrieve Students

Create:

```text
GET /students
```

Start by retrieving:

```sql
SELECT id, name, course_id
FROM students
ORDER BY id;
```

The response should contain:

```json
[
    {
        "id": 1,
        "name": "Alex Morgan",
        "course_id": 1
    },
    {
        "id": 2,
        "name": "Jordan Lee",
        "course_id": 2
    }
]
```

### Improve the Endpoint

`course_id` is useful to the database, but it is not particularly useful to someone using our API.

Instead of returning:

```json
{
    "name": "Alex Morgan",
    "course_id": 1
}
```

it would be better to return:

```json
{
    "name": "Alex Morgan",
    "course": "Programming"
}
```

Modify your SQL to join the two tables.

Use:

```sql
SELECT
    students.id,
    students.name,
    courses.name AS course
FROM students
JOIN courses
    ON students.course_id = courses.id
ORDER BY students.id;
```

Your API response should now look similar to:

```json
[
    {
        "id": 1,
        "name": "Alex Morgan",
        "course": "Programming"
    },
    {
        "id": 2,
        "name": "Jordan Lee",
        "course": "Networking"
    },
    {
        "id": 3,
        "name": "Taylor Singh",
        "course": "Cyber Security"
    }
]
```

### Retrieve One Student

Create:

```text
GET /students/{student_id}
```

For example:

```text
GET /students/3
```

Use a parameterised query.

Your SQL can use:

```sql
SELECT
    students.id,
    students.name,
    courses.name AS course
FROM students
JOIN courses
    ON students.course_id = courses.id
WHERE students.id = %s;
```

Use:

```python
fetchone()
```

If the student does not exist, return:

```text
404 Not Found
```

Test:

```text
/students/1

/students/4

/students/8

/students/999
```

### Questions

1. What is the difference between `fetchone()` and `fetchall()`?
2. Why does the `students` table store `course_id` instead of the course name?
3. What does the JOIN allow us to retrieve?
4. What does `fetchone()` return if no matching record exists?
5. Why should the `student_id` value be passed as a parameter rather than inserted directly into the SQL string?

---

## Task 4: Create and Update a Student

You will now allow the API to modify data in PostgreSQL.

### Part A: Create a Student

Create:

```text
POST /students
```

For this lesson, use simple FastAPI parameters:

```text
name
course_id
```

Do not create a Pydantic model or ORM class.

Use:

```sql
INSERT INTO students (name, course_id)
VALUES (%s, %s)
RETURNING id, name, course_id;
```

Use Swagger UI to create:

```text
name = Avery Johnson

course_id = 1
```

The API should return something similar to:

```json
{
    "id": 9,
    "name": "Avery Johnson",
    "course_id": 1
}
```

Your ID may be different.

Check:

```text
GET /students
```

Because `course_id` 1 represents Programming, Avery should appear as:

```json
{
    "id": 9,
    "name": "Avery Johnson",
    "course": "Programming"
}
```

Also check the `students` table in Supabase.

---

### Part B: Update the Student

Create:

```text
PUT /students/{student_id}
```

Use simple FastAPI parameters for:

```text
name
course_id
```

Use:

```sql
UPDATE students
SET name = %s,
    course_id = %s
WHERE id = %s
RETURNING id, name, course_id;
```

Change Avery's course from:

```text
Programming
```

to:

```text
Cyber Security
```

You previously created these courses as:

```text
1 → Programming
2 → Networking
3 → Cyber Security
4 → Web Development
```

Therefore Avery's new:

```text
course_id
```

should be:

```text
3
```

Run:

```text
GET /students
```

again.

Avery should now appear as:

```json
{
    "id": 9,
    "name": "Avery Johnson",
    "course": "Cyber Security"
}
```

If an invalid `student_id` is supplied, return:

```text
404 Not Found
```

Test your PUT endpoint using:

```text
999
```

### Questions

1. Which SQL operation does POST use?
2. Which SQL operation does PUT use?
3. Why does the API send `course_id` rather than inserting the course name into the `students` table?
4. What does `RETURNING` do?
5. Which system generated Avery's ID: FastAPI or PostgreSQL?

---

## Task 5: Complete the CRUD API

Complete the API by adding the DELETE operation.

Create:

```text
DELETE /students/{student_id}
```

Use:

```sql
DELETE FROM students
WHERE id = %s
RETURNING id, name, course_id;
```

Delete the Avery Johnson record created in Task 4.

Your API should return the deleted record.

If the student does not exist, return:

```text
404 Not Found
```

---

## Verify the DELETE

After deleting Avery:

Run:

```text
GET /students
```

Confirm that Avery is no longer returned.

Then run:

```text
GET /students/{student_id}
```

using Avery's old ID.

The API should return:

```text
404 Not Found
```

Finally, check the `students` table directly in Supabase.

Confirm that the record has been removed.

---

## Test the Complete Process

Test your finished application in this order:

```text
GET /courses

       ↓

Choose a course_id

       ↓

POST /students

       ↓

GET /students

       ↓

GET /students/{student_id}

       ↓

PUT /students/{student_id}

       ↓

GET /students/{student_id}

       ↓

DELETE /students/{student_id}

       ↓

GET /students/{student_id}

       ↓

404 Not Found
```

---

## Completed API

Your finished API should contain:

| HTTP Method | Endpoint | SQL Operation | Purpose |
|---|---|---|---|
| GET | `/database` | SELECT | Test the database connection |
| GET | `/courses` | SELECT | Retrieve courses |
| GET | `/students` | SELECT + JOIN | Retrieve students and course names |
| GET | `/students/{student_id}` | SELECT + JOIN | Retrieve one student |
| POST | `/students` | INSERT | Create a student |
| PUT | `/students/{student_id}` | UPDATE | Update a student |
| DELETE | `/students/{student_id}` | DELETE | Delete a student |

---

## HTTP, CRUD and SQL

You should now be able to see the relationship between API operations and database operations.

| CRUD | HTTP | SQL |
|---|---|---|
| Create | POST | INSERT |
| Read | GET | SELECT |
| Update | PUT | UPDATE |
| Delete | DELETE | DELETE |

The JOIN demonstrates another important database operation:

```text
students
     |
     | course_id
     v
courses
```

This allows the API to turn:

```json
{
    "name": "Alex Morgan",
    "course_id": 1
}
```

into a more useful response:

```json
{
    "name": "Alex Morgan",
    "course": "Programming"
}
```

---

## Final Check

Before completing the activity, confirm that:

- the Supabase database contains both `courses` and `students`
- the tables are connected using a foreign key
- the database connection information is stored in `.env`
- the database password is not hard-coded in `main.py`
- FastAPI can connect to Supabase PostgreSQL
- `GET /courses` retrieves the available courses
- `GET /students` uses a JOIN to retrieve course names
- `GET /students/{student_id}` retrieves one student
- POST uses INSERT
- PUT uses UPDATE
- DELETE uses DELETE
- database values are passed using parameterised queries
- missing students return `404 Not Found`
- changes made through FastAPI can be seen in Supabase
- no ORM has been used

The application architecture should still be:

```text
Client
   |
   | HTTP
   v
FastAPI
   |
   | Python
   v
Psycopg
   |
   | SQL
   v
Supabase PostgreSQL
```

The database itself now contains a relationship:

```text
courses
   1
   |
   | has many
   |
   *
students
```

This gives us a realistic relational database while still allowing us to clearly see the SQL being executed by our FastAPI application.
