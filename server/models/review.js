import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
