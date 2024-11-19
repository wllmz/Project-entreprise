import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle Module
export default mongoose.model("Modules", moduleSchema);
