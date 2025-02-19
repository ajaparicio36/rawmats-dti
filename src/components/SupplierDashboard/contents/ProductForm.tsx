"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadProductImage } from "@/utils/supabase/product";
import ImageCropper from "./ImageCropper";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  supplierId: string;
}

export default function ProductForm({ supplierId }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [packaging, setPackaging] = useState("");
  // const [weight, setWeight] = useState("");
  const [stocks, setStocks] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);

  const router = useRouter();

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

      const fullDescription = `Packaging: ${packaging}\n Stocks: ${stocks}\nDescription: ${longDescription}`;
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
      resetForm();
      router.refresh();
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

  const handleCropComplete = async (croppedImage: Blob) => {
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
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setPackaging("");
    // setWeight("");
    setStocks("");
    setLongDescription("");
    setImage(null);
    setShowForm(false);
    setShowCropper(false);
    setCropImage(null);
  };

  return (
    <>
      <Button
        onClick={() => setShowForm(true)}
        className="bg-blue-400 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        + Add Product
      </Button>

      {showForm && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md" />
          <DialogContent className="bg-gray-50 p-6 rounded-3xl shadow-2xl w-full max-w-md space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="productName" className="text-black">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-black">
                  Product Description
                </Label>
                <textarea
                  id="description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Describe the product"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all resize-none"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="price" className="text-black">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                  />
                </div>
                <div>
                  <Label htmlFor="stocks" className="text-black">
                    Available Stocks
                  </Label>
                  <Input
                    id="stocks"
                    value={stocks}
                    onChange={(e) => setStocks(e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                  />
                </div>
              </div>

              {/* Weight
              <div>
                <Label htmlFor="weight" className="text-black">
                  Weight/Size (if applicable)
                </Label>
                <Input
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
              </div> */}

              <div>
                <Label htmlFor="packaging" className="text-black ">
                  Packaging Type
                </Label>
                <Input
                  id="packaging"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  required
                  className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
              </div>

              <div>
                <Label htmlFor="image" className="text-black">
                  Upload Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-gray-400 rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
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
