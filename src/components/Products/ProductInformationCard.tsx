"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product, Supplier, Favorite } from "@prisma/client";
import {
  ArrowLeft,
  HeartIcon,
  CheckCircle,
  XCircle,
  TagIcon,
  Building,
  Share2,
} from "lucide-react";
import LoadingModal from "../Loading/LoadingModal";
import Image from "next/image";
import InlineLoading from "../Loading/InlineLoading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductInformationCard() {
  const params = useParams<{ id: string }>();
  const id = `${params.id}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [favorite, setFavorite] = useState<Favorite | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const getProductAndSupplier = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const { product, supplier, favorite } = await response.json();
        setProduct(product);
        setSupplier(supplier);
        setFavorite(favorite);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    const fetchImage = async () => {
      const response = await fetch(`/api/product/${id}/image`);
      const data = await response.json();
      setImageUrl(data.signedUrl);
      setSelectedImage(data.signedUrl);
    };
    fetchImage();
    getProductAndSupplier();
  }, [id]);

  const handleFavorite = async () => {
    try {
      const response = await fetch(`/api/products/${product?.id}/favorite`, {
        method: favorite ? "DELETE" : "POST",
      });
      const updatedFavorite = await response.json();
      setFavorite(updatedFavorite);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  if (loading) {
    return <LoadingModal message="Loading product..." />;
  }

  if (!product || !supplier) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rawmats-secondary-300 to-rawmats-secondary-100 p-4">
        <XCircle className="w-24 h-24 text-rawmats-feedback-error mb-4" />
        <p className="text-2xl text-rawmats-feedback-error mb-4">
          Product Not Found
        </p>
        <Button variant="default" asChild>
          <Link href="/" className="flex items-center gap-2 border">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rawmats-background-700 to-rawmats-secondary-100 py-8 px-4 md:px-8">
      <Card className="max-w-7xl mx-auto">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Image Section */}
            <div className="relative bg-white p-4 lg:p-8">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="absolute top-6 left-6 z-10 bg-white/80 hover:bg-white"
              >
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>

              <div className="relative aspect-square overflow-hidden rounded-lg bg-rawmats-secondary-100">
                {loading ? (
                  <InlineLoading />
                ) : (
                  <Image
                    src={selectedImage || imageUrl}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[imageUrl, imageUrl, imageUrl].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 
                      ${selectedImage === img ? "border-rawmats-primary-300" : "border-transparent"}`}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="bg-white p-6 lg:p-8 flex flex-col">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-rawmats-text-700">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Building className="w-4 h-4" />
                      {supplier.businessName}
                    </Badge>
                    {product.verified && (
                      <Badge
                        variant="default"
                        className="bg-rawmats-feedback-success"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavorite}
                    className="shrink-0"
                  >
                    <HeartIcon
                      className={`w-5 h-5 ${
                        favorite
                          ? "fill-rawmats-feedback-error text-rawmats-feedback-error"
                          : "text-rawmats-neutral-900"
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-3xl font-bold text-rawmats-accent-300">
                    ₱{product.price}
                  </p>
                </div>

                <div className="prose prose-sm">
                  <h3 className="text-lg font-semibold text-rawmats-text-700">
                    Description
                  </h3>
                  <p className="text-rawmats-neutral-900">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {product.verified ? (
                    <Badge
                      variant="default"
                      className="bg-rawmats-feedback-success"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="w-4 h-4 mr-1" />
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center text-sm text-rawmats-neutral-900 gap-2">
                  <TagIcon className="w-5 h-5 text-rawmats-accent-300" />
                  Added on {new Date(product.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
