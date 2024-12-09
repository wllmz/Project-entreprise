import axiosInstance from "../axiosInstance"; // Utilisation de l'instance Axios partagée

export const getModules = async () => {
  const response = await axiosInstance.get("/modules");
  return response.data;
};

export const getModuleById = async (moduleId) => {
  const response = await axiosInstance.get(`/modules/${moduleId}`);
  return response.data;
};

export const createModule = async (moduleData) => {
  const response = await axiosInstance.post("/modules", moduleData);
  return response.data;
};

export const updateModule = async (moduleId, moduleData) => {
  const response = await axiosInstance.put(`/modules/${moduleId}`, moduleData);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await axiosInstance.delete(`/modules/${moduleId}`);
  return response.data;
};
