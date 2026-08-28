# Cohort 9 MERN Notes App

A full-stack Notes application built as part of the 10Pearls Shine Cohort 9 internship assignment.

The application allows users to create, view, edit, delete, import, and export their notes. It also includes authentication, validation, error handling, logging, automated testing, and code quality checks.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Protected note routes
* Logout functionality
* User-specific notes
* Password visibility toggle

### Notes

* Create new notes
* View all notes
* Edit existing notes
* Delete notes
* Rich text note editing
* Notes are linked to the currently logged-in user

### Import & Export

* Export notes as a JSON file
* Import notes from a JSON file
* Imported notes are checked before being added
* Users can only access their own notes

### Validation & Error Handling

* Frontend form validation
* Backend request validation
* Authentication and authorization checks
* Proper error responses
* Error messages displayed to the user

### Logging

* Pino Logger is used for backend logging
* Errors from repository operations are logged
* Helps with debugging and tracking backend problems

### Testing

* Backend API tests using Mocha and Chai
* Frontend tests using Vitest
* Tests cover authentication, notes, services, components, and protected routes

### Code Quality

* SonarQube integration
* Code quality checks
* CodeRabbit used for code review and suggestions

## Tech Stack

### Frontend

* React.js
* JavaScript
* React Router
* CSS
* Vite
* Vitest

### Backend

* Node.js
* Fastify
* MySQL
* JWT
* Pino Logger
* Swagger

### Testing & Quality

* Mocha
* Chai
* Vitest
* SonarQube
* CodeRabbit

### Version Control

* Git
* GitHub
* Feature branch workflow
* Pull Requests

## Project Structure

```text
cohort-9-mern-9113-khizer/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── tests/
│   │
│   └── public/
│
└── sonarcube/
```

## Backend Architecture

The backend follows a layered structure:

**Routes → Controllers → Services → Repositories → Database**

### Routes

Routes define the API endpoints and connect incoming requests to the correct controller.

### Controllers

Controllers handle the HTTP request and response. They receive data from the request, call the appropriate service, and return the response to the frontend.

### Services

Services contain the main application logic. For example, they handle creating, updating, deleting, importing, and retrieving notes.

### Repositories

Repositories communicate directly with the MySQL database. SQL queries are kept here so database-related code stays separate from the application logic.

This separation makes the code easier to understand, test, and maintain.

## Authentication Flow

1. User enters their email and password.
2. Frontend sends the login request to the backend.
3. Backend verifies the user's credentials.
4. Backend generates a JWT token.
5. Frontend stores the token and user information.
6. The token is sent with protected API requests.
7. Backend verifies the token before allowing access to protected resources.
8. On logout, the stored authentication information is removed.

## Notes Flow

For example, when creating a note:

```text
User
 ↓
React Note Form
 ↓
Frontend Note Service
 ↓
API Request
 ↓
Fastify Route
 ↓
Note Controller
 ↓
Note Service
 ↓
Note Repository
 ↓
MySQL Database
```

The response then travels back through the same layers to the frontend.

## Import Flow

When a user imports notes:

1. User selects a JSON file.
2. Frontend reads the file.
3. JSON data is parsed.
4. The imported data is validated.
5. Valid notes are sent to the backend.
6. Backend verifies the authenticated user.
7. The service processes the imported notes.
8. Repository inserts the notes into MySQL.
9. The newly imported notes are returned to the frontend.

## Export Flow

1. User clicks the export button.
2. Frontend gets the user's notes.
3. Notes are converted into JSON.
4. A JSON file is created.
5. Browser downloads the file to the user's computer.

## Testing

The project contains both frontend and backend tests.

Backend tests cover areas such as:

* Authentication routes
* JWT functionality
* Note routes

Frontend tests cover:

* Authentication context
* Login/signup related functionality
* Note components
* Note editor
* Protected routes
* API services
* Note services

## Running the Project

### Backend

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the required environment variables and database configuration, then start the backend using the project's configured start command.

### Frontend

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Database

The application uses MySQL to store:

* User accounts
* Notes
* Note ownership information

Each note is associated with a user so that users can only access and modify their own notes.

## API Documentation

The backend uses Swagger for API documentation.

The API includes endpoints for:

* User registration
* User login
* Getting notes
* Creating notes
* Updating notes
* Deleting notes
* Importing notes

## Security

The application includes:

* JWT authentication
* Protected routes
* User-specific note access
* Backend authorization checks
* Input validation
* Environment variables for sensitive configuration
* Error handling

## Git Workflow

The project was developed using feature branches.

The general workflow was:

```text
develop
   ↓
feature branch
   ↓
development
   ↓
Pull Request
   ↓
Code Review
   ↓
Merge into develop
```

CodeRabbit was also used during the pull request review process to identify possible improvements and issues.

## Author

**Khizer Ahmad**

BS Software Engineering
University of Lahore
