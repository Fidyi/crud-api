# CRUD API with Node.js and In-Memory Database

This project implements a basic CRUD (Create, Read, Update, Delete) API for managing users, built using Node.js, TypeScript, and an in-memory database. It provides simple user management with support for RESTful operations and error handling.

## Features

- **GET /api/users**: Fetches all users.
- **GET /api/users/{userId}**: Fetches a specific user by their UUID.
- **POST /api/users**: Creates a new user.
- **PUT /api/users/{userId}**: Updates an existing user.
- **DELETE /api/users/{userId}**: Deletes a user by their UUID.

## User Object Structure

Each user is represented as an object with the following structure:

```json
{
  "id": "string (uuid)",
  "username": "string (required)",
  "age": "number (required)",
  "hobbies": ["array of strings (required)"]
}
