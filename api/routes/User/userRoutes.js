const express = require('express');
const router = express.Router();
const userUpdateController = require('../../controllers/User/userUpdateController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');


// Mettre à jour le mot de passe
router.put('/mdp-udpate',  jwtMiddleware.verifyToken, userUpdateController.changePassword);

// Mettre à jour le nom d'utilisateur
router.put('/username-update',  jwtMiddleware.verifyToken, userUpdateController.changeUsername);

// Mettre à jour l'email
router.put('/email-update', jwtMiddleware.verifyToken, userUpdateController.updateEmail);

module.exports = router;
