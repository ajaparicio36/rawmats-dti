"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ManageListings = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Product A",
        price: 100,
        description: "Description for Product A",
      },
      {
        id: 2,
        name: "Product B",
        price: 150,
        description: "Description for Product B",
      },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-800">{product.description}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default ManageListings;
