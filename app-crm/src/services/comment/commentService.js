import API from "../axiosInstance";

export const createComment = async (subjectId, commentData) => {
  const response = await API.post(`/comments/${subjectId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await API.delete(`/comments/${commentId}`);
  return response.data;
};

export const updateComment = async (commentId, commentData) => {
  const response = await API.put(`/comments/${commentId}`, commentData);
  return response.data;
};
