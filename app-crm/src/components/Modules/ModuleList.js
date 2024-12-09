import React, { useState, useEffect } from "react";
import AddModule from "./modals/AddModule";
import UpdateModule from "./modals/UpdateModule";
import DeleteModule from "./modals/DeleteModule";
import ModalWrapper from "./modals/ModalWrapper";
import { getModules } from "../../services/module/moduleService";

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);
    } catch (error) {
      console.error("Failed to fetch modules", error);
    }
  };

  const handleOpenModal = (module, type) => {
    setSelectedModule(module);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
    setModalType("");
  };

  const renderModals = () => {
    switch (modalType) {
      case "add":
        return (
          <ModalWrapper isOpen={true} onClose={handleCloseModal}>
            <AddModule onClose={handleCloseModal} />
          </ModalWrapper>
        );
      case "update":
        return (
          <ModalWrapper isOpen={true} onClose={handleCloseModal}>
            <UpdateModule module={selectedModule} onClose={handleCloseModal} />
          </ModalWrapper>
        );
      case "delete":
        return (
          <ModalWrapper isOpen={true} onClose={handleCloseModal}>
            <DeleteModule module={selectedModule} onClose={handleCloseModal} />
          </ModalWrapper>
        );
      default:
        return null;
    }
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(module, "update")}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleOpenModal(module, "delete")}
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
      <button
        onClick={() => handleOpenModal(null, "add")}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Ajouter un Module
      </button>
      {renderModals()}
    </div>
  );
};

export default ModuleList;
