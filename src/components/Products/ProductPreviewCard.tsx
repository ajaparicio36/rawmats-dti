"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductPreview } from "@/utils/Products";

const ProductPreviewCard: React.FC<ProductPreview> = ({
  id,
  name,
  supplier,
  price,
}) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/product/${id}/image`);
        const data = await response.json();
        setImageUrl(data.signedUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [id]);

  const onClickComponent = () => {
    router.push(`/product/${id}`);
  };

  return (
    <Card
      onClick={onClickComponent}
      className="w-64 h-80 overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
    >
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image
            width={256}
            height={192}
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">
            {name}
          </CardTitle>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-blue-600 font-medium mb-2">₱ {price}</p>
        <p className="text-gray-500 text-sm truncate">
          {supplier.businessName}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductPreviewCard;
