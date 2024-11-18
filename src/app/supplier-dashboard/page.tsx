import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopSupplier = dynamic(() => import("@/components/supplier-dashboard/DesktopSupplier"), {
  loading: () => <p>Loading desktop supplier dashboard...</p>,
  ssr: true,
});

const MobileSupplier = dynamic(() => import("@/components/supplier-dashboard/MobileSupplier"), {
  loading: () => <p>Loading mobile supplier dashboard...</p>,
  ssr: true,
});

const SupplierDashboard = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopSupplier />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileSupplier />
        </div>
      </Suspense>
    </div>
  );
};

export default SupplierDashboard;
