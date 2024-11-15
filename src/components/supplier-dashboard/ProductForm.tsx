'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'; 
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 
import { Product } from '@/types/types'; 

export default function ProductListingForm({ onAddProduct }: { onAddProduct: (product: Product) => void }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      name: productName,
      price: parseFloat(price),
      description,
      image: image ? URL.createObjectURL(image) : null,
    };

    onAddProduct(newProduct);

    setProductName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setShowForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <>
      <Button onClick={() => setShowForm(true)} className="bg-blue-500 text-white py-2 px-4 rounded">
        Add New Product
      </Button>

      {showForm && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
          <DialogContent className="bg-white p-6 rounded shadow-md w-full max-w-md md:max-w-lg mx-auto my-6 md:my-20">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 text-white">
                  Submit
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
