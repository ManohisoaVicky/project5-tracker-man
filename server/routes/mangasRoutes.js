import express from "express";
import {
  getUserMangas,
  trackManga,
  updateManga,
  getManga,
  deleteManga,
} from "../controllers/mangaControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.route("/").get(checkAuth, getUserMangas).post(checkAuth, trackManga);

router
  .route("/:id")
  .get(checkAuth, checkPermission, getManga)
  .patch(checkAuth, checkPermission, updateManga)
  .delete(checkAuth, checkPermission, deleteManga);

export default router;
