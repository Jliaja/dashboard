# Employee & Project Management Dashboard

This is a comprehensive backend system with a responsive frontend for managing company resources, including employees, departments, and projects. It is built with Node.js, Express, PostgreSQL, and Sequelize, featuring a Tailwind CSS-styled frontend.

## 🚀 Features

*   **Authentication:** Secure user login using JSON Web Tokens (JWT).
*   **Dashboard:** View summary statistics and key metrics.
*   **Employee Management:** CRUD operations for employee records.
*   **Department Management:** Manage company departments.
*   **Project Management:** Track projects, assignments, and statuses.
*   **Responsive UI:** Mobile-friendly interface built with Tailwind CSS.
*   **API Security:** Protected routes requiring authentication.

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL (via Sequelize ORM)
*   **Frontend:** HTML, JavaScript, Tailwind CSS
*   **Authentication:** JWT (JSON Web Tokens), bcryptjs
*   **Tools:** Dotenv, CORS, SweetAlert2, Tom Select

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [PostgreSQL](https://www.postgresql.org/)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    DATABASE_URL=postgres://username:password@localhost:5432/database_name
    JWT_SECRET=your_super_secret_key_here
    ```
    *Replace `username`, `password`, and `database_name` with your local PostgreSQL credentials.*

4.  **Database Setup**
    Ensure your PostgreSQL server is running and the database exists. Then run migrations and seeders:
    ```bash
    # Run migrations
    npx sequelize-cli db:migrate

    # Seed the database (optional, for initial data)
    npx sequelize-cli db:seed:all
    ```

## ▶️ Running the Application

*   **Development Mode** (with hot-reloading and Tailwind watch):
    ```bash
    npm run dev
    ```

*   **Production Start**:
    ```bash
    npm start
    ```

The server will start at `http://localhost:5000` (or your defined PORT).
The frontend is served statically and can be accessed directly at the root URL.

## 📚 API Documentation

Detailed API documentation and testing instructions can be found in [API_TESTING.md](./API_TESTING.md).

### Base URL
`http://localhost:5000/api` or `https://wicked-katleen-companyuhuy-cda70a58.koyeb.app`

### Key Endpoints
*   `POST /api/auth/login` - User Login
*   `GET /api/dashboard/stats` - Dashboard Statistics
*   `GET /api/employee` - List Employees
*   `GET /api/departments` - List Departments
*   `GET /api/projects` - List Projects

## 📂 Project Structure

```
dashboard/
├── config/             # Database configuration
├── migrations/         # Sequelize migrations
├── models/             # Sequelize models
├── public/             # Static frontend files (HTML, CSS, JS)
├── seeders/            # Database seeders
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware (Auth, etc.)
│   ├── routes/         # API routes definitions
│   └── app.js          # Express app setup
├── server.js           # Entry point
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

## 📄 License

This project is licensed under the ISC License.

## 🔴 Live Testing

Test the project live on https://wicked-katleen-companyuhuy-cda70a58.koyeb.app/
