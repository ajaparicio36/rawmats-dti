"use server";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignoutButton from "@/components/AuthComponents/SignoutButton";
import ProductPreviewCard from "@/components/Products/ProductPreviewCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prisma from "@/utils/prisma/client";

const Home = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    include: {
      supplier: true,
    },
  });

  return (
    <div>
      Hello {data.user.email}! <SignoutButton />
      <ScrollArea className="w-full whitespace-nowrap rounded-md ">
        <div className="flex w-max space-x-4 p-4">
          {products.map((product) => (
            <ProductPreviewCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              supplierName={product.supplier.businessName}
              location={product.supplier.businessLocation}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Home;
