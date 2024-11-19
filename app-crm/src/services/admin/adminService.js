import API from "../axiosInstance"; // Import de l'instance Axios configurée

export const getAllUsers = async () => {
  const response = await API.get("/admin/allusers");
  return response.data;
};

export const changeUserRole = async (id, newRole, adminPassword) => {
  const response = await API.post(`/admin/change-role/${id}`, {
    newRole,
    adminPassword,
  });
  return response.data;
};

export const deleteUser = async (id, adminPassword) => {
  const response = await API.delete(`/admin/deleteuser/${id}`, {
    data: { adminPassword },
  });
  return response.data;
};
