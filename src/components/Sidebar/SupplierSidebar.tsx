"use client";

import * as React from "react";
import { ShoppingBag, ClipboardList, Bell, User } from "lucide-react";

import { NavMain } from "./SidebarMain";
import { NavUser } from "./SidebarUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavigationSwitcher } from "./NavigationSwitcher";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Products",
      url: "/supplier-dashboard/products",
      icon: ShoppingBag,
      isActive: true,
    },
    {
      title: "Manage Products",
      url: "/supplier-dashboard/manage-products",
      icon: ClipboardList,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
    },
  ],
};

type SupplierSidebarProps = React.ComponentProps<typeof Sidebar> & {
  isAdmin: boolean;
  isSupplier: boolean;
};

export function SupplierSidebar({
  isAdmin,
  isSupplier,
  ...props
}: SupplierSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props} className="shadow-xl">
      <SidebarHeader>
        <NavigationSwitcher isSupplier={isSupplier} isAdmin={isAdmin} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
