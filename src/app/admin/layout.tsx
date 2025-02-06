import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  // redirect if user is not an admin
  if (!user || (user && user.role !== "ADMIN")) {
    redirect("/");
  }

  const isSupplier = await prisma.supplier.findUnique({
    where: {
      userId: data.user.id,
    },
  });

  return (
    <section className="flex h-screen w-full bg-background">
      <AdminSidebar
        name={user.displayName}
        email={user.email}
        avatar={"" /* Implement after profile pages */}
        isSupplier={!!isSupplier}
      />
      {children}
    </section>
  );
}
