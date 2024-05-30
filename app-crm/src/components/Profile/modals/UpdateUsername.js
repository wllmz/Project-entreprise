import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { updateUsername } from '../../../services/userService';

const UpdateUsername = ({ closeModal }) => {
  const { authState } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authState || !authState.token) {
      setMessage('User is not authenticated');
      return;
    }

    try {
      const response = await updateUsername(
        authState.user.id,
        password,
        newUsername,
        authState.token
      );
      setMessage(response.data.msg);
      closeModal();
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.msg || 'Server error');
    }    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Mettre à jour le nom d'utilisateur</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nouveau nom d'utilisateur</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Mettre à jour
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default UpdateUsername;
