"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Star,
  PoundSterlingIcon as PhilippinePeso,
  Building,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductPreview } from "@/utils/Products";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddToAlbumDialog } from "@/components/Albums/AddToAlbumDialog";

interface Album {
  id: string;
  name: string;
}

interface FavoritePreviewCardProps extends ProductPreview {
  albums: Album[];
}

const FavoritePreviewCard: React.FC<FavoritePreviewCardProps> = ({
  userId,
  id,
  name,
  supplier,
  price,
  albums,
}) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [locationName, setLocationName] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleRemoveFavorite = async () => {
    setIsAlertOpen(true);
  };

  const confirmRemoveFavorite = async () => {
    try {
      await fetch(`/api/product/${id}/favorite/${userId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

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
    <Card className="w-full max-w-md overflow-hidden cursor-pointer transition-shadow hover:shadow-md">
      <div
        onClick={onClickComponent}
        className="h-48 w-full overflow-hidden bg-gray-100"
      >
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleRemoveFavorite}
                  >
                    Remove from Favorites
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the item from your favorites. This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmRemoveFavorite}
                      className="bg-rawmats-primary-500 text-white hover:bg-rawmats-primary-700"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AddToAlbumDialog
                userId={userId}
                productId={id}
                albums={albums}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent onClick={onClickComponent} className="p-4 pt-0">
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

export default FavoritePreviewCard;
