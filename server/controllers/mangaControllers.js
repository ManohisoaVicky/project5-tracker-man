import Manga from "../models/manga.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

const SECRET = process.env.SECRET;

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

async function trackManga(req, res, next) {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { $push: { mangas: manga._id } });
    res.status(201).json(manga);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
}

async function updateManga(req, res, next) {
  try {
    const updatedManga = await Manga.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedManga);
  } catch (error) {
    next(error);
  }
}

async function getManga(req, res, next) {
  try {
    const manga = await Manga.findById(req.params.id);
    res.json(manga);
  } catch (error) {
    next(error);
  }
}

async function deleteManga(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET);
    const userId = decodedToken.userId;

    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).send("Manga not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const mangaIndex = user.mangas.indexOf(manga._id);

    if (mangaIndex >= 0) {
      user.mangas.splice(mangaIndex, 1);
    }

    await user.save();

    await manga.delete();

    res.send("Manga deleted successfully");
  } catch (error) {
    next(error);
  }
}

export { getUserMangas, trackManga, updateManga, getManga, deleteManga };
