import express from "express";
import {
  createReview,
  getAllReviews,
} from "../controllers/reviewControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router
  .route("/:id")
  .post(checkAuth, createReview)
  .get(checkAuth, getAllReviews);

// router
//   .route("/:id")
//   .get(checkAuth, checkPermission, getManga)
//   .patch(checkAuth, checkPermission, updateManga)
//   .delete(checkAuth, checkPermission, deleteManga);

export default router;
