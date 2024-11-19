import express from "express";
import {
  allUsers,
  changeUserRole,
  deleteUser,
} from "../../controllers/Admin/adminController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get("/allusers", verifyToken, AdminRole, allUsers);

// Route pour changer le rôle de l'utilisateur
router.post("/change-role/:id", verifyToken, AdminRole, changeUserRole);

// Route pour supprimer un utilisateur
router.delete("/deleteuser/:id", verifyToken, AdminRole, deleteUser);

export default router;
