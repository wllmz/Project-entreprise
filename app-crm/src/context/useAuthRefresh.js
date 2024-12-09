import { useEffect } from "react";
import { refreshAccessToken } from "../services/auth/authService"; // Service pour rafraîchir le token

const useAuthRefresh = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Obtenir le accessToken depuis les cookies
      const accessToken = getCookie("accessToken");

      // Si l'accessToken est absent ou expiré dans moins de 5 minutes
      if (!accessToken || isTokenExpiringSoon(accessToken)) {
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          try {
            // Appeler le service pour rafraîchir le token
            const newAccessToken = await refreshAccessToken(refreshToken);

            // Mettre à jour le cookie avec le nouveau accessToken
            document.cookie = `accessToken=${newAccessToken}; path=/; max-age=900`; // 15 minutes
          } catch (error) {
            // Arrêter le rafraîchissement si une erreur se produit
            clearInterval(intervalId);
          }
        }
      }
    }, 2 * 60 * 1000); // Vérifier toutes les 1 minute

    // Nettoyage du timer lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Fonction pour obtenir un cookie par son nom
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Fonction pour vérifier si le token est sur le point d'expirer dans moins de 5 minutes
  const isTokenExpiringSoon = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000; // L'expiration est en secondes, donc on la convertit en millisecondes
      const timeLeft = expiry - Date.now();

      // Si le token expire dans moins de 5 minutes, on le considère comme "sur le point d'expirer"
      return timeLeft < 5 * 60 * 1000; // 5 minutes avant expiration
    } catch (error) {
      return true; // Si le token est mal formé, on suppose qu'il est expiré
    }
  };
};

export default useAuthRefresh;
