import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// Exporter le modèle User
export default mongoose.model("User", userSchema);
