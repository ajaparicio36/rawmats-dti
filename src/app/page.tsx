import { createClient } from "@/utils/supabase/server";
import prisma from "@/utils/prisma/client";
import type { ProductWithSupplier } from "@/utils/Products";
import DynamicHomeScreen from "@/components/Home/DynamicScreen";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { HomeSidebar } from "@/components/Sidebar/HomeSidebar";

const ITEMS_PER_PAGE = 12;

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) {
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userData.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const supplier = await prisma.supplier.findUnique({
    where: { userId: user.id, verified: true },
  });

  const isAdmin = user.role === "ADMIN";

  const allProducts: ProductWithSupplier[] = await prisma.product.findMany({
    include: { supplier: true },
    where: {
      verified: true,
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
        {
          supplier: {
            businessName: { contains: searchQuery, mode: "insensitive" },
          },
        },
      ],
    },
    orderBy: { dateAdded: "desc" },
  });

  const dailyDiscoverProducts = allProducts.slice(0, 8);
  const newArrivalsProducts = allProducts.slice(0, 4);
  const paginatedProducts = allProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  return (
    <Fragment>
      <HomeSidebar
        name={user.displayName}
        email={user.email}
        avatar={"" /* Implement after profile pages */}
        isSupplier={!!supplier}
        isAdmin={isAdmin}
      />
      <DynamicHomeScreen
        user={user}
        supplier={supplier}
        dailyDiscoverProducts={dailyDiscoverProducts}
        newArrivalsProducts={newArrivalsProducts}
        paginatedProducts={paginatedProducts}
        page={page}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />
    </Fragment>
  );
}
