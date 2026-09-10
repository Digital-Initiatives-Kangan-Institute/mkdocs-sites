# KangaLife Tennis Club Database Project

## Scenario

**KangaLife** has recently expanded its leisure and recreation portfolio by acquiring a local tennis club. The club currently operates using a single CSV file that contains information about:

- Court bookings
- Court details
- Court pricing
- Club members
- Non-members
- Membership levels

Management wants to modernise operations by moving the data into a relational cloud database using **Supabase**.

The supplied CSV contains more than 500 court bookings for **August 2026** and includes a mixture of member and non-member court hires.

Your task is to analyse the CSV, design and create a relational database in Supabase, import the data, and produce reports that help management understand court utilisation, membership activity and club revenue.

Use the supplied file:

[kangalife_club_bookings_august_2026.csv](../../assets/kan) 

---

# Part 1: Design and Create the Supabase Database

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

---

## Identify the Tables

Design an appropriate relational database structure for the tennis club data.

At a minimum, consider whether the following entities should be stored in separate tables:

- Courts
- Members
- Bookings

You may create additional tables if they improve the organisation and normalization of the database.

For each proposed table, identify:

- Table name
- Columns
- Primary key
- Data type for each column
- Whether each column is required or optional
- Any foreign keys

Do not import the original CSV directly into a single permanent database table. The repeated data should be separated into appropriate relational tables.

---

## Identify the Relationships

Determine how the tables relate to one another.

Consider the following questions:

- Can a court have many bookings?
- Can a member make multiple bookings?
- Can some bookings belong to non-members?
- Should member information be stored separately from bookings?
- Where should court pricing information be stored?
- Which table should store the foreign keys?

Create an Entity Relationship Diagram showing:

- All tables
- Columns within each table
- Primary keys
- Foreign keys
- Relationship lines
- Relationship cardinality

---

## Create the Database in Supabase

Using your proposed database design and ERD:

- Create or open a Supabase project.
- Create the required tables.
- Add a primary key to each table.
- Select suitable PostgreSQL data types.
- Add the required foreign keys.
- Ensure referential integrity is enforced.
- Ensure required fields do not accept inappropriate null values.
- Keep Row Level Security disabled for every table created for this task.

You may create the tables using either:

- The Supabase Table Editor
- The Supabase SQL Editor

No authentication or security policies are required for this activity.

---

## Prepare and Import the Data

Restructure the supplied CSV data so that it matches your database design.

You may need to create separate import files for different tables.

Complete the following:

- Extract the unique court records.
- Extract the unique member records.
- Prepare the booking records.
- Remove duplicated entity data where appropriate.
- Preserve the identifiers needed for relationships.
- Import data into parent tables before child tables.
- Check that all records have been imported successfully.
- Confirm that foreign key relationships are valid.

After importing the data, inspect each table and confirm that:

- The expected number of records is present.
- Court information is not unnecessarily repeated in the bookings table.
- Member information is not unnecessarily repeated in the bookings table.
- Each booking connects to valid related records.
- Date and time values have been stored using appropriate data types.

---

## Part 1 Deliverables

Produce:

- A list of the entities identified in the original CSV
- A table design showing columns, data types, primary keys and foreign keys
- An ERD showing all tables and relationships
- The SQL used to create the database, if applicable
- The prepared import files
- Screenshots showing the populated Supabase tables
- Evidence that the relationships have been created
- Evidence that Row Level Security is disabled for all task tables
- A short explanation of why the final design is appropriately normalized

---

# Part 2: Query and Report on the Tennis Club Database

## Scenario

The database has now been created and populated.

Management would like reports that help staff understand:

- Court usage
- Membership activity
- Revenue generation
- Court popularity
- Booking trends

Create SQL queries that answer the business questions below.

You must decide:

- Which tables are required for each report
- How records should be filtered
- How related data should be combined
- Whether calculations or summaries are required
- How results should be sorted
- Whether the returned results need to be restricted

Do not change the table structure to avoid writing the required queries.

---

## General Booking Information

Create reports that answer the following questions:

- What are the first 20 bookings when ordered by booking identifier?
- Which 10 bookings occur earliest in the month?
- What court surfaces are available at the club?
- Which courts are available at the club?
- What membership levels are offered?

---

## Find Specific Records

Create reports that answer the following questions:

- Which bookings were made on 15 August 2026?
- Which bookings used grass courts?
- Which bookings start at 18:00 or later?
- Which bookings were made by premium members?
- Which bookings were made by non-members?
- Which bookings used Court 1?
- Which bookings generated more than $15 in revenue?

---

## Working Across Multiple Tables

Create reports that answer the following questions:

- Display every booking together with the court surface used.
- Display every booking together with the member information where applicable.
- Show booking date, court number and hirer name for all bookings.
- Show every member together with their booking history.
- Display all bookings occurring on grass courts together with hirer details.
- Show all bookings made during night sessions together with court information.
- Display all courts together with the number of bookings recorded for each court.
- Show all members and the courts they have hired.

Ensure that reports using information from multiple tables do not produce unnecessary duplicate records.

---

## Summary Information

Create reports that answer the following questions:

- How many bookings are recorded in the database?
- How many courts exist?
- How many members are recorded?
- How many non-member bookings exist?
- What is the earliest booking time?
- What is the latest booking time?
- How much revenue was generated during August?
- What is the average booking charge?

Give calculated columns meaningful names in the query results.

---

## Management Analysis

Create reports that answer the following questions:

- How many bookings were recorded for each court?
- How many bookings occurred on each court surface?
- How many bookings were made by each membership level?
- How many bookings were made by members versus non-members?
- How much revenue was generated by each court?
- Which courts generated the most revenue?
- Which court surfaces generated the most revenue?
- Which days recorded the highest number of bookings?
- Which courts were booked more than 35 times?
- Which dates recorded more than 20 bookings?

Sort each report in a way that makes it easy for management to interpret.

---

## Revenue and Membership Analysis

The club uses the following pricing rules:

- Basic members pay $5 per booking.
- Premium members pay no court hire fees.
- Honourary members only pay the full hire price when using grass courts.
- Non-members pay the full listed court hire price.

Create reports that answer the following questions:

- How much revenue was generated from each membership category?
- Which premium members made the most bookings?
- Which basic members made the most bookings?
- Which honourary members used grass courts?
- How many free bookings were made by premium members?
- How many free bookings were made by honourary members?
- Which members generated the highest revenue for the club?
- What percentage of bookings came from non-members?

---

## Validate the Query Results

For each query:

- Run the query in the Supabase SQL Editor.
- Check that it executes without errors.
- Review the result columns.
- Compare the results with the original CSV where practical.
- Confirm that repeated values are intentional.
- Check that calculations use the correct records.
- Save the final version of the SQL.
- Capture evidence of the result.

---

## Part 2 Deliverables

Produce:

- A numbered SQL query for every reporting question
- Screenshots showing the results of each query
- A short explanation of what each query returns
- Evidence that the queries execute successfully in Supabase
- A short management summary identifying notable court usage and revenue patterns

---

# Overall Success Criteria

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
- Present useful management information to stakeholders

---

# Checklist

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
