import React, { useEffect, useState } from 'react';
import { getModules } from '../../services/module/moduleService';

const ModuleDashboard = () => {
  const [moduleCount, setModuleCount] = useState(0);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const data = await getModules();
    setModuleCount(data.length);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl mb-4 underline">Tableau de bord des modules</h2>
      <p>Nombre total de modules : {moduleCount}</p>
    </div>
  );
};

export default ModuleDashboard;
