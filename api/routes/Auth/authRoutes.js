import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  verifyEmail,
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

// Route pour vérifier l'email
router.get("/verify-email", verifyEmail);

router.get("/me", verifyToken, (req, res) => {
  console.log("Utilisateur autorisé :", req.user); // Pour debug
  res.status(200).json({ user: req.user }); // Retourner les infos utilisateur
});

export default router;
