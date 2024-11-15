import React from "react";
import SignUpForm from "./SignUpForm";
import Image from "next/image";
import logo from "../../public/logo.png";

const DesktopSignUp = () => {
  return (
    <div className="max-w-6xl w-full h-[80vh] flex items-center justify-center bg-white rounded-2xl shadow-2xl shadow-rawmats-secondary-700 overflow-hidden">
      <div className="flex flex-col justify-center gap-4 items-start w-1/2 p-12 overflow-y-auto h-full scrollbar-hide">
        <h2 className="lg:text-5xl lg:mt-12 text-4xl font-bold text-rawmats-text-700 mt-12">
          SIGN UP NOW!
        </h2>
        <p className="text-rawmats-text-500">Become a member.</p>
        <SignUpForm />
      </div>

      <div className="w-1/2 h-full bg-rawmats-secondary-100 p-12 flex items-center justify-center">
        <Image
          src={logo}
          alt="RAWMATS Logo"
          width={400}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default DesktopSignUp;
