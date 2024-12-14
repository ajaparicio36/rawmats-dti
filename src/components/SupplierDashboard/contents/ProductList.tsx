"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Supplier } from "@prisma/client";

interface ProductListProps {
  products: {
    id: string;
    name: string;
    supplierId: string;
    price: number;
    description: string;
    verified: boolean;
    verifiedDate: Date;
    dateAdded: Date;
    image: string;
    supplier: Supplier;
  }[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mt-6 justify-center">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              supplier={product.supplier}
              price={product.price}
              image={product.image}
              verified={product.verified}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products created yet.</p>
      )}
    </div>
  );
}
