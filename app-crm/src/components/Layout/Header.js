import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LogoutButton from '../Auth/LogoutButton';

const Header = () => {
  const { authState } = useContext(AuthContext);

  return (
    <header className="header flex justify-between items-center bg-blue-500 text-white p-4">
      <h1 className="text-xl font-bold">
        <Link to="/">Mon Application</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4 items-center">
          {!authState ? (
            <>
              <li>
                <Link to="/register" className="bg-white text-blue-500 py-2 px-4 rounded">
                  Inscription
                </Link>
              </li>
              <li>
                <Link to="/login" className="bg-white text-blue-500 py-2 px-4 rounded">
                  Connexion
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="bg-white text-blue-500 py-2 px-4 rounded">
                  Mon Profil
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
