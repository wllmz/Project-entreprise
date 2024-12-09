import React, { useState } from "react";
import { changePassword } from "../../../services/user/userService"; // Assurez-vous que cette fonction est correctement implémentée

const UpdatePassword = ({ closeModal }) => {
  const [oldPassword, setOldPassword] = useState(""); // Ancien mot de passe de l'utilisateur
  const [newPassword, setNewPassword] = useState(""); // Nouveau mot de passe
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmer le nouveau mot de passe
  const [message, setMessage] = useState(""); // Message d'erreur ou de succès

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      // Appeler la fonction pour changer le mot de passe
      await changePassword(oldPassword, newPassword, confirmPassword); // Envoie de l'ancien et du nouveau mot de passe
      setMessage("Mot de passe mis à jour avec succès.");
      setOldPassword(""); // Réinitialiser le mot de passe ancien
      setNewPassword(""); // Réinitialiser le nouveau mot de passe
      setConfirmPassword(""); // Réinitialiser la confirmation
      closeModal(); // Fermer le modal
      window.location.reload(); // Rafraîchir la page pour refléter les changements
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Erreur serveur.";
      setMessage(errorMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 shadow-md"
    >
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
        <label className="block text-gray-700">
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePassword;
