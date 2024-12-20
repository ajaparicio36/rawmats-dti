import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full h-screen">{children}</div>
    </SidebarProvider>
  );
}
