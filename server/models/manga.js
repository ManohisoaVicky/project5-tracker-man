import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema(
  {
    name: [{ type: String, required: true }],
    artist: [{ type: String, required: true }],
    summary: { type: String },
    chapters: { type: Number },
    comicStatus: { type: String },
    readingStatus: { type: String },
    rating: { type: Number },
    review: { type: String },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Manga", mangaSchema);
