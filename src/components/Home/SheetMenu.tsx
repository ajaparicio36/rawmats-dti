"use client";

import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { User, Supplier } from "@prisma/client";
import { logout } from "../AuthHandlers/LoginHandler";

interface SheetMenuProps {
  user: User;
  supplier: Supplier | null;
}

export function SheetMenu({ user, supplier }: SheetMenuProps) {
  const router = useRouter();
  const isSupplier = !!supplier;
  console.log(supplier);

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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-rawmats-primary-900 hover:bg-rawmats-secondary-500"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.displayName}`}
              />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.displayName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex space-x-2 mt-2">
                {isSupplier && <Badge>Supplier</Badge>}
                {user.role === "ADMIN" && (
                  <Badge variant="destructive">Admin</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="space-y-4 mt-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/profile")}
          >
            Profile
          </Button>
          {isSupplier && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/supplier-dashboard")}
            >
              Supplier Dashboard
            </Button>
          )}
          {user.role === "ADMIN" && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/admin")}
            >
              Admin Dashboard
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
