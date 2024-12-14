import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import SidebarComponent from "@/components/SupplierDashboard/Sidebar";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import ProductList from "@/components/SupplierDashboard/contents/ProductList";
import ProductForm from "@/components/SupplierDashboard/contents/ProductForm";
import { ProductWithSupplier } from "@/utils/Products";

const ProductsPage = async () => {
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

  const products = (await prisma.product.findMany({
    where: {
      supplierId: supplier.id,
    },
    include: {
      supplier: true,
    },
  })) as ProductWithSupplier[];

  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarComponent supplierName={supplier.user.displayName} />
      <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="bg-[#A3E6FD]/30 border-b px-8 py-6 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold text-[#034169]">Products</h1>
          </div>
          <ProductForm supplierId={supplier.id} />
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <ProductList products={products} />
        </div>
      </SidebarInset>
    </div>
  );
};

export default ProductsPage;
