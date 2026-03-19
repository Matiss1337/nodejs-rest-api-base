# Stack Used

Base Node.js REST API reference project that can be reused as a simple starting point for future backend work.

It already covers the backend pieces you usually need early in a real API project: Express setup, routing, controllers, MongoDB with Mongoose, JWT auth, request validation, file upload handling, JSON request bodies, manual CORS headers, and JSON error responses.

This README is meant as a practical reference for what this project is actually using right now.

## Required Setup

To run this project, you need local Node.js, npm, a MongoDB connection string, and an `images/` folder for uploaded files.

Example `.env`:

```env
MONGODB_URI='your-mongodb-connection-string'
```

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

The API runs on:

`http://localhost:3000`

## Core Runtime

- `Node.js`
  JavaScript runtime on the server.

- `npm`
  Package manager for installing dependencies and running scripts.

- `nodemon`
  Restarts the server automatically during development.

- `dotenv`
  Loads environment variables from `.env` into `process.env`.

## Server / App Framework

- `Express`
  Main backend framework for routes, middleware, requests, and responses.

- `body-parser`
  Parses incoming JSON so `req.body` works for API POST requests.

- `express.static(...)`
  Serves uploaded images from the `images/` folder.

## App Structure / Patterns

- `Routing`
  Route definitions live in `routes/feed.js` and `routes/auth.js`.

- `Controllers`
  Request handling logic lives in `controllers/feed.js` and `controllers/auth.js`.

- `Middleware`
  `app.js` applies shared logic before requests reach routes, and `middleware/is-auth.js` protects private endpoints.

- `Models`
  Mongoose models live in `models/post.js` and `models/user.js`.

- `Error handling`
  App-level error middleware returns JSON with status, message, and optional validation data.

## CORS / API Basics

- `Access-Control-Allow-Origin`
  Currently set to `*`, so browser apps from other origins can call the API.

- `Access-Control-Allow-Methods`
  Allows `GET, POST, PUT, PATCH, DELETE`.

- `Access-Control-Allow-Headers`
  Allows headers like `Content-Type` and `Authorization`.

- `JSON body parsing`
  `app.use(bodyParser.json())` parses incoming JSON and exposes it on `req.body`.

- `REST responses`
  The API returns JSON with status codes like `200 OK`, `201 Created`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, and `422 Unprocessable Entity`.

- `Authorization header`
  Protected routes expect a bearer token in the `Authorization` header.

- `Centralized error responses`
  Thrown or forwarded errors are returned as JSON from the final Express error middleware.

## Database / Persistence

- `MongoDB`
  Main database used for users and posts.

- `Mongoose`
  ODM used for schemas, models, queries, references, and persistence.

- `Schemas and models`
  `User` and `Post` are defined with Mongoose schemas.

- `References`
  Posts store a `creator` reference to a `User`, and users store post ids in `posts`.

- `Timestamps`
  Posts use Mongoose timestamps for created and updated dates.

## Authentication / Security

- `jsonwebtoken`
  Used to create and verify JWT tokens.

- `JWT authentication`
  Login returns a signed token, and protected routes verify it before continuing.

- `bcryptjs`
  Hashes passwords before saving and compares hashed passwords during login.

- `Protected routes`
  Feed routes are protected with `is-auth` middleware.

- `Authorization checks`
  Post update and delete only allow the creator of the post to modify it.

## Validation

- `express-validator`
  Validates request input before controller logic runs.

- `Signup validation`
  Checks email format, password length, and non-empty name.

- `Async validation`
  Signup rejects duplicate email addresses by checking the database.

- `Normalization and trimming`
  Email is normalized, and input fields are trimmed before use.

- `422 validation errors`
  Invalid input returns structured validation errors in the response.

## File Upload / Static Files

- `multer`
  Handles multipart file uploads.

- `diskStorage`
  Uploaded images are saved into the local `images/` folder.

- `File filtering`
  Only `png`, `jpg`, and `jpeg` image mimetypes are accepted.

- `Single file upload`
  Post create and update flows expect a single uploaded file named `image`.

- `Image cleanup`
  Replaced or deleted posts remove the old image from disk with `fs.unlink(...)`.

- `Static image serving`
  Uploaded files are exposed through `/images`.

## Feed / Post Logic

- `Create post`
  Creates a post with `title`, `content`, uploaded image path, and authenticated creator id.

- `Get posts`
  Returns paginated posts with a fixed `perPage` size and `totalItems`.

- `Get single post`
  Fetches one post by route param id.

- `Update post`
  Validates input, optionally replaces the image, checks ownership, and saves changes.

- `Delete post`
  Checks ownership, deletes the image file, removes the post, and pulls the post id from the user document.

## Auth Logic

- `Signup`
  Validates input, hashes the password, creates the user, and returns a created response.

- `Login`
  Looks up the user, compares passwords, signs a JWT, and returns the token plus user id.

- `REST responses`
  Auth and feed controllers both respond with JSON instead of rendered views.

## Current Endpoints

- `GET /feed/posts`
  Returns paginated posts. Protected.

- `POST /feed/post`
  Creates a new post. Protected. Expects multipart form data with an `image` file.

- `GET /feed/post/:postId`
  Returns one post by id. Protected.

- `PUT /feed/post/:postId`
  Updates one post. Protected.

- `DELETE /feed/post/:postId`
  Deletes one post. Protected.

- `PUT /auth/signup`
  Creates a new user account.

- `POST /auth/login`
  Authenticates a user and returns a JWT token.

Example signup request body:

```json
{
    "email": "test@example.com",
    "name": "Matt",
    "password": "secret123"
}
```

Example login response:

```json
{
    "token": "jwt-token-here",
    "userId": "user-id-here"
}
```

Example create post fields:

```text
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: My first post
content: Some post content here
image: <uploaded file>
```

## Useful Backend Concepts Practiced

- request / response lifecycle
- `req`, `res`, `next`
- route mounting with `app.use(...)`
- separating routes from controllers
- central Express app setup
- JSON body parsing
- multipart form-data handling
- static file serving
- sending JSON responses with `res.json(...)`
- setting manual CORS headers
- environment variables with `.env`
- MongoDB connection setup
- Mongoose schemas and model relations
- JWT creation and verification
- protected routes with auth middleware
- password hashing with bcrypt
- request validation with express-validator
- async validation against the database
- route params
- query params for pagination
- ownership checks before update and delete
- centralized JSON error handling
- testing API routes with Postman
- basic REST CRUD structure
