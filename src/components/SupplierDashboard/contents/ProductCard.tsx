"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Supplier } from "@prisma/client";

interface ProductCardProps {
  id: string;
  name: string;
  supplier: Supplier;
  price: number;
  image: string;
  verified: boolean;
  description: string;
  packaging: string;
  stocks: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  verified,
  description,
  packaging,
  stocks,
}) => {
  return (
    <Card className="w-60 overflow-hidden transition-shadow hover:shadow-xl shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-white-100 rounded-lg p-2">
        {image && (
          <Image
            src={image}
            alt={name}
            width={280}
            height={180}
            style={{ objectFit: "contain" }}
            loading="lazy"
            className="rounded-lg"
          />
        )}
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-bold truncate">{name}</CardTitle>
          <Badge variant={verified ? "default" : "secondary"}>
            {verified ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="text-rawmats-primary-300">
            ₱{price.toFixed(2)}
          </Badge>
        </div>
        <div className="text-sm text-gray-600">
          <div>{description}</div>
          <div>{packaging}</div>
          <div>{stocks}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
