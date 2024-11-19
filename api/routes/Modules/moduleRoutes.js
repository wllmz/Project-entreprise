import express from "express";
import {
  listAllModules,
  createModule,
  deleteModule,
  updateModule,
  getModuleById,
} from "../../controllers/Modules/moduleController.js";
import { verifyToken } from "../../middleware/jwtMiddleware.js";
import { AdminRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Lister tous les modules
router.get("/", listAllModules);

// Créer un nouveau module
router.post("/", verifyToken, AdminRole, createModule);

// Supprimer un module par ID
router.delete("/:moduleId", verifyToken, AdminRole, deleteModule);

// Mettre à jour un module par ID
router.put("/:moduleId", verifyToken, AdminRole, updateModule);

// Obtenir un module par ID
router.get("/:moduleId", verifyToken, getModuleById);

export default router;
