import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { deleteUser } from '../../../services/adminService';

const DeleteUser = ({ user, onClose }) => {
  const { authState } = useContext(AuthContext);
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await deleteUser(user._id, adminPassword, authState.token);
      setMessage(response.data.message);
      onClose();
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message || 'Server error');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Supprimer l'utilisateur {user.username}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded w-full">
          Supprimer
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default DeleteUser;
