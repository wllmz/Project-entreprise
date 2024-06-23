import axios from 'axios';

const API_URL = 'http://localhost:5000/comments';

export const createComment = async (subjectId, commentData, token) => {
  const response = await axios.post(`${API_URL}/${subjectId}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteComment = async (commentId, token) => {
  const response = await axios.delete(`${API_URL}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateComment = async (commentId, commentData, token) => {
  const response = await axios.put(`${API_URL}/${commentId}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
