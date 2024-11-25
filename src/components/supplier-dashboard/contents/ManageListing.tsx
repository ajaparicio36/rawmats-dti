"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  verified: boolean;
}

const ManageListings = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-800">{product.description}</p>
              <p>
                Status: {product.verified ? "Verified" : "Pending Verification"}
              </p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default ManageListings;
