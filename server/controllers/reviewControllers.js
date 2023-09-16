import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Review from "../models/review.js";
import Manga from "../models/manga.js";

dotenv.config();

async function createReview(req, res, next) {
  try {
    const manga = await Manga.findById(req.params.id);

    if (!manga) {
      return res.status(404).json({ error: true, message: "Manga not found" });
    }

    const newReview = new Review(req.body);

    await newReview.save();

    manga.review.push(newReview._id);

    await manga.save();

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

async function getAllReviews(req, res, next) {
  try {
    const { page, limit } = req.query;
    const mangaId = req.params.id;

    const pipeline = [
      { $match: { _id: mongoose.Types.ObjectId(mangaId) } },
      {
        $lookup: {
          from: "reviews",
          localField: "review",
          foreignField: "_id",
          as: "reviewsData",
        },
      },
      { $unwind: "$reviewsData" },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      { $replaceRoot: { newRoot: "$reviewsData" } },
    ];

    const [mangaReviews, totalCount] = await Promise.all([
      Manga.aggregate(pipeline),
      Manga.findById(mangaId).select("review"),
    ]);

    if (!mangaReviews) {
      return res
        .status(400)
        .json({ error: true, message: "Manga reviews not found" });
    }

    const totalPages = Math.ceil(totalCount.review.length / parseInt(limit));
    res.json({ reviews: mangaReviews, totalPages });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const reviewId = req.params.reviewId;
    const mangaId = req.params.id;

    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    manga.review.pull(reviewId);

    await manga.save();

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createReview, getAllReviews, deleteReview };
