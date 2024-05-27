import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('authUser');
    
    if (token && user) {
      try {
        setAuthState({ token, user: JSON.parse(user) });
      } catch (error) {
        console.error('Error parsing authUser from localStorage:', error);
        setAuthState(null);
      }
    }
  }, []);

  const login = (token, user) => {
    setAuthState({ token, user });
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
  };

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
