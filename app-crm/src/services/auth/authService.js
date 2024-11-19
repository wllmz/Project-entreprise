import API from "../axiosInstance";

// Connexion
export const login = async (login, password) => {
  const response = await API.post("/auth/login", { login, password });
  return response.data; // Pas besoin de récupérer un token ici
};
// Inscription
export const register = async (username, email, password) => {
  const response = await API.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data; // Renvoie un message de succès ou d'erreur
};

// Déconnexion
export const logout = async () => {
  await API.post("/auth/logout"); // Supprime les cookies côté serveur
};

// Récupérer l'utilisateur actuel
export const getCurrentUser = async () => {
  const response = await API.get("/user/me"); // Utilise les cookies pour l'authentification
  return response.data.user;
};

// Rafraîchir le token (si nécessaire)
export const refreshAccessToken = async () => {
  const response = await API.post("/auth/refresh-token"); // Rafraîchit l'accessToken
  return response.data; // Pas besoin de gérer le token manuellement (géré via cookies)
};
