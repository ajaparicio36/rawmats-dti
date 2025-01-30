"use client";
import React, { useState } from "react";
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
  const itemsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-6 justify-center">
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {currentProducts.map((product) => (
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

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 border rounded ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-2 border rounded ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No products created yet.</p>
      )}
    </div>
  );
}
