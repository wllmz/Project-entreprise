import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getSubjectById } from '../../services/subject/subjectService';
import { FaArrowLeft } from 'react-icons/fa';

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

  if (loadingAuth) {
    return <div>Loading...</div>; // Affiche un état de chargement pendant que l'authentification est en cours de vérification
  }

  if (!authState) {
    navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return null;
  }

  if (!subject) {
    return <div>Loading...</div>; // Affiche un état de chargement pendant que les détails du sujet sont récupérés
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-blue-500">
        <FaArrowLeft className="mr-2" /> Retour
      </button>
      <div className="border-b pb-4 mb-4">
        <h2 className="text-3xl font-bold mb-2">{subject.title}</h2>
        <p className="text-gray-600 mb-2">Description : {subject.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <p className="mr-4">Auteur : {subject.author.username}</p>
          <p>Date de création : {new Date(subject.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Commentaires :</h3>
        {subject.comments.length > 0 ? (
          <ul>
            {subject.comments.map((comment) => (
              <li key={comment._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <p className="mr-4">Auteur : {comment.author.username}</p>
                  <p>Date : {new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Aucun commentaire associé à ce sujet.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectDetailPage;
