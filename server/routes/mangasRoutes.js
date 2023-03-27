import express from "express";
import { getUserMangas, trackManga } from "../controllers/mangaControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, trackManga);

router.route("/:id").get(getUserMangas);

export default router;
