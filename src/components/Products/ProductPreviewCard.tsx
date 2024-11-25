"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MapPin, Star, PhilippinePeso, Building } from "lucide-react";
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
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/product/${id}/image`, {
          next: {
            revalidate: 3600,
          },
          cache: "force-cache",
        });
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

  useEffect(() => {
    const fetchLocationName = async () => {
      if (supplier.businessLocation.includes("google.com/maps")) {
        try {
          const response = await fetch(`/api/supplier/location`, {
            method: "POST",
            body: JSON.stringify({ locationLink: supplier.businessLocation }),
          });
          const { locationName } = await response.json();
          setLocationName(locationName);
        } catch (error) {
          console.error("Error fetching location name:", error);
          setLocationName(supplier.businessLocation);
        }
      } else {
        setLocationName(supplier.businessLocation);
      }
    };
    fetchLocationName();
  }, [supplier.businessLocation]);

  const onClickComponent = () => {
    router.push(`/product/${id}`);
  };

  return (
    <Card
      onClick={onClickComponent}
      className="w-full max-w-md overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
    >
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image
            width={512}
            height={192}
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">
            {name}
            <div className="flex text-gray-500 items-center text-sm mb-2">
              <MapPin strokeWidth={2.5} className="w-4 h-4 mr-1" />
              <span className="truncate">{locationName}</span>
            </div>
          </CardTitle>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex text-rawmats-primary-300 items-center text-sm mb-2">
          <PhilippinePeso strokeWidth={2.5} className="w-4 h-4 mr-1" />
          <span>{price}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Building className="w-4 h-4 mr-1" />
          <span>{supplier.businessName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Star className="w-4 h-4 mr-1 text-yellow-500" />
          <span>0.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPreviewCard;
