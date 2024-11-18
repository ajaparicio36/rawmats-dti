import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const DesktopSignup = dynamic(
  () => import("@/components/apply-supplier/DesktopSignup"),
  {
    loading: () => <p>Loading desktop signup...</p>,
    ssr: true,
  },
);

const MobileSignup = dynamic(
  () => import("@/components/apply-supplier/MobileSignup"),
  {
    loading: () => <p>Loading mobile signup...</p>,
    ssr: true,
  },
);

const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
const mapId = process.env.GOOGLE_MAPS_MAP_ID as string;

export default async function ApplySupplier() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:block">
          <DesktopSignup apiKey={API_KEY} mapId={mapId} user={data.user} />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileSignup apiKey={API_KEY} mapId={mapId} user={data.user} />
        </div>
      </Suspense>
    </div>
  );
}
