import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    req.user.socketId = req.headers["x-socket-id"]; // Attach socket ID from headers
    await req.user.save();
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { protect };