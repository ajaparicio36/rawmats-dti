import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import SidebarComponent from "@/components/supplier-dashboard/Sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsPageProps } from "@/utils/Products";

const NotificationsPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/");
  }

  const supplier = await prisma.supplier.findUnique({
    where: {
      userId: data.user.id,
      verified: true,
    },
    include: {
      user: true,
    },
  });

  if (!supplier) {
    redirect("/");
  }

  const props: NotificationsPageProps = {
    supplierName: supplier.user.displayName,
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarComponent supplierName={props.supplierName} />
      <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="bg-[#A3E6FD]/30 border-b px-8 py-6 flex flex-row items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold text-[#034169]">
              Notifications
            </h1>
          </div>
          <div className="flex-1 p-8 overflow-auto">
            <p>Notifications feature is not implemented yet.</p>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default NotificationsPage;
