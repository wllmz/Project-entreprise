import React, { useState } from "react";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/comment/commentService";
import DeleteCommentModal from "./modals/DeleteCommentModal";
import UpdateCommentModal from "./modals/UpdateCommentModal";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const CommentSection = ({
  subjectId,
  comments,
  onCommentAdded,
  onCommentDeleted,
  onCommentUpdated,
  userId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const commentData = { content: newComment };
      await createComment(subjectId, commentData);
      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(selectedComment._id);
      setIsDeleteModalOpen(false);
      onCommentDeleted();
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleUpdateComment = async (updatedContent) => {
    if (updatedContent.trim() === "") return;
    try {
      const commentData = { content: updatedContent };
      await updateComment(selectedComment._id, commentData);
      setIsUpdateModalOpen(false);
      onCommentUpdated();
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Commentaires</h3>
      {comments.length > 0 ? (
        <ul className="space-y-4 mb-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-start"
            >
              <div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <p className="mr-4">Auteur : {comment.author.username}</p>
                  <p>
                    Date : {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {userId === comment.author._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedComment(comment);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedComment(comment);
                      setIsUpdateModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-4">
          Aucun commentaire associé à ce sujet.
        </p>
      )}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Ajouter un commentaire..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un commentaire
        </button>
      </div>
      <DeleteCommentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteComment}
      />
      {selectedComment && (
        <UpdateCommentModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleUpdateComment}
          comment={selectedComment}
        />
      )}
    </div>
  );
};

export default CommentSection;
