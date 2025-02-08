import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";
import { ManageProductsPageProps } from "@/utils/Products";
import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";

const DynamicManageListings = dynamic(
  () => import("@/components/SupplierDashboard/contents/ManageListing"),
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
    <SupplierScreen
      supplier={supplier}
      adminRole={supplier.user.role === "ADMIN"}
      initialProducts={products}
    >
      <div className="flex p-8 w-full overflow-auto">
        <Suspense fallback={<LoadingModal />}>
          <DynamicManageListings fetchedProducts={props.products} />
        </Suspense>
      </div>
    </SupplierScreen>
  );
};

export default ManageProductsPage;
