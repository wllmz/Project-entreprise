import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { updatePassword } from '../../../services/userService';

const UpdatePassword = ({ closeModal }) => {
  const { authState } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await updatePassword(
        authState.user.id,
        oldPassword,
        newPassword,
        confirmPassword,
        authState.token
      );
      setMessage(response.data.msg);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      closeModal();
      window.location.reload();
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Server error';
      setMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Mettre à jour le mot de passe</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Ancien mot de passe</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nouveau mot de passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Confirmer le nouveau mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePassword;
