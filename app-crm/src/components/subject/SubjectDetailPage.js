import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getSubjectById } from '../../services/subject/subjectService';
import { FaArrowLeft } from 'react-icons/fa';
import CommentSection from '../comment/CommentSection';

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const { authState, loadingAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && authState && authState.token && subjectId) {
      fetchSubjectDetail();
    }
  }, [subjectId, authState, loadingAuth]);

  const fetchSubjectDetail = async () => {
    try {
      const data = await getSubjectById(subjectId, authState.token);
      setSubject(data);
    } catch (error) {
      console.error('Failed to fetch subject details', error);
    }
  };

  const handleCommentAdded = () => {
    fetchSubjectDetail();
  };

  const handleCommentDeleted = () => {
    fetchSubjectDetail();
  };

  const handleCommentUpdated = () => {
    fetchSubjectDetail();
  };

  if (loadingAuth) {
    return <div>Loading...</div>; 
  }

  if (!authState) {
    navigate('/login');
    return null;
  }

  if (!subject) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-blue-500">
        <FaArrowLeft className="mr-2" /> Retour
      </button>
      <div className="border-b pb-4 mb-4">
        <h2 className="text-3xl font-bold mb-2">{subject.title}</h2>
        <p className="text-black-600 mb-2">Description : {subject.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <p className="mr-4">Auteur : {subject.author.username}</p>
          <p>Date de création : {new Date(subject.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <CommentSection
        subjectId={subject._id}
        comments={subject.comments}
        onCommentAdded={handleCommentAdded}
        onCommentDeleted={handleCommentDeleted}
        onCommentUpdated={handleCommentUpdated}
      />
    </div>
  );
};

export default SubjectDetailPage;
