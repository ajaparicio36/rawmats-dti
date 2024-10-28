import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopChangePassword = dynamic(
  () => import("@/components/recover/change-password/DesktopChangePassword"),
  {
    loading: () => <p>Loading desktop view...</p>,
    ssr: true,
  },
);

const MobileChangePassword = dynamic(
  () => import("@/components/recover/change-password/MobileChangePassword"),
  {
    loading: () => <p>Loading mobile view...</p>,
    ssr: true,
  },
);

const ResetPasswordPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-rawmats-background-700">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopChangePassword />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileChangePassword />
        </div>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
