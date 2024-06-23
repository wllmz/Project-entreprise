import axios from 'axios';

const API_URL = 'http://localhost:5000/modules';

export const getModules = async (token) => {
  console.log('Token used for fetching modules:', token);
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log('Response data from API:', response.data);
  return response.data;
};

export const getModuleById = async (moduleId, token) => {
  console.log('Token used for fetching module by ID:', token);
  const response = await axios.get(`${API_URL}/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createModule = async (moduleData, token) => {
  console.log('Token used for creating module:', token);
  const response = await axios.post(API_URL, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateModule = async (moduleId, moduleData, token) => {
  console.log('Token used for updating module:', token);
  const response = await axios.put(`${API_URL}/${moduleId}`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteModule = async (moduleId, token) => {
  console.log('Token used for deleting module:', token);
  const response = await axios.delete(`${API_URL}/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
