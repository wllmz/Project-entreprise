import axios from 'axios';

const API_URL = 'http://localhost:5000/admin';

export const getAllUsers = async (token) => {
  return await axios.get(`${API_URL}/allusers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const changeUserRole = async (id, newRole, adminPassword, token) => {
  return await axios.post(
    `${API_URL}/change-role/${id}`,
    { newRole, adminPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const deleteUser = async (id, adminPassword, token) => {
  return await axios.delete(`${API_URL}/deleteuser/${id}`, {
    data: { adminPassword },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
