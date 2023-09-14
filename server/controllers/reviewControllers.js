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

export { createReview };
