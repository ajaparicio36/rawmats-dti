"use client";

import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
  ShoppingBag,
  ClipboardList,
  Bell,
  User,
} from "lucide-react";

import { NavMain } from "./SidebarMain";
import { NavProjects } from "./SidebarNavigation";
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
      url: "/supplier-dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavigationSwitcher isAdmin={isAdmin} isSupplier={isSupplier} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name, email, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
