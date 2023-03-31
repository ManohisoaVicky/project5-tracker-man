import Manga from "../models/manga.js";
import User from "../models/user.js";

async function getUserMangas(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate("mangas");
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found." });
    }
    res.json(user.mangas);
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid id." });
    }
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
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
}

export { getUserMangas, trackManga };
