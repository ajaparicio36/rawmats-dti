"use client";

import React from "react";
import { SnakeLoader } from "@/components/ui/loader";
import { LoadingProps } from "@/utils/LoadingProps";

const LoadingModal: React.FC<LoadingProps> = ({
  message = "Loading, sit tight!",
}) => {
  return (
    <div
      className={`h-full w-full bg-rawmats-neutral-700 bg-opacity-50 flex flex-col gap-2 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
    >
      <div>
        <SnakeLoader size={50} strokeWidth={4} />
      </div>
      <div>
        <p className="text-rawmats-primary-700 font-bold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
