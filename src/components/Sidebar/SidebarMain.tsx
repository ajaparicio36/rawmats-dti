"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useSupplier } from "../SupplierDashboard/SupplierContext";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const router = useRouter();
  const { supplier } = useSupplier();

  const { data: notifCount = 0 } = useSWR<number>(
    `/api/notification/read/${supplier.userId}`,
    fetcher,
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              onClick={() => {
                router.push(item.url);
              }}
            >
              <div className="relative">
                {item.title === "Notifications" && notifCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    {notifCount}
                  </span>
                )}
                <item.icon className="size-5" />
              </div>
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
