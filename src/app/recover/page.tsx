import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopResetPassword = dynamic(
  () => import("@/components/recover/DesktopResetPassword"),
  {
    loading: () => <p>Loading desktop view...</p>,
    ssr: true,
  },
);

const MobileResetPassword = dynamic(
  () => import("@/components/recover/MobileResetPassword"),
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
          <DesktopResetPassword />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileResetPassword />
        </div>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
