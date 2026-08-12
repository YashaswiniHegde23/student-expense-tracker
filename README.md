# Student Expense Tracker

## Project Overview

Student Expense Tracker is a full-stack web application designed to help students manage their daily expenses and budgets in one place.

The application allows users to create an account, securely log in, record and manage expenses, set budgets, monitor spending, and manage their profile.

The project is built using a React.js frontend, Spring Boot backend, and MySQL database. JWT authentication and Spring Security are used to secure user accounts and protected API endpoints.

---

## Problem Statement

Students often have multiple daily expenses such as food, travel, shopping, education, and entertainment. Managing these expenses manually can make it difficult to understand spending patterns and stay within a budget.

Student Expense Tracker provides a simple digital solution for recording expenses, organizing them, setting budgets, and monitoring spending.

---

## Objectives

- Provide secure user registration and login.
- Allow users to add and manage expenses.
- Organize expenses by category.
- Allow users to create and manage budgets.
- Provide a dashboard to monitor spending.
- Provide search, filtering, sorting, and pagination for expenses.
- Provide profile management.
- Protect user data through authentication and authorization.

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Logout

### Dashboard

- Expense Summary
- Total Spending
- Recent Expenses
- Quick Actions

### Expense Management

- Add Expenses
- Edit Expenses
- Delete Expenses
- Search Expenses
- Filter Expenses
- Sort Expenses
- Expense Pagination
- Expense Export

### Budget Management

- Create Budgets
- View Budget Status
- Track Spending Against Budget
- Manage Budgets by Category and Year

### Profile Management

- View Profile
- Update Profile
- Logout

---

## Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

### Database

- MySQL

### Development Tools

- IntelliJ IDEA
- MySQL Workbench
- Visual Studio Code
- Git
- GitHub
- npm

---

## System Architecture

    Student Expense Tracker
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
React Frontend    Spring Boot Backend
│                   │
│   HTTP Requests   │
└──────────────────►│
│
Spring Security
│
JWT Authentication
│
Spring Data JPA
│
▼
MySQL Database

The React frontend communicates with the Spring Boot backend through HTTP requests.

The backend handles authentication, business logic, validation, and database operations.

The MySQL database stores user, expense, and budget information.

---

## Project Structure

    student-expense-tracker-project/
    │
    ├── README.md
    │
    ├── student-expense-tracker/
    │   │
    │   ├── src/
    │   │   ├── main/
    │   │   │   ├── java/
    │   │   │   │   └── com/yashaswini/studentexpensetracker/
    │   │   │   │       ├── config/
    │   │   │   │       ├── controller/
    │   │   │   │       ├── dto/
    │   │   │   │       ├── exception/
    │   │   │   │       ├── filter/
    │   │   │   │       ├── model/
    │   │   │   │       ├── repository/
    │   │   │   │       └── service/
    │   │   │   └── resources/
    │   │   └── test/
    │   │
    │   └── pom.xml
    │
    └── student-expense-tracker-frontend/
        │
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── services/
        │   └── styles/
        │
        └── package.json

---

# How to Run the Project

## Prerequisites

Install the following software:

- Java
- MySQL
- Node.js
- npm
- IntelliJ IDEA
- MySQL Workbench

---

## 1. Clone the Repository

Clone the project from GitHub:

    git clone https://github.com/YashaswiniHegde23/student-expense-tracker.git

Navigate into the project:

    cd student-expense-tracker

---

## 2. Database Setup

Open MySQL Workbench and create the database:

    CREATE DATABASE expense_tracker;

The backend uses the `expense_tracker` database to store application data.

---

## 3. Backend Configuration

Navigate to:

    student-expense-tracker/src/main/resources/

Create a file named:

    application-local.properties

Add your local MySQL and JWT configuration:

    spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
    spring.datasource.username=root
    spring.datasource.password=YOUR_MYSQL_PASSWORD

    jwt.secret=YOUR_JWT_SECRET
    jwt.expiration=86400000

Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password and `YOUR_JWT_SECRET` with a secure JWT secret.

### Important

The `application-local.properties` file contains sensitive information and is excluded from Git.

Do not commit your MySQL password, JWT secret, API keys, or other sensitive credentials to GitHub.

---

## 4. Run the Backend

Open the following folder in IntelliJ IDEA:

    student-expense-tracker

Run the main Spring Boot application:

    StudentExpenseTrackerApplication

The backend will run on:

    http://localhost:8080

---

## 5. Run the Frontend

Open another terminal.

Navigate to the frontend folder:

    cd student-expense-tracker-frontend

Install the required dependencies:

    npm install

Start the React application:

    npm start

The frontend will run on:

    http://localhost:3000

---

## 6. Use the Application

Open your browser and visit:

    http://localhost:3000

### First-Time Use

1. Create a new account using the Register page.
2. Log in using your registered credentials.
3. Access the Dashboard.
4. Add and manage expenses.
5. Create and manage budgets.
6. View and update your profile.
7. Log out when finished.

---

## Authentication Flow

The application uses JWT-based authentication.

    User
     │
     ▼
    React Login Page
     │
     ▼
    Spring Boot Authentication API
     │
     ▼
    JWT Token
     │
     ▼
    Authenticated Requests
     │
     ▼
    Protected Backend APIs

JWT tokens are used to authenticate requests to protected backend endpoints.

---

## Security

The project uses:

- Spring Security
- JWT Authentication
- Protected API Endpoints
- User-specific Data Access
- Local Configuration for Sensitive Credentials

Sensitive information such as:

- MySQL Password
- JWT Secret
- API Keys

should never be committed to GitHub.

The `application-local.properties` file is excluded from Git.

---

## Future Enhancements

- Online Deployment
- Cloud Database Integration
- Expense Analytics and Visual Charts
- Monthly and Yearly Spending Reports
- Email Notifications
- Mobile Application
- Advanced Spending Insights

---

## Author

**Yashaswini S. Hegde**

B.E. Computer Science and Engineering  
BMS College of Engineering, Bangalore

---

## Repository

[GitHub Repository](https://github.com/YashaswiniHegde23/student-expense-tracker)