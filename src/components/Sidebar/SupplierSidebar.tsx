"use client";

import * as React from "react";
import {
  AudioWaveform,
  GalleryVerticalEnd,
  Command,
  ShoppingBag,
  ClipboardList,
  Bell,
  User,
} from "lucide-react";

import { NavMain } from "./SidebarMain";
import { NavUser } from "./SidebarUser";
import { TeamSwitcher } from "./NavigationSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Home",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Products",
      url:  "/supplier-dashboard/products",
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

export function SupplierSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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