import express from "express";
import { signup, login, getUserInfo } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/:id").get(getUserInfo);

export default router;
