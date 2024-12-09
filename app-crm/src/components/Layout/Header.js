import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Header = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16" />
        </a>
        <nav className="flex space-x-4 items-center">
          {isAuthenticated() ? (
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Profil
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:underline"
              >
                Connexion
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hover:underline"
              >
                Inscription
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
