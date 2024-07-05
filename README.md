# Product Listing Application

This is a product listing application with user authentication, built using Node.js, Express, React, Redux, and TypeScript.

## Features

### Backend (Node.js, Express, TypeScript):

- User authentication (registration and login) using JWT
- Product management with an API to list products
- User can search product

### Frontend (React, Redux, TypeScript):

- User registration and login forms.
- Product listing with search functionality.

### Docker:

- Dockerized setup for both frontend and backend.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or higher)
- Docker (if running with Docker)

## Setup Instructions

Local Development:

- Clone the repository:
- git clone repository_url

### Backend Setup

- cd backend
- npm install

### Frontend Setup

- cd frontend
- npm install

Create .env file and add necessary environment variables

### Run Backend

- npm start

### Run Frontend

- npm run dev

### Running with Docker

- docker-compose build
- docker-compose up for run

### Accessing the Application:

- Frontend http://localhost:3000
- Backend http://localhost:5000

## API Documentation

- Swagger API documentation for backend APIs can be accessed at http://localhost:5000/api-docs after starting the backend server.
