import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth/authService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      setSuccess('Inscription réussie ! Redirection vers la page de connexion...');
      setError('');
      setTimeout(() => {
        navigate('/login'); // Rediriger vers la page de connexion après 2 secondes
      }, 2000);
    } catch (error) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
      setSuccess('');
      console.error('Erreur lors de l\'inscription de l\'utilisateur', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Inscription</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="mb-4">
        <label className="block mb-1">Nom d'utilisateur</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
