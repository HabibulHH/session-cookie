# Simple Session-Based Login System with Express

This project demonstrates a simple session-based login system using Node.js, Express, and `express-session`. User sessions are managed securely with cookies.

## Features

- Login with a username (no password for simplicity)
- Session management using `express-session`
- Protected route accessible only to logged-in users
- Logout functionality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. Clone or download this repository.
2. Install dependencies:

   ```sh
   npm install express express-session cookie-parser
   ```

### Running the App

```sh
node app.js
```

The server will start on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### `POST /login`

- **Body:** `{ "username": "yourname" }`
- **Description:** Logs in a user and creates a session.

### `GET /protected`

- **Description:** Returns a message if the user is logged in. Otherwise, returns `401 Unauthorized`.

### `POST /logout`

- **Description:** Logs out the user and destroys the session.

## Notes

- This is a simple demonstration. For production, use a strong secret and a persistent session store (like Redis).
- No password or user database is implemented for simplicity.

## Example Usage (with curl)

```sh
curl -X POST -d "username=testuser" -c cookie.txt http://localhost:3000/login
curl -b cookie.txt http://localhost:3000/protected
curl -X POST -b cookie.txt http://localhost:3000/logout
```

---