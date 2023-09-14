import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema(
  {
    name: [{ type: String, required: true }],
    artist: [{ type: String }],
    type: { type: String },
    summary: { type: String },
    chapRead: { type: Number },
    comicStatus: { type: String },
    readingStatus: { type: String },
    rating: { type: Number },
    review: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
    tags: [String],
  },
  {
    timestamps: true,
  }
);

mangaSchema.pre("save", function (next) {
  const manga = this;
  const requiredFields = ["name", "artist"];
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!manga[field]) {
      missingFields.push(field);
      console.log("missing fields");
    }
  });

  if (missingFields.length > 0) {
    const error = new Error(
      `Missing required fields: ${missingFields.join(", ")}`
    );
    error.name = "ValidationError";
    return next(error);
  }

  if (manga.name.length === 0 || manga.artist.length === 0) {
    const error = new Error(
      "Missing required fields: Please make sure you've provided the name and artist."
    );
    error.name = "ValidationError";
    return next(error);
  }

  next();
});

export default mongoose.model("Manga", mangaSchema);
