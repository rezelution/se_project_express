# What To Wear – Back-End API

## Overview

What To Wear is a weather-driven outfit recommendation app. This project is the back-end server built with Node.js, Express, and MongoDB. It supports core functionality such as user profile creation, clothing item management, and weather-based clothing suggestions.

The server exposes RESTful API endpoints to interact with a MongoDB database, which stores user data and clothing items. It also integrates with a third-party weather API to provide personalized outfit recommendations based on real-time weather conditions.

## Technologies Used

| Technology | Purpose                                             |
| ---------- | --------------------------------------------------- |
| Node.js    | JavaScript runtime for server-side code             |
| Express.js | Web framework to build RESTful APIs                 |
| MongoDB    | NoSQL database for storing users and clothes        |
| Mongoose   | ODM to model and validate MongoDB schemas           |
| Helmet     | Middleware to set HTTP headers for security         |
| Validator  | To validate avatar and image URLs                   |
| dotenv     | Manage environment variables (optional setup ready) |

## Functionality

This server provides:

- User Management

  - Create a user with a name and avatar (validated URL).
  - Retrieve a list of all users or a specific user by ID.

- Clothing Items Management

  - Add a clothing item with name, weather type (hot, warm, cold), and image URL.
  - Delete items by ID.
  - Like or dislike an item.
  - Fetch all clothing items.

- Weather Integration (via front-end)
  - The front-end makes a call to a weather API based on the user’s location.
  - Based on the temperature, only clothing items matching the appropriate weather category are shown.

## Folder Structure
  - /controllers → Business logic and route handlers
  - /models → Mongoose schema definitions
  - /routes → Express route definitions
  - /utils → Error constants and error handler
  - app.js → App configuration and middleware setup


## API Routes

### Users

| Method | Endpoint        | Description               |
|--------|------------------|---------------------------|
| GET    | /users           | Get all users             |
| GET    | /users/:userId   | Get a user by ID          |
| POST   | /users           | Create a new user         |

### Clothing Items

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | /items                  | Get all clothing items             |
| POST   | /items                  | Create a new clothing item         |
| DELETE | /items/:id              | Delete an item by ID               |
| PUT    | /items/:itemId/likes    | Like an item                       |
| DELETE | /items/:itemId/likes    | Remove like from an item           |

## Security

- Helmet Middleware: Sets secure HTTP headers to help prevent common vulnerabilities, such as open redirects.
- URL Validation: All avatar and image URLs are validated using the `validator` package to ensure proper formatting and prevent malicious links.

## Error Handling

The app uses a centralized error-handling system (`utils/errors.js`) with predefined error codes and messages for:

- Validation errors
- Document not found errors
- General server errors

This modular approach makes the system scalable and easier to maintain as more error types are introduced.

## Notable Code Features

### app.js Highlights

- Connects to MongoDB using Mongoose.
- Applies middleware for JSON parsing and security (helmet).
- Injects a hardcoded `req.user._id` for testing (to simulate logged-in behavior).
- Sets up route modules for `/users` and `/items`.
- Adds a catch-all 404 route for unknown endpoints.

### Controllers

- Encapsulate logic for database operations and response formatting.
- Use `orFail()` to catch empty query results and handle them gracefully.
- All database errors are passed to a reusable `handleError` function.

### Schemas

- User Schema: Name and avatar with URL validation.
- Clothing Item Schema: Includes name, image URL, owner reference, weather category (hot, warm, cold), and support for likes (referencing user IDs).

## Future Improvements

- Implement user authentication using JWT for real user sessions.
- Add authorization to restrict actions to item owners only.
- Integrate caching (e.g., Redis) for weather API calls.
- Allow users to filter clothing items by tags (e.g., casual, formal).
- Support user-specific weather preference settings.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

