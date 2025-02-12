"use client";

import { createContext, useContext } from "react";
import { ProductWithSupplier } from "@/utils/Products";

interface SupplierContextType {
  products: ProductWithSupplier[];
}

export const SupplierContext = createContext<SupplierContextType | undefined>(
  undefined,
);

export function useSupplier() {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
}

export default function SupplierProvider({
  products,
  children,
}: {
  products: ProductWithSupplier[];
  children: React.ReactNode;
}) {
  return (
    <SupplierContext.Provider value={{ products }}>
      {children}
    </SupplierContext.Provider>
  );
}
