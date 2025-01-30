import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Adding the decoded user data to the request object
    next();  // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { protect };
