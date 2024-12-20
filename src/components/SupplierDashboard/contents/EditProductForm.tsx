"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { uploadProductImage } from "@/utils/supabase/product";
import ImageCropper from "./ImageCropper";
import { ProductWithSupplier } from "@/utils/Products";

interface EditProductFormProps {
  product: ProductWithSupplier;
  onClose: () => void;
  onEdit: (updatedProduct: ProductWithSupplier) => void;
}

export default function EditProductForm({
  product,
  onClose,
  onEdit,
}: EditProductFormProps) {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagePath = product.image;
      if (image) {
        const fileName = `${product.supplierId}-${productName}-${Date.now()}.jpg`;
        imagePath = await uploadProductImage(image, fileName);
      }

      const response = await fetch(`/api/product/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          description,
          price,
          supplierId: product.supplierId,
          image: imagePath,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error updating product");
      }

      const updatedProduct = await response.json();
      onEdit(updatedProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setCropImage(e.target.result);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = useCallback(async (croppedImage: Blob) => {
    try {
      const formData = new FormData();
      formData.append("image", croppedImage, "cropped_image.jpg");
      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error processing image");
      }
      const processedImageBlob = await response.blob();
      setImage(
        new File([processedImageBlob], "processed_image.jpg", {
          type: "image/jpeg",
        }),
      );
      setShowCropper(false);
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Error processing image. Please try again.");
    }
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md w-full p-2 max-h-[150px]"
              rows={5}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
      {showCropper && cropImage && (
        <Dialog open={showCropper} onOpenChange={setShowCropper}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
          <DialogContent className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Crop Image</h2>
            <ImageCropper
              image={cropImage}
              onCropComplete={handleCropComplete}
              onCancel={() => setShowCropper(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
