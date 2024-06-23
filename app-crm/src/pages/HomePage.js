import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ModuleListUser from '../components/Modules/moduleListUser';

const HomePage = () => {
  const { authState } = useContext(AuthContext);

  if (!authState || !authState.user) {
    return  <div className="text-center mt-10" id='home'><h1 className="text-4xl">Bienvenue sur GoHope, <br></br> veuillez vous connecter.</h1></div>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Welcome, {authState.user.username}!</h1>
      <ModuleListUser/>
    </div>
    
  );
};

export default HomePage;
