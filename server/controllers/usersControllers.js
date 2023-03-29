import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const SECRET = process.env.SECRET;

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "Email not found" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "Invalid password" });
      }
    });
  } catch (error) {
    return res.status(401).json(error);
  }
}

function createJWT(user) {
  // return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
  const payload = {
    userId: user._id,
  };
  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
}

async function getUserInfo(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export { signup, login, getUserInfo };
