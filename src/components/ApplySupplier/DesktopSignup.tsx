import React from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import SupplierForm from "@/components/ApplySupplier/SupplierForm";

interface DesktopSignupProps {
  apiKey: string;
  mapId: string;
  user: User;
}

export default function DesktopSignup({
  apiKey,
  mapId,
  user,
}: DesktopSignupProps) {
  return (
    <div className="bg-[rgba(254,254,254,0.962)] min-h-screen flex items-center justify-center">
      <Card className="w-[80%] lg:w-[70%] flex rounded-xl overflow-hidden m-12 h-[75%] shadow-[0_15px_30px_rgba(70,130,180,0.5)]">
        <CardContent className="w-[60%] p-12 bg-white">
          <h2 className="text-2xl font-extrabold mb-3 text-[#001D3F]">
            Connect. Collaborate. Succeed.
          </h2>
          <p className="text-sm mb-6 text-[#001D3F]">
            Your trusted partner in business registration!
          </p>
          <SupplierForm apiKey={apiKey} mapId={mapId} user={user} />
        </CardContent>
        <div className="w-[40%] bg-[#CFEEF9] flex items-center justify-center p-4">
          <Image
            src="/logo.png"
            alt="RAWMATS Logo"
            width={450}
            height={300}
            layout="intrinsic"
          />
        </div>
      </Card>
    </div>
  );
}
