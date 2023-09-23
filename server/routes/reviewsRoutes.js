import express from "express";
import {
  createReview,
  getAllReviews,
  deleteReview,
} from "../controllers/reviewControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router
  .route("/:id")
  .post(checkAuth, createReview)
  .get(checkAuth, getAllReviews);

router.route("/:id/:reviewId").delete(checkAuth, checkPermission, deleteReview);

export default router;
