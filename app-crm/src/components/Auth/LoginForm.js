import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(loginValue, password);
      const { token, user } = response.data;
      login(token, user); // Mettre à jour le contexte
      navigate('/welcome'); // Rediriger l'utilisateur
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Login</h2>
      <div className="mb-4">
        <label className="block mb-1">Email or Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
    </form>
  );
};

export default LoginForm;
