# Supabase Teacher Timetable Database Task

## Scenario

You have recently joined the Digital Systems Team at **KangaLife Learning Institute**. The institute currently stores its class timetable in a CSV file, but management wants to move the data into a relational cloud database using **Supabase**.

The supplied CSV contains information about:

- Teachers
- Subjects
- Classes
- Rooms
- Teaching days and times

Your task is to analyse the CSV, design and create a relational database in Supabase, import the data, and produce reports that answer management questions.

Use the supplied file: [`teacher_class_schedule_100_rows.csv`](../../assets/teacher_class_schedule_100_rows.csv)

---

## Part 1: Design and Create the Supabase Database

## Examine the Data

Open the supplied CSV file and carefully review its structure and contents.

Identify:

- The different entities represented in the dataset
- The fields that belong to each entity
- Data that is repeated across multiple rows
- Fields that could uniquely identify records
- Fields that could connect one entity to another
- Appropriate data types for each field

Record your findings before creating the database.

## Identify the Tables

Design an appropriate relational database structure for the timetable data.

At a minimum, consider whether the following entities should be stored in separate tables:

- Teachers
- Subjects
- Classes

You may create additional tables if they improve the organisation and normalization of the database.

For each proposed table, identify:

- Table name
- Columns
- Primary key
- Data type for each column
- Whether each column is required or optional
- Any foreign keys

Do not import the original CSV directly into a single permanent database table. The repeated data should be separated into appropriate relational tables.

## Identify the Relationships

Determine how the tables relate to one another.

Consider the following questions:

- Can one teacher teach multiple scheduled classes?
- Can one subject be delivered in multiple scheduled classes?
- Does each scheduled class have one teacher?
- Does each scheduled class relate to one subject?
- Can the same room be used for multiple classes at different times?
- Which table should store the foreign keys?

Create an Entity Relationship Diagram showing:

- All tables
- Columns within each table
- Primary keys
- Foreign keys
- Relationship lines
- Relationship cardinality, such as one-to-many

## Create the Database in Supabase

Using your proposed database design and ERD:

1. Create or open a Supabase project.
2. Create the required tables.
3. Add a primary key to each table.
4. Select suitable PostgreSQL data types.
5. Add the required foreign keys.
6. Ensure referential integrity is enforced.
7. Ensure required fields do not accept inappropriate null values.
8. Keep Row Level Security disabled for every table created for this task.

You may create the tables using either:

- The Supabase Table Editor
- The Supabase SQL Editor

No authentication or security policies are required for this activity.

## Prepare and Import the Data

Restructure the supplied CSV data so that it matches your database design.

You may need to create separate import files for different tables.

Complete the following:

1. Extract the unique teacher records.
2. Extract the unique subject records.
3. Prepare the scheduled class records.
4. Remove duplicated entity data where appropriate.
5. Preserve the identifiers needed for relationships.
6. Import data into parent tables before child tables.
7. Check that all records have been imported successfully.
8. Confirm that foreign key relationships are valid.

After importing the data, inspect each table and confirm that:

- The expected number of records is present
- Teacher names are not unnecessarily repeated in the class table
- Subject names are not unnecessarily repeated in the class table
- Each scheduled class connects to valid related records
- Time values have been stored using an appropriate data type

## Part 1 Deliverables

**Produce:**

1. A list of the entities identified in the original CSV
2. A table design showing columns, data types, primary keys and foreign keys
3. An ERD showing all tables and relationships
4. The SQL used to create the database, if applicable
5. The prepared import files
6. Screenshots showing the populated Supabase tables
7. Evidence that the relationships have been created
8. Evidence that Row Level Security is disabled for all task tables
9. A short explanation of why the final design is appropriately normalized

---

## Part 2: Query and Report on the Timetable Database

## Scenario

The database has now been created and populated. Management would like reports that help staff understand the timetable, teacher workloads, subject delivery and room utilisation.

Create SQL queries that answer the business questions below.

You must decide:

- Which tables are required for each report
- How records should be filtered
- How related data should be combined
- Whether calculations or summaries are required
- How results should be sorted
- Whether the returned results need to be restricted

Do not change the table structure to avoid writing the required queries.

## General Timetable Information

Create reports that answer the following questions:

1. What are the first 10 scheduled classes when ordered by class identifier?
2. Which five classes begin earliest in the day?
3. What subjects are offered by the institution, listed alphabetically?
4. Who are the teachers recorded in the system, listed alphabetically by name?
5. What rooms are used for teaching? Each room should appear only once and the results should be alphabetical.

## Find Specific Timetable Records

Create reports that answer the following questions:

1. Which classes occur on Friday?
2. Which classes are held in room A105?
3. Which classes start at 08:30?
4. Which scheduled classes are delivered by Amelia Hart?
5. Which subjects have the word `Design` in their subject name?
6. Which classes occur on Tuesday and finish after 12:00?
7. Which classes are not held in room A105?

## Combined Timetable Reports

Create reports that answer the following questions:

1. For every scheduled class, what is the class identifier and the name of the teacher delivering it?
2. For every scheduled class, what is the class identifier, subject code and subject name?
3. What is the complete timetable showing class identifier, teacher name, subject name, room, day, start time and end time?
4. What is the weekly teaching schedule for each teacher?
5. What classes are scheduled in each room, including their subject and teacher details?
6. Which teachers deliver each subject during the week?

Ensure that reports using information from multiple tables do not produce unnecessary duplicate records.

## Summary Information

Create reports that answer the following questions:

1. How many scheduled classes are stored in the database?
2. How many teachers are recorded?
3. How many subjects are offered?
4. What is the earliest class start time?
5. What is the latest class end time?
6. How many different rooms are used?
7. How many classes occur on Friday?
8. How many teachers deliver at least one class?

Give calculated columns meaningful names in the query results.

## Management Analysis

Create reports that answer the following questions:

1. How many classes are scheduled on each day?
2. How many classes does each teacher deliver?
3. How many times is each subject delivered?
4. How many classes are scheduled in each room?
5. Which teachers deliver more than five classes?
6. Which subjects are delivered more than three times?
7. Which rooms are used for more than four classes?
8. Which days have at least 15 scheduled classes?
9. Which teacher or teachers have the greatest number of scheduled classes?
10. Which subject or subjects are delivered most frequently?

Sort each report in a way that makes it easy for management to interpret. For workload and utilisation reports, the largest values should generally be easy to identify.

## Validate the Query Results

For each query:

1. Run the query in the Supabase SQL Editor.
2. Check that it executes without errors.
3. Review the result columns.
4. Compare the results with the original CSV where practical.
5. Confirm that repeated values are intentional.
6. Check that calculations use the correct records.
7. Save the final version of the SQL.
8. Capture evidence of the result.

## Part 2 Deliverables

**Produce:**

1. A numbered SQL query for every reporting question
2. Screenshots showing the results of each query
3. A short explanation of what each query returns
4. Evidence that the queries execute successfully in Supabase
5. A short management summary identifying notable timetable patterns

---

## Overall Success Criteria

You can successfully:

- Analyse a denormalized CSV dataset
- Identify suitable database entities
- Select appropriate primary and foreign keys
- Identify one-to-many relationships
- Create a relational database in Supabase
- Apply appropriate PostgreSQL data types
- Import data in the correct dependency order
- Maintain referential integrity
- Retrieve and sort database records
- Restrict the number of returned records
- Filter data using different conditions
- Combine related records from multiple tables
- Calculate summary values
- Summarize records by category
- Apply conditions to summarized results
- Validate SQL output against source data
- Present useful timetable information to stakeholders

## Checklist

Before submitting, confirm that you have included:

- Entity and field analysis
- Table design
- Primary and foreign keys
- ERD
- Supabase tables
- Imported data
- SQL used to create the tables
- Evidence that Row Level Security is disabled
- SQL queries for all Part 2 questions
- Screenshots of query results
- Query explanations
- Database normalization explanation
- Management summary

## Extension

**KangaLife Learning Institute** has now also provided a list on students and the classes that they are attending.  [`student_class_enrolments.csv`](../../assets/student_class_enrolments.csv).

Incorporate the student enrolment data into your database.

- Update your ERD to include the student class data.
- create the required CSV files.
- create the required tables in Supabase.
- upload the data into your Supabase database.

## Perform the following queries:

- Display every teacher together with the students attending their classes.
- Show all students enrolled in Robotics Fundamentals together with the teacher running the class.
- Display all students enrolled in classes taught by Amelia Hart.
- Show the subjects being studied by each student.
- List all teachers delivering classes to each student.
- Display students, subjects and rooms for every scheduled class.
- Show all students attending classes on Friday, including subject and teacher details.
- Display all students scheduled in room A105.

# Aggregates

- How many students are recorded in the database?
- How many attendance records exist?
- How many classes are scheduled throughout the week?
- How many unique subjects are offered?
- How many unique teachers are delivering classes?

# GROUP BY and Analysis

- How many classes are attended by each student?
- How many students attend each subject?
- How many students are enrolled in each class?
- How many classes occur on each day?
- How many classes are conducted in each room?

# HAVING and Business Intelligence

- Which classes have more than 10 students enrolled?
- Which students attend more than 6 classes?
- Which subjects have more than 40 student enrolments?
- Which rooms host more than 5 classes?
- Which days have more than 15 scheduled classes?

# Extension Challenges

- Which teachers deliver the greatest variety of subjects?
- Which rooms are used for the most teaching hours?
- How many different teachers does each student have throughout the week?
- Which subjects are delivered by multiple teachers?
- Which teachers deliver classes in more than one room?
- Which students are enrolled in classes from more than three different subjects?
- Which subjects have classes scheduled on multiple days?
- Which teachers deliver classes on every weekday?
- Which rooms are used on all five weekdays?

---

- Create a report showing:
    - Subject name
    - Number of classes
    - Number of students enrolled
    - Number of teachers delivering the subject

Sort the report so the most popular subject appears first.
