"use client";

import React from "react";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { SupplierDashboardProps } from "@/utils/Products";
import { SupplierSidebar } from "../Sidebar/SupplierSidebar";

const SupplierScreen: React.FC<SupplierDashboardProps> = ({ supplier }) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <SupplierSidebar
        name={supplier.user.displayName}
        email={supplier.user.email}
        avatar=""
      />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#A3E6FD]/30 border-b px-8 py-6 flex items-center">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-2xl font-semibold text-[#034169]">Dashboard</h1>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <p>Profile page is not implemented yet. {supplier.businessName}</p>
        </div>
      </SidebarInset>
    </div>
  );
};

export default SupplierScreen;
