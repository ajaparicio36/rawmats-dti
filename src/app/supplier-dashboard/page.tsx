import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";

const SupplierDashboard = async () => {
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

  const isAdmin = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
    select: {
      role: true,
    },
  });


  const props: SupplierDashboardProps = {
    children: null,

    adminRole: isAdmin?.role === "ADMIN",
    initialProducts: products,
    supplier: supplier,
  };

  return (
    <SupplierScreen
      adminRole={props.adminRole}
      initialProducts={props.initialProducts}
      supplier={props.supplier}
    >
      <div className="flex-1 p-8 overflow-auto">
        <p>Profile page is not implemented yet. {supplier.businessName}</p>
      </div>
    </SupplierScreen>
  );
};

export default SupplierDashboard;
