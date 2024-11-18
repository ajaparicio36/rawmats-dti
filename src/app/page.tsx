"use server";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignoutButton from "@/components/AuthComponents/SignoutButton";

const Home = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }
  return (
    <div>
      Hello {data.user.email}, Click here to <SignoutButton />
    </div>
  );
};

export default Home;
