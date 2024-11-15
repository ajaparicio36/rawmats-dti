'use client';

import { useState } from 'react';
import ProductListingForm from '@/components/supplier-dashboard/ProductForm';
import ProductList from '@/components/supplier-dashboard/ProductList';
import { Product } from '@/types/types';

export default function CreateListingPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="p-6">
      <ProductListingForm onAddProduct={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
}
