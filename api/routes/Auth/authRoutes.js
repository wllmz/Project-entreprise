const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Auth/userController');
const authMiddleware = require('../../middleware/jwtMiddleware');


// Inscription
router.post('/register', userController.register);

// Connexion
router.post('/login', userController.userLogin);

// Déconnexion
router.post('/logout', authMiddleware.verifyToken, userController.logout);


module.exports = router;
