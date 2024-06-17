import axios from 'axios';

const API_URL = 'http://localhost:5000/api/modules'; 

export const listAllModules = async (token) => {
  return await axios.get(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createModule = async (moduleData, token) => {
  return await axios.post(`${API_URL}/`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteModule = async (moduleId, token) => {
  return await axios.delete(`${API_URL}/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateModule = async (moduleId, moduleData, token) => {
  return await axios.put(`${API_URL}/${moduleId}`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const getModuleById = async (moduleId, token) => {
  return await axios.get(`${API_URL}/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
