import React from "react";
import AdminDashboard from "../components/Admin/AdminDashboard";

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
