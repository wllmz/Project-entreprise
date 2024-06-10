import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getAllUsers } from '../../services/adminService';
import UserList from './UserList';

const AdminDashboard = () => {
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(authState.token);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [authState.token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Tableau de bord de l'administrateur</h2>
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboard;
