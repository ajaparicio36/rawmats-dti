"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductWithSupplier } from "@/utils/Products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/utils/formatDate";
import EditProductForm from "./EditProductForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManageListingsProps {
  fetchedProducts: ProductWithSupplier[];
}

const ITEMS_PER_PAGE = 10;

const ManageListings: React.FC<ManageListingsProps> = ({ fetchedProducts }) => {
  const [products, setProducts] =
    useState<ProductWithSupplier[]>(fetchedProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductWithSupplier[]>(fetchedProducts);
  const [editingProduct, setEditingProduct] =
    useState<ProductWithSupplier | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const totalProducts = filteredProducts.length;
  const pendingProducts = filteredProducts.filter(
    (product) => !product.verified
  ).length;
  const verifiedProducts = filteredProducts.filter(
    (product) => product.verified
  ).length;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditComplete = (updatedProduct: ProductWithSupplier) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);

    if (value === "all") {
      setFilteredProducts(products);
    } else if (value === "pending") {
      setFilteredProducts(products.filter((product) => !product.verified));
    } else if (value === "verified") {
      setFilteredProducts(products.filter((product) => product.verified));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-700">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-700">
              Pending Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">
              {pendingProducts}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-700">
              Verified Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {verifiedProducts}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Your Listings
        </h2>
        <p className="text-gray-500 text-xs mt-1">
          Easily edit, update, and track your product listings.
        </p>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            className="w-64 rounded-full border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-48 rounded-full border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-600 transition-all duration-200">
              <SelectValue className="text-sm" placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                View All
              </SelectItem>
              <SelectItem value="pending" className="text-sm">
                Pending
              </SelectItem>
              <SelectItem value="verified" className="text-sm">
                Verified
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="p-3 shadow-md border border-gray-200 bg-white rounded-xl transition hover:shadow-lg"
          >
            <AccordionItem value={product.id} className="border-none">
              <AccordionTrigger className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={45}
                    height={45}
                    className="rounded-md shadow-sm"
                  />
                  <div>
                    <span className="font-semibold text-base text-gray-900">
                      {product.name}
                    </span>
                    <p className="text-xs text-gray-500">
                      {formatDate(product.dateAdded)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={product.verified ? "default" : "secondary"}
                  className="text-xs py-1 px-2 rounded-full"
                >
                  {product.verified ? "Verified" : "Pending"}
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
                  <p>
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Added:</strong> {formatDate(product.dateAdded)}
                  </p>
                  <p>
                    <strong>Verified:</strong>{" "}
                    {product.verified ? formatDate(product.verifiedDate) : "-"}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    onClick={() => setEditingProduct(product)}
                    size="sm"
                    variant="outline"
                    className="rounded-full px-3"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    size="sm"
                    variant="destructive"
                    className="rounded-full px-3"
                  >
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>

      <div className="flex justify-center space-x-4 mt-6">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          variant="outline"
          className="rounded-full px-3"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="outline"
          className="rounded-full px-3"
        >
          Next
        </Button>
      </div>

      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onEdit={handleEditComplete}
        />
      )}
    </div>
  );
};

export default ManageListings;
