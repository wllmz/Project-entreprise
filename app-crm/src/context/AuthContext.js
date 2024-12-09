import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../services/auth/authService"; // Importer le service pour /me

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticatedUser = await getAuthenticatedUser();
        setUser(authenticatedUser);
      } catch (error) {
        console.warn("Erreur d'authentification :", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const isAuthenticated = () => !!user;
  const hasRole = (role) => user?.roles?.includes(role);

  const logout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, hasRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
