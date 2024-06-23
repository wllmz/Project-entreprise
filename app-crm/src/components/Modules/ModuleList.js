import React, { useState, useContext, useEffect } from 'react';
import AddModule from './modals/AddModule';
import UpdateModule from './modals/UpdateModule';
import DeleteModule from './modals/DeleteModule';
import ModalWrapper from './modals/ModalWrapper';
import { AuthContext } from '../../context/AuthContext';
import { getModules } from '../../services/module/moduleService';

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modalType, setModalType] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchModules();
  }, [authState]);

  const fetchModules = async () => {
    try {
      console.log('Fetching modules with token:', authState.token); // Log du jeton
      const data = await getModules(authState.token);
      setModules(data);
    } catch (error) {
      console.error('Failed to fetch modules', error);
    }
  };

  const handleOpenModal = (module, type) => {
    setSelectedModule(module);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
    setModalType('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-xl mb-4 bg-white">Liste des modules :</h3>
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
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <button
                      onClick={() => handleOpenModal(module, 'update')}
                      className="bg-blue-500 text-white p-2 rounded mb-2 sm:mb-0"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleOpenModal(module, 'delete')}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedModule && modalType === 'update' && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          <UpdateModule module={selectedModule} onClose={handleCloseModal} />
        </ModalWrapper>
      )}

      {selectedModule && modalType === 'delete' && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          <DeleteModule module={selectedModule} onClose={handleCloseModal} />
        </ModalWrapper>
      )}

      <button
        onClick={() => handleOpenModal(null, 'add')}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Ajouter un Module
      </button>

      {modalType === 'add' && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          <AddModule onClose={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default ModuleList;
