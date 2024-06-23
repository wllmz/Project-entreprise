import React, { useContext, useEffect, useState } from 'react';
import ModuleDashboard from '../components/Modules/ModuleDashboard';
import ModuleList from '../components/Modules/ModuleList';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getModules } from '../services/module/moduleService';

const ModulePage = () => {
  const navigate = useNavigate();
  const { isAdmin, authState } = useContext(AuthContext);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    } else {
      fetchModules();
    }
  }, [isAdmin, navigate]);

  const fetchModules = async () => {
    try {
      const data = await getModules(authState.token);
      setModules(data);
    } catch (error) {
      console.error('Failed to fetch modules', error);
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
