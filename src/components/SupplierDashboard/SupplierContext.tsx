"use client";

import { createContext, useContext } from "react";
import { ProductWithSupplier } from "@/utils/Products";
import { Supplier } from "@prisma/client";

interface SupplierContextType {
  products: ProductWithSupplier[];
  supplier: Supplier;
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
  supplier,
  children,
}: {
  products: ProductWithSupplier[];
  supplier: Supplier;
  children: React.ReactNode;
}) {
  return (
    <SupplierContext.Provider value={{ products, supplier }}>
      {children}
    </SupplierContext.Provider>
  );
}
