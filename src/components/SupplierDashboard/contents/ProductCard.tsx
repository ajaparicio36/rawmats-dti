import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Supplier } from "@prisma/client";

interface ProductCardProps {
  id: string;
  name: string;
  supplier: Supplier;
  price: number;
  image: string;
  verified: boolean;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  verified,
  description,
}) => {
  return (
    <Card className="w-64 overflow-hidden transition-shadow hover:shadow-lg shadow-md bg-gray-50 rounded-xl">
      <div className="relative h-40 w-[calc(100%-1rem)] bg-gray-100 flex items-center justify-center rounded-xl m-2">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={250}
            height={160}
            className="object-cover w-full h-full rounded-xl"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold truncate">
            {name}
          </CardTitle>
          <Badge
            variant="outline"
            className={`border px-2 py-0.5 text-xs font-medium rounded-md ${verified ? "border-blue-500 text-blue-500" : "border-gray-400 text-gray-400"}`}
          >
            {verified ? "✔ Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex justify-between items-center">
        <Badge className="bg-blue-100 text-blue-600 px-3 py-1 text-sm font-medium rounded-md">
          ₱{price.toFixed(2)}
        </Badge>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-200 shadow hover:bg-gray-300 transition"
            >
              <ChevronDown size={18} className="text-gray-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4 text-sm bg-white shadow-md rounded-lg">
            <p className="text-gray-700">{description}</p>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
