"use client";
import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/types";
import { uploadProductImage } from "@/utils/supabase/product";
import ImageCropper from "./ImageCropper";

export default function ProductListingForm({
  onAddProduct,
  supplierId,
}: {
  onAddProduct: (product: Product) => void;
  supplierId: string;
}) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [packaging, setPackaging] = useState("");
  const [stocks, setStocks] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let imagePath = null;
      if (image) {
        const fileName = `${supplierId}-${productName}-${Date.now()}.jpg`;
        imagePath = await uploadProductImage(image, fileName);
      }
      const fullDescription = `Packaging: ${packaging}\nStocks: ${stocks}\nDescription: ${longDescription}`;
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          description: fullDescription,
          price,
          supplierId,
          image: imagePath,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error creating product");
      }
      const product = await response.json();
      onAddProduct(product);
      resetForm();
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

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setPackaging("");
    setStocks("");
    setLongDescription("");
    setImage(null);
    setShowForm(false);
    setShowCropper(false);
    setCropImage(null);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-20">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-300 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500"
          aria-label="Add New Product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>
      {showForm && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
          <DialogContent className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-lg max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
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
                <Label htmlFor="packaging">Packaging</Label>
                <Input
                  id="packaging"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="stocks">Stocks</Label>
                <Input
                  id="stocks"
                  type="number"
                  value={stocks}
                  onChange={(e) => setStocks(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="longDescription">Description</Label>
                <textarea
                  id="longDescription"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
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
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-300 text-white"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
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
    </>
  );
}
