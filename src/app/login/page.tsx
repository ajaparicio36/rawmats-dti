import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const DesktopLogin = dynamic(() => import("@/components/login/DesktopLogin"), {
  loading: () => <p>Loading desktop login...</p>,
  ssr: true,
});

const MobileLogin = dynamic(() => import("@/components/login/MobileLogin"), {
  loading: () => <p>Loading mobile login...</p>,
  ssr: true,
});

const LoginPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error || data.user) {
    redirect("/");
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopLogin />
        </div>
        <div className="md:hidden w-full h-screen">
          <MobileLogin />
        </div>
      </Suspense>
    </div>
  );
};

export default LoginPage;
