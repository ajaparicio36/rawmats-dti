import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/utils/prisma/client";
import type { ProductWithSupplier } from "@/utils/Products";
import ProductPreviewCard from "@/components/Products/ProductPreviewCard";
import NavBar from "@/components/Home/NavBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCarousel from "@/components/Products/ProductCarousel";
import {
  AnimatedDiv,
  AnimatedMain,
  AnimatedFooter,
} from "@/components/Home/AnimatedComponents";

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

  if (userError || !userData?.user) {
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
    <div className="flex flex-col min-h-screen w-screen">
      <NavBar user={user} supplier={supplier} />
      <AnimatedMain
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 space-y-6"
      >
        {!searchQuery && (
          <>
            <AnimatedDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                Daily Discover
              </h2>
              <ProductCarousel
                userId={user.id}
                products={dailyDiscoverProducts}
              />
            </AnimatedDiv>
            <AnimatedDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
                New Arrivals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {newArrivalsProducts.map((product) => (
                  <ProductPreviewCard
                    key={product.id}
                    userId={user.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    supplier={product.supplier}
                    image={product.image}
                  />
                ))}
              </div>
            </AnimatedDiv>
          </>
        )}
        <AnimatedDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Browse All"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {paginatedProducts.map((product) => (
              <ProductPreviewCard
                key={product.id}
                userId={user.id}
                id={product.id}
                name={product.name}
                price={product.price}
                supplier={product.supplier}
                image={product.image}
              />
            ))}
          </div>
          <AnimatedDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center gap-4"
          >
            <Button
              variant="outline"
              disabled={page <= 1}
              asChild
              className="bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50"
            >
              <Link
                href={`/?page=${Math.max(1, page - 1)}&search=${searchQuery}`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <span className="text-blue-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= totalPages}
              asChild
              className="bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50"
            >
              <Link
                href={`/?page=${Math.min(totalPages, page + 1)}&search=${searchQuery}`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </AnimatedDiv>
        </AnimatedDiv>
      </AnimatedMain>
      <AnimatedFooter
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            &copy; 2023 RawMats. All rights reserved.
          </p>
        </div>
      </AnimatedFooter>
    </div>
  );
}
