import axiosInstance from "../axiosInstance";

// Connexion
export const loginUser = async (login, password) => {
  const response = await axiosInstance.post("/auth/login", { login, password });
  return response.data; // Pas besoin de récupérer un token ici
};

// Inscription
export const register = async (username, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data; // Renvoie un message de succès ou d'erreur
};

// Déconnexion
export const logout = async () => {
  await axiosInstance.post("/auth/logout"); // Supprime les cookies côté serveur
};

export const verifyEmail = async (email) => {
  const response = await axiosInstance.get(
    `/auth/verify-email?email=${encodeURIComponent(email)}`
  );
  return response.data;
};

// Rafraîchir le token (si nécessaire)
export const refreshAccessToken = async (refreshToken) => {
  console.log(
    "Appel pour rafraîchir le accessToken avec le refreshToken : ",
    refreshToken
  );

  try {
    const response = await axiosInstance.post(
      "/auth/refresh-token",
      { refreshToken },
      { withCredentials: true }
    );
    console.log(
      "Réponse du backend pour le rafraîchissement du token : ",
      response.data
    );

    const { accessToken } = response.data;
    if (!accessToken) {
      throw new Error("Le backend ne renvoie pas d'accessToken.");
    }

    console.log("Nouveau accessToken obtenu : ", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    throw error; // Lancer l'erreur pour la gestion côté frontend
  }
};

// Service pour vérifier l'utilisateur via la route /me
export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me", {
      withCredentials: true, // IMPORTANT : Assurez-vous que cette option est activée
    });
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching authenticated user:",
      error.response?.data || error.message
    );
    throw error; // Lancer l'erreur pour la gestion côté frontend
  }
};
