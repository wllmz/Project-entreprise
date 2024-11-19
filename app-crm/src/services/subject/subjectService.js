import API from "../axiosInstance";

export const listAllSubjects = async () => {
  const response = await API.get("/subjects");
  return response.data;
};

export const createSubject = async (moduleId, subjectData) => {
  const response = await API.post(`/subjects/${moduleId}`, subjectData);
  return response.data;
};

export const deleteSubject = async (subjectId) => {
  const response = await API.delete(`/subjects/${subjectId}`);
  return response.data;
};

export const updateSubject = async (subjectId, subjectData) => {
  const response = await API.put(`/subjects/${subjectId}`, subjectData);
  return response.data;
};

export const getSubjectById = async (subjectId) => {
  const response = await API.get(`/subjects/${subjectId}`);
  return response.data;
};
