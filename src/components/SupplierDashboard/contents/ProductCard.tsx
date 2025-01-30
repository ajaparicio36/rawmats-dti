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
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  verified,
}) => {
  return (
    <Card className="w-60 overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-60 w-full overflow-hidden bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        )}
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-semibold truncate">
            {name}
          </CardTitle>
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
