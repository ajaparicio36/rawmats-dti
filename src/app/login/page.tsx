import React from "react";
import DynamicScreen from "@/components/AuthComponents/DynamicScreen";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/AuthComponents/LoginForm";

const LoginPage = async () => {
  const header = "Ready to Dive In?";
  const message = "Login to your account!";
  const body: React.ReactNode = <LoginForm />;
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error || data.user) {
    redirect("/");
  }
  return <DynamicScreen header={header} message={message} body={body} />;
};

export default LoginPage;
