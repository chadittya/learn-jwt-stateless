# User Management API

## User Feature

- Register a new user.
- Login a user to generate an authentication token.
- Fetch user profile (secured by authentication).

## Implementation

- Use JWT (JSON Web Tokens) for secure user authentication.
- Middleware should validate the user's token for protected routes.

## Data Models

- id: Auto-generated unique identifier.
- username: String (required, unique).
- password: String (required, hashed).

## API Endpoint

|      |           |                                 |
| ---- | --------- | ------------------------------- |
| POST | /register | Register a new user             |
| POST | /login    | Login and generate a JWT token  |
| GET  | /profile  | Get user profile(authenticated) |

## API Request & Response

1. Register User

- Request:

```json
POST /register
{
  "username": "john_doe",
  "password": "strongpassword123"
}
```

- Response:

```json
{
  "id": "user123",
  "username": "john_doe"
}
```

---

2. Login

- Request

```json
POST /login
{
  "username": "john_doe",
  "password": "strongpassword123"
}
```

- Response

```json
{
  "token": "your.jwt.token.here"
}
```
