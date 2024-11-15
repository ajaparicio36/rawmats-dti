import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopAdminDashboard = dynamic(
  () => import("@/components/admin/DesktopAdminDashboard"),
  {
    loading: () => <p>Loading desktop admin dashboard...</p>,
    ssr: true,
  },
);

const MobileAdminDashboard = dynamic(
  () => import("@/components/admin/MobileAdminDashboard"),
  {
    loading: () => <p>Loading mobile admin dashboard...</p>,
    ssr: true,
  },
);

const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopAdminDashboard />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileAdminDashboard />
        </div>
      </Suspense>
    </div>
  );
};

export default AdminDashboard;
