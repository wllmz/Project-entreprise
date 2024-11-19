import API from "../axiosInstance"; // Utilisation de l'instance Axios partagée

export const getModules = async () => {
  const response = await API.get("/modules");
  return response.data;
};

export const getModuleById = async (moduleId) => {
  const response = await API.get(`/modules/${moduleId}`);
  return response.data;
};

export const createModule = async (moduleData) => {
  const response = await API.post("/modules", moduleData);
  return response.data;
};

export const updateModule = async (moduleId, moduleData) => {
  const response = await API.put(`/modules/${moduleId}`, moduleData);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await API.delete(`/modules/${moduleId}`);
  return response.data;
};
