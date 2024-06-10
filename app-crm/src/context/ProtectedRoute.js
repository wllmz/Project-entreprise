import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { authState, loadingAuth, isAuthenticated, isAdmin } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
