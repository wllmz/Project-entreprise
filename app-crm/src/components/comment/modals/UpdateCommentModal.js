import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';

const UpdateCommentModal = ({ isOpen, onClose, onUpdate, comment }) => {
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  useEffect(() => {
    if (comment) {
      setUpdatedContent(comment.content);
    }
  }, [comment]);

  const handleSubmit = () => {
    onUpdate(updatedContent);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4">Modifier Commentaire</h2>
      <textarea
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Modifier</button>
      </div>
    </ModalWrapper>
  );
};

export default UpdateCommentModal;
