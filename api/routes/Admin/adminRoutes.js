const express = require("express");
const router = express.Router();
const userController = require("../../controllers/Admin/adminController");
const authMiddleware = require('../../middleware/jwtMiddleware');
const role = require('../../middleware/authMiddleware');

// Route pour récupérer tous les utilisateurs
router.get("/allusers",authMiddleware.verifyToken, role.AdminRole , userController.allUsers);


module.exports = router;
