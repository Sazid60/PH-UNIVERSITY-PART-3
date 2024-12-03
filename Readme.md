# Building University Management System Part-3

https://github.com/Apollo-Level2-Web-Dev/Level2-Batch4-PH-University-Server/tree/part-3

Requirement Analysis:

https://docs.google.com/document/d/10mkjS8boCQzW4xpsESyzwCCLJcM3hvLghyD_TeXPBx0/edit?usp=sharing

In Module 13,

We start by fixing previous bugs to ensure our code runs smoothly. We then create and validate the Academic Faculty interface and model, set up routes, controllers, and services, and test them using Postman. Next, we develop and validate the Academic Department interface and model, create controllers and routes, and test them with Postman. We handle validation for departments during creation and updates, learn to populate referencing fields, and implement the AppError class for better error management. We also explore transaction and rollback techniques, including deleting a student within a transaction. Finally, we learn how to dynamically update both primitive and non-primitive fields. This module helps you manage and validate complex data structures efficiently.

## 13-1 Fix your previous bugs

### Topics

- Bug Fix
- Academic Faculty CRUD
- Academic Department CRUD
- Transaction & Rollback
- Custom AppError
- Dynamic Update Primitive & Non Primitive Filed
- Faculty CRUD

- There is a bug in the code. The id should be reset when semester or year change

![alt text](IMG_20241202_181054.jpg)

- We will take the full id and compare with current year with the last admitted students year, current semester code and last students semester code

![alt text](image.png)

## Populate method to get Referenced data

![alt text](image-1.png)

- Since the referencing shows only the id but we can not understand so we have to use populate method of mongoose

```ts
// getting data service
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // nested populate is done since academic faculty inside academic department is still showing id
  return result;
};
```

- Custom Error handler with statius code

```ts
// extending error

class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack: '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
```
