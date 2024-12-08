import React from "react";
import DoneButton from "@/components/AuthComponents/DoneButton";
import { AuthScreenProps } from "@/utils/AuthScreenProps";

const DoneScreen: React.FC<AuthScreenProps> = ({ header, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-b-md">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-rawmats-text-700">
        {header}
      </h2>
      <p className="text-rawmats-text-500 mb-4">{message}</p>
      <DoneButton />
    </div>
  );
};

export default DoneScreen;
