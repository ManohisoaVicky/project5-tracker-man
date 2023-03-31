import express from "express";
import {
  getUserMangas,
  trackManga,
  updateManga,
} from "../controllers/mangaControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { checkUser } from "../middlewares/checkUser.js";

const router = express.Router();

router.post("/", checkAuth, trackManga);

router
  .route("/:id")
  .get(checkUser, getUserMangas)
  .patch(checkAuth, checkPermission, updateManga);

export default router;
