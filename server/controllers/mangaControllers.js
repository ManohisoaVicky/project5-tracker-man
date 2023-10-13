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
    const { page, limit, search, filter, sort } = req.query;

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
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "mangasData.name": { $regex: search, $options: "i" } },
            { "mangasData.artist": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    if (filter) {
      const filters = filter.split(",").map((filterItem) => {
        const [key, ...values] = filterItem.split(":");
        if (key === "rating") {
          // Handle numeric comparisons for the "rating" field
          if (values.length === 1) {
            return { [`mangasData.${key}`]: parseInt(values[0]) };
          } else if (values.length === 2 && values[0] === "gte") {
            return { [`mangasData.${key}`]: { $gte: parseInt(values[1]) } };
          } else if (values.length === 2 && values[0] === "lte") {
            return { [`mangasData.${key}`]: { $lte: parseInt(values[1]) } };
          }
        } else if (["type", "comicStatus", "readingStatus"].includes(key)) {
          return { [`mangasData.${key}`]: values.join(":").trim() };
        }
        return null;
      });

      // Filter out null values and push valid filters to the pipeline
      const validFilters = filters.filter((filter) => filter !== null);
      if (validFilters.length > 0) {
        pipeline.push({ $match: { $and: validFilters } });
      }
    }

    if (sort) {
      // Split the sort string into sortField and sortOrder
      const [sortField, sortOrder] = sort.split(":");

      // Define a sort order value based on sortOrder (default to 1 for ascending)
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;

      // Define a sort field mapping
      const sortFieldMapping = {
        name: "mangasData.name",
        artist: "mangasData.artist",
        rating: "mangasData.rating",
      };

      // Check if the sortField is a valid key
      if (sortField in sortFieldMapping) {
        const sortFieldKey = sortFieldMapping[sortField];
        pipeline.push({ $sort: { [sortFieldKey]: sortOrderValue } });
      }
    }

    const skip = (page - 1) * limit;
    const limitCount = parseInt(limit);

    // Calculate the total count of mangas matching the criteria before pagination
    const totalMangasCount = await User.aggregate(
      pipeline.concat({ $count: "total" })
    );

    pipeline.push(
      { $skip: skip },
      { $limit: limitCount },
      { $replaceRoot: { newRoot: "$mangasData" } }
    );

    // Extract the total count from the aggregation result
    const total = totalMangasCount.length > 0 ? totalMangasCount[0].total : 0;

    // Calculate totalPages based on the total count and limit
    const totalPages = Math.ceil(total / limitCount);

    const userMangas = await User.aggregate(pipeline);

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
