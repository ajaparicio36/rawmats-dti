import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SupplierProvider from "@/components/SupplierDashboard/SupplierContext";

export default async function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const user = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
  });

  const notifCount = await prisma.notification.count({
    where: {
      read: false,
      userId: data.user.id,
    },
  });

  const props = {
    adminRole: user?.role === "ADMIN",
    initialProducts: products,
    supplier: supplier,
  };

  return (
    <SupplierProvider
      products={products}
      supplier={supplier}
      notifCount={notifCount}
    >
      <SupplierScreen
        user={user!}
        adminRole={props.adminRole}
        initialProducts={props.initialProducts}
        supplier={props.supplier}
      >
        {children}
      </SupplierScreen>
    </SupplierProvider>
  );
}
