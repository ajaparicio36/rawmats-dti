import React from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import SupplierForm from "@/components/ApplySupplier/SupplierForm";

interface MobileSignupProps {
  apiKey: string;
  mapId: string;
  user: User;
}

export default function MobileSignup({
  apiKey,
  mapId,
  user,
}: MobileSignupProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#CFEEF9]">
      <div className="flex items-center justify-center flex-1 bg-[#CFEEF9] p-4">
        <Image src="/logo.png" alt="RAWMATS Logo" width={300} height={300} />
      </div>
      <Card className="bg-white rounded-t-3xl p-8 shadow-[0_-15px_30px_rgba(70,130,180,0.5)] z-10">
        <CardContent>
          <h2 className="text-xl font-extrabold mb-2 text-[#001D3F] font-inter text-center">
            Connect. Collaborate. Succeed.
          </h2>
          <p className="text-sm mt-4 mb-6 text-[#001D3F] text-center font-inter">
            Your trusted partner in business registration!
          </p>
          <SupplierForm apiKey={apiKey} mapId={mapId} user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
