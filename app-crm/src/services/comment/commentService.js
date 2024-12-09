import axiosInstance from "../axiosInstance";

export const createComment = async (subjectId, commentData) => {
  const response = await axiosInstance.post(
    `/comments/${subjectId}`,
    commentData
  );
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};

export const updateComment = async (commentId, commentData) => {
  const response = await axiosInstance.put(
    `/comments/${commentId}`,
    commentData
  );
  return response.data;
};
