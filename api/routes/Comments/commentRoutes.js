import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../controllers/Comments/commentController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

// Créer un nouveau commentaire pour un sujet spécifique
router.post("/:subjectId", verifyToken, createComment);

// Supprimer un commentaire par ID
router.delete("/:commentId", verifyToken, deleteComment);

// Mettre à jour un commentaire par ID
router.put("/:commentId", verifyToken, updateComment);

export default router;
