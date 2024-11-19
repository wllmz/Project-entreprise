import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../../controllers/Auth/userController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Inscription
router.post("/register", registerUser);

// Connexion
router.post("/login", loginUser);

// Déconnexion
router.post("/logout", verifyToken, logoutUser);

// Route pour rafraîchir le Access Token
router.post("/refresh-token", refreshToken);

export default router;
