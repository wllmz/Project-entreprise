import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const decoded = jwtDecode(token); // Décoder le token JWT pour obtenir les informations utilisateur
        setAuthState({ token, user: decoded.user });
      } catch (error) {
        console.error('Error decoding auth token:', error);
        setAuthState(null);
      }
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token); // Décoder le token JWT pour obtenir les informations utilisateur
    setAuthState({ token, user: decoded.user });
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
