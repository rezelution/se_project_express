# What To Wear – Back-End API

## Overview

**What To Wear** is a weather-driven outfit recommendation app. This project is the back-end server built with **Node.js**, **Express**, and **MongoDB**. It supports features like user authentication, secure session management, profile editing, clothing item CRUD operations, and personalized outfit recommendations based on weather.

---

## Technologies Used

| Technology   | Purpose                                                |
| ------------ | ------------------------------------------------------ |
| Node.js      | JavaScript runtime for server-side code                |
| Express.js   | Web framework to build RESTful APIs                    |
| MongoDB      | NoSQL database for storing users and clothes           |
| Mongoose     | ODM to model and validate MongoDB schemas              |
| Helmet       | Middleware to set secure HTTP headers                  |
| Validator    | Validate email, avatar, and image URLs                 |
| bcryptjs     | Hash and compare passwords securely                    |
| jsonwebtoken | Generate and verify JWTs for user sessions             |
| dotenv       | Manage environment variables (optional setup ready)    |
| CORS         | Enable cross-origin requests between front-end and API |

---

## Functionality

### 🔐 Authentication & Authorization

- Secure user sign-up and sign-in with email/password.
- Passwords are hashed before being stored.
- JWT-based authentication (expires in 7 days).
- All routes (except `/signin`, `/signup`, and `GET /items`) are protected by middleware.
- Unauthorized or invalid tokens result in a `401 Unauthorized` error.

### 👤 User Management

- Create new users with validated email and password.
- Password is excluded from all API responses.
- Modify user profile with `PATCH /users/me` (name and avatar).
- Get the current user's profile with `GET /users/me`.

### 🧥 Clothing Items

- Create a clothing item with name, weather type (hot, warm, cold), and image URL.
- Delete clothing items (only if the user is the owner).
- Like or dislike clothing items.
- Retrieve all items with `GET /items`.

### 🌦️ Weather Integration (handled via front-end)

- Front-end fetches real-time weather and filters clothes accordingly by weather type.

---

## API Routes

### 🔐 Authentication

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | /signup  | Register a new user |
| POST   | /signin  | Login and get JWT   |

### 👤 Users

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| GET    | /users/me | Get current user profile |
| PATCH  | /users/me | Update name and avatar   |

### 🧥 Clothing Items

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | /items               | Get all clothing items         |
| POST   | /items               | Add a new clothing item        |
| DELETE | /items/:id           | Delete item by ID (owner only) |
| PUT    | /items/:itemId/likes | Like an item                   |
| DELETE | /items/:itemId/likes | Remove like from an item       |

---

## Security

- **Helmet**: Secures HTTP headers against common threats.
- **Validator**: Ensures email, avatar, and image URLs are properly formatted.
- **Hashed Passwords**: Securely stores user credentials with bcrypt.
- **JWT Tokens**: Provides secure and stateless authentication.

---

## Error Handling

Centralized error handler supports:

- `400` - Validation and missing field errors
- `401` - Unauthorized access (JWT errors)
- `403` - Forbidden actions (e.g. deleting others' items)
- `404` - Resource not found
- `409` - Duplicate email on registration
- `500` - Server/internal errors

---

## Notable Code Features

### 🧩 Authentication Middleware (`auth.js`)

- Extracts and verifies JWT from `Authorization` header.
- Injects the decoded user ID into `req.user`.

### 🧾 User Model Enhancements

- Added `email` (unique and validated) and `password` (hashed, hidden in responses).
- Custom `findUserByCredentials` method for login with password comparison.

### 👕 Ownership Checks in Deletion

- Items can only be deleted by their owner (`403 Forbidden` if not).

### 🧪 Validation on Updates

- `PATCH /users/me` uses Mongoose validators to ensure data quality.

---

## Running the Project

```bash
npm install      # install dependencies
npm run start    # start server
npm run dev      # start server with hot reload
```
