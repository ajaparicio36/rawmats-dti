"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";
import { useSupplier } from "@/components/SupplierDashboard/SupplierContext";

const DynamicManageListings = dynamic(
  () => import("@/components/SupplierDashboard/contents/ManageListing"),
  {
    loading: () => <p>Loading manage listings...</p>,
    ssr: true,
  },
);

const ManageProductsPage = () => {
  const { products } = useSupplier();

  return (
    <div className="flex p-8 w-full overflow-auto">
      <Suspense fallback={<LoadingModal />}>
        <DynamicManageListings fetchedProducts={products} />
      </Suspense>
    </div>
  );
};

export default ManageProductsPage;
