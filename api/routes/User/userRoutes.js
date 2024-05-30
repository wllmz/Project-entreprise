const express = require('express');
const router = express.Router();
const userUpdateController = require('../../controllers/User/userController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');


// Mettre à jour le mot de passe
router.put('/mdp-update/:id',  jwtMiddleware.verifyToken, userUpdateController.changePassword);

// Mettre à jour le nom d'utilisateur
router.put('/username-update/:id',  jwtMiddleware.verifyToken, userUpdateController.changeUsername);

// Mettre à jour l'email
router.put('/email-update/:id', jwtMiddleware.verifyToken, userUpdateController.updateEmail);

// information profil 
router.get('/:id', jwtMiddleware.verifyToken, userUpdateController.getUserById);

module.exports = router;
