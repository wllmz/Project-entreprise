const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/Comments/commentController');
const jwtMiddleware = require('../../middleware/jwtMiddleware');

// Créer un nouveau commentaire pour un sujet spécifique
router.post('/:subjectId', jwtMiddleware.verifyToken, commentController.createComment);

// Supprimer un commentaire par ID
router.delete('/:commentId', jwtMiddleware.verifyToken, commentController.deleteComment);

// Mettre à jour un commentaire par ID
router.put('/:commentId', jwtMiddleware.verifyToken, commentController.updateComment);


module.exports = router;
