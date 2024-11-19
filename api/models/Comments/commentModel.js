import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
    required: true,
  },
});

export default mongoose.model("Comments", commentSchema);
