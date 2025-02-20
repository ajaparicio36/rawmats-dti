"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CircleUser,
  Building,
  ShieldEllipsis,
  Flag,
  Heart,
  Home,
  LogOut,
} from "lucide-react";
import { logout } from "../AuthHandlers/LoginHandler";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import type { User, Supplier } from "@prisma/client";

interface SidebarProps {
  user: User;
  supplier: Supplier | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HomeSidebar({
  user,
  supplier,
  open,
  onOpenChange,
}: SidebarProps) {
  const router = useRouter();
  const isSupplier = !!supplier;
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const logoutUser = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error(error);
      router.push(
        `/error?message=${encodeURIComponent("An unexpected error occurred")}&code=500`,
      );
    }
  };

  const navItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Profile", icon: CircleUser, url: "/profile" },
    { title: "Favorites", icon: Heart, url: "/favorites" },
    ...(isSupplier
      ? [
          {
            title: "Supplier Dashboard",
            icon: Building,
            url: "/supplier-dashboard",
          },
        ]
      : [
          {
            title: "Apply as a Supplier",
            icon: Building,
            url: "/apply-supplier",
          },
        ]),
    ...(user.role === "ADMIN"
      ? [{ title: "Admin Dashboard", icon: ShieldEllipsis, url: "/admin" }]
      : []),
    { title: "Report an Issue", icon: Flag, url: "/report" },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-4 text-left border-b">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.displayName}`}
                  alt={user.displayName}
                />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {user.displayName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-1 border-b">
              <div className="grid gap-1 p-2">
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => {
                      router.push(item.url);
                      onOpenChange(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
                onClick={() => setIsAlertOpen(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
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
            <AlertDialogAction onClick={logoutUser}>Log out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
