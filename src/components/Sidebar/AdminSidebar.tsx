"use client";

import * as React from "react";
import { UserRoundPen, Package, ChartArea } from "lucide-react";

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
import { usePathname, useRouter } from "next/navigation";

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  name: string;
  email: string;
  avatar: string;
  isSupplier?: boolean;
}

export function AdminSidebar({
  name,
  email,
  avatar,
  isSupplier,
  ...props
}: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavigationSwitcher isAdmin={true} isSupplier={isSupplier} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/admin")}
                disabled={pathname === "/admin"}
                className={pathname === "/admin" ? "bg-gray-200" : ""}
              >
                <ChartArea />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/admin/verification/supplier")}
                disabled={pathname === "/admin/verification/supplier"}
                className={
                  pathname === "/admin/verification/supplier"
                    ? "bg-gray-200"
                    : ""
                }
              >
                <UserRoundPen />
                <span>Supplier Verification</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/admin/verification/item")}
                disabled={pathname === "/admin/verification/item"}
                className={
                  pathname === "/admin/verification/item" ? "bg-gray-200" : ""
                }
              >
                <Package />
                <span>Product Verification</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name, email, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
