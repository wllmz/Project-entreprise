import axiosInstance from "../axiosInstance";

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const response = await axiosInstance.put("/user/password-update", {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};

export const changeUsername = async (password, newUsername) => {
  const response = await axiosInstance.put("/user/username-update", {
    password,
    newUsername,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};

export const updateEmail = async (password, newEmail) => {
  const response = await axiosInstance.put("/user/email-update", {
    password,
    newEmail,
  });
  return response.data; // Retourne un message de succès ou d'erreur
};
