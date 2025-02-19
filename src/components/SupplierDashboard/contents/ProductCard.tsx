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
import { ChevronDown, Info } from "lucide-react";
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
    <Card className="w-64 overflow-hidden transition-shadow hover:shadow-3xl shadow-lg bg-white rounded-2xl border border-gray-300">
      <div className="relative h-40 w-full bg-gray-100 flex items-center justify-center rounded-t-2xl overflow-hidden shadow-md p-1">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={200}
            height={300}
            className="object-cover w-full h-full rounded-lg hover:scale-105 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold truncate text-gray-900">
            {name}
          </CardTitle>
          <Badge
            variant="outline"
            className={`border px-2 py-0.5 text-xs font-medium rounded-md ${verified ? "border-blue-600 text-blue-600 bg-blue-100" : "border-gray-400 text-gray-500 bg-gray-100"}`}
          >
            {verified ? "✔ Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex justify-between items-center">
        <Badge className="bg-gray-200 text-gray-900 px-3 py-1 text-sm font-medium rounded-md shadow-md">
          ₱{price.toFixed(2)}
        </Badge>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-gray-500 hover:border-gray-700 transition-all shadow-md"
            >
              <ChevronDown size={18} className="text-gray-800" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-72 p-5 text-sm bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300">
            <div className="flex flex-col space-y-2">
              {(() => {
                let lines: string[] = description
                  .split("\n")
                  .map((line) => line.replace(/^Description:\s*/, ""));

                if (lines.length > 1) {
                  const lastItem = lines.pop();
                  if (lastItem) {
                    lines = [lastItem, ...lines];
                  }
                }

                return lines.map((line, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-3 py-1 flex items-center space-x-2 hover:bg-gray-100 transition-all rounded-md"
                  >
                    <Info size={14} className="text-blue-700" />
                    <p className="text-gray-800 text-xs font-medium leading-tight">
                      {line}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
