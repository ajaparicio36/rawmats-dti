"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManageListings from "@/components/supplier-dashboard/contents/ManageListing";
import Notification from "@/components/supplier-dashboard/contents/Notification";
import ProductListingForm from "@/components/supplier-dashboard/contents/ProductForm";
import ProductList from "@/components/supplier-dashboard/contents/ProductList";
import { Product } from "@/types/types";
import {
  CubeIcon,
  FolderOpenIcon,
  BellIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

interface SupplierScreenProps {
  fetchedProducts: {
    id: string;
    name: string;
    supplierId: string;
    price: number;
    description: string;
    verified: boolean;
    verifiedDate: Date;
    dateAdded: Date;
    image?: string;
  }[];
  userID: string;
  supplierName: string;
}

const SupplierScreen: React.FC<SupplierScreenProps> = ({
  fetchedProducts,
  userID,
  supplierName,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [tabValue, setTabValue] = useState("products");

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[#B9EBFC] p-6 border-r">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#034169] flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {supplierName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#034169]">
              Welcome, {supplierName}!
            </h2>
            <p className="text-sm text-[#034169]/80">RawMats Supplier</p>
          </div>
        </div>

        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          orientation="vertical"
          className="flex-1"
        >
          <TabsList className="flex flex-col h-auto bg-transparent space-y-2">
            <Link
              href="/"
              className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              Home
            </Link>
            <TabsTrigger
              value="products"
              className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors justify-start w-full"
            >
              <CubeIcon className="w-5 h-5 mr-3" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="manage-products"
              className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors justify-start w-full"
            >
              <FolderOpenIcon className="w-5 h-5 mr-3" />
              Manage Products
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors justify-start w-full"
            >
              <BellIcon className="w-5 h-5 mr-3" />
              Notifications
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="bg-[#A3E6FD]/30 border-b px-8 py-6">
          <h1 className="text-2xl font-semibold text-[#034169]">Dashboard</h1>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsContent value="products" className="mt-0">
              <ProductListingForm
                onAddProduct={handleAddProduct}
                supplierId={userID}
              />
              <ProductList products={fetchedProducts} />
            </TabsContent>
            <TabsContent value="manage-products" className="mt-0">
              <ManageListings fetchedProducts={fetchedProducts} />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <Notification />
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#B9EBFC] border-t">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList className="flex justify-between items-center h-16 px-4 bg-transparent">
              <Link href="/" className="flex flex-col items-center">
                <HomeIcon className="w-6 h-6 text-[#034169]" />
              </Link>
              <TabsTrigger
                value="products"
                className="flex flex-col items-center"
              >
                <CubeIcon className="w-6 h-6" />
              </TabsTrigger>
              <TabsTrigger
                value="manage-products"
                className="flex flex-col items-center"
              >
                <FolderOpenIcon className="w-6 h-6" />
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex flex-col items-center"
              >
                <BellIcon className="w-6 h-6" />
              </TabsTrigger>
              <div className="w-8 h-8 rounded-full bg-[#034169] flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {supplierName.charAt(0).toUpperCase()}
                </span>
              </div>
            </TabsList>
          </Tabs>
        </nav>
      </main>
    </div>
  );
};

export default SupplierScreen;
