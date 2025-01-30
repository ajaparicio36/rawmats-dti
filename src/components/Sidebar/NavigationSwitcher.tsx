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
  accessRole,
}: {
  accessRole: Array<"admin" | "supplier">;
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const currentRoute: Record<string, string> = {
    "/": "Home",
    "/supplier-dashboard": "Supplier Dashboard",
    "/admin": "Admin Dashboard",
  };

  const routes = [
    { path: "/", label: "Home", logo: HouseIcon, name: "home" },
    {
      path: "/supplier-dashboard",
      label: "Supplier Dashboard",
      logo: GalleryVerticalEnd,
      name: "supplier",
    },
    { path: "/admin", label: "Admin Dashboard", logo: Command, name: "admin" },
  ];

  const activeRoute = routes.find((route) => route.path === pathname);

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
                {React.createElement(activeRoute!.logo, {
                  className: "size-4",
                })}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentRoute[pathname]}
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
            {routes.map(
              (route) =>
                // does not display routes that are not in the accessRole array
                (route.name === "home" ||
                  accessRole.includes(route.name as "admin" | "supplier")) && (
                  <DropdownMenuItem
                    key={route.path}
                    onClick={() => router.push(route.path)}
                    className={`gap-2 p-2 ${
                      pathname === route.path
                        ? "cursor-not-allowed bg-gray-200"
                        : "cursor-pointer"
                    }`}
                    disabled={pathname === route.path}
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <route.logo className="size-4 shrink-0" />
                    </div>
                    {route.label}
                  </DropdownMenuItem>
                ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
