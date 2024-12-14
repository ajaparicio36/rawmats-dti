import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Point, Area } from "react-easy-crop";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: Blob) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, onCropComplete]);

  return (
    <div className="relative w-full">
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-700 font-medium">Cropping Tips:</p>
        <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
          <li>
            Desktop: Use your mouse to drag the image and resize the crop area.
          </li>
          <li>
            Mobile: Use your finger to move the image within the crop area.
          </li>
          <li>
            Pinch to zoom in/out on both desktop (with trackpad) and mobile.
          </li>
          <li>The crop area is locked to a 4:3 ratio for optimal display.</li>
        </ul>
      </div>
      <div className="relative h-96 w-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={createCroppedImage}>Confirm Crop</Button>
      </div>
    </div>
  );
};

export default ImageCropper;

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, "image/jpeg");
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
