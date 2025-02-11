# Quiz App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Deployment Considerations](#deployment-considerations)
- [Contributing](#contributing)
- [License](#license)

## Introduction
`quizApp` is a **MERN stack** quiz application where users can create quizzes, get a unique quiz code, and allow multiple participants to play simultaneously using WebSockets. The application supports both **practice quizzes** and **live quizzes** with real-time updates.

## Features
✅ **User Authentication** – Register, login, and logout functionality.  
✅ **Create and Manage Quizzes** – Users can create quizzes and share a unique quiz code.  
✅ **Real-Time Multiplayer** – Multiple participants can join and play the quiz simultaneously via WebSockets.  
✅ **Category-Based Organization** – Quizzes are stored under predefined categories with images.  
✅ **Performance Summary** – A pop-up shows results after the quiz.  
✅ **Practice Quizzes** – Users can attempt quizzes in predefined categories.  
✅ **Responsive Design** – Works on both mobile and desktop devices.  
✅ **Redux for State Management** – Ensures smooth data handling.  
✅ **MongoDB Storage** – Quizzes are dynamically managed in the database.  

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB

### Backend Installation
1. **Navigate to the `backend` directory**
   ```sh
   cd backend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the `backend` directory and add:
   ```sh
   FRONTEND_URL = http://localhost:5173
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. **Start the backend server**
   ```sh
   npm run dev
   ```

### Frontend Installation
1. **Navigate to the `frontend` directory**
   ```sh
   cd frontend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
    Create a `.env` file in the `frontend` directory and add:
    ```sh
    VITE_API_URL=http://localhost:5000
    ```
4. **Start the frontend development server**
   ```sh
   npm run dev
   ```

## Usage
1. Open your browser and navigate to `http://localhost:5173` to access the frontend.
2. Register a new user or log in with an existing account.
3. Create a new quiz or join an existing quiz using a unique code.
4. Participate in quizzes and view real-time leaderboard updates.

## Deployment Considerations
Vercel does **not** support WebSockets due to its **serverless architecture**. To enable real-time multiplayer, deploy the backend on **Railway, Render, or a VPS (AWS, DigitalOcean, etc.)**.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License  
© 2025 Abhishek Kumar