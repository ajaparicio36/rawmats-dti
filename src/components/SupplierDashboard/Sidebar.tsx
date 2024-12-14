"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CubeIcon,
  FolderOpenIcon,
  BellIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { logout } from "../AuthHandlers/LoginHandler";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface SidebarComponentProps {
  supplierName: string;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  supplierName,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const logoutUser = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
      router.push(
        `/error?message=${encodeURIComponent("An unexpected error occurred")}&code=500`,
      );
    }
  };

  return (
    <Sidebar className="hidden md:flex h-screen border-r bg-[#B9EBFC]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="space-y-4 p-6">
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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/supplier-dashboard"}
                >
                  <Link
                    href="/supplier-dashboard"
                    className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <HomeIcon className="w-5 h-5 mr-3" />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/supplier-dashboard/products"}
                >
                  <Link
                    href="/supplier-dashboard/products"
                    className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <CubeIcon className="w-5 h-5 mr-3" />
                    Products
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/supplier-dashboard/manage-products"}
                >
                  <Link
                    href="/supplier-dashboard/manage-products"
                    className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <FolderOpenIcon className="w-5 h-5 mr-3" />
                    Manage Products
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/supplier-dashboard/notifications"}
                >
                  <Link
                    href="/supplier-dashboard/notifications"
                    className="flex items-center px-4 py-2 text-[#034169] hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <BellIcon className="w-5 h-5 mr-3" />
                    Notifications
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-[#034169] hover:text-green-500 hover:bg-green-100"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="mr-2" />
          Go Back to Home
        </Button>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <LogOut className="mr-2" />
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be redirected to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logoutUser}>
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
