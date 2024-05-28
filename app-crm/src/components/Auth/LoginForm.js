import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(loginValue, password);
      const { token, user } = response.data;
      login(token, user); // Mettre à jour le contexte
      setError('');
      navigate('/welcome'); 
    } catch (error) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.');
      console.error('Erreur lors de la connexion de l\'utilisateur', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Connexion</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Email ou Nom d'utilisateur</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Mot de passe</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Se connecter</button>
    </form>
  );
};

export default LoginForm;
