import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeSidebar } from "@/components/Sidebar/HomeSidebar";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RawMats",
  description: "Browse and buy raw materials for your business",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const supplier = await prisma.supplier.findUnique({
    where: {
      userId: data.user.id,
      verified: true,
    },
  });

  const isAdmin = user.role === "ADMIN";

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <section className="flex h-screen w-full bg-background">
            <HomeSidebar
              name={user.displayName}
              email={user.email}
              avatar={"" /* Implement after profile pages */}
              isSupplier={!!supplier}
              isAdmin={isAdmin}
            />
            {children}
          </section>
        </SidebarProvider>
      </body>
    </html>
  );
}
