import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getModuleById } from '../../services/module/moduleService';
import { FaArrowLeft, FaPlus, FaInfoCircle } from 'react-icons/fa';
import AddSubject from '../subject/modals/AddSubject';

const ModuleDetailPage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const { authState } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (moduleId && authState.token) {
      fetchModuleDetail();
    }
  }, [moduleId, authState.token]);

  const fetchModuleDetail = async () => {
    try {
      const data = await getModuleById(moduleId, authState.token);
      setModule(data);
    } catch (error) {
      console.error('Failed to fetch module details', error);
    }
  };

  const handleSubjectAdded = () => {
    fetchModuleDetail();
  };

  if (!module) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-blue-500">
        <FaArrowLeft className="mr-2" /> Retour
      </button>
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold mb-2">{module.module}</h2>
        <p className="text-gray-600">Date de création : {new Date(module.created_at).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Sujets associés</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Ajouter un Sujet
        </button>
      </div>
      {module.subjects.length > 0 ? (
        <ul className="space-y-4">
          {module.subjects.map((subject) => (
            <li key={subject._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">{subject.title}</h4>
                  <p className="text-gray-700">{subject.description}</p>
                  <p className="text-sm text-gray-500">Auteur : {subject.author.username}</p>
                  <p className="text-sm text-gray-500">Date de création : {new Date(subject.created_at).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => navigate(`/subjects/${subject._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaInfoCircle className="mr-2" /> Voir Détails
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Aucun sujet associé à ce module.</p>
      )}
      <AddSubject
        moduleId={moduleId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
        token={authState.token}
      />
    </div>
  );
};

export default ModuleDetailPage;
