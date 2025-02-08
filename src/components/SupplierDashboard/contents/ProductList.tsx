"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Supplier } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="mt-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900">Browse Products</h2>
          <p className="text-gray-500 text-sm">
            Create the best raw materials for your business
          </p>
        </div>{" "}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 border rounded-lg px-3 py-2 text-sm"
          />

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-40 border rounded-lg px-3 py-2 text-sm bg-white">
              Sort by
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
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
                description={product.description}
              />
            ))}
          </div>{" "}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="mx-2"
              >
                Previous
              </Button>
              <span className="px-4 py-4 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="mx-2"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
