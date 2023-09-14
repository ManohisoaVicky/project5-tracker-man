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

async function getUserMangas(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET);
    const userId = decodedToken.userId;
    const { page, limit } = req.query;

    const pipeline = [
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "mangas",
          localField: "mangas",
          foreignField: "_id",
          as: "mangasData",
        },
      },
      { $unwind: "$mangasData" },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      { $replaceRoot: { newRoot: "$mangasData" } },
    ];

    const [userMangas, totalCount] = await Promise.all([
      User.aggregate(pipeline),
      User.findById(userId).select("mangas"),
    ]);

    if (!userMangas) {
      return res
        .status(400)
        .json({ error: true, message: "User mangas not found." });
    }

    const totalPages = Math.ceil(totalCount.mangas.length / parseInt(limit));
    res.json({ mangas: userMangas, totalPages });
  } catch (error) {
    next(error);
  }
}

export { createReview, getAllReviews };
