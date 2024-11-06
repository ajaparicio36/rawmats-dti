import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopDone = dynamic(
  () => import("@/components/recover/done/DesktopDone"),
  {
    loading: () => <p>Loading desktop login...</p>,
    ssr: true,
  },
);

const MobileDone = dynamic(
  () => import("@/components/recover/done/MobileDone"),
  {
    loading: () => <p>Loading mobile login...</p>,
    ssr: true,
  },
);

const DonePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const header = `${(await searchParams).header}` || "";
  const message = `${(await searchParams).message}` || "";

  const parsedHeader = header.replace(/_/g, " ");
  const parsedMessage = message.replace(/_/g, " ");

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopDone header={parsedHeader} message={parsedMessage} />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileDone header={parsedHeader} message={parsedMessage} />
        </div>
      </Suspense>
    </div>
  );
};

export default DonePage;
