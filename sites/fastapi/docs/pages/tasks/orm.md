# FastAPI ORM Tasks

In the previous activity, you connected FastAPI directly to a Supabase PostgreSQL database using Psycopg and SQL.

You worked with two related tables:

```text
courses
   1
   |
   | has many
   |
   *
students
```

You created API operations using SQL such as:

```sql
SELECT
INSERT
UPDATE
DELETE
```

In this activity, you will reuse the same database and tables.

However, instead of writing SQL directly, you will use SQLAlchemy ORM.

Your application will change from:

```text
FastAPI
   |
   v
Psycopg
   |
   | SQL written by you
   v
PostgreSQL
```

to:

```text
FastAPI
   |
   v
SQLAlchemy ORM
   |
   v
Psycopg
   |
   v
PostgreSQL
```

Do not recreate the database tables.

The existing PostgreSQL tables will be mapped to Python classes.

---

## Existing Database

Your database should already contain:

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

You can confirm that the tables still contain data using the Supabase SQL Editor:

```sql
SELECT *
FROM courses;
```

and:

```sql
SELECT *
FROM students;
```

You should not need to modify the database for this activity.

---

## Task 1: Configure SQLAlchemy

Install the required packages:

```bash
pip install sqlalchemy "psycopg[binary]" python-dotenv
```

You will continue using the same `.env` file from the previous activity.

For SQLAlchemy with Psycopg, your database URL should use:

```text
postgresql+psycopg
```

For example:

```env
DATABASE_URL=postgresql+psycopg://username:password@host:5432/postgres
```

Do not hard-code your database password into your Python files.

### Create database.py

Create:

```text
database.py
```

Import:

```python
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
```

Load the environment variables:

```python
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
```

Create the SQLAlchemy engine:

```python
engine = create_engine(DATABASE_URL)
```

Then create:

```python
SessionLocal = sessionmaker(bind=engine)
```

Your database layer should now follow:

```text
Python
   |
   v
SQLAlchemy
   |
   v
Psycopg
   |
   v
Supabase PostgreSQL
```

### Questions

1. What is the purpose of the SQLAlchemy `engine`?
2. What is a database session?
3. Does using SQLAlchemy mean that Psycopg is no longer required?
4. Where is the database connection string stored?

---

## Task 2: Map the Existing Tables to ORM Classes

Your database already contains the tables.

Now create Python classes that represent those tables.

Create:

```text
models.py
```

Start with:

```python
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass
```

### Create the Course Model

Create an ORM model called:

```python
Course
```

It should represent:

```text
courses
```

The existing table contains:

```text
id
name
```

Your model should begin:

```python
class Course(Base):

    __tablename__ = "courses"
```

Map:

```text
id
```

as the primary key.

Map:

```text
name
```

using:

```python
String(100)
```

Your model should match the structure of the existing PostgreSQL table.

---

### Create the Student Model

Create another ORM model called:

```python
Student
```

It should represent:

```text
students
```

Map:

```text
id
name
course_id
```

The `course_id` column is a foreign key.

Use:

```python
ForeignKey("courses.id")
```

to represent the existing relationship.

Conceptually:

```text
Course class
      |
      v
courses table


Student class
      |
      v
students table
```

The classes do not replace the tables.

They provide Python representations of them.

---

## Important: Do Not Create New Tables

The tables already exist from the previous activity.

For this task, do not use:

```python
Base.metadata.create_all(...)
```

You are mapping SQLAlchemy models to tables that already exist.

This gives you an important opportunity to compare:

```text
PostgreSQL Table
       |
       v
SQLAlchemy Class
```

---

## Check Your Models

Your models should represent:

```text
Course
--------------------------------
id
name


Student
--------------------------------
id
name
course_id
```

Compare your Python models with the actual tables in Supabase.

Check:

- table names
- column names
- primary keys
- data types
- foreign key

### Questions

1. What does `__tablename__` do?
2. What does `mapped_column()` represent?
3. Which Python class represents the `students` table?
4. Which attribute represents the foreign key?
5. What is the difference between a database table and an ORM class?

---

## Task 3: Read Existing Data Using the ORM

Previously, you retrieved courses using SQL:

```sql
SELECT id, name
FROM courses
ORDER BY id;
```

You will now retrieve the same records using SQLAlchemy.

Create:

```text
GET /courses
```

Import:

```python
from sqlalchemy import select
```

and import your models and database session.

You can create a query using:

```python
statement = select(Course)
```

Execute it through the database session:

```python
courses = db.scalars(statement).all()
```

Your endpoint should return the existing courses.

For example:

```json
[
    {
        "id": 1,
        "name": "Programming"
    },
    {
        "id": 2,
        "name": "Networking"
    }
]
```

---

## Retrieve Students

Create:

```text
GET /students
```

Use:

```python
select(Student)
```

to retrieve the existing students.

Do not write:

```sql
SELECT *
FROM students;
```

The purpose of this activity is to perform the database operation through SQLAlchemy.

---

## Retrieve One Student

Create:

```text
GET /students/{student_id}
```

Use:

```python
db.get(Student, student_id)
```

If the student cannot be found, return:

```text
404 Not Found
```

Test:

```text
/students/1

/students/3

/students/8

/students/999
```

### Compare the Approaches

Previously:

```python
cur.execute(
    """
    SELECT id, name, course_id
    FROM students
    WHERE id = %s
    """,
    (student_id,)
)

student = cur.fetchone()
```

Now:

```python
student = db.get(
    Student,
    student_id
)
```

Both operations retrieve data from the same PostgreSQL table.

### Questions

1. What happened to the SQL you previously wrote?
2. Does PostgreSQL still execute SQL?
3. What does `db.get()` return when the record cannot be found?
4. What does `.all()` return?
5. What part does SQLAlchemy play between FastAPI and PostgreSQL?

---

## Task 4: Create and Update Students Using Objects

Previously, you created a student using:

```sql
INSERT INTO students (name, course_id)
VALUES (%s, %s);
```

You will now perform this operation using an ORM object.

### Create a Pydantic Model

Create:

```text
schemas.py
```

Add:

```python
from pydantic import BaseModel


class StudentCreate(BaseModel):

    name: str
    course_id: int
```

This model describes the data accepted by the API.

For example:

```json
{
    "name": "Avery Johnson",
    "course_id": 1
}
```

Remember:

```text
StudentCreate
```

is a Pydantic model used for API data.

```text
Student
```

is an SQLAlchemy model representing database data.

They have different purposes.

---

## Create a Student Object

Create:

```text
POST /students
```

Your endpoint should receive:

```python
student: StudentCreate
```

Create an ORM object:

```python
new_student = Student(
    name=student.name,
    course_id=student.course_id
)
```

Add it to the session:

```python
db.add(new_student)
```

Save the change:

```python
db.commit()
```

Then retrieve the database-generated values:

```python
db.refresh(new_student)
```

Return the new student.

Test with:

```json
{
    "name": "Avery Johnson",
    "course_id": 1
}
```

Check Supabase and confirm that the new row has been created.

---

## Compare INSERT with ORM

Previously:

```sql
INSERT INTO students (name, course_id)
VALUES ('Avery Johnson', 1);
```

Now:

```python
new_student = Student(
    name="Avery Johnson",
    course_id=1
)

db.add(new_student)

db.commit()
```

SQLAlchemy is responsible for generating the required SQL.

---

## Update the Student

Create:

```text
PUT /students/{student_id}
```

First retrieve the ORM object:

```python
student = db.get(
    Student,
    student_id
)
```

If no student exists, return:

```text
404 Not Found
```

Otherwise, change the object's attributes.

For example:

```python
student.name = updated.name
student.course_id = updated.course_id
```

Then save the changes:

```python
db.commit()
```

Refresh the object:

```python
db.refresh(student)
```

Use the endpoint to change Avery Johnson from:

```text
course_id = 1
```

to:

```text
course_id = 3
```

This changes the student from:

```text
Programming
```

to:

```text
Cyber Security
```

Check the change in Supabase.

### Questions

1. What does `db.add()` do?
2. What does `db.commit()` do?
3. Why do we use `db.refresh()`?
4. Which object represents the new database record?
5. What SQL operation is SQLAlchemy effectively performing for POST?
6. What SQL operation is SQLAlchemy effectively performing for PUT?

---

## Task 5: Delete a Student and Add the Relationship

Complete the CRUD operations by adding:

```text
DELETE /students/{student_id}
```

Retrieve the student:

```python
student = db.get(
    Student,
    student_id
)
```

If the student does not exist, return:

```text
404 Not Found
```

Delete the ORM object:

```python
db.delete(student)
```

Save the change:

```python
db.commit()
```

Delete the Avery Johnson record created in Task 4.

Check Supabase and confirm that the record was removed.

---

## Add an ORM Relationship

The database already contains this relationship:

```text
courses.id
      |
      v
students.course_id
```

The foreign key tells PostgreSQL how the tables are related.

We can also represent this relationship in our ORM models.

Import:

```python
relationship
```

from:

```python
sqlalchemy.orm
```

Update the `Course` model so it contains:

```python
students = relationship(
    "Student",
    back_populates="course"
)
```

Update the `Student` model so it contains:

```python
course = relationship(
    "Course",
    back_populates="students"
)
```

Your ORM relationship is now:

```text
Course object
     |
     | .students
     v
Student objects
```

and:

```text
Student object
     |
     | .course
     v
Course object
```

---

## Using the Relationship

Retrieve a student using:

```python
student = db.get(
    Student,
    student_id
)
```

You can now access the related course object using:

```python
student.course
```

and the course name using:

```python
student.course.name
```

Previously, you needed a JOIN to retrieve this information.

For example:

```sql
SELECT
    students.id,
    students.name,
    courses.name AS course
FROM students
JOIN courses
    ON students.course_id = courses.id;
```

The ORM relationship now allows your Python code to navigate between related objects.

Conceptually:

```text
Direct SQL

students
   |
   | JOIN
   v
courses
```

compared with:

```text
ORM

student
   |
   | .course
   v
Course object
```

The relationship in PostgreSQL has not disappeared.

SQLAlchemy is providing a Python representation of it.

---

## Completed API

Your ORM version should contain:

| HTTP Method | Endpoint | ORM Operation | SQL Equivalent |
|---|---|---|---|
| GET | `/courses` | `select(Course)` | SELECT |
| GET | `/students` | `select(Student)` | SELECT |
| GET | `/students/{student_id}` | `db.get()` | SELECT |
| POST | `/students` | `db.add()` | INSERT |
| PUT | `/students/{student_id}` | Modify object | UPDATE |
| DELETE | `/students/{student_id}` | `db.delete()` | DELETE |

---

## Compare the Two Applications

You have now created two versions of an API that use the same PostgreSQL database.

### Direct SQL Version

```text
FastAPI
   |
   v
Psycopg
   |
   v
SQL written by you
   |
   v
PostgreSQL
```

Example:

```python
cur.execute(
    """
    UPDATE students
    SET course_id = %s
    WHERE id = %s
    """,
    (course_id, student_id)
)
```

### ORM Version

```text
FastAPI
   |
   v
SQLAlchemy ORM
   |
   v
Psycopg
   |
   v
SQL generated by SQLAlchemy
   |
   v
PostgreSQL
```

Example:

```python
student.course_id = course_id

db.commit()
```

Both applications modify the same PostgreSQL database.

---

## Final Check

Before completing the activity, confirm that:

- you reused the existing Supabase database
- you did not recreate the `courses` and `students` tables
- `database.py` contains the SQLAlchemy database configuration
- `models.py` contains the ORM models
- `schemas.py` contains the Pydantic model
- `Course` maps to the `courses` table
- `Student` maps to the `students` table
- `course_id` maps to the existing foreign key
- GET retrieves existing database objects
- POST creates a new ORM object
- PUT modifies an existing ORM object
- DELETE removes an ORM object
- `db.commit()` saves changes to PostgreSQL
- the Course and Student models contain an ORM relationship
- changes made through the ORM can be seen in Supabase
- you can explain the difference between Pydantic and SQLAlchemy models

---

## Reflection

Answer the following questions:

1. What does ORM stand for?
2. What is the relationship between an ORM class and a database table?
3. What is the relationship between an ORM object and a database row?
4. What is the difference between a Pydantic model and an SQLAlchemy model?
5. What does `db.get()` do?
6. What does `db.add()` do?
7. Why is `db.commit()` important?
8. What does `db.delete()` do?
9. Does SQLAlchemy remove the need for PostgreSQL?
10. Does SQLAlchemy remove SQL from the application completely?
11. What is the purpose of `relationship()`?
12. How is `student.course` related to the foreign key stored in `student.course_id`?

You should now be able to explain the progression from:

```text
FastAPI
   |
   v
Direct SQL
   |
   v
PostgreSQL
```

to:

```text
FastAPI
   |
   v
Python Objects
   |
   v
SQLAlchemy ORM
   |
   v
PostgreSQL
```
