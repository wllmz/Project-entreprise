import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/admin/adminService";
import UserList from "./UserList";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl mb-4 underline">
        Tableau de bord de l'administrateur
      </h2>
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboard;
