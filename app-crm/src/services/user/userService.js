import axios from 'axios';

const API_URL = 'http://localhost:5000/user';

const getUserById = async (id, token) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const updatePassword = async (id, oldPassword, newPassword, confirmPassword, token) => {
  return await axios.put(
    `${API_URL}/mdp-update/${id}`,
    { oldPassword, newPassword, confirmPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

const updateUsername = async (id, password, newUsername, token) => {
  return await axios.put(
    `${API_URL}/username-update/${id}`,
    { password, newUsername },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

const updateEmail = async (id, password, newEmail, token) => {
  return await axios.put(
    `${API_URL}/email-update/${id}`,
    { password, newEmail },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export { getUserById, updatePassword, updateUsername, updateEmail };
