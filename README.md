# quizApp

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction
`quizApp` is a full-stack web application that allows users to create, join, and participate in quizzes. The application supports both practice quizzes and live quizzes with real-time updates using Socket.io.

## Features
- User authentication (register, login, logout)
- Create and manage quizzes
- Join quizzes using a unique code
- Real-time quiz participation and leaderboard updates
- Practice quizzes with predefined categories
- Responsive design for mobile and desktop

## Installation
### Backend
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend
1. Navigate to the  directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage
1. Open your browser and navigate to `http://localhost:5173` to access the frontend.
2. Register a new user or login with an existing account.
3. Create a new quiz or join an existing quiz using a unique code.
4. Participate in quizzes and view real-time leaderboard updates.

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
