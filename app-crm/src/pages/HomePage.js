import React from "react";
import ModuleListUser from "../components/Modules/moduleListUser";

const HomePage = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Welcome to GoHope!</h1>
      <ModuleListUser />
    </div>
  );
};

export default HomePage;
