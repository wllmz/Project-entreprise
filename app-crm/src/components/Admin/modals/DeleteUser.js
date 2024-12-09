import React, { useState } from "react";
import { deleteUser } from "../../../services/admin/adminService";

const DeleteUser = ({ user, onClose }) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await deleteUser(user._id, { password: adminPassword });
      setMessage("Utilisateur supprimé avec succès.");
      onClose();
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur serveur.");
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
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Supprimer
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default DeleteUser;
