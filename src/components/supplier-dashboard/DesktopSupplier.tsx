'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import ManageListings from "@/components/supplier-dashboard/contents/ManageListing";
import Notification from "@/components/supplier-dashboard/contents/Notification";
import ProductListingForm from "@/components/supplier-dashboard/contents/ProductForm";
import ProductList from "@/components/supplier-dashboard/contents/ProductList";
import { useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";

const DesktopSupplier = ({ fetchedProducts, userID } : { fetchedProducts: {
  id: string;
  name: string;
  supplierId: string;
  price: number;
  description: string;
  verified: boolean;
  verifiedDate: Date;
  dateAdded: Date;
}[],
  userID: string
}) => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [tabValue, setTabValue] = useState("create-listing");

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="min-h-screen w-full flex"> 
      <div className="w-64 bg-gray-100 p-4 sticky top-0 left-0 h-screen"> 
        
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo.png"  
            alt="Logo"
            width={150}      
            height={50}       
          />
        </div>

        <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4 flex flex-col">
          {/* Sidebar Tabs */}
          <TabsList className="space-y-1 flex flex-col">
            <TabsTrigger value="create-listing" className="text-left p-2 mt-12 hover:bg-gray-200 rounded-md">Create Listing</TabsTrigger>
            <TabsTrigger value="manage-listing" className="text-left p-2 hover:bg-gray-200 rounded-md">Manage Listings</TabsTrigger>
            <TabsTrigger value="notifications" className="text-left p-2 hover:bg-gray-200 rounded-md">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 p-6"> 
        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsContent value="create-listing">
            <ProductListingForm onAddProduct={handleAddProduct} supplierId={userID} />
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
    </div>
  );
};

export default DesktopSupplier;
