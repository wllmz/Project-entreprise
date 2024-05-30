import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { authState, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Mon Application</Link>
        </h1>
        <nav className="flex space-x-4">
          {authState && authState.user ? (
            <>
              {authState.user.role === 'admin' && (
                <Link to="/admin" className="hover:underline">
                  Administration
                </Link>
              )}
                <Link to="/profile" className="hover:underline">
                Profil
              </Link>
              <button onClick={logout} className="hover:underline">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
              <Link to="/register" className="hover:underline">
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
