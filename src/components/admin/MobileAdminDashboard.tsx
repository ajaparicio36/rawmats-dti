"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Package, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../public/logo.png";

const MobileAdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 bg-card border-b">
        <Image
          src={logo}
          alt="RAWMATS Logo"
          width={100}
          height={32}
          className="max-w-full h-auto self-center"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-4 border-b">
              <Image
                src="/placeholder.svg"
                alt="RAWMATS Logo"
                width={150}
                height={50}
                className="max-w-full h-auto"
              />
            </div>
            <Tabs
              defaultValue="email"
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
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="email" className="w-full">
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

export default MobileAdminDashboard;
