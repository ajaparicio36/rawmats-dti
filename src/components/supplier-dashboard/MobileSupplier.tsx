"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManageListings from "@/components/supplier-dashboard/contents/ManageListing";
import Notification from "@/components/supplier-dashboard/contents/Notification";
import ProductListingForm from "@/components/supplier-dashboard/contents/ProductForm";
import ProductList from "@/components/supplier-dashboard/contents/ProductList";
import { Product } from "@/types/types";

const MobileSupplier = ({
  fetchedProducts,
  userID,
}: {
  fetchedProducts: {
    id: string;
    name: string;
    supplierId: string;
    price: number;
    description: string;
    verified: boolean;
    verifiedDate: Date;
    dateAdded: Date;
  }[];
  userID: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="create-listing" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create-listing">Create Listing</TabsTrigger>
          <TabsTrigger value="manage-listing">Manage Listings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="create-listing">
          <ProductListingForm
            onAddProduct={handleAddProduct}
            supplierId={userID}
          />
          <ProductList products={fetchedProducts} />
        </TabsContent>

        <TabsContent value="manage-listing">
          <ManageListings />
        </TabsContent>

        <TabsContent value="notifications">
          <Notification />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileSupplier;
