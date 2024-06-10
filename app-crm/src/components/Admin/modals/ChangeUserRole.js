import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { changeUserRole } from '../../../services/adminService';

const ChangeUserRole = ({ user, onClose }) => {
  const { authState } = useContext(AuthContext);
  const [newRole, setNewRole] = useState(user.role);
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await changeUserRole(user._id, newRole, adminPassword, authState.token);
      setMessage(response.data.message);
      onClose();
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Changer le rôle de {user.username}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Changer le rôle
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ChangeUserRole;
