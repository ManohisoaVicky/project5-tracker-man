import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export async function checkPermission(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    const mangaId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.mangas.includes(mangaId)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authenticated" });
  }
}
