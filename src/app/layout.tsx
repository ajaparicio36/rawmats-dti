import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
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

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <section className="flex h-screen w-full bg-background">
            {children}
          </section>
        </SidebarProvider>
      </body>
    </html>
  );
}
