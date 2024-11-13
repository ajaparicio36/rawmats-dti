import DynamicScreen from "@/components/AuthComponents/DynamicScreen";
import React from "react";
import DesktopDoneBody from "@/components/AuthComponents/DoneScreen/DesktopDoneBody";
import MobileDoneBody from "@/components/AuthComponents/DoneScreen/MobileDoneBody";

const DonePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const header = `${(await searchParams).header}` || "";
  const message = `${(await searchParams).message}` || "";
  const parsedHeader = header.replace(/_/g, " ");
  const parsedMessage = message.replace(/_/g, " ");
  const body = <DesktopDoneBody />;
  const mobileBody = (
    <MobileDoneBody
      header={""}
      message={""}
      body={body}
      mobileHeader={parsedHeader}
      mobileMessage={parsedMessage}
    />
  );

  return (
    <DynamicScreen
      header={parsedHeader}
      message={parsedMessage}
      body={body}
      mobileBody={mobileBody}
      mobileHeader={parsedHeader}
      mobileMessage={parsedMessage}
    />
  );
};

export default DonePage;
