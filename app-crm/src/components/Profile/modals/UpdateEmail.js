import React, { useState } from "react";
import { updateEmail } from "../../../services/user/userService";

const UpdateEmail = ({ closeModal }) => {
  const [password, setPassword] = useState(""); // Mot de passe de l'utilisateur
  const [newEmail, setNewEmail] = useState(""); // Nouveau nom d'utilisateur
  const [message, setMessage] = useState(""); // Message d'erreur ou de succès

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoie d'abord le mot de passe, puis le nouveau nom d'utilisateur
      await updateEmail(password, newEmail);
      setMessage("Email mis à jour avec succès.");
      closeModal();
      window.location.reload(); // Rafraîchissement de la page pour refléter les changements
    } catch (error) {
      setMessage(error.response?.data?.msg || "Erreur serveur.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 shadow-md"
    >
      <h2 className="text-2xl mb-4">Mettre à jour le nom d'utilisateur</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Nouveau nom d'utilisateur</label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {/* Champ pour le mot de passe */}
      <div className="mb-4">
        <label className="block text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Mettre à jour
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default UpdateEmail;
