"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductWithSupplier } from "@/utils/Products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/utils/formatDate";
import EditProductForm from "./EditProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ManageListingsProps {
  fetchedProducts: ProductWithSupplier[];
}

const ITEMS_PER_PAGE = 10;

const ManageListings: React.FC<ManageListingsProps> = ({ fetchedProducts }) => {
  const [products, setProducts] =
    useState<ProductWithSupplier[]>(fetchedProducts);
  const [editingProduct, setEditingProduct] =
    useState<ProductWithSupplier | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithSupplier | null>(null);

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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDateAsNumber = (date: string | Date): string => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <div
          className="bg-white p-10 mt-[-20] rounded-lg"
          style={{
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, 0.1), 0 -4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table className="w-full min-w-[600px] rounded-lg shadow-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Product</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Added</TableHead>
                <TableHead className="whitespace-nowrap">
                  Verified Date
                </TableHead>{" "}
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="space-y-2">
              {" "}
              {currentProducts.map((product) => (
                <TableRow
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
                >
                  <TableCell className="flex items-center space-x-2 min-w-[100px] max-w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <span className="truncate">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.verified ? "default" : "secondary"}>
                      {product.verified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateAsNumber(product.dateAdded)}</TableCell>
                  <TableCell>
                    {product.verified
                      ? formatDateAsNumber(product.verifiedDate)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="flex space-x-10 flex-wrap min-w-[150px]">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProduct(product);
                      }}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {currentProducts.map((product) => (
            <AccordionItem key={product.id} value={product.id}>
              <AccordionTrigger className="flex items-center space-x-3 p-3 border rounded-md">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="font-medium">{product.name}</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong>{" "}
                  <Badge variant={product.verified ? "default" : "secondary"}>
                    {product.verified ? "Verified" : "Pending"}
                  </Badge>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Added:</strong> {formatDate(product.dateAdded)}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Verified Date:</strong>{" "}
                  {product.verified ? formatDate(product.verifiedDate) : "-"}
                </p>
                <div className="flex space-x-5 mt-3">
                  <Button
                    onClick={() => setEditingProduct(product)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="destructive"
                    className="bg-gray-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="outline"
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

      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogTrigger />
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedProduct.verified ? "Verified" : "Pending"}
                  </p>
                  <p>
                    <strong>Added:</strong>{" "}
                    {formatDate(selectedProduct.dateAdded)}
                  </p>
                  <p>
                    <strong>Verified Date:</strong>{" "}
                    {selectedProduct.verified
                      ? formatDate(selectedProduct.verifiedDate)
                      : "-"}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageListings;
