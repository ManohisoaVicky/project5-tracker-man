import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const SECRET = process.env.SECRET;

export function checkAuth(req, res, next) {
  if (req.user) return next();
  // return res.status(401).json({ message: "Unauthorized action!" });
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const userId = payload.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  });
}
