const express = require('express');
const router = express.Router();
const moduleController = require('../../controllers/Modules/moduleController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');

// Lister tous les modules
router.get('/', jwtMiddleware.verifyToken, moduleController.listAllModules);

// Créer un nouveau module
router.post('/', jwtMiddleware.verifyToken , authMiddleware.AdminRole, moduleController.createModule);

// Supprimer un module par ID
router.delete('/:moduleId', jwtMiddleware.verifyToken , authMiddleware.AdminRole, moduleController.deleteModule);

// Mettre à jour un module par ID
router.put('/:moduleId', jwtMiddleware.verifyToken , authMiddleware.AdminRole, moduleController.updateModule);

// Obtenir un module par ID
router.get('/:moduleId', jwtMiddleware.verifyToken, moduleController.getModuleById);

module.exports = router;
