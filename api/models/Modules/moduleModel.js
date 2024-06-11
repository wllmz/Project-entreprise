const mongoose = require("mongoose");

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
module.exports = mongoose.model("Modules", moduleSchema);
