import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopDone = dynamic(
  () => import("@/components/recover/done/DesktopDone"),
  {
    loading: () => <p>Loading desktop view...</p>,
    ssr: true,
  },
);

const MobileDone = dynamic(
  () => import("@/components/recover/done/MobileDone"),
  {
    loading: () => <p>Loading mobile view...</p>,
    ssr: true,
  },
);

const RecoveryDonePage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-rawmats-background-700">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopDone
            header={"Desktop View"}
            message={"This is a desktop view"}
          />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileDone
            header={"Mobile View"}
            message={"This is a mobile view"}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default RecoveryDonePage;
