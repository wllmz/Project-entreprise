import React, { useState } from "react";
import { changeUserRole } from "../../../services/admin/adminService";

const ChangeUserRole = ({ user, onClose }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await changeUserRole(user._id, {
        role: newRole,
        password: adminPassword,
      });
      setMessage("Rôle modifié avec succès.");
      onClose();
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur serveur.");
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
          required
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
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Changer le rôle
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ChangeUserRole;
