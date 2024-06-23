import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getModules } from '../../services/module/moduleService';

const ModuleListUser = () => {
  const [modules, setModules] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.token) {
      getModules(authState.token)
        .then(setModules)
        .catch(error => console.error('Failed to fetch modules', error));
    }
  }, [authState.token]);

  const handleViewDetail = (moduleId) => {
    navigate(`/modules/${moduleId}`);
  };


  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl mb-4 underline">Liste des modules</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom du Module</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module._id} className="border-b">
                <td className="py-2 px-4">{module.module}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewDetail(module._id)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Voir Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleListUser;
