import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import "./MobileAuthScreen.css";
import { AuthScreenProps } from "@/utils/AuthScreenProps";

const MobileAuthScreen: React.FC<AuthScreenProps> = ({
  header,
  body,
  message,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-3/5 items-center justify-center text-center">
        <Image
          src={logo}
          alt="RAWMATS Logo"
          width={400}
          className="max-w-full h-auto mx-auto"
        />
      </div>
      <div className="flex flex-1 flex-col bg-white p-6 rounded-t-md shadow-md">
        <div className="flex flex-col gap-2 items-start w-3/4">
          <h2 className="text-lg font-bold text-rawmats-text-700">{header}</h2>
          <p className="text-rawmats-text-500 text-sm">{message}</p>
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
};

export default MobileAuthScreen;
