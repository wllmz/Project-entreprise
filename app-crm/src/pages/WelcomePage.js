import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const WelcomePage = () => {
  const { authState } = useContext(AuthContext);

  if (!authState || !authState.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Welcome, {authState.user.username}!</h1>
    </div>
    
  );
};

export default WelcomePage;
