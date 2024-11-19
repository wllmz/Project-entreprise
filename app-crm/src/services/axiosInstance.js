import axios from "axios";
import { refreshAccessToken } from "./auth/authService";
import { logout } from "./auth/authService";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Remplace par l'URL de ton API
  withCredentials: true, // Permet d'envoyer les cookies avec chaque requête
});

// Intercepteur pour gérer les erreurs
API.interceptors.response.use(
  (response) => response, // Laisse passer les réponses réussies
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._retry
    ) {
      error.config._retry = true; // Marque cette requête comme déjà réessayée
      try {
        await refreshAccessToken(); // Appelle le service pour rafraîchir le token
        return API(error.config); // Relance la requête initiale après le rafraîchissement
      } catch (refreshError) {
        console.error("Échec du rafraîchissement du token :", refreshError);
        logout(); // Déconnecte l'utilisateur en cas d'échec
        throw refreshError;
      }
    }
    return Promise.reject(error); // Rejette toutes les autres erreurs
  }
);

export default API;
