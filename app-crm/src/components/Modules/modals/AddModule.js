import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { createModule } from '../../../services/module/moduleService';

const AddModule = ({ onClose }) => {
  const [moduleName, setModuleName] = useState('');
  const { authState } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createModule({ module: moduleName }, authState.token);
      setModuleName('');
      onClose();
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error('Failed to create module', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Ajouter Module</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du Module"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddModule;
