import API from "../axiosInstance";

export const getCurrentUser = async () => {
  const response = await API.get("/user/me"); // Utilise le cookie pour authentification
  return response.data; // Retourne les données utilisateur
};

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const response = await API.put("/user/password", {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};

export const changeUsername = async (password, newUsername) => {
  const response = await API.put("/user/username", {
    password,
    newUsername,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};

export const updateEmail = async (password, newEmail) => {
  const response = await API.put("/user/email", {
    password,
    newEmail,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};
