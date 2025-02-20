import React from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";

interface AuthScreenProps {
  header: string;
  message: string;
  body: React.ReactNode;
  user?: User;
  isSupplierForm?: boolean;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  header,
  message,
  body,
  isSupplierForm = false,
}) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center md:p-4 bg-[rgba(254,254,254,0.962)]">
      {/* Mobile design */}
      <div className="md:hidden w-full flex flex-col min-h-screen bg-[#CFEEF9]">
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <Link href="/" className="mb-4">
            <ArrowLeftSquare className="h-6 w-6 text-[#001D3F]" />
          </Link>
          <Image
            src="/logo.png"
            alt="RAWMATS Logo"
            width={300}
            height={300}
            className="max-w-full h-auto mx-auto"
            priority
          />
        </div>
        <Card className="bg-white rounded-t-3xl p-8 shadow-[0_-15px_30px_rgba(70,130,180,0.5)] z-10 w-full">
          <CardContent className="overflow-y-auto">
            <h2 className="text-xl font-extrabold mb-2 text-[#001D3F] font-inter text-center">
              {header}
            </h2>
            <p className="text-sm mt-4 mb-6 text-[#001D3F] text-center font-inter">
              {message}
            </p>
            {body}
          </CardContent>
        </Card>
      </div>

      {/* Desktop design */}
      <Card className="hidden md:flex w-[80%] lg:w-[70%] rounded-xl m-12 shadow-[0_15px_30px_rgba(70,130,180,0.5)] max-h-[90vh]">
        <CardContent
          className={`${isSupplierForm ? "w-[60%]" : "w-3/5"} p-12 bg-white relative overflow-y-auto`}
        >
          <Link href="/" className="absolute top-4 left-4">
            <ArrowLeftSquare className="h-6 w-6 text-[#001D3F]" />
          </Link>
          <h2 className="text-2xl font-extrabold mb-3 text-[#001D3F]">
            {header}
          </h2>
          <p className="text-sm mb-6 text-[#001D3F]">{message}</p>
          {body}
        </CardContent>
        <div
          className={`${isSupplierForm ? "w-[40%]" : "w-2/5"} bg-[#CFEEF9] flex items-center justify-center p-4`}
        >
          <Image
            src="/logo.png"
            alt="RAWMATS Logo"
            width={450}
            height={300}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </Card>
    </div>
  );
};

export default AuthScreen;
