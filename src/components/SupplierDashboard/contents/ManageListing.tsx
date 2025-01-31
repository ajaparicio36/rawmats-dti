"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductWithSupplier } from "@/utils/Products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import EditProductForm from "./EditProductForm";

interface ManageListingsProps {
  fetchedProducts: ProductWithSupplier[];
}

const ITEMS_PER_PAGE = 10;

const ManageListings: React.FC<ManageListingsProps> = ({ fetchedProducts }) => {
  const [products, setProducts] = useState<ProductWithSupplier[]>(fetchedProducts);
  const [editingProduct, setEditingProduct] = useState<ProductWithSupplier | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithSupplier | null>(null);

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
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setEditingProduct(null);
  };

  const handleShowDescription = (product: ProductWithSupplier) => {
    setSelectedProduct(product);
    setIsDescriptionModalOpen(true);
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full">
      <div className="w-full p-4">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Verified Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => handleShowDescription(product)} 
                >
                  <TableCell className="flex items-center space-x-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.verified ? "default" : "secondary"}>
                      {product.verified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(product.dateAdded)}</TableCell>
                  <TableCell>{product.verified ? formatDate(product.verifiedDate) : "-"}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button onClick={() => setEditingProduct(product)} variant="outline">Edit</Button>
                    <Button onClick={() => handleDelete(product.id)} variant="destructive" className="bg-gray-600 text-white hover:bg-red-700"
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            variant="outline"
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>

      {isDescriptionModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
            <div className="flex items-center mt-4">
              <div className="ml-4">
                <p className="text-gray-600">Price: ${selectedProduct.price}</p>
                <p className="mt-2">{selectedProduct.description}</p>
                <p className="mt-2">
                  <Badge variant={selectedProduct.verified ? "default" : "secondary"}>
                    {selectedProduct.verified ? "Verified" : "Pending"}
                  </Badge>
                </p>
                <p className="mt-2 text-gray-500">Added: {formatDate(selectedProduct.dateAdded)}</p>
                {selectedProduct.verified && selectedProduct.verifiedDate && (
                  <p className="mt-2 text-gray-500">Verified on: {formatDate(selectedProduct.verifiedDate)}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsDescriptionModalOpen(false)} variant="outline">Close</Button>
            </div>
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductForm product={editingProduct} onClose={() => setEditingProduct(null)} onEdit={handleEditComplete} />
      )}
    </ScrollArea>
  );
};

export default ManageListings;
