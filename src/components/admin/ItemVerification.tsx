"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ItemVerificationProps {
  products: Product[];
}

const rejectionReasons = [
  "Inappropriate content",
  "Poor image quality",
  "Inaccurate description",
  "Incorrect pricing",
  "Duplicate listing",
];

const fallbackImageUrl = "/placeholder.svg";

export function ItemVerificationComponent({ products }: ItemVerificationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const verifyProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/product/verify/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to verify product");
      }
      alert("Product verified successfully.");
    } catch (error) {
      console.error("Error verifying product:", error);
    }
  };

  const rejectProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/product/reject/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to reject product");
      }
      alert("Product rejected successfully.");
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  const openRejectModal = (productId: string) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleReject = () => {
    if (selectedProduct) {
      rejectProduct(selectedProduct);
      setIsModalOpen(false);
      setSelectedProduct(null);
      setSelectedReasons([]);
      setComment("");
    }
  };

  const handleReasonChange = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return products.length === 0 ? (
    <p>No products to verify currently</p>
  ) : (
    <div className="h-fit">
      <div className="flex items-center gap-2 md:gap-10 flex-col md:flex-row">
        <div className="flex flex-row justify-center items-center w-full md:w-auto relative">
          <SidebarTrigger className="absolute md:static left-0 md:mr-4 border size-8 bg-gray-100" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Product Verification
          </h2>
        </div>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="ghost">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {paginatedProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="block"
            >
              <Card className="flex flex-col h-full transition-transform duration-200 hover:scale-105">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={product.image || fallbackImageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = fallbackImageUrl;
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
                    Supplier ID: {product.supplierId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Date Added:{" "}
                    {new Date(product.dateAdded).toLocaleDateString()}
                  </p>
                  {product.verified && (
                    <p className="text-xs text-muted-foreground">
                      Verified Date:{" "}
                      {new Date(product.verifiedDate).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2 justify-between mt-auto">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      verifyProduct(product.id);
                    }}
                    disabled={product.verified}
                    className="flex-1 bg-rawmats-primary-300 hover:bg-rawmats-primary-100 w-full"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openRejectModal(product.id);
                    }}
                    variant="destructive"
                    disabled={product.verified}
                    className="flex-1 bg-rawmats-feedback-error w-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {totalPages > 1 && (
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setSelectedReasons([]);
            setComment("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reasons">Rejection Reasons</Label>
              <Select onValueChange={handleReasonChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reasons" />
                </SelectTrigger>
                <SelectContent>
                  {rejectionReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedReasons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedReasons.map((reason) => (
                    <div
                      key={reason}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      {reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Additional Comments</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Provide additional details about the rejection..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-rawmats-feedback-error hover:bg-red-600"
              onClick={handleReject}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
