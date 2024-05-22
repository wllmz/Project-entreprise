const express = require('express');
const router = express.Router();
const userUpdateController = require('../../controllers/User/userUpdateController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');


// Mettre à jour le mot de passe
router.put('/mdp-udpate/:id',  jwtMiddleware.verifyToken, userUpdateController.changePassword);

// Mettre à jour le nom d'utilisateur
router.put('/username-update/:id',  jwtMiddleware.verifyToken, userUpdateController.changeUsername);

// Mettre à jour l'email
router.put('/email-update/:id', jwtMiddleware.verifyToken, userUpdateController.updateEmail);

module.exports = router;