const express = require("express");
const router = express.Router();
const userController = require("../../controllers/Admin/adminController");
const jwtMiddleware = require('../../middleware/jwtMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');

// Route pour récupérer tous les utilisateurs
router.get("/allusers", jwtMiddleware.verifyToken , authMiddleware.AdminRole, userController.allUsers);

// Route pour récupérer changer le rôles de l'utilisateur
router.post("/change-role/:id", jwtMiddleware.verifyToken , authMiddleware.AdminRole, userController.changeUserRole);

// Route pour supprimer un utilisateur
router.delete("/deleteuser/:id", jwtMiddleware.verifyToken, authMiddleware.AdminRole, userController.deleteUser);

module.exports = router;
