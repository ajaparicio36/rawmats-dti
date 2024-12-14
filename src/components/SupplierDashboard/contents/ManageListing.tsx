"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductWithSupplier } from "@/utils/Products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/utils/formatDate";

interface ManageListingsProps {
  fetchedProducts: ProductWithSupplier[];
}

const ManageListings: React.FC<ManageListingsProps> = ({ fetchedProducts }) => {
  const [products, setProducts] =
    useState<ProductWithSupplier[]>(fetchedProducts);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full">
      <div className="w-full mx-auto border p-4 mb-12">
        <Accordion type="single" collapsible className="w-full">
          {products.map((product) => (
            <AccordionItem key={product.id} value={product.id}>
              <AccordionTrigger className="flex justify-between items-center p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{product.name}</span>
                  <Badge variant={product.verified ? "default" : "secondary"}>
                    {product.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(product.dateAdded)}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-2">
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-green-600 font-semibold">
                        ₱{product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Added on: {formatDate(product.dateAdded)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Verified on: {formatDate(product.verifiedDate)}
                      </p>
                      <Button
                        onClick={() => handleDelete(product.id)}
                        variant="destructive"
                        className="mt-4"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default ManageListings;
