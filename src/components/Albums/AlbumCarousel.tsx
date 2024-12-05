import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AlbumPreviewCard from "./AlbumPreviewCard";

interface Album {
  id: string;
  name: string;
  favorites: Array<{ product: { id: string; name: string } }>;
}

interface AlbumCarouselProps {
  albums: Album[];
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {albums.map((album) => (
          <AlbumPreviewCard
            key={album.id}
            id={album.id}
            name={album.name}
            favorites={album.favorites}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden sm:flex" />
    </ScrollArea>
  );
};

export default AlbumCarousel;
