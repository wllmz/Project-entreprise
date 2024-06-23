import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { createSubject } from '../../../services/subject/subjectService.js';

const AddSubject = ({ moduleId, isOpen, onClose, onSubjectAdded, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const subjectData = { title, description };
      await createSubject(moduleId, subjectData, token);
      onSubjectAdded(); 
      onClose();
    } catch (err) {
      setError('Erreur lors de la création du sujet');
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4">Ajouter un nouveau sujet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Annuler
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Ajouter
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubject;
