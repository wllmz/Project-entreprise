import axiosInstance from "../axiosInstance";

export const listAllSubjects = async () => {
  const response = await axiosInstance.get("/subjects");
  return response.data;
};

export const createSubject = async (moduleId, subjectData) => {
  const response = await axiosInstance.post(
    `/subjects/${moduleId}`,
    subjectData
  );
  return response.data;
};

export const deleteSubject = async (subjectId) => {
  const response = await axiosInstance.delete(`/subjects/${subjectId}`);
  return response.data;
};

export const updateSubject = async (subjectId, subjectData) => {
  const response = await axiosInstance.put(
    `/subjects/${subjectId}`,
    subjectData
  );
  return response.data;
};

export const getSubjectById = async (subjectId) => {
  const response = await axiosInstance.get(`/subjects/${subjectId}`);
  return response.data;
};
