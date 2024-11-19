import express from "express";
import {
  changePassword,
  changeUsername,
  updateEmail,
  getUserById,
} from "../../controllers/User/userController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Mettre à jour le mot de passe
router.put("/mdp-update/:id", verifyToken, changePassword);

// Mettre à jour le nom d'utilisateur
router.put("/username-update/:id", verifyToken, changeUsername);

// Mettre à jour l'email
router.put("/email-update/:id", verifyToken, updateEmail);

// Récupérer les informations de profil
router.get("/:id", verifyToken, getUserById);

export default router;
