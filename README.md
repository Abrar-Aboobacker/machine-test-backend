# Machine Test Backend

This is the backend server for the Machine Test project.

# Prerequisites

Before running the server, make sure you have the following installed:

Node.js (v14 or above)
MongoDB (v4 or above)

# Installation

1 .Clone the repository:
git clone [https://github.com/your-username/machine-test-backend.git]

2.Navigate to the project directory:

cd machine-test-backend

3.Install the dependencies:
npm install

# Configuration

Create a .env file in the root directory and provide the following environment variables:

PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
SMTP_HOST=your-smtp-host
SMTP_PORT=your-smtp-port
SMTP_USERNAME=your-smtp-username
SMTP_PASSWORD=your-smtp-password

# Usage

To start the server, run the following command:npm start

The server will start running at `http://localhost:3000`.

For development purposes, you can use the following command to start the server with automatic restart on file changes: npm run devStart

# Testing

To run the tests, use the following command:npm test
