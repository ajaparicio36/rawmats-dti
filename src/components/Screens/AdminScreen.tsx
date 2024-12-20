"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu } from "lucide-react";
import logo from "@/public/logo.png";
import { ItemVerification } from "@/components/admin/ItemVerification";
import { SupplierVerification } from "@/components/admin/SupplierVerification";
import Analytics from "@/components/admin/Analytics";
import { Product, Supplier, User } from "@prisma/client";
import { Sidebar } from "@/components/admin/Sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

interface AdminScreenProps {
  fetchedProducts: Product[];
  fetchedSuppliers: (Supplier & { user: User })[];
}

const AdminScreen: React.FC<AdminScreenProps> = ({
  fetchedProducts,
  fetchedSuppliers,
}) => {
  const [selectedTab, setSelectedTab] = useState("analytics");

  const handleVerify = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/product/verify/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to verify product");
      }
      alert("Product verified successfully.");
    } catch (error) {
      console.error("Error verifying product:", error);
    }
  }, []);

  const handleReject = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/product/reject/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to reject product");
      }
      alert("Product rejected successfully.");
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "analytics":
        return <Analytics />;
      case "supplier":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Supplier Verification</h2>
            {fetchedSuppliers.length === 0 ? (
              <p>No supplier applications currently</p>
            ) : (
              <SupplierVerification suppliers={fetchedSuppliers} />
            )}
          </div>
        );
      case "item":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Item Verification</h2>
            <ItemVerification
              products={fetchedProducts}
              verifyProduct={handleVerify}
              rejectProduct={handleReject}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <SidebarInset className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-4 bg-card border-b md:hidden">
            <Image
              src={logo}
              alt="RAWMATS Logo"
              width={100}
              height={50}
              className="max-w-full h-auto"
            />
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SidebarTrigger>
          </header>
          <main className="flex-1 overflow-hidden p-4 md:p-6">
            <ScrollArea className="h-full">{renderContent()}</ScrollArea>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminScreen;
