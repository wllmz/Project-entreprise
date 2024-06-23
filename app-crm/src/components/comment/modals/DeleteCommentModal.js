import React from 'react';
import ModalWrapper from './ModalWrapper';

const DeleteCommentModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4">Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteCommentModal;
