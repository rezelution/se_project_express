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
| dotenv       | Manage environment variables                           |
| CORS         | Enable cross-origin requests between front-end and API |

---

## Functionality

### 🔐 Authentication & Authorization

- Secure user registration and login via `/signup` and `/signin`
- Passwords hashed using bcrypt before being stored
- JWT-based authentication with 7-day expiry
- Tokens returned to client, stored in localStorage
- Middleware protects all private routes
- Unauthorized access returns `401 Unauthorized`

### 👤 User Management

- `POST /signup`: Create new users (email, password, name, avatar)
- `POST /signin`: Authenticate and return JWT
- `GET /users/me`: Get current logged-in user's profile
- `PATCH /users/me`: Edit user name and avatar

### 🧥 Clothing Items

- `GET /items`: Public endpoint to get all clothing items
- `POST /items`: Create a new clothing item (auth required)
- `DELETE /items/:id`: Delete clothing item (owner-only)
- `PUT /items/:itemId/likes`: Like an item
- `DELETE /items/:itemId/likes`: Remove like from an item

### 🌦️ Weather Integration

- Weather data is handled via the frontend and used to filter clothing recommendations

---

## New Feature Highlights

- Added JWT-based **registration, login, and session authorization**
- Integrated **like/dislike system** for clothing items
- Enabled **profile editing** (name and avatar updates)
- Secure routes with ownership checks and user-based content access
- Extended schema validation for all endpoints and models

---

## Security

- **Helmet** for HTTP header protection
- **Validator** to ensure safe and well-formed inputs
- **Hashed Passwords** using bcrypt
- **JWTs** for stateless and secure session handling

---

## Error Handling

Supports standardized error responses:

- `400` – Validation or bad input
- `401` – Unauthorized (JWT missing/invalid)
- `403` – Forbidden (ownership mismatch)
- `404` – Resource not found
- `409` – Duplicate registration
- `500` – Server errors

---

## Notable Code Features

### 🧩 Authentication Middleware

- Extracts and verifies JWT from request headers
- Injects decoded user into `req.user`

### 👤 User Model Enhancements

- Custom static method `findUserByCredentials` for login
- Email and password fields with schema validation

### 💾 Ownership Checks

- Deletion and update routes require item ownership
- Forbidden requests return `403`

---

## Running the Project

```bash
npm install      # Install dependencies
npm run start    # Start server
npm run dev      # Start server with hot reload
```
