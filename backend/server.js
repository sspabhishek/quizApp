import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import Quiz from "./models/quizModel.js";
import User from "./models/userModel.js";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB connection
connectDB();

// Routes
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

let leaderboard = {}; // Define leaderboard globally

io.on("connection", (socket) => {
  console.log("New client connected");

  // Store the socket ID when a user connects
  socket.on("storeSocketId", async (userId) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        user.socketId = socket.id;
        await user.save();
        console.log(`Stored socket ID ${socket.id} for user ${userId}`);
      }
    } catch (error) {
      console.error("Error storing socket ID:", error);
    }
  });

  socket.on("joinQuiz", async ({ code, username }) => {
    console.log(`User ${username} is joining quiz with code ${code}`);
    socket.join(code);
    const quiz = await Quiz.findOne({ code }).populate("creator");
    if (quiz) {
      const creatorSocketId = quiz.creator.socketId;
      console.log(`Emitting newParticipant to creator with socket ID ${creatorSocketId}`);
      io.to(creatorSocketId).emit("newParticipant", { username });

      // Add participant to leaderboard if not already present
      if (!leaderboard[code]) leaderboard[code] = [];
      const participant = leaderboard[code].find(p => p.username === username);
      if (!participant) {
        leaderboard[code].push({ username, score: 0 });
      }

      // Emit updated leaderboard to all clients in the room
      io.to(code).emit("leaderboardUpdate", leaderboard[code]);
    }
  });

  socket.on("startQuiz", async (code) => {
    console.log(`Quiz with code ${code} is starting`);
    const quiz = await Quiz.findOne({ code });
    if (quiz) {
      console.log("Question is ", quiz);
      io.to(code).emit("quizStarted", quiz);
      io.to(code).emit("leaderboardUpdate", leaderboard[code]);
    }
  });

  socket.on("submitAnswer", ({ code, username, isCorrect }) => {
    const scoreIncrement = isCorrect ? 10 : 0; // Example scoring logic
    if (!leaderboard[code]) leaderboard[code] = [];
    
    const participant = leaderboard[code].find(p => p.username === username);
    
    if (participant) {
      participant.score += scoreIncrement;
    } else {
      leaderboard[code].push({ username, score: scoreIncrement });
    }
    
    io.to(code).emit("leaderboardUpdate", leaderboard[code]);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Server listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));