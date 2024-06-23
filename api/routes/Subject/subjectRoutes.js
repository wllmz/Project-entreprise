const express = require('express');
const router = express.Router();
const subjectController = require('../../controllers/Subjects/subjectController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');

// Lister tous les sujets
router.get('/', jwtMiddleware.verifyToken, authMiddleware.AdminRole, subjectController.listAllSubjects);

// Créer un nouveau sujet pour un module spécifique
router.post('/:moduleId', jwtMiddleware.verifyToken, subjectController.createSubject);

// Supprimer un sujet par ID
router.delete('/:subjectId', jwtMiddleware.verifyToken, subjectController.deleteSubject);

// Mettre à jour un sujet par ID
router.put('/:subjectId', jwtMiddleware.verifyToken, authMiddleware.AdminRole, subjectController.updateSubject);

// Obtenir un sujet par ID
router.get('/:subjectId', jwtMiddleware.verifyToken, subjectController.getSubjectById);

module.exports = router;
