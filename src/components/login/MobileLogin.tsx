import React from "react";
import LoginForm from "./LoginForm";

const MobileLogin = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Mobile Login</h1>
      <LoginForm />
    </div>
  );
};

export default MobileLogin;
