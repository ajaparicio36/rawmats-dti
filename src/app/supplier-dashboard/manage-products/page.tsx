import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";
import SidebarComponent from "@/components/supplier-dashboard/Sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ManageProductsPageProps } from "@/utils/Products";

const DynamicManageListings = dynamic(
  () => import("@/components/supplier-dashboard/contents/ManageListing"),
  {
    loading: () => <p>Loading manage listings...</p>,
    ssr: true,
  },
);

const ManageProductsPage = async () => {
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

  const products = await prisma.product.findMany({
    where: {
      supplierId: supplier.id,
    },
    include: {
      supplier: true,
    },
  });

  const props: ManageProductsPageProps = {
    products: products,
    supplierName: supplier.user.displayName,
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarComponent supplierName={props.supplierName} />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <main className="flex flex-col w-full">
          <div className="bg-[#A3E6FD]/30 border-b px-8 py-6 flex flex-row items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold text-[#034169]">
              Manage Products
            </h1>
          </div>
          <div className="flex p-8 w-full overflow-auto">
            <Suspense fallback={<LoadingModal />}>
              <DynamicManageListings fetchedProducts={props.products} />
            </Suspense>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default ManageProductsPage;
