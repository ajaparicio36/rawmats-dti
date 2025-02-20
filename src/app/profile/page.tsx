import React, { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";
import SupplierScreen from "@/components/SupplierDashboard/SupplierScreen";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import LoadingModal from "@/components/Loading/LoadingModal";

const ProfilePage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/");
  }

  const supplier = await prisma.supplier.findUnique({
    where: {
      userId: data.user.id,
      verified: true,
    },
    include: {
      user: true,
      products: {
        include: {
          supplier: true,
        },
      },
    },
  });

  if (!supplier) {
    redirect("/");
  }

  return (
    <SupplierScreen
      supplier={supplier}
      adminRole={supplier.user.role === "ADMIN"}
      initialProducts={supplier.products || []}
    >
      <div className="flex justify-center items-center sm:p-8 p-3 w-full overflow-visible">
        <Suspense fallback={<LoadingModal />}>
          <div>
            <ProfileDetails supplier={supplier} />
          </div>
        </Suspense>
      </div>
    </SupplierScreen>
  );
};

export default ProfilePage;
