"use client";

import type React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import NavBar from "@/components/Home/NavBar";
import ProductCarousel from "@/components/Products/ProductCarousel";
import ProductPreviewCard from "@/components/Products/ProductPreviewCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  AnimatedDiv,
  AnimatedMain,
  AnimatedFooter,
} from "@/components/Home/AnimatedComponents";
import type { User, Supplier } from "@prisma/client";
import type { ProductWithSupplier } from "@/utils/Products";

interface HomeScreenProps {
  user: User;
  supplier: Supplier | null;
  dailyDiscoverProducts: ProductWithSupplier[];
  newArrivalsProducts: ProductWithSupplier[];
  paginatedProducts: ProductWithSupplier[];
  page: number;
  totalPages: number;
  searchQuery: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  supplier,
  dailyDiscoverProducts,
  newArrivalsProducts,
  paginatedProducts,
  page,
  totalPages,
  searchQuery,
}) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <NavBar user={user} supplier={supplier} />
        <AnimatedMain
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 space-y-6 overflow-auto"
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
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : "Browse All"}
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
      </SidebarInset>
    </div>
  );
};

export default HomeScreen;
