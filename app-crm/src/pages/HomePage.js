import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { authState } = useContext(AuthContext);

  if (!authState || !authState.user) {
    return  <div className="text-center mt-10"><h1 className="text-4xl">Welcome to the Home Page</h1></div>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Welcome, {authState.user.username}!</h1>
    </div>
    
  );
};

export default HomePage;
