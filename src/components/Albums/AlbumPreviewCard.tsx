import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface AlbumPreviewCardProps {
  id: string;
  name: string;
  favorites: Array<{ product: { id: string; name: string } }>;
}

const AlbumPreviewCard: React.FC<AlbumPreviewCardProps> = ({
  id,
  name,
  favorites,
}) => {
  return (
    <Card className="w-full max-w-md overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {favorites.slice(0, 3).map(({ product }) => (
            <div
              key={product.id}
              className="aspect-square overflow-hidden rounded"
            >
              <Image
                width={100}
                height={100}
                src={`/api/product/${product.id}/image`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {[...Array(Math.max(0, 3 - favorites.length))].map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded" />
          ))}
        </div>
        <Link
          href={`/album/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View Album
        </Link>
      </CardContent>
    </Card>
  );
};

export default AlbumPreviewCard;
