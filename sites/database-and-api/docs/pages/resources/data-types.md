# PostgreSQL Data Types

## Introduction

When creating a database table, each column must be assigned a **data type**.

A data type determines:

- What kind of data can be stored
- How much storage is required
- What operations can be performed on the data
- How PostgreSQL validates user input

Choosing the correct data type helps improve data quality, consistency, and database performance. PostgreSQL provides a wide range of data types, but most database designs use a small set of common types. 【1-25eca6】【2-6d43dd】

---

## Why Data Types Matter

Imagine a Student table containing:

| StudentID | StudentName | DateOfBirth |
|------------|------------|------------|
| 1001 | Sarah Lee | 15/08/2004 |

Each column stores a different kind of information:

- StudentID contains numbers
- StudentName contains text
- DateOfBirth contains dates

Using appropriate data types helps PostgreSQL store and validate data correctly. 【1-25eca6】

---

## Integer Data Types

Integer data types store whole numbers.

Common examples include:

- Student IDs
- Quantities
- Ages
- Counts

**INTEGER**

The most common numeric data type.

```sql
student_id INTEGER
```

Examples:

```text
1001
25
500
```

Use INTEGER when you need whole numbers without decimal places. 【1-25eca6】

---

## Decimal Data Types

Sometimes numbers require decimal places.

Examples:

- Product prices
- Tax rates
- Measurements

**NUMERIC**

NUMERIC stores exact decimal values.

```sql
price NUMERIC(10,2)
```

Examples:

```text
19.95
250.50
3.14
```

NUMERIC is commonly used for financial data because it stores values accurately. 【1-25eca6】【3-ec3e51】

---

## Text Data Types

Text data types store letters, words, and symbols.

Examples:

- Names
- Addresses
- Email addresses
- Course descriptions

**TEXT**

The most common text type in PostgreSQL.

```sql
student_name TEXT
```

Examples:

```text
Sarah Lee
Database Fundamentals
Melbourne
```

TEXT is flexible because it can store strings of varying length. 【1-25eca6】【3-ec3e51】

---

## Boolean Data Type

A Boolean stores one of two values:

- TRUE
- FALSE

**BOOLEAN**

```sql
active BOOLEAN
```

Examples:

```text
TRUE
FALSE
```

Common uses include:

- Active / Inactive users
- Yes / No decisions
- Completed / Not Completed tasks

【1-25eca6】

---

## Date Data Type

The DATE type stores calendar dates.

**DATE**

```sql
date_of_birth DATE
```

Examples:

```text
2004-08-15
2026-02-10
```

Common uses include:

- Birth dates
- Enrolment dates
- Order dates【1-25eca6】

---

## Time Data Type

TIME stores only a time of day.

**TIME**

```sql
start_time TIME
```

Examples:

```text
09:00:00
14:30:00
```

Common uses include:

- Class times
- Appointment times
- Business opening hours【1-25eca6】

---

## Timestamp Data Type

A timestamp stores both a date and a time.

**TIMESTAMP**

```sql
created_at TIMESTAMP
```

Example:

```text
2026-08-13 09:15:00
```

This is useful when recording:

- Log entries
- System events
- Record creation times【1-25eca6】

---

## Timestamp with Time Zone

PostgreSQL also supports timestamps that include time zone information.

**TIMESTAMPTZ**

```sql
created_at TIMESTAMPTZ
```

Example:

```text
2026-08-13 09:15:00+10
```

This is commonly used in modern web applications because users may be located in different time zones. 【3-ec3e51】【1-25eca6】

---

## UUID

A UUID is a globally unique identifier.

**UUID**

```sql
user_id UUID
```

Example:

```text
550e8400-e29b-41d4-a716-446655440000
```

UUIDs are commonly used as primary keys in modern applications because they are highly unlikely to be duplicated. 【1-25eca6】

---

## Example Student Table

```sql
CREATE TABLE students (
    student_id INTEGER,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    date_of_birth DATE,
    active BOOLEAN,
    created_at TIMESTAMP
);
```

Data types used:

| Column | Data Type |
|----------|----------|
| student_id | INTEGER |
| first_name | TEXT |
| last_name | TEXT |
| email | TEXT |
| date_of_birth | DATE |
| active | BOOLEAN |
| created_at | TIMESTAMP |

---

## Choosing the Correct Data Type

When designing a database:

- Use **INTEGER** for whole numbers.
- Use **NUMERIC** for money and exact decimal values.
- Use **TEXT** for names and descriptions.
- Use **BOOLEAN** for true/false values.
- Use **DATE** for calendar dates.
- Use **TIME** for times of day.
- Use **TIMESTAMP** for date and time combinations.
- Use **UUID** when globally unique identifiers are required.

Choosing the correct data type improves data quality and helps prevent invalid data from being entered. 【1-25eca6】【3-ec3e51】

---

## Activity

Consider the following fields.

Assign the most appropriate PostgreSQL data type.

| Field | Suggested Data Type |
|---------|---------|
| StudentID | ? |
| StudentName | ? |
| CourseFee | ? |
| DateOfBirth | ? |
| Active | ? |
| ClassStartTime | ? |
| AccountID | ? |

---

## Knowledge Check

1. What is a data type?
2. Which data type would you use for a student's name?
3. Which data type would you use for a course fee?
4. What is the difference between DATE and TIMESTAMP?
5. When would you use a BOOLEAN field?
6. What is a UUID?
7. Why is selecting the correct data type important?

---

## Further Reading

Supabase uses PostgreSQL as its database engine, so PostgreSQL data types are fully supported.

- Supabase Database Documentation: https://supabase.com/docs/guides/database/overview 【2-6d43dd】
- PostgreSQL Data Types Documentation: https://www.postgresql.org/docs/current/datatype.html 【1-25eca6】

---

## Summary

PostgreSQL provides many data types, but the most commonly used are:

- **INTEGER** for whole numbers
- **NUMERIC** for exact decimal values
- **TEXT** for text
- **BOOLEAN** for true/false values
- **DATE** for dates
- **TIME** for times
- **TIMESTAMP** for date and time values
- **UUID** for unique identifiers

Understanding these basic data types is an important step in designing reliable and efficient databases.
