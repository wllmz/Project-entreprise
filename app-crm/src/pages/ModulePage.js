import React, { useEffect, useState } from "react";
import ModuleDashboard from "../components/Modules/ModuleDashboard";
import ModuleList from "../components/Modules/ModuleList";
import { getModules } from "../services/module/moduleService";

const ModulePage = () => {
  const [modules, setModules] = useState([]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ModuleDashboard />
        <ModuleList modules={modules} />
      </main>
    </div>
  );
};

export default ModulePage;
