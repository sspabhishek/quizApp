import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { createServer } from "http"; // Use HTTP Server
import { Server } from "socket.io";
import Quiz from "./models/quizModel.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();
const server = createServer(app); // Use HTTP Server for socket.io

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));
app.use(cookieParser());

// MongoDB connection
connectDB();

// API routes
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/", (req, res) => {
  res.json({ message: `Server is running ${port}` });
});

let leaderboard = {};

// Setup Socket.io with Correct CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("storeSocketId", async (userId) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        user.socketId = socket.id;
        await user.save();
      }
    } catch (error) {
      console.error("Error storing socket ID:", error);
    }
  });

  socket.on("joinQuiz", async ({ code, username }) => {
    socket.join(code);
    const quiz = await Quiz.findOne({ code }).populate("creator");
    if (quiz) {
      const creatorSocketId = quiz.creator.socketId;
      io.to(creatorSocketId).emit("newParticipant", { username });

      if (!leaderboard[code]) leaderboard[code] = [];
      const participant = leaderboard[code].find((p) => p.username === username);
      if (!participant) {
        leaderboard[code].push({ username, score: 0 });
      }

      io.to(code).emit("leaderboardUpdate", leaderboard[code]);
    }
  });

  socket.on("startQuiz", async (code) => {
    leaderboard = {};
    const quiz = await Quiz.findOne({ code });
    if (quiz) {
      io.to(code).emit("quizStarted", quiz);
      io.to(code).emit("leaderboardUpdate", leaderboard[code]);
    }
  });

  socket.on("submitQuiz", ({ code, username, score }) => {
    if (!leaderboard[code]) leaderboard[code] = [];

    const participant = leaderboard[code].find((p) => p.username === username);

    if (participant) {
      participant.score = score;
    } else {
      leaderboard[code].push({ username, score });
    }

    io.to(code).emit("leaderboardUpdate", leaderboard[code]);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
