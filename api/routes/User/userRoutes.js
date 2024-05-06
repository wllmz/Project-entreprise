const express = require('express');
const router = express.Router();
const authController = require('../../controllers/User/userUpdateController');
const authMiddleware = require('../../middleware/jwtMiddleware');


// Mettre à jour le mot de passe
router.put('/mdp-udpate',  authMiddleware.verifyToken, authController.changePassword);

// Mettre à jour le nom d'utilisateur
router.put('/username-update',  authMiddleware.verifyToken, authController.changeUsername);

// Mettre à jour l'email
router.put('/email-update', authMiddleware.verifyToken, authController.updateEmail);

module.exports = router;
