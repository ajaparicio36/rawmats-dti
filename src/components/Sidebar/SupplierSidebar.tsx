"use client";

import * as React from "react";

import { SquareTerminal } from "lucide-react";

import { NavMain } from "./SidebarMain";
import { NavUser } from "./SidebarUser";
import { NavigationSwitcher } from "./NavigationSwitcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Supplier",
      url: "/supplier-dashboard",
      icon: SquareTerminal,

      isActive: true,
      items: [
        // {
        //   title: "Products",
        //   url: "/supplier-dashboard/products",
        // },
        {
          title: "Manage Products",
          url: "/supplier-dashboard/manage-products",
        },
        {
          title: "Notifications",
          url: "/supplier-dashboard/notifications",
        },
      ],
    },
  ],
};

interface SupplierSidebarProps extends React.ComponentProps<typeof Sidebar> {
  name: string;
  email: string;
  avatar: string;
  isSupplier?: boolean;
  isAdmin?: boolean;
}

export function SupplierSidebar({
  name,
  email,
  avatar,
  isSupplier,
  isAdmin,

  ...props
}: SupplierSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="shadow-xl shadow-gray-500/40"
      {...props}
    >
      <SidebarHeader>
        <NavigationSwitcher isAdmin={isAdmin} isSupplier={isSupplier} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name, email, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
