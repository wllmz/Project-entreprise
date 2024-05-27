import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const register = async (username, email, password) => {
  return await axios.post(`${API_URL}/register`, { username, email, password });
};

export const login = async (login, password) => {
  return await axios.post(`${API_URL}/login`, { login, password });
};

export const logout = () => {
  // Implement logout functionality if needed, such as clearing localStorage
};
