import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaBook } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64`}
      >
        <button onClick={toggleSidebar} className="text-2xl mb-4">
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold mb-8">DASHBOARD ADMIN</h1>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/admin"
            className="hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <FaUser className="mr-2" /> Users
          </Link>
          <Link
            to="/modules"
            className="hover:bg-gray-700 p-2 rounded flex items-center"
          >
            <FaBook className="mr-2" /> Modules
          </Link>
        </nav>
      </div>
      <div className="p-4">
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
