import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";
import ProductList from "@/components/SupplierDashboard/contents/ProductList";
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
    <SupplierScreen
      supplier={supplier}
      adminRole={supplier.user.role === "ADMIN"}
      initialProducts={products}
    >
      <ProductList products={products} />
    </SupplierScreen>
  );
};

export default ProductsPage;
