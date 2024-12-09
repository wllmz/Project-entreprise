import axiosInstance from "../axiosInstance"; // Import de l'instance Axios configurée

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/allusers");
  return response.data;
};

export const changeUserRole = async (id, newRole, adminPassword) => {
  const response = await axiosInstance.post(`/admin/change-role/${id}`, {
    newRole,
    adminPassword,
  });
  return response.data;
};

export const deleteUser = async (id, adminPassword) => {
  const response = await axiosInstance.delete(`/admin/deleteuser/${id}`, {
    data: { adminPassword },
  });
  return response.data;
};
