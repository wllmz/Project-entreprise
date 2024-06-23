import axios from 'axios';

const API_URL = 'http://localhost:5000/subjects';

export const listAllSubjects = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createSubject = async (moduleId, subjectData, token) => {
  const response = await axios.post(`${API_URL}/${moduleId}`, subjectData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteSubject = async (subjectId, token) => {
  const response = await axios.delete(`${API_URL}/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateSubject = async (subjectId, subjectData, token) => {
  const response = await axios.put(`${API_URL}/${subjectId}`, subjectData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getSubjectById = async (subjectId, token) => {
  const response = await axios.get(`${API_URL}/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
