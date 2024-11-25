import React, { Fragment } from "react";
import DoneButton from "../DoneButton";
import { AuthScreenProps } from "@/utils/AuthScreenProps";

const MobileDoneBody: React.FC<AuthScreenProps> = ({
  mobileMessage,
  mobileHeader,
}) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold mb-2 text-rawmats-text-700">
          {mobileHeader}
        </h2>
        <p className="text-rawmats-text-500">{mobileMessage}</p>
        <div className="flex flex-col items-center justify-center  p-6 rounded-b-md ">
          <DoneButton />
        </div>
      </div>
    </Fragment>
  );
};

export default MobileDoneBody;
