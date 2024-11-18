import React from "react";
import { SnakeLoader } from "../ui/loader";
import { LoadingProps } from "@/utils/LoadingProps";

const InlineLoading: React.FC<LoadingProps> = ({
  message = "Loading...",
  classes,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="pb-2">
        <SnakeLoader size={10} strokeWidth={4} />
      </div>
      <div>
        <p className={`${classes}`}>{message}</p>
      </div>
    </div>
  );
};

export default InlineLoading;
