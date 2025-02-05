import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";
import { ManageProductsPageProps } from "@/utils/Products";
import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";
import ProductForm from "@/components/SupplierDashboard/contents/ProductForm";

const DynamicManageListings = dynamic(
  () => import("@/components/SupplierDashboard/contents/ManageListing"),
  {
    loading: () => <p>Loading manage listings...</p>,
    ssr: true,
  }
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
      adminRole={false}
      initialProducts={products}
      headerAction={<ProductForm supplierId={supplier.id} />}
    >
      <div className="flex flex-col p-8 w-full overflow-auto gap-4">
        <Suspense fallback={<LoadingModal />}>
          <div className="w-full">
            <DynamicManageListings fetchedProducts={props.products} />
          </div>
        </Suspense>
      </div>
    </SupplierScreen>
  );
};

export default ManageProductsPage;
