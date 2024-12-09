import React, { useState, useEffect } from "react";
import {
  updateModule,
  getModuleById,
} from "../../../services/module/moduleService";

const UpdateModule = ({ module, onClose }) => {
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    if (module) {
      fetchModule(module._id);
    }
  }, [module]);

  const fetchModule = async (id) => {
    try {
      const data = await getModuleById(id);
      setModuleName(data.module);
    } catch (error) {
      console.error("Failed to fetch module", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateModule(module._id, { module: moduleName });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update module", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Modifier Module</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du Module"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Modifier
        </button>
      </form>
    </div>
  );
};

export default UpdateModule;
