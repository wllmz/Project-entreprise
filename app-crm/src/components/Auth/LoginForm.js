import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth/authService"; // Connexion

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginValue, password); // Connexion via le service
      navigate("/"); // Navigue vers la page d'accueil
      window.location.reload(); // Rafraîchissement de la page pour vérifier l'authentification
    } catch (error) {
      setError(error.response?.data?.message || "Échec de la connexion.");
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 shadow-md"
    >
      <h2 className="text-2xl mb-4">Connexion</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Email ou Nom d'utilisateur</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Mot de passe</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;
