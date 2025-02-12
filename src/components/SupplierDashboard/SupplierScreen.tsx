"use client";

import React from "react";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { SupplierDashboardProps } from "@/utils/Products";
import { SupplierSidebar } from "../Sidebar/SupplierSidebar";
import ProductList from "@/components/SupplierDashboard/contents/ProductList";

interface SupplierScreenProps extends SupplierDashboardProps {
  headerAction?: React.ReactNode;
}

const SupplierScreen: React.FC<SupplierScreenProps> = ({
  children,
  supplier,
  adminRole,
  initialProducts,
  headerAction,
}) => {
  const isLandingPage = !children;

  return (
<div className="flex h-screen w-full bg-background">
<SupplierSidebar
        isSupplier={true}
        isAdmin={adminRole}
        name={supplier.user.displayName}
        email={supplier.user.email}
        avatar={"" /* Implement after profile pages */}
      />
      <SidebarInset className="flex flex-col w-full overflow-hidden bg-white">
        <div className="bg-[#A3E6FD]/25 border-b px-8 py-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold text-[#034169]">Dashboard</h1>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
        <div className="flex-1 p-8 overflow-auto">
          {isLandingPage ? (
            <div>
              <ProductList products={initialProducts} />
            </div>
          ) : (
            children
          )}
        </div>
      </SidebarInset>
    </div>
  );
};

export default SupplierScreen;
