import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";

const SupplierScreen = dynamic(
  () => import("@/components/supplier-dashboard/SupplierScreen"),
  {
    loading: () => <p>Loading supplier dashboard...</p>,
    ssr: true,
  },
);

const SupplierDashboard = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/");
  }

  const isSupplier = await prisma.supplier.findUnique({
    where: {
      userId: data.user.id,
      verified: true,
    },
    include: {
      user: true,
    },
  });

  if (!isSupplier) {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    where: {
      supplier: {
        userId: data.user.id,
      },
    },
  });

  const supplierName = isSupplier.user.displayName;

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<LoadingModal />}>
        <SupplierScreen
          fetchedProducts={products}
          userID={isSupplier.id}
          supplierName={supplierName}
        />
      </Suspense>
    </div>
  );
};

export default SupplierDashboard;
