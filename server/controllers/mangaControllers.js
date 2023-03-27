import Manga from "../models/manga.js";
import User from "../models/user.js";

async function getUserMangas(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate("mangas");
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid id." });
    }
  }
}

async function trackManga(req, res, next) {
  const manga = new Manga(req.body);
  try {
    await manga.save();
    res.json(manga);
  } catch (error) {
    res.status(400).json(error);
  }
}

export { getUserMangas, trackManga };
