import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { logout as authLogout } from '../services/auth/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthState({ token, user: decoded.user });
      } catch (error) {
        console.error('Error decoding auth token:', error);
        setAuthState(null);
        localStorage.removeItem('authToken');
        navigate('/login'); 
      }
    }
    setLoadingAuth(false); 
  }, [navigate]);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setAuthState({ token, user: decoded.user });
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem('authToken');
    authLogout();
    navigate('/login');
  };

  const isAuthenticated = () => {
    return authState && authState.user;
  };

  const isAdmin = () => {
    return isAuthenticated() && authState.user.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ authState, loadingAuth, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
