# KangaLife Kueuing Kompanion Database Project

## Scenario

**KangaLife** is developing a new piece of software called the **Kueuing Kompanion** to manage its 3D-printing farm. The print farm has multiple printers that any student may use.

The software needs to record:

- Which student used which printer
- The name of the model file printed (a `.3mf` file)
- What time the print job started
- How long the print job took (in minutes)

Students are identified by a first name, last name, student ID (a number), and an email address (always ending in `@kangalife.edu.au`). Every student is enrolled in exactly one course.

Printers are identified by a printer ID (format `P####`), a nickname, a brand, a model, and a type (`FDM` or `SLS`).

Courses are identified by a course code, a name, a description, and a coordinator (the staff member responsible for the course). A course may have many students enrolled, but each student belongs to only one course.

Management has supplied a single denormalised CSV export from the current tracking spreadsheet, covering roughly two months of print jobs:

[kangalife_print_farm_jobs.csv](../../assets/kangalife_print_farm_jobs.csv)

The CSV contains around 300 print jobs, covering 30 students, 2 courses, and 10 printers. Student, course and printer details are repeated on every row that references them.

Management wants this data modelled and implemented in **Supabase**, and needs a small set of reports to understand printer usage and student activity.

---

# Part 1: Design and Create the Supabase Database

Create an ERD for your proposed design, showing all tables, columns, primary keys, foreign keys, and relationship lines with cardinality.

**Checkpoint:** Have your completed ERD checked by your assessor before you continue. Do not create the database in Supabase until your ERD has been approved.

## Create the Database in Supabase

- Create or open a Supabase project.
- Create the required tables using either the Table Editor or SQL Editor.
- Ensure required fields do not accept inappropriate null values.
- Keep Row Level Security disabled for every table created for this task.

## Prepare and Import the Data

Transform the data from `kangalife_print_farm_jobs.csv` and load it into your Supabase database. Confirm that the same number of print jobs exist in your database as in the source file — show the query you used to count the rows in your Print Jobs table and the number of rows it returned as proof.

## Part 1 Deliverables

- An ERD showing all tables and relationships
- The prepared import files
- Screenshots showing the Supabase tables in ERD view

---

# Part 2: Query and Report on the Print Farm Database

## General Information

1. Display all print jobs, ordered by job identifier.
2. List all students, ordered alphabetically by last name.
3. List all courses, ordered alphabetically by course name.

## Find Specific Records

1. Which print jobs took longer than 3 hours?
2. Which print jobs used a model name containing `bracket`?
3. Which print jobs were printed on an SLS printer?
4. Which students are enrolled in a course with `Design` in the course name?

## Joins (Inner Join Only)

1. Display every print job together with the student's first and last name.
2. Display every print job together with the printer nickname and type.
3. Show student name, printer nickname, model name and duration for every print job.
4. Display every student together with the name of their enrolled course.
5. Display every print job together with the student's name and the name of their course.
6. Who is the coordinator responsible for each student, based on their enrolled course?

## Aggregates

1. How many print jobs are recorded in total?  Only display one row showing the number of print jobs.
2. What is the total print time (in minutes) across all jobs?
3. What is the average print duration?
4. What is the longest single print job?
5. What is the shortest single print job?

## Group By and Having

1. How many print jobs has each student submitted?
2. How many print jobs has each printer completed?
3. What is the total print time recorded for each printer?
4. What is the average print duration for each printer type?
5. Which printers have recorded more than 100 minutes of total print time?
6. How many students are enrolled in each course?
7. What is the total print time recorded by students in each course?
8. Which students have submitted more than 3 print jobs?

## Validate the Query Results

For each query:

- Run the query in the Supabase SQL Editor.
- Check that it executes without errors.
- Save the final version of the SQL.

## Part 2 Deliverables

- A numbered SQL query for every reporting question
- Screenshots showing the results of each query.  No more than the first 10 rows.  Include the number of rows returned. 

---

# Part 3: PostgREST Data Retrieval

Use the Supabase-generated PostgREST API to create read-only `GET` requests. Do not use `POST`, `PUT`, `PATCH` or `DELETE`. Do not include a real API key in submitted evidence.

**Task 1:** Retrieve all students.

**Task 2:** Retrieve only student first name, last name and email.

**Task 3:** Retrieve all printers, sorted by printer type.

**Task 4:** Retrieve printers where `type` is `FDM`.

**Task 5:** Retrieve all courses.

For each task, provide:

- A screenshot of the result.  One screen is sufficeent for each task.

---

