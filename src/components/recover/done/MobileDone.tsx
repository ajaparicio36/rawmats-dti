import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";

import { DoneProps } from "@/utils/DoneProps";
import DoneButton from "./DoneButton";

const MobileDone: React.FC<DoneProps> = ({ header, message }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-4/5 items-center justify-center text-center">
        <Image
          src={logo}
          alt="RAWMATS Logo"
          width={400}
          className="max-w-full h-auto mx-auto"
        />
      </div>
      <div className="flex flex-1 bg-white p-6 rounded-t-md shadow-md">
        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="text-2xl font-bold mb-2 text-rawmats-text-700">
            {header}
          </h2>
          <p className="text-rawmats-text-500 mb-8">{message}</p>
          <div className="flex flex-col items-center justify-center  p-6 rounded-b-md ">
            <DoneButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDone;
