import React from "react";
import LoginForm from "./LoginForm";

const DesktopLogin = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">Desktop Login</h1>
      <LoginForm />
    </div>
  );
};

export default DesktopLogin;
