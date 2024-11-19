import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser as fetchCurrentUser,
  logout as apiLogout,
} from "../services/auth/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null); // Stocke l'état utilisateur
  const [loadingAuth, setLoadingAuth] = useState(true); // Charge initiale
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser(); // Appel à l'API pour récupérer l'utilisateur
        setAuthState({ user });
      } catch (error) {
        console.error("Non authentifié ou session expirée :", error);
        setAuthState(null);
      } finally {
        setLoadingAuth(false); // Fin de la charge initiale
      }
    };
    fetchUser();
  }, []);

  const login = async () => {
    try {
      const user = await fetchCurrentUser(); // Récupère les infos utilisateur après connexion
      setAuthState({ user });
      navigate("/"); // Redirige après connexion
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur après connexion :",
        error
      );
    }
  };

  const logout = async () => {
    try {
      await apiLogout(); // Déconnexion via l'API
      setAuthState(null);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const isAuthenticated = () => {
    return !!authState?.user;
  };

  const isAdmin = () => {
    return isAuthenticated() && authState.user.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loadingAuth,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
