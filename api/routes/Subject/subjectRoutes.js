import express from "express";
import {
  listAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
  getSubjectById,
} from "../../controllers/Subjects/subjectController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Lister tous les sujets
router.get("/", verifyToken, AdminRole, listAllSubjects);

// Créer un nouveau sujet pour un module spécifique
router.post("/:moduleId", verifyToken, createSubject);

// Supprimer un sujet par ID
router.delete("/:subjectId", verifyToken, deleteSubject);

// Mettre à jour un sujet par ID
router.put("/:subjectId", verifyToken, AdminRole, updateSubject);

// Obtenir un sujet par ID
router.get("/:subjectId", verifyToken, getSubjectById);

export default router;
