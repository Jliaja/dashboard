# API Testing Documentation

## Base URL
The base URL for all API requests is:
`http://localhost:5000/api` or `https://wicked-katleen-companyuhuy-cda70a58.koyeb.app`

## Authentication
Most endpoints (except GET methods) require authentication.
1.  **Login** to get a token.
2.  Use the token in the `Authorization` header for protected routes:
    `Authorization: Bearer <your_token_here>`

---

## 1. Authentication

### Login
**POST** `/api/auth/login`
- **Description:** Authenticate user and receive a JWT token.
- **Body (JSON):**
  ```json
  {
    "email": "admin@gmail.com",
    "password": "admin123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "role": "admin"
  }
  ```

### Get Current User
**GET** `/api/auth/me`
- **Description:** Get details of the currently logged-in user.
- **Headers:** `Authorization: Bearer <token>`

---

## 2. Dashboard

### Get Dashboard Stats
**GET** `/api/dashboard/stats`
- **Description:** Get summary statistics for the dashboard.
- **Headers:** `Authorization: Bearer <token>` (Recommended)

---

## 3. Employees
**Base Path:** `/api/employee`

### Get All Employees
**GET** `/api/employee`
- **Description:** Retrieve a list of all employees.

### Get Employee by ID
**GET** `/api/employee/:id`
- **Description:** Retrieve details of a specific employee.
- **Example:** `/api/employee/1`

### Create Employee
**POST** `/api/employee`
- **Description:** Add a new employee.
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Developer",
    "department_id": 1,
    "status": "Active"
  }
  ```

### Update Employee
**PUT** `/api/employee/:id`
- **Description:** Update an existing employee's details.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/employee/1`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.doe@example.com",
    "position": "Senior Developer",
    "department_id": 1,
    "status": "Active"
  }
  ```

### Delete Employee
**DELETE** `/api/employee/:id`
- **Description:** Remove an employee.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/employee/1`

---

## 4. Departments
**Base Path:** `/api/departments`

### Get All Departments
**GET** `/api/departments`
- **Description:** Retrieve a list of all departments.

### Get Department by ID
**GET** `/api/departments/:id`
- **Description:** Retrieve details of a specific department.
- **Example:** `/api/departments/1`

### Create Department
**POST** `/api/departments`
- **Description:** Add a new department.
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "name": "Engineering",
    "description": "Software development and engineering team"
  }
  ```

### Update Department
**PUT** `/api/departments/:id`
- **Description:** Update an existing department.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/departments/1`
- **Body (JSON):**
  ```json
  {
    "name": "Engineering & Product",
    "description": "Updated description"
  }
  ```

### Delete Department
**DELETE** `/api/departments/:id`
- **Description:** Remove a department.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/departments/1`

---

## 5. Projects
**Base Path:** `/api/projects`

### Get All Projects
**GET** `/api/projects`
- **Description:** Retrieve a list of all projects.

### Get Project by ID
**GET** `/api/projects/:id`
- **Description:** Retrieve details of a specific project.
- **Example:** `/api/projects/1`

### Create Project
**POST** `/api/projects`
- **Description:** Add a new project.
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "name": "Website Redesign",
    "client": "Company ABC",
    "status": "In Progress",
    "start_date": "2023-01-01",
    "end_date": "2023-06-30",
    "employee_id": 1
  }
  ```

### Update Project
**PUT** `/api/projects/:id`
- **Description:** Update an existing project.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/projects/1`
- **Body (JSON):**
  ```json
  {
    "name": "Website Redesign V2",
    "client": "Company ABC",
    "status": "Completed",
    "start_date": "2023-01-01",
    "end_date": "2023-07-15",
    "employee_id": 1
  }
  ```

### Delete Project
**DELETE** `/api/projects/:id`
- **Description:** Remove a project.
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/projects/1`
