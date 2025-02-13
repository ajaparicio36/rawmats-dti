"use client";

import * as React from "react";
import {
  CircleUser,
  Heart,
  Home,
  ShoppingCart,
  Settings,
  HelpCircle,
  LogOut,
  Building,
  ShieldEllipsis,
  Flag,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { NavUser } from "./SidebarUser";
import { NavigationSwitcher } from "./NavigationSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

import { logout } from "../AuthHandlers/LoginHandler";

interface HomeSidebarProps extends React.ComponentProps<typeof Sidebar> {
  name: string;
  email: string;
  avatar: string;
  isSupplier?: boolean;
  isAdmin?: boolean;
}

export function HomeSidebar({
  name,
  email,
  avatar,
  isSupplier,
  isAdmin,
  ...props
}: HomeSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavigationSwitcher isAdmin={isAdmin} isSupplier={isSupplier} />
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/")}
                disabled={pathname === "/"}
                className={pathname === "/" ? "bg-gray-200" : ""}
              >
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/favorites")}
                disabled={pathname === "/favorites"}
                className={pathname === "/favorites" ? "bg-gray-200" : ""}
              >
                <Heart />
                <span>Favorites</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/orders")}
                disabled={pathname === "/orders"}
                className={pathname === "/orders" ? "bg-gray-200" : ""}
              >
                <ShoppingCart />
                <span>Orders</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/profile")}
                disabled={pathname === "/profile"}
                className={pathname === "/profile" ? "bg-gray-200" : ""}
              >
                <CircleUser />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/settings")}
                disabled={pathname === "/settings"}
                className={pathname === "/settings" ? "bg-gray-200" : ""}
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Supplier/Admin Section */}
        {isSupplier ? (
          <SidebarGroup>
            <SidebarGroupLabel>Supplier</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/supplier-dashboard")}
                  disabled={pathname === "/supplier-dashboard"}
                  className={
                    pathname === "/supplier-dashboard" ? "bg-gray-200" : ""
                  }
                >
                  <Building />
                  <span>Supplier Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Become a Supplier</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/apply-supplier")}
                  disabled={pathname === "/apply-supplier"}
                  className={
                    pathname === "/apply-supplier" ? "bg-gray-200" : ""
                  }
                >
                  <Building />
                  <span>Apply as a Supplier</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/admin")}
                  disabled={pathname === "/admin"}
                  className={pathname === "/admin" ? "bg-gray-200" : ""}
                >
                  <ShieldEllipsis />
                  <span>Admin Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Support Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/help")}
                disabled={pathname === "/help"}
                className={pathname === "/help" ? "bg-gray-200" : ""}
              >
                <HelpCircle />
                <span>Help Center</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/report")}
                disabled={pathname === "/report"}
                className={pathname === "/report" ? "bg-gray-200" : ""}
              >
                <Flag />
                <span>Report an Issue</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter>
        <NavUser user={{ name, email, avatar }} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsAlertOpen(true)}
              className="text-red-600 hover:text-red-600 hover:bg-red-100"
            >
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Sidebar Rail */}
      <SidebarRail />

      {/* Logout Confirmation Dialog */}
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
    </Sidebar>
  );
}
