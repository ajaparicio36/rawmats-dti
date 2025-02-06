"use client";

import React from "react";
import Analytics from "../admin/Analytics";

import { SidebarInset } from "@/components/ui/sidebar";

const AdminScreen: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <div className="w-full h-screen flex items-center justify-center bg-[rgba(254,254,254,0.962)]">
          {/* Mobile design */}
          <div className="md:hidden w-full flex flex-col h-screen overflow-hidden bg-[#CFEEF9]">
            <main className="flex-1 overflow-auto p-4">
              <Analytics />
            </main>
          </div>

          {/* Desktop design */}
          <div className="hidden md:flex md:h-screen md:w-full bg-background">
            <main className="flex-1 overflow-auto p-6">
              <Analytics />
            </main>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default AdminScreen;
