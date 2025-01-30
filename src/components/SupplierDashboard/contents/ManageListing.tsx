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
import EditProductForm from "./EditProductForm";

interface ManageListingsProps {
  fetchedProducts: ProductWithSupplier[];
}

const ManageListings: React.FC<ManageListingsProps> = ({ fetchedProducts }) => {
  const [products, setProducts] =
    useState<ProductWithSupplier[]>(fetchedProducts);
  const [editingProduct, setEditingProduct] =
    useState<ProductWithSupplier | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/product", {
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

  const handleEdit = (product: ProductWithSupplier) => {
    setEditingProduct(product);
  };

  const handleEditComplete = (updatedProduct: ProductWithSupplier) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full">
      <div className="w-full mx-auto border p-4 mb-12">
        <div className="grid grid-cols-4 gap-4 p-4 font-semibold bg-gray-100 border-b">
          <span className="text-left">Products</span>
          <span className="text-left">Status</span>
          <span className="text-left">Verified Date</span>
          <span className="text-left">Added Date</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {products.map((product) => (
            <AccordionItem key={product.id} value={product.id}>
              <AccordionTrigger className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={product.verified ? "default" : "secondary"}>
                      {product.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {product.verified ? formatDate(product.verifiedDate) : "-"}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {formatDate(product.dateAdded)}
                  </div>
                </div>
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
                      {product.verified && (
                        <p className="text-sm text-gray-500">
                          Verified on: {formatDate(product.verifiedDate)}
                        </p>
                      )}
                      <div className="flex space-x-2 mt-4">
                        <Button
                          onClick={() => handleEdit(product)}
                          variant="outline"
                          className="flex-1"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="destructive"
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onEdit={handleEditComplete}
        />
      )}
    </ScrollArea>
  );
};

export default ManageListings;
