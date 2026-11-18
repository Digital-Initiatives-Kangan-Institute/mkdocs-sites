
# Introduction to ORM with FastAPI and PostgreSQL

In the previous lesson, FastAPI communicated directly with PostgreSQL using SQL.

For example:

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

This gives us direct control over the SQL sent to the database.

There is another common approach used when developing applications.

Instead of writing SQL for every database operation, we can use an Object Relational Mapper, usually called an ORM.

Our architecture changes from:

```text
FastAPI
   |
   | SQL
   v
PostgreSQL
```

to:

```text
FastAPI
   |
   | Python Objects
   v
ORM
   |
   | SQL
   v
PostgreSQL
```

The ORM sits between our Python application and the database.

---

## Learning Outcomes

By the end of this lesson, you should be able to:

- explain what an ORM is
- explain why developers use ORMs
- describe the relationship between Python classes and database tables
- configure SQLAlchemy to connect to PostgreSQL
- create a SQLAlchemy model
- query database records using an ORM
- add records using an ORM
- update records using an ORM
- delete records using an ORM
- compare ORM operations with SQL

---

## What is an ORM?

ORM stands for:

```text
Object Relational Mapper
```

An ORM provides a way of working with relational database information using programming language objects.

Instead of working directly with:

```text
Tables
Rows
Columns
```

our Python program can work with:

```text
Classes
Objects
Attributes
```

The ORM translates between them.

---

## Database Table vs Python Class

Consider the `students` table:

```text
students
--------------------------------
id       INTEGER
name     VARCHAR
course   VARCHAR
```

Using an ORM, this can be represented by a Python class.

Conceptually:

```python
class Student:
    id
    name
    course
```

The relationship becomes:

```text
Database                 Python

students table    <--->  Student class

student row       <--->  Student object

id column         <--->  student.id

name column       <--->  student.name

course column     <--->  student.course
```

This mapping is the main idea behind an ORM.

---

## SQLAlchemy

For this lesson we will use SQLAlchemy.

SQLAlchemy is a Python SQL toolkit that includes ORM functionality.

Install it with:

```bash
pip install sqlalchemy "psycopg[binary]" python-dotenv
```

We will continue using our Supabase PostgreSQL database.

---

## Database Connection

We can continue storing the database connection information inside `.env`.

```env
DATABASE_URL=postgresql+psycopg://username:password@host:5432/postgres
```

Notice that our SQLAlchemy URL specifies:

```text
postgresql+psycopg
```

This tells SQLAlchemy that:

- the database is PostgreSQL
- Psycopg is being used as the database driver

---

## Creating the SQLAlchemy Engine

Create a new file:

```text
database.py
```

Add:

```python
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)
```

The `engine` manages communication with the database.

The session allows our application to interact with database records.

---

## What is a Session?

With direct SQL, we previously created a connection and cursor:

```python
with psycopg.connect(DATABASE_URL) as conn:

    with conn.cursor() as cur:
        ...
```

When using SQLAlchemy ORM, we normally work with a:

```text
Session
```

A session manages interactions between our Python objects and the database.

For example:

```python
db = SessionLocal()
```

We can then use:

```python
db.add()
db.get()
db.delete()
db.commit()
```

to interact with stored information.

---

## Creating an ORM Model

Create:

```text
models.py
```

Add:

```python
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Base(DeclarativeBase):
    pass


class Student(Base):

    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(
        String(100)
    )

    course: Mapped[str] = mapped_column(
        String(100)
    )
```

This class represents our PostgreSQL table.

---

## Understanding the Model

This:

```python
class Student(Base):
```

creates our ORM model.

This:

```python
__tablename__ = "students"
```

tells SQLAlchemy which PostgreSQL table the class represents.

This:

```python
id: Mapped[int] = mapped_column(primary_key=True)
```

maps the Python attribute:

```text
id
```

to the database column:

```text
id
```

The same happens for:

```python
name
```

and:

```python
course
```

---

## ORM Model vs Pydantic Model

At first, this can be confusing because we now have different types of models.

The ORM model represents:

```text
Database data
```

The Pydantic model represents:

```text
API data
```

For example:

```text
HTTP Request
     |
     v
Pydantic Model
     |
     v
FastAPI
     |
     v
ORM Model
     |
     v
PostgreSQL
```

These models have different jobs.

---

## Pydantic Model

We can create:

```python
from pydantic import BaseModel


class StudentCreate(BaseModel):

    name: str
    course: str
```

This validates JSON arriving through the API.

Example:

```json
{
    "name": "Morgan",
    "course": "Web Development"
}
```

---

## GET Using SQL

Previously we wrote:

```sql
SELECT id, name, course
FROM students;
```

With SQLAlchemy ORM we can use:

```python
from sqlalchemy import select

statement = select(Student)
```

We then execute the statement through the database session.

---

## GET All Students

```python
@app.get("/students")
def get_students():

    db = SessionLocal()

    try:

        statement = select(Student)

        students = db.scalars(statement).all()

        return students

    finally:

        db.close()
```

Compare this with direct SQL.

Direct SQL:

```sql
SELECT id, name, course
FROM students;
```

ORM:

```python
select(Student)
```

Both ultimately retrieve records from the same PostgreSQL table.

---

## GET a Student by ID

Direct SQL used:

```sql
SELECT id, name, course
FROM students
WHERE id = 2;
```

Using SQLAlchemy, we can retrieve a record using its primary key.

```python
@app.get("/students/{student_id}")
def get_student(student_id: int):

    db = SessionLocal()

    try:

        student = db.get(Student, student_id)

        if student is None:

            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        return student

    finally:

        db.close()
```

This:

```python
db.get(Student, student_id)
```

asks SQLAlchemy to retrieve a `Student` object using its primary key.

---

## Creating an Object

With direct SQL we previously used:

```sql
INSERT INTO students (name, course)
VALUES ('Morgan', 'Web Development');
```

Using the ORM, we first create a Python object.

```python
student = Student(
    name="Morgan",
    course="Web Development"
)
```

At this point the object exists in Python, but has not yet been permanently saved to PostgreSQL.

---

## Adding the Object

We add the object to the session:

```python
db.add(student)
```

Then save the change:

```python
db.commit()
```

We can reload values generated by the database:

```python
db.refresh(student)
```

The complete sequence is:

```python
db.add(student)
db.commit()
db.refresh(student)
```

---

## POST Using the ORM

```python
@app.post("/students", status_code=201)
def create_student(student: StudentCreate):

    db = SessionLocal()

    try:

        new_student = Student(
            name=student.name,
            course=student.course
        )

        db.add(new_student)

        db.commit()

        db.refresh(new_student)

        return new_student

    finally:

        db.close()
```

Compare:

```text
SQL                         ORM

INSERT                      Student(...)

VALUES                      db.add()

COMMIT                      db.commit()
```

The ORM generates the appropriate SQL for us.

---

## Updating a Student

With SQL we used:

```sql
UPDATE students
SET name = 'Morgan',
    course = 'Networking'
WHERE id = 4;
```

With the ORM:

```python
student.name = "Morgan"
student.course = "Networking"

db.commit()
```

The object represents the database record.

Changing the object's attributes and committing the session updates the database.

---

## PUT Using the ORM

```python
@app.put("/students/{student_id}")
def update_student(
    student_id: int,
    updated: StudentCreate
):

    db = SessionLocal()

    try:

        student = db.get(Student, student_id)

        if student is None:

            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        student.name = updated.name
        student.course = updated.course

        db.commit()

        db.refresh(student)

        return student

    finally:

        db.close()
```

---

## DELETE Using SQL

Previously:

```sql
DELETE FROM students
WHERE id = 4;
```

Using the ORM:

```python
db.delete(student)

db.commit()
```

---

## DELETE Using the ORM

```python
@app.delete("/students/{student_id}")
def delete_student(student_id: int):

    db = SessionLocal()

    try:

        student = db.get(Student, student_id)

        if student is None:

            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        db.delete(student)

        db.commit()

        return {
            "message": "Student deleted"
        }

    finally:

        db.close()
```

---

## Comparing SQL and ORM

**Read all records**

SQL:

```sql
SELECT *
FROM students;
```

ORM:

```python
select(Student)
```

**Read one record**

SQL:

```sql
SELECT *
FROM students
WHERE id = 3;
```

ORM:

```python
db.get(Student, 3)
```

**Create**

SQL:

```sql
INSERT INTO students (name, course)
VALUES ('Alex', 'Programming');
```

ORM:

```python
student = Student(
    name="Alex",
    course="Programming"
)

db.add(student)
db.commit()
```

**Update**

SQL:

```sql
UPDATE students
SET course = 'Networking'
WHERE id = 3;
```

ORM:

```python
student.course = "Networking"

db.commit()
```

**Delete**

SQL:

```sql
DELETE FROM students
WHERE id = 3;
```

ORM:

```python
db.delete(student)

db.commit()
```

---

## Why Use an ORM?

An ORM can make database code easier to organise as an application grows.

Instead of repeatedly writing SQL:

```sql
SELECT ...
INSERT ...
UPDATE ...
DELETE ...
```

developers can work with Python objects.

This can be particularly useful when an application contains many related database tables.

ORMs can also help manage relationships between tables.

For example:

```text
Student
   |
   | enrols in
   v
Course
```

or:

```text
Customer
   |
   | places
   v
Order
```

These relationships can be represented through ORM models.

---

## Does ORM Replace SQL Knowledge?

No.

ORMs still communicate with relational databases using SQL.

The ORM simply generates much of that SQL on behalf of the application.

Understanding SQL remains important when:

- designing databases
- troubleshooting queries
- improving performance
- creating reports
- working with complex queries
- understanding what the ORM is doing

A useful way to think about ORM is:

```text
Python Code
     |
     v
ORM
     |
     | generates
     v
SQL
     |
     v
PostgreSQL
```

---

## Direct SQL vs ORM

Neither approach is automatically better in every situation.

Direct SQL gives developers greater visibility and control over the SQL being executed.

ORMs can reduce repetitive database code and make larger applications easier to organise.

Understanding both approaches allows developers to choose the appropriate method for a project.

---

## The Complete Architecture

Our application now contains several layers.

```text
Client
   |
   | JSON
   v
FastAPI
   |
   v
Pydantic
   |
   v
SQLAlchemy ORM
   |
   v
Psycopg
   |
   v
Supabase PostgreSQL
```

Each component has a different role.

```text
FastAPI
Handles HTTP requests and routes

Pydantic
Validates API data

SQLAlchemy
Maps Python objects to database structures

Psycopg
Provides the PostgreSQL database driver

Supabase
Hosts our PostgreSQL database

PostgreSQL
Stores the application data
```

---

## Key Points

In this lesson:

- ORM stands for Object Relational Mapper
- SQLAlchemy provides ORM functionality for Python
- ORM classes can represent PostgreSQL tables
- ORM objects can represent database records
- Pydantic models validate API data
- SQLAlchemy models represent database data
- sessions manage database operations
- `db.add()` adds an object
- `db.commit()` saves changes
- `db.get()` can retrieve an object by primary key
- `db.delete()` deletes an object
- ORM does not remove the need to understand databases or SQL

Previously we used:

```text
FastAPI
   |
   v
SQL
   |
   v
PostgreSQL
```

We now understand another approach:

```text
FastAPI
   |
   v
ORM
   |
   v
SQL
   |
   v
PostgreSQL
```

Both approaches ultimately interact with the same PostgreSQL database.
