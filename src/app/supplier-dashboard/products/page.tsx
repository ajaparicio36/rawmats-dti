"use client";

import React from "react";
import ProductList from "@/components/SupplierDashboard/contents/ProductList";
import { useSupplier } from "@/components/SupplierDashboard/SupplierContext";

const ProductsPage = () => {
  const { products } = useSupplier();

  return <ProductList products={products} />;
};

export default ProductsPage;
