"use client";

import React from "react";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { SupplierSidebar } from "../Sidebar/SupplierSidebar";
import ProductForm from "./contents/ProductForm";

interface SupplierScreenProps {
  supplier: {
    businessName: string;
    id: string;
  };
  children: React.ReactNode;
  showProductForm?: boolean; 
}

const SupplierScreen: React.FC<SupplierScreenProps> = ({ children, supplier, showProductForm }) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <SupplierSidebar />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#A3E6FD]/30 border-b px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold text-[#034169]">Dashboard</h1>
          </div>
          {showProductForm && <ProductForm supplierId={supplier.id} />}
        </div>

        <div className="flex-1 p-8 overflow-auto">{children}</div>
      </SidebarInset>
    </div>
  );
};

export default SupplierScreen;
