import React, { useContext, useEffect } from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const AdminPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <AdminDashboard />
  
      </main>
    </div>
  );
};

export default AdminPage;
