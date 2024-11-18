"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Package } from "lucide-react";
import logo from "../../public/logo.png";
import { useState } from "react";

const DesktopAdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("email");

  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="flex flex-col w-64 bg-card border-r">
        <div className="p-4 border-b self-center">
          <Image
            src={logo}
            alt="RAWMATS Logo"
            width={150}
            height={50}
            className="max-w-full h-auto"
          />
        </div>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          orientation="vertical"
          className="flex-1"
        >
          <TabsList className="flex flex-col w-full h-auto">
            <TabsTrigger value="email" className="justify-start mb-2">
              <Mail className="mr-2 h-4 w-4" />
              Email Verification
            </TabsTrigger>
            <TabsTrigger value="item" className="justify-start">
              <Package className="mr-2 h-4 w-4" />
              Item Verification
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsContent value="email">
            <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
            <p>Email verification content will be displayed here.</p>
          </TabsContent>
          <TabsContent value="item">
            <h2 className="text-2xl font-bold mb-4">Item Verification</h2>
            <p>Item verification content will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DesktopAdminDashboard;
