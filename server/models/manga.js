import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: "User" },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    chapters: { type: Number },
    summary: { type: String },
    status: { type: String },
    rating: { type: Number },
    review: { type: String },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Manga", mangaSchema);
