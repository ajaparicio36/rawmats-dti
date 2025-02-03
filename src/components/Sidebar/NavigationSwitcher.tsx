"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  HouseIcon,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavigationSwitcher({
  isAdmin = false,
  isSupplier = false,
}: {
  isAdmin?: boolean;
  isSupplier?: boolean;
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {pathname === "/" && <HouseIcon className="size-4" />}
                {pathname === "/supplier-dashboard" && (
                  <GalleryVerticalEnd className="size-4" />
                )}
                {pathname.startsWith("/admin") && (
                  <Command className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {pathname === "/" && "Home"}
                  {pathname === "/supplier-dashboard" && "Supplier Dashboard"}
                  {pathname.startsWith("/admin") && "Admin Dashboard"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className={`gap-2 p-2 ${
                pathname === "/"
                  ? "cursor-not-allowed bg-gray-200"
                  : "cursor-pointer"
              }`}
              disabled={pathname === "/"}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <HouseIcon className="size-4 shrink-0" />
              </div>
              Home
            </DropdownMenuItem>

            {isSupplier && (
              <DropdownMenuItem
                onClick={() => router.push("/supplier-dashboard")}
                className={`gap-2 p-2 ${
                  pathname === "/supplier-dashboard"
                    ? "cursor-not-allowed bg-gray-200"
                    : "cursor-pointer"
                }`}
                disabled={pathname === "/supplier-dashboard"}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <GalleryVerticalEnd className="size-4 shrink-0" />
                </div>
                Supplier Dashboard
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem
                onClick={() => router.push("/admin")}
                className={`gap-2 p-2 ${
                  pathname.startsWith("/admin")
                    ? "cursor-not-allowed bg-gray-200"
                    : "cursor-pointer"
                }`}
                disabled={pathname.startsWith("/admin")}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Command className="size-4 shrink-0" />
                </div>
                Admin
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
