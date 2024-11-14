"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const sendResetPassword = async (email: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    redirect("/error");
  }

  redirect(
    `/done?header=${encodeURIComponent("Reset Link Sent")}&message=${encodeURIComponent("Check your inbox to view your password reset link!")}&type=email`,
  );
};
